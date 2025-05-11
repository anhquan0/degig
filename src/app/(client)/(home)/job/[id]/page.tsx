"use client";
import Loading from "@/components/common/loading";
import { ApiResponseInterface } from "@/interface";
import { get } from "@/lib/axios";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { DescriptionUI } from "@/components/layout/job-details/DescriptionUI";
import { isNil } from "lodash";
import { JobPageLayout } from "@/components/layout/job-details";
import { parseError } from "@/utils/parse-error";
import { ErrorSection } from "@/components/common/ErrorSection";

export default function JobDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data, error, isLoading } = useSWR<ApiResponseInterface>("/job/" + params.id, get);
  if (error) return <ErrorSection title={parseError(error)} />;
  if (isLoading) return <Loading />;

  const { data: initialJob } = data || { data: null };
  if (isNil(initialJob)) {
    return <div>Job not found</div>;
  }
  return (
    <JobPageLayout job={initialJob}>
      <DescriptionUI description={initialJob?.description} />
    </JobPageLayout>
  );
}
