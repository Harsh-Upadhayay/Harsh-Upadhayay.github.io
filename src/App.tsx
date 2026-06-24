import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Contact from './components/Contact';
import PersonSchema from './components/PersonSchema';
import ThemeSwitcher from './components/ThemeSwitcher';
import { DesignProvider, useDesign } from './components/DesignContext';
import { personalInfo } from './data';
import { Github, Linkedin, Award, BookOpen, Terminal, ChevronUp, Clock, Globe } from 'lucide-react';

export default function App() {
  return (
    <DesignProvider>
      <AppContent />
    </DesignProvider>
  );
}

function AppContent() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const { currentTheme } = useDesign();
  const styles = currentTheme.styles;

  // Update UTC Time dynamically
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set document SEO tags dynamically
  useEffect(() => {
    document.title = "Harsh Upadhayay — AWS Certified Software Engineer";
    
    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Personal portfolio of Harsh Upadhayay, an AWS-certified Software Engineer specialising in cloud infrastructure, backend systems, and AI-powered data pipelines. Based in Tokyo, open to global opportunities.");

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', "Software Engineer, AWS Certified, Backend Engineer, Cloud Infrastructure, Python Engineer, Go Engineer, Django Developer, DevOps, Data Pipeline, Harsh Upadhayay");
  }, []);

  // Handle intersection observer to auto-track active section during scroll
  useEffect(() => {
    const sections = ['hero', 'certifications', 'experience', 'projects', 'skills', 'blog', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies the active middle portion of the screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Scroll back to top visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setActiveSection('hero');
  };

  return (
    <div className={`${styles.bg} min-h-screen transition-all duration-300 antialiased overflow-x-hidden relative`}>
      
      {/* Structured SEO data */}
      <PersonSchema />

      {/* Navigation bar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Sections */}
      <main className="relative">
        <Hero />
        <Certifications />
        <Experience />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
      </main>

      {/* Floating Design Studio Panel */}
      <ThemeSwitcher />

      {/* Professional Footer */}
      <footer className={`${styles.footerBg} border-t ${styles.border} py-12 relative z-10 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-current/10">
            
            {/* Column 1: Info */}
            <div className="space-y-3 text-center md:text-left">
              <span className={`${styles.heading} text-base tracking-tight`}>
                {personalInfo.name}
              </span>
              <p className="text-xs opacity-60 leading-relaxed max-w-sm">
                Backend & cloud engineer in Tokyo. AWS Solutions Architect & DevOps Professional, building distributed pipelines and cost-efficient infrastructure on AWS.
              </p>
            </div>

            {/* Column 2: System Telemetry */}
            <div className={`bg-current/5 border border-current/10 rounded-xl p-4 font-mono text-[11px] opacity-80 space-y-1.5 max-w-xs mx-auto w-full`}>
              <div className="flex items-center justify-between">
                <span>SYSTEM STATE:</span>
                <span className="text-emerald-500 font-bold">ONLINE</span>
              </div>
              <div className="flex items-center justify-between">
                <span>LOCAL TIME (UTC):</span>
                <span className="font-bold">{currentTime || 'REFRESHING...'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>LOCATION:</span>
                <span className="text-cyan-500 font-medium">TOKYO, JP</span>
              </div>
            </div>

            {/* Column 3: Social Profile Links */}
            <div className="flex flex-col items-center md:items-end gap-3 text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-50">Professional Networks</span>
              <div className="flex items-center gap-4 opacity-80">
                <a
                  id="footer-linkedin"
                  href={personalInfo.social.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-current" />
                </a>
                <a
                  id="footer-github"
                  href={personalInfo.social.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 text-current" />
                </a>
                <a
                  id="footer-leetcode"
                  href={personalInfo.social.leetcode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title="LeetCode"
                >
                  <Award className="w-5 h-5 text-current" />
                </a>
                <a
                  id="footer-codeforces"
                  href={personalInfo.social.codeforces.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title="Codeforces"
                >
                  <Terminal className="w-5 h-5 text-current" />
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] opacity-50 font-mono gap-4">
            <span>© {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-cyan-500/50" />
                Optimized for Speed & SEO
              </span>
              <span>•</span>
              <button
                onClick={scrollToTop}
                className="hover:opacity-80 font-bold transition-opacity flex items-center gap-1 cursor-pointer text-current"
              >
                Back to top
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          id="floating-scroll-top"
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-40 p-3 rounded-xl shadow-lg border backdrop-blur cursor-pointer transition-all ${
            currentTheme.id === 'swiss'
              ? 'bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800'
              : 'bg-black/60 text-cyan-400 border-current/10 hover:border-cyan-500/30'
          }`}
          title="Scroll to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
