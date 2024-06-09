import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 opacity-75 z-50">
      <div className="animate-spin rounded-full border-b-2 border-gray-500 h-10 w-10"></div>
    </div>
  );
};

export default Loading;
