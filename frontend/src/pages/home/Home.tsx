import { Partners } from "@/components";
import { AboutAlreadyConvinced } from "@/features/about";
import { HomeHero, HomeFeatures, HomeHowTo, HomeTokenomics, HomeRoadmap } from "@/features/home";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Partners />
      <HomeFeatures />
      <HomeHowTo />
      <HomeTokenomics />
      <HomeRoadmap />

      <AboutAlreadyConvinced />
    </>
  );
}
