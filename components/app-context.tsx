"use client";
import { useLenis } from "lenis/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export type ModalType = {
  kind: "projects" | "showreel" | "spots";
  anchorBounds: DOMRect;
} | null;

const AppContext = createContext({
  modal: null as ModalType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setModal: (_modal: ModalType) => {},
  projectsVideoRef: {
    current: null,
  } as React.RefObject<HTMLVideoElement | null>,
  showreelVideoRef: {
    current: null,
  } as React.RefObject<HTMLVideoElement | null>,
  spotsVideoRef: { current: null } as React.RefObject<HTMLVideoElement | null>,
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modal, setModal] = useState<ModalType>(null);

  const projectsVideoRef = useRef<HTMLVideoElement | null>(null);

  const showreelVideoRef = useRef<HTMLVideoElement | null>(null);

  const spotsVideoRef = useRef<HTMLVideoElement | null>(null);

  const appContextValue = {
    modal,
    projectsVideoRef,
    showreelVideoRef,
    spotsVideoRef,
    setModal,
  };

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (modal) lenis.stop();
    else lenis.start();
  }, [lenis, modal]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
