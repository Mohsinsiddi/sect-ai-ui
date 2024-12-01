'use client';

import React, { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { CreateSectButtonProps } from '../sects/types';

export const CreateSectButton: React.FC<CreateSectButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden group px-6 py-3 rounded-full 
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
        text-white font-semibold text-sm uppercase tracking-wider
        transform transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-xl
        flex items-center justify-center
        focus:outline-none focus:ring-4 focus:ring-indigo-300"
    >
      {/* Animated Background Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
          opacity-0 group-hover:opacity-50 
          transition-opacity duration-500 blur-2xl`}
      />

      {/* Button Content */}
      <div className="relative z-10 flex items-center">
        <Zap
          className={`h-5 w-5 mr-2 
            transform transition-transform duration-300 
            ${isHovered ? 'rotate-45 scale-110 text-yellow-300' : 'text-white'}`}
        />
        Create Sect
        <Plus
          className={`h-5 w-5 ml-2 
            transform transition-transform duration-300 
            ${isHovered ? 'rotate-90 scale-110' : ''}`}
        />
      </div>

      {/* Subtle Sparkle Effect */}
      {isHovered && (
        <>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/30 rounded-full animate-ping"
                style={{
                  width: '10px',
                  height: '10px',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 1 + 0.5}s`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </button>
  );
};
