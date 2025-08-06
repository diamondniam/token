import { type MotionProps, type TargetAndTransition } from "framer-motion";

const DEFAULT_VIEWPORT_AMOUNT = 0.2;

type AnimationReturnType = {
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  exit?: MotionProps["exit"];
  whileInView?: MotionProps["whileInView"];
  viewport?: MotionProps["viewport"];
  key?: string;
};

interface AnimationOptions extends TargetAndTransition, AnimationReturnType {}

export function getFade(options: AnimationOptions = {}): AnimationReturnType {
  return { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, ...options };
}

export function getFadeUp(options: AnimationOptions = {}): AnimationReturnType {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    ...options,
  };
}

export function getFadeInView(options: AnimationOptions = {}): AnimationReturnType {
  return {
    whileInView: { opacity: 1 },
    initial: { opacity: 0 },
    exit: { opacity: 0 },
    viewport: { once: true, amount: DEFAULT_VIEWPORT_AMOUNT },
    ...options,
  };
}

export function getFadeUpInView(options: AnimationOptions = {}): AnimationReturnType {
  return {
    whileInView: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: options.y || 10 },
    exit: { opacity: 0, y: options.y || 10 },
    viewport: { once: true, amount: DEFAULT_VIEWPORT_AMOUNT },
    ...options,
  };
}

export const animations = {
  getFade,
  getFadeUp,
  getFadeInView,
  getFadeUpInView,
};
