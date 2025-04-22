"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import GlitchText from "./glitch-text";
import Divider from "./divider";

export default function ProceedDeeper() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Divider>
      <motion.a
        initial="init"
        whileHover="hover"
        href="https://hexarchive.com"
        className="relative block"
      >
        <GlitchText text="feel like going deeper?" />
        <motion.div
          variants={{
            init: { height: 0 },
            hover: () => {
              return { height: ref.current?.clientHeight };
            },
          }}
          className="overflow-hidden"
        >
          <div
            ref={ref}
            className="flex w-full -scale-100 justify-between font-akira text-fluid-sm"
          >
            <span>proceed</span> <span>deeper</span>
          </div>
        </motion.div>
      </motion.a>
    </Divider>
  );
}
