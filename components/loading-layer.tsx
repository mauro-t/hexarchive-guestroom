import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "motion/react";
import handWireframe from "@/assets/images/hand-wireframe.webp";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const text = "Welcome to hex archive";

export default function LoadingLayer({
  isVideosLoaded,
  setInitialAnimationState,
}: {
  isVideosLoaded: boolean;
  setInitialAnimationState: (value: "idle" | "start" | "done") => void;
}) {
  const display = useMotionValue("");

  useEffect(() => {
    let iterations = 0;
    setInitialAnimationState("start");
    const interval = setInterval(() => {
      display.set(
        text
          .split("")
          .map((_, index) => {
            if (index < iterations && isVideosLoaded) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
      if (isVideosLoaded) {
        if (iterations >= text.length) {
          clearInterval(interval);
          setInitialAnimationState("done");
        }
        iterations += 1 / 3;
      }
    }, 30);
    return () => {
      clearInterval(interval);
    };
  }, [isVideosLoaded, display, setInitialAnimationState]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-12">
      <motion.div
        exit={{ opacity: 0, y: "-100%", transition: { duration: 0.4 } }}
        className="flex w-full items-center justify-center"
      >
        <Image
          src={handWireframe}
          alt="Loading"
          className="h-auto w-1/5 animate-pulse invert"
          priority
        />
      </motion.div>
      <div className="relative flex items-center justify-center text-fluid-md uppercase">
        <span className="invisible">{text}</span>
        <motion.div
          layoutId="welcome"
          layout="position"
          className="absolute inset-0 z-20 text-nowrap"
        >
          {display}
        </motion.div>
      </div>
    </div>
  );
}
