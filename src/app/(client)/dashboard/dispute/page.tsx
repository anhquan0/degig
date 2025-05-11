"use client";

import { ErrorSection } from "@/components/common/ErrorSection";
import Loading from "@/components/common/loading";
import { SupportDisputesTable } from "@/components/dispute-page/DisputesTable";
import { Card, CardContent } from "@/components/ui/card";
import { ApiResponseInterface } from "@/interface";
import { get } from "@/lib/axios";
import { parseError } from "@/utils/parse-error";
import useSWR from "swr";

export default function DisputesPage() {
  const { data, error, isLoading } = useSWR<ApiResponseInterface>(`/dispute`, get);
  if (isLoading) return <Loading />;
  if (error) return <ErrorSection title={parseError(error)} />;
  const { data: disputes } = data || { disputes: [] };
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Disputes</h2>
        </div>
      </div>

      <Card>
        <CardContent>
          <SupportDisputesTable disputes={disputes} />
        </CardContent>
      </Card>
    </div>
  );
}
