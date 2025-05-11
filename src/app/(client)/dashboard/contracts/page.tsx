"use client";

import { ErrorSection } from "@/components/common/ErrorSection";
import Loading from "@/components/common/loading";
import ContractsTable from "@/components/contract-page/table-contract";
import { useWallet } from "@/hooks/use-wallet";
import { ApiResponseInterface, Contract } from "@/interface";
import { get } from "@/lib/axios";
import { parseError } from "@/utils/parse-error";
import useSWR from "swr";

export default function ContractsPage() {
  const { data, error, isLoading } = useSWR<ApiResponseInterface>(`/contract`, get);
  const { address } = useWallet();
  if (isLoading) return <Loading />;
  if (error) return <ErrorSection title={parseError(error)} />;

  const { data: contracts } = data || { data: [] };

  const ownerContracts = contracts.filter((contract: Contract) => contract.partyA === address || contract.partyB === address);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contracts</h2>
          <p className="text-muted-foreground">Manage contracts</p>
        </div>
      </div>
      <ContractsTable contracts={ownerContracts} />
    </div>
  );
}
