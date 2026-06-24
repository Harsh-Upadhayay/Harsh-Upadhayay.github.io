import matter from 'gray-matter';
import type { BlogPost } from '../types';

const rawFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const blogPosts: BlogPost[] = Object.values(rawFiles)
  .map((raw) => {
    const { data, content } = matter(raw);
    return {
      title: data.title as string,
      slug: data.slug as string,
      tags: data.tags as string[],
      date: data.date as string,
      readTime: data.readTime as string,
      summary: data.summary as string,
      content: content.trim(),
    } satisfies BlogPost;
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
