import Image from "next/image";
import Link from "next/link";

interface ComingSoonProps {
  title: string;
  description?: string;
}

/** Placeholder for nav destinations that don't have real content/design yet. */
export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <Image src="/brand/mascot.png" alt="" width={64} height={64} className="rounded-full" />
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-md text-muted-foreground">
        {description ?? "This page is coming soon."}
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full border px-5 py-2 text-sm font-medium hover:bg-accent"
      >
        Back to Home
      </Link>
    </main>
  );
}
