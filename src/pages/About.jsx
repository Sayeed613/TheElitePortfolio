import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TectStack from "../components/TectStack";
import { useLocomotiveScroll } from 'react-locomotive-scroll';

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphsRef = useRef([]);

  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    if (!scroll) return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.scrollerProxy(sectionRef.current, {
      scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value) : scroll.scroll.instance.scroll.y;
      },
      scrollHeight: () => document.documentElement.scrollHeight,
      offset: () => 0,
      pinType: sectionRef.current.style.transform ? "transform" : "fixed",
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          scroller: sectionRef.current,
        },
      }
    );

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          scroller: sectionRef.current,
        },
      }
    );

    paragraphsRef.current.forEach((paragraph, index) => {
      gsap.fromTo(
        paragraph,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5 + index * 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 90%",
            scroller: sectionRef.current,
          },
        }
      );
    });

    ScrollTrigger.addEventListener("refresh", () => scroll.update());

    return () => {
      ScrollTrigger.removeEventListener("refresh", () => scroll.update());
    };
  }, [scroll]);


  return (
    <div id="about" ref={sectionRef} className="bg-white h-screen w-full">
      <div className="text-center w-[90%] m-auto pt-10">
        <h4 ref={headingRef}>WHAT I'M DOING</h4>
        <div className="border-2 border-b-2 m-auto w-1/4"></div>
        <div className="pt-10">
          <div className="m-auto text-start">
            <h2 className="text-black font-extralight text-2xl">
              Full Stack Development
            </h2>
            <p
              ref={(el) => (paragraphsRef.current[0] = el)}
              className="text-[#adadad] font-light text-md"
            >
              Proficient in front-end development with a solid understanding of
              MERN stack. Expanding skills in back-end development, animations,
              and Data Structures & Algorithms (DSA).
            </p>
          </div>
          <br />
          <div className="m-auto text-start">
            <h2 className="text-black font-extralight text-2xl">
              Bachelor of Business Administration (BBA)
            </h2>
            <p
              ref={(el) => (paragraphsRef.current[1] = el)}
              className="text-[#adadad] font-light text-md"
            >
              Completed a comprehensive BBA program at Sri Bhagwan Mahaveer
              Jain college, graduating in 2024.
            </p>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "My_Resume.pdf";
                link.click();
              }}
              className="hoverable mt-10 px-8 py-2 font-extralight text-sm border-[0.1px] border-gray-400  hover:bg-[#adadad] hover:text-gray-800 transition duration-300 ease-in-out"
            >
              DOWNLOAD MY RESUME
            </button>
          </div>
        </div>
      </div>
      <div className=" h-[30vh] w-[90%] m-auto mt-10 shadow-sm">
        <h2 ref={headingRef} className="text-black text-5xl font-bold">Tech Stack</h2>
        <p ref={(el) => (paragraphsRef.current[0] = el)} className="text-[#adadad] text-lg font-light">
          These are the technologies I've worked with:
        </p>
        <TectStack />
      </div>
    </div>
  );
}
