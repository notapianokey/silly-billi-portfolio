"use client";

import { MenuIcon, MicIcon, SearchIcon, UserCircleIcon, XIcon } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SEARCH_TAG_SUGGESTIONS } from "@/lib/videos";

interface TopHeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function TopHeader({ query, onQueryChange }: TopHeaderProps) {
  const [focused, setFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex shrink-0 items-center gap-4">
        <Button variant="ghost" size="icon" className="size-9 rounded-full">
          <MenuIcon className="size-5" />
        </Button>
        <Link href="/video-editing" className="flex items-center gap-1.5">
          <Image
            src="/brand/mascot.png"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-md object-cover"
          />
          <span className="text-xl font-bold tracking-tight">Silly Tube</span>
        </Link>
      </div>

      <div className="relative mx-auto flex w-full max-w-[600px] flex-col">
        <form className="flex w-full items-center gap-3" onSubmit={(event) => event.preventDefault()}>
          <div className="flex w-full">
            <div className="relative w-full">
              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                type="text"
                placeholder="Search #podcast, #documentary, #shorts..."
                className="w-full rounded-l-full border py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-ring"
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onQueryChange("")}
                  className="absolute right-1 top-1/2 size-8 -translate-y-1/2 rounded-full"
                >
                  <XIcon className="size-4 text-muted-foreground" />
                </Button>
              )}
            </div>
            <button
              type="submit"
              className="rounded-r-full border border-l-0 bg-secondary px-5 hover:bg-accent"
            >
              <SearchIcon className="size-4" />
            </button>
          </div>
          <Button variant="ghost" size="icon" type="button" className="size-9 shrink-0 rounded-full bg-secondary">
            <MicIcon className="size-4" />
          </Button>
        </form>

        {focused && (
          <div className="absolute top-11 z-50 w-full rounded-xl border bg-popover p-2 shadow-lg">
            {SEARCH_TAG_SUGGESTIONS.map((tag) => (
              <button
                key={tag}
                type="button"
                onMouseDown={() => onQueryChange(tag)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-accent"
              >
                <SearchIcon className="size-3.5 text-muted-foreground" />
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button variant="ghost" size="icon" className="size-9 rounded-full">
          <EllipsisVertical className="size-5" />
        </Button>
        <Button variant="outline" className="gap-2 rounded-full">
          <UserCircleIcon className="size-5" />
          Sign in
        </Button>
      </div>
    </header>
  );
}
