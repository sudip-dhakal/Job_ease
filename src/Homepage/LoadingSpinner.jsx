import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-500 border-opacity-70"></div>

        {/* Loading Text */}
        <p className="mt-4 text-cyan-600 font-semibold text-lg">Loading...</p>
      </div>
    </div>
  );
}
