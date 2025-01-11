// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import Link from 'next/link';
// // // import {
// // //   AiOutlineMenu,
// // //   AiOutlineClose,
// // //   AiOutlineHome,
// // //   AiOutlineTool,
// // //   AiOutlineUser,
// // //   AiOutlineStar,
// // //   AiOutlineClockCircle,
// // // } from 'react-icons/ai';
// // // import {
// // //   FaRegHandshake,
// // //   FaSuitcase,
// // //   FaCalendarAlt,
// // // } from 'react-icons/fa';
// // // import { BsGraphUp } from 'react-icons/bs';
// // // import { BsBriefcase } from 'react-icons/bs';
// // // import { useSelector, useDispatch } from 'react-redux';


// // // export default function Sidebar() {
// // //   const [isOpen, setIsOpen] = useState(true);
// // //   const [isMobile, setIsMobile] = useState(false);
// // //   // const sidebarRef = useRef(null);
// // //   const theme = useSelector((state) => state.theme.mode);
// // //   const hover=useSelector((state)=>state.hover)
// // //    const dispatch =useDispatch()

// // //   const handleMouseEnter = () => {
// // //     dispatch(changeOnHover()); // Dispatch to set hover to true
// // //   };

// // //   const handleMouseLeave = () => {
// // //     dispatch(changeOnHover()); // Dispatch to set hover to false
// // //   };
// // //   useEffect(() => {
// // //     const updateScreenSize = () => {
// // //       const isMobileView = window.innerWidth < 1024;
// // //       setIsMobile(isMobileView);
// // //       setIsOpen(!isMobileView);
// // //     };

// // //     updateScreenSize();
// // //     window.addEventListener('resize', updateScreenSize);
// // //     return () => window.removeEventListener('resize', updateScreenSize);
// // //   }, []);

// // //   const toggleSidebar = () => {
// // //     setIsOpen(!isOpen);
// // //   };

// // //   const menuItems = [
// // //     { label: 'Home', href: '/', icon: <AiOutlineHome size={20} /> },
// // //     { label: 'Profile', href: '/profile', icon: <AiOutlineUser size={20} /> },
// // //     { label: 'Free Signup', href: '/signup', icon: <AiOutlineUser size={20} /> },
// // //     { label: 'Just Launched', href: '/just-launched', icon: <AiOutlineStar size={20} /> },
// // //     { label: 'Featured', href: '/featured', icon: <AiOutlineStar size={20} /> },
// // //     { label: 'Popular', href: '/popular', icon: <AiOutlineClockCircle size={20} /> },
// // //     { label: 'Tasks', href: '/tasks', icon: <FaSuitcase size={20} /> },
// // //     { label: 'Find a Job', href: '/jobs', icon: <BsBriefcase size={20} /> },
// // //     { label: 'Job Impact', href: '/job-impact', icon: <BsGraphUp size={20} /> },
// // //     { label: 'Events', href: '/events', icon: <FaCalendarAlt size={20} /> },
// // //     { label: 'Submit/Advertise', href: '/submit', icon: <AiOutlineTool size={20} /> },
// // //     { label: 'Forum', href: '/forum', icon: <AiOutlineStar size={20} /> },
// // //     { label: 'Newsletter', href: '/newsletter', icon: <AiOutlineStar size={20} /> },
// // //     { label: 'Contact us', href: '/contact-us', icon: <AiOutlineUser size={20} /> },
// // //   ];
// // //   return (
// // //     <>
// // //       {/* Mobile Toggle Button - Now with white background */}
// // //       {isMobile && (
// // //         <button
// // //         onClick={toggleSidebar}
// // //         className="fixed top-14 left-4 z-50 p-3 bg-white rounded-md shadow-lg hover:bg-gray-100 transition-colors duration-200"
// // //         aria-label="Toggle Menu"
// // //       >
// // //         <div className="text-gray-800">
// // //           {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
// // //         </div>
// // //       </button>
// // //       )}

