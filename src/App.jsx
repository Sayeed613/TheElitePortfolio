import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Project from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

export default function App() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollContainerRef.current,
      smooth: true,
      lerp: 0.1,
    });
    window.LocomotiveScrollInstance = scroll;

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div
      data-scroll-container
      ref={scrollContainerRef}
      className=" overflow-hidden"
    >
      <Navbar />
      <div className="mt-20" data-scroll-section>
        <Home />
      </div>
      <div data-scroll-section>
        <About />
        <Project />
        <Contact />
        <Footer/>
      </div>
    </div>
  );
}
