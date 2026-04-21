import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Powerful text split animation simulating Igloo typograpy reveals
      gsap.fromTo(".split-word", 
        { y: 150, opacity: 0, rotateZ: 10 },
        { 
            y: 0, opacity: 1, rotateZ: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".about-headline",
                start: "top 80%",
            }
        });

      // Line expander
      gsap.fromTo(".silver-line", 
        { width: "0%" },
        { width: "100%", duration: 2, ease: "power4.inOut", scrollTrigger: { trigger: ".about-headline", start: "top 70%" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A0A02] text-white overflow-hidden py-32 z-50 group">
      
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 w-full">
        
       {/* Massive Headline */}
        <div className="about-headline w-full mb-24 overflow-hidden py-4">
            <h3 className="font-oswald text-5xl md:text-8xl lg:text-[7rem] font-black uppercase leading-[0.9] tracking-tighter text-white flex flex-wrap gap-x-6 gap-y-2">
                <span className="split-word inline-block">ARCHITECTING</span>
                <span className="split-word inline-block text-transparent text-stroke-gold">AI</span>
                <span className="split-word inline-block">AND</span>
                <span className="split-word inline-block text-[#D4AF37]">SYSTEMS.</span>
            </h3>
            <div className="silver-line h-[1px] bg-[#D4AF37]/50 mt-16 w-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 w-full">
            
            {/* Core Text */}
            <div className="md:col-span-8 flex flex-col justify-start">
                <p className="font-body text-2xl md:text-5xl max-w-4xl font-light leading-[1.4] text-white/90">
                    I am Gokulramm S, an engineer focusing on the convergence of full-stack ecosystems, generative AI models, and embedded hardware topologies. 
                    I build logic that breathes.
                </p>
                <div className="mt-12 flex gap-4 text-[#D4AF37]">
                    <span className="font-oswald uppercase tracking-[0.3em] text-xs underline underline-offset-8">BASED IN INDIA</span>
                    <span className="font-oswald uppercase tracking-[0.3em] text-xs">/</span>
                    <span className="font-oswald uppercase tracking-[0.3em] text-xs underline underline-offset-8">AVAILABLE GLOBALLY</span>
                </div>
            </div>

            {/* Tactical Architectures */}
            <div className="md:col-span-4 flex flex-col gap-16 border-t md:border-t-0 md:border-l border-white/10 pt-12 md:pt-0 md:pl-12">
                
                <div>
                    <h4 className="font-oswald text-lg font-bold uppercase tracking-widest text-[#D4AF37] mb-6 flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span> CORE ALGORITHMS
                    </h4>
                    <div className="flex flex-col gap-4">
                        {["Computer Vision & OpenCV", "LLMs & Applied NLP", "Embedded C++ Firmware", "System Design & Architecture"].map(tech => (
                            <div key={tech} className="font-body text-xl font-semibold border-b border-white/10 pb-4 text-white/70 hover:text-white transition-colors">{tech}</div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-oswald text-lg font-bold uppercase tracking-widest text-[#D4AF37] mb-6 flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span> ENGINEERING STACK
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {["React 19", "Next.js", "Python", "Flask", "TensorFlow", "Supabase", "Docker", "Node.js"].map(tech => (
                            <span key={tech} className="border border-[#D4AF37]/50 text-white/50 hover:text-[#0A0A02] hover:bg-[#D4AF37] transition-colors duration-500 font-oswald uppercase px-4 py-2 text-[10px] tracking-widest rounded-full cursor-none interactive">{tech}</span>
                        ))}
                    </div>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
}
