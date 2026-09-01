import { CursorTrail } from "@/components/cursor-trail";

export default function Home() {
  return (
    <main className="touch-none flex min-h-screen flex-1 items-center justify-center">
      <h1 className="select-none px-6 text-center font-[family-name:var(--font-display)] text-6xl font-extrabold tracking-tight sm:text-8xl">
        Silly Billi Studio
      </h1>
      <CursorTrail />
    </main>
  );
}
