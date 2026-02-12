import { describe, it, expect } from "vitest";
import { Renderer } from "../src/renderer.js";

describe("Renderer", () => {
  it("starts at frame zero", () => {
    const renderer = new Renderer();
    expect(renderer.frame).toBe(0);
  });

  it("increments frame on render", () => {
    const renderer = new Renderer();
    renderer.render(0.5);
    expect(renderer.frame).toBe(1);
    renderer.render(0.8);
    expect(renderer.frame).toBe(2);
  });

  it("clamps intensity to 0-1 range", () => {
    const renderer = new Renderer();
    const low = renderer.render(-0.5);
    expect(low.opacity).toBeGreaterThanOrEqual(0.3);
    const high = renderer.render(1.5);
    expect(high.opacity).toBeLessThanOrEqual(1.0);
  });

  it("produces valid RGB color values", () => {
    const renderer = new Renderer();
    const output = renderer.render(0.7);
    expect(output.color.r).toBeGreaterThanOrEqual(0);
    expect(output.color.r).toBeLessThanOrEqual(255);
    expect(output.color.g).toBeGreaterThanOrEqual(0);
    expect(output.color.g).toBeLessThanOrEqual(255);
    expect(output.color.b).toBeGreaterThanOrEqual(0);
    expect(output.color.b).toBeLessThanOrEqual(255);
  });

  it("interpolates between two outputs", () => {
    const renderer = new Renderer();
    const a = renderer.render(0.0);
    const b = renderer.render(1.0);
    const mid = renderer.interpolate(a, b, 0.5);
    expect(mid.opacity).toBeGreaterThan(a.opacity);
    expect(mid.opacity).toBeLessThan(b.opacity);
  });

  it("lastOutput returns null when empty", () => {
    const renderer = new Renderer();
    expect(renderer.lastOutput()).toBeNull();
  });

  it("lastOutput returns most recent render", () => {
    const renderer = new Renderer();
    renderer.render(0.3);
    const second = renderer.render(0.9);
    expect(renderer.lastOutput()).toEqual(second);
  });
});
