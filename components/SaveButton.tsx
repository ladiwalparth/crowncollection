"use client";

import { useEffect, useState } from "react";
import { useSaved, type SavedItem } from "@/store/saved";

export default function SaveButton({
  item,
  variant = "icon",
}: {
  item: SavedItem;
  variant?: "icon" | "button";
}) {
  const items = useSaved((s) => s.items);
  const toggle = useSaved((s) => s.toggle);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const saved = mounted && items.some((i) => i.id === item.id);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(item);
  }

  const bookmark = (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );

  if (variant === "button") {
    return (
      <button onClick={handleClick} className={`flex items-center justify-center gap-2 border border-[#2B2622] px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] transition ${saved ? "bg-[#2B2622] text-white" : "text-[#2B2622] hover:bg-[#2B2622] hover:text-white"}`}>
        {bookmark}
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button onClick={handleClick} aria-label={saved ? "Remove from saved items" : "Save item"} className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition ${saved ? "bg-[#2B2622] text-white" : "bg-white/85 text-[#2B2622] hover:bg-white"}`}>
      {bookmark}
    </button>
  );
}