import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Marquee from "react-fast-marquee";

export default function Contact() {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending....");

    const formPayload = new FormData();
    formPayload.append("access_key", "a30636e2-a7d1-4796-ab8a-7314e3019a60"); // Your Web3Forms access key
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone);
    formPayload.append("company", formData.company);
    formPayload.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form submitted successfully!");
        // Reset the form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        setResult(data.message || "Oops! Something went wrong.");
      }
    } catch (error) {
      console.log("Error sending form:", error);
      setResult("Oops! Something went wrong.");
    }
  };

  return (
    <div id="contact" className="container text-white mt-10">
      {/* Top Nav */}
      <div className="w-full text-xs text-start py-4 font-light">
        <p className=" w-[95%] m-auto">
          WELCOME TO MY PORTFOLIO, A CURATED COLLECTION OF MY BEST PROJECTS,
          SHOWCASING MY WORK AS A FREELANCE DEVELOPER AND DESIGNER. LET'S CREATE
          SOMETHING AMAZING TOGETHER.
        </p>
      </div>

      <div className="w-full h-16 px-8 text-end sm:text-start ">

        <div className="text-sm uppercase font-light hidden sm:block">
        Freelance Developer & Designer <ion-icon name="filter-sharp" className="relative top-0.5"></ion-icon>
        </div>
      </div>

      {/* Marquee */}
      <div className="w-full pt-5">
        <Marquee autoFill gradient={false} speed={50}>
          <span className="font-bold text-gray-400 text-[6em] sm:text-[8em] lowercase inline-block">
            Contact us / Contact us / Contact us / Contact us / Contact us / Contact us / Contact us / Contact us /
          </span>
        </Marquee>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col sm:flex-row w-full contact-section">
        {/* Contact Details */}
        <div className="contact-detail sm:w-1/2 w-full p-8">
          <p className="text-4xl leading-[60px] pt-4">
            Let’s unlock together the next level of possibilities. Reach out.
          </p>

          {/* Social Media */}
          <div className="social-media mt-8">
            <h3 className="uppercase text-gray-600 font-normal mb-2">Social Media</h3>
            <span className="uppercase">INSTAGRAM - GITHUB - LINKEDIN</span>
          </div>

          {/* Contact Info */}
          <div className="contact-info w-full flex sm:justify-between mt-8">
            {/* Email */}
            <div className="email">
              <h3 className="uppercase text-gray-600 font-normal">GET IN TOUCH</h3>
              <span className="text-lg">sayeedahmed90082@gmail.com</span>
            </div>

            {/* Address */}
            <div className="address pl-16 sm:pl-8 mt-4 sm:mt-0">
              <h3 className="uppercase text-gray-600 font-normal">Location</h3>
              <span className="text-lg">Robertsonpet, Bangalore</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form sm:w-1/2 w-full p-8">
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              {/* Name and Phone Row */}
              <div className="row flex flex-col sm:flex-row mb-8 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border-b text-2xl p-2 w-full"
                />
                <input
                  type="number"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-transparent border-b text-2xl p-2 w-full"
                />
              </div>

              {/* Email and Company Row */}
              <div className="row flex flex-col sm:flex-row mb-8 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border-b text-2xl p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-transparent border-b text-2xl p-2 w-full"
                />
              </div>

              {/* Message Row */}
              <div className="row flex mb-8">
                <textarea
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  id="message"
                  cols="30"
                  rows="5"
                  className="bg-transparent border-b text-2xl p-2 w-full"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="row flex justify-between items-center">
                <button type="submit" className="text-white text-3xl sm:text-6xl font-semibold">
                  Submit
                </button>
                <div className="sent-icon">
                  <IoIosArrowRoundForward size={50} className="sm:size-100" />
                </div>
              </div>
            </form>

            {/* Display Submission Result */}
            {result && <p className="mt-4 text-white">{result}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
