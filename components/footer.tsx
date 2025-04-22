"use client";

import { motion } from "motion/react";

import Instagram from "./icons/Instagram";
import LinkedIn from "./icons/LinkedIn";
import Sound from "./icons/Sound";
import Vimeo from "./icons/Vimeo";
import YouTube from "./icons/YouTube";
import Logo from "./logo";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="grid items-center gap-6 bg-black/75 p-6 text-[#F5F5F5] md:grid-cols-3">
          <div className="w-32 not-md:order-2">
            <Logo className="**:fill-current" />
          </div>
          <div className="flex gap-4 justify-self-center mix-blend-difference not-md:order-1">
            <Sound className="w-6" />
            <Instagram className="w-6" />
            <YouTube className="w-6" />
            <LinkedIn className="w-6" />
            <Vimeo className="w-6" />
          </div>
        </div>
      </footer>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="fixed right-6 bottom-6 z-10 -translate-y-2 font-akira text-sm text-white/75 mix-blend-exclusion md:-translate-y-1 md:text-base"
      >
        contatti
      </motion.div>
    </>
  );
}
