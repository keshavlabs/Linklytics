"use client";

import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { useLinks } from "@/hooks/useLinks";
import QRDownloadButton from "./QRDownloadButton";
import Select from "@/components/ui/select";

export default function QRGenerator() {
  const { data } = useLinks(1, 100);
  const [selectedLinkUrl, setSelectedLinkUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#111827");
  const [size, setSize] = useState(256);
  const qrRef = useRef(null);

  const url =
    customUrl || selectedLinkUrl || `${process.env.NEXT_PUBLIC_APP_URL}/`;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="card p-6 space-y-5">
        <Select
          label="Select a short link"
          value={selectedLinkUrl}
          onChange={(e) => {
            setSelectedLinkUrl(e.target.value);
            setCustomUrl("");
          }}
        >
          <option value="">— Choose a link —</option>
          {data?.links?.map((l) => (
            <option
              key={l.id}
              value={`${process.env.NEXT_PUBLIC_APP_URL}/${l.slug}`}
            >
              /{l.slug}
              {l.title ? ` — ${l.title}` : ""}
            </option>
          ))}
        </Select>

        <div>
          <label className="label">Or enter any URL</label>
          <input
            className="input"
            placeholder="https://example.com"
            value={customUrl}
            onChange={(e) => {
              setCustomUrl(e.target.value);
              setSelectedLinkUrl("");
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Foreground color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer bg-transparent border border-gray-700 p-0.5"
              />
              <input
                className="input flex-1 font-mono text-sm"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="label">Background color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer bg-transparent border border-gray-700 p-0.5"
              />
              <input
                className="input flex-1 font-mono text-sm"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="label">Size: {size}px</label>
          <input
            type="range"
            min={128}
            max={512}
            step={32}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full accent-brand-500"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>128px</span>
            <span>512px</span>
          </div>
        </div>

        <QRDownloadButton svgRef={qrRef} filename="Linklytics-qr" size={size} />
      </div>

      {/* Preview */}
      <div className="card p-8 flex flex-col items-center justify-center gap-6">
        <p className="text-gray-500 text-xs uppercase tracking-widest">
          Preview
        </p>
        <div
          ref={qrRef}
          className="rounded-2xl overflow-hidden p-5 shadow-2xl transition-all duration-300"
          style={{ background: bgColor }}
        >
          <QRCode
            value={url}
            size={Math.min(size, 240)}
            fgColor={fgColor}
            bgColor={bgColor}
          />
        </div>
        <p className="text-gray-600 text-xs text-center max-w-xs break-all">
          {url}
        </p>
      </div>
    </div>
  );
}
