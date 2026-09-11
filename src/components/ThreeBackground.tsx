import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./ThreeBackground.css";
import { sounds } from "../utils/soundEffects";

export type VisualMode = "nebula" | "matrix" | "warp";

interface ThreeBackgroundProps {
  initialMode?: VisualMode;
  showControls?: boolean;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  initialMode = "nebula",
  showControls = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<VisualMode>(initialMode);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(false);
  const [themeVersion, setThemeVersion] = useState<number>(0);

  // Listen to live theme & mode changes to re-color 3D particles
  useEffect(() => {
    const handleThemeChange = () => {
      setThemeVersion((prev) => prev + 1);
    };
    window.addEventListener("portfolio-theme-change", handleThemeChange);
    return () => window.removeEventListener("portfolio-theme-change", handleThemeChange);
  }, []);

  // References for three.js lifecycle
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameIdRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  // Current active mode objects
  const modeObjectsRef = useRef<THREE.Object3D[]>([]);

  // Update theme colors dynamically from CSS variable
  const getThemeColor = () => {
    if (typeof window === "undefined") return new THREE.Color("#4f46e5");
    const style = getComputedStyle(document.documentElement);
    const gold = style.getPropertyValue("--gold").trim() || "#4f46e5";
    return new THREE.Color(gold);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 700;
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = "three-canvas";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Mouse movement tracking with damping
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) * 0.5;
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) * 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    // 5. Resize handler
    const onResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Re-build scene whenever visual mode changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clean up previous mode objects
    modeObjectsRef.current.forEach((obj) => {
      scene.remove(obj);
      if (obj instanceof THREE.Points) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      } else if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
    modeObjectsRef.current = [];

    const primaryColor = getThemeColor();
    const secondaryColor = new THREE.Color("#0ea5e9");
    const ambientColor = new THREE.Color("#8b5cf6");

    if (mode === "nebula") {
      // 🌟 MODE 1: Cosmic Nebula Vortex
      const particleCount = 1800;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const radius = THREE.MathUtils.randFloat(80, 900);
        const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
        const phi = THREE.MathUtils.randFloatSpread(Math.PI * 0.8);

        positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
        positions[i * 3 + 1] = radius * Math.sin(phi);
        positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

        // Gradient coloring
        const lerpFactor = Math.random();
        const col = primaryColor.clone().lerp(lerpFactor > 0.5 ? secondaryColor : ambientColor, lerpFactor);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;

        scales[i] = Math.random() * 3 + 1;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Particle texture via canvas
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.3, "rgba(232,201,138,0.8)");
        grad.addColorStop(0.7, "rgba(196,163,105,0.2)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      const texture = new THREE.CanvasTexture(canvas);

      const material = new THREE.PointsMaterial({
        size: 5,
        map: texture,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      modeObjectsRef.current.push(particles);

      // Inner glowing core ring
      const ringGeo = new THREE.RingGeometry(180, 184, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: primaryColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
        wireframe: true,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.5;
      scene.add(ringMesh);
      modeObjectsRef.current.push(ringMesh);

    } else if (mode === "matrix") {
      // ⚡ MODE 2: Undulating Cyber 3D Wavefield Grid
      const cols = 50;
      const rows = 50;
      const count = cols * rows;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      let idx = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          positions[idx * 3] = (ix - cols / 2) * 35;
          positions[idx * 3 + 1] = 0;
          positions[idx * 3 + 2] = (iy - rows / 2) * 35 - 100;

          const col = primaryColor.clone();
          colors[idx * 3] = col.r;
          colors[idx * 3 + 1] = col.g;
          colors[idx * 3 + 2] = col.b;
          idx++;
        }
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 3.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });

      const waveGrid = new THREE.Points(geometry, material);
      waveGrid.position.y = -220;
      waveGrid.rotation.x = 0.55;
      scene.add(waveGrid);
      modeObjectsRef.current.push(waveGrid);

    } else if (mode === "warp") {
      // 🚀 MODE 3: Cinematic Warp Drive Tunnel
      const starCount = 2000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const velocities = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 1600;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
        positions[i * 3 + 2] = Math.random() * 1600;
        velocities[i] = Math.random() * 12 + 8;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      (geometry as unknown as { velocities: Float32Array }).velocities = velocities;

      const material = new THREE.PointsMaterial({
        color: primaryColor,
        size: 3.5,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const warpStars = new THREE.Points(geometry, material);
      scene.add(warpStars);
      modeObjectsRef.current.push(warpStars);
    }
  }, [mode]);

  // Main animation render loop
  useEffect(() => {
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isPlaying) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (cameraRef.current) {
        cameraRef.current.position.x = mouseRef.current.x * 0.35;
        cameraRef.current.position.y = -mouseRef.current.y * 0.35;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Mode-specific animations
      if (mode === "nebula") {
        const particles = modeObjectsRef.current[0] as THREE.Points;
        const ring = modeObjectsRef.current[1] as THREE.Mesh;
        if (particles) {
          particles.rotation.y = elapsedTime * 0.04;
          particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;
        }
        if (ring) {
          ring.rotation.z = -elapsedTime * 0.06;
        }
      } else if (mode === "matrix") {
        const waveGrid = modeObjectsRef.current[0] as THREE.Points;
        if (waveGrid) {
          const posAttr = waveGrid.geometry.attributes.position as THREE.BufferAttribute;
          const cols = 50;
          const rows = 50;
          let idx = 0;
          for (let ix = 0; ix < cols; ix++) {
            for (let iy = 0; iy < rows; iy++) {
              const u = ix / cols;
              const v = iy / rows;
              const y =
                Math.sin(u * 12 + elapsedTime * 2.2) * 25 +
                Math.cos(v * 10 + elapsedTime * 1.8) * 20;
              posAttr.setY(idx, y);
              idx++;
            }
          }
          posAttr.needsUpdate = true;
          waveGrid.rotation.y = Math.sin(elapsedTime * 0.15) * 0.08;
        }
      } else if (mode === "warp") {
        const warpStars = modeObjectsRef.current[0] as THREE.Points;
        if (warpStars) {
          const posAttr = warpStars.geometry.attributes.position as THREE.BufferAttribute;
          const count = posAttr.count;
          for (let i = 0; i < count; i++) {
            let z = posAttr.getZ(i);
            z += 8 + delta * 200;
            if (z > 700) {
              z = -900;
              posAttr.setX(i, (Math.random() - 0.5) * 1600);
              posAttr.setY(i, (Math.random() - 0.5) * 1600);
            }
            posAttr.setZ(i, z);
          }
          posAttr.needsUpdate = true;
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [mode, isPlaying, themeVersion]);

  const handleModeSelect = (newMode: VisualMode) => {
    sounds.playClick();
    setMode(newMode);
  };

  return (
    <div className="three-bg-container" ref={containerRef}>
      {/* ── Cinematic Video Overlays ── */}
      <div className="video-scanlines" />
      <div className="video-vignette" />
      <div className="video-ambient-glow" />
      <div className="video-radar-sweep" />

      {/* ── Visualizer Controls Floating Widget ── */}
      {showControls && (
        <div className={`vfx-controller ${isControlsOpen ? "vfx-open" : ""}`}>
          <button
            className="vfx-toggle-btn"
            onClick={() => {
              sounds.playClick();
              setIsControlsOpen(!isControlsOpen);
            }}
            title="3D Visualizer Settings"
          >
            <span className="vfx-pulse-dot" />
            <span className="vfx-label">3D Engine</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="14"
              height="14"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>

          {isControlsOpen && (
            <div className="vfx-drawer">
              <div className="vfx-drawer-header">
                <span>3D Visual Mode</span>
                <button
                  className="vfx-pause-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? "Pause 3D Engine" : "Resume 3D Engine"}
                >
                  {isPlaying ? "⏸ Pause" : "▶ Resume"}
                </button>
              </div>

              <div className="vfx-mode-options">
                <button
                  className={`vfx-mode-btn ${mode === "nebula" ? "active" : ""}`}
                  onClick={() => handleModeSelect("nebula")}
                >
                  <span className="vfx-icon">🌌</span>
                  <div>
                    <strong>Cosmic Nebula</strong>
                    <small>Orbital 3D particle dust</small>
                  </div>
                </button>

                <button
                  className={`vfx-mode-btn ${mode === "matrix" ? "active" : ""}`}
                  onClick={() => handleModeSelect("matrix")}
                >
                  <span className="vfx-icon">⚡</span>
                  <div>
                    <strong>Cyber Matrix</strong>
                    <small>Undulating wave grid</small>
                  </div>
                </button>

                <button
                  className={`vfx-mode-btn ${mode === "warp" ? "active" : ""}`}
                  onClick={() => handleModeSelect("warp")}
                >
                  <span className="vfx-icon">🚀</span>
                  <div>
                    <strong>Warp Drive</strong>
                    <small>Speed-of-light tunnel</small>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThreeBackground;
