import { useState } from "react";
import images from "../assets/projects-assets/images";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";

function Projects() {
  const [image, setImage] = useState(images);

  return (
    <BackgroundBeamsWithCollision>
    <div id="portfolio" className="mt-10 flex flex-col md:flex-row items-center justify-between w-full m-auto ">
      {/* Left Section */}
      <div className="w-full md:w-[30%] p-6 md:p-10 h-auto md:h-screen mb-[100px]">
        <h1 className="text-white text-start text-2xl md:text-xl font-semibold">Featured Portfolio</h1>
        <br />
        <div className="w-full text-start">
          <p className="text-[#adadad] font-sans text-base md:text-sm mt-4">
            These are a few of the many projects I have designed and developed.
            Each project showcases my skills in modern web technologies, UI/UX
            design, and creating seamless user experiences.
          </p>
          <p className="text-[#adadad] mt-6 text-base md:text-sm">
            Explore the projects to see how I bring creative ideas to life, from
            responsive websites to interactive web applications.
          </p>
          <p className="text-[#adadad] mt-6 text-base md:text-sm">
            Click to view each project in detail.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[70%] h-auto overflow-hidden">
        <hr className="w-[94%] m-auto border-t-2 border-[#102125] my-6" />

        <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-8 py-6">
  {image.map((img) => (
    <a
    key={img.id}
    href={img.link}
    target="_blank"
    rel="noopener noreferrer"
    className="relative bg-gray-900 overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300"
    >
      {/* Image */}
      <img
        src={img.src}
        alt={img.title}
        className="w-full h-[200px] object-cover"
      />

      <div
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white flex items-center justify-between px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
        {/* Title */}
        <p className="text-white text-sm">{img.title}</p>

        {/* SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          className="cursor-pointer pt-2"
        >
          <path
            fill="#fff"
            d="M0 4.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-1ZM3 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 1-1v-1ZM3 1.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1Z"
          ></path>
        </svg>
      </div>
    </a>
  ))}
</div>


        <hr className="w-[94%] m-auto border-t-2 border-[#102125] mt-6" />
      </div>
    </div>
  </BackgroundBeamsWithCollision>
  );
}

export default Projects;
