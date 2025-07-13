'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // For Next.js. Use `useNavigate` from `react-router-dom` in React Router

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-6">Sorry, the page you&#39;re looking for doesn&#39;t exist or has been moved.</p>
      <button onClick={() => router.push('/')} className="text-white p-1 px-2 rounded-3xl bg-gray-600 hover:bg-gray-700">
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
