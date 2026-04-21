import React, { useEffect, useState, Suspense } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Works from './components/Works';
import About from './components/About';
import Preloader from './components/Preloader';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF, Float, ContactShadows, OrbitControls } from '@react-three/drei';

function FooterDesktop() {
  const { scene } = useGLTF('/models/desktop.glb');
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <primitive object={scene} scale={0.5} position={[0, -2, 0]} rotation={[0, -Math.PI / 4, 0]} />
    </Float>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative bg-[#0A0A02] min-h-screen text-[#E0E0E0] overflow-hidden">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {/* CRT Scanline Texture overlay spanning entire App */}
        <div className="scanlines"></div>
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none z-50 mix-blend-overlay"></div>
      
      <CustomCursor />
      
      <main className="relative z-10 flex flex-col w-full">
        <div id="hero"><Hero /></div>
        <div id="works"><Works /></div>
        <div id="about"><About /></div>
        
        {/* Massive Brutal Footer (Gold Theme) with 3D Integration */}
        <footer id="contact" className="w-full bg-[#000000] min-h-[80vh] py-32 px-8 md:px-16 border-t-[20px] border-[#D4AF37] flex flex-col justify-between relative z-20 overflow-hidden">
            
            {/* Absolute 3D Canvas bridging the background */}
            <div className="absolute inset-0 z-0 pointer-events-auto opacity-50 md:opacity-100 flex justify-end">
                <div className="w-full md:w-[60%] h-full">
                    <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
                        <Suspense fallback={null}>
                            <FooterDesktop />
                            <Environment preset="city" />
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={20} blur={2} far={4} color="#D4AF37" />
                            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
                        </Suspense>
                    </Canvas>
                </div>
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between gap-20">
                <h2 className="font-oswald text-[12vw] leading-[0.8] font-black uppercase text-white tracking-tighter mix-blend-exclusion">
                    LET'S TALK <br/>
                    <span className="text-transparent text-stroke-gold text-[8vw]">INTELLIGENCE.</span>
                </h2>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 w-full mt-auto">
                    <div className="flex flex-col gap-8 w-full md:w-auto">
                        <div className="flex flex-col gap-4">
                            <span className="font-body italic text-xl md:text-2xl text-white/50">Transmission Link</span>
                            <a href="mailto:gokulramms@gmail.com" className="font-oswald text-3xl md:text-5xl text-[#D4AF37] uppercase tracking-widest interactive hover:opacity-50 transition-opacity">
                                GOKULRAMMS@GMAIL.COM
                            </a>
                        </div>
                        {/* Download Resume Button */}
                        <a href="https://drive.google.com/file/d/1AJpLEwlVJur6D0GxP6iCA-jOiuxjIDQw/view?usp=sharing" target="_blank" rel="noreferrer" className="inline-block w-fit font-oswald text-sm md:text-lg uppercase tracking-[0.2em] text-[#000] bg-[#D4AF37] px-8 py-4 hover:bg-white hover:text-black transition-all duration-500 interactive pointer-events-auto">
                            DOWNLOAD RESUME
                        </a>
                    </div>
                    
                    <div className="flex flex-col items-end gap-8 text-right w-full md:w-auto">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-right">
                            <a href="https://github.com/Gokulramms" target="_blank" rel="noreferrer" className="font-oswald text-xs md:text-sm tracking-[0.2em] uppercase text-white hover:text-[#D4AF37] transition-colors interactive">GITHUB</a>
                            <a href="https://www.linkedin.com/in/gokulramm-s-984a69257" target="_blank" rel="noreferrer" className="font-oswald text-xs md:text-sm tracking-[0.2em] uppercase text-white hover:text-[#D4AF37] transition-colors interactive">LINKEDIN</a>
                            <a href="https://x.com/its__sgr?t=pF_N0UGOUki3kNevCu60uw&s=09" target="_blank" rel="noreferrer" className="font-oswald text-xs md:text-sm tracking-[0.2em] uppercase text-white hover:text-[#D4AF37] transition-colors interactive">X / TWITTER</a>
                            <a href="https://www.instagram.com/im_sgr_?igsh=MWRoaWc5OGdqeTY5bA==" target="_blank" rel="noreferrer" className="font-oswald text-xs md:text-sm tracking-[0.2em] uppercase text-white hover:text-[#D4AF37] transition-colors interactive">INSTAGRAM</a>
                        </div>
                        {/* Go to Top Button */}
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-oswald text-xs tracking-[0.3em] text-[#D4AF37] uppercase border border-[#D4AF37] px-6 py-2 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 interactive mt-8 pointer-events-auto">
                            ↑ RETURN TO BASE
                        </button>
                    </div>
                </div>
            </div>
        </footer>
      </main>
      </div>
    </div>
  );
}

export default App;
