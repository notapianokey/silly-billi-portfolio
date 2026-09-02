"use client";

import { CompassIcon, SparklesIcon, UsersIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ContactForm } from "@/components/contact-form";
import { SidebarRail } from "@/components/youtube/sidebar-rail";
import { TopHeader } from "@/components/youtube/top-header";

const VALUES = [
  {
    icon: ZapIcon,
    title: "We ship fast",
    description: "Real deadlines, real clients. We move quickly without cutting corners.",
  },
  {
    icon: SparklesIcon,
    title: "Craft over templates",
    description: "Every edit is built for the story, not pulled off a shelf.",
  },
  {
    icon: UsersIcon,
    title: "Small team, real ownership",
    description: "No layers of approval — your work goes straight to the client.",
  },
  {
    icon: CompassIcon,
    title: "Always learning",
    description: "New formats, new platforms, new techniques — we stay curious.",
  },
];

const LOOKING_FOR = [
  "A sharp eye for pacing, story, and what makes people stop scrolling",
  "Comfort working across video editing, design, writing, or strategy",
  "Genuine curiosity about the platforms our clients live on",
  "Ownership — you notice what needs fixing and you fix it",
];

export default function JoinUsPage() {
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
              Come make things worth watching.
            </h1>
            <p className="max-w-xl text-muted-foreground">
              We&apos;re a small team of editors, designers, and writers working across video
              editing, visual branding, editorial direction, and marketing — for real creators
              and real audiences.
            </p>
          </div>

          {/* Values */}
          <div className="border-y py-10">
            <h2 className="mb-5 text-lg font-semibold">What it&apos;s like here</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {VALUES.map((value) => (
                <div key={value.title} className="flex gap-3">
                  <value.icon className="size-5 shrink-0" />
                  <div>
                    <p className="font-medium">{value.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What we look for */}
          <div className="py-10">
            <h2 className="mb-5 text-lg font-semibold">What we look for</h2>
            <ul className="flex max-w-2xl flex-col gap-3">
              {LOOKING_FOR.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Open roles — honest empty state, no invented listings */}
          <div className="py-10">
            <h2 className="mb-5 text-lg font-semibold">Open roles</h2>
            <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-14 text-center text-muted-foreground">
              <UsersIcon className="size-6" />
              <span className="text-sm font-medium">No open roles right now — check back soon</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start gap-4 rounded-xl border py-10 pl-6 pr-6 sm:pl-10">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">
                Interested anyway?
              </h2>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                We&apos;re always open to hearing from people who&apos;d be a good fit.
              </p>
            </div>
            <ContactForm source="Join Us" />
          </div>
        </main>
      </div>
    </div>
  );
}
