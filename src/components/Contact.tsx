import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Terminal, Trash2, Database, FileText } from 'lucide-react';
import { personalInfo } from '../data';
import { ContactMessage } from '../types';
import { useDesign } from './DesignContext';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Local store of submitted messages for demo purposes
  const [demoMessages, setDemoMessages] = useState<ContactMessage[]>([]);
  const { designMode, currentTheme } = useDesign();
  const styles = currentTheme.styles;

  useEffect(() => {
    const saved = localStorage.getItem('harsh_portfolio_messages');
    if (saved) {
      try {
        setDemoMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse messages from localStorage');
      }
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSuccess(false);

    // Validation
    if (!name.trim()) return setFormError('Name is required.');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setFormError('A valid email is required.');
    if (!subject.trim()) return setFormError('Subject is required.');
    if (!message.trim()) return setFormError('Message body is required.');

    setIsSubmitting(true);

    // Open the visitor's email client with the message pre-filled so it
    // genuinely reaches the inbox (no backend required).
    const mailBody = `From: ${name} <${email}>\n\n${message}`;
    const mailtoUrl = `mailto:${personalInfo.contact.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;

    // Keep a local-only copy so the visitor can see what they drafted.
    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString()
    };

    const updatedMessages = [newMessage, ...demoMessages];
    setDemoMessages(updatedMessages);
    localStorage.setItem('harsh_portfolio_messages', JSON.stringify(updatedMessages));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Clear inputs
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const handleDeleteMessage = (id: string) => {
    const filtered = demoMessages.filter(m => m.id !== id);
    setDemoMessages(filtered);
    localStorage.setItem('harsh_portfolio_messages', JSON.stringify(filtered));
  };

  const getInputClass = () => {
    switch (designMode) {
      case 'swiss':
        return 'w-full bg-white border border-zinc-300 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-rose-500 focus:ring-rose-500 rounded-xl px-4 py-2.5 text-sm transition-all font-sans';
      case 'terminal':
        return 'w-full bg-black border border-emerald-950 text-emerald-400 placeholder-emerald-800/60 focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 rounded-lg px-4 py-2.5 text-sm transition-all font-mono';
      case 'tokyo':
        return 'w-full bg-[#120f24]/80 border border-indigo-950 text-indigo-100 placeholder-indigo-400/30 focus:outline-none focus:border-fuchsia-500 focus:ring-fuchsia-500 rounded-xl px-4 py-2.5 text-sm transition-all font-sans';
      default:
        return 'w-full bg-slate-950/60 border border-slate-850 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 rounded-xl px-4 py-2.5 text-sm transition-all font-sans';
    }
  };

  const getBadgeStyle = (type: 'cyan' | 'amber') => {
    if (type === 'cyan') {
      switch (designMode) {
        case 'swiss': return 'bg-rose-50 text-rose-700 border border-rose-200';
        case 'terminal': return 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/45';
        case 'tokyo': return 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20';
        default: return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      }
    } else {
      switch (designMode) {
        case 'swiss': return 'bg-amber-50 text-amber-700 border border-amber-200';
        case 'terminal': return 'bg-amber-950/20 text-amber-400 border border-amber-900/30';
        case 'tokyo': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
        default: return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      }
    }
  };

  const getInboundStoreClass = () => {
    switch (designMode) {
      case 'swiss': return 'bg-[#FAF9F6] border border-zinc-250 text-zinc-900';
      case 'terminal': return 'bg-black border border-emerald-950 text-emerald-400';
      case 'tokyo': return 'bg-[#0f0b24] border border-indigo-950 text-indigo-200';
      default: return 'bg-slate-950 border border-slate-900 text-slate-400';
    }
  };

  if (designMode === 'swiss') {
    return (
      <section 
        id="contact" 
        className="py-24 bg-[#F8F7F4] border-t border-[#1a1a1a]/10 transition-all duration-500 animate-fade-in"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-16">
            <h2 className="font-editorial text-4xl font-normal text-[#1a1a1a] tracking-tight">
              Direct Transmit
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/60 font-bold">
              Secure Routing Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column: Quote and Meta */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-editorial text-2xl sm:text-3xl text-[#1a1a1a] italic leading-relaxed font-light mb-12 max-w-lg">
                  "The best way to predict the future is to build it. Let's design reliable pipelines, resilient architectures, and highly optimized services."
                </p>
                
                <div className="space-y-6">
                  <div className="border-b border-[#1a1a1a]/10 pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#1a1a1a]/50 font-bold block mb-1">Direct Email</span>
                    <a href={`mailto:${personalInfo.contact.email}`} className="font-editorial text-xl font-bold text-[#1a1a1a] hover:text-[#d44d2e] transition-colors">
                      {personalInfo.contact.email}
                    </a>
                  </div>
                  <div className="border-b border-[#1a1a1a]/10 pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#1a1a1a]/50 font-bold block mb-1">Telephony (JP)</span>
                    <a href={`tel:${personalInfo.contact.phone_japan.replace(/\s+/g, '')}`} className="font-editorial text-xl font-bold text-[#1a1a1a] hover:text-[#d44d2e] transition-colors">
                      {personalInfo.contact.phone_japan}
                    </a>
                  </div>
                  <div className="border-b border-[#1a1a1a]/10 pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#1a1a1a]/50 font-bold block mb-1">Telephony (IN)</span>
                    <a href={`tel:${personalInfo.contact.phone_india.replace(/\s+/g, '')}`} className="font-editorial text-xl font-bold text-[#1a1a1a] hover:text-[#d44d2e] transition-colors">
                      {personalInfo.contact.phone_india}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border border-[#1a1a1a]/10 p-6 bg-white mt-12 lg:mt-0">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#d44d2e] font-bold block mb-2">// Open to work</span>
                <p className="font-sans text-xs text-[#1a1a1a]/60 leading-relaxed">
                  Open to full-time backend, cloud, and platform engineering roles in Tokyo or remote. The form opens your own email client — or reach me directly at the address above. I reply within a day.
                </p>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-wider text-[#d44d2e] hover:text-[#1a1a1a] transition-colors border border-[#1a1a1a]/15 px-3 py-2 bg-white inline-flex mt-4 font-bold"
                >
                  Download Résumé (PDF)
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div>
              <div className="bg-white p-8 sm:p-10 border border-[#1a1a1a]/10">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {formError && (
                    <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 font-mono">
                      {formError.toUpperCase()}
                    </div>
                  )}

                  {isSuccess && (
                    <div className="p-5 bg-emerald-50 border border-emerald-200 text-emerald-850 animate-fade-in">
                      <span className="block font-editorial font-bold text-base">Your email client is opening</span>
                      <span className="block text-xs mt-1.5 font-sans leading-relaxed opacity-90">
                        If nothing pops up, email me directly at {personalInfo.contact.email}. A copy of your draft is saved below in your browser only.
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name-input" className="block font-mono text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 font-bold">Ident</label>
                      <input
                        id="name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="SARAH JENKINS"
                        className="w-full bg-[#F8F7F4] border border-[#1a1a1a]/10 focus:outline-none focus:border-[#d44d2e] p-3 text-xs font-mono uppercase tracking-wide rounded-none transition-all placeholder-[#1a1a1a]/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email-input" className="block font-mono text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 font-bold">Return Route</label>
                      <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="S.JENKINS@CORP.COM"
                        className="w-full bg-[#F8F7F4] border border-[#1a1a1a]/10 focus:outline-none focus:border-[#d44d2e] p-3 text-xs font-mono uppercase tracking-wide rounded-none transition-all placeholder-[#1a1a1a]/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject-input" className="block font-mono text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 font-bold">Subject</label>
                    <input
                      id="subject-input"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="INFRASTRUCTURE CONSULTATION"
                      className="w-full bg-[#F8F7F4] border border-[#1a1a1a]/10 focus:outline-none focus:border-[#d44d2e] p-3 text-xs font-mono uppercase tracking-wide rounded-none transition-all placeholder-[#1a1a1a]/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message-input" className="block font-mono text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 font-bold">Inquiry Payload</label>
                    <textarea
                      id="message-input"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="PROPOSE CHALLENGES OR COLLABORATIVE MISSIONS..."
                      className="w-full bg-[#F8F7F4] border border-[#1a1a1a]/10 focus:outline-none focus:border-[#d44d2e] p-3 text-xs font-mono uppercase tracking-wide rounded-none transition-all placeholder-[#1a1a1a]/30"
                    />
                  </div>

                  <button
                    id="submit-contact-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1a1a1a] hover:bg-[#d44d2e] text-white font-mono text-xs uppercase tracking-widest py-4 transition-all duration-300 font-bold rounded-none cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 rounded-full border-white border-t-transparent animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Local Ingress Console (Swiss Mode) */}
          <div className="mt-20 border border-[#1a1a1a]/10 bg-white shadow-xs">
            <div className="px-6 py-4 border-b border-[#1a1a1a]/10 flex items-center justify-between bg-[#F8F7F4]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#1a1a1a]">
                <span className="w-2 h-2 rounded-full bg-[#d44d2e]" />
                <span className="font-bold uppercase tracking-wider">Your Draft (local preview)</span>
              </div>
              <span className="font-mono text-[10px] text-[#1a1a1a]/50">SAVED IN YOUR BROWSER ONLY</span>
            </div>

            <div className="p-6 font-mono text-xs text-[#1a1a1a]">
              {demoMessages.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] border-b border-[#1a1a1a]/10 pb-2">
                    <span>{demoMessages.length} INBOUND TRANSACTION(S) IN MEMORY</span>
                    <button
                      onClick={() => {
                        setDemoMessages([]);
                        localStorage.removeItem('harsh_portfolio_messages');
                      }}
                      className="text-[#d44d2e] hover:underline cursor-pointer font-bold animate-pulse"
                    >
                      Clear database
                    </button>
                  </div>

                  {demoMessages.map((msg, index) => (
                    <div key={msg.id} className="p-4 border border-[#1a1a1a]/10 bg-[#F8F7F4] flex items-start justify-between gap-4 group animate-fade-in">
                      <div className="space-y-1.5 flex-grow">
                        <div className="flex items-center gap-2 text-[10px] text-[#1a1a1a]/60 flex-wrap">
                          <strong className="font-sans text-[#1a1a1a] font-bold">{msg.name}</strong>
                          <span>&lt;{msg.email}&gt;</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <div className="font-sans font-bold text-sm text-[#1a1a1a]">Subject: {msg.subject}</div>
                        <p className="font-sans text-sm text-[#1a1a1a]/80 leading-relaxed pt-1 whitespace-pre-wrap">{msg.message}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1.5 border border-[#1a1a1a]/10 text-[#1a1a1a]/50 hover:text-[#d44d2e] hover:border-[#d44d2e]/30 cursor-pointer bg-white"
                        title="Purge transaction"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#1a1a1a]/50 space-y-2">
                  <Database className="w-8 h-8 mx-auto opacity-30 animate-pulse" />
                  <span className="block font-medium">Database stack empty.</span>
                  <p className="font-sans text-xs max-w-md mx-auto">No contact submissions detected in local database. Fill out the form above to trigger ingestion.</p>
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
      id="contact" 
      className={`py-20 border-t transition-all duration-500 ${styles.border} relative`}
    >
      {designMode === 'cosmic' && (
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      )}
      {designMode === 'tokyo' && (
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl tracking-tight ${styles.heading}`} id="contact-title">
            Get in Touch
          </h2>
          <div className={`w-12 h-1 mx-auto mt-3 rounded ${
            designMode === 'swiss' ? 'bg-rose-600' : 'bg-cyan-500'
          }`} />
          <p className={`mt-4 ${styles.textMuted}`}>
            Hiring for a backend, cloud, or platform role? Grab my résumé and email me — the form opens your own mail client, or reach me directly below. I reply within a day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Info Card Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 sm:p-8 space-y-6 ${styles.card}`}>
              <h3 className={`text-lg font-bold tracking-tight ${
                designMode === 'swiss' ? 'text-zinc-900' : 'text-slate-100'
              }`}>Hiring for a backend or cloud role?</h3>
              <p className={`text-xs leading-relaxed ${styles.textMuted}`}>
                I'm open to full-time backend, cloud, and platform engineering roles — based in Tokyo, open to remote. Grab my résumé and email me; I reply within a day.
              </p>

              <div className={`space-y-4 pt-4 border-t font-mono text-xs ${styles.borderMuted}`}>
                
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getBadgeStyle('cyan')}`}>
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className={`block text-[10px] uppercase tracking-widest ${styles.textTertiary}`}>Primary Email</span>
                    <a href={`mailto:${personalInfo.contact.email}`} className="text-current hover:opacity-80 transition-opacity">
                      {personalInfo.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getBadgeStyle('amber')}`}>
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className={`block text-[10px] uppercase tracking-widest ${styles.textTertiary}`}>Japan Contact</span>
                    <a href={`tel:${personalInfo.contact.phone_japan.replace(/\s+/g, '')}`} className="text-current hover:opacity-80 transition-opacity">
                      {personalInfo.contact.phone_japan}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getBadgeStyle('cyan')}`}>
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className={`block text-[10px] uppercase tracking-widest ${styles.textTertiary}`}>India Contact</span>
                    <a href={`tel:${personalInfo.contact.phone_india.replace(/\s+/g, '')}`} className="text-current hover:opacity-80 transition-opacity">
                      {personalInfo.contact.phone_india}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getBadgeStyle('amber')}`}>
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className={`block text-[10px] uppercase tracking-widest ${styles.textTertiary}`}>Work Location</span>
                    <span className="text-current">Tokyo, Japan</span>
                  </div>
                </div>

              </div>
            </div>

            {/* AWS Pro Certificate Notice */}
            <div className={`border rounded-2xl p-6 text-xs flex items-start gap-3 ${
              designMode === 'swiss'
                ? 'bg-zinc-100 border-zinc-200 text-zinc-600'
                : 'bg-current/5 border-current/10 text-current'
            }`}>
              <ShieldCheck className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                designMode === 'swiss' ? 'text-rose-600' : 'text-amber-400'
              }`} />
              <div className="space-y-2">
                <strong className="block font-sans font-semibold">Open to backend, cloud & platform roles</strong>
                <p className="leading-relaxed font-sans">
                  The form opens your own email client — or email me directly. I reply within a day.
                </p>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  <FileText className="w-4 h-4" />
                  Download Résumé (PDF)
                </a>
              </div>
            </div>
          </div>

          {/* Form Card Right */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 ${styles.card}`}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {formError && (
                  <div className="p-3 text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg">
                    {formError}
                  </div>
                )}

                {isSuccess && (
                  <div className={`p-4 rounded-xl flex items-start gap-3 animate-fade-in ${
                    designMode === 'swiss'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  }`}>
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${designMode === 'swiss' ? 'text-emerald-700' : ''}`} />
                    <div>
                      <span className="block font-sans font-bold text-sm">Your email client is opening</span>
                      <span className="block text-xs mt-0.5 font-sans leading-normal opacity-80">
                        If nothing pops up, email me directly at {personalInfo.contact.email}. A copy of your draft is saved below in your browser only.
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name-input" className={`block text-[10px] font-mono uppercase tracking-wider ${styles.textTertiary}`}>Your Name</label>
                    <input
                      id="name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className={getInputClass()}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email-input" className={`block text-[10px] font-mono uppercase tracking-wider ${styles.textTertiary}`}>Email Address</label>
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sjenkins@company.com"
                      className={getInputClass()}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject-input" className={`block text-[10px] font-mono uppercase tracking-wider ${styles.textTertiary}`}>Inquiry Subject</label>
                  <input
                    id="subject-input"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Engineering Opportunity at TechCorp"
                    className={getInputClass()}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message-input" className={`block text-[10px] font-mono uppercase tracking-wider ${styles.textTertiary}`}>Message Body</label>
                  <textarea
                    id="message-input"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide detailed opportunity constraints or questions..."
                    className={getInputClass()}
                  />
                </div>

                <button
                  id="submit-contact-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className={`${styles.btnPrimary} w-full flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <div className={`w-4 h-4 border-2 rounded-full animate-spin ${
                        designMode === 'swiss' ? 'border-zinc-950 border-t-transparent' : 'border-white border-t-transparent'
                      }`} />
                      <span>Transmitting Payload...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

        {/* Dynamic Recruiter Message Console */}
        <div className={`mt-16 max-w-5xl mx-auto border rounded-2xl overflow-hidden shadow-2xl transition-all ${
          designMode === 'swiss' ? 'border-zinc-250' : 'border-current/10'
        }`}>
          {/* Title bar */}
          <div className={`px-6 py-4 border-b flex items-center justify-between select-none ${
            designMode === 'swiss'
              ? 'bg-zinc-100 border-zinc-250 text-zinc-800'
              : 'bg-black/80 border-current/10 text-current'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`p-1.5 rounded ${
                designMode === 'swiss' ? 'bg-zinc-200 text-zinc-800' : 'bg-current/10'
              }`}>
                <Terminal className="w-4.5 h-4.5" />
              </span>
              <div>
                <span className="block font-mono text-xs font-bold">Your Draft — Local Preview</span>
                <span className="block text-[10px] opacity-60 font-sans">Saved in your browser only; nothing is sent to a server.</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider">Browser Storage</span>
            </div>
          </div>

          {/* Console Output */}
          <div className={`p-6 min-h-[160px] font-mono text-xs leading-relaxed overflow-x-auto ${getInboundStoreClass()}`}>
            {demoMessages.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2 text-[10px] border-current/10 opacity-70">
                  <span>SHOWING {demoMessages.length} LOCAL INGESTS</span>
                  <button
                    onClick={() => {
                      setDemoMessages([]);
                      localStorage.removeItem('harsh_portfolio_messages');
                    }}
                    className="text-rose-500 hover:text-rose-400 flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Wipe database
                  </button>
                </div>
                
                {demoMessages.map((msg, index) => (
                  <div key={msg.id} className={`p-4 rounded-xl border flex items-start justify-between gap-4 animate-fade-in group ${
                    designMode === 'swiss'
                      ? 'bg-white border-zinc-200 text-zinc-800'
                      : 'bg-black/60 border-current/10'
                  }`}>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-x-2 text-[10px] opacity-70">
                        <span className="font-bold font-sans text-current">{msg.name}</span>
                        <span>&lt;{msg.email}&gt;</span>
                        <span className="opacity-30">|</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      
                      <div className="font-sans font-bold pt-1 text-current">
                        Sub: {msg.subject}
                      </div>

                      <p className="font-sans opacity-85 text-sm pt-1 leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className={`p-1.5 rounded border cursor-pointer opacity-0 group-hover:opacity-100 transition-all ${
                        designMode === 'swiss'
                          ? 'bg-zinc-50 border-zinc-250 text-zinc-500 hover:text-rose-600 hover:border-rose-400'
                          : 'bg-black border-current/10 hover:border-rose-500/30 hover:text-rose-400'
                      }`}
                      title="Purge message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 opacity-65 space-y-2">
                <Database className="w-8 h-8 mx-auto text-current opacity-40" />
                <span className="block">Message stack is currently empty.</span>
                <span className="block text-[10px] opacity-80">No contact submissions detected in local database. Fill out the form above to trigger ingestion.</span>
              </div>
            )}
          </div>
        </div>
 
      </div>
    </section>
  );
}
