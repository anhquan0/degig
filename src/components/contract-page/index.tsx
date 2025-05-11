"use client";

import { Lock, MessageSquare, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { DefaultLayout } from "../layout/default";

interface NavItemProps {
  children: ReactNode;
  link?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  isExpanded: boolean;
  className?: string;
  onClick?: () => void;
}

export function NavItem({ children, link, isExpanded, className, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === link;

  const content = (
    <div
      className={cn(
        "flex cursor-pointer items-center rounded-md px-4 py-3",
        isActive ? "bg-slate-100 font-medium text-slate-900" : "text-slate-500 hover:bg-slate-50",
        className,
      )}
      onClick={onClick}
    >
      {/* <Icon className="h-5 w-5" /> */}
      <span
        className={cn("nav-item-text transition-all duration-200 ease-in-out", isExpanded ? "ml-3 opacity-100" : "absolute -ml-[9999px] opacity-0")}
      >
        {children}
      </span>
    </div>
  );

  if (link) {
    return link.startsWith("http") ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <Link href={link}>{content}</Link>
    );
  }

  return content;
}

export function DashboardLayout({ children, isCollapsible = false }: { children: ReactNode; isCollapsible?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(!isCollapsible);

  const handleMouseEnter = () => {
    if (isCollapsible) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsible) {
      setIsExpanded(false);
    }
  };

  const isCreateListingAllowed = true; // Simplified for demo
  const user = { role: "USER", currentSponsor: { id: "1" }, hackathonId: "1" }; // Mock user data

  const LinkItems = [
    { name: "Home", link: "/dashboard", icon: null! },
    {
      name: "Your Contracts",
      link: "/dashboard/contracts",
      icon: null!,
    },
    // {
    //   name: "Submission",
    //   link: "/dashboard/work",
    //   icon: Users,
    // },
    {
      name: "Disputes",
      link: "/dashboard/disputes",
      icon: MessageSquare,
    },
  ];

  const showContent = true;

  return (
    <DefaultLayout>
      <div className="bg-white">
        <div className="flex min-h-[80vh] px-3 md:hidden">
          <p className="pt-20 text-center text-xl font-medium text-slate-500">
            The Sponsor Dashboard on Earn is not optimized for mobile yet. Please use a desktop to check out the Sponsor Dashboard
          </p>
        </div>
        <div className="hidden min-h-screen justify-start md:flex">
          <div
            className={cn(
              "sponsor-dashboard-sidebar overflow-x-hidden border-r border-slate-200 bg-white pt-5 whitespace-nowrap",
              "transition-all duration-300 ease-in-out",
              isCollapsible ? "fixed" : "static",
              isExpanded ? ["w-64 max-w-64 min-w-64", "expanded"] : ["w-20 max-w-20 min-w-20"],
              "top-12 bottom-0 left-0 z-10",
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={cn("flex items-center justify-between px-4 pb-6", isExpanded ? "pr-4 pl-6" : "px-4")}>
              <Link href="/dashboard/new">
                <Button
                  className={cn("w-full gap-2 py-5.5 text-base", "disabled:cursor-not-allowed disabled:opacity-50")}
                  disabled={!isCreateListingAllowed && user?.role !== "GOD"}
                  variant="default"
                >
                  <Plus className="h-3 w-3" />
                  <p
                    className={cn(
                      "nav-item-text transition-all duration-200 ease-in-out",
                      isExpanded ? ["static ml-0 opacity-100"] : ["absolute -ml-[9999px] opacity-0"],
                    )}
                  >
                    <span>Create New Job</span>
                  </p>
                  {!isCreateListingAllowed && user?.role !== "GOD" && <Lock className="h-4 w-4" />}
                </Button>
              </Link>
            </div>
            {LinkItems.map((link) => (
              <NavItem key={link.name} link={link.link} icon={link.icon} isExpanded={isExpanded}>
                {link.name}
              </NavItem>
            ))}
          </div>
          {showContent && (
            <div
              className={cn(
                "w-full flex-1 bg-white py-5 pr-8 pl-4 transition-[margin-left] duration-300 ease-in-out",
                isCollapsible ? "ml-20" : "ml-0",
              )}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
