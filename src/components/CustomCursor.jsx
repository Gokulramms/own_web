import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = () => document.body.classList.add('hovering');
    const handleHoverEnd = () => document.body.classList.remove('hovering');

    window.addEventListener('mousemove', moveCursor);

    // Initial check for interactive elements
    const updateListeners = () => {
        document.querySelectorAll('a, button, .interactive').forEach(el => {
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
        });
    }
    
    updateListeners();
    const interval = setInterval(updateListeners, 2000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(interval);
      document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        translateX: "-50%",
        translateY: "-50%",
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
}