// // //       {/* Sidebar */}
// // //       <AnimatePresence>
// // //         {(isOpen || !isMobile) && (
// // //           <motion.aside
// // //             initial={{ x: isMobile ? '-100%' : 0 }}
// // //             animate={{ x: 0 }}
// // //             exit={{ x: '-100%' }}
// // //             transition={{ type: 'spring', stiffness: 100, damping: 20 }}
// // //             onMouseEnter={handleMouseEnter}
// // //             onMouseLeave={handleMouseLeave}
// // //             className="fixed left-0 bg-gray-800 text-white shadow-lg z-40 h-full lg:w-64"
  

// // //             style={{ width: isMobile ? '280px' : '256px' }}
// // //           >
// // //             {/* Sidebar Content */}
// // //             <div className="flex flex-col h-auto">
        
// // //               <div>
// // //               <nav className="flex-1 overflow-y-auto">
// // //                 <ul className="p-4 space-y-2">
// // //                   {menuItems.map((item, index) => (
// // //                     <motion.li
// // //                       key={item.label}
// // //                       initial={{ opacity: 0, x: -20 }}
// // //                       animate={{ opacity: 1, x: 0 }}
// // //                       transition={{ duration: 0.2 }}
// // //                     >
// // //                       <Link
// // //                         href={item.href}
// // //                         className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
// // //                         onClick={() => isMobile && toggleSidebar()}
// // //                       >
// // //                         <span className="text-gray-300">{item.icon}</span>
// // //                         <span>{item.label}</span>
// // //                       </Link>

// // //                       {/* {index===9&&<hr class="border-t border-gray-300 my-4"/>} */}
// // //                     </motion.li>
// // //                   ))}
// // //                 </ul>
// // //               </nav>
// // //               </div>

// // //               {/* Footer */}
// // //               <div className="p-4 bg-gray-700 text-center text-sm">
// // //                 <p>&copy; 2024 AI Tools Explorer</p>
// // //               </div>
// // //             </div>
// // //           </motion.aside>
// // //         )}
// // //       </AnimatePresence>

// // //       {/* Overlay */}
// // //       <AnimatePresence>
// // //         {isOpen && isMobile && (
// // //           <motion.div
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 0.5 }}
// // //             exit={{ opacity: 0 }}
// // //             transition={{ duration: 0.2 }}
// // //             className="fixed inset-0 bg-black z-30"
// // //             onClick={toggleSidebar}
// // //           />
// // //         )}
// // //       </AnimatePresence>
// // //     </>
// // //   );
// // // }







// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import Link from 'next/link';
// // // // import {
// // // //   AiOutlineMenu,
// // // //   AiOutlineClose,
// // // //   AiOutlineHome,
// // // //   AiOutlineTool,
// // // //   AiOutlineUser,
// // // //   AiOutlineStar,
// // // //   AiOutlineClockCircle,
// // // // } from 'react-icons/ai';
// // // // import {
// // // //   FaSuitcase,
// // // //   FaCalendarAlt,
// // // // } from 'react-icons/fa';
// // // // import { BsGraphUp } from 'react-icons/bs';
// // // // import { BsBriefcase } from 'react-icons/bs';
// // // // import { useSelector, useDispatch} from 'react-redux';
// // // // import { changeOnHover } from '@/store/slices/hoverSidebarSlice';

// // // // export default function Sidebar() {
// // // //   const [isOpen, setIsOpen] = useState(true);
// // // //   const [isMobile, setIsMobile] = useState(false);
// // // //   const hover=useSelector((state)=>state.hover)
// // // //   const dispatch =useDispatch()

// // // //   const handleMouseEnter = () => {
// // // //     dispatch(changeOnHover()); // Dispatch to set hover to true
// // // //   };

// // // //   const handleMouseLeave = () => {
// // // //     dispatch(changeOnHover()); // Dispatch to set hover to false
// // // //   };

// // // //   const theme = useSelector((state) => state.theme.mode);

