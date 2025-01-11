// "use client";

// import React from "react";
// import "./globals.css";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import { useSelector } from "react-redux";
// export default function layoutWrapper({ children }) {
//     const hover=useSelector((state)=>state.hover).hover
//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <div className="lg:ml-64 flex flex-col flex-1 hover:bg-gray-100 transition-colors duration-200">
//           <Sidebar />
//           <div className="flex flex-1">
//             <main className="p-4 flex-1 bg-white shadow-inner">{children}</main>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import React from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";

export default function LayoutWrapper({ children }) {
  const hover = useSelector((state) => state.hover).hover;

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Conditionally set the width of the sidebar based on hover */}
        <div
          className={` flex flex-col flex-1 transition-all duration-300 ${
            hover ? "w-48 lg:ml-64 " : "w-24 lg:ml-20 "  // Expanding or collapsing sidebar
          }`}
        >
          <Sidebar />
          <div className="flex flex-1">
            <main className=" flex-1 bg-white shadow-inner">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}



// transition-all duration-300