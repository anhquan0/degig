import { CircleDot } from "lucide-react";
import React from "react";

import { cn } from "@/utils/cn";
import { JobInterface } from "@/interface";
import { StatusBadge } from "./StatusBadge";
import { VerifiedBadge } from "./VerifiedBadge";
import { shortenString } from "@/utils/shorten-string";

export function JobDetailHeader({ job }: { job: JobInterface }) {
  const { title, walletAddress } = job;

  const statusIconStyles = "w-5 h-5";
  let statusText = "";
  let statusTextColor = "";
  let statusIcon: React.JSX.Element = <></>;

  statusIcon = <CircleDot className={cn(statusIconStyles, "text-green-400")} />;
  statusText = "Open";
  statusTextColor = "text-green-500";

  const JobDetailTitle = () => {
    return <h1 className="text-xl font-bold tracking-[-0.5px] text-slate-700">{title}</h1>;
  };

  const JobDetailStatus = () => {
    return <StatusBadge Icon={statusIcon} textColor={statusTextColor} text={statusText} />;
  };
  const HeaderSub = () => {
    return (
      <div className="flex flex-wrap items-center gap-1 md:gap-3">
        <div className="flex items-center gap-1">
          <p className="text-sm font-medium whitespace-nowrap text-slate-400 ">by {shortenString(walletAddress)}</p>
          <VerifiedBadge />
        </div>
        <span className="font-medium text-[#E2E8EF]">|</span>

        <div className="flex">
          <JobDetailStatus />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1 bg-white">
      <div className="mx-auto flex w-full max-w-7xl justify-between gap-5 py-4 md:py-10">
        <div className="flex items-center">
          <div className={cn("flex flex-col items-start gap-1")}>
            <div className="flex gap-1">
              <div className="hidden md:flex">
                <JobDetailTitle />
              </div>
            </div>
            <div className="hidden md:flex">
              <HeaderSub />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 flex w-full flex-col gap-1 md:hidden">
        <JobDetailTitle />
        <HeaderSub />
      </div>
      {
        <div className="flex h-10 w-full max-w-7xl items-center">
          <div className="mx-auto my-auto flex h-full w-full max-w-7xl items-center justify-start gap-10 border-b border-slate-200"></div>
        </div>
      }
    </div>
  );
}
