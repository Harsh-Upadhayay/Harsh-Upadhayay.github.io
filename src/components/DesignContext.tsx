import React, { createContext, useContext, useState, useEffect } from 'react';

export type DesignMode = 'cosmic' | 'swiss' | 'terminal' | 'tokyo';

export interface ThemeStyles {
  bg: string;
  secBg: string;
  text: string;
  textMuted: string;
  textTertiary: string;
  border: string;
  borderMuted: string;
  accent: string;
  accentBg: string;
  accentHover: string;
  card: string;
  heading: string;
  btnPrimary: string;
  btnSecondary: string;
  mono: string;
  badge: string;
  navBg: string;
  footerBg: string;
  glow: string;
}

export interface DesignThemeConfig {
  id: DesignMode;
  name: string;
  description: string;
  styles: ThemeStyles;
}

export const themes: Record<DesignMode, DesignThemeConfig> = {
  cosmic: {
    id: 'cosmic',
    name: 'Cosmic Slate',
    description: 'Sleek dark theme with cybernetic blue and amber accents, starry dust, and grid backdrops.',
    styles: {
      bg: 'bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200',
      secBg: 'bg-slate-900',
      text: 'text-slate-100',
      textMuted: 'text-slate-400',
      textTertiary: 'text-slate-500',
      border: 'border-slate-900',
      borderMuted: 'border-slate-800/60',
      accent: 'text-cyan-400',
      accentBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
      accentHover: 'hover:text-cyan-300',
      card: 'bg-slate-900/40 backdrop-blur-md border border-slate-900 hover:border-cyan-500/40 hover:bg-slate-900/60 shadow-lg shadow-black/35 rounded-xl transition-all duration-300',
      heading: 'font-sans font-extrabold tracking-tight text-slate-100',
      btnPrimary: 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold px-5 py-3 rounded-lg shadow-lg shadow-cyan-500/10 transition-all duration-200 cursor-pointer',
      btnSecondary: 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium px-5 py-3 rounded-lg transition-all duration-200 cursor-pointer',
      mono: 'font-mono text-cyan-400 bg-cyan-500/5 px-1.5 py-0.5 rounded border border-cyan-500/10',
      badge: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded text-[11px] font-mono',
      navBg: 'bg-slate-950/80 backdrop-blur-md border-b border-slate-900 shadow-md',
      footerBg: 'bg-slate-950 border-t border-slate-900',
      glow: 'bg-gradient-to-b from-cyan-500/5 to-transparent'
    }
  },
  swiss: {
    id: 'swiss',
    name: 'Swiss Minimalist',
    description: 'Elegant, dual-pane high-contrast light editorial layout with Cormorant Garamond serif headers and warm rust accents.',
    styles: {
      bg: 'bg-[#F8F7F4] text-[#1a1a1a] font-sans selection:bg-[#d44d2e]/10 selection:text-[#d44d2e]',
      secBg: 'bg-[#F8F7F4]',
      text: 'text-[#1a1a1a]',
      textMuted: 'text-[#1a1a1a]/60 font-sans font-light',
      textTertiary: 'text-[#1a1a1a]/40 font-mono text-[10px] uppercase tracking-wider',
      border: 'border-[#1a1a1a]/10',
      borderMuted: 'border-[#1a1a1a]/5',
      accent: 'text-[#d44d2e]',
      accentBg: 'bg-[#d44d2e]/5 text-[#d44d2e] border border-[#d44d2e]/10',
      accentHover: 'hover:text-[#d44d2e]/85',
      card: 'bg-white border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/20 shadow-xs rounded-none transition-all duration-300',
      heading: 'font-serif font-semibold italic tracking-tight text-[#1a1a1a]',
      btnPrimary: 'bg-[#d44d2e] hover:bg-[#d44d2e]/90 text-white font-mono uppercase text-xs tracking-wider px-6 py-3 shadow-xs transition-all duration-200 cursor-pointer',
      btnSecondary: 'bg-white hover:bg-zinc-50 text-[#1a1a1a] border border-[#1a1a1a]/15 font-mono uppercase text-[11px] tracking-wider px-5 py-3 transition-all duration-200 cursor-pointer',
      mono: 'font-mono text-[#d44d2e] bg-[#d44d2e]/5 px-1.5 py-0.5 rounded border border-[#d44d2e]/10',
      badge: 'bg-[#1a1a1a]/5 text-[#1a1a1a]/80 border border-transparent px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider',
      navBg: 'bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#1a1a1a]/10 shadow-xs',
      footerBg: 'bg-[#F8F7F4] border-t border-[#1a1a1a]/10',
      glow: 'bg-gradient-to-b from-[#d44d2e]/3 to-transparent'
    }
  },
  terminal: {
    id: 'terminal',
    name: 'DevOps Console',
    description: 'High-contrast monochrome green/amber console layout with matrix grids and terminal buffers.',
    styles: {
      bg: 'bg-[#040406] text-emerald-400 font-mono selection:bg-emerald-500/20 selection:text-emerald-300',
      secBg: 'bg-black',
      text: 'text-emerald-400',
      textMuted: 'text-emerald-500/80',
      textTertiary: 'text-emerald-600/50',
      border: 'border-emerald-950',
      borderMuted: 'border-emerald-950/60',
      accent: 'text-amber-500',
      accentBg: 'bg-emerald-950/30 text-emerald-300 border border-emerald-900/30',
      accentHover: 'hover:text-amber-400',
      card: 'bg-black border border-emerald-950 hover:border-emerald-500/50 hover:bg-black/80 shadow-md shadow-emerald-950/5 rounded-md transition-all duration-200',
      heading: 'font-mono font-bold tracking-tight text-emerald-400 uppercase',
      btnPrimary: 'bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-5 py-3 rounded-md border border-emerald-400 shadow-md shadow-emerald-500/10 transition-all duration-200 cursor-pointer',
      btnSecondary: 'bg-zinc-950 hover:bg-black text-emerald-400 border border-emerald-900 font-semibold px-5 py-3 rounded-md transition-all duration-200 cursor-pointer',
      mono: 'font-mono text-amber-500 bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10',
      badge: 'bg-black text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded text-[11px] font-mono',
      navBg: 'bg-[#040406]/90 backdrop-blur-md border-b border-emerald-950 shadow-md shadow-black/50',
      footerBg: 'bg-black border-t border-emerald-950',
      glow: 'bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:24px_24px] opacity-10'
    }
  },
  tokyo: {
    id: 'tokyo',
    name: 'Tokyo Midnight',
    description: 'Neon synthwave dark theme capturing the vibrant electric energy of Tokyo nightscapes.',
    styles: {
      bg: 'bg-[#070510] text-indigo-100 font-sans selection:bg-fuchsia-500/25 selection:text-fuchsia-200',
      secBg: 'bg-[#0d091a]',
      text: 'text-indigo-100',
      textMuted: 'text-indigo-300',
      textTertiary: 'text-indigo-400/60',
      border: 'border-[#1b1535]',
      borderMuted: 'border-[#1b1535]/60',
      accent: 'text-fuchsia-400',
      accentBg: 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20',
      accentHover: 'hover:text-fuchsia-300',
      card: 'bg-[#110d22]/80 backdrop-blur-md border border-[#1b1535] hover:border-fuchsia-500/40 hover:bg-[#16122d] shadow-lg shadow-indigo-950/40 rounded-xl transition-all duration-300',
      heading: 'font-sans font-extrabold tracking-tight text-indigo-100',
      btnPrimary: 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-400 hover:to-indigo-400 text-white font-bold px-5 py-3 rounded-lg shadow-lg shadow-fuchsia-500/15 transition-all duration-200 cursor-pointer',
      btnSecondary: 'bg-[#110d22] hover:bg-[#16122d] text-indigo-200 border border-[#1b1535] font-medium px-5 py-3 rounded-lg transition-all duration-200 cursor-pointer',
      mono: 'font-mono text-fuchsia-400 bg-fuchsia-500/5 px-1.5 py-0.5 rounded border border-fuchsia-500/10',
      badge: 'bg-[#110d22] text-fuchsia-400 border border-[#1b1535] px-2 py-0.5 rounded text-[11px] font-mono',
      navBg: 'bg-[#070510]/80 backdrop-blur-md border-b border-[#1b1535] shadow-md',
      footerBg: 'bg-[#070510] border-t border-[#1b1535]',
      glow: 'bg-gradient-to-b from-fuchsia-500/6 to-transparent'
    }
  }
};

