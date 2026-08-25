"use client";

import { useState, useRef, useEffect } from "react";

type Platform = "youtube" | "tiktok" | "reels" | "shorts" | "pinterest" | "facebook";
type FrameStyle = "none" | "iphone" | "android";

type Props = {
  defaultPlatform?: Platform;
  locked?: boolean;
};

const VERTICAL_PLATFORMS: Platform[] = ["tiktok", "reels", "shorts", "facebook", "pinterest"];

const platformLabel: Record<Platform, string> = {
  tiktok: "TikTok",
  reels: "Instagram Reels",
  shorts: "YouTube Shorts",
  youtube: "YouTube Thumbnail",
  pinterest: "Pinterest",
  facebook: "Facebook Reels",
};

const platformDimensions: Record<Platform, { w: number; h: number }> = {
  tiktok:    { w: 1080, h: 1920 },
  reels:     { w: 1080, h: 1920 },
  shorts:    { w: 1080, h: 1920 },
  facebook:  { w: 1080, h: 1920 },
  pinterest: { w: 1000, h: 1500 },
  youtube:   { w: 1280, h: 720  },
};

export default function SafeZoneCanvas({ defaultPlatform = "tiktok", locked = false }: Props) {
  const [activePlatform, setActivePlatform]   = useState<Platform>(defaultPlatform);
  const [imageSrc,       setImageSrc]         = useState<string | null>(null);
  const [isDragging,     setIsDragging]       = useState(false);
  const [showGridOnly,   setShowGridOnly]     = useState(false);
  const [frameStyle,     setFrameStyle]       = useState<FrameStyle>("none");
  const [isDownloading,  setIsDownloading]    = useState(false);
  const [isGridDownloading, setIsGridDownloading] = useState(false);

  const canvasRef   = useRef<HTMLCanvasElement | null>(null);
  const imageRef    = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isVertical = VERTICAL_PLATFORMS.includes(activePlatform);

  // ── File helpers ──────────────────────────────────────────────────────────
  const processFile = (file: File | undefined) => {
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };
  const handleFileChange  = (e: React.ChangeEvent<HTMLInputElement>) => processFile(e.target.files?.[0]);
  const handleDragOver    = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave   = () => setIsDragging(false);
  const handleDrop        = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files?.[0]); };
  const handleClearImage  = () => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Main canvas draw ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = platformDimensions[activePlatform];
    canvas.width  = w;
    canvas.height = h;

    const img = new Image();
    img.src = imageSrc;
    imageRef.current = img;

    img.onload = () => {
      ctx.clearRect(0, 0, w, h);

      const imgRatio    = img.width / img.height;
      const canvasRatio = w / h;
      let rW, rH, oX, oY;

      if (imgRatio > canvasRatio) {
        rW = w; rH = w / imgRatio; oX = 0; oY = (h - rH) / 2;
      } else {
        rH = h; rW = h * imgRatio; oX = (w - rW) / 2; oY = 0;
      }

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, oX, oY, rW, rH);

      drawOverlays(ctx, w, h, activePlatform, showGridOnly);
      if (isVertical && frameStyle !== "none") drawPhoneFrame(ctx, w, h, frameStyle);
    };
  }, [imageSrc, activePlatform, showGridOnly, frameStyle]);

  // ── Download preview PNG ──────────────────────────────────────────────────
  const handleDownload = () => {
    if (!canvasRef.current) return;
    setIsDownloading(true);
    try {
      const a = document.createElement("a");
      a.href     = canvasRef.current.toDataURL("image/png");
      a.download = `safezonepreview-${activePlatform}${frameStyle !== "none" ? `-${frameStyle}-frame` : ""}.png`;
      a.click();
    } finally { setIsDownloading(false); }
  };

  // ── Download transparent grid PNG ─────────────────────────────────────────
  const handleGridDownload = () => {
    setIsGridDownloading(true);
    try {
      const { w, h } = platformDimensions[activePlatform];
      const offscreen = document.createElement("canvas");
      offscreen.width  = w;
      offscreen.height = h;
      const ctx = offscreen.getContext("2d");
      if (!ctx) return;

      // fully transparent background
      ctx.clearRect(0, 0, w, h);
      drawOverlays(ctx, w, h, activePlatform, true /* gridOnly */);
      if (isVertical && frameStyle !== "none") drawPhoneFrame(ctx, w, h, frameStyle);

      const a = document.createElement("a");
      a.href     = offscreen.toDataURL("image/png");
      a.download = `safezone-grid-${activePlatform}.png`;
      a.click();
    } finally { setIsGridDownloading(false); }
  };

  // ── Draw overlays ─────────────────────────────────────────────────────────
  const drawOverlays = (
    ctx: CanvasRenderingContext2D,
    w: number, h: number,
    platform: Platform,
    gridOnly: boolean,
  ) => {
    // ── Shared rounded-rect helper ──
    const rrect = (x: number, y: number, bw: number, bh: number, r: number, fill: string) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + bw - r, y);
      ctx.quadraticCurveTo(x + bw, y,        x + bw, y + r);
      ctx.lineTo(x + bw, y + bh - r);
      ctx.quadraticCurveTo(x + bw, y + bh,   x + bw - r, y + bh);
      ctx.lineTo(x + r, y + bh);
      ctx.quadraticCurveTo(x, y + bh,        x, y + bh - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y,             x + r, y);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    };

    if (gridOnly) {
      ctx.strokeStyle = "rgba(239,68,68,0.85)";
      ctx.lineWidth   = platform === "pinterest" ? 3 : 4;
      ctx.setLineDash([15, 10]);

      if (platform === "youtube") {
        ctx.strokeRect(w - 200, h - 60, 184, 44);
      } else if (platform === "pinterest") {
        ctx.strokeRect(50, 100, w - 100, h - 300);
      } else {
        const top    = 160;
        const right  = platform === "shorts" ? 160 : 140;
        const bottom = platform === "tiktok" ? 480 : platform === "shorts" ? 420 : platform === "facebook" ? 420 : 380;
        ctx.beginPath(); ctx.moveTo(0, top);          ctx.lineTo(w, top);          ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w - right, top);  ctx.lineTo(w - right, h - bottom); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, h - bottom);   ctx.lineTo(w, h - bottom);   ctx.stroke();
      }
      ctx.setLineDash([]);
      return;
    }

    // ── Full overlays per platform ────────────────────────────────────────
    if (platform === "youtube") {
      const timeStr = "12:34";
      ctx.font = "bold 24px sans-serif";
      const tw   = ctx.measureText(timeStr).width;
      const pW   = tw + 24; const pH = 44;
      const pX   = w - pW - 16; const pY = h - pH - 16;
      rrect(pX, pY, pW, pH, 6, "rgba(0,0,0,0.85)");
      ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(timeStr, pX + pW / 2, pY + pH / 2 + 1);

    } else if (platform === "tiktok") {
      // top gradient
      const tg = ctx.createLinearGradient(0, 0, 0, 200);
      tg.addColorStop(0, "rgba(0,0,0,0.4)"); tg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = tg; ctx.fillRect(0, 0, w, 200);
      // tabs
      ctx.font = "bold 36px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.fillText("Following", w / 2 - 110, 60);
      ctx.fillStyle = "#fff";                  ctx.fillText("For You",   w / 2 + 90,  60);
      ctx.fillRect(w / 2 + 60, 100, 80, 3);
      // icons
      const iX = w - 72;
      [780, 900, 1020, 1140, 1260, 1380].forEach(y => {
        ctx.beginPath(); ctx.arc(iX, y, 34, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fill();
      });
      // bottom gradient + text
      const bg = ctx.createLinearGradient(0, h - 520, 0, h);
      bg.addColorStop(0, "rgba(0,0,0,0)"); bg.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = bg; ctx.fillRect(0, h - 520, w, 520);
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#fff";  ctx.font = "bold 30px sans-serif"; ctx.fillText("@creator_handle", 50, h - 420);
      ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.font = "26px sans-serif";
      ctx.fillText("Your caption here... #fyp #viral", 50, h - 370);
      ctx.fillStyle = "#a8a29e"; ctx.fillText("🎵 Original Sound - @creator_handle", 50, h - 260);

    } else if (platform === "reels") {
      const cX = w - 80;
      [900, 1010, 1120, 1230].forEach(y => {
        ctx.beginPath(); ctx.arc(cX, y, 32, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.1)"; ctx.fill();
      });
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = "#fff";
      ctx.font = "bold 28px sans-serif"; ctx.fillText("instagram_user", 50, h - 200);
      ctx.font = "26px sans-serif";      ctx.fillText("Checking safe zone margins 🚀", 50, h - 150);

    } else if (platform === "shorts") {
      const cX = w - 80;
      [["Likes", 850], ["Dislike", 980], ["1,405", 1110], ["Share", 1240], ["Remix", 1370]].forEach(([label, y]) => {
        ctx.beginPath(); ctx.arc(cX, y as number, 38, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fill();
        ctx.font = "bold 20px sans-serif"; ctx.fillStyle = "#fff";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(label as string, cX, (y as number) + 65);
      });
      rrect(cX - 30, 1460, 60, 60, 8, "#1e293b");
      const bg = ctx.createLinearGradient(0, h - 450, 0, h);
      bg.addColorStop(0, "rgba(0,0,0,0)"); bg.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = bg; ctx.fillRect(0, h - 450, w, 450);
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = "#fff";
      ctx.font = "bold 30px sans-serif"; ctx.fillText("@channel_handle", 50, h - 320);
      rrect(340, h - 350, 160, 46, 23, "#cc0000");
      ctx.font = "bold 20px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("Subscribe", 420, h - 327);
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
      ctx.font = "28px sans-serif"; ctx.fillText("Testing YouTube Shorts safe zone!", 50, h - 250);
      ctx.fillStyle = "#38bdf8"; ctx.fillText("#shorts #buildinpublic", 50, h - 200);

    } else if (platform === "facebook") {
      // Facebook Reels overlay
      const cX = w - 75;
      // right-side icon stack
      [880, 1000, 1120, 1240].forEach(y => {
        ctx.beginPath(); ctx.arc(cX, y, 34, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.fill();
      });
      // top gradient
      const tg = ctx.createLinearGradient(0, 0, 0, 180);
      tg.addColorStop(0, "rgba(0,0,0,0.35)"); tg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = tg; ctx.fillRect(0, 0, w, 180);
      // Facebook wordmark area top-left
      ctx.font = "bold 40px sans-serif"; ctx.fillStyle = "#1877f2";
      ctx.textAlign = "left"; ctx.textBaseline = "top";
      ctx.fillText("f", 40, 40);
      // bottom gradient + info
      const bg = ctx.createLinearGradient(0, h - 450, 0, h);
      bg.addColorStop(0, "rgba(0,0,0,0)"); bg.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.fillStyle = bg; ctx.fillRect(0, h - 450, w, 450);
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = "#fff";
      ctx.font = "bold 30px sans-serif"; ctx.fillText("Page Name", 50, h - 360);
      ctx.font = "24px sans-serif"; ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("Caption text goes here... #reels", 50, h - 310);
      // Follow button
      rrect(50, h - 270, 130, 46, 23, "rgba(255,255,255,0.2)");
      ctx.font = "bold 22px sans-serif"; ctx.fillStyle = "#fff";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("Follow", 115, h - 247);
      // Audio bar
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "22px sans-serif";
      ctx.fillText("🎵 Original Audio - Page Name", 50, h - 180);

    } else if (platform === "pinterest") {
      // Pinterest overlay — top logo bar + bottom save bar
      // top bar
      const tg = ctx.createLinearGradient(0, 0, 0, 120);
      tg.addColorStop(0, "rgba(0,0,0,0.5)"); tg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = tg; ctx.fillRect(0, 0, w, 120);
      // Pinterest P logo placeholder
      ctx.beginPath(); ctx.arc(w / 2, 55, 28, 0, Math.PI * 2);
      ctx.fillStyle = "#e60023"; ctx.fill();
      ctx.font = "bold 36px serif"; ctx.fillStyle = "#fff";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("P", w / 2, 57);
      // bottom save bar
      const bg = ctx.createLinearGradient(0, h - 220, 0, h);
      bg.addColorStop(0, "rgba(0,0,0,0)"); bg.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = bg; ctx.fillRect(0, h - 220, w, 220);
      // Save button
      rrect(w - 180, h - 160, 140, 52, 26, "#e60023");
      ctx.font = "bold 26px sans-serif"; ctx.fillStyle = "#fff";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("Save", w - 110, h - 134);
      // Pin title
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = "#fff";
      ctx.font = "bold 28px sans-serif"; ctx.fillText("Your Pin Title Here", 40, h - 130);
      ctx.font = "22px sans-serif"; ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText("yourwebsite.com", 40, h - 90);
    }
  };

  // ── Phone frame ───────────────────────────────────────────────────────────
  const drawPhoneFrame = (
    ctx: CanvasRenderingContext2D,
    w: number, h: number,
    style: FrameStyle,
  ) => {
    const r = 90; // corner radius

    // Outer phone body
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth   = 18;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.quadraticCurveTo(w, 0, w, r);
    ctx.lineTo(w, h - r);
    ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h);
    ctx.quadraticCurveTo(0, h, 0, h - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.stroke();

    // Inner screen inset (subtle)
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth   = 6;
    const inset = 24;
    const ri    = r - inset / 2;
    ctx.beginPath();
    ctx.moveTo(ri + inset, inset);
    ctx.lineTo(w - ri - inset, inset);
    ctx.quadraticCurveTo(w - inset, inset, w - inset, ri + inset);
    ctx.lineTo(w - inset, h - ri - inset);
    ctx.quadraticCurveTo(w - inset, h - inset, w - ri - inset, h - inset);
    ctx.lineTo(ri + inset, h - inset);
    ctx.quadraticCurveTo(inset, h - inset, inset, h - ri - inset);
    ctx.lineTo(inset, ri + inset);
    ctx.quadraticCurveTo(inset, inset, ri + inset, inset);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    if (style === "iphone") {
      // Dynamic Island
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.85)";
      rrectLocal(ctx, w / 2 - 90, 28, 180, 50, 25, "rgba(0,0,0,0.85)");
      ctx.restore();

      // Home bar
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      const barW = 280; const barH = 10;
      rrectLocal(ctx, (w - barW) / 2, h - 52, barW, barH, 5, "rgba(255,255,255,0.35)");
      ctx.restore();

    } else if (style === "android") {
      // Punch-hole camera
      ctx.save();
      ctx.beginPath();
      ctx.arc(w / 2, 52, 22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.8)"; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 3; ctx.stroke();
      ctx.restore();

      // Gesture bar
      ctx.save();
      const barW = 200; const barH = 8;
      rrectLocal(ctx, (w - barW) / 2, h - 48, barW, barH, 4, "rgba(255,255,255,0.3)");
      ctx.restore();
    }
  };

  // local rrect used inside drawPhoneFrame (avoids closure issues)
  const rrectLocal = (
    ctx: CanvasRenderingContext2D,
    x: number, y: number, bw: number, bh: number, r: number, fill: string,
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + bw - r, y); ctx.quadraticCurveTo(x + bw, y, x + bw, y + r);
    ctx.lineTo(x + bw, y + bh - r); ctx.quadraticCurveTo(x + bw, y + bh, x + bw - r, y + bh);
    ctx.lineTo(x + r, y + bh); ctx.quadraticCurveTo(x, y + bh, x, y + bh - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
  };

  const { w: cW, h: cH } = platformDimensions[activePlatform];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

      {/* ── Sidebar ── */}
      <div className="lg:col-span-1 flex flex-col gap-6">

        {/* Platform selector */}
        {!locked ? (
          <div>
            <h3 className="font-semibold text-slate-300 mb-3">1. Select Platform</h3>
            <div className="flex flex-col gap-2">
              {(Object.keys(platformLabel) as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => { setActivePlatform(p); if (!VERTICAL_PLATFORMS.includes(p)) setFrameStyle("none"); }}
                  className={`px-4 py-2 text-left rounded-lg font-medium transition-all ${
                    activePlatform === p
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {platformLabel[p]}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-slate-300 mb-3">Platform</h3>
            <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm">
              {platformLabel[activePlatform]}
            </div>
          </div>
        )}

        {/* Upload / Clear */}
        <div>
          <h3 className="font-semibold text-slate-300 mb-2">2. Upload Asset</h3>
          {!imageSrc ? (
            <label className="block w-full text-center px-4 py-3 bg-blue-950 hover:bg-blue-900 text-blue-300 rounded-lg font-semibold text-sm cursor-pointer transition-colors border border-blue-800">
              Choose Image File
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          ) : (
            <button onClick={handleClearImage} className="w-full text-center px-4 py-3 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-lg font-semibold text-sm cursor-pointer transition-colors border border-rose-800">
              Clear Image
            </button>
          )}
        </div>

        {/* Preferences */}
        {imageSrc && (
          <div className="border-t border-slate-700 pt-4 mt-2 flex flex-col gap-5">
            <div>
              <h3 className="font-semibold text-slate-300 mb-3">3. Preferences</h3>
              <label className="flex items-center gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={showGridOnly}
                  onChange={(e) => setShowGridOnly(e.target.checked)}
                  className="w-5 h-5 accent-blue-500 rounded cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
                  Show Safe-Zone Grid Only
                </span>
              </label>
            </div>

            {/* Phone frame — vertical platforms only */}
            {isVertical && (
              <div>
                <h3 className="font-semibold text-slate-300 mb-3">4. Phone Frame</h3>
                <div className="flex flex-col gap-2">
                  {([
                    { value: "none",    label: "No Frame"       },
                    { value: "iphone",  label: "iPhone Frame"   },
                    { value: "android", label: "Android Frame"  },
                  ] as { value: FrameStyle; label: string }[]).map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setFrameStyle(value)}
                      className={`px-4 py-2 text-left rounded-lg text-sm font-medium transition-all ${
                        frameStyle === value
                          ? "bg-violet-600 text-white shadow-md"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Export */}
            <div>
              <h3 className="font-semibold text-slate-300 mb-3">{isVertical ? "5." : "4."} Export</h3>
              <div className="flex flex-col gap-3">

                {/* Download preview PNG */}
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  {isDownloading ? (
                    <><Spinner /> Downloading…</>
                  ) : (
                    <><DownloadIcon /> Download Preview PNG</>
                  )}
                </button>

                {/* Download transparent grid PNG */}
                <button
                  onClick={handleGridDownload}
                  disabled={isGridDownloading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-700 hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  {isGridDownloading ? (
                    <><Spinner /> Downloading…</>
                  ) : (
                    <><GridIcon /> Download Grid PNG</>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Full resolution · {cW}×{cH}px · PNG
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Drop Zone ── */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`lg:col-span-3 flex justify-center items-center rounded-xl p-4 min-h-[550px] border-2 border-dashed transition-colors ${
          isDragging ? "border-blue-500 bg-blue-950/30" : "border-slate-600 bg-slate-900"
        }`}
      >
        {imageSrc ? (
          <div className="relative shadow-xl max-h-[600px] overflow-auto bg-slate-950 rounded-lg p-2">
            <canvas
              ref={canvasRef}
              className={`max-h-[540px] w-auto h-auto object-contain mx-auto block ${
                activePlatform === "youtube" ? "aspect-video" : "aspect-[9/16]"
              }`}
            />
          </div>
        ) : (
          <div className="text-center select-none pointer-events-none">
            <p className="text-base font-semibold text-slate-300">Drag &amp; drop your image here</p>
            <p className="text-xs mt-1 text-slate-500">Supports PNG, JPG, and WebP assets</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Small icon components ──────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h16M4 19h16M9 5v14M15 5v14" />
    </svg>
  );
}
