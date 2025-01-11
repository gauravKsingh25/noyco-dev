'use client';

import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function TopSection() {
  const hover= useSelector((state)=>state.hover).hover
  return (
    <section
      id="TOP"
      className="w-full min-h-[50vh] bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white flex flex-col justify-center items-center"
    >
      <motion.h1
        className="text-4xl font-extrabold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}



      >
        THERE'S AN AI FOR THAT
      </motion.h1>
      <motion.p
        className="mt-2 text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        26,715 AIs for 15,912 tasks and 4,947 jobs.
      </motion.p>
      <div className="relative mt-6 w-1/2 flex items-center">
        <FaSearch className="absolute left-4 text-gray-400" />
        <input
          type="text"
          placeholder="Find AIs using AI"
          className="w-full pl-12 p-4 bg-gray-800 border border-gray-700 rounded-md text-center text-white"
        />
      </div>
    </section>
  );
}
