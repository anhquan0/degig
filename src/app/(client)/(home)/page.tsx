"use client";
import JobItem from "@/components/homefeed/job-item";
import { FilterNavigation } from "@/components/homefeed/filter-navigation";
import { ApiResponseInterface } from "@/interface";
import useSWR from "swr";
import Loading from "@/components/common/loading";
import { get } from "@/lib/axios";
import { Job } from "@prisma/client";
import { shortenString } from "@/utils/shorten-string";
import { ErrorSection } from "@/components/common/ErrorSection";
import { parseError } from "@/utils/parse-error";

export default function MainContent() {
  const { data, error, isLoading } = useSWR<ApiResponseInterface>("/job", get);
  if (error) return <ErrorSection title={parseError(error)} />;
  if (isLoading) return <Loading />;
  const { data: jobs } = data || { data: [] };
  return (
    <main className="min-h-screen bg-white">
      <div className=" mx-auto px-4 py-6">
        {/* Tabs */}
        <FilterNavigation />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Hero Banner */}

            {/* Freelance Gigs */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold">🤝 New Jobs</span>
                </div>
              </div>
              {/* Gig List */}
              <div className="space-y-4">
                {jobs.map((job: Job) => (
                  <JobItem
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    organization={shortenString(job.walletAddress)}
                    organizationLogo={`/assets/logo.png`}
                    amount={job.reward ?? 0}
                    currency="ADA"
                    currencyLogo="https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"
                    dueInDays={job.expriedAt ? Math.ceil((new Date(job.expriedAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0}
                    commentCount={0}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* How it Works */}
            <div className="border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6">HOW IT WORKS</h3>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Post & Escrow</h4>
                    <p className="text-sm text-gray-600">Employers post projects, matches freelancers,Smart contract locks funds (ADA).</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Track & Payment</h4>
                    <p className="text-sm text-gray-600">Milestones tracked transparently on blockchain, funds released upon completion, 3-5% fee.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Fair Dispute</h4>
                    <p className="text-sm text-gray-600">Three independent arbitrators vote to resolve disputes, 1% fee, ensuring transparency.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Earners */}
          </div>
        </div>
      </div>
    </main>
  );
}
