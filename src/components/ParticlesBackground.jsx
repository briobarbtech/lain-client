import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesConfig from './config/particles-config.js';

function ParticlesBackground() {
  const particlesInit = useCallback((engine) => {
    loadFull(engine);
  }, []);

  return (
    
      <Particles 
      id="tsparticles"
      options={particlesConfig}
      init={particlesInit} />

  );
}

export default ParticlesBackground;
