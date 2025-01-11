"use client";

import { useRouter } from "next/navigation";


export default function SubmitPage() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="py-6 px-6 border-b border-gray-800">
        <h1 className="text-4xl font-bold text-center">AI Promotion Hub</h1>
        <p className="text-center text-gray-400 mt-2">Showcase & Promote Your AI Effectively</p>
      </header>

      <main className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            className="p-6 rounded-lg shadow-md bg-gray-800 hover:bg-purple-600 transition-all duration-300 cursor-pointer"
            onClick={() => handleNavigation("/submit-tool")}
          >
            <div className="flex items-center justify-center h-20 w-20 mx-auto bg-purple-500 text-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-center text-lg mt-4 font-semibold">Submit Tool</h3>
            <p className="text-center text-sm text-gray-300">Publish your AI project and make it known.</p>
          </div>

          <div
            className="p-6 rounded-lg shadow-md bg-gray-800 hover:bg-indigo-600 transition-all duration-300 cursor-pointer"
            onClick={() => handleNavigation("/get-featured")}
          >
            <div className="flex items-center justify-center h-20 w-20 mx-auto bg-indigo-500 text-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3M6.784 4.439c1.561-1.345 4.125-1.366 5.655-.094M15.505 7c.676.771 1.175 1.747 1.439 2.806"
                />
              </svg>
            </div>
            <h3 className="text-center text-lg mt-4 font-semibold">Get Featured</h3>
            <p className="text-center text-sm text-gray-300">Increase your reach by getting featured on the platform.</p>
          </div>

          <div
            className="p-6 rounded-lg shadow-md bg-gray-800 hover:bg-teal-600 transition-all duration-300 cursor-pointer"
            onClick={() => handleNavigation("/custom-campaign")}
          >
            <div className="flex items-center justify-center h-20 w-20 mx-auto bg-teal-500 text-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.603 8.268c.94-.315 2.182-.512 3.513-.72C16 8 19 10 21 12"
                />
              </svg>
            </div>
            <h3 className="text-center text-lg mt-4 font-semibold">Custom Campaign</h3>
            <p className="text-center text-sm text-gray-300">Personalized promotion tailored to your needs.</p>
          </div>

          <div
            className="p-6 rounded-lg shadow-md bg-gray-800 hover:bg-green-600 transition-all duration-300 cursor-pointer"
            onClick={() => handleNavigation("/sponsorships")}
          >
            <div className="flex items-center justify-center h-20 w-20 mx-auto bg-green-500 text-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c3 1 4 3 5 6v2m-7-6c-3 1-4 3-5 6v2" />
              </svg>
            </div>
            <h3 className="text-center text-lg mt-4 font-semibold">Sponsorships</h3>
            <p className="text-center text-sm text-gray-300">Collaborate with us for mutual success.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

