import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Stats from "@/components/Stats/Stats";
import Animals from "@/components/Animals/Animals";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import ReportStray from "@/components/ReportStray/ReportStray";
import Donate from "@/components/Donate/Donate";
import Stories from "@/components/Stories/Stories";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Animals />
      <HowItWorks />
      <ReportStray />
      <Donate />
      <Stories />
      <Footer />
    </>
  );
}
