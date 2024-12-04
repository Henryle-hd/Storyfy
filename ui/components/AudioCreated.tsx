'use client'
import React from 'react';
import CountUp from 'react-countup';

export default function AudioCreated() {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="text-center">
        <h1 className='text-5xl md:text-6xl p-5'>😊</h1>
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tight">
          🎵 Audio Created
        </h2>
        <p className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500 mt-2">
          <CountUp start={0} end={190} duration={3} separator="," suffix="+" />
        </p>
      </div>
    </div>
  );
}
