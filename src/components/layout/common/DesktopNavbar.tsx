"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";

const WalletConnect = dynamic(() => import("@/components/common/wallet").then((mod) => mod.WalletConnect), { ssr: false, loading: () => <div /> });

interface Props {
  onLoginOpen: () => void;
  onSearchOpen: () => void;
  onWalletOpen: () => void;
  walletBalance: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DesktopNavbar = ({ onLoginOpen, onSearchOpen, onWalletOpen, walletBalance }: Props) => {
  const pathname = usePathname(); 
   const { address } = useWallet();

  const isDashboardRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/hackathon");
  const maxWidth = useMemo(() => (isDashboardRoute ? "max-w-full" : "max-w-7xl"), [isDashboardRoute]);

  const padding = useMemo(() => (isDashboardRoute ? "pr-8 pl-6" : "px-2 lg:px-6"), [isDashboardRoute]);

  return (
    <div className={cn("hidden h-14 border-b border-slate-200 bg-white text-slate-500 lg:flex", padding)}>
      <div className={cn("mx-auto flex w-full justify-between", maxWidth)}>
        <div className="flex w-fit items-center gap-3 lg:gap-6">
          <Link href="/" className="flex items-center gap-3 hover:no-underline">
            <Image className="h-[1.4rem] cursor-pointer object-contain" alt="DeGig" src="/assets/logo.png" width={56} height={22} />

            {isDashboardRoute && (
              <>
                <div className="h-6 w-[1.5px] bg-slate-300" />
                <p className="text-sm tracking-[1.5px]">Dashboard</p>
              </>
            )}
          </Link>

          {pathname !== "/search" && !pathname.startsWith("/new/") && (
            <div
              className="flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-2 text-slate-500 transition-all duration-100 hover:bg-slate-100 hover:text-slate-700"
              onClick={onSearchOpen}
            >
              <Search className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* {!pathname.startsWith("/new/") && (
          <div className="w-fit xl:absolute xl:left-2/4 xl:-translate-x-2/4">
            <div className="mx-6 flex h-full items-center justify-center">
              <div className="ph-no-capture flex h-full flex-row items-center gap-7">
                {[0, 1, 2, 3, 4].map((navItem, index) => {
                  const isCurrent = `${navItem}` === pathname;
                  return <NavLink className="ph-no-capture" key={index} href={`${navItem}`} label={`${navItem}`} isActive={isCurrent} />;
                })}
              </div>
            </div>
          </div>
        )} */}

        <div className="flex items-center gap-4 py-1.5">
          {/* {!ready && (
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          )} */}

          {true && (
            <div className="ph-no-capture flex items-center gap-2">
              {!isDashboardRoute && address && (
                <Button variant="ghost" size="sm" className="text-xs font-semibold" asChild>
                  <Link href="/dashboard">
                    <span>Dashboard</span>
                    <div className="block h-1.5 w-1.5 rounded-full bg-sky-400" />
                  </Link>
                </Button>
              )}

              <WalletConnect />

              {/* {true && (
                <>
                  <div
                    className="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-slate-500 transition-all duration-100 hover:bg-slate-100 hover:text-slate-700"
                    onClick={onWalletOpen}
                  >
                    <Wallet className="text-brand-purple h-6 w-6" />
                    <p className="text-sm font-semibold">${10000}</p>
                  </div>
                </>
              )} */}
              {/* <UserMenu /> */}
            </div>
          )}

          {/* {ready && !authenticated && (
            <div className="ph-no-capture flex items-center gap-2">
              <div className="flex items-center gap-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-semibold"
                  onClick={() => {
                    posthog.capture("create a job_navbar");
                    router.push("/sponsor");
                  }}
                >
                  <span>Become a Sponsor</span>
                  <div className="block h-1.5 w-1.5 rounded-full bg-sky-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-semibold"
                  onClick={() => {
                    posthog.capture("login_navbar");
                    onLoginOpen();
                  }}
                >
                  Login
                </Button>
              </div>
              <Button
                variant="default"
                size="sm"
                className="my-1 w-full px-4 text-xs font-semibold"
                onClick={() => {
                  posthog.capture("signup_navbar");
                  onLoginOpen();
                }}
              >
                Sign Up
              </Button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
