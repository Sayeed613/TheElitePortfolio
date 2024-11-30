import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const location = useLocation();

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(formatTime(now));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const isActive = (path) => location.pathname === path;

  const handleScrollTo = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div>
      <nav className="fixed w-full flex justify-between p-6 z-20 text-white ">
        <div className="flex-1">
          <p className="font-light text-sm text-[#adadad]">
            local time <br /> {currentTime}
          </p>
        </div>

        <div className="flex-1 text-center">
          <p className="font-bold text-xl">
            <a href="#" className="text-[#adadad] text-lg sm:text-xl hover:opacity-80">
              The Elite Portfolio
            </a>
          </p>
        </div>

        <div className="flex-1 flex justify-end">
          <button
            onClick={handleToggle}
            className={`relative flex justify-center items-center p-6 bg-transparent outline-none h-5 w-7 cursor-pointer transition-all ease-out duration-300 burger ${isMenuOpen ? "active" : ""}`}
            aria-label="Toggle Menu"
          >
            <span className={`absolute bg-[#adadad] h-[2px] w-10 -translate-y-1.5 transition-transform ${isMenuOpen ? "rotate-45 translate-y-0" : ""}`}></span>
            <span className={`absolute bg-[#adadad] h-[2px] w-10 translate-y-1.5 transition-transform ${isMenuOpen ? "-rotate-45 translate-y-0" : ""}`}></span>
          </button>
        </div>
      </nav>

      <div
        style={{ backgroundColor: "black" }}
        className={`fixed top-0 left-0 w-screen h-screen z-10 transform transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-8 items-center justify-center w-full h-full">
          <div className="menu-item">
            <button
              onClick={() => handleScrollTo("home")}
              className={`text-white text-[10vw] sm:text-[6vw] leading-none text-center transition-all duration-300 hover:tracking-widest ${isActive("/") ? "border-b-2 border-red-500" : ""}`}
            >
              Home
            </button>
          </div>
          <div className="menu-item">
            <button
              onClick={() => handleScrollTo("about")}
              className={`text-white text-[10vw] sm:text-[6vw] leading-none text-center transition-all duration-300 hover:tracking-widest ${isActive("/about") ? "border-b-2 border-red-500" : ""}`}
            >
              About
            </button>
          </div>
          <div className="menu-item">
            <button
              onClick={() => handleScrollTo("education")}
              className={`text-white text-[10vw] sm:text-[6vw] leading-none text-center transition-all duration-300 hover:tracking-widest ${isActive("/education") ? "border-b-2 border-red-500" : ""}`}
            >
              Education
            </button>
          </div>
          <div className="menu-item">
            <button
              onClick={() => handleScrollTo("portfolio")}
              className={`text-white text-[10vw] sm:text-[6vw] leading-none text-center transition-all duration-300 hover:tracking-widest ${isActive("/portfolio") ? "border-b-2 border-red-500" : ""}`}
            >
              Portfolio
            </button>
          </div>
          <div className="menu-item">
            <button
              onClick={() => handleScrollTo("contact")}
              className={`text-white text-[10vw] sm:text-[6vw] leading-none text-center transition-all duration-300 hover:tracking-widest ${isActive("/contact") ? "border-b-2 border-red-500" : ""}`}
            >
              Contact
            </button>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 text-xs uppercase text-white sub-nav glitch">
          <p>
            <a href="#" className="hover:underline">Instagram</a>
          </p>
          <p>.</p>
          <p>
            <a href="#" className="hover:underline">LinkedIn</a>
          </p>
          <p>.</p>
          <p>
            <a href="#" className="hover:underline">GitHub</a>
          </p>
        </div>
      </div>
    </div>
  );
}
