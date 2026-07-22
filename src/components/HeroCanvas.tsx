"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { MOTION_OK } from "@/lib/motion";

/**
 * WebGL hero backdrop: a slow, domain-warped noise field tinted with the
 * accent color, gently displaced by the cursor. Deliberately dark and
 * low-contrast so it never competes with the headline.
 *
 * Guardrails:
 * - skipped entirely under reduced motion, on small screens, and if the
 *   WebGL context fails (the CSS gradient behind it is the fallback)
 * - pixel ratio capped at 2, low-power context requested
 * - render loop pauses when the hero is offscreen or the tab is hidden
 * - alpha output, so it composites over the page background in both themes
 */

const VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform float uDark;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 asp = vec2(uRes.x / max(uRes.y, 1.0), 1.0);
    vec2 p = vUv * asp;
    float t = uTime * 0.045;

    // Cursor displacement: a soft bump that warps the field locally.
    vec2 m = uMouse * asp;
    float md = length(p - m);
    vec2 warp = (p - m) * 0.4 * exp(-md * md * 2.5);

    vec2 q = p * 1.4 + warp;
    float n = fbm(q + t + fbm(q * 1.8 - t) * 0.6);

    vec3 darkTint = vec3(0.176, 0.831, 0.749);  /* accent teal (dark) */
    vec3 lightTint = vec3(0.051, 0.486, 0.435); /* accent teal (light) */
    vec3 tint = mix(lightTint, darkTint, uDark);

    float glow = smoothstep(0.42, 0.9, n);
    float strength = mix(0.07, 0.12, uDark);

    // Fade toward the edges so the field melts into the page background.
    float vig = smoothstep(1.15, 0.25, length(vUv - 0.5) * 1.7);

    float a = glow * strength * vig;
    gl_FragColor = vec4(tint * a, a); /* premultiplied alpha */
  }
`;

export default function HeroCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    if (!window.matchMedia(MOTION_OK).matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return; // no WebGL - the CSS gradient fallback stays
    }
    // OGL logs rather than throws when context creation fails.
    if (!renderer.gl) return;
    const gl = renderer.gl;
    host.appendChild(gl.canvas);
    gl.canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.2s ease";

    const isDark = () => document.documentElement.classList.contains("dark");
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.6] },
        uRes: { value: [1, 1] },
        uDark: { value: isDark() ? 1 : 0 },
      },
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(host.offsetWidth, host.offsetHeight);
      program.uniforms.uRes.value = [host.offsetWidth, host.offsetHeight];
    };
    resize();
    window.addEventListener("resize", resize);

    // The mouse uniform eases toward the pointer for a fluid, weighted feel.
    const target = [0.5, 0.6];
    const eased = [0.5, 0.6];
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      target[0] = (e.clientX - r.left) / Math.max(r.width, 1);
      target[1] = 1 - (e.clientY - r.top) / Math.max(r.height, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Re-tint if the theme toggle flips the root class.
    const themeObserver = new MutationObserver(() => {
      program.uniforms.uDark.value = isDark() ? 1 : 0;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Render only while the hero is on screen and the tab is visible.
    let inView = true;
    let raf = 0;
    const start = performance.now();

    const loop = (t: number) => {
      if (!inView || document.hidden) {
        raf = 0;
        return;
      }
      program.uniforms.uTime.value = (t - start) / 1000;
      eased[0] += (target[0] - eased[0]) * 0.05;
      eased[1] += (target[1] - eased[1]) * 0.05;
      program.uniforms.uMouse.value = eased;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (inView && !document.hidden && !raf) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      wake();
    });
    io.observe(host);
    document.addEventListener("visibilitychange", wake);

    raf = requestAnimationFrame(loop);
    requestAnimationFrame(() => {
      gl.canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(raf);
      inView = false;
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", wake);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
