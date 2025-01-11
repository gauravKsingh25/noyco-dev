// "use client";

// import { Provider } from "react-redux";
// import { store } from "@/store/store";
// import "./globals.css";
// import { Geist, Geist_Mono } from "next/font/google";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // export const metadata = {
// //   title: "Create Next App",
// //   description: "Generated by create next app",
// // };
// import { ToastContainer } from "react-toastify";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Provider store={store}>
//           <div className="flex" style={{ overflow: "hidden", height: "100vh" }}>
//             <Sidebar />
//             <div className="flex flex-col flex-1">
//               <div>
//                 <Navbar />
//               </div>

//               <div style={{ overflowY: "auto" }}>{children}</div>
//             </div>
//           </div>

//           <ToastContainer />
//         </Provider>
//       </body>
//     </html>
//   );
// }

"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "./layoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
    //   >
    //     <Provider store={store}>
    //     <Navbar />
    //       <div className="flex">

    //           <div className="lg:ml-64 flex flex-col flex-1 hover:bg-gray-100 transition-colors duration-200">

    //           <Sidebar />
    //       <div className="flex flex-1">
    //         <main className="p-4 flex-1 bg-white shadow-inner">
    //           {children}
    //         </main>

    //       </div>
    //     </div>

    //       </div>

    //       <ToastContainer />
    //     </Provider>
    //   </body>
    // </html>

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <Provider store={store}>
          <LayoutWrapper children={children} />
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
