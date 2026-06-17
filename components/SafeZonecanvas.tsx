"use client";

import { useState } from "react";

type Platform = "youtube" | "tiktok" | "reels";

export default function SafeZoneCanvas() {
  const [activePlatform, setActivePlatform] = useState<Platform>("tiktok");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
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
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Main Preview Board Canvas */}
      <div className="lg:col-span-3 flex justify-center items-center bg-slate-50 rounded-xl p-4 min-h-[500px] border border-dashed border-slate-200">
        {imagePreview ? (
          <div className="relative border shadow-md max-h-[600px] overflow-hidden bg-black">
            {/* Temporary placeholder image tag before attaching Canvas operations */}
            <img
              src={imagePreview}
              alt="Preview"
              className={`max-h-[550px] object-contain ${
                activePlatform === "youtube" ? "aspect-video" : "aspect-[9/16]"
              }`}
            />

            {/* Conceptual UI Overlay Indicator */}
            <div className="absolute inset-0 bg-red-500/20 pointer-events-none flex items-center justify-center">
              <span className="bg-slate-900/80 text-white text-xs px-3 py-1.5 rounded-full font-mono">
                {activePlatform.toUpperCase()} UI Safe-Zone Layer Active
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-400">
            <p className="text-base font-medium">No image loaded yet.</p>
            <p className="text-xs mt-1">
              Select a platform and upload a configuration to begin testing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
