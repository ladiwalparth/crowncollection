import { BRAND_NAME } from "@/lib/config";

export default function Loading() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#F7F3EC]">
      <p className="animate-pulse font-serif text-xl uppercase tracking-[0.35em] text-[#B08D57]">
        {BRAND_NAME}
      </p>
    </main>
  );
}