import { TrendingDownIcon, TrendingUpIcon, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  change: number;
  changeSuffix?: "%" | "pts" | "x";
  icon: LucideIcon;
}

/** A single KPI tile — value, trend badge, and icon — matching the metric-card pattern used by
 *  Meta Ads Manager / Google Analytics dashboards (shadcn's own dashboard example follows the
 *  same shape: big number, % change badge, small icon). */
export function KpiCard({ label, value, change, changeSuffix = "%", icon: Icon }: KpiCardProps) {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="flex items-end justify-between gap-2">
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        <span
          className={cn(
            "mb-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            isPositive
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
          )}
        >
          <TrendIcon className="size-3" />
          {isPositive ? "+" : ""}
          {change.toFixed(1)}
          {changeSuffix}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">vs. previous period</p>
    </div>
  );
}
