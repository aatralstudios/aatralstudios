'use client';

import React, { useState, useEffect } from 'react';
import { playMechanicalKeyClick } from '@/utils/audio';

interface KeyConfig {
  key: string;
  label: string;
  action?: string;
  shortcutFor?: string;
  targetId?: string;
  accent?: boolean;
  width?: string;
}

const keyboardRows: KeyConfig[][] = [
  // Row 1 (Numbers / Esc)
  [
    { key: 'ESC', label: 'ESC', shortcutFor: 'Reset / Top', targetId: '#', width: '48px', accent: true },
    { key: '1', label: '1' },
    { key: '2', label: '2' },
    { key: '3', label: '3' },
    { key: '4', label: '4' },
    { key: '5', label: '5' },
    { key: '6', label: '6' },
    { key: '7', label: '7' },
    { key: '8', label: '8' },
    { key: '9', label: '9' },
    { key: '0', label: '0' },
    { key: 'BKSP', label: '⌫', width: '56px' },
  ],
  // Row 2 (Q W E R T Y) -> W is mapped!
  [
    { key: 'TAB', label: 'TAB', width: '52px' },
    { key: 'Q', label: 'Q' },
    { key: 'W', label: 'W', shortcutFor: 'Work / Portfolio', targetId: '#portfolio', accent: true },
    { key: 'E', label: 'E', shortcutFor: 'Estimator', targetId: '#estimator', accent: true },
    { key: 'R', label: 'R' },
    { key: 'T', label: 'T', shortcutFor: 'Tech Stack', targetId: '#tech-stack' },
    { key: 'Y', label: 'Y' },
    { key: 'U', label: 'U' },
    { key: 'I', label: 'I' },
    { key: 'O', label: 'O' },
    { key: 'P', label: 'P', shortcutFor: 'Process', targetId: '#process' },
  ],
  // Row 3 (A S D F G H J K L) -> A and S are mapped!
  [
    { key: 'CAPS', label: 'CAPS', width: '58px' },
    { key: 'A', label: 'A', shortcutFor: 'About Studio', targetId: '#brand-story', accent: true },
    { key: 'S', label: 'S', shortcutFor: 'Services', targetId: '#services', accent: true },
    { key: 'D', label: 'D' },
    { key: 'F', label: 'F' },
    { key: 'G', label: 'G' },
    { key: 'H', label: 'H' },
    { key: 'J', label: 'J' },
    { key: 'K', label: 'K' },
    { key: 'L', label: 'L' },
    { key: 'ENTER', label: 'RETURN', width: '64px', accent: true, targetId: '#enquiry-section', shortcutFor: 'Start Project' },
  ],
  // Row 4 (Z X C V B N M) -> C is mapped!
  [
    { key: 'SHIFT', label: 'SHIFT', width: '70px' },
    { key: 'Z', label: 'Z' },
    { key: 'X', label: 'X' },
    { key: 'C', label: 'C', shortcutFor: 'Contact / Enquiry', targetId: '#enquiry-section', accent: true },
    { key: 'V', label: 'V' },
    { key: 'B', label: 'B' },
    { key: 'N', label: 'N' },
    { key: 'M', label: 'M' },
    { key: ',', label: ',' },
    { key: '.', label: '.' },
    { key: 'SHIFT_R', label: 'SHIFT', width: '60px' },
  ],
  // Row 5 (Space bar)
  [
    { key: 'CTRL', label: 'CTRL', width: '46px' },
    { key: 'ALT', label: 'ALT', width: '46px' },
    { key: 'SPACE', label: 'SPACEBAR — EXPLORE DIGITAL LAB', width: '280px', targetId: '#portfolio', shortcutFor: 'Explore Lab' },
    { key: 'ALT_R', label: 'ALT', width: '46px' },
    { key: 'CTRL_R', label: 'CTRL', width: '46px' },
  ],
];

