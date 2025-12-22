"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Input } from '@/components/ui/input';
import { Search, Bell, MapPin, Calendar as CalendarIcon, User } from 'lucide-react';

type HeaderVariant = 'default' | 'no-search' | 'hidden' | 'search-left';

type MainHeaderProps = {
  variant?: HeaderVariant; // default: 'default'
  hideOnPaths?: string[]; // path prefixes where header should be hidden
  alternateRender?: (pathname: string) => React.ReactNode; // used when search is replaced
};

export default function MainHeader({
  variant = 'default',
  hideOnPaths = ['/login', '/signup', '/api'],
  alternateRender,
}: MainHeaderProps) {
  const pathname = usePathname() || '/';

  // Hide header globally via variant or by path prefixes
  if (variant === 'hidden') return null;
  if (hideOnPaths.some((p) => pathname.startsWith(p))) return null;

  const showSearch = variant === 'default';
  const showSearchLeft = variant === 'search-left';

  const actionBtn = "h-10 px-3 rounded-md bg-white border border-[#EAEAEA] flex items-center gap-2";
  const actionIconBtn = "h-10 w-10 rounded-md bg-white border border-[#EAEAEA] flex items-center justify-center";

  return (
    <header className="w-full bg-white border-b border-[#F0F0F0]">
      <div className="max-w-full mx-auto px-6 py-4 flex items-center gap-4">
        {showSearchLeft ? (
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#787777]"><Search size={18} /></div>
              <Input placeholder="Search bundle, date" variant="search" className="pl-12" />
            </div>
          </div>
        ) : (
          <>
            {/* Left: logo / back */}
            <div className="flex items-center gap-3 min-w-[220px]">
              <div className="w-10 h-10 rounded-md bg-[#00674E] flex items-center justify-center text-white font-bold">B</div>
              <div className="hidden md:block">
                <div className="text-lg font-lato font-semibold">Brewly</div>
                <div className="text-sm text-[#787777]">AI Suggested Bundles</div>
              </div>
            </div>

            {/* Middle: search or alternate slot */}
            <div className="flex-1">
              {showSearch ? (
                <div className="max-w-2xl mx-auto">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#787777]"><Search size={18} /></div>
                    <Input placeholder="Search bundle, date" variant="search" className="pl-12" />
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">{alternateRender ? alternateRender(pathname) : null}</div>
              )}
            </div>

            {/* Right: actions (uniform height) */}
            <div className="flex items-center gap-4 ml-4">
              <button className={actionBtn}>
                <MapPin size={16} /> <span className="hidden sm:inline">Dubai Marina</span>
              </button>
              <button className={actionIconBtn}><CalendarIcon size={18} /></button>
              <button className={actionIconBtn}><Bell size={18} /></button>
              <button className={actionIconBtn}>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"><User size={16} /></div>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
