/**
 * Example Choreographic Interface
 *
 * A toolkit for mapping motion capture data to generative visual and audio outputs.
 * Provides motion tracking, gesture analysis, and output rendering capabilities.
 */

export { MotionTracker, type MotionFrame, type GestureResult } from "./motion.js";
export { Renderer, type RenderConfig, type RenderOutput } from "./renderer.js";
export { ChoreographicInterface, type InterfaceConfig } from "./interface.js";
