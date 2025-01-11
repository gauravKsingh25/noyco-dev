'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const UnAuthroizedPage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/auth/login'); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img
        src="https://static-00.iconduck.com/assets.00/9-404-error-illustration-2048x908-vp03fkyu.png"
        alt="Unauthorized Access"
        className="w-full h-auto max-w-md object-cover mb-8"
      />
      <h1 className="text-3xl font-bold text-center text-purpleOwn-800 mb-5">Unauthorized Access!</h1>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 bg-purpleOwn-800 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  );
};

export default UnAuthroizedPage;
