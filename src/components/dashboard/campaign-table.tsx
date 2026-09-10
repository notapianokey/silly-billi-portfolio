"use client";

import { ChevronRightIcon } from "lucide-react";
import { Fragment, useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  formatCompactNumber,
  formatCurrency,
  formatMultiplier,
  formatPercent,
  PLATFORM_STYLES,
  STATUS_STYLES,
  type Campaign,
  type DateRangeId,
} from "@/lib/marketing";

import { CampaignDetail } from "./campaign-detail";

interface CampaignTableProps {
  campaigns: Campaign[];
  range: DateRangeId;
}

export function CampaignTable({ campaigns, range }: CampaignTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (campaigns.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
        No campaigns match this filter.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-8" />
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Spend</TableHead>
            <TableHead className="text-right">Impressions</TableHead>
            <TableHead className="text-right">CTR</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">ROAS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => {
            const metrics = campaign.metrics[range];
            const expanded = expandedId === campaign.id;

            return (
              <Fragment key={campaign.id}>
                <TableRow
                  role="button"
                  aria-expanded={expanded}
                  onClick={() => setExpandedId(expanded ? null : campaign.id)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <ChevronRightIcon
                      className={cn("size-4 text-muted-foreground transition-transform", expanded && "rotate-90")}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium whitespace-normal">{campaign.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-medium",
                            PLATFORM_STYLES[campaign.platform].badge,
                          )}
                        >
                          <span className={cn("size-1.5 rounded-full", PLATFORM_STYLES[campaign.platform].dot)} />
                          {campaign.platform}
                        </span>
                        <span className="text-xs text-muted-foreground">{campaign.objective}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                        STATUS_STYLES[campaign.status],
                      )}
                    >
                      {campaign.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(metrics.spend)}</TableCell>
                  <TableCell className="text-right">{formatCompactNumber(metrics.impressions)}</TableCell>
                  <TableCell className="text-right">{formatPercent(metrics.ctr)}</TableCell>
                  <TableCell className="text-right">{formatCompactNumber(metrics.conversions)}</TableCell>
                  <TableCell className="text-right font-medium">{formatMultiplier(metrics.roas)}</TableCell>
                </TableRow>
                {expanded && (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={8} className="p-0">
                      <CampaignDetail campaign={campaign} range={range} />
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
