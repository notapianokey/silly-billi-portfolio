"use client";

import { MousePointerClickIcon, PercentIcon, TrendingUpIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { AdsSidebar } from "@/components/dashboard/ads-sidebar";
import { AdsTopbar } from "@/components/dashboard/ads-topbar";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import {
  CAMPAIGNS,
  formatCompactNumber,
  formatMultiplier,
  formatPercent,
  PERIOD_SUMMARY,
  type DateRangeId,
  type Platform,
} from "@/lib/marketing";

/** Analytics-dashboard clone (Meta Ads Manager / Google Analytics) for campaign performance.
 *  Own dedicated chrome (AdsSidebar/AdsTopbar), not the site's YouTube-styled SidebarRail/
 *  TopHeader — same reasoning as the Instagram clone: this page is meant to read as the real
 *  tool, and stacking the site's own nav next to a second, different platform's nav would break
 *  that. The sidebar's Silly Billi mark links back to "/" as the way back to the rest of the
 *  site. All data is placeholder (no real campaigns exist yet) — see marketing.data.json. */
export default function MarketingAdsPage() {
  const [range, setRange] = useState<DateRangeId>("30d");
  const [platform, setPlatform] = useState<Platform | "All">("All");

  const summary = PERIOD_SUMMARY[range];
  const filteredCampaigns = useMemo(
    () => (platform === "All" ? CAMPAIGNS : CAMPAIGNS.filter((c) => c.platform === platform)),
    [platform],
  );

  return (
    <div className="min-h-screen bg-muted/20">
      <AdsSidebar />

      <div className="md:pl-60">
        <AdsTopbar range={range} onRangeChange={setRange} platform={platform} onPlatformChange={setPlatform} />

        <main className="flex flex-col gap-6 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <KpiCard
              label="Impressions"
              value={formatCompactNumber(summary.impressions)}
              change={summary.impressionsChange}
              icon={TrendingUpIcon}
            />
            <KpiCard
              label="CTR"
              value={formatPercent(summary.ctr)}
              change={summary.ctrChange}
              changeSuffix="pts"
              icon={MousePointerClickIcon}
            />
            <KpiCard
              label="Conversion multiplier (ROAS)"
              value={formatMultiplier(summary.roas)}
              change={summary.roasChange}
              changeSuffix="x"
              icon={PercentIcon}
            />
          </div>

          <CampaignTable campaigns={filteredCampaigns} range={range} />
        </main>
      </div>
    </div>
  );
}
