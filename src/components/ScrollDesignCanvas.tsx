'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ScrollDesignCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setWebglSupported(false);
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Master Group that travels on scroll
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Organic Design Ribbon / Möbius Form (The Visual Craft)
    const ribbonGeo = new THREE.TorusKnotGeometry(1.0, 0.28, 140, 32);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x2D5A43,
      emissive: 0x12241A,
      roughness: 0.2,
      metalness: 0.45,
      clearcoat: 0.95,
      clearcoatRoughness: 0.15,
      reflectivity: 0.8,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    masterGroup.add(ribbonMesh);

    // 2. Precision Geometric Wireframe Cage (The Grid & Architecture of Design)
    const wireframeGeo = new THREE.IcosahedronGeometry(1.75, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x2D5A43,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireframeLattice = new THREE.Mesh(wireframeGeo, wireframeMat);
    masterGroup.add(wireframeLattice);

    // 3. Primary Bezier Curve Ring with Terracotta Accent (Pen Tool / Vector Curves)
    const bezierRing1Geo = new THREE.TorusGeometry(1.9, 0.03, 16, 120);
    const bezierRing1Mat = new THREE.MeshStandardMaterial({
      color: 0xD97746,
      emissive: 0x9A481B,
      emissiveIntensity: 0.4,
      metalness: 0.85,
      roughness: 0.2,
    });
    const bezierRing1 = new THREE.Mesh(bezierRing1Geo, bezierRing1Mat);
    bezierRing1.rotation.x = Math.PI / 3;
    bezierRing1.rotation.y = Math.PI / 6;
    masterGroup.add(bezierRing1);

    // 4. Secondary Golden Ratio Orbital Ring
    const bezierRing2Geo = new THREE.TorusGeometry(1.45, 0.018, 16, 90);
    const bezierRing2Mat = new THREE.MeshStandardMaterial({
      color: 0xE5A855,
      emissive: 0x8C5E24,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.25,
    });
    const bezierRing2 = new THREE.Mesh(bezierRing2Geo, bezierRing2Mat);
    bezierRing2.rotation.x = -Math.PI / 4;
    bezierRing2.rotation.z = Math.PI / 5;
    masterGroup.add(bezierRing2);

    // 5. Precision Vector Anchor Nodes (Representing Design Points)
    const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xD97746,
      roughness: 0.1,
      metalness: 0.9,
    });

    const nodePositions = [
      [1.9, 0, 0],
      [-1.9, 0, 0],
      [0, 1.9, 0],
      [0, -1.9, 0],
    ];

    nodePositions.forEach(([x, y, z]) => {
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      bezierRing1.add(nodeMesh);
    });

    // 6. Delicate Ambient Stardust Particles
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 6;
      particlePos[i + 1] = (Math.random() - 0.5) * 5;
      particlePos[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD97746,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const terracottaLight = new THREE.PointLight(0xD97746, 3.2, 14);
    terracottaLight.position.set(-3.5, -2, 3);
    scene.add(terracottaLight);

    const sageLight = new THREE.PointLight(0x2D5A43, 2.4, 12);
    sageLight.position.set(3, 3, -2);
    scene.add(sageLight);

    // Dynamic Scroll & Mouse Tracking
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        targetScrollProgress = Math.min(1, Math.max(0, window.scrollY / docHeight));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth interpolation for scroll progress
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.06;

      const isMobile = window.innerWidth < 860;

      // Position along screen based on scroll depth:
      // Hero (0.0): Right side beside headline
      // Industries (0.33): Smoothly swings to left side behind cards
      // Process (0.66): Swings back to right side alongside steps
      // Contact (1.0): Gently centers near the project brief
      let targetX = 0;
      let targetY = 0;
      let targetScale = 1.0;

      if (!isMobile) {
        if (currentScrollProgress < 0.28) {
          // Hero section: sits securely on the right side (x = 2.05) so it never overlaps the left text column
          const t = currentScrollProgress / 0.28;
          targetX = 2.05 - t * 0.45;
          targetY = 0.05 - t * 0.2;
          targetScale = 1.15 - t * 0.1;
        } else if (currentScrollProgress < 0.62) {
          // Industries section: swings across to the left
          const t = (currentScrollProgress - 0.28) / (0.62 - 0.28);
          targetX = 1.3 - t * 2.8; // swings from 1.3 to -1.5
          targetY = -0.1 - Math.sin(t * Math.PI) * 0.25;
          targetScale = 1.05 - t * 0.1;
        } else if (currentScrollProgress < 0.88) {
          // Process section: swings back to the right
          const t = (currentScrollProgress - 0.62) / (0.88 - 0.62);
          targetX = -1.5 + t * 2.8; // swings from -1.5 to 1.3
          targetY = -0.1 + Math.sin(t * Math.PI) * 0.2;
          targetScale = 0.95 + t * 0.1;
        } else {
          // Contact section: shift into the right-hand background rather than dead-center behind the title text
          const t = (currentScrollProgress - 0.88) / (1.0 - 0.88);
          targetX = 1.3 + t * 0.4; // settles gracefully to x = 1.7 on the right
          targetY = -0.15 - t * 0.15;
          targetScale = 0.95;
        }
      } else {
        // Mobile layout: shifted to upper-right background and scaled down so it never obstructs or disturbs text
        if (currentScrollProgress < 0.22) {
          // Hero on mobile: sits in the upper-right corner as a delicate, unobtrusive accent
          targetX = 0.65;
          targetY = 0.50;
          targetScale = 0.52;
        } else {
          // Sections below hero on mobile: gently glides lower into the subtle background
          targetX = 0.50;
          targetY = -0.35;
          targetScale = 0.45;
        }
      }

      // Apply positions with smooth dampening
      masterGroup.position.x += (targetX - masterGroup.position.x) * 0.05;
      masterGroup.position.y += (targetY - masterGroup.position.y) * 0.05;

      const currentScale = masterGroup.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.05;
      masterGroup.scale.set(newScale, newScale, newScale);

      // Continuous rotation combined with scroll progress
      masterGroup.rotation.y = currentScrollProgress * Math.PI * 3.8 + time * 0.22 + targetMouseX;
      masterGroup.rotation.x = Math.sin(currentScrollProgress * Math.PI * 2) * 0.45 + targetMouseY;

      wireframeLattice.rotation.y = -currentScrollProgress * Math.PI * 2.2 - time * 0.15;
      wireframeLattice.rotation.z = time * 0.1;

      bezierRing1.rotation.z = currentScrollProgress * Math.PI * 4.5 + time * 0.35;
      bezierRing2.rotation.x = currentScrollProgress * Math.PI * 3.2 - time * 0.25;

      particles.rotation.y += 0.06 * delta;

      // Adjust opacity dynamically so text remains 100% accessible at all scroll depths
      if (container) {
        let targetOpacity = '0.30';
        if (isMobile) {
          // On mobile, keep opacity delicate so text is never disturbed
          targetOpacity = currentScrollProgress < 0.20 ? '0.12' : '0.06';
        } else {
          targetOpacity = currentScrollProgress > 0.82 ? '0.18' : '0.30';
        }
        if (container.style.opacity !== targetOpacity) {
          container.style.opacity = targetOpacity;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      ribbonGeo.dispose();
      ribbonMat.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      bezierRing1Geo.dispose();
      bezierRing1Mat.dispose();
      bezierRing2Geo.dispose();
      bezierRing2Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.32,
      }}
    />
  );
}

