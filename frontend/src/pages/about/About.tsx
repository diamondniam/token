import { Partners } from "@/components";
import { AboutAlreadyConvinced, AboutHero, AboutTeam } from "@/features/about";

export default function About() {
  return (
    <>
      <AboutHero />
      <Partners />
      <AboutTeam />
      <AboutAlreadyConvinced />
    </>
  );
}
