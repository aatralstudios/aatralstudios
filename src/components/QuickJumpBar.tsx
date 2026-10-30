'use client';

import React from 'react';
import {
  Code2,
  Sparkles,
  Palette,
  Compass,
  Layers,
  Box,
  Clock,
  MessageSquare,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface JumpTarget {
  id: string;
  label: string;
  icon: React.ElementType;
  isAccent?: boolean;
}

const jumpTargets: JumpTarget[] = [
  { id: 'services', label: 'Services', icon: Code2 },
  { id: 'principles', label: 'Design Principles', icon: Compass },
  { id: 'color-lab', label: 'Colour Theory Lab', icon: Palette },
  { id: 'funnel', label: 'Funnel Architecture', icon: Layers },
  { id: 'playground', label: '3D & Motion Lab', icon: Box },
  { id: 'work', label: 'Selected Work', icon: Sparkles },
  { id: 'process', label: '6-Stage Process', icon: Clock },
  { id: 'testimonials', label: 'Client Stories', icon: MessageSquare },
  { id: 'blog', label: 'Design & Tech Blog', icon: BookOpen },
  { id: 'contact', label: 'Start a Project', icon: ArrowRight, isAccent: true },
];

export default function QuickJumpBar() {
  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      const navOffset = 84;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1120px',
        margin: '0 auto 28px auto',
        padding: '0 8px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '8px',
          padding: '0 6px',
        }}
      >
        <span
          style={{
            fontSize: '11.5px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--primary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 8px rgba(217, 119, 70, 0.4)',
            }}
          />
          Direct Section Jumpers (Zero Scroll Required)
        </span>
        <span
          style={{
            fontSize: '11.5px',
            color: 'var(--text-muted)',
            fontWeight: 500,
          }}
          className="desktop-nav"
        >
          Click to glide directly to any section ↓
        </span>
      </div>

      <nav
        className="top-jump-bar"
        aria-label="Direct homepage navigation jump buttons"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          overflowX: 'auto',
          padding: '8px 10px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(46, 90, 68, 0.22)',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 8px 24px -4px rgba(46, 90, 68, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02)',
        }}
      >
        {jumpTargets.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleJump(e, item.id)}
              className={`top-jump-btn ${item.isAccent ? 'accent-jump' : ''}`}
              title={`Jump directly to ${item.label}`}
            >
              <Icon size={14} style={{ flexShrink: 0 }} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

