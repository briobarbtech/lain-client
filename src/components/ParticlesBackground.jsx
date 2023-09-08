import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesConfig from './config/particles-config.js';

function ParticlesBackground() {
  const particlesInit = useCallback((engine) => {
    loadFull(engine);
  }, []);

  return (
    <div>
      <Particles 
      //id="tsparticles"
      options={particlesConfig}
      init={particlesInit} />

    </div>
  );
}

export default ParticlesBackground;
