"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './theme-provider';
import { useCursor } from './cursor-context';
import { Moon, Sun, Cloud, Menu, X, Leaf, Heart, Sunset, Flower, Coffee, Droplets } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/expertise', label: 'Expertise' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursorState } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('night');
    else if (theme === 'night') setTheme('skyblue');
    else if (theme === 'skyblue') setTheme('forest');
    else if (theme === 'forest') setTheme('rose');
    else if (theme === 'rose') setTheme('sunset');
    else if (theme === 'sunset') setTheme('lavender');
    else if (theme === 'lavender') setTheme('coffee');
    else if (theme === 'coffee') setTheme('ocean');
    else setTheme('light');
  };

  const ThemeIcon = 
    theme === 'light' ? Sun : 
    theme === 'night' ? Moon : 
    theme === 'skyblue' ? Cloud :
    theme === 'forest' ? Leaf :
    theme === 'rose' ? Heart :
    theme === 'sunset' ? Sunset :
    theme === 'lavender' ? Flower :
    theme === 'coffee' ? Coffee :
    Droplets;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border py-4'
            : 'bg-transparent border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-mono font-bold text-lg tracking-tighter flex items-center gap-2">
          <div className="w-6 h-6 rounded-sm bg-foreground flex items-center justify-center">
            <span className="text-background text-xs">AA</span>
          </div>
          <span>akhil.dev</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
                onMouseEnter={() => setCursorState({ variant: 'link' })}
                onMouseLeave={() => setCursorState({ variant: 'default' })}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          
          <button
            onClick={cycleTheme}
            className="ml-4 p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
            onMouseEnter={() => setCursorState({ variant: 'link' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            <ThemeIcon size={18} className="text-foreground" />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={cycleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ThemeIcon size={18} className="text-foreground" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        </div>
      </header>

      {/* Mobile Full-Page Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0.98 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-[70] bg-background"
          >
            <div className="h-full flex flex-col px-6 pt-6 pb-10">
              <div className="flex items-center justify-between mb-10">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono font-bold text-lg tracking-tighter flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-sm bg-foreground flex items-center justify-center">
                    <span className="text-background text-xs">AA</span>
                  </div>
                  <span>akhil.dev</span>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} className="text-foreground" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block rounded-2xl px-5 py-4 text-xl font-semibold border border-border/60 ${
                        pathname === item.path
                          ? 'text-foreground bg-muted/60'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.25 }}
                onClick={cycleTheme}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <ThemeIcon size={18} />
                Change Theme
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
