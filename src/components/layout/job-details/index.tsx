/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorSection } from "@/components/common/ErrorSection";
import { cn } from "@/utils";
import Link from "next/link";
import { getURLSanitized } from "@/utils/getURLSanitized";
import { ExternalLink } from "lucide-react";
import { JobInterface } from "@/interface";
import { JobDetailHeader } from "./JobDetailHeader";
import { RightSideBar } from "@/components/layout/job-details/RightSideBar";

interface JobPageProps {
  job: JobInterface | null;
  children: React.ReactNode;
  maxW?: "7xl" | "6xl" | "5xl" | "4xl" | "3xl" | "2xl" | "xl" | "lg" | "md";
}

export function JobPageLayout({ job: initialJob, children, maxW = "7xl" }: JobPageProps) {
  const iterableSkills = initialJob?.skills?.map((e) => e.skills) ?? [];

  return (
    <>
      <div className="bg-white">
        {initialJob === null && <ErrorSection />}
        {initialJob !== null && !initialJob?.id && <ErrorSection message="Sorry! The bounty you are looking for is not available." />}
        {initialJob !== null && !!initialJob?.id && (
          <div className="mx-auto w-full px-2 lg:px-6">
            <div className="mx-auto w-full max-w-7xl">
              <JobDetailHeader job={initialJob} />
              <div
                className={cn(
                  "flex min-h-screen flex-col items-center justify-center gap-0 bg-white md:flex-row md:items-start md:justify-between md:gap-4",
                  maxW,
                )}
              >
                <div className="static top-14 h-full w-full grow md:sticky md:w-[22rem]">
                  <RightSideBar job={initialJob} skills={iterableSkills} />
                </div>
                <div className="flex h-full w-full grow flex-col gap-8 border-slate-100 pb-10 md:border-l md:pl-5">
                  <div className="w-full">{children}</div>
                  <div className="flex w-full flex-col items-start md:hidden">
                    <p className="mb-1.5 h-full text-center text-xs font-semibold text-slate-600">SKILLS NEEDED</p>
                    <div className="flex flex-wrap gap-3">
                      {iterableSkills?.map((skill: any) => (
                        <div className="m-0 rounded-sm bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600" key={skill}>
                          <p className="text-xs">{skill}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {initialJob.poc && (
                    <div className="flex w-full flex-col items-start md:hidden">
                      <p className="h-full text-center text-xs font-semibold text-slate-600">CONTACT</p>
                      <p>
                        <Link className="ph-no-capture text-xs font-medium text-[#64768b]" href={getURLSanitized(initialJob.poc)}>
                          Reach out
                          <ExternalLink className="mx-1 mb-1 inline h-3 w-3 text-[#64768b]" />
                        </Link>
                        <span className="text-xs text-slate-500">if you have any questions about this initialJob</span>
                      </p>
                    </div>
                  )}

                  {/* <Comments
                    isTemplate={isTemplate}
                    isAnnounced={initialJob?.isWinnersAnnounced ?? false}
                    jobSlug={initialJob?.slug ?? ""}
                    jobType={initialJob?.type ?? ""}
                    poc={initialJob?.poc as User}
                    sponsorId={initialJob?.sponsorId}
                    isVerified={initialJob?.sponsor?.isVerified}
                    refId={initialJob?.id ?? ""}
                    refType="BOUNTY"
                    count={commentCount}
                    setCount={setCommentCount}
                    isDisabled={!initialJob.isPublished && initialJob.status === "OPEN"}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
