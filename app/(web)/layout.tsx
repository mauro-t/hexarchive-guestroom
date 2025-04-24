import { MotionConfig } from "motion/react";
import ReactLenis from "lenis/react";
import AppProvider from "@/components/app-context";
import Loader from "@/components/loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MotionConfig transition={{ duration: 0.7, easings: [0.6, 0, 0.2, 1] }}>
      <ReactLenis root>
        <AppProvider>
          <Loader>{children}</Loader>
        </AppProvider>
      </ReactLenis>
    </MotionConfig>
  );
}
