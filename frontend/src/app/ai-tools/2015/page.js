"use client";

import { useEffect, useState } from "react";

export default function Tool2015Page() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetch("/2015.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTools(data);
        }
      })
      .catch((err) => console.error("Error fetching 2015 data:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All 2015 Tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-6 flex flex-col">
            <img
              src={tool.icon}
              alt={tool.title}
              className="w-full h-48 object-contain rounded"
              loading="lazy" 
            />
            <h2 className="mt-4 text-lg font-semibold">{tool.title}</h2>
            <p className="text-sm text-gray-600">{tool.price}</p>
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-700 text-sm mt-2"
            >
              Use Tool
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

