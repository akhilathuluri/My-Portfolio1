'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { useCursor } from './cursor-context';
import { ArrowUpRight } from 'lucide-react';

export default function CustomCursor() {
  const { cursorState } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth out the movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on devices with fine pointers (mice)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;
    
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const variants = {
    default: {
      height: 16,
      width: 16,
      x: "-50%",
      y: "-50%",
      backgroundColor: "#fff",
      mixBlendMode: "difference" as const,
      border: "0px solid transparent",
    },
    project: {
      height: 90,
      width: 90,
      x: "-50%",
      y: "-50%",
      backgroundColor: "var(--primary)",
      mixBlendMode: "normal" as const,
      border: "0px solid transparent",
    },
    link: {
      height: 48,
      width: 48,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 0)",
      mixBlendMode: "difference" as const,
      border: "2px solid #fff",
    }
  };

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full text-primary-foreground font-semibold text-xs tracking-wider"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      variants={variants}
      animate={cursorState.variant}
      transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {cursorState.variant === 'project' && cursorState.text && (
          <motion.span
            key="text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute text-center whitespace-nowrap"
          >
            {cursorState.text}
          </motion.span>
        )}
        {cursorState.variant === 'link' && (
          <motion.div
            key="icon"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute text-white"
          >
            <ArrowUpRight size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
