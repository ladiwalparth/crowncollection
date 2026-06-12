"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActive(index);
  }

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  }

  if (images.length === 0) {
    return <div className="aspect-[3/4] w-full bg-[#E8DFD0]" />;
  }

  return (
    <div>
      <div ref={trackRef} onScroll={handleScroll} className="flex aspect-[3/4] w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((src, i) => (
          <div key={src} className="relative h-full w-full shrink-0 snap-center bg-[#E8DFD0]">
            <Image src={src} alt={`${name} — photo ${i + 1}`} fill priority={i === 0} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <div className="mt-3 flex justify-center gap-2 md:hidden">
            {images.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to photo ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-[#2B2622]" : "w-1.5 bg-[#C9BBA4]"}`} />
            ))}
          </div>

          <div className="mt-3 hidden gap-3 md:flex">
            {images.map((src, i) => (
              <button key={src} onClick={() => goTo(i)} aria-label={`Show photo ${i + 1}`} className={`relative h-20 w-16 shrink-0 overflow-hidden border transition ${i === active ? "border-[#2B2622]" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}