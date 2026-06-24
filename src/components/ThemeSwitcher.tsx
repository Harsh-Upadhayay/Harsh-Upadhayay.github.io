import React, { useState } from 'react';
import { useDesign, themes, DesignMode } from './DesignContext';
import { Palette, Sparkles, Terminal, Award, Eye, Settings, Compass, Info, X } from 'lucide-react';

export default function ThemeSwitcher() {
  const { designMode, setDesignMode, currentTheme } = useDesign();
  const [isOpen, setIsOpen] = useState(false);

  const icons: Record<DesignMode, React.ReactNode> = {
    cosmic: <Sparkles className="w-4 h-4 text-cyan-400" />,
    swiss: <Compass className="w-4 h-4 text-rose-600" />,
    terminal: <Terminal className="w-4 h-4 text-emerald-400" />,
    tokyo: <Award className="w-4 h-4 text-fuchsia-400" />
  };

  const getActiveIndicatorColor = (mode: DesignMode) => {
    switch (mode) {
      case 'cosmic': return 'bg-cyan-400';
      case 'swiss': return 'bg-rose-600';
      case 'terminal': return 'bg-emerald-400';
      case 'tokyo': return 'bg-fuchsia-400';
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      {/* Closed Floating Trigger Button */}
      {!isOpen && (
        <button
          id="theme-switcher-toggle"
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-4 py-3 rounded-full border shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${
            designMode === 'swiss'
              ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800'
              : designMode === 'terminal'
              ? 'bg-black border-emerald-500/50 text-emerald-400 hover:border-emerald-400'
              : designMode === 'tokyo'
              ? 'bg-[#120f24] border-fuchsia-500/40 text-fuchsia-400 hover:border-fuchsia-400'
              : 'bg-slate-900 border-cyan-500/30 text-cyan-400 hover:border-cyan-400'
          }`}
          title="Open Design Options"
        >
          <Palette className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase hidden sm:inline-block">
            Design Studio
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded font-bold font-mono bg-white/10 uppercase">
            {currentTheme.name.split(' ')[0]}
          </span>
        </button>
      )}

      {/* Expanded Control Board Panel */}
      {isOpen && (
        <div
          id="theme-switcher-panel"
          className={`w-80 rounded-2xl border p-5 shadow-2xl transition-all duration-300 scale-in-center ${
            designMode === 'swiss'
              ? 'bg-white border-zinc-300 text-zinc-900 shadow-zinc-200'
              : designMode === 'terminal'
              ? 'bg-[#09090c] border-emerald-950 text-emerald-400 shadow-emerald-950/20'
              : designMode === 'tokyo'
              ? 'bg-[#100c24] border-indigo-950 text-indigo-100 shadow-indigo-950/40'
              : 'bg-slate-900/95 backdrop-blur-md border-slate-800 text-slate-100 shadow-black/60'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-current/10 mb-4">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold">
                Design Studio
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-current/10 transition-colors cursor-pointer"
              title="Minimize panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-[11px] leading-relaxed mb-4 opacity-80">
            I designed multiple visual themes to demonstrate different development aesthetics. Select a style below to watch the entire portfolio transform.
          </p>

          {/* Theme Option Cards */}
          <div className="space-y-2.5">
            {(Object.keys(themes) as DesignMode[]).map((mode) => {
              const theme = themes[mode];
              const isActive = designMode === mode;

              return (
                <button
                  key={mode}
                  id={`theme-opt-${mode}`}
                  onClick={() => setDesignMode(mode)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 relative overflow-hidden group ${
                    isActive
                      ? designMode === 'swiss'
                        ? 'bg-zinc-100 border-zinc-400 shadow-sm'
                        : designMode === 'terminal'
                        ? 'bg-emerald-500/10 border-emerald-500/50 shadow-sm'
                        : designMode === 'tokyo'
                        ? 'bg-fuchsia-500/10 border-fuchsia-500/40 shadow-sm'
                        : 'bg-cyan-500/10 border-cyan-500/40 shadow-sm'
                      : designMode === 'swiss'
                      ? 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                      : designMode === 'terminal'
                      ? 'bg-black/60 border-emerald-950 hover:border-emerald-900/60'
                      : designMode === 'tokyo'
                      ? 'bg-[#130f2b]/40 border-indigo-950 hover:border-indigo-900'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Selected Indicator Bar */}
                  {isActive && (
                    <div className={`absolute top-0 bottom-0 left-0 w-1 ${getActiveIndicatorColor(mode)}`} />
                  )}

                  {/* Icon */}
                  <div className={`p-2 rounded-lg mt-0.5 ${
                    isActive 
                      ? 'bg-current/10' 
                      : 'bg-black/20'
                  }`}>
                    {icons[mode]}
                  </div>

                  {/* Text Details */}
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tracking-tight">
                        {theme.name}
                      </span>
                      {isActive && (
                        <span className="text-[9px] font-mono uppercase tracking-widest px-1 py-0.2 rounded bg-current/15">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] leading-relaxed opacity-70">
                      {theme.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-current/10 flex items-center gap-1.5 text-[10px] opacity-60 font-mono">
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Theme persists across sessions.</span>
          </div>
        </div>
      )}
    </div>
  );
}
