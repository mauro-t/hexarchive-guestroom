"use client";

import { Fragment, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { useAppContext } from "./app-context";
import LoadingLayer from "./loading-layer";

export default function Loader({ children }: { children: React.ReactNode }) {
  const [isProjectsLoaded, setProjectsLoaded] = useState(false);
  const [isShowreelLoaded, setShowreelLoaded] = useState(false);
  const [isSpotsLoaded, setSpotsLoaded] = useState(false);
  const isVideosLoaded = isProjectsLoaded && isShowreelLoaded && isSpotsLoaded;
  const [initialAnimationState, setInitialAnimationState] = useState<
    "idle" | "start" | "done"
  >("idle");

  const context = useAppContext();

  const lenis = useLenis();

  useEffect(() => {
    if (initialAnimationState == "start") {
      context.projectsVideoRef.current?.load();
      context.showreelVideoRef.current?.load();
      context.spotsVideoRef.current?.load();
    }

    if (initialAnimationState == "done") {
      lenis?.start();
    } else {
      lenis?.stop();
    }
  }, [
    lenis,
    context.projectsVideoRef,
    context.showreelVideoRef,
    context.spotsVideoRef,
    initialAnimationState,
  ]);

  return (
    <>
      <AnimatePresence>
        {initialAnimationState != "done" ? (
          <LoadingLayer
            key="loading-layer"
            isVideosLoaded={isVideosLoaded}
            setInitialAnimationState={setInitialAnimationState}
          />
        ) : (
          <Fragment key="content">{children}</Fragment>
        )}
      </AnimatePresence>

      <video
        ref={context.projectsVideoRef}
        className="absolute h-0 w-0"
        src="/projects-preview.mp4"
        muted
        loop
        playsInline
        onCanPlay={(e) => {
          setProjectsLoaded(true);
          e.currentTarget.play();
        }}
      />
      <video
        ref={context.showreelVideoRef}
        className="absolute h-0 w-0"
        src="/showreel-preview.mp4"
        muted
        loop
        playsInline
        onCanPlay={(e) => {
          setShowreelLoaded(true);
          e.currentTarget.play();
        }}
      />
      <video
        ref={context.spotsVideoRef}
        className="absolute h-0 w-0"
        src="/spots-preview.mp4"
        muted
        loop
        playsInline
        onCanPlay={(e) => {
          setSpotsLoaded(true);
          e.currentTarget.play();
        }}
      />
    </>
  );
}
