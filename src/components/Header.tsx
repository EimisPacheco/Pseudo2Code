import React from 'react';
import { Code2, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative z-20 py-8">
      {/* Bolt Badge - Top Right */}
      <div className="absolute top-4 right-4 z-30">
        <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          className="block transform hover:scale-105 transition-transform duration-200"
        >
          <img
            src="/black_circle_360x360.png"
            alt="Powered by Bolt"
            className="w-16 h-16 opacity-80 hover:opacity-100 transition-opacity duration-200"
          />
        </a>
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <Zap className="w-2 h-2 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Pseudo2Code
          </h1>
        </div>
        
        <p className="text-xl text-gray-300 font-light tracking-wide">
          Translate Logic. Understand Performance.
        </p>
        
        <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Real-time Translation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>5 Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>Performance Analysis</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;