interface DesignContextProps {
  designMode: DesignMode;
  setDesignMode: (mode: DesignMode) => void;
  currentTheme: DesignThemeConfig;
}

const DesignContext = createContext<DesignContextProps | undefined>(undefined);

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [designMode, setDesignMode] = useState<DesignMode>(() => {
    const saved = localStorage.getItem('portfolio-design-mode');
    return (saved as DesignMode) || 'swiss';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-design-mode', designMode);
    
    // Manage class list on html element if needed for Tailwind integration
    const root = document.documentElement;
    root.classList.remove('theme-cosmic', 'theme-swiss', 'theme-terminal', 'theme-tokyo');
    root.classList.add(`theme-${designMode}`);
    
    // Manage background color of body for seamless scrolling aesthetics
    if (designMode === 'swiss') {
      document.body.className = 'bg-[#fdfcf9]';
      root.style.colorScheme = 'light';
    } else if (designMode === 'terminal') {
      document.body.className = 'bg-[#040406]';
      root.style.colorScheme = 'dark';
    } else if (designMode === 'tokyo') {
      document.body.className = 'bg-[#070510]';
      root.style.colorScheme = 'dark';
    } else {
      document.body.className = 'bg-slate-950';
      root.style.colorScheme = 'dark';
    }
  }, [designMode]);

  const currentTheme = themes[designMode];

  return (
    <DesignContext.Provider value={{ designMode, setDesignMode, currentTheme }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
}
