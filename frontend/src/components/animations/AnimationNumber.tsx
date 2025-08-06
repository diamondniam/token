import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnimationNumberProps = {
  number: number;
};

export default function AnimationNumber({ number }: AnimationNumberProps) {
  const prevNumberRef = useRef(number);
  const prevDigits = prevNumberRef.current.toString().split("");
  const nextDigits = number.toString().split("");

  useEffect(() => {
    prevNumberRef.current = number;
  }, [number]);

  return (
    <div style={{ display: "flex", gap: "0.1rem", height: "25px" }}>
      {nextDigits.map((digit, idx) => {
        const prevDigit = prevDigits[idx] ?? " ";
        return <Digit key={idx} digit={digit} prevDigit={prevDigit} />;
      })}
    </div>
  );
}

const Digit = ({ digit, prevDigit }: { digit: string; prevDigit: string }) => {
  const direction =
    parseInt(digit) > parseInt(prevDigit) ? -1 : parseInt(digit) < parseInt(prevDigit) ? 1 : 0;

  return (
    <div style={{ position: "relative", width: "1ch", height: "100%", overflow: "hidden" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: direction * 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -direction * 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
          }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
