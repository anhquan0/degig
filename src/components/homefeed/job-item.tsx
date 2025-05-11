import Image from "next/image";
import Link from "next/link";
import { NotebookText } from "lucide-react";

import { cn } from "@/utils";

interface JobItemProps {
  id: string;
  title: string;
  organization: string;
  organizationLogo: string;
  amount: number;
  currency: string;
  currencyLogo: string;
  dueInDays: number;
  commentCount: number;
  isActive?: boolean;
  className?: string;
}

export default function JobItem({
  id,
  title,
  organization,
  organizationLogo,
  amount,
  currency,
  currencyLogo,
  dueInDays,
  isActive = true,
  className,
}: JobItemProps) {
  return (
    <Link href={`/job/${id}`} className={cn("block w-full rounded-md px-2 py-4 no-underline hover:bg-gray-100 sm:px-4", className)}>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full">
          <Image
            src={organizationLogo || "/placeholder.svg"}
            alt={organization}
            width={64}
            height={64}
            className="mr-3 h-14 w-14 rounded-md sm:mr-5 sm:h-16 sm:w-16"
          />
          <div className="flex w-full flex-col justify-between">
            <p className="line-clamp-1 text-sm font-semibold text-slate-700 hover:underline sm:text-base">{title}</p>
            <div className="flex w-min items-center gap-1">
              <p className="w-full text-xs whitespace-nowrap text-slate-500 md:text-sm">{organization}</p>
            </div>
            <div className="mt-[1px] flex items-center gap-1 sm:gap-3">
              {/* Mobile currency display */}
              <div className="flex items-center justify-start sm:hidden">
                <Image src={currencyLogo || "/placeholder.svg"} alt={currency} width={14} height={14} className="mr-0.5 h-3.5 w-3.5 rounded-full" />
                <div className="flex items-baseline">
                  <div className="flex text-xs font-semibold whitespace-nowrap text-slate-600 sm:text-base">
                    <span className="ml-auto">{amount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-400">{currency}</p>
                </div>
                <p className="ml-1 text-[10px] text-slate-300">|</p>
              </div>

              {/* Bounty indicator */}
              <NotebookText className="flex h-3 -ml-0.5 sm:h-4" />
              {/* <Image src="/assets/bounty-icon.svg" alt="bounty" width={16} height={16}  /> */}
              <p className="-ml-1 hidden text-xs font-medium text-gray-500 sm:flex sm:-ml-3">Job</p>

              <p className="flex text-[10px] text-slate-300 sm:text-xs md:text-sm">|</p>

              {/* Due date */}
              <div className="flex items-center gap-1">
                <p className="text-[10px] whitespace-nowrap text-gray-500 sm:text-xs">Due in {dueInDays}d</p>
              </div>

              {/* Status indicator */}
              <div className={cn("mx-1 h-2 w-2 rounded-full sm:mx-0", isActive ? "bg-[#16A35F]" : "bg-gray-400")} />
            </div>
          </div>
        </div>

        {/* Desktop currency display */}
        <div className="hidden items-center justify-start sm:flex mr-3">
          <Image
            src={currencyLogo || "/placeholder.svg"}
            alt={currency}
            width={16}
            height={16}
            className="mt-1 mr-1 h-4 w-4 rounded-full sm:mt-0.5"
          />
          <div className="flex items-baseline gap-1">
            <div className="flex text-xs font-semibold whitespace-nowrap text-slate-600 sm:text-base">
              <span className="ml-auto">{amount.toLocaleString()}</span>
            </div>
            <p className="text-xs font-medium text-gray-400 sm:text-base">{currency}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
