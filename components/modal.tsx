"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  useAnimate,
  motion,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import { useAppContext } from "./app-context";
import VideoToCanvas from "./video-to-canvas";
import ReactLenis from "lenis/react";

export default function Modal() {
  const { modal, setModal, projectsVideoRef, showreelVideoRef, spotsVideoRef } =
    useAppContext();
  const [lastRef, animate] = useAnimate();

  useLayoutEffect(() => {
    if (!modal) return;
    const firstBoundingBox = modal.anchorBounds;
    const lastBoundingBox = lastRef.current.getBoundingClientRect();

    function setFinalState() {
      lastRef.current.style.width = "100%";
      lastRef.current.style.height = "100%";
    }

    const animation = animate(
      lastRef.current,
      {
        x: [Number(firstBoundingBox?.x) - lastBoundingBox.x, 0],
        y: [Number(firstBoundingBox?.y) - lastBoundingBox.y, 0],
        clipPath: [
          "polygon(0 0, 100% 0, 100% 100%, 15% 100%)",
          "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ],
        width: [firstBoundingBox?.width, lastBoundingBox.width],
        height: [firstBoundingBox?.height, lastBoundingBox.height],
      },
      { duration: 0.7 },
    );
    animation.then(setFinalState, setFinalState);
    function stopAnimation() {
      animation?.stop();
      if (!lastRef.current) return;
      setFinalState();
    }
    window.addEventListener("resize", stopAnimation);
    return () => {
      window.removeEventListener("resize", stopAnimation);
      stopAnimation();
    };
  }, [modal, lastRef, animate]);

  if (!modal) return null;

  const videoRef = {
    projects: projectsVideoRef,
    showreel: showreelVideoRef,
    spots: spotsVideoRef,
  }[modal.kind];

  const title = {
    projects: "projects",
    showreel: "showreel",
    spots: "spots",
  }[modal.kind];

  return (
    <ReactLenis className="fixed inset-0 z-50 scrollbar-none h-svh overflow-auto">
      <motion.div
        initial={{
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(245, 245, 245, 0)",
        }}
        animate={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(245, 245, 245, 0.5)",
        }}
        className="md:pb-12"
      >
        <div className="sticky top-3 z-20 flex h-0 w-full items-center justify-end px-3 mix-blend-difference md:top-12 md:px-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="font-akira text-fluid-sm text-white md:-mt-8"
            onClick={() => setModal(null)}
          >
            close
          </motion.button>
        </div>
        <div className="relative z-10 aspect-video w-full md:aspect-[3]">
          <div ref={lastRef} className="relative h-full w-full">
            <VideoToCanvas videoRef={videoRef} />
          </div>
        </div>
        <motion.div
          initial="init"
          animate="open"
          variants={{ open: { transition: { staggerChildren: 0.2 } } }}
          className="mt-12 mb-6 flex items-center gap-6 px-3 md:my-12 md:px-6"
        >
          <h2 className="w-max overflow-hidden font-akira text-fluid-lg md:text-fluid-2xl">
            <motion.div variants={{ init: { y: "100%" }, open: { y: "0%" } }}>
              {title}
            </motion.div>
          </h2>
          <motion.div
            style={{ originX: "left" }}
            variants={{
              init: { scaleX: 0 },
              open: { scaleX: 1 },
            }}
            className="h-px grow bg-current"
          ></motion.div>
        </motion.div>
        <div className="mt-6 grid grid-cols-1 gap-12 px-3 md:mt-24 md:space-y-24 md:px-6">
          <Item
            videoSrc="https://player.vimeo.com/video/975380835?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            imageSrc="/mjolnir.webp"
            title="Title"
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium ex, tempore labore aliquam dolorem error cupiditate iusto."
          />
          <Item
            videoSrc="https://www.youtube-nocookie.com/embed/AQCEb9HKO98?si=Uoq0LDvKnmORClQZ"
            imageSrc="/geralt.webp"
            title="Title"
            description="Veritatis porro accusamus debitis sunt, id aut vero aperiam. Reiciendis voluptatum neque aliquam reprehenderit? Fugiat illo reiciendis deleniti, dolore atque assumenda. Aliquid cum dolorem illo magni corrupti neque eos vero officia dolore porro."
          />
          <Item
            videoSrc="https://www.youtube-nocookie.com/embed/AQCEb9HKO98?si=Uoq0LDvKnmORClQZ"
            imageSrc="/geralt.webp"
            title="Title"
            description="Veritatis porro accusamus debitis sunt, id aut vero aperiam. Reiciendis voluptatum neque aliquam reprehenderit? Fugiat illo reiciendis deleniti, dolore atque assumenda. Aliquid cum dolorem illo magni corrupti neque eos vero officia dolore porro."
          />
          <Item
            videoSrc="https://www.youtube-nocookie.com/embed/AQCEb9HKO98?si=Uoq0LDvKnmORClQZ"
            imageSrc="/geralt.webp"
            title="Title"
            description="Veritatis porro accusamus debitis sunt, id aut vero aperiam. Reiciendis voluptatum neque aliquam reprehenderit? Fugiat illo reiciendis deleniti, dolore atque assumenda. Aliquid cum dolorem illo magni corrupti neque eos vero officia dolore porro."
          />
        </div>
      </motion.div>
    </ReactLenis>
  );
}

