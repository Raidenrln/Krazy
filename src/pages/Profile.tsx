import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import AchievementModal from "../components/AchievementModal";
import { useProfile } from "../context/ProfileContext";
import {
  ADVANCEMENT_META,
  CATEGORY_COLOR,
  CATEGORY_LABEL,
  type AdvancementCategory,
  shortKey,
} from "../lib/advancements";

const TABS: ("all" | AdvancementCategory)[] = ["all", "story", "nether", "end", "adventure", "husbandry"];

const Profile = () => {
  const { profile, loading } = useProfile();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [tab, setTab] = useState<"all" | AdvancementCategory>("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "done" | "undone">("all");

  const entries = useMemo(() => {
    if (!profile) return [];
    // Build against the full known advancement catalog (not just what's in the
    // save file), so players who haven't discovered/earned an advancement yet
    // still see it listed as locked, and totals are consistent across players.
    return Object.keys(ADVANCEMENT_META).map((key) => {
      const rawKey = `minecraft:${key}`;
      const data = profile.advancements[rawKey] as { done: boolean; criteria: Record<string, string> } | undefined;
      return [rawKey, data ?? { done: false, criteria: {} }] as [string, { done: boolean; criteria: Record<string, string> }];
    });
  }, [profile]);

  const overallDone = entries.filter(([, v]) => (v as any).done).length;
  const overallTotal = entries.length;

  const filtered = useMemo(() => {
    return entries.filter(([key, value]) => {
      const meta = ADVANCEMENT_META[shortKey(key)];
      const done = (value as any).done;
      if (tab !== "all" && meta?.category !== tab) return false;
      if (status === "done" && !done) return false;
      if (status === "undone" && done) return false;
      if (search) {
        const title = meta?.title ?? key.split("/").pop() ?? "";
        if (!title.toLowerCase().includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [entries, tab, status, search]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-white">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Topbar />

      <main className="flex-1 w-full px-6 pt-6 pb-10">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-2">
          {/* Profile */}
          <div className="w-full md:w-1/3 p-6 text-white flex flex-col items-center border border-(--border-light) bg-(--bg) h-fit">
            <div className="h-20 w-20 border border-(--border-light) mb-3">
              <img src={`https://mc-heads.net/avatar/${profile.uuid}/80`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold font-pixel text-[13px]">{profile.name}</span>

            <div className="w-full mt-6 font-mono text-[13px]">
              <div className="px-3 py-4 flex items-center justify-between border-b border-(--border-light)">
                <span>UUID</span>
                <span className="text-right break-all ml-4">{profile.uuid}</span>
              </div>
              <div className="px-3 py-4 flex items-center justify-between">
                <span>Advancements</span>
                <span style={{ color: overallDone === overallTotal ? "var(--gold)" : "var(--text)" }}>
                  {overallDone}/{overallTotal}
                </span>
              </div>
              <div className="px-3 pb-4">
                <div className="h-2 bg-black border border-black">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${(overallDone / overallTotal) * 100}%`,
                      background:
                        "repeating-linear-gradient(90deg, var(--gold), var(--gold) 6px, var(--gold-dim) 6px, var(--gold-dim) 12px)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="w-full md:w-2/3 p-6 text-white border border-(--border-light) bg-(--bg)">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-lg font-semibold font-pixel text-[13px]">Achievements</h2>
              <span className="font-mono text-[12px] text-(--text-muted)">
                {overallDone}/{overallTotal}
              </span>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {TABS.map((t) => {
                const active = tab === t;
                const color = t === "all" ? "var(--gold)" : CATEGORY_COLOR[t];
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`text-[11px] font-mono px-3 py-1.5 border transition-colors ${
                      active ? "text-(--text)" : "text-(--text-muted) border-(--border)"
                    }`}
                    style={active ? { borderColor: color, background: "var(--panel-raised)" } : undefined}
                  >
                    {t === "all" ? "All" : CATEGORY_LABEL[t]}
                  </button>
                );
              })}
            </div>

            {/* Search + status filter */}
            <div className="flex gap-2 mb-5 flex-wrap">
              <input
                type="text"
                placeholder="Search achievements..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-45 bg-(--panel-raised) border border-(--border-light) px-3 py-2 text-sm text-(--text) placeholder:text-(--text-dim)"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="bg-(--panel-raised) border border-(--border-light) px-3 py-2 text-sm text-(--text)"
              >
                <option value="all">All statuses</option>
                <option value="done">Done only</option>
                <option value="undone">Undone only</option>
              </select>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-(--text-dim) text-sm py-10 text-center">No achievements match this filter.</div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[60vh] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {filtered.map(([key, value]) => {
                  const meta = ADVANCEMENT_META[shortKey(key)];
                  const done = (value as any).done;
                  const accent = meta ? CATEGORY_COLOR[meta.category] : "var(--border-light)";
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedKey(key)}
                      className="text-left border p-4 transition-colors"
                      style={{
                        borderColor: done ? "var(--gold-dim)" : "var(--border)",
                        opacity: done ? 1 : 0.65,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{meta?.title ?? key.split("/").pop()}</span>
                        <span style={{ color: done ? "var(--gold)" : "var(--text-dim)" }}>{done ? "✓" : "🔒"}</span>
                      </div>
                      {meta && (
                        <span
                          className="inline-block mt-2 text-[10px] uppercase tracking-wide font-mono border px-1.5 py-0.5"
                          style={{ color: accent, borderColor: accent }}
                        >
                          {CATEGORY_LABEL[meta.category]}
                        </span>
                      )}
                      <p className="text-xs opacity-60 mt-1">{done ? "Earned" : "Locked"}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedKey && (
        <AchievementModal
          rawKey={selectedKey}
          data={(profile.advancements[selectedKey] as any) ?? { done: false, criteria: {} }}
          onClose={() => setSelectedKey(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Profile;