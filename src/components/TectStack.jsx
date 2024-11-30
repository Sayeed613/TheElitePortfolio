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
"https://i.postimg.cc/76g6V8zm/html.png",
    "https://i.postimg.cc/pLDzSzRW/css.png",
    "https://i.postimg.cc/SQgqpxmc/js.png",
    "https://i.postimg.cc/yNjpSWQP/react.png",
    "https://i.postimg.cc/fLFGJJyP/nodejs.png",
    "https://i.postimg.cc/cHKjy0hB/express-js.png",
    "https://i.postimg.cc/y8tcpKJH/mongodb.png",
    "https://i.postimg.cc/jdCDp9Yd/tailwindcss.png",
    "https://i.postimg.cc/rpn88ykd/saddd-1.png",
    "https://i.postimg.cc/FRB43TWD/figma.png",
    "https://i.postimg.cc/ZqYnLDHS/three-js.png",
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
