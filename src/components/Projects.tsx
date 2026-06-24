import React, { useState, useMemo } from 'react';
import { Search, Github, Code, Server, Layers, ExternalLink } from 'lucide-react';
import { projects } from '../data';
import { useDesign } from './DesignContext';

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const { designMode, currentTheme } = useDesign();
  const styles = currentTheme.styles;

  const statuses = ['All', 'Active', 'In Progress', 'Completed'];

  // Filter projects by both search query and status filter
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
      
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        project.name.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.tech.some(t => t.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [searchQuery, selectedStatus]);

  const getPillStyle = (status: string) => {
    const isActive = selectedStatus === status;
    if (isActive) {
      switch (designMode) {
        case 'swiss': return 'bg-zinc-900 text-white font-bold shadow-sm';
        case 'terminal': return 'bg-emerald-500 text-black font-bold shadow-sm';
        case 'tokyo': return 'bg-fuchsia-500 text-white font-bold shadow-sm';
        default: return 'bg-amber-500 text-slate-950 font-bold shadow-sm';
      }
    } else {
      switch (designMode) {
        case 'swiss': return 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900';
        case 'terminal': return 'bg-zinc-950 text-emerald-500/70 border border-emerald-950 hover:text-emerald-400 hover:bg-black';
        case 'tokyo': return 'bg-[#120f24] text-indigo-300 border border-indigo-950 hover:text-indigo-100 hover:bg-[#16122d]';
        default: return 'bg-slate-900 text-slate-400 border border-slate-850 hover:text-slate-200 hover:bg-slate-850';
      }
    }
  };

  const getBulletColor = () => {
    switch (designMode) {
      case 'swiss': return 'bg-rose-600';
      case 'terminal': return 'bg-emerald-400';
      case 'tokyo': return 'bg-fuchsia-400';
      default: return 'bg-cyan-400';
    }
  };

  const getIconColor = () => {
    switch (designMode) {
      case 'swiss': return 'text-zinc-800';
      case 'terminal': return 'text-emerald-400';
      case 'tokyo': return 'text-fuchsia-400';
      default: return 'text-cyan-400';
    }
  };

  if (designMode === 'swiss') {
    return (
      <section 
        id="projects" 
        className="py-24 bg-[#F8F7F4] border-t border-[#1a1a1a]/10 transition-all duration-500 animate-fade-in"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-16">
            <h2 className="font-editorial text-4xl font-normal text-[#1a1a1a] tracking-tight">
              Selected Works
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/60 font-bold">
              Engineering Portfolio
            </span>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 pb-6 border-b border-[#1a1a1a]/10">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {statuses.map(status => (
                <button
                  key={status}
                  id={`status-pill-${status.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap rounded-none border ${
                    selectedStatus === status
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] font-bold'
                      : 'bg-white text-[#1a1a1a]/60 border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30 hover:text-[#1a1a1a]'
                  }`}
                >
                  {status.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <input
                id="project-search-input"
                type="text"
                placeholder="SEARCH TECH (GO, REDIS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#1a1a1a]/10 focus:outline-none focus:border-[#d44d2e] p-3 pl-4 text-xs font-mono rounded-none transition-all placeholder-[#1a1a1a]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3 flex items-center text-[10px] font-mono text-[#d44d2e]"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Grid display */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {filteredProjects.map((project, index) => {
                const primaryCategory = project.tech[0] ? `System Design / ${project.tech[0]}` : 'System Design';
                return (
                  <div 
                    key={index}
                    id={`project-card-${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className="group bg-white p-8 border border-[#1a1a1a]/10 hover:border-[#d44d2e]/30 transition-all duration-300 flex flex-col justify-between relative h-full animate-fade-in"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#1a1a1a]/50 font-bold block">
                          {primaryCategory}
                        </span>
                        <span className={`font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 border ${
                          project.status === 'Active'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : project.status === 'In Progress'
                            ? 'border-amber-200 bg-amber-50 text-amber-700'
                            : 'border-blue-200 bg-blue-50 text-blue-700'
                        } font-bold`}>
                          {project.status === 'In Progress' ? 'PROGRESS' : project.status.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl font-bold text-[#1a1a1a] leading-snug mb-3 group-hover:text-[#d44d2e] transition-colors">
                        {project.name}
                      </h3>
                      
                      <p className="font-editorial text-base text-[#1a1a1a]/70 leading-relaxed font-light mb-6">
                        {project.summary}
                      </p>

                      {/* Display limited bullets of highlights for clean visual consistency */}
                      <ul className="space-y-1.5 mb-6">
                        {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                          <li key={hIdx} className="font-sans text-xs text-[#1a1a1a]/60 flex items-start gap-2">
                            <span className="text-[#d44d2e] mt-1 text-[10px]">▪</span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto space-y-6">
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1a1a1a]/5">
                        {project.tech.map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className="font-mono text-[9px] uppercase tracking-wider border border-[#1a1a1a]/10 px-2 py-0.5 text-[#d44d2e] font-semibold bg-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className={`flex gap-2 ${project.live ? 'flex-row' : ''}`}>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center block font-mono text-[10px] uppercase tracking-widest text-white bg-[#1a1a1a] hover:bg-[#d44d2e] border border-[#1a1a1a] hover:border-[#d44d2e] py-3 transition-all font-bold"
                          >
                            Live Demo
                          </a>
                        )}
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-center block font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a] hover:text-[#d44d2e] border border-[#1a1a1a]/15 hover:border-[#d44d2e]/30 py-3 bg-white hover:bg-zinc-50 transition-all font-bold ${project.live ? 'flex-1' : 'w-full'}`}
                        >
                          Source Code
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 border border-[#1a1a1a]/10 bg-white max-w-lg mx-auto">
              <span className="block font-sans font-semibold text-sm text-[#1a1a1a]">No projects matches query</span>
              <button
                onClick={() => { setSelectedStatus('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 text-xs font-mono tracking-wider border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all cursor-pointer uppercase font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section 
      id="projects" 
      className={`py-20 border-t transition-all duration-500 ${styles.border} relative`}
    >
      {designMode === 'cosmic' && (
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      )}
      {designMode === 'tokyo' && (
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className={`text-3xl tracking-tight ${styles.heading}`} id="projects-title">
            Key Software Projects
          </h2>
          <div className={`w-12 h-1 mx-auto mt-3 rounded ${
            designMode === 'swiss' ? 'bg-rose-600' : 'bg-amber-500'
          }`} />
          <p className={`mt-4 ${styles.textMuted}`}>
            Side projects where I go deep on the backend and infrastructure I care about — a Go rate limiter on AWS, a self-hosted homelab, an LLM-powered scraper, and a live offline-first app.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className={`flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b ${styles.borderMuted}`}>
          
          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {statuses.map(status => (
              <button
                key={status}
                id={`status-pill-${status.toLowerCase().replace(' ', '-')}`}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${getPillStyle(status)}`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-current opacity-40">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="project-search-input"
              type="text"
              placeholder="Search tech (Go, Redis, Scrapy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-current/45 focus:outline-none focus:ring-1 transition-all font-mono ${
                designMode === 'swiss'
                  ? 'bg-white border border-zinc-300 text-zinc-900 focus:border-rose-500 focus:ring-rose-500'
                  : designMode === 'terminal'
                  ? 'bg-black border border-emerald-950 text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500'
                  : designMode === 'tokyo'
                  ? 'bg-[#120f24] border border-indigo-950 text-indigo-100 focus:border-fuchsia-500 focus:ring-fuchsia-500'
                  : 'bg-slate-900 border border-slate-800 text-slate-100 focus:border-cyan-500/50 focus:ring-cyan-500/50'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-current opacity-60 hover:opacity-100"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Grid display */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const matchesGo = project.tech.includes('Go');
              const matchesRedis = project.tech.includes('Redis');

              return (
                <div
                  key={index}
                  id={`project-card-${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`p-6 flex flex-col justify-between hover:-translate-y-1 ${styles.card}`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className={`p-2.5 rounded-xl border ${
                        designMode === 'swiss'
                          ? 'bg-zinc-100 border-zinc-200 text-zinc-800'
                          : 'bg-black/40 border-current/10 text-current'
                      }`}>
                        {matchesGo ? (
                          <Server className="w-5 h-5" />
                        ) : matchesRedis ? (
                          <Layers className="w-5 h-5" />
                        ) : (
                          <Code className="w-5 h-5" />
                        )}
                      </div>
                      
                      {/* Status and Action Badge */}
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          project.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : project.status === 'In Progress'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        }`}>
                          {project.status}
                        </span>
                        
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-1.5 rounded-lg border transition-all ${
                              designMode === 'swiss'
                                ? 'bg-zinc-50 border-zinc-250 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-950'
                                : 'bg-black border-current/10 hover:border-current/20 text-current hover:bg-black/40'
                            }`}
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1.5 rounded-lg border transition-all ${
                            designMode === 'swiss'
                              ? 'bg-zinc-50 border-zinc-250 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-950'
                              : 'bg-black border-current/10 hover:border-current/20 text-current hover:bg-black/40'
                          }`}
                          title="View Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className={`text-base tracking-tight leading-snug group-hover:text-cyan-400 transition-colors flex items-center gap-1.5 ${
                        designMode === 'swiss' ? 'text-zinc-900 font-bold' : styles.text
                      }`}>
                        {project.name}
                      </h3>
                      <p className={`text-xs leading-relaxed min-h-[48px] ${styles.textMuted}`}>
                        {project.summary}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <div className={`space-y-2 pt-2 border-t ${styles.borderMuted}`}>
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${styles.textTertiary}`}>Key Features</span>
                      <ul className="space-y-1.5">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className={`flex items-start gap-2 text-xs leading-normal ${styles.textMuted}`}>
                            <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${getBulletColor()}`} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Tech stack tags */}
                  <div className={`pt-4 mt-4 border-t flex flex-wrap gap-1.5 ${styles.borderMuted}`}>
                    {project.tech.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={styles.badge}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className={`text-center py-16 border rounded-2xl max-w-lg mx-auto ${
            designMode === 'swiss'
              ? 'bg-zinc-100/50 border-zinc-200'
              : 'bg-current/2 border-current/10'
          }`}>
            <Code className={`w-10 h-10 mx-auto mb-3 opacity-60 ${getIconColor()}`} />
            <span className="block font-sans font-semibold">No projects found</span>
            <span className="block text-xs opacity-60 mt-1">Try resetting the status filter or using different keywords.</span>
            <button
              onClick={() => { setSelectedStatus('All'); setSearchQuery(''); }}
              className={`mt-4 px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer ${
                designMode === 'swiss'
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-white'
                  : 'bg-black border border-current/15 hover:bg-current/5'
              }`}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
