'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Layers,
  RotateCw,
  Sliders,
  Eye,
  MousePointer,
  Maximize2,
  Box,
} from 'lucide-react';
import * as THREE from 'three';

export default function Playground3D() {
  const [activeTab, setActiveTab] = useState<'3d-viewer' | 'micro' | 'parallax' | 'kinetic'>('3d-viewer');

  // 3D Product Viewer state
  const canvasRef = useRef<HTMLDivElement>(null);
  const [materialType, setMaterialType] = useState<'glossy' | 'metallic' | 'wireframe'>('glossy');
  const [modelColor, setModelColor] = useState('#2563EB');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);

  // Parallax Demo State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Magnetic button state
  const [magPos, setMagPos] = useState({ x: 0, y: 0 });

  // 3D Interactive Model Canvas
  useEffect(() => {
    if (activeTab !== '3d-viewer' || !canvasRef.current) return;

    const container = canvasRef.current;
    const width = container.clientWidth;
    const height = 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.5 / zoomLevel;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // TorusKnot geometry (sleek modern 3D product emblem)
    const geometry = new THREE.TorusKnotGeometry(1, 0.32, 100, 16);
    let mat: THREE.Material;

    const colorHex = parseInt(modelColor.replace('#', '0x'));

    if (materialType === 'metallic') {
      mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.95,
        roughness: 0.15,
      });
    } else if (materialType === 'wireframe') {
      mat = new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true,
      });
    } else {
      mat = new THREE.MeshPhysicalMaterial({
        color: colorHex,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      });
    }

    const mesh = new THREE.Mesh(geometry, mat);
    scene.add(mesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x84cc16, 2, 10);
    rimLight.position.set(-4, -4, 2);
    scene.add(rimLight);

    let animationId: number;

    const animate = () => {
      if (autoRotate) {
        mesh.rotation.y += 0.012;
        mesh.rotation.x += 0.006;
      }
      camera.position.z = 4.5 / zoomLevel;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      mat.dispose();
    };
  }, [activeTab, materialType, modelColor, zoomLevel, autoRotate]);

  return (
    <section id="playground" style={{ padding: '110px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} color="var(--primary)" />
            <span>Interactive Laboratory</span>
          </div>
          <h2 className="section-title">
            Animation &amp; 3D Playground
          </h2>
          <p className="section-subtitle">
            We engineer immersive interactions that make visitors pause, explore, and remember your company. Test our four core motion disciplines below.
          </p>
        </div>

        {/* Demo Switcher Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: '3d-viewer', label: '1. Interactive 3D Object Viewer' },
            { id: 'micro', label: '2. Tactile Micro-Interactions' },
            { id: 'parallax', label: '3. Parallax Depth Layers' },
            { id: 'kinetic', label: '4. Kinetic Typography' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 22px',
                borderRadius: 'var(--radius-full)',
                border: activeTab === tab.id ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                background: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-surface)',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeTab === tab.id ? 'var(--shadow-glow)' : 'none',
              }}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* DEMO 1: 3D OBJECT VIEWER */}
        {activeTab === '3d-viewer' && (
          <div
            className="glass-card"
            style={{
              padding: '40px',
              maxWidth: '920px',
              margin: '0 auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  What it is: Real-time WebGL 3D asset renderer
                </span>
                <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                  Interactive Product Customizer
                </h4>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '6px 14px', borderRadius: '8px' }}>
                <strong>When to use:</strong> Luxury products, high-ticket SaaS, physical hardware, architectural showcases.
              </div>
            </div>

            {/* Canvas Container */}
            <div
              ref={canvasRef}
              style={{
                width: '100%',
                height: '340px',
                background: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.15) 0%, rgba(0,0,0,0.5) 80%)',
                borderRadius: '16px',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '24px',
              }}
            />

            {/* Real-time Controls Toolbar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                padding: '20px',
                background: 'var(--bg-surface)',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {/* Material Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Material Finish
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['glossy', 'metallic', 'wireframe'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMaterialType(m)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: materialType === m ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                        background: materialType === m ? 'rgba(37,99,235,0.2)' : 'transparent',
                        color: materialType === m ? '#FFFFFF' : 'var(--text-secondary)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Tinter */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Model Pigment
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['#2563EB', '#84CC16', '#7C3AED', '#EF4444', '#F8FAFC'].map((col) => (
                    <button
                      key={col}
                      onClick={() => setModelColor(col)}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: col,
                        border: modelColor === col ? '2px solid #FFFFFF' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Zoom & Rotation Controls */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Camera Zoom: {zoomLevel}x
                </label>
                <input
                  type="range"
                  min="0.7"
                  max="1.6"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-subtle)',
                    background: autoRotate ? 'rgba(132,204,22,0.15)' : 'transparent',
                    color: autoRotate ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <RotateCw size={14} />
                  <span>{autoRotate ? 'Auto-Rotate ON' : 'Paused'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DEMO 2: TACTILE MICRO-INTERACTIONS */}
        {activeTab === 'micro' && (
          <div
            className="glass-card"
            style={{
              padding: '40px',
              maxWidth: '920px',
              margin: '0 auto',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                What it is: Magnetic button physics and responsive spring states
              </span>
              <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                Magnetic Physics &amp; Tactile Feedback
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <strong>When to use:</strong> Primary conversion buttons, hero triggers, sticky navbars. Subtly pulls the user&apos;s pointer toward the action.
              </p>
            </div>

            <div
              style={{
                height: '300px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '16px',
                border: '1px dashed var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
                const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
                setMagPos({ x, y });
              }}
              onMouseLeave={() => setMagPos({ x: 0, y: 0 })}
            >
              <button
                className="btn-glow"
                style={{
                  transform: `translate3d(${magPos.x}px, ${magPos.y}px, 0)`,
                  transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: '20px 44px',
                  fontSize: '18px',
                }}
              >
                <span>Magnetic Attraction</span>
                <Sparkles size={20} />
              </button>
            </div>
          </div>
        )}

        {/* DEMO 3: PARALLAX DEPTH LAYERS */}
        {activeTab === 'parallax' && (
          <div
            className="glass-card"
            style={{
              padding: '40px',
              maxWidth: '920px',
              margin: '0 auto',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                What it is: 3-Layer 3D Tilt perspective illusion
              </span>
              <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                Multi-Planar Parallax Card
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <strong>When to use:</strong> Hero case studies, portfolio featurettes, high-impact testimonial spotlights.
              </p>
            </div>

            <div
              style={{
                perspective: '1000px',
                height: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
                const y = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                setTilt({ x, y });
              }}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            >
              <div
                style={{
                  width: '380px',
                  padding: '32px',
                  background: 'linear-gradient(135deg, #181C28 0%, #0F121A 100%)',
                  border: '1px solid rgba(37, 99, 235, 0.4)',
                  borderRadius: '20px',
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(37, 99, 235, 0.2)',
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.1s ease-out',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div style={{ transform: 'translateZ(30px)', fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Floating Layer 01
                </div>
                <h5 style={{ transform: 'translateZ(50px)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: '8px 0 12px 0' }}>
                  Simulated Depth
                </h5>
                <p style={{ transform: 'translateZ(40px)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Move your mouse across this card to experience multi-layer optical depth.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DEMO 4: KINETIC TYPOGRAPHY */}
        {activeTab === 'kinetic' && (
          <div
            className="glass-card"
            style={{
              padding: '40px',
              maxWidth: '920px',
              margin: '0 auto',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                What it is: Velocity-driven typography choreography
              </span>
              <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                Kinetic Expression &amp; Text Reveal
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <strong>When to use:</strong> Section transition banners, manifestos, agency mission statements.
              </p>
            </div>

            <div
              style={{
                padding: '40px 20px',
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '16px',
                border: '1px solid var(--border-subtle)',
                textAlign: 'center',
                overflow: 'hidden',
              }}
            >
              <div
                className="font-display gradient-accent"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 800,
                  letterSpacing: '-2px',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                }}
              >
                Ideas Become Digital Sensation.
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '14px' }}>
                Crafted with creativity. Built with capability.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

