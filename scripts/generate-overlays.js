/**
 * generate-overlays.js
 *
 * Batch-generates transparent, dashed-line "safe zone" overlay PNGs for each
 * supported platform — the same asset your app's "Download Grid PNG" button
 * produces on the client, just run server-side/offline so you can bundle
 * them into a downloadable template pack.
 *
 * IMPORTANT: The margin/bar numbers below are pulled from what's documented
 * for safezonepreview.com. A couple of platforms (YouTube Thumbnail,
 * Pinterest) only have descriptive notes on record ("timestamp pill
 * bottom-right", "top logo bar") rather than exact pixel values, so those
 * are marked with placeholder boxes below (search "PLACEHOLDER"). Before
 * shipping the pack, swap every placeholder for the exact constants already
 * used in your real canvas-drawing code so the template pack matches the
 * live preview tool pixel-for-pixel — that consistency is the whole point
 * of the pack.
 *
 * Usage:
 *   node generate-overlays.js
 * Output:
 *   ./png/<platform-slug>-safe-zone.png  (transparent, full resolution)
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const OUT_DIR = path.join(__dirname, "png");
const SVG_DIR = path.join(__dirname, "svg");

// Matches drawOverlays()'s gridOnly branch in SafeZoneCanvas.tsx exactly.
const STROKE = "rgba(239,68,68,0.85)";
const DASH = "15,10";

// "kind: lines"  -> top line (y=160 full width), right line (x=w-right, from
//                   y=top to y=h-bottom), bottom line (y=h-bottom full width)
// "kind: rect"   -> single stroked rectangle (x, y, w, h)
const PLATFORMS = [
  { slug: "tiktok-safe-zone",              label: "TikTok",              width: 1080, height: 1920, kind: "lines", top: 160, right: 140, bottom: 480, strokeWidth: 4 },
  { slug: "instagram-reels-safe-zone",     label: "Instagram Reels",     width: 1080, height: 1920, kind: "lines", top: 160, right: 140, bottom: 380, strokeWidth: 4 },
  { slug: "instagram-story-safe-zone",     label: "Instagram Story",     width: 1080, height: 1920, kind: "lines", top: 160, right: 140, bottom: 380, strokeWidth: 4 }, // shares Reels canvas
  { slug: "youtube-shorts-safe-zone",      label: "YouTube Shorts",      width: 1080, height: 1920, kind: "lines", top: 160, right: 160, bottom: 420, strokeWidth: 4 },
  { slug: "facebook-reels-safe-zone",      label: "Facebook Reels",      width: 1080, height: 1920, kind: "lines", top: 160, right: 140, bottom: 420, strokeWidth: 4 },
  { slug: "linkedin-safe-zone",            label: "LinkedIn Video",      width: 1080, height: 1920, kind: "lines", top: 160, right: 140, bottom: 360, strokeWidth: 4 },
  { slug: "snapchat-safe-zone",            label: "Snapchat Spotlight",  width: 1080, height: 1920, kind: "lines", top: 160, right: 120, bottom: 320, strokeWidth: 4 },
  { slug: "youtube-thumbnail-safe-zone",   label: "YouTube Thumbnail",   width: 1280, height: 720,  kind: "rect",  x: 1280 - 200, y: 720 - 60, w: 184, h: 44, strokeWidth: 4 },
  { slug: "pinterest-safe-zone",           label: "Pinterest",           width: 1000, height: 1500, kind: "rect",  x: 50, y: 100, w: 1000 - 100, h: 1500 - 300, strokeWidth: 3 },
];

function buildSvg(p) {
  const { label, width: w, height: h, strokeWidth } = p;
  const strokeAttrs = `fill="none" stroke="${STROKE}" stroke-width="${strokeWidth}" stroke-dasharray="${DASH}"`;
  let shapes;

  if (p.kind === "rect") {
    shapes = `  <rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" ${strokeAttrs} />`;
  } else {
    const rightX = w - p.right;
    const bottomY = h - p.bottom;
    shapes = [
      `  <line x1="0" y1="${p.top}" x2="${w}" y2="${p.top}" ${strokeAttrs} />`,
      `  <line x1="${rightX}" y1="${p.top}" x2="${rightX}" y2="${bottomY}" ${strokeAttrs} />`,
      `  <line x1="0" y1="${bottomY}" x2="${w}" y2="${bottomY}" ${strokeAttrs} />`,
    ].join("\n");
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <!-- ${label} safe-zone overlay — transparent background, matches SafeZoneCanvas.tsx gridOnly output -->
${shapes}
</svg>`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(SVG_DIR, { recursive: true });

  for (const platform of PLATFORMS) {
    const svg = buildSvg(platform);
    const svgPath = path.join(SVG_DIR, `${platform.slug}.svg`);
    const pngPath = path.join(OUT_DIR, `${platform.slug}.png`);

    fs.writeFileSync(svgPath, svg, "utf8");

    await sharp(Buffer.from(svg))
      .resize(platform.width, platform.height)
      .png()
      .toFile(pngPath);

    console.log(`✓ ${platform.label.padEnd(20)} -> ${path.relative(__dirname, pngPath)}`);
  }

  console.log("\nDone. PNGs are in ./png — zip that folder (plus a README) to ship as the template pack.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