// // // //   useEffect(() => {
// // // //     const updateScreenSize = () => {
// // // //       const isMobileView = window.innerWidth < 1024;
// // // //       setIsMobile(isMobileView);
// // // //       setIsOpen(!isMobileView);
// // // //     };

// // // //     updateScreenSize();
// // // //     window.addEventListener('resize', updateScreenSize);
// // // //     return () => window.removeEventListener('resize', updateScreenSize);
// // // //   }, []);

// // // //   const toggleSidebar = () => {
// // // //     setIsOpen(!isOpen);
// // // //   };

// // // //   const menuItems = [
// // // //     { label: 'Home', href: '/', icon: <AiOutlineHome size={20} /> },
// // // //     { label: 'Profile', href: '/profile', icon: <AiOutlineUser size={20} /> },
// // // //     { label: 'Free Signup', href: '/signup', icon: <AiOutlineUser size={20} /> },
// // // //     { label: 'Just Launched', href: '/just-launched', icon: <AiOutlineStar size={20} /> },
// // // //     { label: 'Featured', href: '/featured', icon: <AiOutlineStar size={20} /> },
// // // //     { label: 'Popular', href: '/popular', icon: <AiOutlineClockCircle size={20} /> },
// // // //     { label: 'Tasks', href: '/tasks', icon: <FaSuitcase size={20} /> },
// // // //     { label: 'Find a Job', href: '/jobs', icon: <BsBriefcase size={20} /> },
// // // //     { label: 'Job Impact', href: '/job-impact', icon: <BsGraphUp size={20} /> },
// // // //     { label: 'Events', href: '/events', icon: <FaCalendarAlt size={20} /> },
// // // //     { label: 'Submit/Advertise', href: '/submit', icon: <AiOutlineTool size={20} /> },
// // // //     { label: 'Forum', href: '/forum', icon: <AiOutlineStar size={20} /> },
// // // //     { label: 'Newsletter', href: '/newsletter', icon: <AiOutlineStar size={20} /> },
// // // //     { label: 'Contact us', href: '/contact-us', icon: <AiOutlineUser size={20} /> },
// // // //   ];

// // // //   return (
// // // //     <>
// // // //       {isMobile && (
// // // //         <button
// // // //           onClick={toggleSidebar}
// // // //           className="fixed top-14 left-4 z-50 p-3 bg-white rounded-md shadow-lg hover:bg-gray-100 transition-colors duration-200"
// // // //           aria-label="Toggle Menu"
// // // //         >
// // // //           <div className="text-gray-800">
// // // //             {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
// // // //           </div>
// // // //         </button>
// // // //       )}

// // // //       <AnimatePresence>
// // // //         {(isOpen || !isMobile) && (
// // // //           <motion.aside
// // // //             initial={{ x: isMobile ? '-100%' : 0 }}
// // // //             animate={{ x: 0 }}
// // // //             exit={{ x: '-100%' }}
// // // //             onMouseEnter={handleMouseEnter}
// // // //             onMouseLeave={handleMouseLeave}
// // // //             transition={{ type: 'spring', stiffness: 100, damping: 20 }}
// // // //             className="fixed left-0 bg-gray-800 text-white shadow-lg z-40 h-full group transition-all duration-300 ease-in-out w-16 hover:w-64"
// // // //           >
// // // //             <div className="flex flex-col h-auto">
// // // //               <nav className="flex-1 overflow-y-auto">
// // // //                 <ul className="p-4 space-y-2">
// // // //                   {menuItems.map((item) => (
// // // //                     <motion.li
// // // //                       key={item.label}
// // // //                       initial={{ opacity: 0, x: -20 }}
// // // //                       animate={{ opacity: 1, x: 0 }}
// // // //                       transition={{ duration: 0.2 }}
// // // //                     >
// // // //                       <Link
// // // //                         href={item.href}
// // // //                         className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
// // // //                         onClick={() => isMobile && toggleSidebar()}
// // // //                       >
// // // //                         <span className="text-gray-300">{item.icon}</span>
// // // //                         <span className="text-gray-300 group-hover:opacity-100 opacity-0 transition-opacity duration-200">
// // // //                           {item.label}
// // // //                         </span>
// // // //                       </Link>
// // // //                     </motion.li>
// // // //                   ))}
// // // //                 </ul>
// // // //               </nav>

