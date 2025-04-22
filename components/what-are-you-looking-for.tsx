"use client";
import { motion } from "motion/react";
import { useAppContext } from "./app-context";
import VideoToCanvas from "./video-to-canvas";

const Section = ({
  label,
  videoSrc,
}: {
  label: string;
  videoSrc: "projects" | "showreel" | "spots";
}) => {
  const context = useAppContext();

  const videoRef = {
    projects: context.projectsVideoRef,
    showreel: context.showreelVideoRef,
    spots: context.spotsVideoRef,
  }[videoSrc];

  return (
    <>
      <li className="group contents cursor-pointer">
        <motion.div
          variants={{ init: { opacity: 0 }, inView: { opacity: 1 } }}
          className="flex items-center gap-2 py-6 md:p-6"
        >
          ⟐
          <div className="relative w-fit font-ot-jubilee text-fluid-base uppercase">
            {label}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-black transition-[width] group-hover:w-full"></span>
          </div>
        </motion.div>
        <motion.div
          variants={{
            init: { clipPath: "inset(0 100% 0 0)" },
            inView: { clipPath: "inset(0 0 0 0)" },
          }}
          transition={{ duration: 1, at: "<" }}
        >
          <div className="relative h-full opacity-75 grayscale transition-all clip-video group-hover:opacity-100 group-hover:grayscale-0">
            <VideoToCanvas videoRef={videoRef} />
          </div>
        </motion.div>
      </li>
    </>
  );
};

export default function WhatAreYouLookingFor() {
  return (
    <motion.section
      initial="init"
      whileInView="inView"
      viewport={{
        margin: "0px 0px -200px 0px",
        once: true,
      }}
      className="my-12 px-3 md:my-32 md:px-6 lg:my-48"
      transition={{ staggerChildren: 0.2 }}
    >
      <h2 className="overflow-hidden font-akira text-fluid-lg">
        <motion.div variants={{ init: { y: "100%" }, inView: { y: "0%" } }}>
          what are you looking for?
        </motion.div>
      </h2>
      <ul className="mt-12 grid grid-cols-[auto_1fr] gap-3 md:gap-6">
        <Section label="Projects" videoSrc="projects" />
        <Section label="Spots" videoSrc="spots" />
        <Section label="Showreel" videoSrc="showreel" />
      </ul>
    </motion.section>
  );
}
