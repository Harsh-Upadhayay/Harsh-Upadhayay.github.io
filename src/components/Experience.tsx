import React, { useState } from 'react';
import { Calendar, MapPin, Briefcase, ChevronRight, Users, Code, Trophy } from 'lucide-react';
import { experiences } from '../data';
import { useDesign } from './DesignContext';

export default function Experience() {
  const { designMode, currentTheme } = useDesign();
  const styles = currentTheme.styles;

  const smsDataTechExp = experiences.find(e => e.company === 'SMS DataTech')!;
  const outScaleExp = experiences.find(e => e.company === 'OutScale')!;

  // Track active project within SMS DataTech (defaulting to the first one)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const getCompanyBadgeStyle = (company: string) => {
    if (company === 'SMS DataTech') {
      switch (designMode) {
        case 'swiss': return 'bg-rose-50 text-rose-700 border border-rose-200';
        case 'terminal': return 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40';
        case 'tokyo': return 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20';
        default: return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      }
    } else {
      switch (designMode) {
        case 'swiss': return 'bg-amber-50 text-amber-700 border border-amber-200';
        case 'terminal': return 'bg-amber-950/30 text-amber-400 border border-amber-900/30';
        case 'tokyo': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
        default: return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      }
    }
  };

  const getActiveTabStyle = (idx: number) => {
    const isActive = activeProjectIndex === idx;
    if (!isActive) {
      switch (designMode) {
        case 'swiss': return 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900';
        case 'terminal': return 'bg-transparent border-transparent text-emerald-600 hover:bg-emerald-950/15 hover:text-emerald-400';
        case 'tokyo': return 'bg-transparent border-transparent text-indigo-400 hover:bg-[#16122d] hover:text-indigo-100';
        default: return 'bg-transparent border-transparent text-slate-400 hover:bg-slate-900/30 hover:text-slate-200';
      }
    }

    switch (designMode) {
      case 'swiss':
        return 'bg-zinc-100 border-zinc-400 text-zinc-900 font-bold shadow-sm';
      case 'terminal':
        return 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400 font-bold shadow-sm';
      case 'tokyo':
        return 'bg-fuchsia-500/10 border-fuchsia-500/40 text-fuchsia-400 font-bold shadow-sm';
      default:
        return 'bg-slate-900 border-cyan-500/40 text-cyan-400 font-bold shadow-sm';
    }
  };

  const getIndicatorColor = () => {
    switch (designMode) {
      case 'swiss': return 'bg-rose-600';
      case 'terminal': return 'bg-emerald-400';
      case 'tokyo': return 'bg-fuchsia-400';
      default: return 'bg-cyan-400';
    }
  };

  const getSubIndicatorColor = () => {
    switch (designMode) {
      case 'swiss': return 'bg-amber-500';
      case 'terminal': return 'bg-amber-500';
      case 'tokyo': return 'bg-amber-400';
      default: return 'bg-amber-400';
    }
  };

  // Track active project across all experiences in Swiss mode
  const [activeTab, setActiveTab] = useState(0);

  if (designMode === 'swiss') {
    const smsProjects = smsDataTechExp.projects || [];
    const tabList = [
      ...smsProjects.map(p => p.name),
      "Cloud administration" // maps to OutScale
    ];

    const isActiveSmsProject = activeTab < smsProjects.length;

    return (
      <section 
        id="experience" 
        className="py-24 bg-[#F8F7F4] border-t border-[#1a1a1a]/10 transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-16">
            <h2 className="font-editorial text-4xl font-normal text-[#1a1a1a] tracking-tight">
              Career Path
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/60 font-bold">
              SMS DataTech & OutScale / Tokyo
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Vertical tab list */}
            <div className="lg:col-span-4">
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-[#1a1a1a]/10 lg:pr-8 gap-2 scrollbar-none">
                {tabList.map((tabName, idx) => {
                  const isActive = activeTab === idx;
                  return (
                    <button
                      key={idx}
                      id={`exp-tab-${idx}`}
                      onClick={() => setActiveTab(idx)}
                      className={`block w-full text-left py-3.5 px-4 transition-all duration-300 font-mono text-xs uppercase tracking-wider border-l-2 cursor-pointer whitespace-nowrap lg:whitespace-normal ${
                        isActive 
                          ? 'border-[#d44d2e] text-[#1a1a1a] font-bold bg-[#1a1a1a]/[0.02]' 
                          : 'border-transparent text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/20'
                      }`}
                    >
                      {tabName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Detailed workspace panel */}
            <div className="lg:col-span-8 space-y-6">
              {isActiveSmsProject ? (
                // Render active SMS DataTech project details
                <div className="space-y-6 animate-fade-in">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#d44d2e] font-bold block">
                    Project Milestone 01.0{activeTab + 1}
                  </span>
                  
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight my-2">
                    {smsProjects[activeTab].name}
                  </h3>
                  
                  <p className="font-editorial text-lg sm:text-xl text-[#1a1a1a]/80 leading-relaxed font-light italic max-w-3xl">
                    {smsProjects[activeTab].summary}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-[#1a1a1a]/5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#1a1a1a]/40 block font-bold">// Key Contributions</span>
                    <ul className="space-y-2.5">
                      {smsProjects[activeTab].highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="font-sans text-xs sm:text-sm text-[#1a1a1a]/70 flex items-start gap-2.5 leading-relaxed font-light">
                          <span className="text-[#d44d2e] mt-1 text-xs">▪</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-[#1a1a1a]/10">
                    {smsProjects[activeTab].tech.map((tag, tIdx) => (
                      <span key={tIdx} className="font-mono text-[9px] uppercase tracking-wider text-[#d44d2e] bg-[#d44d2e]/5 border border-[#d44d2e]/10 px-2.5 py-1 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                // Render OutScale experience details
                <div className="space-y-6 animate-fade-in">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#d44d2e] font-bold block">
                    Cloud Consultation · OutScale
                  </span>
                  
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight my-2">
                    AWS Cloud Consultant & Administrator
                  </h3>
                  
                  <p className="font-editorial text-lg sm:text-xl text-[#1a1a1a]/80 leading-relaxed font-light italic max-w-3xl">
                    Engineered high-concurrency Node.js and Python microservices. Validated architecture compliance, optimized compute footprints via FinOps practices, and guided local enterprises in secure AWS migration strategies.
                  </p>

                  <div className="space-y-4 pt-4 border-t border-[#1a1a1a]/5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#1a1a1a]/40 block font-bold">// Key Contributions</span>
                    <ul className="space-y-2.5">
                      {outScaleExp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="font-sans text-xs sm:text-sm text-[#1a1a1a]/70 flex items-start gap-2.5 leading-relaxed font-light">
                          <span className="text-[#d44d2e] mt-1 text-xs">▪</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-[#1a1a1a]/10">
                    {['React', 'TypeScript', 'Python', 'Node.js', 'AWS', 'Docker'].map((tag, tIdx) => (
                      <span key={tIdx} className="font-mono text-[9px] uppercase tracking-wider text-[#d44d2e] bg-[#d44d2e]/5 border border-[#d44d2e]/10 px-2.5 py-1 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="experience" 
      className={`py-20 border-t transition-all duration-500 ${styles.border} relative`}
    >
      {designMode === 'cosmic' && (
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      )}
      {designMode === 'tokyo' && (
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl tracking-tight ${styles.heading}`} id="exp-title">
            Professional Experience
          </h2>
          <div className={`w-12 h-1 mx-auto mt-3 rounded ${
            designMode === 'swiss' ? 'bg-rose-600' : 'bg-cyan-500'
          }`} />
          <p className={`mt-4 ${styles.textMuted}`}>
            A proven track record of designing, deploying, and optimizing critical data systems, cloud architectures, and scraping operations. Currently based full-time in Tokyo, Japan.
          </p>
        </div>

        {/* Main Experience Layout */}
        <div className="space-y-12">
          
          {/* SMS DataTech (Main Company) */}
          <div className={`p-6 sm:p-8 ${styles.card}`}>
            {/* Header info */}
            <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between pb-6 border-b ${styles.borderMuted} gap-4`}>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`p-2 rounded-lg ${getCompanyBadgeStyle('SMS DataTech')}`}>
                    <Briefcase className="w-5 h-5" />
                  </span>
                  <h3 className={`text-xl sm:text-2xl tracking-tight ${styles.heading}`}>
                    {smsDataTechExp.role}
                  </h3>
                </div>
                <div className="font-sans font-semibold text-base flex flex-wrap items-center gap-2">
                  <span className={designMode === 'swiss' ? 'text-rose-600' : 'text-cyan-400'}>{smsDataTechExp.company}</span>
                  <span className="opacity-30">•</span>
                  <span className={`text-xs font-medium flex items-center gap-1 ${styles.textMuted}`}>
                    <MapPin className="w-3.5 h-3.5" />
                    {smsDataTechExp.location}
                  </span>
                </div>
              </div>

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs ${
                designMode === 'swiss'
                  ? 'bg-zinc-100 border border-zinc-250 text-zinc-700'
                  : 'bg-black/30 border border-current/10 text-current'
              }`}>
                <Calendar className={`w-4 h-4 ${designMode === 'swiss' ? 'text-rose-600' : 'text-cyan-500'}`} />
                <span>{smsDataTechExp.start} — {smsDataTechExp.end}</span>
              </div>
            </div>

            {/* Sub-projects Showcase with Tabbed Workspace Layout (Desktop) */}
            <div className="mt-8">
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${styles.textMuted}`}>
                <span>Enterprise Projects & Milestones ({smsDataTechExp.projects?.length})</span>
                <span className={`h-px flex-grow ${styles.borderMuted} border-b`} />
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                
                {/* Left Sidebar project list */}
                <div className="lg:col-span-4 space-y-2">
                  {smsDataTechExp.projects?.map((project, idx) => (
                    <button
                      key={idx}
                      id={`project-tab-${idx}`}
                      onClick={() => setActiveProjectIndex(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer group relative overflow-hidden ${getActiveTabStyle(idx)}`}
                    >
                      {activeProjectIndex === idx && (
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getIndicatorColor()}`} />
                      )}
                      <div className="flex items-center justify-between">
                        <span className="font-sans font-semibold text-sm leading-snug">
                          {project.name}
                        </span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${activeProjectIndex === idx ? 'translate-x-1' : 'group-hover:translate-x-0.5'}`} />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right detailed workspace panel */}
                <div className={`lg:col-span-8 p-6 sm:p-8 min-h-[350px] flex flex-col justify-between rounded-xl border ${
                  designMode === 'swiss'
                    ? 'bg-zinc-50/50 border-zinc-200 text-zinc-700'
                    : 'bg-black/20 border-current/10'
                }`}>
                  {smsDataTechExp.projects && (
                    <div className="space-y-6">
                      
                      {/* Project Head */}
                      <div className="space-y-2">
                        <h5 className={`text-lg sm:text-xl tracking-tight ${styles.heading}`}>
                          {smsDataTechExp.projects[activeProjectIndex].name}
                        </h5>
                        <p className={`text-sm leading-relaxed ${styles.textMuted}`}>
                          {smsDataTechExp.projects[activeProjectIndex].summary}
                        </p>
                      </div>

                      {/* Project Meta Metrics */}
                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-b text-xs ${styles.borderMuted}`}>
                        <div className="flex items-center gap-2">
                          <Users className={`w-4 h-4 ${designMode === 'swiss' ? 'text-rose-600' : 'text-cyan-400'}`} />
                          <span className={styles.textMuted}>Team Scale:</span>
                          <span className="font-semibold text-current">{smsDataTechExp.projects[activeProjectIndex].team}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Code className={`w-4 h-4 ${designMode === 'swiss' ? 'text-zinc-600' : 'text-amber-400'}`} />
                          <span className={styles.textMuted}>Primary Stack:</span>
                          <span className="font-semibold text-current truncate">
                            {smsDataTechExp.projects[activeProjectIndex].tech.slice(0, 4).join(', ')}...
                          </span>
                        </div>
                      </div>

                      {/* Detailed Bullet Highlights */}
                      <div className="space-y-3">
                        <h6 className={`text-[10px] font-mono font-bold uppercase tracking-widest ${styles.textTertiary}`}>Core Contributions & Metrics</h6>
                        <ul className={`space-y-3 font-sans text-sm leading-relaxed ${styles.textMuted}`}>
                          {smsDataTechExp.projects[activeProjectIndex].highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${getIndicatorColor()}`} />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technology Chips Footer */}
                      <div className={`pt-4 border-t flex flex-wrap gap-2 ${styles.borderMuted}`}>
                        {smsDataTechExp.projects[activeProjectIndex].tech.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={styles.badge}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* OutScale (Second Company) */}
          <div className={`p-6 sm:p-8 ${styles.card}`}>
            <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b ${styles.borderMuted}`}>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`p-2 rounded-lg ${getCompanyBadgeStyle('OutScale')}`}>
                    <Trophy className="w-5 h-5" />
                  </span>
                  <h3 className={`text-xl tracking-tight ${styles.heading}`}>
                    {outScaleExp.role}
                  </h3>
                </div>
                <div className="font-sans font-semibold text-base flex flex-wrap items-center gap-2">
                  <span className={designMode === 'swiss' ? 'text-rose-600' : 'text-amber-500'}>{outScaleExp.company}</span>
                  <span className="opacity-30">•</span>
                  <span className={`text-xs font-medium flex items-center gap-1 ${styles.textMuted}`}>
                    <MapPin className="w-3.5 h-3.5" />
                    {outScaleExp.location}
                  </span>
                </div>
              </div>

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs ${
                designMode === 'swiss'
                  ? 'bg-zinc-100 border border-zinc-250 text-zinc-700'
                  : 'bg-black/30 border border-current/10 text-current'
              }`}>
                <Calendar className={`w-4 h-4 ${designMode === 'swiss' ? 'text-rose-600' : 'text-amber-500'}`} />
                <span>{outScaleExp.start} — {outScaleExp.end}</span>
              </div>
            </div>

            <div className="mt-6 pt-2">
              <ul className={`space-y-3 font-sans text-sm leading-relaxed ${styles.textMuted}`}>
                {outScaleExp.highlights?.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${getSubIndicatorColor()}`} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