export default function MechanicalKeyboard() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string>('Press [W] for Work, [S] for Services, [A] for About, [C] for Contact');

  const triggerKeyAction = (keyConfig: KeyConfig) => {
    playMechanicalKeyClick(keyConfig.accent ? 1.2 : 1.0);
    setActiveKey(keyConfig.key);

    if (keyConfig.shortcutFor) {
      setLastAction(`Jumped to ${keyConfig.shortcutFor}`);
    }

    if (keyConfig.targetId) {
      if (keyConfig.targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(keyConfig.targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    setTimeout(() => {
      setActiveKey(null);
    }, 250);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      const pressedKey = e.key.toUpperCase();

      let matchedConfig: KeyConfig | undefined;

      if (pressedKey === 'ESCAPE') {
        matchedConfig = { key: 'ESC', label: 'ESC', targetId: '#', shortcutFor: 'Top of Lab' };
      } else if (pressedKey === ' ') {
        matchedConfig = { key: 'SPACE', label: 'SPACEBAR', targetId: '#portfolio', shortcutFor: 'Explore Lab' };
      } else {
        for (const row of keyboardRows) {
          const found = row.find((k) => k.key === pressedKey);
          if (found) {
            matchedConfig = found;
            break;
          }
        }
      }

      if (matchedConfig) {
        triggerKeyAction(matchedConfig);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '820px',
        margin: '0 auto',
      }}
    >
      {/* Keyboard Status Display Screen */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          background: '#F1F5F9',
          border: '1px solid #CBD5E1',
          borderBottom: 'none',
          borderRadius: '12px 12px 0 0',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: '#475569',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#84CC16' }} />
          <span style={{ fontWeight: 600 }}>AATRAL-KB60 // HARDWARE FIRMWARE</span>
        </div>
        <div style={{ color: '#2563EB', fontWeight: 700 }}>{lastAction}</div>
      </div>

      {/* Physical Mechanical Keyboard Chassis */}
      <div
        style={{
          width: '100%',
          padding: '18px 16px',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
          border: '1px solid #CBD5E1',
          borderRadius: '0 0 16px 16px',
          boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: '600px',
          }}
        >
          {keyboardRows.map((row, rIdx) => (
            <div
              key={rIdx}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              {row.map((k) => {
                const isPressed = activeKey === k.key;

                return (
                  <button
                    key={k.key}
                    type="button"
                    onClick={() => triggerKeyAction(k)}
                    className="keycap-btn"
                    title={k.shortcutFor ? `[${k.key}] ${k.shortcutFor}` : k.label}
                    style={{
                      height: '42px',
                      width: k.width || '44px',
                      padding: '2px 4px',
                      background: isPressed
                        ? '#1D4ED8'
                        : k.accent
                        ? 'linear-gradient(180deg, #3B82F6 0%, #2563EB 100%)'
                        : 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%)',
                      borderColor: isPressed
                        ? '#1D4ED8'
                        : k.accent
                        ? '#1D4ED8'
                        : '#CBD5E1',
                      borderBottomColor: isPressed
                        ? '#1E40AF'
                        : k.accent
                        ? '#1E40AF'
                        : '#94A3B8',
                      color: isPressed ? '#FFFFFF' : k.accent ? '#FFFFFF' : '#0F172A',
                    }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 700, lineHeight: 1 }}>{k.label}</span>
                    {k.shortcutFor && (
                      <span
                        style={{
                          fontSize: '8px',
                          color: k.accent ? '#F7FEE7' : '#2563EB',
                          fontWeight: 700,
                          marginTop: '2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%',
                        }}
                      >
                        {k.key}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Shortcut Quick Navigation Legend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginTop: '14px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)',
          color: '#64748B',
        }}
      >
        <span style={{ color: '#94A3B8', fontWeight: 600 }}>KEYBOARD SHORTCUTS:</span>
        <button
          onClick={() => triggerKeyAction({ key: 'W', label: 'W', targetId: '#portfolio', shortcutFor: 'Work' })}
          style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 700 }}
        >
          [W] Work
        </button>
        <button
          onClick={() => triggerKeyAction({ key: 'S', label: 'S', targetId: '#services', shortcutFor: 'Services' })}
          style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 700 }}
        >
          [S] Services
        </button>
        <button
          onClick={() => triggerKeyAction({ key: 'A', label: 'A', targetId: '#brand-story', shortcutFor: 'About' })}
          style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 700 }}
        >
          [A] About
        </button>
        <button
          onClick={() => triggerKeyAction({ key: 'E', label: 'E', targetId: '#estimator', shortcutFor: 'Estimator' })}
          style={{ background: 'none', border: 'none', color: '#84CC16', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 700 }}
        >
          [E] Estimator
        </button>
        <button
          onClick={() => triggerKeyAction({ key: 'C', label: 'C', targetId: '#enquiry-section', shortcutFor: 'Contact' })}
          style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 700 }}
        >
          [C] Contact
        </button>
      </div>
    </div>
  );
}
