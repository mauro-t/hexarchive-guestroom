"use client";

import { motion, useInView, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function GlitchText({ text }: { text: string }) {
  const display = useMotionValue("");
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -50px 0px", once: true });

  useEffect(() => {
    let iterations = 0;
    if (!inView) return;
    const interval = setInterval(() => {
      display.set(
        text
          .split("")
          .map((_, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 20);
    return () => {
      clearInterval(interval);
    };
  }, [inView]);

  return (
    <motion.h2
      ref={ref}
      animate={{ opacity: inView ? 1 : 0 }}
      className="font-ot-jubilee text-fluid-md uppercase"
    >
      <div className="relative">
        <span className="invisible">{text}</span>
        <motion.div className="absolute inset-0 text-nowrap">
          {display}
        </motion.div>
      </div>
    </motion.h2>
  );
}
