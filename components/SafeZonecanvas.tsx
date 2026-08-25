"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Platform = "youtube" | "tiktok" | "reels" | "shorts" | "pinterest" | "facebook";
type FrameStyle = "none" | "iphone" | "android";
type AssetType = "image" | "video";

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
  tiktok: { w: 1080, h: 1920 },
  reels: { w: 1080, h: 1920 },
  shorts: { w: 1080, h: 1920 },
  facebook: { w: 1080, h: 1920 },
  pinterest: { w: 1000, h: 1500 },
  youtube: { w: 1280, h: 720 },
};

const MAX_FILE_SIZE_MB = 200;

export default function SafeZoneCanvas({ defaultPlatform = "tiktok", locked = false }: Props) {
  const [activePlatform, setActivePlatform] = useState<Platform>(defaultPlatform);
  const [assetSrc, setAssetSrc] = useState<string | null>(null);
  const [assetType, setAssetType] = useState<AssetType>("image");
  const [isDragging, setIsDragging] = useState(false);
  const [showGridOnly, setShowGridOnly] = useState(false);
  const [frameStyle, setFrameStyle] = useState<FrameStyle>("none");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGridDownloading, setIsGridDownloading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Video-specific state
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoElRef = useRef<HTMLVideoElement | null>(null);

  const isVertical = VERTICAL_PLATFORMS.includes(activePlatform);

  // ── Draw a source (image or video element) onto the canvas ────────────────
  const drawSourceToCanvas = useCallback(
    (source: HTMLImageElement | HTMLVideoElement) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w, h } = platformDimensions[activePlatform];
      canvas.width = w;
      canvas.height = h;

      const srcW = source instanceof HTMLVideoElement ? source.videoWidth : source.width;
      const srcH = source instanceof HTMLVideoElement ? source.videoHeight : source.height;

      const imgRatio = srcW / srcH;
      const canvasRatio = w / h;
      let rW: number, rH: number, oX: number, oY: number;

      if (imgRatio > canvasRatio) {
        rW = w; rH = w / imgRatio; oX = 0; oY = (h - rH) / 2;
      } else {
        rH = h; rW = h * imgRatio; oX = (w - rW) / 2; oY = 0;
      }

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(source, oX, oY, rW, rH);

      drawOverlays(ctx, w, h, activePlatform, showGridOnly);
      if (isVertical && frameStyle !== "none") drawPhoneFrame(ctx, w, h, frameStyle);
    },
    [activePlatform, showGridOnly, frameStyle, isVertical],
  );

  // ── File processing ────────────────────────────────────────────────────────
  const processFile = (file: File | undefined) => {
    if (!file) return;
    setFileError(null);

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      setFileError(`File is too large (${Math.round(sizeMB)} MB). Maximum size is ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    // Clean up previous asset
    if (assetSrc) URL.revokeObjectURL(assetSrc);
    if (videoElRef.current) {
      videoElRef.current.pause();
      videoElRef.current.src = "";
      videoElRef.current = null;
    }
    setVideoReady(false);
    setVideoDuration(0);
    setVideoCurrentTime(0);

    const url = URL.createObjectURL(file);

    if (file.type.startsWith("image/")) {
      setAssetType("image");
      setAssetSrc(url);
    } else if (file.type.startsWith("video/")) {
      setAssetType("video");
      setAssetSrc(url);

      const video = document.createElement("video");
      video.src = url;
      video.muted = true;
      video.preload = "metadata";
      video.playsInline = true;
      videoElRef.current = video;

      video.onloadedmetadata = () => {
        setVideoDuration(video.duration);
        video.currentTime = 0.1;
      };

      video.onseeked = () => {
        setVideoReady(true);
        setVideoCurrentTime(video.currentTime);
        drawSourceToCanvas(video);
      };

      video.onerror = () => {
        setFileError("This video format is not supported by your browser. Try MP4 (H.264).");
        URL.revokeObjectURL(url);
        setAssetSrc(null);
        videoElRef.current = null;
      };
    } else {
      setFileError("Unsupported file type. Please upload an image (PNG, JPG, WebP) or video (MP4, WebM, MOV).");
      URL.revokeObjectURL(url);
    }
  };

  // ── Image draw effect ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!assetSrc || assetType !== "image") return;
    const img = new Image();
    img.src = assetSrc;
    img.onload = () => drawSourceToCanvas(img);
  }, [assetSrc, assetType, drawSourceToCanvas]);

  // ── Redraw when platform/grid/frame changes (video) ────────────────────────
  useEffect(() => {
    if (assetType === "video" && videoReady && videoElRef.current) {
      drawSourceToCanvas(videoElRef.current);
    }
  }, [activePlatform, showGridOnly, frameStyle, assetType, videoReady, drawSourceToCanvas]);

  // ── Video scrubber handler ─────────────────────────────────────────────────
  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (!videoElRef.current) return;
    setVideoCurrentTime(t);
    videoElRef.current.currentTime = t;
    // onseeked fires → drawSourceToCanvas called there
  };

  // Redraw on seek
  useEffect(() => {
    if (!videoElRef.current || assetType !== "video") return;
    const video = videoElRef.current;
    const onSeeked = () => drawSourceToCanvas(video);
    video.addEventListener("seeked", onSeeked);
    return () => video.removeEventListener("seeked", onSeeked);
  }, [assetType, drawSourceToCanvas]);

  // ── File input / drag handlers ─────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => processFile(e.target.files?.[0]);
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files?.[0]); };

  const handleClear = () => {
    if (assetSrc) URL.revokeObjectURL(assetSrc);
    if (videoElRef.current) { videoElRef.current.pause(); videoElRef.current.src = ""; videoElRef.current = null; }
    setAssetSrc(null);
    setVideoReady(false);
    setVideoDuration(0);
    setVideoCurrentTime(0);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Download preview PNG ───────────────────────────────────────────────────
  const handleDownload = () => {
    if (!canvasRef.current) return;
    setIsDownloading(true);
    try {
      const a = document.createElement("a");
      a.href = canvasRef.current.toDataURL("image/png");
      a.download = `safezonepreview-${activePlatform}${frameStyle !== "none" ? `-${frameStyle}-frame` : ""}${assetType === "video" ? `-frame-${Math.round(videoCurrentTime)}s` : ""}.png`;
      a.click();
    } finally { setIsDownloading(false); }
  };

  // ── Download transparent grid PNG ──────────────────────────────────────────
  const handleGridDownload = () => {
    setIsGridDownloading(true);
    try {
      const { w, h } = platformDimensions[activePlatform];
      const off = document.createElement("canvas");
      off.width = w; off.height = h;
      const ctx = off.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      drawOverlays(ctx, w, h, activePlatform, true);
      if (isVertical && frameStyle !== "none") drawPhoneFrame(ctx, w, h, frameStyle);
      const a = document.createElement("a");
      a.href = off.toDataURL("image/png");
      a.download = `safezone-grid-${activePlatform}.png`;
      a.click();
    } finally { setIsGridDownloading(false); }
  };

  // ── Format time mm:ss ──────────────────────────────────────────────────────
  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // ── Draw overlays ──────────────────────────────────────────────────────────
  const drawOverlays = (
    ctx: CanvasRenderingContext2D,
    w: number, h: number,
    platform: Platform,
    gridOnly: boolean,
  ) => {
    const rrect = (x: number, y: number, bw: number, bh: number, r: number, fill: string) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + bw - r, y); ctx.quadraticCurveTo(x + bw, y, x + bw, y + r);
      ctx.lineTo(x + bw, y + bh - r); ctx.quadraticCurveTo(x + bw, y + bh, x + bw - r, y + bh);
      ctx.lineTo(x + r, y + bh); ctx.quadraticCurveTo(x, y + bh, x, y + bh - r);
      ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
    };

    if (gridOnly) {
      ctx.strokeStyle = "rgba(239,68,68,0.85)";
      ctx.lineWidth = platform === "pinterest" ? 3 : 4;
      ctx.setLineDash([15, 10]);
      if (platform === "youtube") {
        ctx.strokeRect(w - 200, h - 60, 184, 44);
      } else if (platform === "pinterest") {
        ctx.strokeRect(50, 100, w - 100, h - 300);
      } else {
        const top = 160;
        const right = platform === "shorts" ? 160 : 140;
        const bottom = platform === "tiktok" ? 480 : platform === "shorts" ? 420 : platform === "facebook" ? 420 : 380;
        ctx.beginPath(); ctx.moveTo(0, top); ctx.lineTo(w, top); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w - right, top); ctx.lineTo(w - right, h - bottom); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, h - bottom); ctx.lineTo(w, h - bottom); ctx.stroke();
      }
      ctx.setLineDash([]);
      return;
    }

    if (platform === "youtube") {
      const timeStr = "12:34";
      ctx.font = "bold 24px sans-serif";
      const tw = ctx.measureText(timeStr).width;
      const pW = tw + 24; const pH = 44;
      const pX = w - pW - 16; const pY = h - pH - 16;
      rrect(pX, pY, pW, pH, 6, "rgba(0,0,0,0.85)");
      ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(timeStr, pX + pW / 2, pY + pH / 2 + 1);

    } else if (platform === "tiktok") {
      const tg = ctx.createLinearGradient(0, 0, 0, 200);
      tg.addColorStop(0, "rgba(0,0,0,0.4)"); tg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = tg; ctx.fillRect(0, 0, w, 200);
      ctx.font = "bold 36px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.fillText("Following", w / 2 - 110, 60);
      ctx.fillStyle = "#fff"; ctx.fillText("For You", w / 2 + 90, 60);
      ctx.fillRect(w / 2 + 60, 100, 80, 3);
      const iX = w - 72;
      [780, 900, 1020, 1140, 1260, 1380].forEach(y => {
        ctx.beginPath(); ctx.arc(iX, y, 34, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fill();
      });
      const bg = ctx.createLinearGradient(0, h - 520, 0, h);
      bg.addColorStop(0, "rgba(0,0,0,0)"); bg.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = bg; ctx.fillRect(0, h - 520, w, 520);
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = "#fff";
      ctx.font = "bold 30px sans-serif"; ctx.fillText("@creator_handle", 50, h - 420);
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
      ctx.font = "26px sans-serif"; ctx.fillText("Checking safe zone margins 🚀", 50, h - 150);

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
      const cX = w - 75;
      [880, 1000, 1120, 1240].forEach(y => {
        ctx.beginPath(); ctx.arc(cX, y, 34, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.fill();
      });
      const tg = ctx.createLinearGradient(0, 0, 0, 180);
      tg.addColorStop(0, "rgba(0,0,0,0.35)"); tg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = tg; ctx.fillRect(0, 0, w, 180);
      ctx.font = "bold 40px sans-serif"; ctx.fillStyle = "#1877f2";
      ctx.textAlign = "left"; ctx.textBaseline = "top"; ctx.fillText("f", 40, 40);
      const bg = ctx.createLinearGradient(0, h - 450, 0, h);
      bg.addColorStop(0, "rgba(0,0,0,0)"); bg.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.fillStyle = bg; ctx.fillRect(0, h - 450, w, 450);
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = "#fff";
      ctx.font = "bold 30px sans-serif"; ctx.fillText("Page Name", 50, h - 360);
      ctx.font = "24px sans-serif"; ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("Caption text goes here... #reels", 50, h - 310);
      rrect(50, h - 270, 130, 46, 23, "rgba(255,255,255,0.2)");
      ctx.font = "bold 22px sans-serif"; ctx.fillStyle = "#fff";
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("Follow", 115, h - 247);
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "22px sans-serif";
      ctx.fillText("🎵 Original Audio - Page Name", 50, h - 180);

    } else if (platform === "pinterest") {
      const tg = ctx.createLinearGradient(0, 0, 0, 120);
      tg.addColorStop(0, "rgba(0,0,0,0.5)"); tg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = tg; ctx.fillRect(0, 0, w, 120);
      ctx.beginPath(); ctx.arc(w / 2, 55, 28, 0, Math.PI * 2);
      ctx.fillStyle = "#e60023"; ctx.fill();
      ctx.font = "bold 36px serif"; ctx.fillStyle = "#fff";
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("P", w / 2, 57);
      const bg = ctx.createLinearGradient(0, h - 220, 0, h);
      bg.addColorStop(0, "rgba(0,0,0,0)"); bg.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = bg; ctx.fillRect(0, h - 220, w, 220);
      rrect(w - 180, h - 160, 140, 52, 26, "#e60023");
      ctx.font = "bold 26px sans-serif"; ctx.fillStyle = "#fff";
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("Save", w - 110, h - 134);
      ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = "#fff";
      ctx.font = "bold 28px sans-serif"; ctx.fillText("Your Pin Title Here", 40, h - 130);
      ctx.font = "22px sans-serif"; ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText("yourwebsite.com", 40, h - 90);
    }
  };

  // ── Phone frame ────────────────────────────────────────────────────────────
  const drawPhoneFrame = (ctx: CanvasRenderingContext2D, w: number, h: number, style: FrameStyle) => {
    const r = 90;
    const rl = (x: number, y: number, bw: number, bh: number, br: number, fill: string) => {
      ctx.beginPath();
      ctx.moveTo(x + br, y);
      ctx.lineTo(x + bw - br, y); ctx.quadraticCurveTo(x + bw, y, x + bw, y + br);
      ctx.lineTo(x + bw, y + bh - br); ctx.quadraticCurveTo(x + bw, y + bh, x + bw - br, y + bh);
      ctx.lineTo(x + br, y + bh); ctx.quadraticCurveTo(x, y + bh, x, y + bh - br);
      ctx.lineTo(x, y + br); ctx.quadraticCurveTo(x, y, x + br, y);
      ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
    };

    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(r, 0); ctx.lineTo(w - r, 0); ctx.quadraticCurveTo(w, 0, w, r);
    ctx.lineTo(w, h - r); ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h); ctx.quadraticCurveTo(0, h, 0, h - r);
    ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath(); ctx.stroke();
    ctx.restore();

    if (style === "iphone") {
      rl(w / 2 - 90, 28, 180, 50, 25, "rgba(0,0,0,0.85)");
      rl((w - 280) / 2, h - 52, 280, 10, 5, "rgba(255,255,255,0.35)");
    } else if (style === "android") {
      ctx.save();
      ctx.beginPath(); ctx.arc(w / 2, 52, 22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.8)"; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 3; ctx.stroke();
      ctx.restore();
      rl((w - 200) / 2, h - 48, 200, 8, 4, "rgba(255,255,255,0.3)");
    }
  };

  const { w: cW, h: cH } = platformDimensions[activePlatform];
  const hasAsset = !!assetSrc;
  const exportStep = isVertical ? "5." : "4.";

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
                  className={`px-4 py-2 text-left rounded-lg font-medium transition-all ${activePlatform === p
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
          {!hasAsset ? (
            <>
              <label className="block w-full text-center px-4 py-3 bg-blue-950 hover:bg-blue-900 text-blue-300 rounded-lg font-semibold text-sm cursor-pointer transition-colors border border-blue-800">
                Choose Image or Video
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Images: PNG, JPG, WebP · Videos: MP4, WebM, MOV
              </p>
            </>
          ) : (
            <button
              onClick={handleClear}
              className="w-full text-center px-4 py-3 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-lg font-semibold text-sm cursor-pointer transition-colors border border-rose-800"
            >
              Clear {assetType === "video" ? "Video" : "Image"}
            </button>
          )}
          {fileError && (
            <p className="text-xs text-rose-400 mt-2 text-center">{fileError}</p>
          )}
        </div>

        {/* Video scrubber */}
        {hasAsset && assetType === "video" && videoReady && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-slate-300 text-sm">3. Frame Scrubber</h3>
              <span className="text-xs text-blue-400 font-mono">
                {fmtTime(videoCurrentTime)} / {fmtTime(videoDuration)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={videoDuration}
              step={1 / 30}
              value={videoCurrentTime}
              onChange={handleScrub}
              className="w-full h-2 rounded-full accent-blue-500 cursor-pointer bg-slate-700"
            />
            <p className="text-xs text-slate-500 mt-2 text-center">
              Drag to preview any frame
            </p>
          </div>
        )}

        {/* Video loading state */}
        {hasAsset && assetType === "video" && !videoReady && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 text-center">
            <Spinner />
            <p className="text-xs text-slate-400 mt-2">Loading video…</p>
          </div>
        )}

        {/* Preferences */}
        {hasAsset && (
          <div className="border-t border-slate-700 pt-4 mt-2 flex flex-col gap-5">
            <div>
              <h3 className="font-semibold text-slate-300 mb-3">
                {assetType === "video" && videoReady ? "4." : "3."} Preferences
              </h3>
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

            {/* Phone frame */}
            {isVertical && (
              <div>
                <h3 className="font-semibold text-slate-300 mb-3">
                  {assetType === "video" && videoReady ? "5." : "4."} Phone Frame
                </h3>
                <div className="flex flex-col gap-2">
                  {([
                    { value: "none", label: "No Frame" },
                    { value: "iphone", label: "iPhone Frame" },
                    { value: "android", label: "Android Frame" },
                  ] as { value: FrameStyle; label: string }[]).map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setFrameStyle(value)}
                      className={`px-4 py-2 text-left rounded-lg text-sm font-medium transition-all ${frameStyle === value
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
              <h3 className="font-semibold text-slate-300 mb-3">{exportStep} Export</h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading || (assetType === "video" && !videoReady)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  {isDownloading ? <><Spinner /> Downloading…</> : <><DownloadIcon /> Download Preview PNG</>}
                </button>

                <button
                  onClick={handleGridDownload}
                  disabled={isGridDownloading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-700 hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  {isGridDownloading ? <><Spinner /> Downloading…</> : <><GridIcon /> Download Grid PNG</>}
                </button>

                {assetType === "video" && (
                  <p className="text-xs text-slate-500 text-center italic">
                    Downloads the current frame as PNG
                  </p>
                )}

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
        className={`lg:col-span-3 flex justify-center items-center rounded-xl p-4 min-h-[550px] border-2 border-dashed transition-colors ${isDragging ? "border-blue-500 bg-blue-950/30" : "border-slate-600 bg-slate-900"
          }`}
      >
        {hasAsset ? (
          <div className="relative shadow-xl max-h-[600px] overflow-auto bg-slate-950 rounded-lg p-2 w-full flex flex-col items-center gap-3">
            <canvas
              ref={canvasRef}
              className={`max-h-[540px] w-auto h-auto object-contain mx-auto block ${activePlatform === "youtube" ? "aspect-video" : "aspect-[9/16]"
                }`}
            />
            {/* Asset type badge */}
            <span className={`absolute top-4 left-4 text-xs font-semibold px-2 py-1 rounded-full ${assetType === "video"
                ? "bg-violet-600/80 text-white"
                : "bg-blue-600/80 text-white"
              }`}>
              {assetType === "video" ? "🎬 Video frame" : "🖼 Image"}
            </span>
          </div>
        ) : (
          <div className="text-center select-none pointer-events-none space-y-2">
            <p className="text-base font-semibold text-slate-300">Drag &amp; drop your file here</p>
            <p className="text-xs text-slate-500">Images: PNG, JPG, WebP</p>
            <p className="text-xs text-slate-500">Videos: MP4, WebM, MOV (max {MAX_FILE_SIZE_MB} MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────
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
