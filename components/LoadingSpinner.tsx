
import React from 'react';

const LoadingSpinner: React.FC<{text?: string}> = ({ text = "載入中..."}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-pink-500 font-semibold">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
