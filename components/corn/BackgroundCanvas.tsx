'use client';

import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  sectionIndex: number;
  activeWeather: string; // 'none', 'wind', 'drought', 'disease', 'soil', 'population'
  cursorPos: { x: number; y: number };
}

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  alpha: number;
  angle: number;
  angleSpeed: number;
}

export default function BackgroundCanvas({ sectionIndex, activeWeather, cursorPos }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ sectionIndex, activeWeather, cursorPos });

  // Update refs to avoid re-triggering effect
  useEffect(() => {
    stateRef.current = { sectionIndex, activeWeather, cursorPos };
  }, [sectionIndex, activeWeather, cursorPos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track actual dimensions
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const particleCount = 280;
    const focalLength = 350;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: Math.random() * 800 - 400,
        baseX: 0,
        baseY: 0,
        baseZ: 0,
        color: '#12eefc',
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 0.5 - 0.25,
        speedZ: Math.random() * 1 - 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: Math.random() * 0.02 - 0.01,
      });
    }

    let dnaRot = 0;
    let gridOffset = 0;
    let windOffset = 0;
    let kernelRot = 0;
    let pulseVal = 0;

    // Render loop
    const render = () => {
      ctx.fillStyle = 'rgba(0, 8, 4, 0.12)'; // Trails effect
      ctx.fillRect(0, 0, width, height);

      const state = stateRef.current;
      const targetSec = state.sectionIndex;
      const weather = state.activeWeather;
      const mouseX = state.cursorPos.x - width / 2;
      const mouseY = state.cursorPos.y - height / 2;

      // Global scanline
      gridOffset += 0.5;
      windOffset += 8;
      dnaRot += 0.008;
      kernelRot += 0.006;
      pulseVal += 0.03;

      // Draw subtle digital background grid lines
      ctx.strokeStyle = 'rgba(18, 238, 252, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = (gridOffset % gridSize); y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render weather alerts / background overlays
      if (targetSec === 4 && weather === 'wind') {
        // Draw wind vectors
        ctx.strokeStyle = 'rgba(18, 238, 252, 0.05)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          const yPos = (height / 6) * (i + 1) + Math.sin(pulseVal + i) * 30;
          ctx.moveTo(0, yPos);
          for (let xPos = 0; xPos < width; xPos += 20) {
            ctx.lineTo(xPos, yPos + Math.sin((xPos + windOffset) * 0.008) * 25);
          }
          ctx.stroke();
        }
      } else if (targetSec === 4 && weather === 'drought') {
        // Heat waves
        ctx.fillStyle = 'rgba(255, 223, 122, 0.02)';
        for (let i = 0; i < 8; i++) {
          const w = width / 8;
          const hOffset = Math.sin(pulseVal + i) * 15;
          ctx.fillRect(i * w + hOffset, 0, w - 10, height);
        }
      }

      // Draw DNA strand linking lines for Section 1
      if (targetSec === 1) {
        ctx.strokeStyle = 'rgba(255, 223, 122, 0.1)';
        ctx.lineWidth = 1;
      }

      particles.forEach((p, idx) => {
        // 3D coordinate target configurations per page section
        switch (targetSec) {
          case 0: // Landing screen: random floating upward
            p.speedY = -0.5 - p.size * 0.1;
            p.x += p.speedX + (mouseX * 0.01 - p.x * 0.005);
            p.y += p.speedY;
            p.z += p.speedZ;
            p.color = '#12eefc';

            if (p.y < -height / 2) {
              p.y = height / 2;
              p.x = (Math.random() - 0.5) * width;
            }
            break;

          case 1: // DNA Helix (Orange / Golden glowing helix)
            const dnaIndex = idx % 2 === 0 ? 1 : -1;
            const helixAngle = (idx * 0.15) + dnaRot;
            const helixHeight = ((idx - particleCount / 2) * 4.5);
            
            p.baseX = Math.cos(helixAngle + (dnaIndex * Math.PI)) * 120;
            p.baseY = helixHeight;
            p.baseZ = Math.sin(helixAngle + (dnaIndex * Math.PI)) * 120;

            // Direct rotation tracking for mouse
            const rotatedX = p.baseX * Math.cos(mouseX * 0.002) - p.baseZ * Math.sin(mouseX * 0.002);
            const rotatedZ = p.baseX * Math.sin(mouseX * 0.002) + p.baseZ * Math.cos(mouseX * 0.002);
            const tiltedY = p.baseY + mouseY * 0.15;

            p.x += (rotatedX - p.x) * 0.1;
            p.y += (tiltedY - p.y) * 0.1;
            p.z += (rotatedZ - p.z) * 0.1;
            p.color = '#ffdf7a';

            // Connect matching DNA pairs
            if (dnaIndex === 1 && idx < particleCount - 1) {
              const pair = particles[idx + 1];
              const scale = focalLength / (focalLength + p.z);
              const pairScale = focalLength / (focalLength + pair.z);
              if (p.z > -focalLength && pair.z > -focalLength) {
                const px1 = p.x * scale + width / 2;
                const py1 = p.y * scale + height / 2;
                const px2 = pair.x * pairScale + width / 2;
                const py2 = pair.y * pairScale + height / 2;

                ctx.beginPath();
                ctx.moveTo(px1, py1);
                ctx.lineTo(px2, py2);
                ctx.stroke();
              }
            }
            break;

          case 2: // Grid matrix (Petabytes algorithm)
            const gridCols = 15;
            const c = idx % gridCols;
            const r = Math.floor(idx / gridCols);
            p.baseX = (c - gridCols / 2) * 75;
            p.baseY = 160 + Math.sin(pulseVal + idx * 0.3) * 15;
            p.baseZ = (r - 10) * 50;

            // Perspective tilt
            p.x += (p.baseX - p.x) * 0.08;
            p.y += (p.baseY + mouseY * 0.08 - p.y) * 0.08;
            p.z += (p.baseZ - p.z) * 0.08;
            p.color = '#39e557';
            break;

          case 3: // Microscope cell sweep
            const circleRadius = 160 + Math.sin(pulseVal + idx * 0.05) * 10;
            p.baseX = Math.cos(idx * 0.1 + pulseVal) * circleRadius;
            p.baseY = Math.sin(idx * 0.1 + pulseVal) * circleRadius;
            p.baseZ = Math.sin(idx * 0.05) * 40;

            p.x += (p.baseX - p.x) * 0.07;
            p.y += (p.baseY - p.y) * 0.07;
            p.z += (p.baseZ - p.z) * 0.07;
            p.color = '#12eefc';
            break;

          case 4: // Field conditions (Wind, drought, etc.)
            if (weather === 'wind') {
              p.x += 12 + p.size;
              p.y += Math.sin((p.x + windOffset) * 0.005) * 2;
              p.z += Math.random() * 2 - 1;
              p.color = '#12eefc';

              if (p.x > width / 2 + 100) {
                p.x = -width / 2 - 100;
                p.y = (Math.random() - 0.5) * height;
              }
            } else if (weather === 'drought') {
              p.x += Math.random() * 2 - 1;
              p.y -= 4 + Math.random() * 2;
              p.z += Math.random() * 2 - 1;
              p.color = '#ffdf7a';

              if (p.y < -height / 2) {
                p.y = height / 2;
                p.x = (Math.random() - 0.5) * width;
              }
            } else { // Normal drifting green field
              p.x += p.speedX + mouseX * 0.002;
              p.y += p.speedY + mouseY * 0.002;
              p.z += p.speedZ;
              p.color = '#39e557';

              if (Math.abs(p.x) > width) p.x = (Math.random() - 0.5) * width;
              if (Math.abs(p.y) > height) p.y = (Math.random() - 0.5) * height;
            }
            break;

          case 5: // US Corn Belt Map Plot Dots
            const mapRadius = 240;
            const lat = Math.sin(idx * 0.08) * mapRadius;
            const lon = Math.cos(idx * 0.12 + Math.sin(idx * 0.05) * 2) * mapRadius * 1.5;
            p.baseX = lon;
            p.baseY = lat + Math.sin(pulseVal + idx) * 4;
            p.baseZ = 0;

            p.x += (p.baseX - p.x) * 0.06;
            p.y += (p.baseY - p.y) * 0.06;
            p.z += (p.baseZ - p.z) * 0.06;
            p.color = idx % 10 === 0 ? '#12eefc' : '#2e5925';
            break;

          case 6: // Large rotating 3D kernel cluster (Golden/Yellow ellipsoid)
            const kAngle1 = idx * 0.2 + kernelRot;
            const kAngle2 = idx * 0.35 + kernelRot * 0.5;
            
            // Re-map particles into a tight kernel ear cluster shape
            const kRadX = 90 + Math.sin(idx * 0.5) * 10;
            const kRadY = 170 + Math.cos(idx * 0.2) * 15;
            const kRadZ = 90 + Math.sin(idx * 0.5) * 10;

            p.baseX = Math.cos(kAngle1) * Math.sin(kAngle2) * kRadX;
            p.baseY = Math.cos(kAngle2) * kRadY;
            p.baseZ = Math.sin(kAngle1) * Math.sin(kAngle2) * kRadZ;

            // Spin with mouse drag
            const rotKernelX = p.baseX * Math.cos(mouseX * 0.0035) - p.baseZ * Math.sin(mouseX * 0.0035);
            const rotKernelZ = p.baseX * Math.sin(mouseX * 0.0035) + p.baseZ * Math.cos(mouseX * 0.0035);

            p.x += (rotKernelX - p.x) * 0.08;
            p.y += (p.baseY + mouseY * 0.1 - p.y) * 0.08;
            p.z += (rotKernelZ - p.z) * 0.08;
            p.color = '#ffdf7a';
            break;

          default:
            break;
        }

        // Project to 2D
        if (p.z > -focalLength) {
          const scale = focalLength / (focalLength + p.z);
          const projX = p.x * scale + width / 2;
          const projY = p.y * scale + height / 2;

          // Make sizing relative to perspective scale
          const renderSize = Math.max(0.1, p.size * scale);
          
          if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * Math.min(1.0, scale);
            ctx.beginPath();
            ctx.arc(projX, projY, renderSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}
