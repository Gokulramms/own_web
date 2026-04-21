import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: "01",
    title: "SMART BOOKMARK",
    tech: "Next.js / Supabase / AI",
    desc: "Intelligent bookmark manager using Gemini 2.5 to organize and semantically deduplicate links.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    link: "https://smart-bookmark-six-omega.vercel.app/"
  },
  {
    id: "02",
    title: "SMART CAMPUS",
    tech: "React.js / Python Flask",
    desc: "AI-powered platform for automated document summaries and dynamic quiz generation system.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
    link: "https://github.com/Gokulramms/Smart-Campus.git"
  },
  {
    id: "03",
    title: "FACETRACK",
    tech: "OpenCV / Python",
    desc: "Facial recognition architecture for automated attendance logging and dynamic reporting.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "04",
    title: "E-PASS ENTRY",
    tech: "React / Python / MySQL",
    desc: "QR code-based campus guest entry with real-time validation and role-based access.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "05",
    title: "TRAIN GUARD",
    tech: "Arduino / Sensors / C++",
    desc: "Anti-crash collision avoidance microcontroller using ultrasonic sensors for safety.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  }
];

function ParallaxProject({ project }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

  return (
    <div ref={ref} className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20 group">
      
      {/* Parallax Image Background */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 w-full h-[140%] -top-[20%] z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A02] via-[#0A0A02]/80 to-transparent z-10" />
        <img src={project.image} alt={project.title} className="w-full h-full object-cover filter grayscale opacity-30 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-60" />
      </motion.div>

      {/* Floating Parallax Text */}
      <motion.div style={{ y: textY }} className="relative z-20 w-full max-w-[1400px] px-8 md:px-16 flex flex-col items-start justify-center">
          <div className="flex items-center gap-6 mb-8 mt-auto md:mt-0">
              <span className="font-oswald text-[#D4AF37] text-xl md:text-3xl font-light block">{project.id}</span>
              <span className="w-16 h-[1px] bg-[#D4AF37]/50 block"></span>
          </div>
          
          <h3 className="font-oswald text-[12vw] md:text-[8vw] font-black uppercase text-white tracking-tighter leading-[0.85] mb-8 mix-blend-difference">
              {project.title.split(' ').map((word, i) => <span key={i} className={`block ${i % 2 === 1 ? 'text-transparent text-stroke-gold mix-blend-normal' : ''}`}>{word}</span>)}
          </h3>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-auto">
              <p className="font-body text-lg md:text-2xl text-white/70 max-w-[500px] font-light">
                  {project.desc}
              </p>
              <div className="flex flex-col items-start gap-4">
                  <span className="font-body italic text-[#D4AF37] text-lg border-b border-[#D4AF37]/30 pb-2">{project.tech}</span>
                  <a href={project.link} target="_blank" rel="noreferrer" className="mt-4 font-oswald text-sm md:text-base uppercase tracking-[0.2em] text-[#0A0A02] bg-[#D4AF37] px-8 py-4 hover:bg-white transition-colors duration-500 interactive pointer-events-auto">
                      Initiate View
                  </a>
              </div>
          </div>
      </motion.div>
    </div>
  );
}

export default function Works() {
  return (
    <section className="relative bg-[#0A0A02] flex flex-col">
      <div className="w-full py-32 px-8 md:px-16 flex flex-col items-center justify-center border-b border-[#D4AF37]/20">
          <h2 className="font-oswald text-4xl md:text-6xl text-[#D4AF37] uppercase tracking-[0.2em]">Deployment Logs</h2>
      </div>
      {projects.map((project) => (
        <ParallaxProject key={project.id} project={project} />
      ))}
    </section>
  );
}
