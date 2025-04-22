import Credits from "@/components/credits";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProceedDeeper from "@/components/proceed-deeper";
import Welcome from "@/components/welcome";
import WhatAreYouLookingFor from "@/components/what-are-you-looking-for";
import WhatsThis from "@/components/whats-this";

export default function Guestroom() {
  return (
    <>
      <Header />
      <Welcome />
      <WhatAreYouLookingFor />
      <ProceedDeeper />
      <WhatsThis />
      <Credits />
      <Footer />
    </>
  );
}
