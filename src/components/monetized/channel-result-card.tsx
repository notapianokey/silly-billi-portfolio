import Image from "next/image";

import type { MonetizedChannel } from "@/lib/monetized-channels";

interface ChannelResultCardProps {
  channel: MonetizedChannel;
}

/** Matches real YouTube's search-result channel card: large circular avatar, name, handle +
 *  subscriber count, a short bio, and a Subscribe button — all linking out to the real channel. */
export function ChannelResultCard({ channel }: ChannelResultCardProps) {
  return (
    <a
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-wrap items-center gap-4 py-2"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-secondary">
        {channel.avatarSrc && (
          <Image src={channel.avatarSrc} alt="" fill sizes="80px" className="object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-semibold">{channel.name}</p>
        {(channel.handle || channel.subscriberLabel) && (
          <p className="text-sm text-muted-foreground">
            {channel.handle}
            {channel.handle && channel.subscriberLabel && " · "}
            {channel.subscriberLabel}
          </p>
        )}
        {channel.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{channel.description}</p>
        )}
      </div>
      <span className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
        Subscribe
      </span>
    </a>
  );
}
