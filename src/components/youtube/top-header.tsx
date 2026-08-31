"use client";

import { SearchIcon, XIcon } from "lucide-react";
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
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/" className="shrink-0 text-lg font-semibold tracking-tight">
        Silly Billi <span className="text-muted-foreground">Video</span>
      </Link>

      <div className="mx-auto flex w-full max-w-[600px] flex-col">
        <form
          className="flex w-full"
          onSubmit={(event) => event.preventDefault()}
        >
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
        </form>

        {focused && (
          <div className="absolute top-16 z-50 w-full max-w-[600px] rounded-xl border bg-popover p-2 shadow-lg">
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

      <div className="w-9 shrink-0" />
    </header>
  );
}
