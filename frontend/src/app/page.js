"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import FeaturedSection from "./components/FeaturedSection";
import TopSection from "./components/TopSection";

const months = [
  "New", "DEC", "NOV", "OCT", "SEP", "AUG",
  "JUL", "JUN", "MAY", "APR", "MAR", "FEB", "JAN"
];
const years = [
  "2024", "2023", "2022", "2021", "2020", "2019", "2018",
  "2017", "2016", "2015",
];


function SectionCards({ title }) {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fileName = title.toLowerCase();

    fetch(`/${fileName}.json`)
      .then((res) => {
        if (!res.ok) {
          console.error(`No JSON file found for "${title}" at /${fileName}.json`);
          return [];
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTools(data.slice(0, 16));
        }
      })
      .catch((err) => {
        console.error(`Error fetching data for "${title}":`, err);
      });
  }, [title]);

  return (
    <section
      id={title}
      className="section min-h-screen py-10 bg-gray-100 text-gray-800 border-t flex flex-col"
      style={{ paddingBottom: "200px" }}
    >
      <motion.h2
        className="text-2xl mb-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {title} Section
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 w-full">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-6 flex flex-col"
          >
            <img
              src={tool.icon}
              alt={tool.title}
              className="w-full h-48 object-contain rounded"
              loading="lazy"
            />
            <h3 className="mt-4 text-lg font-semibold">{tool.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{tool.price}</p>
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-blue-700 text-sm underline"
            >
              Use Tool
            </a>
          </div>
        ))}
      </div>

      {tools.length === 16 && (
        <div className="text-center mt-6">
          <Link
            href={`/ai-tools/${title.toLowerCase()}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View More
          </Link>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("New");
  const [isManualScroll, setIsManualScroll] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isManualScroll) return;

        entries.forEach((entry) => {
          console.log(
            "Observing section:",
            entry.target.id,
            "isIntersecting:",
            entry.isIntersecting,
            "ratio:",
            entry.intersectionRatio
          );

          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px",
      }
    );

    document.querySelectorAll(".section").forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isManualScroll]);

  const handleClick = (id) => {
    setIsManualScroll(true);
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    setTimeout(() => {
      setIsManualScroll(false);
    }, 1000);
  };

  return (
    <div>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap");
        body {
          font-family: "Poppins", sans-serif;
        }
      `}</style>
  <TopSection/>
      <div className="flex">
        <div className="h-full w-18 h-[90vh] rounded  bg-gray-800 text-white sticky top-[5vh] md:top-[10vh] lg:top-[10vh] ml-4 flex flex-col justify-between items-center overflow-y-auto">
          <div className="flex flex-col items-center mt-4 pb-2 md:pb-4 lg:pb-4 pt-1 md:pt-4 lg:pt-0">
            {months.map((month) => (
              <div
                key={month}
                className={`cursor-pointer px-2 py-1 rounded text-sm transition-all duration-300 ${
                  activeSection === month ? "bg-gray-600 scale-110" : "opacity-70"
                }`}
                onClick={() => handleClick(month)}
              >
                {month}
              </div>
            ))}
            {years.map((year) => (
              <div
                key={year}
                className={`cursor-pointer px-2 py-1 rounded text-sm transition-all duration-300 ${
                  activeSection === year ? "bg-gray-600 scale-110" : "opacity-70"
                }`}
                onClick={() => handleClick(year)}
              >
                {year}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {months.map((month) => (
            <div key={month} className="section" id={month}>
              <SectionCards title={month} />
            </div>
          ))}

          {years.map((year) => (
            <div key={year} className="section" id={year}>
              <SectionCards title={year} />
            </div>
          ))}
        </div>

        <FeaturedSection/>
      </div>
    </div>
  );
}
