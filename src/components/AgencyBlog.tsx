'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Heart,
  Shield,
  Sparkles,
  Tag,
} from 'lucide-react';

interface BlogPost {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  authorRole: string;
  date: string;
  tags: string[];
}

const articles: BlogPost[] = [
  {
    id: 'post-1',
    category: 'Human-Centered Design',
    categoryColor: '#2E5A44',
    title: 'The Art of Compassionate UX: Building Digital Journeys that Foster Deep Trust',
    excerpt: 'Web design is not merely decoration; it is emotional empathy in code. How clean visual hierarchy, calming white space, and thoughtful typography comfort anxious visitors.',
    readTime: '5 min read',
    author: 'Kavitha Ramachandran',
    authorRole: 'Design Director',
    date: 'April 2026',
    tags: ['UX Psychology', 'Empathy', 'Visual Hierarchy'],
  },
  {
    id: 'post-2',
    category: 'Full-Stack Engineering',
    categoryColor: '#3E7A5D',
    title: 'Sub-Second Performance & The Human Psychology of Immediate Web Feedback',
    excerpt: 'Why millisecond latencies destroy visitor trust. How we architect Next.js 15, edge caching, and Zero-JS islands to ensure 60fps responsiveness across mobile networks.',
    readTime: '4 min read',
    author: 'Sundar Baskar',
    authorRole: 'Lead Systems Architect',
    date: 'March 2026',
    tags: ['Next.js 15', 'Performance', 'Edge CDN'],
  },
  {
    id: 'post-3',
    category: 'Design Systems',
    categoryColor: '#D97746',
    title: 'Accessible Design Systems: Why Inclusive Web Craft Compounds Brand Authority',
    excerpt: 'Adhering to strict WCAG AA contrast, clear focus states, and scalable type tokens guarantees that every customer navigates your business with confidence.',
    readTime: '6 min read',
    author: 'Arunmozhi Varman',
    authorRole: 'Creative Technologist',
    date: 'February 2026',
    tags: ['WCAG AA', 'Design Tokens', 'Typography'],
  },
];

export default function AgencyBlog() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter((a) => a.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section
      id="blog"
      style={{
        padding: 'clamp(70px, 9vw, 110px) 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Standardized Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <BookOpen size={14} />
            <span>Digital Craft Journal &amp; Insights</span>
          </div>

          <h2 className="section-title">
            Perspectives on <span className="gradient-accent">Design &amp; Engineering</span>
          </h2>

          <p className="section-subtitle">
            Thoughtful articles on conversion psychology, accessible web architecture, performance engineering, and trustworthy brand building.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          {['All Articles', 'Human-Centered Design', 'Full-Stack Engineering', 'Design Systems'].map((cat) => {
            const key = cat === 'All Articles' ? 'all' : cat;
            const isSelected = activeCategory === key;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(key)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--primary)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(46, 90, 68, 0.2)' : '0 1px 3px rgba(0,0,0,0.02)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Article Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px',
                borderRadius: 'var(--radius-lg)',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                {/* Category Pill & Read Time */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      color: article.categoryColor,
                      background: 'var(--primary-soft)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(46, 90, 68, 0.15)',
                    }}
                  >
                    {article.category}
                  </span>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    <Clock size={13} />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.35,
                    marginBottom: '12px',
                  }}
                >
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p
                  style={{
                    fontSize: '14.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  {article.excerpt}
                </p>
              </div>

              {/* Author & Footer */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '18px',
                  }}
                >
                  {article.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '11px',
                        padding: '3px 8px',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-muted)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--primary-soft)',
                        border: '1px solid rgba(46, 90, 68, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        fontSize: '13px',
                        fontWeight: 700,
                      }}
                    >
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {article.author}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {article.authorRole}
                      </div>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--primary)',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

