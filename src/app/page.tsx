import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";

export default function Home() {
  return (
    <>
      <WelcomeModal />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
      </main>
      <Footer />
    </>
  );
}
