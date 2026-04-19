"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { GlossaryTerm } from "@/data/glossary";

// ── Category patterns ────────────────────────────────────────────────────────
// Each returns an SVG filling a 176×110 viewport (card top zone).
// All strokes/fills use currentColor so they inherit the card's text colour.

function PatternFoundation() {
  return (
    <svg viewBox="0 0 176 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 18 }, (_, i) => (
        <line
          key={i}
          x1="0" y1={6 + i * 6} x2="176" y2={6 + i * 6}
          stroke="currentColor" strokeWidth="0.75" opacity={0.12 + i * 0.015}
        />
      ))}
    </svg>
  );
}

function PatternMemory() {
  return (
    <svg viewBox="0 0 176 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 11 }, (_, row) =>
        Array.from({ length: 17 }, (_, col) => {
          const seed = (row * 17 + col) * 2654435761;
          const opacity = 0.05 + ((seed >>> 0) % 20) / 100;
          return (
            <circle
              key={`${row}-${col}`}
              cx={10 + col * 10} cy={10 + row * 9}
              r="1.5" fill="currentColor" opacity={opacity}
            />
          );
        })
      )}
    </svg>
  );
}

function PatternAgent() {
  const nodes = [
    [88, 20], [40, 55], [136, 55], [22, 90], [70, 90], [110, 90], [155, 90],
  ] as const;
  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6],
  ] as const;
  return (
    <svg viewBox="0 0 176 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="currentColor" strokeWidth="1" opacity="0.2"
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i === 0 ? 5 : 3.5}
          fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35"
        />
      ))}
    </svg>
  );
}

function PatternData() {
  return (
    <svg viewBox="0 0 176 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {Array.from({ length: 10 }, (_, row) =>
        Array.from({ length: 13 }, (_, col) => {
          const seed = (row * 13 + col) * 1664525 + 1013904223;
          const opacity = 0.04 + ((seed >>> 0) % 18) / 100;
          return (
            <rect
              key={`${row}-${col}`}
              x={10 + col * 13} y={5 + row * 10}
              width="10" height="8" rx="1"
              fill="currentColor" opacity={opacity}
            />
          );
        })
      )}
    </svg>
  );
}

function PatternReadiness() {
  return (
    <svg viewBox="0 0 176 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer bracket */}
      <rect x="20" y="15" width="136" height="80" rx="3"
        stroke="currentColor" strokeWidth="1" opacity="0.18" />
      {/* Inner grid lines */}
      {[50, 80, 110, 140].map((x) => (
        <line key={x} x1={x} y1="15" x2={x} y2="95"
          stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
      ))}
      <line x1="20" y1="55" x2="156" y2="55"
        stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
      {/* Corner marks */}
      {[[20, 15], [156, 15], [20, 95], [156, 95]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="currentColor" opacity="0.3" />
      ))}
    </svg>
  );
}

function PatternOps() {
  const heights = [35, 55, 42, 68, 50, 75, 38, 62, 48, 70, 45, 58];
  return (
    <svg viewBox="0 0 176 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={12 + i * 14} y={100 - h}
          width="10" height={h} rx="1.5"
          fill="currentColor"
          opacity={0.06 + i * 0.018}
        />
      ))}
    </svg>
  );
}

const PATTERNS: Record<string, React.FC> = {
  "Foundation": PatternFoundation,
  "Memory & Knowledge": PatternMemory,
  "Agent Infrastructure": PatternAgent,
  "Data & Integration": PatternData,
  "Agent Readiness": PatternReadiness,
  "Ops & Lifecycle": PatternOps,
};

// ── Card ─────────────────────────────────────────────────────────────────────

function GlossaryCard({
  term,
  onOpen,
}: {
  term: GlossaryTerm;
  onOpen: (id: string) => void;
}) {
  const Pattern = PATTERNS[term.category] ?? PatternFoundation;

  return (
    <motion.button
      layoutId={`card-${term.id}`}
      onClick={() => onOpen(term.id)}
      className="relative flex w-44 h-64 shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl bg-fd-background text-fd-foreground"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.07)" }}
      whileHover={{ y: -5, rotate: 1, boxShadow: "0 12px 32px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.07)" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Pattern zone */}
      <div className="flex-1 overflow-hidden">
        <Pattern />
      </div>

      {/* Text zone */}
      <div className="px-4 pb-4 pt-2 text-left">
        <p className="font-mono text-[0.55rem] font-medium uppercase tracking-widest text-fd-muted-foreground">
          {term.category}
        </p>
        <p className="mt-0.5 text-2xl font-semibold tracking-tight leading-none text-fd-foreground">
          {term.acronym}
        </p>
        <p className="mt-0.5 text-[0.65rem] leading-4 text-fd-muted-foreground">
          {term.name}
        </p>
      </div>
    </motion.button>
  );
}

// ── Overlay ──────────────────────────────────────────────────────────────────

function GlossaryOverlay({
  term,
  onClose,
}: {
  term: GlossaryTerm;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const Pattern = PATTERNS[term.category] ?? PatternFoundation;

  return (
    <>
      {/* Blurry glassy backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-40 backdrop-blur-xl bg-white/60 dark:bg-zinc-950/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        {/* Panel — only layoutId here, no children layoutId */}
        <motion.div
          layoutId={`card-${term.id}`}
          className="pointer-events-auto w-full max-w-md overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 36 }}
        >
          {/* Pattern banner */}
          <div className="relative h-36 overflow-hidden bg-zinc-950 text-zinc-200">
            <Pattern />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content — fades in after the card morph settles */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.22 }}
            className="px-7 pb-7 pt-5"
          >
            <p className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-zinc-400">
              {term.category}
            </p>
            <p className="mt-2 text-4xl font-semibold tracking-tight leading-none text-zinc-900">
              {term.acronym}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {term.name}
            </p>

            <div className="my-4 h-px bg-zinc-200" />

            <p className="text-sm font-medium leading-6 text-zinc-800">
              {term.definition}
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-500">
              {term.detail}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

// ── Filter pills ─────────────────────────────────────────────────────────────

const ALL = "All";

function FilterPills({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {[ALL, ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            active === cat
              ? "border-fd-foreground bg-fd-foreground text-fd-background"
              : "border-fd-border text-fd-muted-foreground hover:border-fd-ring hover:text-fd-foreground"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────

export function GlossaryGrid({ terms }: { terms: GlossaryTerm[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState(ALL);

  const categories = Array.from(new Set(terms.map((t) => t.category)));
  const visible = filter === ALL ? terms : terms.filter((t) => t.category === filter);
  const activeTerm = terms.find((t) => t.id === activeId) ?? null;

  useEffect(() => {
    document.body.style.overflow = activeId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeId]);

  return (
    <>
      {categories.length > 1 && (
        <FilterPills categories={categories} active={filter} onChange={setFilter} />
      )}

      {/* Horizontal scroll row — extends to viewport right edge */}
      <div className="mt-5 -mr-[calc(50vw-50%)]">
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((term) => (
              <GlossaryCard key={term.id} term={term} onOpen={setActiveId} />
            ))}
          </AnimatePresence>
          <div className="w-6 shrink-0" aria-hidden="true" />
        </div>
      </div>

      <AnimatePresence>
        {activeTerm && (
          <GlossaryOverlay term={activeTerm} onClose={() => setActiveId(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