// // // //               {/* <div className="p-4 bg-gray-700 text-center text-sm">
// // // //                 <p>&copy; 2024 AI Tools Explorer</p>
// // // //               </div> */}
// // // //             </div>
// // // //           </motion.aside>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       <AnimatePresence>
// // // //         {isOpen && isMobile && (
// // // //           <motion.div
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 0.5 }}
// // // //             exit={{ opacity: 0 }}
// // // //             transition={{ duration: 0.2 }}
// // // //             className="fixed inset-0 bg-black z-30"
// // // //             onClick={toggleSidebar}
// // // //           />
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </>
// // // //   );
// // // // }





// // "use client";

// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import Link from "next/link";
// // import "../globals.css";
// // import {
// //   AiOutlineMenu,
// //   AiOutlineClose,
// //   AiOutlineHome,
// //   AiOutlineTool,
// //   AiOutlineUser,
// //   AiOutlineStar,
// //   AiOutlineClockCircle,
// // } from "react-icons/ai";
// // import {
// //   FaRegHandshake,
// //   FaSuitcase,
// //   FaCalendarAlt,
// // } from "react-icons/fa";
// // import { BsGraphUp } from "react-icons/bs";
// // import { BsBriefcase } from "react-icons/bs";
// // import { useSelector, useDispatch } from "react-redux";
// // import { changeOnHover } from "@/store/slices/hoverSidebarSlice"; // Adjust according to your slice

// // export default function Sidebar() {
// //   const [isOpen, setIsOpen] = useState(true);
// //   const [isMobile, setIsMobile] = useState(false);
// //   const hover = useSelector((state) => state.hover.hover); // Getting hover state
// //   const dispatch = useDispatch();

// //   const handleMouseEnter = () => {
// //     dispatch(changeOnHover()); // Dispatch to set hover to true
// //   };

// //   const handleMouseLeave = () => {
// //     dispatch(changeOnHover()); // Dispatch to set hover to false
// //   };

// //   useEffect(() => {
// //     const updateScreenSize = () => {
// //       const isMobileView = window.innerWidth < 1024;
// //       setIsMobile(isMobileView);
// //       setIsOpen(!isMobileView); // Sidebar opens on non-mobile views
// //     };

// //     updateScreenSize();
// //     window.addEventListener("resize", updateScreenSize);
// //     return () => window.removeEventListener("resize", updateScreenSize);
// //   }, []);

// //   const toggleSidebar = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   const menuItems = [
// //     { label: "Home", href: "/", icon: <AiOutlineHome size={20} /> },
// //     { label: "Profile", href: "/profile", icon: <AiOutlineUser size={20} /> },
// //     { label: "Free Signup", href: "/signup", icon: <AiOutlineUser size={20} /> },
// //     { label: "Just Launched", href: "/just-launched", icon: <AiOutlineStar size={20} /> },
// //     { label: "Featured", href: "/featured", icon: <AiOutlineStar size={20} /> },
// //     { label: "Popular", href: "/popular", icon: <AiOutlineClockCircle size={20} /> },
// //     { label: "Tasks", href: "/tasks", icon: <FaSuitcase size={20} /> },
// //     { label: "Find a Job", href: "/jobs", icon: <BsBriefcase size={20} /> },
// //     { label: "Job Impact", href: "/job-impact", icon: <BsGraphUp size={20} /> },
// //     { label: "Events", href: "/events", icon: <FaCalendarAlt size={20} /> },
// //     { label: "Submit/Advertise", href: "/submit", icon: <AiOutlineTool size={20} /> },
// //     { label: "Forum", href: "/forum", icon: <AiOutlineStar size={20} /> },
// //     { label: "Newsletter", href: "/newsletter", icon: <AiOutlineStar size={20} /> },
// //     { label: "Contact us", href: "/contact-us", icon: <AiOutlineUser size={20} /> },
// //   ];

