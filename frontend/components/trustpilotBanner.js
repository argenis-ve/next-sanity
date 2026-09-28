import React from "react";

export default function TrustpilotBanner() {
  // 🎨 Cambia estos valores por tu código RGB exacto:
  const textColor = "rgb(55, 56, 59)";          // <-- Tu color de texto aquí

  return (
    <div
      className="py-3 text-center border-b"
      style={{ color: textColor }}
    >
      <div className="flex items-center justify-center gap-1 text-emerald-500 mb-1">
        {/* 5 Estrellas estilo Trustpilot */}
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-sm font-medium">
        1,200+ homes renovated • Rated <span className="font-bold">Excellent</span> on{" "}
        <a
          href="https://www.trustpilot.com/review/freemodel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80"
        >
          Trustpilot
        </a>
      </p>
    </div>
  );
}