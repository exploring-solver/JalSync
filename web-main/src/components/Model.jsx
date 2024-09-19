import React from 'react';

export default function Model({ image = 'logo.png', title }) {
  return (
    <div className=" mx-auto bg-transparent rounded-lg shadow overflow-hidden">
      <div className="relative aspect-square h-[200px]">
        <model-viewer
          src={image}
          ios-src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.usdz?v=1569545377878"
          poster="splash.png"
          alt={title || "3D Model"}
          shadow-intensity="1"
          camera-controls
          auto-rotate
          ar
          style={{
            width: '50%',
            height: '50%',
            margin:'auto',
            backgroundColor: 'transparent',
            '--poster-color': 'transparent',
          }}
        />
      </div>
    </div>
  );
}