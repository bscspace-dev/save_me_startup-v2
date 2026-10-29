import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories, Picks, NewListings } from "@/components/Sections";
import { Consult } from "@/components/ConsultForm";
import { Footer } from "@/components/Footer";
import { YoutubePopup } from "@/components/YoutubePopup";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <Picks />
        <NewListings />
        <Consult />
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
