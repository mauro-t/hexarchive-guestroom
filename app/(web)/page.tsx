import Credits from "@/components/credits";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modal";
import ProceedDeeper from "@/components/proceed-deeper";
import Welcome from "@/components/welcome";
import WhatAreYouLookingFor from "@/components/what-are-you-looking-for";
import WhatsThis from "@/components/whats-this";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const SPOTS_QUERY = defineQuery(`*[_type == "spot"]`);
const PROJECTS_QUERY = defineQuery(`*[_type == "project"]`);
const SHOWREEL_QUERY = defineQuery(`*[_type == "showreel"]`);
const CREDITS_QUERY = defineQuery(`*[_type == "credits"]`);
const WHATSTHIS_QUERY = defineQuery(`*[_type == "whatsThis"]`);

export type Content = {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  image: SanityImageSource;
}[];

export default async function Guestroom() {
  const { data: spots }: { data: Content } = await sanityFetch({
    query: SPOTS_QUERY,
  });
  const { data: projects }: { data: Content } = await sanityFetch({
    query: PROJECTS_QUERY,
  });
  const { data: showreels }: { data: Content } = await sanityFetch({
    query: SHOWREEL_QUERY,
  });

  const { data: credits }: { data: { images: SanityImageSource[] }[] } =
    await sanityFetch({
      query: CREDITS_QUERY,
    });

  const { data: whatsThis }: { data: { content: any }[] } = await sanityFetch({
    query: WHATSTHIS_QUERY,
  });
  console.log(credits[0]);
  return (
    <>
      <Header />
      <Welcome />
      <WhatAreYouLookingFor />
      <ProceedDeeper />
      <WhatsThis content={whatsThis[0].content} />
      <Credits credits={credits[0].images.map((i) => urlFor(i)?.url())} />
      <Footer />
      <Modal
        projects={projects.map((p) => ({
          ...p,
          image: urlFor(p.image)?.url(),
        }))}
        spots={spots.map((p) => ({
          ...p,
          image: urlFor(p.image)?.url(),
        }))}
        showreel={showreels.map((p) => ({
          ...p,
          image: urlFor(p.image)?.url(),
        }))}
      />
    </>
  );
}
