import React from 'react';

const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating hexagons */}
      <div className="absolute -top-20 -left-20 w-40 h-40 opacity-20">
        <div className="hexagon bg-gradient-to-r from-cyan-500 to-blue-600 animate-float-slow"></div>
      </div>
      
      <div className="absolute top-1/4 -right-16 w-32 h-32 opacity-15">
        <div className="hexagon bg-gradient-to-r from-purple-500 to-pink-600 animate-float-medium"></div>
      </div>
      
      <div className="absolute bottom-1/4 -left-12 w-24 h-24 opacity-25">
        <div className="hexagon bg-gradient-to-r from-orange-500 to-red-600 animate-float-fast"></div>
      </div>
      
      <div className="absolute -bottom-16 right-1/4 w-36 h-36 opacity-10">
        <div className="hexagon bg-gradient-to-r from-green-500 to-teal-600 animate-float-slow"></div>
      </div>
      
      {/* Medium floating circles */}
      <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20 animate-float-medium"></div>
      
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full opacity-15 animate-float-fast"></div>
      
      {/* Small floating triangles */}
      <div className="absolute top-1/2 left-1/6 w-12 h-12 opacity-30">
        <div className="triangle bg-gradient-to-r from-cyan-400 to-blue-500 animate-float-slow"></div>
      </div>
      
      <div className="absolute top-3/4 right-1/6 w-8 h-8 opacity-25">
        <div className="triangle bg-gradient-to-r from-yellow-400 to-orange-500 animate-float-medium"></div>
      </div>
      
      {/* Wireframe polygons */}
      <div className="absolute top-1/6 right-1/2 w-28 h-28 opacity-20">
        <div className="polygon-wireframe animate-float-slow"></div>
      </div>
      
      <div className="absolute bottom-1/6 left-1/2 w-20 h-20 opacity-15">
        <div className="polygon-wireframe animate-float-medium"></div>
      </div>
    </div>
  );
};

export default FloatingShapes;