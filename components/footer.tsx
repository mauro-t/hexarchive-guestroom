"use client";

import { motion } from "motion/react";

import Instagram from "./icons/Instagram";
import LinkedIn from "./icons/LinkedIn";
import Sound from "./icons/Sound";
import Vimeo from "./icons/Vimeo";
import YouTube from "./icons/YouTube";
import Logo from "./logo";
import { useState } from "react";

export default function Footer() {
  const [contactsOpen, setContactsOpen] = useState(false);
  return (
    <>
      <footer>
        <div className="grid items-center gap-6 bg-black/75 p-6 text-[#F5F5F5] md:grid-cols-3">
          <div className="w-32 not-md:order-2">
            <Logo className="**:fill-current" />
          </div>
          <div className="flex gap-4 justify-self-center mix-blend-difference not-md:order-1">
            <a href="https://www.linkedin.com/in/hex-archive/">
              <LinkedIn className="w-6" />
            </a>
            <a href="https://www.instagram.com/odd_engraving/">
              <Instagram className="w-6" />
            </a>
            <a href="https://vimeo.com/hexarchive">
              <Vimeo className="w-6" />
            </a>
            <a href="https://www.youtube.com/@HexArchive-kh8sl">
              <YouTube className="w-6" />
            </a>
            <a href="https://www.asoundeffect.com/sounddesigner/hex-archive/">
              <Sound className="w-6" />
            </a>
          </div>
        </div>
      </footer>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className={`fixed z-10 -translate-y-2 font-akira text-sm mix-blend-exclusion md:text-base ${contactsOpen ? "top-1/2 left-1/2 h-fit w-full max-w-sm -translate-1/2 border bg-white p-6 text-black/75 mix-blend-normal" : "right-6 bottom-6 text-white/75 md:-translate-y-1"}`}
      >
        <div className="flex justify-between">
          <button onClick={() => setContactsOpen(true)}>contatti </button>
          {contactsOpen && (
            <button onClick={() => setContactsOpen(false)}>x</button>
          )}
        </div>
        {contactsOpen && (
          <div className="mt-6 font-ot-jubilee">
            <a href="tel:+39 3473490644">+39 3473490644</a>
            <br />
            <a href="mailto:index@hexarchive.quest">index@hexarchive.quest</a>
          </div>
        )}
      </motion.div>
    </>
  );
}
