"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";

interface FilterButtonProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

function FilterButton({ href, children, isActive, className }: FilterButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "ph-no-capture flex items-center gap-2 px-3 py-0 sm:py-0.5 rounded-full border border-slate-200 text-sm hover:bg-violet-50 hover:no-underline",
        isActive ? "bg-violet-50 text-black" : "text-slate-500",
        className,
      )}
    >
      {children}
    </Link>
  );
}

interface HackathonButtonProps {
  href: string;
  name: string;
  logoSrc: string;
  className?: string;
}

function HackathonButton({ href, name, logoSrc, className }: HackathonButtonProps) {
  return (
    <Link
      href={href}
      aria-label={`Go to ${name} Hackathon page`}
      className={cn("flex items-center py-1 font-medium h-6 rounded-full border border-slate-200 px-2 text-sm", className)}
    >
      <Image src={logoSrc || "/placeholder.svg"} alt={`${name} Logo`} width={24} height={24} className="h-full object-contain" />
    </Link>
  );
}

interface FilterNavigationProps {
  className?: string;
}

export function FilterNavigation({ className }: FilterNavigationProps) {
  const pathname = usePathname();

  return (
    <div className={cn("mb-4 flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {/* All filter */}
      <FilterButton href="/" isActive={pathname === "/"}>
        All
      </FilterButton>
      {/* Category filters */}
      <FilterButton href="/category/content/" isActive={pathname === "/category/content/"}>
        Content
      </FilterButton>

      <FilterButton href="/category/design/" isActive={pathname === "/category/design/"}>
        Design
      </FilterButton>

      <FilterButton href="/category/development/" isActive={pathname === "/category/development/"}>
        Dev
      </FilterButton>

      <FilterButton href="/category/other/" isActive={pathname === "/category/other/"}>
        Other
      </FilterButton>

      {/* Hackathon buttons */}
      <HackathonButton
        href="/hackathon/redacted/"
        name="Redacted"
        logoSrc="https://res.cloudinary.com/dgvnuwspr/image/upload/assets//hackathon/redacted/logo-black"
        className="lg:hidden"
      />

      <HackathonButton
        href="/hackathon/breakout/"
        name="Breakout"
        logoSrc="https://res.cloudinary.com/dgvnuwspr/image/upload/assets//hackathon/breakout/logo"
        className="lg:hidden"
      />
    </div>
  );
}
