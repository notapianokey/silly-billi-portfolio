"use client";

import {
  ClipboardListIcon,
  ImagesIcon,
  LayoutGridIcon,
  MegaphoneIcon,
  SettingsIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", icon: LayoutGridIcon },
  { label: "Campaigns", icon: MegaphoneIcon, active: true },
  { label: "Audiences", icon: UsersIcon },
  { label: "Creative", icon: ImagesIcon },
  { label: "Automated rules", icon: ZapIcon },
  { label: "Reports", icon: ClipboardListIcon },
];

/** Own dedicated chrome for the Marketing & Ads dashboard clone — deliberately not the site's
 *  YouTube-styled SidebarRail. Same reasoning as the Instagram clone: stacking our own site nav
 *  next to a platform-clone's own nav breaks the "reads as the real thing" illusion the whole
 *  page exists for. The Silly Billi mark at the top doubles as the way back to the rest of the
 *  site, same role a workspace switcher plays in a real ads dashboard. */
export function AdsSidebar() {
  return (
    <aside className="fixed top-0 left-0 hidden h-screen w-60 flex-col border-r bg-card md:flex">
      <Link href="/" className="flex items-center gap-2 border-b px-4 py-4">
        <Image
          src="/brand/mascot.png"
          alt=""
          width={28}
          height={28}
          className="size-7 rounded-md object-cover"
        />
        <div className="leading-tight">
          <p className="text-sm font-semibold">Silly Billi Ads</p>
          <p className="text-xs text-muted-foreground">Manager</p>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5 px-2 py-3">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            aria-current={item.active ? "page" : undefined}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground aria-[current=page]:bg-accent aria-[current=page]:font-medium aria-[current=page]:text-accent-foreground"
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t px-4 py-3 text-sm text-muted-foreground">
        <SettingsIcon className="size-4 shrink-0" />
        Ad account settings
      </div>
    </aside>
  );
}
