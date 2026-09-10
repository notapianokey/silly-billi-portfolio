import marketingData from "./marketing.data.json";

export type DateRangeId = "7d" | "30d" | "90d";
export type Platform = "Meta" | "Google" | "TikTok" | "YouTube";
export type CampaignStatus = "Active" | "Paused" | "Ended";

export interface DateRangeDef {
  id: DateRangeId;
  label: string;
}

export interface PeriodSummary {
  impressions: number;
  impressionsChange: number;
  ctr: number;
  ctrChange: number;
  roas: number;
  roasChange: number;
}

export interface RangeMetrics {
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  conversions: number;
  roas: number;
}

export interface AudienceSegment {
  segment: string;
  share: number;
}

export interface AdCopyVariant {
  headline: string;
  body: string;
}

export interface CreativeSet {
  name: string;
  type: "Video" | "Image" | "Carousel";
  count: number;
}

export interface FunnelStage {
  stage: string;
  value: number;
}

export interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: CampaignStatus;
  objective: string;
  metrics: Record<DateRangeId, RangeMetrics>;
  audience: AudienceSegment[];
  adCopy: AdCopyVariant[];
  creativeSets: CreativeSet[];
  /** Landing views as a share of clicks — used to derive the funnel for whichever date range
   *  is selected, rather than a range-independent static funnel that would drift out of sync
   *  with the rest of the row once the date range picker changes the other numbers. */
  landingViewRate: number;
}

/** Builds the 4-stage funnel (impressions → clicks → landing views → conversions) for a
 *  campaign at a given date range, so it always agrees with the range-scoped metrics shown
 *  elsewhere on the same row. */
export function getCampaignFunnel(campaign: Campaign, range: DateRangeId): FunnelStage[] {
  const metrics = campaign.metrics[range];
  return [
    { stage: "Impressions", value: metrics.impressions },
    { stage: "Clicks", value: metrics.clicks },
    { stage: "Landing views", value: Math.round(metrics.clicks * campaign.landingViewRate) },
    { stage: "Conversions", value: metrics.conversions },
  ];
}

export const DATE_RANGES: DateRangeDef[] = marketingData.dateRanges as DateRangeDef[];
export const PERIOD_SUMMARY: Record<DateRangeId, PeriodSummary> = marketingData.summary as Record<
  DateRangeId,
  PeriodSummary
>;
export const CAMPAIGNS: Campaign[] = marketingData.campaigns as Campaign[];

export const PLATFORMS: Platform[] = ["Meta", "Google", "TikTok", "YouTube"];

export const PLATFORM_STYLES: Record<Platform, { dot: string; badge: string }> = {
  Meta: { dot: "bg-blue-500", badge: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" },
  Google: { dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" },
  TikTok: { dot: "bg-fuchsia-500", badge: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/10 dark:text-fuchsia-400" },
  YouTube: { dot: "bg-red-500", badge: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400" },
};

export const STATUS_STYLES: Record<CampaignStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Paused: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Ended: "bg-muted text-muted-foreground",
};

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    value,
  );
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

export function formatMultiplier(value: number): string {
  return `${value.toFixed(1)}x`;
}

export function formatSignedChange(value: number, suffix: "%" | "pts" | "x" = "%"): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}${suffix}`;
}