// //   return (
// //     <>
// //       {/* Mobile Toggle Button - Now with white background */}
// //       {isMobile && (
// //         <button
// //           onClick={toggleSidebar}
// //           className="fixed top-14 left-4 z-50 p-3 bg-white rounded-md shadow-lg hover:bg-gray-100 transition-colors duration-200"
// //           aria-label="Toggle Menu"
// //         >
// //           <div className="text-gray-800">
// //             {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
// //           </div>
// //         </button>
// //       )}

// //       {/* Sidebar */}
// //       <AnimatePresence>
// //         {(isOpen || !isMobile) && (
// //           <motion.aside
// //             initial={{ x: isMobile ? "-100%" : 0 }}
// //             animate={{ x: 0 }}
// //             exit={{ x: "-100%" }}
// //             transition={{ type: "spring", stiffness: 100, damping: 20 }}
// //             onMouseEnter={handleMouseEnter}
// //             onMouseLeave={handleMouseLeave}
// //             className={`fixed left-0 bg-gray-800 text-white shadow-lg z-40 h-full transition-all duration-200 ${
// //             hover ? "w-64" : "w-16"  // Expanding or collapsing sidebar
// //           }`} // Conditionally set width based on hover and isMobile state
// //             // style={{ width: isMobile ? "280px" : "256px" }}
// //           >
// //             {/* Sidebar Content */}
// //             <div className="flex flex-col h-auto">
// //               <nav className="flex-1 overflow-y-auto">
// //                 <ul className="p-4 space-y-2">
// //                   {menuItems.map((item, index) => (
// //                     <motion.li
// //                       key={item.label}
// //                       initial={{ opacity: 0, x: -20 }}
// //                       animate={{ opacity: 1, x: 0 }}
// //                       transition={{ duration: 0.2 }}
// //                     >
// //                       <Link
// //                         href={item.href}
// //                         className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
// //                         onClick={() => isMobile && toggleSidebar()}
// //                       >
// //                         <span className="text-gray-300">{item.icon}</span>
// //                         <span className={`${hover ? "w-64" : "hidden"}`}>{item.label}</span>


// //                       </Link>
// //                     </motion.li>
// //                   ))}
// //                 </ul>
// //               </nav>

        
// //             </div>
// //           </motion.aside>
// //         )}
// //       </AnimatePresence>

// //       {/* Overlay */}
// //       <AnimatePresence>
// //         {isOpen && isMobile && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 0.5 }}
// //             exit={{ opacity: 0 }}
// //             transition={{ duration: 0.2 }}
// //             className="fixed inset-0 bg-black z-30"
// //             onClick={toggleSidebar}
// //           />
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // }



// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import "../globals.css";
// import {
//   AiOutlineMenu,
//   AiOutlineClose,
//   AiOutlineHome,
//   AiOutlineTool,
//   AiOutlineUser,
//   AiOutlineStar,
//   AiOutlineClockCircle,
// } from "react-icons/ai";
// import { FaSuitcase, FaCalendarAlt } from "react-icons/fa";
// import { BsGraphUp, BsBriefcase } from "react-icons/bs";
// import { useSelector, useDispatch } from "react-redux";
// import { changeOnHover } from "@/store/slices/hoverSidebarSlice"; // Adjust according to your slice
// import { useRef } from "react";
// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const hover = useSelector((state) => state.hover.hover); // Getting hover state
//   const dispatch = useDispatch();
//   const debounce = (fn, delay) => {
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => fn(...args), delay);
//     };
//   };

//   const handleMouseEnter = debounce(() => {
//     dispatch(changeOnHover());
//   }, 200);

//   const handleMouseLeave =debounce(() => {
//     dispatch(changeOnHover());
//   }, 200);
  

