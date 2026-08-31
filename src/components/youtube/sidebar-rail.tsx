"use client";

import { ClockIcon, HomeIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const ITEMS = [
  { label: "Home", icon: HomeIcon, href: "/" },
  { label: "Shorts", icon: ShortsIcon, href: "#shorts" },
  { label: "Subscriptions", icon: SubscriptionsIcon, href: null },
  { label: "You", icon: UserIcon, href: null },
  { label: "History", icon: ClockIcon, href: null },
] as const;

export function SidebarRail() {
  return (
    <aside className="fixed top-14 left-0 hidden h-[calc(100vh-3.5rem)] w-60 flex-col overflow-y-auto px-3 py-3 md:flex">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const content = (
          <span className="flex w-full items-center gap-4 rounded-lg px-3 py-2.5 text-sm hover:bg-accent">
            <Icon className="size-5 shrink-0" />
            {item.label}
          </span>
        );

        return item.href ? (
          <Link key={item.label} href={item.href}>
            {content}
          </Link>
        ) : (
          <span key={item.label} className="cursor-default opacity-80">
            {content}
          </span>
        );
      })}
    </aside>
  );
}

function ShortsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.5 4.5 15 8.2 9.5 12V4.5Z" opacity="0" />
      <rect x="3" y="3" width="18" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8.2 15 12l-5 3.8V8.2Z" />
    </svg>
  );
}

function SubscriptionsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M4 8.5 12 3l8 5.5" />
      <rect x="5" y="8.5" width="14" height="11.5" rx="1.5" />
      <path d="M9.5 13.2 12 15.5l2.5-2.3" />
    </svg>
  );
}
