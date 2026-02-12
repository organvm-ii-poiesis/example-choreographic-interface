/**
 * Output renderer for choreographic interfaces.
 *
 * Takes gesture-mapped values and produces render commands
 * for visual and audio output systems.
 */

/** Configuration for the renderer. */
export interface RenderConfig {
  width: number;
  height: number;
  colorSpace: "rgb" | "hsv" | "hsl";
  frameRate: number;
}

/** A single render output frame. */
export interface RenderOutput {
  frameId: number;
  color: { r: number; g: number; b: number };
  opacity: number;
  scale: number;
  rotation: number;
}

/**
 * Renders choreographic gestures into visual output parameters.
 *
 * The Renderer maps normalized intensity values (0-1) to visual
 * parameters like color, opacity, scale, and rotation. It maintains
 * a running frame counter and can interpolate between states.
 */
export class Renderer {
  private config: RenderConfig;
  private currentFrame: number = 0;
  private history: RenderOutput[] = [];

  /**
   * Create a new Renderer.
   * @param config - Render configuration parameters.
   */
  constructor(config?: Partial<RenderConfig>) {
    this.config = {
      width: config?.width ?? 1920,
      height: config?.height ?? 1080,
      colorSpace: config?.colorSpace ?? "hsv",
      frameRate: config?.frameRate ?? 60,
    };
  }

  /** Return the current frame number. */
  get frame(): number {
    return this.currentFrame;
  }

  /** Return the render history length. */
  get historyLength(): number {
    return this.history.length;
  }

  /**
   * Render an output frame from a gesture intensity value.
   *
   * Maps the intensity (0-1) to color, opacity, scale, and rotation
   * parameters for the current frame.
   *
   * @param intensity - Normalized gesture intensity (0-1).
   * @returns The rendered output frame.
   */
  render(intensity: number): RenderOutput {
    const clamped = Math.max(0, Math.min(1, intensity));

    // Map intensity to HSV-inspired color (hue rotates with intensity)
    const hue = clamped * 360;
    const rgb = this.hsvToRgb(hue, 0.8, 0.7 + clamped * 0.3);

    const output: RenderOutput = {
      frameId: this.currentFrame,
      color: rgb,
      opacity: 0.3 + clamped * 0.7,
      scale: 0.5 + clamped * 1.5,
      rotation: clamped * 360,
    };

    this.history.push(output);
    this.currentFrame++;
    return output;
  }

  /**
   * Interpolate between two render outputs.
   *
   * @param a - Starting render state.
   * @param b - Ending render state.
   * @param t - Interpolation factor (0 = a, 1 = b).
   * @returns Interpolated render output.
   */
  interpolate(a: RenderOutput, b: RenderOutput, t: number): RenderOutput {
    const lerp = (x: number, y: number, f: number): number =>
      Math.round((x + (y - x) * f) * 1000) / 1000;

    return {
      frameId: this.currentFrame++,
      color: {
        r: Math.round(lerp(a.color.r, b.color.r, t)),
        g: Math.round(lerp(a.color.g, b.color.g, t)),
        b: Math.round(lerp(a.color.b, b.color.b, t)),
      },
      opacity: lerp(a.opacity, b.opacity, t),
      scale: lerp(a.scale, b.scale, t),
      rotation: lerp(a.rotation, b.rotation, t),
    };
  }

  /** Get the most recent render output, or null if none exist. */
  lastOutput(): RenderOutput | null {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null;
  }

  /**
   * Convert HSV to RGB values.
   * @param h - Hue (0-360).
   * @param s - Saturation (0-1).
   * @param v - Value (0-1).
   * @returns RGB object with values 0-255.
   */
  private hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }
}
