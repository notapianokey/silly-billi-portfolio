"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { VIDEO_CATEGORIES, type VideoCategoryId } from "@/lib/videos";

interface CategoryPillsProps {
  value: VideoCategoryId | null;
  onSelect: (value: VideoCategoryId | null) => void;
}

export function CategoryPills({ value, onSelect }: CategoryPillsProps) {
  return (
    <div className="sticky top-14 z-30 flex gap-2 overflow-x-auto bg-background px-4 py-3 md:px-6">
      <Badge
        onClick={() => onSelect(null)}
        variant={value === null ? "default" : "secondary"}
        className={cn("cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 text-sm")}
      >
        All
      </Badge>
      {VIDEO_CATEGORIES.map((category) => (
        <Badge
          key={category.id}
          onClick={() => onSelect(category.id)}
          variant={value === category.id ? "default" : "secondary"}
          className="cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 text-sm"
        >
          {category.label}
        </Badge>
      ))}
    </div>
  );
}