//   useEffect(() => {
//     const updateScreenSize = () => {
//       const isMobileView = window.innerWidth < 1024;
//       setIsMobile(isMobileView);
//       setIsOpen(!isMobileView); // Sidebar opens on non-mobile views
//     };

//     updateScreenSize();
//     window.addEventListener("resize", updateScreenSize);
//     return () => window.removeEventListener("resize", updateScreenSize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const menuItems = [
//     { label: "Home", href: "/", icon: <AiOutlineHome size={20} /> },
//     { label: "Profile", href: "/profile", icon: <AiOutlineUser size={20} /> },
//     { label: "Free Signup", href: "/signup", icon: <AiOutlineUser size={20} /> },
//     { label: "Featured", href: "/featured", icon: <AiOutlineStar size={20} /> },
//     { label: "Popular", href: "/popular", icon: <AiOutlineClockCircle size={20} /> },
//     { label: "Tasks", href: "/tasks", icon: <FaSuitcase size={20} /> },
//     { label: "Find a Job", href: "/jobs", icon: <BsBriefcase size={20} /> },
//     { label: "Job Impact", href: "/job-impact", icon: <BsGraphUp size={20} /> },
//     { label: "Events", href: "/events", icon: <FaCalendarAlt size={20} /> },
//     { label: "Submit/Advertise", href: "/submit", icon: <AiOutlineTool size={20} /> },
//   ];


//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       {isMobile && (
//         <button
//           onClick={toggleSidebar}
//           className="fixed top-14 left-4 z-50 p-3 bg-white rounded-md shadow-lg hover:bg-gray-100 transition-colors duration-200"
//           aria-label="Toggle Menu"
//         >
//           <div className="text-gray-800">
//             {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
//           </div>
//         </button>
//       )}

//       {/* Sidebar */}
//       <AnimatePresence>
//         {(isOpen || !isMobile) && (
//           <motion.aside
// initial={{ opacity:1, width: '5.3rem' }}
// animate={{ opacity: 1, width: hover ? '16rem' : '5.3rem' }}
// exit={{ opacity: 1, width: '5.3rem' }}
// transition={{ duration: 0.3 }}



//   onMouseEnter={handleMouseEnter}                                       
//   onMouseLeave={handleMouseLeave}
//   className={`fixed w-auto left-0 bg-gray-800 text-white shadow-lg z-40 h-full  overflow-hidden`}
//   // ${hover ? "w-64" : "w-24"
// >
//             <div className="flex flex-col h-auto">
//               <nav className="flex-1 overflow-y-auto">
//                 <ul className="p-4 space-y-2">
//                   {menuItems.map((item) => (
//                     <motion.li
//                       key={item.label}
//                       // initial={{ opacity: 0, x: -20 }}
//                       // animate={{ opacity: 1, x: 0 }}
//                       // transition={{ duration: 0.2 }}
//                     >
//                       <Link
//                         href={item.href}
//                         className="flex items-center  space-x-3 px-4 py-2 rounded-md "
//                         onClick={() => isMobile && toggleSidebar()}
//                       >
//                         <span className="h-[3vh] text-gray-300">{item.icon}</span>
//                         <span
                        
//                           className={`h-[3vh] ${
//                             hover ? " w-40 overflow-hidden" : " hidden  w-24"
//                           } `}
                    
//                         >
//                           {item.label}
//                         </span>
//                       </Link>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </nav>
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {/* Overlay */}
//       <AnimatePresence>
//         {isOpen && isMobile && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 bg-black z-30"
//             onClick={toggleSidebar}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "../globals.css";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineTool,
  AiOutlineUser,
  AiOutlineStar,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FaSuitcase, FaCalendarAlt } from "react-icons/fa";
import { BsGraphUp, BsBriefcase } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { changeOnHover } from "@/store/slices/hoverSidebarSlice";

