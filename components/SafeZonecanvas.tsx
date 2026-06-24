"use client";

import { useState, useRef, useEffect } from "react";

type Platform = "youtube" | "tiktok" | "reels";

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

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const handleClearImage = () => {
    // 1. Revoke the object URL to free up browser memory cache
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }

    // 2. Reset states back to default
    setImageSrc(null);

    // 3. Reset the DOM input value so the same file can be re-uploaded safely
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

      // 2. MATHEMATICS TO PRESERVE ASPECT RATIO (Letterboxing/Centering)
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;

      let renderWidth, renderHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        // Image is wider than the target canvas ratio
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - renderHeight) / 2;
      } else {
        // Image is taller than the target canvas ratio (like your cowboy asset on YouTube)
        renderWidth = canvas.height * imgRatio;
        renderHeight = canvas.height;
        offsetX = (canvas.width - renderWidth) / 2;
        offsetY = 0;
      }

      // Fill background with a clean dark neutral color for empty frame space
      ctx.fillStyle = "#1e293b"; // slate-800
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the image cleanly using computed centering ratios
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

      drawOverlays(ctx, canvas.width, canvas.height, activePlatform);
    };
  }, [imageSrc, activePlatform, showGridOnly]);

  //The mask overlay calculations
  const drawOverlays = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    platform: Platform,
  ) => {
    if (showGridOnly) {
      ctx.strokeStyle = "rgba(239, 68, 68, 0.8)"; // Clean red line border
      ctx.lineWidth = 4;
      ctx.setLineDash([15, 10]); // Creates a dashed pattern [dash length, gap length]
      
      if (platform === "youtube") {
        // Just highlight the bottom-right timestamp bounding area
        ctx.strokeRect(w - 184 - 16, h - 44 - 16, 184, 44);
      } else {
        // TikTok / Reels standard layout boundary guides
        const topMargin = 160;
        const rightMargin = 140;
        const bottomMargin = platform === "tiktok" ? 480 : 380;

        // Draw top header boundary
        ctx.beginPath();
        ctx.moveTo(0, topMargin);
        ctx.lineTo(w, topMargin);
        ctx.stroke();

        // Draw right sidebar interaction boundary
        ctx.beginPath();
        ctx.moveTo(w - rightMargin, topMargin);
        ctx.lineTo(w - rightMargin, h - bottomMargin);
        ctx.stroke();

        // Draw bottom caption metadata boundary
        ctx.beginPath();
        ctx.moveTo(0, h - bottomMargin);
        ctx.lineTo(w, h - bottomMargin);
        ctx.stroke();
      }

      // Reset line dash setting so it doesn't affect other components later
      ctx.setLineDash([]);
      return; // Stop execution here so realistic UI elements don't draw
    }
    // Helper function to draw rounded rectangles (useful for buttons/pills)
    const drawRoundRect = (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
      fillStyle: string,
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height,
      );
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
    };

    if (platform === "youtube") {
      // ==========================================
      // YOUTUBE THUMBNAIL HIGH-FIDELITY OVERLAYS
      // ==========================================

      // Dynamic Timestamp Pill (Bottom Right)
      const timeStr = "12:34";
      ctx.font = "bold 24px sans-serif";
      const textWidth = ctx.measureText(timeStr).width;

      const pillW = textWidth + 24; // Padding
      const pillH = 44;
      const pillX = w - pillW - 16;
      const pillY = h - pillH - 16;

      // Draw standard semi-transparent dark YouTube pill
      drawRoundRect(pillX, pillY, pillW, pillH, 6, "rgba(0, 0, 0, 0.85)");

      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(timeStr, pillX + pillW / 2, pillY + pillH / 2 + 1);
    } else if (platform === "tiktok") {
      // ==========================================
      // TIKTOK INTERACTIVE OVERLAYS (9:16)
      // ==========================================

      // 1. Top Header: "Following | For You"
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      // Soft background gradient gradient for header text readability
      const topGrad = ctx.createLinearGradient(0, 0, 0, 200);
      topGrad.addColorStop(0, "rgba(0,0,0,0.4)");
      topGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, 200);

      ctx.font = "bold 36px sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fillText("Following", w / 2 - 110, 60);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("For You", w / 2 + 110, 60);

      // Small active underline bar for "For You"
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(w / 2 + 50, 115, 120, 5);

      // 2. Right Sidebar: Creator Engagement Stack
      const centerX = w - 80; // Core axis line for icons

      // Profile Avatar Circle
      ctx.beginPath();
      ctx.arc(centerX, 600, 50, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX, 600, 47, 0, Math.PI * 2);
      ctx.fillStyle = "#2f2f2f";
      ctx.fill();
      // Little pink "+" follow badge
      ctx.beginPath();
      ctx.arc(centerX, 645, 16, 0, Math.PI * 2);
      ctx.fillStyle = "#fe2c55";
      ctx.fill();

      // Action Icons (Heart, Comment, Bookmark, Share)
      const drawActionIcon = (yCoord: number, label: string) => {
        // Draw standard representation circles for icons
        ctx.beginPath();
        ctx.arc(centerX, yCoord, 40, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fill();

        // Text sub-metrics
        ctx.font = "bold 22px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(label, centerX, yCoord + 65);
      };

      drawActionIcon(750, "94.2K"); // Heart / Like
      drawActionIcon(890, "1,240"); // Comment bubble
      drawActionIcon(1030, "12.5K"); // Bookmark / Favorite
      drawActionIcon(1170, "Share"); // Share Arrow

      // Rotating Audio Vinyl Disc (Bottom Right)
      ctx.beginPath();
      ctx.arc(centerX, 1330, 45, 0, Math.PI * 2);
      ctx.fillStyle = "#111111";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX, 1330, 15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fill();

      // 3. Bottom Text Overlays: Metadata & Captions
      const bottomGrad = ctx.createLinearGradient(0, h - 400, 0, h);
      bottomGrad.addColorStop(0, "rgba(0,0,0,0)");
      bottomGrad.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, h - 400, w, 400);

      ctx.textAlign = "left";
      ctx.fillStyle = "#ffffff";

      ctx.font = "bold 32px sans-serif";
      ctx.fillText("@creator_handle", 50, h - 300);

      ctx.font = "30px sans-serif";
      ctx.fillStyle = "#f1f1f1";
      ctx.fillText(
        "This is an example description text showing how captions",
        50,
        h - 240,
      );
      ctx.fillText(
        "wrap dynamically over your media asset... #shorts #mcu",
        50,
        h - 190,
      );

      // Audio track marker
      ctx.font = "26px sans-serif";
      ctx.fillStyle = "#a8a29e";
      ctx.fillText("🎵 Original Sound - @creator_handle", 50, h - 110);
    } else if (platform === "reels") {
      // ==========================================
      // INSTAGRAM REELS OVERLAYS (9:16)
      // ==========================================
      const centerX = w - 80;

      // Bottom/Right Gradient block for text legibility
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      // Sidebar Icons (Instagram Style)
      const drawReelsIcon = (yCoord: number) => {
        ctx.beginPath();
        ctx.arc(centerX, yCoord, 32, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fill();
      };

      drawReelsIcon(900); // Like
      drawReelsIcon(1010); // Comment
      drawReelsIcon(1120); // DM / Paper Plane
      drawReelsIcon(1230); // Context menu (...)

      // Bottom User Details
      ctx.textAlign = "left";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px sans-serif";
      ctx.fillText("instagram_user", 50, h - 200);

      ctx.font = "26px sans-serif";
      ctx.fillText("Checking out alignment margins for reels! 🚀", 50, h - 150);
    }
  };

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
          {!imageSrc ? (
            // Show this upload trigger if no image is loaded
            <label className="block w-full text-center px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold text-sm cursor-pointer transition-colors border border-blue-200">
              Choose Image File
              <input
                ref={fileInputRef} // 👈 Attach the ref here
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            // Show the Clear action button if an image is actively loaded
            <button
              onClick={handleClearImage}
              className="w-full text-center px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-semibold text-sm cursor-pointer transition-colors border border-rose-200"
            >
              Clear Image
            </button>
          )}
        </div>
        {imageSrc && (
          <div className="border-t border-slate-100 pt-4 mt-2">
            <h3 className="font-semibold text-slate-700 mb-3">3. Preferences</h3>
            <label className="flex items-center gap-3 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={showGridOnly}
                onChange={(e) => setShowGridOnly(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                Show Safe-Zone Grid Only
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Main Preview Board Canvas */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`lg:col-span-3 flex justify-center items-center rounded-xl p-4 min-h-137.5 border-2 border-dashed transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50/50"
            : "border-slate-200 bg-slate-50"
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
            <p className="text-base font-semibold text-slate-600">
              Drag & drop your image here
            </p>
            <p className="text-xs mt-1">Supports PNG, JPG, and WebP assets</p>
          </div>
        )}
      </div>
    </div>
  );
}
