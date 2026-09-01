"use client";

import {
  BriefcaseIcon,
  ChevronDownIcon,
  ClapperboardIcon,
  FileTextIcon,
  HandshakeIcon,
  HomeIcon,
  InfoIcon,
  ListVideoIcon,
  MegaphoneIcon,
  MonitorPlayIcon,
  PaletteIcon,
  UserPlusIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

type NavIcon = React.ComponentType<{ className?: string }>;
interface NavItem {
  label: string;
  icon: NavIcon;
  href: string;
}

const TOP_ITEMS: NavItem[] = [
  { label: "Home", icon: HomeIcon, href: "/video-editing" },
  { label: "Shorts", icon: ShortsIcon, href: "/video-editing#shorts" },
  { label: "Long Form", icon: MonitorPlayIcon, href: "/video-editing#long-form" },
  { label: "Channels We Managed", icon: ListVideoIcon, href: "/channels-we-managed" },
  { label: "About Us", icon: InfoIcon, href: "/about" },
];

const SERVICE_ITEMS: NavItem[] = [
  { label: "Video Editing", icon: ClapperboardIcon, href: "/video-editing" },
  { label: "Visual Branding", icon: PaletteIcon, href: "/visual-branding" },
  { label: "Editorial Direction", icon: FileTextIcon, href: "/editorial-direction" },
  { label: "Marketing & Ads", icon: MegaphoneIcon, href: "/marketing-ads" },
];

const BOTTOM_ITEMS: NavItem[] = [
  { label: "Hire Us", icon: HandshakeIcon, href: "/hire-us" },
  { label: "Join Us", icon: UserPlusIcon, href: "/join-us" },
];

export function SidebarRail() {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <aside className="fixed top-14 left-0 hidden h-[calc(100vh-3.5rem)] w-60 flex-col overflow-y-auto px-3 py-3 md:flex">
      {TOP_ITEMS.map((item) => (
        <NavLink key={item.label} {...item} />
      ))}

      <button
        type="button"
        onClick={() => setServicesOpen((current) => !current)}
        className="flex w-full items-center gap-4 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-accent"
      >
        <BriefcaseIcon className="size-5 shrink-0" />
        Our Services
        <ChevronDownIcon
          className={cn(
            "ml-auto size-4 shrink-0 transition-transform",
            servicesOpen && "rotate-180",
          )}
        />
      </button>
      {servicesOpen && (
        <div className="flex flex-col">
          {SERVICE_ITEMS.map((item) => (
            <NavLink key={item.label} {...item} indent />
          ))}
        </div>
      )}

      {BOTTOM_ITEMS.map((item) => (
        <NavLink key={item.label} {...item} />
      ))}
    </aside>
  );
}

function NavLink({ label, icon: Icon, href, indent }: NavItem & { indent?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex w-full items-center gap-4 rounded-lg py-2.5 text-sm hover:bg-accent",
        indent ? "pl-9 pr-3" : "px-3",
      )}
    >
      <Icon className="size-5 shrink-0" />
      {label}
    </Link>
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
