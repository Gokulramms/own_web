import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere, Stars, OrbitControls, Points, PointMaterial, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';

// Massive Horizon Planet (Earth-like curve at the bottom)
function HorizonPlanet() {
  const planetRef = useRef();
  const atmosphereRef = useRef();
  
  useFrame((state, delta) => {
    // Very slow majestic rotation like a real planet
    planetRef.current.rotation.y += delta * 0.05;
    planetRef.current.rotation.x += delta * 0.02;
    atmosphereRef.current.rotation.y -= delta * 0.03;
    
    // Slight parallax on mouse move
    const targetX = state.pointer.x * 0.5;
    const targetY = (state.pointer.y * 0.5) - 22; // Keep it massively low
    
    planetRef.current.position.x = THREE.MathUtils.lerp(planetRef.current.position.x, targetX, 0.02);
    planetRef.current.position.y = THREE.MathUtils.lerp(planetRef.current.position.y, targetY, 0.02);
    
    atmosphereRef.current.position.x = THREE.MathUtils.lerp(atmosphereRef.current.position.x, targetX, 0.02);
    atmosphereRef.current.position.y = THREE.MathUtils.lerp(atmosphereRef.current.position.y, targetY, 0.02);
  });

  return (
    <group>
        {/* Core Mass - Massive Sphere */}
        <Sphere ref={planetRef} args={[20, 128, 128]} position={[0, -22, -5]}>
            <meshPhysicalMaterial 
                color="#001830" // Deep space blue/black earth tone
                emissive="#000510"
                roughness={0.6} 
                metalness={0.4}
                clearcoat={0.3}
                bumpScale={0.02}
            />
        </Sphere>
        
        {/* Glowing Atmospheric Halo - The Horizon line */}
        <Sphere ref={atmosphereRef} args={[20.2, 64, 64]} position={[0, -22, -5]}>
            <meshBasicMaterial 
                color="#4da6ff" // Sci-fi atmospheric blue glow
                transparent 
                opacity={0.15} 
                blending={THREE.AdditiveBlending}
                side={THREE.BackSide} /* Glows outwards */
            />
        </Sphere>

        {/* Sun flare horizon simulator */}
        <pointLight position={[0, -1, -8]} intensity={10} color="#ffffff" distance={20} decay={2} />
        <pointLight position={[0, -1, -5]} intensity={50} color="#4da6ff" distance={15} decay={2} />
    </group>
  );
}

// 3D Stardust Galaxy
function CustomGalaxy() {
  const ref = useRef();
  const particleCount = 6000;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const r = 50 * Math.cbrt(Math.random()); 
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta); 
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); 
        pos[i * 3 + 2] = r * Math.cos(phi); 
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.y -= delta * 0.01;
    ref.current.rotation.x -= delta * 0.005;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false} scale={2}>
      <PointMaterial transparent color="#ffffff" size={0.03} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.8} />
    </Points>
  );
}

function InteractiveUniverse() {
    const groupRef = useRef();

    useFrame((state) => {
        // Deep Parallax tracking
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.pointer.x * Math.PI) / 12, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -(state.pointer.y * Math.PI) / 12, 0.05);
    });

    return (
        <group ref={groupRef}>
            <Stars radius={150} depth={50} count={5000} factor={6} saturation={0} fade speed={1} />
            <CustomGalaxy />
            <HorizonPlanet />
        </group>
    );
}

export default function Hero() {
  return (
    <section className="relative w-full h-[120vh] bg-[#0A0A02] overflow-hidden flex flex-col justify-center items-center">
      
      {/* 3D WebGL Layer - Underneath the text */}
      <div className="absolute inset-0 z-0 pointer-events-auto cursor-crosshair">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <React.Suspense fallback={null}>
            <InteractiveUniverse />
            <Environment preset="night" />
            <ambientLight intensity={0.2} />
            {/* The sun rising from behind the earth curve */}
            <directionalLight position={[0, -5, -15]} intensity={5} color="#ffffff" />
            <OrbitControls enableZoom={true} enablePan={true} autoRotate={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
          </React.Suspense>
        </Canvas>
      </div>

      {/* Massive Editorial Typography - Moved to z-20 with DIFFERENCE blend mode! */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 6.5 }} 
            className="w-full text-center"
        >
          <span className="font-body italic text-[#D4AF37] text-2xl md:text-5xl mb-4 block mix-blend-difference drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">Gokulramm S —</span>
          
          {/* Animated Liquid Metal Typography */}
          <motion.h1 
            animate={{ 
                backgroundPosition: ["0% 50%", "200% 50%"] 
            }}
            transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: "linear" 
            }}
            style={{
                backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, #D4AF37 25%, #FFFFFF 50%, #D4AF37 75%, #FFFFFF 100%)",
                backgroundSize: "200% auto",
            }}
            className="font-oswald text-[18vw] font-black tracking-tighter uppercase text-transparent bg-clip-text whitespace-nowrap leading-[0.8] mix-blend-difference drop-shadow-2xl"
          >
            INTELLIGENCE
          </motion.h1>
        </motion.div>
      </div>

      {/* Foreground Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7.5, duration: 1 }}
        className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-30 mix-blend-difference pointer-events-none"
      >
        <div className="font-oswald text-2xl font-bold tracking-widest text-[#D4AF37]">SGR.</div>
        <div className="flex gap-12 pointer-events-auto">
            <a href="#works" className="font-oswald text-xs tracking-[0.2em] uppercase text-white hover:text-[#D4AF37] transition-colors interactive">WORKS</a>
            <a href="#about" className="font-oswald text-xs tracking-[0.2em] uppercase text-white hover:text-[#D4AF37] transition-colors interactive">ABOUT</a>
            <a href="#contact" className="font-oswald text-xs tracking-[0.2em] uppercase text-white hover:text-[#D4AF37] transition-colors interactive">CONTACT</a>
        </div>
      </motion.div>

    </section>
  );
}
