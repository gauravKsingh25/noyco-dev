

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "@/store/slices/authSlice";

// export default function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const user = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const storedUserData = JSON.parse(localStorage.getItem('userData'));
//     if (storedUserData) {
//       setUserData(storedUserData);
//       setIsAuthenticated(true);
//     }
//     if(user.user===null){
//       setIsAuthenticated(false);
//     }
//   }, [user]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userData');
//     dispatch(logout()); 
//     setIsAuthenticated(false);
//     setUserData(null); 
//   };

//   return (
//     <nav className="bg-gray-800 p-2">
//       <div className="container mx-auto flex items-center justify-between space-x-4">
//         {/* Logo Section */}
//         <div>
//           <Link href="/" className="text-white text-lg font-bold">
//             MyApp
//           </Link>
//         </div>

//         {/* Authentication Section */}
//         {!isAuthenticated ? (
//           <div className="flex space-x-4">
//             <Link
//               href="/auth/login"
//               className="text-white px-4 py-2 border border-white rounded hover:bg-white hover:text-gray-800 transition"
//             >
//               Login
//             </Link>
//             <Link
//               href="/auth/register"
//               className="text-black px-4 font-normal py-2 bg-loginBtn-green rounded hover:bg-loginBtn-green transition"
//             >
//               Signup
//             </Link>
//           </div>
//         ) : (
//           <div className="flex items-center space-x-4">
//             {userData && (
//               <>
//                 <img
//                   src={userData.profilePic}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <span className="text-lg font-medium text-white">
//                   {userData.fullName}
//                 </span>
//               </>
//             )}
//             <button
//               onClick={handleLogout}
//               className="text-white px-4 py-2 border border-red-500 rounded hover:bg-red-500 transition"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }



'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { toggleTheme } from "@/store/slices/themeSlice"; // Import the toggleTheme action
import ThemeToggle from '@/utils/themeToggle';
export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  // Selectors for Redux states
  const user = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode); // Get current theme
  const dispatch = useDispatch();

  // Sync authentication state with localStorage and Redux state
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
      setIsAuthenticated(true);
    }
    if (user.user === null) {
      setIsAuthenticated(false);
    }
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    dispatch(logout());
    setIsAuthenticated(false);
    setUserData(null);
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav
      className={`flex z-50 p-2 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }  shadow-[0_0px_15px_-3px_rgba(0,0,0,0.1)] lg:sticky lg:top-0`}
    >
      <div className="container mx-auto flex items-center justify-between space-x-4">
        {/* Logo Section */}
        <div>
          <Link href="/" className="text-lg font-bold">
            MyApp
          </Link>
        </div>

        {/* Authentication Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          {/* <button
            onClick={handleThemeToggle}
            className={`px-4 py-2 rounded ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            } transition`}
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button> */}

          <ThemeToggle    />

          {!isAuthenticated ? (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-300 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {userData && (
                <>
                  <img
                    src={userData.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-lg font-medium">
                    {userData.fullName}
                  </span>
                </>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-500 rounded hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


// 'use client';
// import Link from 'next/link';

// export default function Navbar() {
//   return (
//     <nav className="bg-gray-800 p-2 sticky top-0 z-50">
//       <div className="container mx-auto flex items-center justify-between space-x-4">
//         {/* Left Section - Logo */}
//         <div>
//           <Link href="/">
//             <span className="text-white text-xl font-bold">YourLogo</span>
//           </Link>
//         </div>

//         {/* Search Bar */}
//         <div>
//           {/* Optional: Add a search bar here */}
//         </div>

//         {/* Right Section - Login/Signup */}
//         <div className="flex space-x-4">
//           <Link
//             href="/login"
//             className="text-white px-4 py-2 border border-white rounded hover:bg-white hover:text-gray-800 transition"
//           >
//             Login
//           </Link>
//           <Link
//             href="/signup"
//             className="text-white px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
//           >
//             Signup
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }