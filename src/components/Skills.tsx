import React from 'react';
import { Terminal, Layers, Database, Cloud } from 'lucide-react';
import { skills } from '../data';
import { useDesign } from './DesignContext';

export default function Skills() {
  const { designMode, currentTheme } = useDesign();
  const styles = currentTheme.styles;

  const getCardHeaderBadge = (type: 'cyan' | 'amber') => {
    if (type === 'cyan') {
      switch (designMode) {
        case 'swiss': return 'bg-rose-50 text-rose-700 border border-rose-200';
        case 'terminal': return 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40';
        case 'tokyo': return 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20';
        default: return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      }
    } else {
      switch (designMode) {
        case 'swiss': return 'bg-amber-50 text-amber-700 border border-amber-200';
        case 'terminal': return 'bg-amber-950/30 text-amber-400 border border-amber-900/40';
        case 'tokyo': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
        default: return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      }
    }
  };

  const getPrimaryBadgeStyle = () => {
    switch (designMode) {
      case 'swiss': return 'text-xs font-mono font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-lg';
      case 'terminal': return 'text-xs font-mono font-semibold bg-emerald-500 text-black border border-emerald-400 px-3 py-1.5 rounded-lg';
      case 'tokyo': return 'text-xs font-mono font-semibold bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 px-3 py-1.5 rounded-lg';
      default: return 'text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1.5 rounded-lg';
    }
  };

  if (designMode === 'swiss') {
    const coreEng = [
      ...skills.languages.primary,
      ...skills.languages.proficient,
      'FastAPI',
      'Django'
    ].join(', ');
    
    const infra = [
      ...skills.cloud_and_devops.aws,
      ...skills.cloud_and_devops.containers,
      ...skills.cloud_and_devops.ci_cd
    ].join(', ');

    const edge = [
      ...skills.databases,
      ...skills.message_queues,
      ...skills.cloud_and_devops.other
    ].join(', ');

    return (
      <section 
        id="skills" 
        className="py-24 bg-[#fdfcf9] border-t border-[#1a1a1a]/10 transition-all duration-500 animate-fade-in"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d44d2e] block mb-4 font-bold animate-fade-in">
              Capabilities
            </span>
            <h2 className="font-serif font-normal text-4xl sm:text-5xl text-[#1a1a1a] tracking-tight">
              Technical Skill Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-[#1a1a1a]/10 p-8 bg-white hover:bg-[#1a1a1a]/[0.01] transition-all animate-fade-in">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#1a1a1a]/50 mb-4 font-bold">
                Core Engineering
              </h3>
              <p className="font-editorial text-base sm:text-lg text-[#1a1a1a]/80 leading-relaxed font-light">
                {coreEng}
              </p>
            </div>

            <div className="border border-[#1a1a1a]/10 p-8 bg-white hover:bg-[#1a1a1a]/[0.01] transition-all animate-fade-in">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#1a1a1a]/50 mb-4 font-bold">
                Distributed Infra
              </h3>
              <p className="font-editorial text-base sm:text-lg text-[#1a1a1a]/80 leading-relaxed font-light">
                {infra}
              </p>
            </div>

            <div className="border border-[#1a1a1a]/10 p-8 bg-white hover:bg-[#1a1a1a]/[0.01] transition-all animate-fade-in">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#1a1a1a]/50 mb-4 font-bold">
                Systems Edge
              </h3>
              <p className="font-editorial text-base sm:text-lg text-[#1a1a1a]/80 leading-relaxed font-light">
                {edge}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="skills" 
      className={`py-20 border-t transition-all duration-500 ${styles.border} relative`}
    >
      {designMode === 'cosmic' && (
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      )}
      {designMode === 'tokyo' && (
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl tracking-tight ${styles.heading}`} id="skills-title">
            Technical Skill Matrix
          </h2>
          <div className={`w-12 h-1 mx-auto mt-3 rounded ${
            designMode === 'swiss' ? 'bg-rose-600' : 'bg-cyan-500'
          }`} />
          <p className={`mt-4 ${styles.textMuted}`}>
            Structured into clear, functional domains demonstrating a robust backend engineering background integrated with production-grade cloud infrastructure and observability.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Core Languages Card */}
          <div className={`p-6 ${styles.card}`}>
            <div className={`flex items-center gap-3 mb-5 pb-3 border-b ${styles.borderMuted}`}>
              <span className={`p-2 rounded-lg ${getCardHeaderBadge('cyan')}`}>
                <Terminal className="w-5 h-5" />
              </span>
              <h3 className={`font-sans font-bold text-base ${designMode === 'swiss' ? 'text-zinc-900' : 'text-slate-100'}`}>Core Languages</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-2 ${styles.textTertiary}`}>Primary Fluencies</span>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.primary.map(lang => (
                    <span key={lang} className={getPrimaryBadgeStyle()}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-2 ${styles.textTertiary}`}>Proficient / Familiar</span>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.proficient.map(lang => (
                    <span key={lang} className={styles.badge}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Web Frameworks & Scraping Card */}
          <div className={`p-6 ${styles.card}`}>
            <div className={`flex items-center gap-3 mb-5 pb-3 border-b ${styles.borderMuted}`}>
              <span className={`p-2 rounded-lg ${getCardHeaderBadge('amber')}`}>
                <Layers className="w-5 h-5" />
              </span>
              <h3 className={`font-sans font-bold text-base ${designMode === 'swiss' ? 'text-zinc-900' : 'text-slate-100'}`}>Frameworks & Libraries</h3>
            </div>
            
            <div className="space-y-2">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-2 ${styles.textTertiary}`}>Backend & Data Scraping</span>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks_and_libraries.map(fw => {
                  const isLearning = fw.includes('learning');
                  return (
                    <span
                      key={fw}
                      className={`text-xs font-mono px-2.5 py-1.5 rounded-lg border ${
                        isLearning
                          ? 'bg-purple-500/5 text-purple-400 border-purple-500/20 italic'
                          : styles.badge
                      }`}
                    >
                      {fw}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Databases & Message Queues Card */}
          <div className={`p-6 ${styles.card}`}>
            <div className={`flex items-center gap-3 mb-5 pb-3 border-b ${styles.borderMuted}`}>
              <span className={`p-2 rounded-lg ${getCardHeaderBadge('cyan')}`}>
                <Database className="w-5 h-5" />
              </span>
              <h3 className={`font-sans font-bold text-base ${designMode === 'swiss' ? 'text-zinc-900' : 'text-slate-100'}`}>Storage & Distributed Queues</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-2 ${styles.textTertiary}`}>Relational & NoSQL Stores</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.databases.map(db => (
                    <span key={db} className={styles.badge}>
                      {db}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-2 ${styles.textTertiary}`}>High-Throughput Brokerage</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.message_queues.map(mq => (
                    <span key={mq} className={`text-xs font-mono px-2.5 py-1.5 rounded-lg border ${
                      designMode === 'swiss'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {mq}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Enterprise AWS Cloud (Large spanning card on desktop) */}
          <div className={`md:col-span-2 lg:col-span-3 p-6 lg:p-8 ${styles.card}`}>
            <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${styles.borderMuted}`}>
              <span className={`p-2 rounded-lg ${getCardHeaderBadge('amber')}`}>
                <Cloud className="w-6 h-6" />
              </span>
              <div>
                <h3 className={`font-sans font-bold text-base leading-tight ${designMode === 'swiss' ? 'text-zinc-900' : 'text-slate-100'}`}>Enterprise AWS Infrastructure</h3>
                <span className={`text-xs ${styles.textTertiary}`}>Comprehensive toolkit matching Solutions Architect & DevOps Professional standards</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="md:col-span-2 space-y-2">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                  designMode === 'swiss' ? 'text-rose-600' : 'text-amber-400'
                }`}>Amazon Web Services (AWS) Tools</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.cloud_and_devops.aws.map(service => (
                    <span key={service} className={styles.badge}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-2 ${styles.textTertiary}`}>Containers & Envs</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.cloud_and_devops.containers.map(container => (
                      <span key={container} className={`${styles.badge} w-full text-center`}>
                        {container}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-2 ${styles.textTertiary}`}>CI/CD Engine Room</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.cloud_and_devops.ci_cd.map(cicd => (
                      <span key={cicd} className={`${styles.badge} w-full text-center`}>
                        {cicd}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-2 ${styles.textTertiary}`}>System Edge Utilities</span>
                <div className="flex flex-col gap-2">
                  {skills.cloud_and_devops.other.map(util => {
                    const isLearning = util.includes('learning');
                    return (
                      <span
                        key={util}
                        className={`text-xs font-mono px-2.5 py-1.5 rounded-lg border text-center ${
                          isLearning
                            ? 'bg-purple-500/5 text-purple-400 border-purple-500/20 italic'
                            : styles.badge
                        }`}
                      >
                        {util}
                      </span>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
