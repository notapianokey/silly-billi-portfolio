"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { CAT_IMAGES } from "@/lib/cats";

type TrailItem = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  image: (typeof CAT_IMAGES)[number];
};

const MIN_SPAWN_DISTANCE = 30;
const MAX_SPAWN_DISTANCE = 50;
const FADE_DURATION_MS = 800;
const MAX_CONCURRENT_ITEMS = 40;

function randomSpawnThreshold() {
  return MIN_SPAWN_DISTANCE + Math.random() * (MAX_SPAWN_DISTANCE - MIN_SPAWN_DISTANCE);
}

let nextTrailId = 0;

/**
 * Drops a rotated, fading cat image at every ~30-50px of pointer movement.
 * Uses the Pointer Events API so the same handler covers mouse and touch
 * (touch only fires pointermove while a finger is down and dragging, which
 * is the expected/standard behavior for this pattern).
 */
export function CursorTrail() {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastSpawnPoint = useRef<{ x: number; y: number } | null>(null);
  const nextThreshold = useRef(randomSpawnThreshold());

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const x = event.clientX;
      const y = event.clientY;
      const last = lastSpawnPoint.current;

      if (last) {
        const distance = Math.hypot(x - last.x, y - last.y);
        if (distance < nextThreshold.current) return;
      }

      lastSpawnPoint.current = { x, y };
      nextThreshold.current = randomSpawnThreshold();

      const id = nextTrailId++;
      const image = CAT_IMAGES[Math.floor(Math.random() * CAT_IMAGES.length)];
      const rotation = Math.random() * 24 - 12;

      setTrail((prev) => [
        ...prev.slice(-(MAX_CONCURRENT_ITEMS - 1)),
        { id, x, y, rotation, image },
      ]);

      window.setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== id));
      }, FADE_DURATION_MS);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {trail.map((item) => (
        <div
          key={item.id}
          className="cat-trail-item absolute h-24 w-24 overflow-hidden rounded-md shadow-lg"
          style={
            {
              left: item.x,
              top: item.y,
              "--trail-rotation": `${item.rotation}deg`,
            } as React.CSSProperties
          }
        >
          <Image src={item.image} alt="" fill sizes="96px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
