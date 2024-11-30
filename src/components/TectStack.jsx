import Marquee from "react-fast-marquee";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";


export default function TectStack() {
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  const paragraphsRef = useRef([]);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
        },
      }
    );

    // Animations for paragraphs
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
          },
        }
      );
    });
  }, []);
  const images = [
    "/src/assets/teck-stack-icons/html.png",
    "/src/assets/teck-stack-icons/css.png",
    "/src/assets/teck-stack-icons/js.png",
    "/src/assets/teck-stack-icons/react.png",
    "/src/assets/teck-stack-icons/nodejs.png",
    "/src/assets/teck-stack-icons/express.js.png",
    "/src/assets/teck-stack-icons/mongodb.png",
    "/src/assets/teck-stack-icons/tailwindcss.png",
    "/src/assets/teck-stack-icons/acernityUi.ico",
    "/src/assets/teck-stack-icons/figma.png",
    "/src/assets/teck-stack-icons/three.js.png",
  ];

  const languages = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "TailwindCSS",
    "AeternityUI",
    "Figma",
    "Three.js",
  ];

  return (
    <div ref={sectionRef} className="mt-20">
      <Marquee autoFill gradient={false} speed={50}>
        {images.map((src, index) => (
          <div
            key={index}
            className="mx-4 flex justify-center items-center w-24 h-24"
          >
            <img
              src={src}
              alt={`Tech Icon ${index}`}
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
      <Marquee autoFill gradient={false} speed={50} direction="right">
        {languages.map((lang, index) => (
          <span
            key={index}
            className="mx-4 text-black text-lg font-medium uppercase tracking-wide"
          >
            {lang}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
