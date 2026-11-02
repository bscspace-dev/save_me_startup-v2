import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories, NewListings } from "@/components/Sections";
import { Consult } from "@/components/ConsultForm";
import { Footer } from "@/components/Footer";
import { TestNoticePopup } from "@/components/TestNoticePopup";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <NewListings />
        <Consult />
      </main>
      <Footer />
      <TestNoticePopup />
    </>
  );
}
