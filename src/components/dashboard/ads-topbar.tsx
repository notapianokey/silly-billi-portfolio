"use client";

import { CalendarIcon, ChevronDownIcon, FilterIcon, SearchIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DATE_RANGES, PLATFORMS, type DateRangeId, type Platform } from "@/lib/marketing";

interface AdsTopbarProps {
  range: DateRangeId;
  onRangeChange: (range: DateRangeId) => void;
  platform: Platform | "All";
  onPlatformChange: (platform: Platform | "All") => void;
}

export function AdsTopbar({ range, onRangeChange, platform, onPlatformChange }: AdsTopbarProps) {
  const rangeLabel = DATE_RANGES.find((r) => r.id === range)?.label ?? "Last 30 days";

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center gap-3 border-b bg-background px-6 py-4">
      <div className="mr-auto">
        <p className="text-xs text-muted-foreground">Ads Manager</p>
        <h1 className="text-lg font-semibold">Campaigns</h1>
      </div>

      <div className="relative hidden sm:block">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search campaigns"
          className="h-9 w-48 rounded-lg border bg-background pl-8 pr-3 text-sm focus:outline-none focus:border-ring"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-9 items-center gap-2 rounded-lg border px-3 text-sm hover:bg-accent">
          <CalendarIcon className="size-3.5 text-muted-foreground" />
          {rangeLabel}
          <ChevronDownIcon className="size-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            value={range}
            onValueChange={(value) => onRangeChange(value as DateRangeId)}
          >
            {DATE_RANGES.map((option) => (
              <DropdownMenuRadioItem key={option.id} value={option.id}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-9 items-center gap-2 rounded-lg border px-3 text-sm hover:bg-accent">
          <FilterIcon className="size-3.5 text-muted-foreground" />
          {platform === "All" ? "All platforms" : platform}
          <ChevronDownIcon className="size-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            value={platform}
            onValueChange={(value) => onPlatformChange(value as Platform | "All")}
          >
            <DropdownMenuRadioItem value="All">All platforms</DropdownMenuRadioItem>
            {PLATFORMS.map((option) => (
              <DropdownMenuRadioItem key={option} value={option}>
                {option}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
