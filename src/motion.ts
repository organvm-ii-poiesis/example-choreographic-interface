/**
 * Motion tracking and gesture analysis module.
 *
 * Captures motion frames from input devices and analyzes them for
 * choreographic gestures that can drive generative outputs.
 */

/** A single frame of motion capture data. */
export interface MotionFrame {
  timestamp: number;
  joints: Record<string, { x: number; y: number; z: number }>;
  confidence: number;
}

/** Result of gesture analysis on a sequence of frames. */
export interface GestureResult {
  gesture: string;
  confidence: number;
  startFrame: number;
  endFrame: number;
  velocity: number;
}

/**
 * Tracks motion input and analyzes gesture patterns.
 *
 * The MotionTracker accumulates frames and runs gesture detection
 * algorithms over sliding windows to identify choreographic movements.
 */
export class MotionTracker {
  private frames: MotionFrame[] = [];
  private readonly windowSize: number;

  /**
   * Create a new MotionTracker.
   * @param windowSize - Number of frames in the analysis sliding window.
   */
  constructor(windowSize: number = 30) {
    this.windowSize = windowSize;
  }

  /** Return the number of captured frames. */
  get frameCount(): number {
    return this.frames.length;
  }

  /**
   * Capture a new motion frame.
   * @param frame - The motion frame to record.
   */
  captureFrame(frame: MotionFrame): void {
    this.frames.push(frame);
  }

  /**
   * Analyze recent frames for gesture patterns.
   *
   * Examines the most recent window of frames and computes
   * velocity and spatial patterns to identify gestures.
   *
   * @returns A GestureResult if a gesture is detected, or null.
   */
  analyzeGesture(): GestureResult | null {
    if (this.frames.length < 2) {
      return null;
    }

    const window = this.frames.slice(-this.windowSize);
    const startFrame = Math.max(0, this.frames.length - this.windowSize);
    const endFrame = this.frames.length - 1;

    // Compute average velocity across all joints
    let totalVelocity = 0;
    let measurements = 0;

    for (let i = 1; i < window.length; i++) {
      const prev = window[i - 1];
      const curr = window[i];
      const dt = curr.timestamp - prev.timestamp;
      if (dt <= 0) continue;

      for (const jointName of Object.keys(curr.joints)) {
        const prevJoint = prev.joints[jointName];
        const currJoint = curr.joints[jointName];
        if (!prevJoint || !currJoint) continue;

        const dx = currJoint.x - prevJoint.x;
        const dy = currJoint.y - prevJoint.y;
        const dz = currJoint.z - prevJoint.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        totalVelocity += distance / dt;
        measurements++;
      }
    }

    const avgVelocity = measurements > 0 ? totalVelocity / measurements : 0;

    // Classify gesture based on velocity thresholds
    let gesture: string;
    let confidence: number;

    if (avgVelocity > 2.0) {
      gesture = "sweep";
      confidence = Math.min(avgVelocity / 5.0, 1.0);
    } else if (avgVelocity > 0.5) {
      gesture = "wave";
      confidence = Math.min(avgVelocity / 2.0, 1.0);
    } else if (avgVelocity > 0.1) {
      gesture = "drift";
      confidence = avgVelocity / 0.5;
    } else {
      gesture = "stillness";
      confidence = 1.0 - avgVelocity;
    }

    return {
      gesture,
      confidence: Math.round(confidence * 1000) / 1000,
      startFrame,
      endFrame,
      velocity: Math.round(avgVelocity * 1000) / 1000,
    };
  }

  /**
   * Map a gesture result to a normalized output value.
   *
   * @param gesture - The gesture to map.
   * @returns A value between 0 and 1 representing output intensity.
   */
  mapToOutput(gesture: GestureResult): number {
    const gestureWeights: Record<string, number> = {
      sweep: 1.0,
      wave: 0.7,
      drift: 0.3,
      stillness: 0.05,
    };
    const weight = gestureWeights[gesture.gesture] ?? 0.5;
    return Math.round(weight * gesture.confidence * 1000) / 1000;
  }

  /** Clear all captured frames. */
  reset(): void {
    this.frames = [];
  }
}
