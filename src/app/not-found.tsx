import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        background: 'var(--bg-primary)',
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '48px 32px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 20px 40px rgba(24, 35, 30, 0.08)',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--primary)',
            letterSpacing: '-2px',
            marginBottom: '16px',
            fontFamily: 'var(--font-outfit), sans-serif',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '12px',
            letterSpacing: '-0.5px',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          The page you are looking for doesn't exist or has been moved to another coordinate.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/"
            className="btn-glow"
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '50px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            <Home size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

