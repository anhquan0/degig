"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/utils";
import { AlignLeft, Wallet } from "lucide-react";
import { NavLink } from "./NavLink";
import { Separator } from "@/components/ui/separator";
import { ExternalImage } from "@/components/ui/cloudinary-image";
import { useDisclosure } from "@/hooks/use-disclosure";
import Link from "next/link";

interface Props {
  onLoginOpen: () => void;
  onWalletOpen: () => void;
  walletBalance: number;
}

// const AnnouncementBar = dynamic(() =>
//   import('@/features/navbar').then((mod) => mod.AnnouncementBar),
// );

export const MobileNavbar = ({ onWalletOpen }: Props) => {
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

  const MobileDrawer = () => {
    return (
      <Sheet open={isDrawerOpen} onOpenChange={onDrawerClose}>
        <SheetContent side="left" className="w-[300px] p-0 sm:w-[380px]">
          <SheetClose />
          <div className="px-4 pb-8">
            {
              <div className="ph-no-capture flex items-center gap-3">
                <Button variant="link" className="text-semibold mr-3 p-0 text-slate-500">
                  Login
                </Button>
                <Separator orientation="vertical" className="h-5 bg-slate-300" />
                <Button variant="ghost" className="text-semibold text-brand-purple">
                  Sign Up
                </Button>
              </div>
            }

            {
              <Button variant="ghost" className="text-brand-purple text-base">
                Complete your Profile
              </Button>
            }
            <div className="ph-no-capture flex flex-col">
              {/* {LISTING_NAV_ITEMS?.map((navItem) => {
                const isCurrent = `${navItem.href}` === router.asPath;
                return (
                  <NavLink
                    onClick={() => {
                      posthog.capture(navItem.posthog);
                      onDrawerClose();
                    }}
                    key={navItem.label}
                    className="ph-no-capture"
                    href={navItem.href ?? "#"}
                    label={renderLabel(navItem)}
                    isActive={isCurrent}
                  />
                );
              })} */}
            </div>
            <Separator className="my-2 bg-slate-300" />
            <div className="ph-no-capture flex flex-col">
              {/* {CATEGORY_NAV_ITEMS?.map((navItem) => {
                const isCurrent = `${navItem.href}` === router.asPath;
                return (
                  <NavLink
                    className="ph-no-capture"
                    onClick={() => {
                      posthog.capture(navItem.posthog);
                      onDrawerClose();
                    }}
                    key={navItem.label}
                    href={navItem.href ?? "#"}
                    label={renderLabel(navItem)}
                    isActive={isCurrent}
                  />
                );
              })} */}
            </div>
            <Separator className="my-2 bg-slate-300" />
            <NavLink href={"/feed"} label={"Activity Feed"} isActive={false} onClick={onDrawerClose} />
            <NavLink href={"/leaderboard"} label={"Leaderboard"} isActive={false} onClick={onDrawerClose} />
            <Link href={"/hackathon/breakout"} className={cn("flex items-center py-2 font-medium", "h-10")}>
              <ExternalImage alt="Redacted Logo" src="/hackathon/breakout/logo" className="h-full object-contain" />
            </Link>
            <Link href={"/hackathon/redacted"} className={cn("flex items-center py-2 font-medium", "h-10")}>
              <ExternalImage alt="Redacted Logo" src="/hackathon/redacted/logo-black" className="h-full object-contain" />
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <>
      {/* {router.pathname === '/' && <AnnouncementBar />} */}
      <div className="sticky top-0 z-50">
        <div className="flex items-center justify-between border-b border-black/20 bg-white px-1 py-0.5 lg:hidden">
          <div className="flex items-center gap-0">
            <Button variant="ghost" size="sm" className="hover:bg-transparent" onClick={onDrawerOpen}>
              <AlignLeft className="h-6 w-6 text-slate-600" />
            </Button>
            <Link href="/" className="flex items-center hover:no-underline">
              <img className="h-[1.3rem] cursor-pointer object-contain" alt="DeGig Earn" src="/assets/logo.svg" />
            </Link>
          </div>

          <MobileDrawer />
          <div className="flex items-center gap-1">
            {
              <>
                <div className="relative">
                  <div
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-slate-500 transition-all duration-100 hover:bg-slate-100 hover:text-slate-700"
                    onClick={onWalletOpen}
                  >
                    <Wallet className="text-brand-purple h-7 w-7" />
                    <span className="bg-brand-purple/95 absolute top-px -right-1.5 block rounded-md px-1 py-px text-[10px] font-semibold tracking-tight text-white sm:hidden">
                      ${10000}
                    </span>
                    <p className="hidden text-sm font-semibold sm:block"> ${10000}</p>
                  </div>
                </div>
              </>
            }
            {/* {ready && authenticated && <UserMenu />} */}
          </div>
          {
            <Button variant="ghost" className="ph-no-capture text-brand-purple mr-2 text-base">
              Login
            </Button>
          }
        </div>
      </div>
    </>
  );
};