// Utility: Debounce function to optimize event handling
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // Default: Sidebar open
  const [isMobile, setIsMobile] = useState(false); // Default: Non-mobile view
  const hover = useSelector((state) => state.hover.hover); // Hover state
  const dispatch = useDispatch();

  // Handle hover events with debounce
  const handleMouseEnter = debounce(() => dispatch(changeOnHover()), 200);
  const handleMouseLeave = debounce(() => dispatch(changeOnHover()), 200);

  // Update screen size and sidebar state on window resize
  useEffect(() => {
    const updateScreenSize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      setIsOpen(!isMobileView); // Sidebar open on larger screens
    };

    updateScreenSize(); // Initial check
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Menu items
  // const menuItems = [
  //   { label: "Home", href: "/", icon: <AiOutlineHome size={20} /> },
  //   { label: "Profile", href: "/user_profile", icon: <AiOutlineUser size={20} /> },
  //   { label: "Free Signup", href: "/signup", icon: <AiOutlineUser size={20} /> },
  //   { label: "Featured", href: "/featured", icon: <AiOutlineStar size={20} /> },
  //   { label: "Popular", href: "/popular", icon: <AiOutlineClockCircle size={20} /> },
  //   { label: "Tasks", href: "/tasks", icon: <FaSuitcase size={20} /> },
  //   { label: "Find a Job", href: "/jobs", icon: <BsBriefcase size={20} /> },
  //   { label: "Job Impact", href: "/job-impact", icon: <BsGraphUp size={20} /> },
  //   { label: "Events", href: "/events", icon: <FaCalendarAlt size={20} /> },
  //   { label: "Submit/Advertise", href: "/submit", icon: <AiOutlineTool size={20} /> },
  // ];

    const menuItems = [
    { label: 'Home', href: '/', icon: <AiOutlineHome size={20} /> },
    { label: 'Profile', href: '/user_profile', icon: <AiOutlineUser size={20} /> },
    { label: 'Free Signup', href: '/signup', icon: <AiOutlineUser size={20} /> },
    { label: 'Just Launched', href: '/just-launched', icon: <AiOutlineStar size={20} /> },
    { label: 'Featured', href: '/featured', icon: <AiOutlineStar size={20} /> },
    { label: 'Popular', href: '/popular', icon: <AiOutlineClockCircle size={20} /> },
    { label: 'Tasks', href: '/tasks', icon: <FaSuitcase size={20} /> },
    { label: 'Find a Job', href: '/jobs', icon: <BsBriefcase size={20} /> },
    { label: 'Job Impact', href: '/job-impact', icon: <BsGraphUp size={20} /> },
    { label: 'Events', href: '/events', icon: <FaCalendarAlt size={20} /> },
    { label: 'Submit/Advertise', href: '/submit', icon: <AiOutlineTool size={20} /> },
    { label: 'Forum', href: '/forum', icon: <AiOutlineStar size={20} /> },
    { label: 'Newsletter', href: '/newsletter', icon: <AiOutlineStar size={20} /> },
    { label: 'Contact us', href: '/contact-us', icon: <AiOutlineUser size={20} /> },
  ];
  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-14 left-4 z-50 p-3 bg-white rounded-md shadow-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          <div className="text-gray-800">
            {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </div>
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial={{ opacity: 1, width: "5.3rem" }}
            animate={{ opacity: 1, width: hover ? "16rem" : "5.3rem" }}
            exit={{ opacity: 1, width: "5.3rem" }}
            transition={{ duration: 0.3 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed w-auto left-0 bg-gray-800 text-white shadow-lg z-40 h-full overflow-hidden"
          >
            <div className="flex flex-col h-auto">
              <nav className="flex-1 overflow-y-auto">
                <ul className="p-4 space-y-2">
                  {menuItems.map((item) => (
                    <motion.li key={item.label}>
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-2 rounded-md"
                        onClick={() => isMobile && toggleSidebar()}
                      >
                        <span className="h-[3vh] text-gray-300">{item.icon}</span>
                        <span
                          className={`h-[3vh] ${
                            hover ? "w-40 overflow-hidden" : "hidden w-24"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-30"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </>
  );
}
