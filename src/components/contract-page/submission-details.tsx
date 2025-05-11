import { Button } from "@/components/ui/button";
import { Contract } from "@/interface";
import axios from "axios";
import { IPFS_GATEWAY } from "@/constants/contract";
import useSWR from "swr";
import Loading from "../common/loading";
import { ErrorSection } from "../common/ErrorSection";
import { parseError } from "@/utils/parse-error";
import { DescriptionUI } from "../layout/job-details/DescriptionUI";
import { isNil } from "lodash";
import Link from "next/link";

interface ipfsResponse {
  data: {
    submission: string;
  };
}

export default function SubmissionDisplay({ contract }: { contract: Contract }) {
  const { data, error, isLoading } = useSWR<ipfsResponse>(IPFS_GATEWAY + contract.submission, axios.get);
  if (isLoading) return <Loading />;
  if (error || isNil(data)) return <ErrorSection title={parseError(error)} />;
  const ipfsData = data.data || { submission: "" };
  return (
    <div className="space-y-6">
      {/* Description Field */}
      <div className="flex w-full flex-col gap-2 mb-4">
        <div className="flex items-center justify-between">
          <label className="text-[0.85rem] text-slate-600 sm:text-[0.9rem] font-medium">Submission</label>
        </div>
        <div className="border rounded-md p-4">
          <DescriptionUI description={ipfsData.submission || ""} />
        </div>
      </div>

      {/* Action Buttons */}
      <Link href={IPFS_GATEWAY + contract.submission} target="_blank" rel="noopener noreferrer">
        <div className="flex justify-end gap-4">
          <Button>View Raw</Button>
        </div>
      </Link>
    </div>
  );
}
