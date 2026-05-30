"use client";

import { useState } from "react";
import { T } from "@/src/lib/tokens";

interface VerseChipProps {
  verse: string;
  verseText: string;
}

export function VerseChip({ verse, verseText }: VerseChipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: T.goldPale,
          border: `1px solid ${T.gold}55`,
          color: T.charcoal,
          borderRadius: 20,
          padding: "4px 12px",
          fontSize: 11,
          cursor: "pointer",
          fontFamily: "'Georgia',serif",
          letterSpacing: "0.04em",
          fontWeight: 600,
        }}
      >
        ✝ {verse}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: 0,
            background: T.white,
            border: `1px solid ${T.gold}55`,
            borderRadius: 10,
            padding: "14px 16px",
            width: 240,
            fontSize: 13,
            color: T.charcoal,
            lineHeight: 1.7,
            zIndex: 60,
            boxShadow: "0 8px 40px rgba(0,0,0,0.13)",
            fontStyle: "italic",
          }}
        >
          &ldquo;{verseText}&rdquo;
          <div style={{ fontSize: 11, color: T.gold, marginTop: 4, fontStyle: "normal", fontWeight: 700 }}>
            — {verse}
          </div>
        </div>
      )}
    </div>
  );
}
