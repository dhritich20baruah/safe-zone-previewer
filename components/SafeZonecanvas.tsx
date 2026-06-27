"use client";

import { useState, useRef, useEffect } from "react";

type Platform = "youtube" | "tiktok" | "reels" | "shorts";

export default function SafeZoneCanvas() {
  const [activePlatform, setActivePlatform] = useState<Platform>("tiktok");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showGridOnly, setShowGridOnly] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = (file: File | undefined) => {
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const handleClearImage = () => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    imageRef.current = img;

    img.onload = () => {
      if (activePlatform === "youtube") {
        canvas.width = 1280;
        canvas.height = 720;
      } else {
        canvas.width = 1080;
        canvas.height = 1920;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;

      let renderWidth, renderHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        renderHeight = canvas.height;
        offsetX = (canvas.width - renderWidth) / 2;
        offsetY = 0;
      }

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
      drawOverlays(ctx, canvas.width, canvas.height, activePlatform);
    };
  }, [imageSrc, activePlatform, showGridOnly]);

  const drawOverlays = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    platform: Platform,
  ) => {
    if (showGridOnly) {
      ctx.strokeStyle = "rgba(239, 68, 68, 0.8)";
      ctx.lineWidth = 4;
      ctx.setLineDash([15, 10]);

      if (platform === "youtube") {
        ctx.strokeRect(w - 184 - 16, h - 44 - 16, 184, 44);
      } else {
        const topMargin = 160;
        const rightMargin = 140;
        const bottomMargin =
          platform === "tiktok" ? 480 : platform === "shorts" ? 420 : 380;

        ctx.beginPath(); ctx.moveTo(0, topMargin); ctx.lineTo(w, topMargin); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w - rightMargin, topMargin); ctx.lineTo(w - rightMargin, h - bottomMargin); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, h - bottomMargin); ctx.lineTo(w, h - bottomMargin); ctx.stroke();
      }

      ctx.setLineDash([]);
      return;
    }

    const drawRoundRect = (
      x: number, y: number, width: number, height: number, radius: number, fillStyle: string,
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
    };

    if (platform === "youtube") {
      const timeStr = "12:34";
      ctx.font = "bold 24px sans-serif";
      const textWidth = ctx.measureText(timeStr).width;
      const pillW = textWidth + 24;
      const pillH = 44;
      const pillX = w - pillW - 16;
      const pillY = h - pillH - 16;
      drawRoundRect(pillX, pillY, pillW, pillH, 6, "rgba(0,0,0,0.85)");
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(timeStr, pillX + pillW / 2, pillY + pillH / 2 + 1);

    } else if (platform === "tiktok") {
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const topGrad = ctx.createLinearGradient(0, 0, 0, 200);
      topGrad.addColorStop(0, "rgba(0,0,0,0.4)");
      topGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, 200);

      ctx.font = "bold 36px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillText("Following", w / 2 - 110, 60);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("For You", w / 2 + 90, 60);
      ctx.fillRect(w / 2 + 60, 100, 80, 3);

      const iconX = w - 72;
      const drawTikTokIcon = (y: number) => {
        ctx.beginPath();
        ctx.arc(iconX, y, 34, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fill();
      };
      [780, 900, 1020, 1140, 1260, 1380].forEach(drawTikTokIcon);

      const botGrad = ctx.createLinearGradient(0, h - 520, 0, h);
      botGrad.addColorStop(0, "rgba(0,0,0,0)");
      botGrad.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, h - 520, w, 520);

      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 30px sans-serif";
      ctx.fillText("@creator_handle", 50, h - 420);
      ctx.font = "26px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillText("Your caption text wraps here... #fyp #viral", 50, h - 370);
      ctx.font = "26px sans-serif";
      ctx.fillStyle = "#a8a29e";
      ctx.fillText("🎵 Original Sound - @creator_handle", 50, h - 260);

    } else if (platform === "reels") {
      const centerX = w - 80;
      const drawReelsIcon = (yCoord: number) => {
        ctx.beginPath();
        ctx.arc(centerX, yCoord, 32, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.fill();
      };
      [900, 1010, 1120, 1230].forEach(drawReelsIcon);

      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px sans-serif";
      ctx.fillText("instagram_user", 50, h - 200);
      ctx.font = "26px sans-serif";
      ctx.fillText("Checking alignment margins for reels! 🚀", 50, h - 150);

    } else if (platform === "shorts") {
      const centerX = w - 80;
      const drawShortsIcon = (yCoord: number, label: string) => {
        ctx.beginPath();
        ctx.arc(centerX, yCoord, 38, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, centerX, yCoord + 65);
      };
      drawShortsIcon(850, "Likes");
      drawShortsIcon(980, "Dislike");
      drawShortsIcon(1110, "1,405");
      drawShortsIcon(1240, "Share");
      drawShortsIcon(1370, "Remix");

      drawRoundRect(centerX - 30, 1460, 60, 60, 8, "#1e293b");

      const bottomGrad = ctx.createLinearGradient(0, h - 450, 0, h);
      bottomGrad.addColorStop(0, "rgba(0,0,0,0)");
      bottomGrad.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, h - 450, w, 450);

      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 30px sans-serif";
      ctx.fillText("@channel_handle", 50, h - 320);

      const subBtnWidth = 160;
      const subBtnHeight = 46;
      drawRoundRect(340, h - 350, subBtnWidth, subBtnHeight, 23, "#cc0000");
      ctx.font = "bold 20px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Subscribe", 340 + subBtnWidth / 2, h - 350 + subBtnHeight / 2 + 1);

      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#ffffff";
      ctx.font = "28px sans-serif";
      ctx.fillText("Testing text alignment for YouTube Shorts!", 50, h - 250);
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("#shorts #buildinpublic #indiehackers", 50, h - 200);
      drawRoundRect(50, h - 140, 420, 50, 6, "rgba(255,255,255,0.15)");
      ctx.font = "24px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("🎵 Original Sound - @channel_handle", 70, h - 105);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* ── Sidebar ── */}
      <div className="lg:col-span-1 flex flex-col gap-6">

        <div>
          <h3 className="font-semibold text-slate-300 mb-3">1. Select Platform</h3>
          <div className="flex flex-col gap-2">
            {(["tiktok", "youtube", "shorts", "reels"] as Platform[]).map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-4 py-2 text-left rounded-lg font-medium capitalize transition-all ${
                  activePlatform === platform
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {platform === "youtube"
                  ? "YouTube Thumbnail"
                  : platform === "shorts"
                  ? "YouTube Shorts"
                  : platform}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-300 mb-2">2. Upload Asset</h3>
          {!imageSrc ? (
            <label className="block w-full text-center px-4 py-3 bg-blue-950 hover:bg-blue-900 text-blue-300 rounded-lg font-semibold text-sm cursor-pointer transition-colors border border-blue-800">
              Choose Image File
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <button
              onClick={handleClearImage}
              className="w-full text-center px-4 py-3 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-lg font-semibold text-sm cursor-pointer transition-colors border border-rose-800"
            >
              Clear Image
            </button>
          )}
        </div>

        {imageSrc && (
          <div className="border-t border-slate-700 pt-4 mt-2">
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
        )}
      </div>

      {/* ── Drop Zone ── */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`lg:col-span-3 flex justify-center items-center rounded-xl p-4 min-h-[550px] border-2 border-dashed transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-950/30"
            : "border-slate-600 bg-slate-900"
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
            <p className="text-base font-semibold text-slate-300">
              Drag &amp; drop your image here
            </p>
            <p className="text-xs mt-1 text-slate-500">Supports PNG, JPG, and WebP assets</p>
          </div>
        )}
      </div>
    </div>
  );
}
