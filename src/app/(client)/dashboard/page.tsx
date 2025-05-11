"use client";
import Loading from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useWallet } from "@/hooks/use-wallet";
import { ApiResponseInterface } from "@/interface";
import { get } from "@/lib/axios";
import { Job } from "@prisma/client";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import useSWR, { mutate } from "swr";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { deleteJob } from "@/services/job/delete";
import { toast } from "sonner";
import { parseError } from "@/utils/parse-error";
import { shortenString } from "@/utils/shorten-string";
import { ErrorSection } from "@/components/common/ErrorSection";

export default function SponsorDashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 10;
  const { data, error, isLoading } = useSWR<ApiResponseInterface>(`/job?page=${currentPage + 1}&limit=${jobsPerPage}`, get);
  const { walletIcon, address } = useWallet();

  if (error) return <ErrorSection title={parseError(error)} />;
  if (isLoading) return <Loading />;
  const { data: jobs, pagination } = data || { data: [], pagination: null };

  const handleDeleteJob = async (jobId: string) => {
    try {
      if (!address) {
        throw new Error("Wallet address is required");
      }
      const res = await deleteJob({ id: jobId, walletAddress: address });
      mutate(`/job?page=${currentPage + 1}&limit=${jobsPerPage}`);
      toast.success(res, {
        description: "Job created successfully",
      });
    } catch (error) {
      toast.warning("Error Delete Job", {
        description: parseError(error),
      });
    }
  };

  return (
    <div className="w-full flex-1 bg-white py-5 pr-8 pl-4 transition-[margin-left] duration-300 ease-in-out ml-0">
      <div className="flex w-full gap-4">
        {/* Sponsor Profile Card */}
        <div className="mb-6 w-full rounded-md border border-slate-200 bg-white px-6 py-5 text-white">
          <div className="flex items-center gap-6">
            <div className="flex shrink-0 items-center gap-3">
              <div className="shrink-0">
                <Image
                  alt="tidvn"
                  width={48}
                  height={48}
                  className="grow size-7 h-12 w-12 rounded-md object-contain"
                  src={walletIcon || "https://s2.coinmarketcap.com/static/img/coins/128x128/2010.png"}
                />
              </div>
              <div>
                <div className="flex items-center">
                  <div className="flex w-min items-center gap-1">
                    <p className="text-lg font-semibold whitespace-nowrap text-slate-900">{shortenString(address || "")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Header */}
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center whitespace-nowrap">
          <p className="text-lg font-semibold text-slate-800">Posted Jobs</p>
        </div>
        {/* <div className="flex w-full items-center justify-end gap-2">
          <div>
            <span className="mr-2 text-sm text-slate-500">Filter by status</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-slate-300 text-slate-500 capitalize">
                  <Badge variant="secondary" className="bg-gray-500 text-white">
                    <span>Everything</span>
                  </Badge>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Everything</DropdownMenuItem>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Draft</DropdownMenuItem>
                <DropdownMenuItem>Completed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="relative ml-4 w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-9 placeholder:font-medium placeholder:text-slate-400" placeholder="Search job..." />
          </div>
        </div> */}
      </div>

      {/* Tabs and Table */}

      <div className="w-full overflow-x-auto rounded-md border border-slate-200">
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              {/* <TableHead className="text-sm font-medium capitalize tracking-tight text-slate-400"></TableHead> */}
              <TableHead className="text-sm font-medium capitalize tracking-tight text-slate-400">
                <div className="inline-flex cursor-pointer items-center">
                  <span className="whitespace-nowrap">Title</span>
                </div>
              </TableHead>
              {/* <TableHead className="text-sm font-medium capitalize tracking-tight text-slate-400 text-center">
                <div className="inline-flex cursor-pointer items-center">
                  <span className="whitespace-nowrap">Submissions</span>
                </div>
              </TableHead> */}
              <TableHead className="text-sm font-medium capitalize tracking-tight text-slate-400">
                <div className="inline-flex cursor-pointer items-center">
                  <span className="whitespace-nowrap">Deadline</span>
                </div>
              </TableHead>
              <TableHead className="text-sm font-medium capitalize tracking-tight text-slate-400">Reward</TableHead>
              {/* <TableHead className="text-sm font-medium capitalize tracking-tight text-slate-400">Status</TableHead> */}
              {/* <TableHead className="text-sm font-medium capitalize tracking-tight text-slate-400 pl-6">Actions</TableHead> */}
              <TableHead className="text-muted-foreground h-10 px-2 text-left align-middle font-medium pl-0"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((item: Job) => (
              <TableRow key={item.id}>
                {/* <TableCell className="pr-0">
                  <BriefcaseBusiness />
                </TableCell> */}
                <TableCell className="max-w-80 font-medium break-words whitespace-normal text-slate-700">
                  <Link className="cursor-pointer" href={`/job/${item.id}`}>
                    <p
                      className="cursor-pointer overflow-hidden text-[15px] font-medium text-ellipsis whitespace-nowrap text-slate-500 hover:underline"
                      title="Untitled Draft"
                    >
                      {item.title}
                    </p>
                  </Link>
                </TableCell>
                {/* <TableCell className="py-2">
                  <p className="text-center text-sm font-medium text-slate-500">0</p>
                </TableCell> */}
                <TableCell className="items-center py-2">
                  <p className="text-sm font-medium whitespace-nowrap text-slate-500">{dayjs(item.expriedAt).format("DD MMM hh:mm A")}</p>
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center justify-start gap-1">
                    <Image
                      width={48}
                      height={48}
                      className="h-5 w-5 rounded-full"
                      alt="green dollar"
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"
                    />
                    <p className="text-sm font-medium text-slate-700">{item.reward}</p>
                    <p className="text-sm font-medium text-slate-400">ADA</p>
                  </div>
                </TableCell>
                {/* <TableCell className="items-center py-2">
                  <Badge variant="outline" className="bg-slate-100 text-slate-400">
                    Draft
                  </Badge>
                </TableCell> */}
                {/* <TableCell className="px-3 py-2">
                  <p className="px-3 text-slate-400">—</p>
                </TableCell> */}
                <TableCell className="px-0 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-slate-100">
                        <EllipsisVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/dashboard/job/${item.id}/edit`}>
                        <DropdownMenuItem className="cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleDeleteJob(item.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link href={`/dashboard/job/${item.id}/create-contract`}>Create Contract</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {!!jobs?.length && pagination && (
        <div className="mt-6 flex items-center justify-end">
          <p className="mr-4 text-sm text-slate-400">
            <span className="font-bold">{(pagination.page - 1) * pagination.limit + 1}</span> -{" "}
            <span className="font-bold">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{" "}
            <span className="font-bold">{pagination.total}</span> Jobs
          </p>

          <div className="flex gap-4">
            <Button disabled={currentPage <= 0} onClick={() => setCurrentPage((prev) => prev - 1)} size="sm" variant="outline">
              <ChevronLeft className="mr-2 h-5 w-5" />
              Previous
            </Button>

            <Button disabled={pagination.page >= pagination.pages} onClick={() => setCurrentPage((prev) => prev + 1)} size="sm" variant="outline">
              Next
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
