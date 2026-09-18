import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Procedural High-Definition Lunar Surface Texture Generator
// Creates a realistic 512x256 lunar surface map with craters, basaltic maria,
// and specular bump displacement entirely in memory (zero external downloads).
// ─────────────────────────────────────────────────────────────────────────────

export function createProceduralLunarTextures(): {
  colorMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const width = 512;
  const height = 256;

  // 1. Color Map Canvas
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext("2d")!;

  // Base lunar regolith grey
  ctx.fillStyle = "#A8B4C0";
  ctx.fillRect(0, 0, width, height);

  // Basaltic Dark Maria (Sea of Tranquility, Ocean of Storms)
  const maria = [
    { x: 180, y: 110, rx: 70, ry: 45, color: "rgba(50, 60, 75, 0.45)" },
    { x: 300, y: 130, rx: 80, ry: 55, color: "rgba(45, 55, 68, 0.5)" },
    { x: 230, y: 80, rx: 50, ry: 35, color: "rgba(55, 65, 80, 0.4)" },
    { x: 120, y: 140, rx: 60, ry: 40, color: "rgba(40, 50, 62, 0.42)" },
    { x: 380, y: 90, rx: 45, ry: 30, color: "rgba(50, 60, 72, 0.38)" },
  ];

  maria.forEach((m) => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(m.x, m.y, m.rx, m.ry, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = m.color;
    ctx.filter = "blur(8px)";
    ctx.fill();
    ctx.restore();
  });

  // 2. Bump Map Canvas
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext("2d")!;

  bCtx.fillStyle = "#808080";
  bCtx.fillRect(0, 0, width, height);

  // Deterministic impact craters
  const craters = [
    { x: 140, y: 80, r: 16 },
    { x: 210, y: 150, r: 24 }, // Tycho-like crater
    { x: 320, y: 95, r: 18 },  // Copernicus-like crater
    { x: 260, y: 190, r: 22 },
    { x: 90, y: 110, r: 12 },
    { x: 420, y: 140, r: 15 },
    { x: 360, y: 180, r: 14 },
    { x: 180, y: 170, r: 10 },
    { x: 290, y: 60, r: 13 },
  ];

  craters.forEach((c) => {
    // Crater depression (dark center)
    bCtx.beginPath();
    bCtx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    bCtx.fillStyle = "#404040";
    bCtx.fill();

    // Raised crater rim (bright ring)
    bCtx.beginPath();
    bCtx.arc(c.x, c.y, c.r + 2, 0, Math.PI * 2);
    bCtx.strokeStyle = "#D0D0D0";
    bCtx.lineWidth = 3;
    bCtx.stroke();

    // Color canvas crater visual
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(40, 48, 60, 0.6)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r + 1.5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(230, 240, 255, 0.7)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.ClampToEdgeWrapping;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;

  return { colorMap, bumpMap };
}
