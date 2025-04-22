"use client";

import { useCallback, useEffect, useRef } from "react";

export default function VideoToCanvas({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isResizingRef = useRef(false);
  const drawCoordinates = useRef({
    sourceX: 0,
    sourceY: 0,
    sourceWidth: 0,
    sourceHeight: 0,
    destX: 0,
    destY: 0,
    destWidth: 0,
    destHeight: 0,
  });

  const draw = useCallback(() => {
    if (!canvasRef.current || !videoRef.current) return;
    const coordinates = drawCoordinates.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return console.error("Failed to get canvas context");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      videoRef.current,
      coordinates.sourceX,
      coordinates.sourceY,
      coordinates.sourceWidth,
      coordinates.sourceHeight,
      coordinates.destX,
      coordinates.destY,
      coordinates.destWidth,
      coordinates.destHeight,
    );
  }, []);

  const setCanvasSize = useCallback((canvas: HTMLCanvasElement) => {
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!parent || !ctx) return [0, 0] as const;
    const ratio = window.devicePixelRatio || 1;
    const { width, height } = parent.getBoundingClientRect();
    const cW = width * ratio;
    const cH = height * ratio;
    canvas.width = cW;
    canvas.height = cH;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    return [cW, cH] as const;
  }, []);

  const setDrawCoordinates = useCallback(() => {
    if (!canvasRef.current || !videoRef.current) return;

    const coordinates = drawCoordinates.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const [cW, cH] = setCanvasSize(canvas);
    const vW = video.videoWidth;
    const vH = video.videoHeight;

    const vAspect = vW / vH;
    const cAspect = cW / cH;

    if (cAspect > vAspect) {
      coordinates.sourceWidth = vW;
      coordinates.sourceHeight = vW / cAspect;
      coordinates.sourceX = 0;
      coordinates.sourceY = (vH - coordinates.sourceHeight) / 2;
    } else {
      coordinates.sourceHeight = vH;
      coordinates.sourceWidth = vH * cAspect;
      coordinates.sourceY = 0;
      coordinates.sourceX = (vW - coordinates.sourceWidth) / 2;
    }
    coordinates.destWidth = cW;
    coordinates.destHeight = cH;
  }, [setCanvasSize]);

  useEffect(() => {
    let frameId: number;

    const loop = () => {
      if (!isResizingRef.current) {
        draw();
      }
      frameId = requestAnimationFrame(loop);
    };

    setDrawCoordinates();
    loop();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [draw, setDrawCoordinates]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!canvasRef.current?.parentElement) return;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      if (!isResizingRef.current) {
        isResizingRef.current = true;
      }
      setDrawCoordinates();
      draw();
      timeoutId = setTimeout(() => {
        isResizingRef.current = false;
      }, 1000 / 55);
    });
    observer.observe(canvasRef.current.parentElement);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [setDrawCoordinates, draw]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
