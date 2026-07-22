import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import SelectedWork from "@/components/SelectedWork";
import Skills from "@/components/Skills";

/**
 * Single-page portfolio. Section order mirrors what a recruiter needs
 * first: who I am → where I've shipped → selected work → skills → about.
 * All copy lives in src/data/content.ts.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className="mx-auto max-w-5xl px-5 sm:px-8">
        <Hero />
        <Experience />
        <SelectedWork />
        <Skills />
        <About />
      </main>
      <Footer />
    </>
  );
}
