import { useEffect, useState } from "react";
import Home from "@/components/sections/home";
import Navbar from "../components/layout/Navbar";
import AboutUs from "@/components/sections/about";
// import ContactUs from "@/components/sections/contact";
import Location from "@/components/sections/location";
import Footer from "@/components/layout/Footer";
import { FaArrowUp } from "react-icons/fa";
import "../styles/global.css";
import Timeline from "@/components/sections/timeline";
import Marquee from "@/components/sections/marque";
import Team from "@/components/sections/team";

export default function HomePage() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <Home />
      <Marquee />
      <AboutUs />
      <Timeline /> 
      {/* <ContactUs /> */}
      <Location />
      <Footer />

      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </>
  );
}