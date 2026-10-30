'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
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
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. TorusKnot Sculpture (Ceramic Emerald & Sage finish)
    const knotGeometry = new THREE.TorusKnotGeometry(1.1, 0.3, 140, 32);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2D5A43,
      emissive: 0x12241A,
      roughness: 0.25,
      metalness: 0.4,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    masterGroup.add(knotMesh);

    // 2. Outer Orbital Halo Ring (Warm Terracotta)
    const ringGeo = new THREE.TorusGeometry(1.85, 0.035, 20, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xD97746,
      emissive: 0x9A481B,
      emissiveIntensity: 0.35,
      metalness: 0.8,
      roughness: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = Math.PI / 6;
    masterGroup.add(ringMesh);

    // 3. Delicate Accent Ring
    const innerRingGeo = new THREE.TorusGeometry(1.5, 0.015, 16, 80);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xE5A855,
      metalness: 0.7,
      roughness: 0.3,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 4;
    innerRing.rotation.z = Math.PI / 5;
    masterGroup.add(innerRing);

    // Subtle lighting
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const terracottaLight = new THREE.PointLight(0xD97746, 2.5, 12);
    terracottaLight.position.set(-3, -2, 3);
    scene.add(terracottaLight);

    const sageLight = new THREE.PointLight(0x2D5A43, 2.0, 10);
    sageLight.position.set(3, 3, -2);
    scene.add(sageLight);

    // Subtle mouse parallax
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotY = normX * 0.35;
      targetRotX = normY * 0.25;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Continuous organic rotation
      masterGroup.rotation.y += 0.28 * delta;
      ringMesh.rotation.z += 0.35 * delta;
      innerRing.rotation.x += 0.25 * delta;

      // Smoothly interpolate towards mouse
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      knotGeometry.dispose();
      knotMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
}
