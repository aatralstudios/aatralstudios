import sharp from 'sharp';
import fs from 'fs';

async function generatePortraits() {
  console.log('Generating harmonized team portraits...');

  // 1. SUDHARSHINI (Neural DeepLabV3 extraction with matching yellow studio background)
  const sInput = 'public/images/team/sudharshini.jpg';
  console.log('Sudharshini portrait already updated with DeepLabV3 neural segmentation and yellow studio background.');

  // 2. VASANTHABALAN (New Yellow Studio Background with pocket-level crop)
  const vInput = 'C:/Users/baska/.gemini/antigravity/brain/9b060202-226d-49c7-8244-b8d0e0fe2ff5/.user_uploaded/media_1794767909916_80634cb0.jpg';
  const img = await sharp(vInput).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = img;
  const w = info.width, h = info.height;

  // BFS flood fill for exterior blue studio background
  const isBg = new Uint8Array(w * h);
  function isBlue(x, y) {
    const idx = (y * w + x) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    return b > 140 && (b - r) > 50 && (b - g) > 20;
  }

  const queue = [];
  for (let x = 0; x < w; x++) {
    if (isBlue(x, 0)) { queue.push(x, 0); isBg[0 * w + x] = 1; }
    if (isBlue(x, h - 1)) { queue.push(x, h - 1); isBg[(h - 1) * w + x] = 1; }
  }
  for (let y = 0; y < h; y++) {
    if (isBlue(0, y)) { queue.push(0, y); isBg[y * w + 0] = 1; }
    if (isBlue(w - 1, y)) { queue.push(w - 1, y); isBg[y * w + (w - 1)] = 1; }
  }

  let head = 0;
  const dx = [-1, 1, 0, 0, -1, 1, -1, 1];
  const dy = [0, 0, -1, 1, -1, -1, 1, 1];

  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];
    for (let d = 0; d < 8; d++) {
      const nx = x + dx[d], ny = y + dy[d];
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nIdx = ny * w + nx;
        if (!isBg[nIdx] && isBlue(nx, ny)) {
          isBg[nIdx] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  function getYellowBg(x, y) {
    const dist = Math.hypot((x - w / 2) / (w / 2), (y - 350) / (h / 2));
    const factor = Math.min(1, Math.max(0, dist));
    const yr = Math.round(248 * (1 - factor * 0.1) + 228 * (factor * 0.1));
    const yg = Math.round(192 * (1 - factor * 0.18) + 160 * (factor * 0.18));
    const yb = Math.round(35 * (1 - factor * 0.6) + 12 * (factor * 0.6));
    return [yr, yg, yb];
  }

  const outRgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x);
      const sIdx = idx * 3;
      const dIdx = idx * 4;
      const r = data[sIdx], g = data[sIdx + 1], b = data[sIdx + 2];
      const [yr, yg, yb] = getYellowBg(x, y);

      if (isBg[idx]) {
        outRgba[dIdx] = yr;
        outRgba[dIdx + 1] = yg;
        outRgba[dIdx + 2] = yb;
        outRgba[dIdx + 3] = 255;
      } else {
        let bgNeighbors = 0;
        for (let d = 0; d < 8; d++) {
          const nx = x + dx[d], ny = y + dy[d];
          if (nx >= 0 && nx < w && ny >= 0 && ny < h && isBg[ny * w + nx]) {
            bgNeighbors++;
          }
        }

        if (bgNeighbors > 0) {
          const blueExcess = Math.max(0, b - Math.max(r, g));
          const cleanB = Math.max(0, b - blueExcess);
          const blendFactor = bgNeighbors / 8;
          outRgba[dIdx] = Math.round(r * (1 - blendFactor * 0.5) + yr * (blendFactor * 0.5));
          outRgba[dIdx + 1] = Math.round(g * (1 - blendFactor * 0.5) + yg * (blendFactor * 0.5));
          outRgba[dIdx + 2] = Math.round(cleanB * (1 - blendFactor * 0.5) + yb * (blendFactor * 0.5));
          outRgba[dIdx + 3] = 255;
        } else {
          outRgba[dIdx] = r;
          outRgba[dIdx + 1] = g;
          outRgba[dIdx + 2] = b;
          outRgba[dIdx + 3] = 255;
        }
      }
    }
  }

  const fullYellowBuffer = await sharp(outRgba, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
  const vCrop = { left: 58, top: 50, width: 653, height: 840 };

  const vFinalJpg = await sharp(fullYellowBuffer)
    .extract(vCrop)
    .resize(420, 540)
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();

  const vFinalWebp = await sharp(fullYellowBuffer)
    .extract(vCrop)
    .resize(420, 540)
    .webp({ quality: 88 })
    .toBuffer();

  fs.writeFileSync('public/images/team/vasanthabalan.jpg', vFinalJpg);
  fs.writeFileSync('public/images/team/vasanthabalan.webp', vFinalWebp);

  console.log('Saved all team images successfully!');
}

generatePortraits().catch(console.error);
