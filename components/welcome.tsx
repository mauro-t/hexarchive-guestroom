"use client";

import { motion } from "motion/react";
import Divider from "./divider";

export default function Welcome() {
  return (
    <Divider>
      <motion.h1
        layoutId="welcome"
        layout="position"
        className="text-fluid-md uppercase"
      >
        welcome to hex archive
      </motion.h1>
    </Divider>
  );
}
