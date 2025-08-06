import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

type PropsOf<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>;

interface AnimationNumberCounter<T extends React.ElementType> {
  from?: number;
  to: number;
  duration?: number | "auto";
  decimals?: number;
  isActive?: boolean;
  style?: React.CSSProperties;
  component?: T;
  options?: PropsOf<T>;
}

export default function AnimationNumberCounter<T extends React.ElementType = "span">({
  from = 0,
  to,
  duration = 1,
  decimals = 0,
  isActive = true,
  style = {},
  component,
  options,
}: AnimationNumberCounter<T>) {
  const motionValue = useMotionValue(from);
  const [display, setDisplay] = useState(from.toFixed(decimals));

  const _duration = duration === "auto" ? Math.abs(to - from) * 0.05 : duration;

  useEffect(() => {
    let controls = null;
    if (isActive) {
      controls = animate(motionValue, to, {
        duration: _duration,
        onUpdate: (latest) => {
          setDisplay(latest.toFixed(decimals));
        },
      });
    }

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [to, duration, decimals, motionValue, isActive]);

  const Component = motion(component || "span");

  return (
    <Component
      style={{
        display: "inline-block",
        ...style,
      }}
      {...options}
    >
      {display}
    </Component>
  );
}
