"use client";

import Instagram from "@/components/icons/Instagram";
import LinkedIn from "@/components/icons/LinkedIn";
import Sound from "@/components/icons/Sound";
import Vimeo from "@/components/icons/Vimeo";
import YouTube from "@/components/icons/YouTube";
import Logo from "@/components/logo";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import hand from "@/assets/images/hand.png";

const previewMap = {
  projects: (
    <video
      autoPlay
      muted
      loop
      className="absolute inset-0"
      src="/projects-preview.mp4"
    />
  ),
  showreel: (
    <video
      autoPlay
      muted
      loop
      className="absolute inset-0"
      src="/showreel-preview.mp4"
    />
  ),
  spots: (
    <video
      autoPlay
      muted
      loop
      className="absolute inset-0"
      src="/spots-preview.mp4"
    />
  ),
  whatsthis: (
    <div className="absolute inset-0 flex items-center justify-center">
      <Image src={hand} alt="" />
    </div>
  ),
  credits: (
    <div className="absolute inset-0 flex items-center justify-center">
      <Image src={hand} alt="" />
    </div>
  ),
};

type ContentsType =
  | "showreel"
  | "projects"
  | "spots"
  | "credits"
  | "whatsthis"
  | null;

export default function Base() {
  const [preview, setPreview] = useState<ContentsType>(null);
  // const [contents, setContents] = useState<ContentsType>(null);

  return (
    <>
      <header className="flex flex-col items-center justify-center gap-2 pt-24">
        <Logo className="max-w-xs" />
        <div className="font-akira-outline text-fluid-md">
          sound design studio
        </div>
      </header>
      <div className="mt-3 grid grid-cols-2 gap-[5vw] px-24">
        <div>
          <h1 className="text-center font-ot-jubilee text-fluid-lg uppercase">
            Welcome to Hex Archive
          </h1>
          <h2 className="mt-10 font-akira text-fluid-base">
            What are you looking for?
          </h2>
          <ul className="mt-5 pl-[1em] text-fluid-md">
            <motion.li
              whileHover="hover"
              onHoverStart={() => setPreview("projects")}
              onHoverEnd={() => setPreview(null)}
              className="flex gap-10 uppercase"
            >
              <motion.span variants={{ hover: { opacity: 0 } }}>
                001.
              </motion.span>
              <motion.span variants={{ hover: { x: 20, opacity: 0.5 } }}>
                Projects
              </motion.span>
            </motion.li>
            <motion.li
              whileHover="hover"
              onHoverStart={() => setPreview("spots")}
              onHoverEnd={() => setPreview(null)}
              className="flex gap-10 uppercase"
            >
              <motion.span variants={{ hover: { opacity: 0 } }}>
                002.
              </motion.span>
              <motion.span variants={{ hover: { x: 20, opacity: 0.5 } }}>
                Spots
              </motion.span>
            </motion.li>
            <motion.li
              whileHover="hover"
              onHoverStart={() => setPreview("showreel")}
              onHoverEnd={() => setPreview(null)}
              className="flex gap-10 uppercase"
            >
              <motion.span variants={{ hover: { opacity: 0 } }}>
                003.
              </motion.span>
              <motion.span variants={{ hover: { x: 20, opacity: 0.5 } }}>
                Showreel
              </motion.span>
            </motion.li>
            <motion.li
              whileHover="hover"
              onHoverStart={() => setPreview("whatsthis")}
              onHoverEnd={() => setPreview(null)}
              className="flex gap-10 uppercase"
            >
              <motion.span variants={{ hover: { opacity: 0 } }}>
                004.
              </motion.span>
              <motion.span variants={{ hover: { x: 20, opacity: 0.5 } }}>
                What&apos;s this
              </motion.span>
            </motion.li>
            <motion.li
              whileHover="hover"
              onHoverStart={() => setPreview("credits")}
              onHoverEnd={() => setPreview(null)}
              className="flex gap-10 uppercase"
            >
              <motion.span variants={{ hover: { opacity: 0 } }}>
                005.
              </motion.span>
              <motion.span variants={{ hover: { x: 20, opacity: 0.5 } }}>
                Credits
              </motion.span>
            </motion.li>
          </ul>
          <div className="mt-10 flex justify-center">
            <div className="flex w-fit flex-col items-center justify-center text-fluid-base">
              <div className="font-akira-outline">Feel like going deeper?</div>
              <div className="flex w-full -scale-100 justify-between font-akira">
                <span>proceed</span>
                <span>deeper</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative aspect-video w-full border">
            {preview && previewMap[preview]}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-center font-akira-outline text-fluid-md">
          contents
        </h2>
        <div className="mt-10 flex justify-center">
          <div className="aspect-video w-1/2 border"></div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-center font-akira text-fluid-md">socials</h2>
        <div className="mt-2 flex w-full justify-center">
          <div className="flex w-full max-w-[250px] gap-4">
            <LinkedIn className="invert" />
            <Instagram className="invert" />
            <Vimeo className="invert" />
            <YouTube className="invert" />
            <Sound />
          </div>
        </div>
      </div>
      <footer className="flex justify-between px-24 py-20">
        <div className="font-akira-outline text-fluid-base">contacts</div>
      </footer>
    </>
  );
}
