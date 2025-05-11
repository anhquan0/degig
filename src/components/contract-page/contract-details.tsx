import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
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
    description: string;
    termsAndConditions: string;
    poc: string;
  };
}

export default function ContractDisplay({ contract }: { contract: Contract }) {
  const { data, error, isLoading } = useSWR<ipfsResponse>(IPFS_GATEWAY + contract.content, axios.get);
  if (isLoading) return <Loading />;
  if (error || isNil(data)) return <ErrorSection title={parseError(error)} />;
  const ipfsData = data.data || { description: "", termsAndConditions: "", poc: "" };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1">
        {/* Party A Field */}
        <div className="flex w-full flex-col gap-2 mb-4">
          <label className="text-[0.85rem] text-slate-600 sm:text-[0.9rem] font-medium">Party A:</label>
          <div className="flex w-full rounded-md border bg-muted/50">
            <Input className="mt-0 border-none focus-visible:ring-0 bg-transparent" value={contract.partyA} readOnly />
          </div>
        </div>

        {/* Party B Field */}
        <div className="flex w-full flex-col gap-2 mb-4">
          <label className="text-[0.85rem] text-slate-600 sm:text-[0.9rem] font-medium">Party B:</label>
          <div className="flex w-full rounded-md border bg-muted/50">
            <Input className="mt-0 border-none focus-visible:ring-0 bg-transparent" value={contract.partyB} readOnly />
          </div>
        </div>

        {/* Description Field */}
        <div className="flex w-full flex-col gap-2 mb-4">
          <div className="flex items-center justify-between">
            <label className="text-[0.85rem] text-slate-600 sm:text-[0.9rem] font-medium">Job Description</label>
          </div>
          <div className="border rounded-md p-4">
            <DescriptionUI description={ipfsData.description || ""} />
          </div>
        </div>

        {/* Terms and Conditions Field */}
        <div className="flex w-full flex-col gap-2 py-2 mb-4">
          <div className="flex items-center justify-between">
            <label className="text-[0.85rem] text-slate-600 sm:text-[0.9rem] font-medium">Terms and conditions</label>
          </div>
          <div className="border rounded-md p-4">
            <DescriptionUI description={ipfsData.termsAndConditions || ""} />
          </div>
        </div>

        {/* Rewards Field */}
        <div className="mb-4">
          <div className="flex w-full flex-col gap-2 py-2">
            <div className="flex w-full flex-col group items-start gap-1.5">
              <label className="text-[0.85rem] text-slate-600 sm:text-[0.9rem] font-medium">Reward (in ADA)</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <div className="flex items-center gap-2">
                    <Image
                      alt="ADA"
                      className="mr-1 block"
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <Input
                  type="text"
                  className={cn("pl-10 h-12 text-base font-medium rounded-md bg-muted/50 border-gray-200")}
                  value={contract.amount}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Point of Contact Field */}
        <div className="flex w-full flex-col gap-2 py-2 mb-4">
          <label className="text-[0.85rem] text-slate-600 sm:text-[0.9rem] font-medium">Point of Contact (TG / X / Email)</label>
          <Input className="bg-muted/50" value={ipfsData.poc || ""} readOnly />
        </div>
      </div>

      {/* Action Buttons */}
      <Link href={IPFS_GATEWAY + contract.content} target="_blank" rel="noopener noreferrer">
        <div className="flex justify-end gap-4">
          <Button>View Raw</Button>
        </div>
      </Link>
    </div>
  );
}
