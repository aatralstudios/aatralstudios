import sharp from 'sharp';
import fs from 'fs';

async function generatePortraits() {
  console.log('Generating harmonized team portraits...');

  // 1. SUDHARSHINI
  // Original is 576 x 1024.
  // Hair top: y ~ 40, Chin: y ~ 320. Head height = 280px.
  // We want head height to be 285px in a 540px passport photo (~52.8%).
  // In original: Head height is 280px.
  // Scale = 285 / 280 = 1.0178.
  // Crop height = Math.round(540 / 1.0178) = 530px.
  // Crop width = Math.round(530 * (3.5 / 4.5)) = 412px.
  // Center horizontally around x = 282.
  // left = Math.round(282 - 412 / 2) = 76.
  // top = 5 (gives 35px headroom for hair).
  const sCrop = { left: 76, top: 5, width: 412, height: 530 };
  const sInput = 'C:/Users/baska/.gemini/antigravity/brain/9b060202-226d-49c7-8244-b8d0e0fe2ff5/.user_uploaded/media_1794764083697_9f4e6823.jpg';

  const sFinalJpg = await sharp(sInput)
    .extract(sCrop)
    .resize(420, 540)
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  const sFinalWebp = await sharp(sInput)
    .extract(sCrop)
    .resize(420, 540)
    .webp({ quality: 90 })
    .toBuffer();

  console.log('Processed Sudharshini successfully.');

  // 2. VASANTHABALAN
  // Target head height: 285px (exact match with Sudharshini!).
  // Original head height = 1480px (from hair y=240 to chin y=1720).
  // Scale = 285 / 1480 = 0.192567.
  const targetW = Math.round(1580 * 0.192567); // 304px
  const targetH = Math.round(2240 * 0.192567); // 431px
  const leftPos = Math.round((420 - targetW) / 2); // 58px
  const topPos = 0; // Hair top will be at 240 * 0.192567 = 46px headroom!

  const vInput = 'C:/portfolio/public/assets/images/vasanthabalan-portrait-color.jpg';

  // Resize Vasanth first to 304 x 431
  const vResizedRaw = await sharp(vInput)
    .resize(targetW, targetH)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = vResizedRaw;
  const w = info.width;
  const h = info.height;

  // Soft fade left & right edges near shoulders (below chin, y > 300)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      // Fade left shoulder
      if (x < 25 && y > 310) {
        data[idx + 3] = Math.round(data[idx + 3] * (x / 25));
      }
      // Fade right shoulder
      if (x > w - 25 && y > 310) {
        data[idx + 3] = Math.round(data[idx + 3] * ((w - 1 - x) / 25));
      }
      // Fade bottom edge into studio dark
      if (y > h - 45) {
        data[idx + 3] = Math.round(data[idx + 3] * ((h - 1 - y) / 45));
      }
    }
  }

  const featheredV = await sharp(data, {
    raw: { width: w, height: h, channels: 4 }
  }).png().toBuffer();

  // Create 420x540 dark studio background matching Vasanth's studio background
  const bg = await sharp({
    create: {
      width: 420,
      height: 540,
      channels: 4,
      background: { r: 6, g: 7, b: 11, alpha: 1 }
    }
  }).png().toBuffer();

  const vFinalJpg = await sharp(bg)
    .composite([{
      input: featheredV,
      left: leftPos,
      top: topPos
    }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  const vFinalWebp = await sharp(bg)
    .composite([{
      input: featheredV,
      left: leftPos,
      top: topPos
    }])
    .webp({ quality: 90 })
    .toBuffer();

  console.log('Processed Vasanthabalan successfully.');

  // Save to public/images/team/
  fs.writeFileSync('c:/aatral studios/public/images/team/sudharshini.jpg', sFinalJpg);
  fs.writeFileSync('c:/aatral studios/public/images/team/sudharshini.webp', sFinalWebp);
  fs.writeFileSync('c:/aatral studios/public/images/team/vasanthabalan.jpg', vFinalJpg);
  fs.writeFileSync('c:/aatral studios/public/images/team/vasanthabalan.webp', vFinalWebp);

  console.log('Saved all 4 images to public/images/team/ successfully!');

  // Create a side-by-side comparison image for verification
  const comparison = await sharp({
    create: {
      width: 880,
      height: 580,
      channels: 3,
      background: { r: 245, g: 245, b: 247 }
    }
  }).composite([
    { input: vFinalJpg, left: 15, top: 20 },
    { input: sFinalJpg, left: 445, top: 20 }
  ]).jpeg({ quality: 90 }).toBuffer();

  fs.writeFileSync('C:/Users/baska/.gemini/antigravity/brain/9b060202-226d-49c7-8244-b8d0e0fe2ff5/harmonized-comparison.jpg', comparison);
  console.log('Saved harmonized-comparison.jpg');
}

generatePortraits().catch(console.error);
