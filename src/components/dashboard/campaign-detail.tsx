import { FilterIcon, ImageIcon, MessageSquareTextIcon, UsersIcon, VideoIcon } from "lucide-react";

import type { Campaign, DateRangeId } from "@/lib/marketing";
import { formatCompactNumber, getCampaignFunnel } from "@/lib/marketing";

const CREATIVE_TYPE_ICON = {
  Video: VideoIcon,
  Image: ImageIcon,
  Carousel: ImageIcon,
} as const;

/** Expanded row content — audience breakdown, ad copy variations, creative sets, and funnel
 *  strategy, per the "clicking a row expands to show..." spec. Placeholder data throughout
 *  (no real campaigns exist yet) — same status as the video-editing page's early placeholder
 *  projects, structured to be swapped for real content later. */
export function CampaignDetail({ campaign, range }: { campaign: Campaign; range: DateRangeId }) {
  const funnel = getCampaignFunnel(campaign, range);
  const maxFunnelValue = funnel[0]?.value ?? 1;

  return (
    <div className="grid grid-cols-1 gap-6 bg-muted/30 p-6 lg:grid-cols-2">
      <section>
        <SectionHeading icon={UsersIcon} label="Audience breakdown" />
        <div className="flex flex-col gap-2">
          {campaign.audience.map((segment) => (
            <div key={segment.segment} className="flex items-center gap-3 text-sm">
              <span className="w-36 shrink-0 truncate text-muted-foreground">{segment.segment}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-foreground/70" style={{ width: `${segment.share}%` }} />
              </div>
              <span className="w-9 shrink-0 text-right font-medium">{segment.share}%</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading icon={MessageSquareTextIcon} label="Ad copy variations" />
        <div className="flex flex-col gap-2">
          {campaign.adCopy.map((variant) => (
            <div key={variant.headline} className="rounded-lg border bg-card p-3">
              <p className="text-sm font-medium">{variant.headline}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{variant.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading icon={ImageIcon} label="Creative sets" />
        <div className="flex flex-wrap gap-2">
          {campaign.creativeSets.map((set) => {
            const Icon = CREATIVE_TYPE_ICON[set.type];
            return (
              <span
                key={set.name}
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm"
              >
                <Icon className="size-3.5 text-muted-foreground" />
                {set.name}
                <span className="text-muted-foreground">· {set.count}</span>
              </span>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeading icon={FilterIcon} label="Funnel strategy" />
        <div className="flex flex-col gap-2">
          {funnel.map((stage) => (
            <div key={stage.stage} className="flex items-center gap-3 text-sm">
              <span className="w-28 shrink-0 truncate text-muted-foreground">{stage.stage}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${Math.max((stage.value / maxFunnelValue) * 100, 3)}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right font-medium">{formatCompactNumber(stage.value)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
      <Icon className="size-4 text-muted-foreground" />
      {label}
    </div>
  );
}
