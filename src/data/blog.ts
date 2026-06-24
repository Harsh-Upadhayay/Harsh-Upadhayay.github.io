import type { BlogPost } from '../types';

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    } else {
      data[key] = val.replace(/^["']|["']$/g, '');
    }
  }

  return { data, content: match[2] };
}

const rawFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const blogPosts: BlogPost[] = Object.values(rawFiles)
  .map((raw) => {
    const { data, content } = parseFrontmatter(raw);
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