const Item = ({
  imageSrc,
  title,
  videoSrc,
  description,
}: {
  imageSrc: string;
  videoSrc: string;
  title: string;
  description: string;
}) => {
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [playVideo, setPlayVideo] = useState(false);
  return (
    <motion.div
      ref={ref}
      initial="init"
      whileInView="inView"
      onPointerMove={(e) => {
        posX.set(e.clientX - (ref.current?.getBoundingClientRect().x || 0));
        posY.set(e.clientY - (ref.current?.getBoundingClientRect().y || 0));
      }}
      viewport={{
        margin: "0px 0px -200px 0px",
        once: true,
      }}
      transition={{ staggerChildren: 0.2 }}
      className="group relative cursor-none border-b not-md:p-3 md:aspect-[3]"
    >
      <AnimatePresence>
        {playVideo ? (
          <div key="iframe" className="absolute inset-0 z-20">
            <button
              className="absolute top-3 right-3 z-20 -mt-8 font-akira text-fluid-sm text-black md:-mt-12"
              onClick={() => setPlayVideo(false)}
            >
              X
            </button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full w-full"
            >
              <iframe
                className="absolute inset-0 h-full w-full bg-black"
                src={videoSrc}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                title="Commissions - Ark: Fjordur [Studio Wildcard - Dynamedion]"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="cursor"
            style={{ x: posX, y: posY }}
            className="pointer-events-none absolute top-0 left-0 z-10 w-fit -translate-1/2 bg-black px-6 py-3 font-akira text-fluid-sm text-white opacity-0 transition-opacity duration-700 not-md:hidden group-hover:opacity-100"
          >
            play
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="relative flex h-full w-full items-center justify-between"
        onClick={() => setPlayVideo(true)}
      >
        <motion.div
          variants={{
            init: { clipPath: "inset(0 100% 0 0)" },
            inView: { clipPath: "inset(0 0 0 0)" },
          }}
          className="relative flex h-full w-full flex-col items-start justify-center gap-6 p-6"
        >
          <h1 className="text-fluid-xl">{title}</h1>
          <p className="max-w-[52ch] text-fluid-base">{description}</p>
          <button className="font-akira text-fluid-sm md:hidden">play</button>
        </motion.div>
        <motion.div
          variants={{
            init: { opacity: 0 },
            inView: { opacity: 1 },
          }}
          className="not-md:absolute not-md:inset-0 not-md:h-full md:max-w-md"
        >
          <img
            className="h-full w-full object-contain object-top-right opacity-25 brightness-50 grayscale transition-all md:group-hover:opacity-50 md:group-hover:grayscale-0"
            src={imageSrc}
            alt=""
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
