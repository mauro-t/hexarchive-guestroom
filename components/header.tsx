"use client";

import Logo from "./logo";
import { motion } from "motion/react";

export default function Header() {
  return (
    <motion.header initial="init" animate="anim">
      <motion.div
        variants={{
          init: { clipPath: "inset(50% 0 50% 0)" },
          anim: { clipPath: "inset(0 0 0 0)" },
        }}
      >
        <Logo className="**:fill-current" />
      </motion.div>
      <motion.div
        variants={{}}
        transition={{ delayChildren: 0.2, staggerChildren: 0.1 }}
        className="flex justify-between px-3 font-akira-outline text-fluid-md xs:text-fluid-xl md:px-6"
      >
        <div className="overflow-hidden">
          <motion.div
            variants={{ init: { y: "100%" }, anim: { y: "0%" } }}
            transition={{ duration: 0.4 }}
          >
            sound
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            variants={{ init: { y: "100%" }, anim: { y: "0%" } }}
            transition={{ duration: 0.4 }}
          >
            design
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            variants={{ init: { y: "100%" }, anim: { y: "0%" } }}
            transition={{ duration: 0.4 }}
          >
            studio
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}
