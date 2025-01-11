import React, { useState, useEffect } from "react";
import Image from "next/image";
import authPosterImage6 from "../../assets/authPoster6.png";
import authPosterImage9 from "../../assets/authPoster9.png";
import authPosterImage8 from "../../assets/authPoster8.png";
import { useSelector } from "react-redux";
export default function AuthPoster() {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useSelector((state) => state.theme.mode);
  const imgArray = [
    { url: authPosterImage8 },
    { url: authPosterImage6 },
    { url: authPosterImage9 },
  ];

  const infoArray = [
    {
      heading: "Revolutionize Workflow",
      description: "Automate tasks and boost efficiency with AI-powered tools.",
    },
    {
      heading: "Personalized AI Solutions",
      description: "Get tailored insights that adapt to your needs.",
    },
    {
      heading: "Smarter Data Decisions",
      description: "Transform data into actionable insights effortlessly.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % imgArray.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [imgArray.length]);
  
  return (
    <div className={`flex flex-col items-center justify-center h-screen w-full ${
        theme === 'dark' ? 'bg-primary-800  text-white' : 'bg-white text-gray-800'
      }`}>
      {/* Image Box */}
      {/* <div className="w-full max-w-md h-64 overflow-hidden flex items-center justify-center">
        <Image
          key={activeIndex}
          src={imgArray[activeIndex].url}
          alt={`Image ${activeIndex + 1}`}
          className="w-full h-full object-cover"
          style={{ maxHeight: "256px", maxWidth: "100%" }}
        />
      </div> */}

      {/* Text Box */}
      <div className="relative w-full max-w-[50%] text-center py-4 h-32">
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-1000 opacity-100">
          <h3 className="text-2xl font-bold mb-2">
            {infoArray[activeIndex].heading}
          </h3>
          <p>{infoArray[activeIndex].description}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex space-x-2 mt-4">
        {imgArray.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              activeIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setActiveIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
