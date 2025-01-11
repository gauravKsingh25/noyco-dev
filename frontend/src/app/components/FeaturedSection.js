// "use client";
// import { motion } from "framer-motion";

// export default function FeaturedSection() {
//   return (
//     <div className="hidden md:block w-1/4 bg-gray-100 p-4 border-l">
//       <h2 className="text-xl font-bold">Featured</h2>
//       <motion.p
//         className="mt-2"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         Use this space for your featured content, ads, or links to trending AIs.
//       </motion.p>
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FeaturedSection() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await fetch("http://localhost:5000/api/fai-tools");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const result = await response.json();
        setTools(result.data); 
      } catch (err) {
        console.error("Error fetching AI Tools:", err);
        setError("Failed to load tools.");
      } finally {
        setLoading(false);
      }
    }

    fetchTools();
  }, []);

  if (loading) {
    return (
      <div className="hidden md:block w-1/4 bg-gray-100 p-4 border-l">
        <h2 className="text-xl font-bold">Featured</h2>
        <p className="mt-2">Loading AI tools...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hidden md:block w-1/4 bg-gray-100 p-4 border-l">
        <h2 className="text-xl font-bold">Featured</h2>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="hidden md:block w-1/4 bg-gray-100 p-4 border-l">
      <h2 className="text-xl font-bold">Featured</h2>

      <motion.p
        className="mt-2 mb-4 text-sm text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Our top AI picks
      </motion.p>

      {tools.length === 0 ? (
        <p className="text-sm text-gray-500">No AI tools added yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {tools.map((tool) => (
            <motion.div
              key={tool._id || tool.id}
              className="bg-white rounded shadow p-2 flex flex-row items-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={tool.image}
                alt={tool.title}
                className="w-16 h-16 object-cover rounded mr-3"
              />

              <div className="flex-1">
                <h3 className="text-sm font-semibold">{tool.title}</h3>
                <p className="text-xs text-gray-500">
                 {tool.category || "Uncategorized"}
                </p>

                <p className="text-xs text-gray-700 mt-1">{tool.pricing}</p>

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-blue-600 text-xs underline"
                >
                  Use Tool
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

