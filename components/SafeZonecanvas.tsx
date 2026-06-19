"use client";

import { useState, useRef, useEffect } from "react";

type Platform = "youtube" | "tiktok" | "reels";

export default function SafeZoneCanvas() {
  const [activePlatform, setActivePlatform] = useState<Platform>("tiktok");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const processFile = (file: File | undefined) => {
    if (file && file.type.startsWith("image/")){
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0]);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  }

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    imageRef.current = img;

    img.onload = () => {
      if (activePlatform === "youtube"){
        canvas.width = 1280;
        canvas.height = 720;
      } else {
        canvas.width = 1080;
        canvas.height = 1920;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      drawOverlays(ctx, canvas.width, canvas.height, activePlatform);
    };
  }, [imageSrc, activePlatform]);

  //The mask overlay calculations
  const drawOverlays = (ctx: CanvasRenderingContext2D, w: number, h: number, platform: Platform) => {
    ctx.fillStyle = "rgba(239, 68, 68, 0.35)";
    ctx.font = "bold 24px sans-serif";

    if(platform === "youtube"){
      const pillW = 160;
      const pillH = 50;
      const pillX = w - pillW - 20;
      const pillY = h - pillH - 20;

      ctx.fillRect(pillX, pillY, pillW, pillH);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("00:00", pillX + 45, pillY + 33);
    } else {
      ctx.fillRect(0, 0, w, 160);

      const sidebarWidth = 140;
      ctx.fillRect(w - sidebarWidth, 400, sidebarWidth, 1100);
      // Bottom Caption & Meta Text Deck
      const bottomHeight = platform === "tiktok" ? 480 : 380; // TikTok needs slightly more clearance
      ctx.fillRect(0, h - bottomHeight, w, bottomHeight);

      //Text indicators for guidance
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 40px sans-serif";
      ctx.fillText("Header Clutter", 40, 100);
      ctx.fillText("Caption / Action Danger Zone", 40, h - 100);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <div>
          <h3 className="font-semibold text-slate-700 mb-3">
            1. Select Platform
          </h3>
          <div className="flex flex-col gap-2">
            {(["tiktok", "youtube", "reels"] as Platform[]).map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-4 py-2 text-left rounded-lg font-medium capitalize transition-all ${
                  activePlatform === platform
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {platform === "youtube" ? "YouTube Thumbnail" : platform}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-700 mb-2">2. Upload Asset</h3>
          <label className="block w-full text-center px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold text-sm cursor-pointer transition-colors border border-blue-200">
            Choose Image File
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Main Preview Board Canvas */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`lg:col-span-3 flex justify-center items-center rounded-xl p-4 min-h-137.5 border-2 border-dashed transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50/50" : "border-slate-200 bg-slate-50"
        }`}
      >
        {imageSrc ? (
          <div className="relative shadow-xl max-h-150 overflow-auto bg-slate-900 rounded-lg p-2">
            <canvas 
              ref={canvasRef} 
              className={`max-h-135 w-auto h-auto object-contain mx-auto block ${
                activePlatform === "youtube" ? "aspect-video" : "aspect-9/16"
              }`}
            />
          </div>
        ) : (
          <div className="text-center text-slate-400 select-none pointer-events-none">
            <p className="text-base font-semibold text-slate-600">Drag & drop your image here</p>
            <p className="text-xs mt-1">Supports PNG, JPG, and WebP assets</p>
          </div>
        )}
      </div>
    </div>
  );
}
