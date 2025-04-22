"use client";

import Image from "next/image";
import { motion } from "motion/react";
import hand from "@/assets/images/hand.png";

export default function WhatsThis() {
  return (
    <motion.section
      initial="init"
      whileInView="inView"
      viewport={{
        margin: "0px 0px -200px 0px",
        once: true,
      }}
      transition={{ staggerChildren: 0.2 }}
      className="mt-12 mb-6 px-3 md:mt-32 md:mb-12 md:px-6 lg:mt-48 lg:mb-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] md:pl-[8%]">
        <div className="col-start-1 row-start-1">
          <h2 className="overflow-hidden font-akira text-fluid-lg">
            <motion.div variants={{ init: { y: "100%" }, inView: { y: "0%" } }}>
              what&rsquo;s this?
            </motion.div>
          </h2>
          <motion.div
            variants={{
              init: { clipPath: "inset(0 100% 0 0)" },
              inView: { clipPath: "inset(0 0 0 0)" },
            }}
            className="mt-6 max-w-[52ch] font-ot-jubilee text-fluid-base"
          >
            <p>
              <em>Hex Archive</em> is an Italian audio production studio based
              in Venice and Turin, whose <em>goal</em> is to{" "}
              <em>establish a custom and unique generative process</em> around
              each production we face, always <em>starting from scratch</em>.
            </p>

            <p>
              Through a series of partnerships with other trusted companies and
              contractors <strong>we’ve built a modular</strong> structure that
              allows us to <strong>shape ourselves</strong> around each scope
              and size.
            </p>
            <ul style={{ listStyleType: "'⟐ '" }} className="mt-6 list-inside">
              <li>
                <em>sound design</em>
              </li>
              <li>
                <em>music composition, arrangement and production</em>
              </li>
              <li>
                <em>audio post-production</em>
              </li>
              <li>
                <em>audio implementation</em>
              </li>
            </ul>
          </motion.div>
        </div>
        <div className="opacity-5 max-md:col-start-1 max-md:row-start-1 md:opacity-75">
          <motion.div
            variants={{ init: { opacity: 0 }, inView: { opacity: 1 } }}
            className="flex h-full w-full justify-center"
          >
            <Image
              className="w-4/5 object-contain md:w-full md:max-w-64"
              src={hand}
              alt="hand"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
