import React, { useState, useEffect } from 'react';
import { Menu, X, Cloud, Terminal, Award } from 'lucide-react';
import { personalInfo } from '../data';
import { useDesign } from './DesignContext';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { designMode, currentTheme } = useDesign();
  const styles = currentTheme.styles;

  const navItems = [
    { id: 'hero', label: 'About' },
    { id: 'certifications', label: 'AWS Certifications' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const getActiveNavItemStyle = (itemId: string) => {
    const isActive = activeSection === itemId;
    if (!isActive) {
      return designMode === 'swiss'
        ? 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
        : designMode === 'terminal'
        ? 'text-emerald-600 hover:text-emerald-300 hover:bg-emerald-950/20'
        : designMode === 'tokyo'
        ? 'text-indigo-400 hover:text-indigo-100 hover:bg-[#16122d]'
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50';
    }

    switch (designMode) {
      case 'swiss':
        return 'bg-zinc-900 text-white font-semibold border-b-2 border-zinc-900';
      case 'terminal':
        return 'bg-emerald-950/50 text-emerald-400 font-bold border-b-2 border-emerald-400';
      case 'tokyo':
        return 'bg-fuchsia-500/10 text-fuchsia-400 font-bold border-b-2 border-fuchsia-400';
      default:
        return 'bg-slate-850 text-cyan-400 font-bold border-b-2 border-cyan-400';
    }
  };

  const getMobileActiveNavItemStyle = (itemId: string) => {
    const isActive = activeSection === itemId;
    if (!isActive) {
      return designMode === 'swiss'
        ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
        : designMode === 'terminal'
        ? 'text-emerald-500/60 hover:text-emerald-400 hover:bg-emerald-950/20'
        : designMode === 'tokyo'
        ? 'text-indigo-400 hover:text-indigo-200 hover:bg-[#16122d]'
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50';
    }

    switch (designMode) {
      case 'swiss':
        return 'bg-zinc-100 text-zinc-900 border-l-4 border-zinc-900 font-bold';
      case 'terminal':
        return 'bg-emerald-950/40 text-emerald-400 border-l-4 border-emerald-400 font-bold';
      case 'tokyo':
        return 'bg-[#16122d] text-fuchsia-400 border-l-4 border-fuchsia-400 font-bold';
      default:
        return 'bg-slate-900 text-cyan-400 border-l-4 border-cyan-400 font-bold';
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? styles.navBg
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-all ${
              designMode === 'swiss'
                ? 'bg-zinc-100 border-zinc-200 text-zinc-950'
                : designMode === 'terminal'
                ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400'
                : designMode === 'tokyo'
                ? 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}>
              <Cloud className="w-5 h-5" id="nav-logo-icon" />
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-lg tracking-tight hover:opacity-80 transition-opacity cursor-pointer ${styles.heading}`} onClick={() => handleNavClick('hero')}>
                {personalInfo.name}
              </span>
              <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded inline-block ${
                designMode === 'swiss'
                  ? 'bg-zinc-200 text-zinc-800 border border-zinc-300'
                  : designMode === 'terminal'
                  ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40'
                  : designMode === 'tokyo'
                  ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                AWS Pro × 2
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${getActiveNavItemStyle(item.id)}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-current/10 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden border-b px-2 pt-2 pb-4 space-y-1 sm:px-3 animate-fade-in ${
          designMode === 'swiss'
            ? 'bg-[#FAF9F6] border-zinc-200'
            : designMode === 'terminal'
            ? 'bg-[#040406] border-emerald-950'
            : designMode === 'tokyo'
            ? 'bg-[#070510] border-indigo-950'
            : 'bg-slate-950 border-slate-900'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-item-mobile-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-all ${getMobileActiveNavItemStyle(item.id)}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
