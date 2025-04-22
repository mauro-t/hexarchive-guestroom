"use client";
import { motion } from "motion/react";

export default function Divider({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      initial="init"
      whileInView="inView"
      viewport={{
        margin: "0px 0px -50px 0px",
        once: true,
      }}
      className="my-12 flex items-center gap-3 px-3 md:my-32 md:gap-6 md:px-6"
    >
      <motion.div
        style={{ originX: "right" }}
        variants={{ init: { scaleX: 0 }, inView: { scaleX: 1 } }}
        className="h-px grow bg-current"
      />
      {children}
      <motion.div
        style={{ originX: "left" }}
        variants={{ init: { scaleX: 0 }, inView: { scaleX: 1 } }}
        className="h-px grow bg-current"
      />
    </motion.div>
  );
}
