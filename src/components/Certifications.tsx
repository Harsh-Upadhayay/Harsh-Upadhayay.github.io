import React from 'react';
import { Award, ShieldCheck, CheckCircle2, ExternalLink, ArrowUpRight, FileText } from 'lucide-react';
import { certifications } from '../data';
import { useDesign } from './DesignContext';

export default function Certifications() {
  const { designMode, currentTheme } = useDesign();
  const styles = currentTheme.styles;

  // Sort professional ones to the top
  const sortedCertifications = [...certifications].sort((a, b) => {
    const aIsPro = a.name.includes('Professional');
    const bIsPro = b.name.includes('Professional');
    if (aIsPro && !bIsPro) return -1;
    if (!aIsPro && bIsPro) return 1;
    return 0;
  });

  const getCardStyle = (isPro: boolean) => {
    if (isPro) {
      switch (designMode) {
        case 'swiss':
          return 'bg-amber-50/50 border-2 border-amber-500/80 shadow-[0_4px_12px_rgba(245,158,11,0.08)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.15)]';
        case 'terminal':
          return 'bg-black border border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:border-amber-400';
        case 'tokyo':
          return 'bg-gradient-to-b from-fuchsia-500/15 to-[#110d22] border border-fuchsia-500/50 shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:border-fuchsia-400/80 hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]';
        default: // cosmic
          return 'bg-gradient-to-b from-amber-500/10 to-slate-900 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]';
      }
    } else {
      return styles.card;
    }
  };

  const getBadgeStyle = (isPro: boolean) => {
    if (isPro) {
      return 'bg-amber-500/15 text-amber-600 border border-amber-500/30 font-bold';
    } else {
      switch (designMode) {
        case 'swiss': return 'bg-zinc-100 text-zinc-800 border border-zinc-250 font-medium';
        case 'terminal': return 'bg-emerald-950/40 text-emerald-300 border border-emerald-900/30 font-medium';
        case 'tokyo': return 'bg-indigo-500/10 text-indigo-300 border border-indigo-900/30 font-medium';
        default: return 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 font-medium';
      }
    }
  };

  const getIconColor = (isPro: boolean) => {
    if (isPro) return 'text-amber-500';
    switch (designMode) {
      case 'swiss': return 'text-zinc-700';
      case 'terminal': return 'text-emerald-400';
      case 'tokyo': return 'text-fuchsia-400';
      default: return 'text-cyan-400';
    }
  };

  if (designMode === 'swiss') {
    return (
      <section 
        id="certifications" 
        className="py-24 bg-[#F8F7F4] border-t border-[#1a1a1a]/10 transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-12">
            <h2 className="font-editorial text-4xl font-normal text-[#1a1a1a] tracking-tight">
              AWS Credentials
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/60 font-bold">
              Verified via Credly
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-[#1a1a1a]/10 border border-[#1a1a1a]/10">
            {sortedCertifications.map((cert, index) => {
              const isPro = cert.name.includes('Professional');
              // Format clean short display names matching the mock layout
              const displayName = cert.name
                .replace('AWS Certified ', '')
                .replace(' - Professional', '')
                .replace(' - Associate', '')
                .replace(' - Specialty', '');

              return (
                <div 
                  key={index}
                  id={`cert-card-${index}`}
                  className="bg-[#F8F7F4] p-8 transition-colors duration-300 hover:bg-white flex flex-col justify-between group h-full relative"
                >
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#1a1a1a]/50 font-bold block mb-4">
                      {isPro ? 'Professional' : 'Associate'}
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-[#1a1a1a] leading-[1.1] mb-2">
                      {displayName}
                    </h3>
                  </div>

                  <div className="mt-8">
                    <span className="font-editorial text-3xl font-bold text-[#d44d2e] block">
                      {cert.score}
                    </span>
                    
                    {/* Inline Actions hidden by default, sliding up beautifully on hover */}
                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a 
                        href={cert.badge_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[9px] uppercase tracking-wider text-[#1a1a1a]/60 hover:text-[#d44d2e] transition-colors border border-[#1a1a1a]/15 px-2 py-1 bg-white shadow-xs"
                      >
                        Credly
                      </a>
                      <a 
                        href={cert.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[9px] uppercase tracking-wider text-[#1a1a1a]/60 hover:text-[#d44d2e] transition-colors border border-[#1a1a1a]/15 px-2 py-1 bg-white shadow-xs"
                      >
                        PDF
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 border border-[#1a1a1a]/10 bg-white max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-wider leading-relaxed text-[#1a1a1a]/70">
              <span className="text-[#d44d2e] font-bold mr-2">// Operational Verification:</span> 
              All certificates are issued directly by Amazon Web Services (AWS) Training and Certification. Credentials can be independently verified on Credly by clicking the links above or viewing the secure PDFs.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="certifications" 
      className={`py-20 border-t transition-all duration-500 ${styles.border} ${
        designMode === 'swiss' ? 'bg-zinc-50/50' : 'bg-current/1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl tracking-tight ${styles.heading}`} id="certs-title">
            AWS Credentials & Certifications
          </h2>
          <div className={`w-12 h-1 mx-auto mt-3 rounded ${
            designMode === 'swiss' ? 'bg-rose-600' : 'bg-amber-500'
          }`} />
          <p className={`mt-4 ${styles.textMuted}`}>
            Holds 5 active AWS certifications including both elite Professional-tier certifications. These demonstrate verified operational expertise in designing, deploying, and managing secure, high-availability, and cost-optimized cloud architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {sortedCertifications.map((cert, index) => {
            const isPro = cert.name.includes('Professional');
            return (
              <div
                key={index}
                id={`cert-card-${index}`}
                className={`group relative rounded-xl p-6 flex flex-col justify-between transition-all duration-300 ${getCardStyle(isPro)}`}
              >
                {/* Level Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${getBadgeStyle(isPro)}`}>
                    {isPro ? 'Professional' : 'Associate'}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-current/5 ${getIconColor(isPro)}`}>
                    {isPro ? <Award className="w-4.5 h-4.5" /> : <ShieldCheck className="w-4.5 h-4.5" />}
                  </div>
                </div>

                {/* Name */}
                <div className="flex-grow space-y-2 mb-6">
                  <h3 className={`font-sans font-bold text-sm tracking-tight leading-snug transition-colors group-hover:text-current ${
                    designMode === 'swiss' ? 'text-zinc-900' : 'text-slate-100'
                  }`}>
                    {cert.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs opacity-60 font-mono">
                    <span>Score:</span>
                    <span className={`font-bold ${isPro ? 'text-amber-500' : 'text-cyan-400'}`}>{cert.score}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t border-current/10">
                  <a
                    href={cert.badge_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-xs font-medium font-sans py-2 px-3 rounded border flex items-center justify-between transition-colors ${
                      designMode === 'swiss'
                        ? 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'
                        : 'bg-black/30 border-current/10 hover:border-current/20 text-current hover:bg-black/50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 opacity-80">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Credly Badge
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                  
                  <a
                    href={cert.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-xs font-medium font-sans py-2 px-3 rounded border flex items-center justify-between transition-colors ${
                      designMode === 'swiss'
                        ? 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'
                        : 'bg-black/30 border-current/10 hover:border-current/20 text-current hover:bg-black/50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 opacity-80">
                      <FileText className="w-3.5 h-3.5" />
                      Certificate PDF
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* AWS Verification Notice */}
        <div className={`mt-10 p-4 rounded-lg border flex items-start gap-3 max-w-2xl mx-auto ${
          designMode === 'swiss'
            ? 'bg-zinc-100/50 border-zinc-200'
            : 'bg-current/5 border-current/10'
        }`}>
          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
            designMode === 'swiss' ? 'text-zinc-700' : 'text-emerald-500'
          }`} />
          <p className={`text-xs leading-relaxed ${styles.textMuted}`}>
            <strong className="text-current font-bold">Operational Verification:</strong> All certificates are issued directly by Amazon Web Services (AWS) Training and Certification. Credentials can be independently verified on Credly by clicking the badges above or viewing the original secure PDFs.
          </p>
        </div>
      </div>
    </section>
  );
}
