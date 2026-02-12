import { describe, it, expect } from "vitest";
import { MotionTracker, type MotionFrame } from "../src/motion.js";

function makeFrame(timestamp: number, x: number, y: number, z: number): MotionFrame {
  return {
    timestamp,
    joints: { hand: { x, y, z } },
    confidence: 0.95,
  };
}

describe("MotionTracker", () => {
  it("starts with zero frames", () => {
    const tracker = new MotionTracker();
    expect(tracker.frameCount).toBe(0);
  });

  it("captures frames and increments count", () => {
    const tracker = new MotionTracker();
    tracker.captureFrame(makeFrame(0, 0, 0, 0));
    tracker.captureFrame(makeFrame(1, 1, 0, 0));
    expect(tracker.frameCount).toBe(2);
  });

  it("returns null gesture for insufficient frames", () => {
    const tracker = new MotionTracker();
    expect(tracker.analyzeGesture()).toBeNull();
    tracker.captureFrame(makeFrame(0, 0, 0, 0));
    expect(tracker.analyzeGesture()).toBeNull();
  });

  it("detects stillness for minimal movement", () => {
    const tracker = new MotionTracker(5);
    tracker.captureFrame(makeFrame(0, 0.0, 0.0, 0.0));
    tracker.captureFrame(makeFrame(1, 0.001, 0.0, 0.0));
    const gesture = tracker.analyzeGesture();
    expect(gesture).not.toBeNull();
    expect(gesture!.gesture).toBe("stillness");
  });

  it("detects sweep for large movement", () => {
    const tracker = new MotionTracker(5);
    tracker.captureFrame(makeFrame(0, 0, 0, 0));
    tracker.captureFrame(makeFrame(1, 5, 5, 0));
    const gesture = tracker.analyzeGesture();
    expect(gesture).not.toBeNull();
    expect(gesture!.gesture).toBe("sweep");
    expect(gesture!.velocity).toBeGreaterThan(2.0);
  });

  it("maps gesture to output value between 0 and 1", () => {
    const tracker = new MotionTracker();
    tracker.captureFrame(makeFrame(0, 0, 0, 0));
    tracker.captureFrame(makeFrame(1, 1, 1, 0));
    const gesture = tracker.analyzeGesture()!;
    const output = tracker.mapToOutput(gesture);
    expect(output).toBeGreaterThanOrEqual(0);
    expect(output).toBeLessThanOrEqual(1);
  });

  it("resets clears all frames", () => {
    const tracker = new MotionTracker();
    tracker.captureFrame(makeFrame(0, 0, 0, 0));
    tracker.reset();
    expect(tracker.frameCount).toBe(0);
  });
});
