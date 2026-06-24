import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ArrowRight, X, BookOpen, CornerDownRight, ThumbsUp, Share2 } from 'lucide-react';
import { blogPosts } from '../data';
import { BlogPost } from '../types';
import { useDesign } from './DesignContext';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const { designMode, currentTheme } = useDesign();
  const styles = currentTheme.styles;

  // Extract all unique tags across all posts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(tag => tagsSet.add(tag)));
    return ['All', ...Array.from(tagsSet)];
  }, []);

  // Filter posts based on search query and tag selection
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
      
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(t => t.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });
  }, [searchQuery, selectedTag]);

  const handleLike = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [slug]: (prev[slug] || 0) + 1
    }));
  };

  const handleShare = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    // Fallback copy
    navigator.clipboard.writeText(`${window.location.origin}/#blog/${post.slug}`);
    alert('Article link copied to clipboard!');
  };

  const getPillStyle = (tag: string) => {
    const isActive = selectedTag === tag;
    if (isActive) {
      switch (designMode) {
        case 'swiss': return 'bg-zinc-900 text-white font-bold shadow-sm';
        case 'terminal': return 'bg-emerald-500 text-black font-bold shadow-sm';
        case 'tokyo': return 'bg-fuchsia-500 text-white font-bold shadow-sm';
        default: return 'bg-cyan-500 text-slate-950 font-bold shadow-sm';
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

  const getIconColor = () => {
    switch (designMode) {
      case 'swiss': return 'text-rose-600';
      case 'terminal': return 'text-emerald-400';
      case 'tokyo': return 'text-fuchsia-400';
      default: return 'text-cyan-450';
    }
  };

  const getReadTimeColor = () => {
    switch (designMode) {
      case 'swiss': return 'text-zinc-500';
      case 'terminal': return 'text-amber-500';
      case 'tokyo': return 'text-amber-400';
      default: return 'text-amber-405';
    }
  };

  return (
    <section 
      id="blog" 
      className={`py-20 border-t transition-all duration-500 ${styles.border} relative`}
    >
      {designMode === 'cosmic' && (
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      )}
      {designMode === 'tokyo' && (
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className={`text-3xl tracking-tight ${styles.heading}`} id="blog-title">
            Engineering Insights & Process
          </h2>
          <div className={`w-12 h-1 mx-auto mt-3 rounded ${
            designMode === 'swiss' ? 'bg-rose-600' : 'bg-cyan-500'
          }`} />
          <p className={`mt-4 ${styles.textMuted}`}>
            Deep technical investigations, performance optimizations, and FinOps post-mortems summarizing real-world system designs and AWS optimizations.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className={`flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b ${styles.borderMuted}`}>
          
          {/* Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {allTags.map(tag => (
              <button
                key={tag}
                id={`tag-pill-${tag.toLowerCase().replace(' ', '-')}`}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${getPillStyle(tag)}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-current opacity-40">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="blog-search-input"
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-current/40 focus:outline-none focus:ring-1 transition-all font-mono ${
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
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-current opacity-60 hover:opacity-100 animate-fade-in"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Articles List */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={index}
                id={`blog-card-${post.slug}`}
                onClick={() => setActivePost(post)}
                className={`p-6 sm:p-8 flex flex-col justify-between cursor-pointer group hover:shadow-[0_4px_30px_rgba(6,182,212,0.03)] ${styles.card}`}
              >
                <div className="space-y-4">
                  
                  {/* Meta (Date, Reading Time) */}
                  <div className="flex items-center gap-4 text-xs font-mono opacity-70">
                    <span className="flex items-center gap-1">
                      <Calendar className={`w-3.5 h-3.5 ${getIconColor()}`} />
                      {post.date}
                    </span>
                    <span className="opacity-30">|</span>
                    <span className="flex items-center gap-1">
                      <Clock className={`w-3.5 h-3.5 ${getReadTimeColor()}`} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <h3 className={`text-lg sm:text-xl leading-tight font-bold group-hover:text-cyan-400 transition-colors ${
                      designMode === 'swiss' ? 'text-zinc-900 font-bold font-serif' : styles.text
                    }`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm leading-relaxed line-clamp-3 ${styles.textMuted}`}>
                      {post.summary}
                    </p>
                  </div>

                </div>

                {/* Footer (Tags & Action) */}
                <div className={`pt-6 mt-6 border-t flex flex-wrap items-center justify-between gap-4 ${styles.borderMuted}`}>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={styles.badge}>
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className={`text-[10px] font-mono opacity-50 px-1`}>+{post.tags.length - 3} more</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold text-current opacity-85 group-hover:opacity-100">
                    <div className="flex items-center gap-1 opacity-70 hover:opacity-100" onClick={(e) => handleLike(post.slug, e)}>
                      <ThumbsUp className="w-4 h-4" />
                      <span className="font-mono">{likes[post.slug] || 0}</span>
                    </div>
                    <span className="flex items-center gap-1 font-sans">
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className={`text-center py-16 border rounded-2xl max-w-lg mx-auto ${
            designMode === 'swiss'
              ? 'bg-zinc-100/50 border-zinc-200'
              : 'bg-current/2 border-current/10'
          }`}>
            <BookOpen className={`w-10 h-10 mx-auto mb-3 opacity-60 ${getIconColor()}`} />
            <span className="block font-sans font-semibold">No articles matched your search</span>
            <span className="block text-xs opacity-60 mt-1">Try resetting the tag filters or using different words.</span>
            <button
              onClick={() => { setSelectedTag('All'); setSearchQuery(''); }}
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

      {/* Full-screen Reading Modal Overlay */}
      {activePost && (
        <div className={`fixed inset-0 z-50 overflow-y-auto backdrop-blur-md flex justify-center items-start p-4 sm:p-6 lg:p-8 animate-fade-in ${
          designMode === 'swiss' ? 'bg-zinc-900/60' : 'bg-black/85'
        }`} id="article-modal">
          
          <div className={`w-full max-w-4xl shadow-2xl relative overflow-hidden mt-8 mb-8 rounded-2xl border ${
            designMode === 'swiss'
              ? 'bg-[#FAF9F6] border-zinc-300 text-zinc-900'
              : designMode === 'terminal'
              ? 'bg-[#040406] border-emerald-900 text-emerald-400'
              : designMode === 'tokyo'
              ? 'bg-[#0b0813] border-indigo-950 text-indigo-100'
              : 'bg-slate-900 border border-slate-850 text-slate-100'
          }`}>
            
            {/* Modal Title bar */}
            <div className={`sticky top-0 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between z-10 ${
              designMode === 'swiss'
                ? 'bg-white/90 border-zinc-200'
                : designMode === 'terminal'
                ? 'bg-[#040406]/95 border-emerald-950'
                : designMode === 'tokyo'
                ? 'bg-[#0b0813]/95 border-indigo-950'
                : 'bg-slate-900/90 border-slate-800'
            }`}>
              <div className="flex items-center gap-3">
                <span className={`p-1.5 rounded ${
                  designMode === 'swiss' ? 'bg-rose-50 text-rose-700' : 'bg-current/10'
                }`}>
                  <BookOpen className="w-4.5 h-4.5" />
                </span>
                <span className="text-xs opacity-60 font-mono hidden sm:inline">Now Reading Technical Guide</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleShare(activePost, e)}
                  className="p-1.5 rounded-lg hover:bg-current/10 opacity-70 hover:opacity-100 transition-all cursor-pointer"
                  title="Share Article Link"
                >
                  <Share2 className="w-4.5 h-4.5" />
                </button>
                <button
                  id="close-modal-btn"
                  onClick={() => setActivePost(null)}
                  className="p-1.5 rounded-lg hover:bg-rose-500/10 opacity-70 hover:opacity-100 hover:text-rose-400 transition-all cursor-pointer"
                  title="Close Article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Content Area */}
            <div className="p-6 sm:p-10 lg:p-12 space-y-8 overflow-y-auto max-h-[80vh]">
              
              {/* Article Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono opacity-60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-current" />
                    {activePost.date}
                  </span>
                  <span className="opacity-30">|</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-current" />
                    {activePost.readTime}
                  </span>
                  <span className="opacity-30">|</span>
                  <button className="flex items-center gap-1 hover:opacity-80" onClick={(e) => handleLike(activePost.slug, e)}>
                    <ThumbsUp className="w-4 h-4" />
                    <span>{likes[activePost.slug] || 0} Likes</span>
                  </button>
                </div>

                <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${
                  designMode === 'swiss' ? 'font-serif text-zinc-900' : 'text-current'
                }`}>
                  {activePost.title}
                </h1>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activePost.tags.map(tag => (
                    <span key={tag} className={styles.badge}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sub-header Summary Quote */}
              <div className={`p-5 border-l-4 rounded-r-xl text-sm italic leading-relaxed ${
                designMode === 'swiss'
                  ? 'bg-zinc-100 border-rose-500 text-zinc-700'
                  : 'bg-black/40 border-amber-500 text-current/90'
              }`}>
                {activePost.summary}
              </div>

              {/* Article Rich Markdown-Style Body */}
              <div className={`max-w-none text-sm sm:text-base leading-relaxed space-y-6 ${
                designMode === 'swiss' ? 'text-zinc-800' : 'text-current/90'
              }`}>
                
                {activePost.content.split('\n\n').map((paragraph, pIdx) => {
                  // Check if it's a heading
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={pIdx} className={`text-xl sm:text-2xl font-bold tracking-tight pt-6 pb-2 border-b flex items-center gap-2 ${
                        designMode === 'swiss' ? 'font-serif text-zinc-900 border-zinc-200' : 'border-current/10 text-current'
                      }`}>
                        <CornerDownRight className={`w-5 h-5 ${getIconColor()}`} />
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className={`text-base sm:text-lg font-bold tracking-tight pt-4 pb-1 ${
                        designMode === 'swiss' ? 'font-serif text-zinc-900' : 'text-current'
                      }`}>
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }

                  // Check if it's a code block
                  if (paragraph.includes('```')) {
                    const lines = paragraph.split('\n');
                    const lang = lines[0].replace('```', '') || 'code';
                    const codeContent = lines.slice(1, -1).join('\n');
                    return (
                      <div key={pIdx} className={`rounded-xl overflow-hidden font-mono text-xs my-4 shadow-inner border ${
                        designMode === 'swiss'
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                          : 'bg-black border-current/10 text-current'
                      }`}>
                        <div className={`px-4 py-2 border-b text-[10px] flex justify-between select-none ${
                          designMode === 'swiss' ? 'bg-zinc-950 border-zinc-850 text-zinc-500' : 'bg-black/80 border-current/10 text-current/50'
                        }`}>
                          <span>{lang.toUpperCase()} SYSTEM CODE</span>
                          <span className={`${getIconColor()} font-bold`}>•</span>
                        </div>
                        <pre className="p-4 overflow-x-auto leading-relaxed font-mono">
                          <code>{codeContent}</code>
                        </pre>
                      </div>
                    );
                  }

                  // Check if it's a list
                  if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                    const listItems = paragraph.split('\n');
                    return (
                      <ul key={pIdx} className={`space-y-2 pl-6 my-4 list-disc ${
                        designMode === 'swiss' ? 'marker:text-rose-600' : 'marker:text-emerald-400'
                      }`}>
                        {listItems.map((item, iIdx) => {
                          const cleanedItem = item.replace(/^-\s+|^1\.\s+/, '');
                          
                          // Check for bold terms in list item
                          if (cleanedItem.includes('**')) {
                            const parts = cleanedItem.split('**');
                            return (
                              <li key={iIdx} className="text-sm sm:text-base leading-relaxed">
                                <strong>{parts[1]}</strong>{parts[2]}
                              </li>
                            );
                          }
                          
                          return (
                            <li key={iIdx} className="text-sm sm:text-base leading-relaxed">
                              {cleanedItem}
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }

                  // Normal paragraph
                  return (
                    <p key={pIdx} className="leading-relaxed text-sm sm:text-base">
                      {paragraph.split('**').map((chunk, cIdx) => {
                        if (cIdx % 2 === 1) {
                          return <strong key={cIdx} className="font-semibold text-current">{chunk}</strong>;
                        }
                        return chunk;
                      })}
                    </p>
                  );
                })}

              </div>

              {/* Back to top footer */}
              <div className={`pt-8 border-t flex items-center justify-between text-xs font-mono ${
                designMode === 'swiss' ? 'border-zinc-200 text-zinc-500' : 'border-current/10 text-current/60'
              }`}>
                <span>Thank you for reading.</span>
                <button
                  onClick={() => {
                    const container = document.querySelector('#article-modal > div > div:nth-child(2)');
                    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`font-bold transition-all cursor-pointer ${
                    designMode === 'swiss' ? 'text-rose-600 hover:text-rose-700' : 'text-emerald-400 hover:text-emerald-300'
                  }`}
                >
                  ↑ Back to top
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
