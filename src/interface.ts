/**
 * Choreographic interface — ties motion tracking to rendering.
 *
 * The top-level orchestrator that connects a MotionTracker to a Renderer,
 * providing a unified API for choreographic interaction.
 */

import { MotionTracker, type MotionFrame, type GestureResult } from "./motion.js";
import { Renderer, type RenderOutput } from "./renderer.js";

/** Configuration for the choreographic interface. */
export interface InterfaceConfig {
  windowSize?: number;
  width?: number;
  height?: number;
  frameRate?: number;
}

/**
 * The main choreographic interface.
 *
 * Orchestrates the full pipeline: capture -> analyze -> render.
 * Each call to `processFrame` captures motion data, checks for
 * gestures, and produces a render output.
 */
export class ChoreographicInterface {
  private tracker: MotionTracker;
  private renderer: Renderer;
  private lastGesture: GestureResult | null = null;

  constructor(config?: InterfaceConfig) {
    this.tracker = new MotionTracker(config?.windowSize ?? 30);
    this.renderer = new Renderer({
      width: config?.width,
      height: config?.height,
      frameRate: config?.frameRate,
    });
  }

  /** Return the last detected gesture. */
  get currentGesture(): GestureResult | null {
    return this.lastGesture;
  }

  /** Return the number of frames processed. */
  get framesProcessed(): number {
    return this.tracker.frameCount;
  }

  /**
   * Process a single motion frame through the full pipeline.
   *
   * @param frame - The motion frame to process.
   * @returns The render output for this frame.
   */
  processFrame(frame: MotionFrame): RenderOutput {
    this.tracker.captureFrame(frame);
    const gesture = this.tracker.analyzeGesture();

    let intensity = 0.05; // default stillness intensity
    if (gesture) {
      this.lastGesture = gesture;
      intensity = this.tracker.mapToOutput(gesture);
    }

    return this.renderer.render(intensity);
  }

  /** Reset the interface state. */
  reset(): void {
    this.tracker.reset();
    this.lastGesture = null;
  }
}
