"use client";

import { useEffect } from "react";
import { ADVANCEMENT_META, CATEGORY_COLOR, CATEGORY_LABEL, formatLabel, shortKey } from "../lib/advancements";

interface AdvancementData {
  done: boolean;
  criteria: Record<string, string>;
}

interface Props {
  rawKey: string;
  data: AdvancementData;
  onClose: () => void;
}

const AchievementModal = ({ rawKey, data, onClose }: Props) => {
  const key = shortKey(rawKey);
  const meta = ADVANCEMENT_META[key];

  const title = meta?.title ?? formatLabel(key.split("/").pop() ?? key);
  const description = meta?.description ?? "No description available yet.";
  const category = meta?.category;
  const accent = category ? CATEGORY_COLOR[category] : "var(--text-muted)";
  const checklist = meta?.checklist;

  const doneCount = checklist
    ? checklist.filter((item) => item.key in (data.criteria ?? {})).length
    : Object.keys(data.criteria ?? {}).length;
  const total = checklist?.length ?? doneCount;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-(--panel) border-2 border-(--border-light) shadow-2xl"
        style={{ boxShadow: `0 0 0 1px ${accent}33 inset` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 p-5 border-b border-(--border)">
          <div
            className="h-12 w-12 flex-none border-2 border-black flex items-center justify-center text-xl"
            style={{
              background: data.done ? `linear-gradient(135deg, ${accent}, var(--gold-dim))` : "var(--panel-raised)",
              color: data.done ? "#1a1420" : "var(--text-dim)",
            }}
          >
            {data.done ? "✓" : "🔒"}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-pixel text-[13px] leading-snug text-(--text)">{title}</h2>
            <div className="flex items-center gap-2 mt-2">
              {category && (
                <span
                  className="text-[10px] uppercase tracking-wide font-mono border px-1.5 py-0.5"
                  style={{ color: accent, borderColor: accent }}
                >
                  {CATEGORY_LABEL[category]}
                </span>
              )}
              <span
                className={`text-[10px] uppercase tracking-wide font-mono px-1.5 py-0.5 border ${
                  data.done ? "border-(--gold) text-(--gold)" : "border-(--border-light) text-(--text-dim)"
                }`}
              >
                {data.done ? "Earned" : "Locked"}
              </span>
            </div>
          </div>

          <button onClick={onClose} className="text-(--text-dim) hover:text-(--text) text-lg leading-none px-1" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="p-5 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <p className="text-sm text-(--text-muted) leading-relaxed">{description}</p>

          {checklist && (
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-pixel text-[10px] text-(--text-muted)">Progress</span>
                <span className="font-mono text-[12px]" style={{ color: accent }}>
                  {doneCount}/{total}
                </span>
              </div>
              <div className="h-2 bg-black border border-black mb-4">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${(doneCount / total) * 100}%`,
                    background: `repeating-linear-gradient(90deg, ${accent}, ${accent} 6px, var(--gold-dim) 6px, var(--gold-dim) 12px)`,
                  }}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {checklist.map((item) => {
                  const earned = item.key in (data.criteria ?? {});
                  return (
                    <div
                      key={item.key}
                      className={`flex items-center gap-1.5 px-2 py-1.5 text-[11px] border ${
                        earned ? "border-(--gold-dim) text-(--text)" : "border-(--border) text-(--text-dim)"
                      }`}
                      style={earned ? { background: "var(--panel-raised)" } : undefined}
                    >
                      <span style={{ color: earned ? accent : "var(--text-dim)" }}>{earned ? "✓" : "·"}</span>
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!checklist && Object.keys(data.criteria ?? {}).length > 0 && (
            <div className="mt-5">
              <span className="font-pixel text-[10px] text-(--text-muted)">Criteria met</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Object.keys(data.criteria).map((c) => (
                  <span key={c} className="text-[11px] font-mono px-2 py-1 border border-(--border-light) text-(--text-muted)">
                    {formatLabel(c)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementModal;