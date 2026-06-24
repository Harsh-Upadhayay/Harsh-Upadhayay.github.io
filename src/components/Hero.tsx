import React from 'react';
import { Github, Linkedin, Mail, ArrowRight, ShieldCheck, Database, Award, BookOpen, Terminal, Sparkles, MapPin, AppWindow } from 'lucide-react';
import { personalInfo, certifications } from '../data';
import { useDesign } from './DesignContext';

export default function Hero() {
  const { designMode, currentTheme } = useDesign();
  const styles = currentTheme.styles;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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

  // Theme-specific style helpers
  const getGradientText = () => {
    switch (designMode) {
      case 'swiss': return 'text-rose-600';
      case 'terminal': return 'text-amber-500';
      case 'tokyo': return 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400';
      default: return 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400';
    }
  };

  const getBadgeStyle = () => {
    switch (designMode) {
      case 'swiss': return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'terminal': return 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/40';
      case 'tokyo': return 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20';
      default: return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
    }
  };

  const getMetricAccent = (index: number) => {
    if (designMode === 'swiss') return 'text-zinc-900';
    if (designMode === 'terminal') return 'text-emerald-400';
    if (index === 1) return 'text-amber-400';
    return designMode === 'tokyo' ? 'text-fuchsia-400' : 'text-cyan-400';
  };

  if (designMode === 'swiss') {
    return (
      <section 
        id="hero" 
        className="relative pt-32 pb-24 bg-[#F8F7F4] border-b border-[#1a1a1a]/10 transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-end">
            
            {/* Left Column: Title, description, and stats */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d44d2e] font-bold block mb-4">
                  Harsh Upadhayay · Engineered in Tokyo
                </span>
                <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight text-[#1a1a1a]">
                  Backends that scale. <span className="italic font-light">Bills that don't.</span>
                </h1>
                <p className="font-editorial text-lg sm:text-2xl text-[#1a1a1a]/80 leading-relaxed font-light italic mt-6 max-w-3xl">
                  Backend &amp; cloud engineer with 2+ years building distributed pipelines and production AWS infrastructure for enterprise clients including Sony. Five AWS certifications, two at Professional tier.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t-2 border-[#1a1a1a]">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#1a1a1a]/60 block mb-2 font-bold">Certifications</span>
                  <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#1a1a1a]">05</div>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#1a1a1a]/60 block mb-2 font-bold">Exp (Years)</span>
                  <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#1a1a1a]">02+</div>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#1a1a1a]/60 block mb-2 font-bold">Cloud Cut /mo</span>
                  <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#1a1a1a]">$1K</div>
                </div>
              </div>
            </div>

            {/* Right Column: Status, Get in Touch button, and social links */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#1a1a1a]/10 pt-10 lg:pt-0 lg:pl-12 flex flex-col justify-between self-stretch">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/60 block mb-3 font-bold">Current Status</span>
                  <p className="text-sm leading-relaxed text-[#1a1a1a]/80 font-sans font-light">
                    Available for backend &amp; cloud engineering roles. Holds both Professional-tier AWS exams. Specialised in distributed scraping engines, async pipelines, and cloud FinOps.
                  </p>
                </div>

                <div className="pt-4 space-y-4">
                  <a
                    id="cta-resume-swiss"
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#1a1a1a] hover:bg-[#d44d2e] text-white font-mono text-xs uppercase tracking-widest py-4 transition-all duration-300 font-bold rounded-none cursor-pointer flex items-center justify-center gap-2"
                  >
                    Download Résumé
                  </a>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a 
                      href={personalInfo.social.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] uppercase tracking-wider text-[#d44d2e] hover:text-[#d44d2e]/80 transition-colors border border-[#1a1a1a]/15 px-3 py-1.5 bg-white shadow-xs"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href={personalInfo.social.github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] uppercase tracking-wider text-[#d44d2e] hover:text-[#d44d2e]/80 transition-colors border border-[#1a1a1a]/15 px-3 py-1.5 bg-white shadow-xs"
                    >
                      GitHub
                    </a>
                    <a 
                      href={personalInfo.social.leetcode.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] uppercase tracking-wider text-[#d44d2e] hover:text-[#d44d2e]/80 transition-colors border border-[#1a1a1a]/15 px-3 py-1.5 bg-white shadow-xs"
                    >
                      LeetCode
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="hero" 
      className={`relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden transition-all duration-500 ${
        designMode === 'swiss' 
          ? 'bg-[#fdfcf9]' 
          : designMode === 'terminal' 
          ? 'bg-[#040406]' 
          : designMode === 'tokyo' 
          ? 'bg-[#070510]' 
          : 'bg-slate-950'
      }`}
    >
      {/* Dynamic Background visual graphics */}
      {designMode === 'cosmic' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        </>
      )}

      {designMode === 'swiss' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#d44d2e]/3 to-transparent pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#d44d2e]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none opacity-80" />
        </>
      )}

      {designMode === 'terminal' && (
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:24px_24px] opacity-5 pointer-events-none" />
      )}

      {designMode === 'tokyo' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-fuchsia-500/5 to-transparent pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#16122d_1px,transparent_1px),linear-gradient(to_bottom,#16122d_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wide ${getBadgeStyle()}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for backend &amp; cloud roles</span>
            </div>

            <div className="space-y-3">
              <span className={`block text-sm font-mono font-semibold tracking-wide ${styles.textMuted}`}>
                {personalInfo.name}
              </span>
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] ${styles.heading}`} id="hero-title">
                Distributed backends on AWS — <span className={getGradientText()}>and the bill cut to match.</span>
              </h1>
              <p className={`text-lg sm:text-xl font-sans font-medium opacity-90 ${styles.text}`}>
                {personalInfo.tagline}
              </p>
            </div>

            <p className={`leading-relaxed text-base max-w-2xl ${styles.textMuted}`} id="hero-summary">
              {personalInfo.summary}
            </p>

            {/* Quick Metrics */}
            <div className={`grid grid-cols-3 gap-4 py-3 border-t border-b ${styles.borderMuted}`}>
              <div>
                <div className={`text-2xl font-bold font-mono ${getMetricAccent(0)}`}>5</div>
                <div className={`text-xs ${styles.textTertiary}`}>AWS Certs · 2 Pro</div>
              </div>
              <div>
                <div className={`text-2xl font-bold font-mono ${getMetricAccent(1)}`}>~$1K/mo</div>
                <div className={`text-xs ${styles.textTertiary}`}>Cloud Cost Cut</div>
              </div>
              <div>
                <div className={`text-2xl font-bold font-mono ${getMetricAccent(2)}`}>2+ Yrs</div>
                <div className={`text-xs ${styles.textTertiary}`}>Production Exp</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                id="cta-resume"
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <span>Download Résumé</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                id="cta-email"
                href={`mailto:${personalInfo.contact.email}?subject=Backend%2FCloud%20role`}
                className={styles.btnSecondary}
              >
                Email Me
              </a>
            </div>

            {/* Socials & Contact Meta */}
            <div className={`flex flex-wrap items-center gap-6 pt-4 ${styles.textMuted}`}>
              <a
                id="social-linkedin"
                href={personalInfo.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center gap-1.5 text-sm font-sans"
              >
                <Linkedin className="w-5 h-5 text-current" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                id="social-github"
                href={personalInfo.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center gap-1.5 text-sm font-sans"
              >
                <Github className="w-5 h-5 text-current" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                id="social-leetcode"
                href={personalInfo.social.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center gap-1.5 text-sm font-mono"
              >
                <Award className="w-5 h-5 text-current" />
                <span>LeetCode</span>
              </a>
              <a
                id="social-codeforces"
                href={personalInfo.social.codeforces.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center gap-1.5 text-sm font-mono"
              >
                <Terminal className="w-5 h-5 text-current" />
                <span>Codeforces</span>
              </a>
              <a
                id="social-geeksforgeeks"
                href={personalInfo.social.geeksforgeeks.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center gap-1.5 text-sm font-sans"
              >
                <BookOpen className="w-5 h-5 text-current" />
                <span>GeeksforGeeks</span>
              </a>
            </div>

            {/* Location & Contact details */}
            <div className={`flex items-center gap-2 text-xs font-mono ${styles.textTertiary}`}>
              <MapPin className="w-4 h-4 text-rose-500/80" />
              <span>Based in Tokyo, Japan</span>
              <span className="mx-2 opacity-30">|</span>
              <Mail className="w-4 h-4 text-current" />
              <span>{personalInfo.contact.email}</span>
            </div>
          </div>

          {/* Interactive Console representation */}
          <div className="lg:col-span-5 w-full">
            <div className={`overflow-hidden shadow-2xl transition-all duration-300 border rounded-2xl ${
              designMode === 'swiss'
                ? 'bg-zinc-900 border-zinc-800 text-zinc-300 shadow-zinc-300/30'
                : designMode === 'terminal'
                ? 'bg-black border-emerald-950 text-emerald-400'
                : designMode === 'tokyo'
                ? 'bg-[#110d22] border-[#1b1535] text-indigo-200 shadow-indigo-950/40'
                : 'bg-slate-900/95 border-slate-850 text-slate-300'
            }`}>
              {/* Terminal Title Bar */}
              <div className={`px-4 py-3 border-b flex items-center justify-between ${
                designMode === 'swiss'
                  ? 'bg-zinc-950 border-zinc-850'
                  : designMode === 'terminal'
                  ? 'bg-zinc-950 border-emerald-950'
                  : designMode === 'tokyo'
                  ? 'bg-[#0c0919] border-[#1b1535]'
                  : 'bg-slate-950 border-slate-850'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] opacity-50 select-none font-mono">aws-cli // cloud-infra</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${
                  designMode === 'swiss'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : designMode === 'terminal'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : designMode === 'tokyo'
                    ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20'
                    : 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20'
                }`}>
                  LIVE_OK
                </span>
              </div>

              {/* Terminal Code Body */}
              <div className="p-5 space-y-4 font-mono text-xs leading-relaxed overflow-x-auto">
                <div>
                  <span className="opacity-40">$</span> <span className={designMode === 'swiss' ? 'text-rose-400' : 'text-amber-400'}>aws iam get-user-policy --user-name harsh</span>
                  <pre className="text-[11px] mt-1 opacity-90 text-current">
{`{
  "UserName": "harsh-upadhayay",
  "Roles": [
    "AWS-Solutions-Architect-Professional",
    "AWS-DevOps-Engineer-Professional"
  ],
  "Specialties": [
    "Distributed-Scraping-Engines",
    "Cloud-Cost-FinOps",
    "Asynchronous-Pipelines"
  ]
}`}
                  </pre>
                </div>

                <div className={`border-t pt-3 ${
                  designMode === 'swiss' ? 'border-zinc-800' : 'border-current/10'
                }`}>
                  <span className="opacity-40">$</span> <span className={designMode === 'swiss' ? 'text-rose-400' : 'text-cyan-400'}>./check_aws_credentials.sh</span>
                  <div className="mt-2 space-y-1.5 opacity-90 text-current">
                    <div className="flex items-center justify-between">
                      <span>• Solutions Architect Pro</span>
                      <span className={`font-bold px-1.5 py-0.2 rounded ${
                        designMode === 'swiss' ? 'bg-zinc-800 text-zinc-100' : 'bg-current/10'
                      }`}>VERIFIED (86%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• DevOps Pro</span>
                      <span className={`font-bold px-1.5 py-0.2 rounded ${
                        designMode === 'swiss' ? 'bg-zinc-800 text-zinc-100' : 'bg-current/10'
                      }`}>VERIFIED (86%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Solutions Architect Assoc</span>
                      <span className={`font-bold px-1.5 py-0.2 rounded ${
                        designMode === 'swiss' ? 'bg-zinc-800 text-zinc-100' : 'bg-current/10'
                      }`}>VERIFIED (90%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• SysOps Admin Assoc</span>
                      <span className={`font-bold px-1.5 py-0.2 rounded ${
                        designMode === 'swiss' ? 'bg-zinc-800 text-zinc-100' : 'bg-current/10'
                      }`}>VERIFIED (88%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Developer Assoc</span>
                      <span className={`font-bold px-1.5 py-0.2 rounded ${
                        designMode === 'swiss' ? 'bg-zinc-800 text-zinc-100' : 'bg-current/10'
                      }`}>VERIFIED (86%)</span>
                    </div>
                  </div>
                </div>

                <div className={`border-t pt-3 text-[11px] ${
                  designMode === 'swiss' ? 'border-zinc-800' : 'border-current/10'
                }`}>
                  <span className="opacity-40">$</span> <span className="opacity-60">cat system_stats.log</span>
                  <div className="grid grid-cols-2 gap-y-1 gap-x-4 mt-1 opacity-70">
                    <div>LANGS: <span className="text-current font-bold">Go, Python, SQL</span></div>
                    <div>DATABASES: <span className="text-current font-bold">PostgreSQL, Redis</span></div>
                    <div>QUEUES: <span className="text-current font-bold">Kafka, Celery</span></div>
                    <div>IaC: <span className="text-current font-bold">AWS CDK</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
