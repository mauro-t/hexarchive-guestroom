"use client";

import {
  useAnimate,
  motion,
  type AnimationPlaybackControlsWithThen,
} from "motion/react";
import { useEffect } from "react";

export default function Credits({
  credits,
}: {
  credits: (string | undefined)[];
}) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    let animation: AnimationPlaybackControlsWithThen;

    function handle() {
      const x = scope.current.scrollWidth;
      animation?.stop();
      animation = animate(
        scope.current,
        { x: [0, -x / 2] },
        { duration: 20, ease: "linear", repeat: Infinity },
      );
    }

    window.addEventListener("resize", handle);
    handle();

    return () => {
      animation?.stop();
      window.removeEventListener("resize", handle);
    };
  }, []);

  return (
    <motion.section
      initial="init"
      whileInView="inView"
      viewport={{
        margin: "0px 0px -200px 0px",
        once: true,
      }}
      transition={{ staggerChildren: 0.2 }}
      variants={{ init: { opacity: 0 }, inView: { opacity: 1 } }}
      className="group relative"
    >
      <h2 className="top-1/2 left-1/2 z-10 overflow-hidden px-3 font-akira text-fluid-lg md:absolute md:-translate-1/2 md:px-6">
        <motion.span
          variants={{ init: { y: "100%" }, inView: { y: "0%" } }}
          className="inline-block transition-opacity md:group-hover:opacity-0"
        >
          credits
        </motion.span>
      </h2>
      <div className="w-full overflow-hidden opacity-75 transition-opacity md:opacity-20 md:group-hover:opacity-75">
        <motion.div ref={scope} className="flex grayscale">
          {credits.map((k) => (
            <img
              key={k}
              className="w-1/3 max-w-xs flex-none object-contain"
              src={k}
            />
          ))}
          {credits.map((k) => (
            <img
              key={k}
              className="w-1/3 max-w-xs flex-none object-contain"
              src={k}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
