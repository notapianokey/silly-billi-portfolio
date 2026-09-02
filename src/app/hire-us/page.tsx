"use client";

import {
  ClapperboardIcon,
  FileTextIcon,
  MegaphoneIcon,
  PaletteIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ContactForm } from "@/components/contact-form";
import { SidebarRail } from "@/components/youtube/sidebar-rail";
import { TopHeader } from "@/components/youtube/top-header";

const STATS = [
  { label: "Videos delivered", value: "4000+" },
  { label: "Channels monetized", value: "6" },
  { label: "Disciplines", value: "4" },
];

const SERVICES = [
  {
    icon: ClapperboardIcon,
    label: "Video Editing",
    description: "Podcast reels, documentaries, and talking-head cuts built to hold attention.",
    href: "/video-editing",
  },
  {
    icon: PaletteIcon,
    label: "Visual Branding",
    description: "Identity systems and creative direction that make a channel feel like a brand.",
    href: "/visual-branding",
  },
  {
    icon: FileTextIcon,
    label: "Editorial Direction",
    description: "Scripting, structure, and story strategy behind the work that performs.",
    href: "/editorial-direction",
  },
  {
    icon: MegaphoneIcon,
    label: "Marketing & Ads",
    description: "Campaign strategy and performance creative to grow reach that converts.",
    href: "/marketing-ads",
  },
];

const PROCESS = [
  { step: "1", title: "Reach out", description: "Tell us about the channel or campaign you need help with." },
  { step: "2", title: "Discovery call", description: "We talk scope, goals, and whether we're the right fit." },
  { step: "3", title: "Proposal", description: "A clear plan — deliverables, timeline, and pricing." },
  { step: "4", title: "Kickoff", description: "We start cutting, designing, or building your next campaign." },
];

export default function HireUsPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen">
      <TopHeader query={query} onQueryChange={setQuery} />
      <SidebarRail />

      <div className="md:pl-60">
        <main className="px-4 py-10 md:px-[6%] lg:px-[8%]">
          {/* Hero */}
          <div className="flex flex-col items-start gap-4 py-8">
            <Image
              src="/brand/mascot.png"
              alt=""
              width={56}
              height={56}
              className="size-14 rounded-full object-cover"
            />
            <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-5xl">
              Let&apos;s build something worth watching.
            </h1>
            <p className="max-w-xl text-muted-foreground">
              Silly Billi Studio partners with creators, podcasts, and brands to turn raw footage
              into content people actually finish watching — across video editing, visual
              branding, editorial direction, and marketing.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 border-y py-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Services */}
          <div className="py-10">
            <h2 className="mb-5 text-lg font-semibold">What we do</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.label}
                  href={service.href}
                  className="flex flex-col gap-3 rounded-xl border p-5 hover:bg-accent"
                >
                  <service.icon className="size-6" />
                  <div>
                    <p className="font-medium">{service.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="py-10">
            <h2 className="mb-5 text-lg font-semibold">How it works</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((item) => (
                <div key={item.step}>
                  <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-muted-foreground">
                    {item.step}
                  </p>
                  <p className="mt-1 font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start gap-4 rounded-xl border py-10 pl-6 pr-6 sm:pl-10">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">
                Ready to work together?
              </h2>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Tell us about your channel or campaign and we&apos;ll get back to you.
              </p>
            </div>
            <ContactForm source="Hire Us" />
          </div>
        </main>
      </div>
    </div>
  );
}
