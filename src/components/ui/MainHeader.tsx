"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Search, Bell, MapPin, Calendar as CalendarIcon } from 'lucide-react';

type HeaderVariant = 'default' | 'no-search' | 'hidden' | 'frontoffice';

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

  const showSearch = variant === 'default' || variant === 'frontoffice';
  const searchPlaceholder = variant === 'frontoffice' ? "Search by order number,date" : "Search bundle, date";

  // time display for frontoffice header — only set on client to avoid SSR hydration mismatch
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    if (variant !== 'frontoffice') return;
    // initialize on client
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, [variant]);

  return (
    <header className="w-full bg-white border-b border-[#F0F0F0] mb-4">
      <div className={`max-w-full mx-auto px-6 ${variant === 'no-search' ? 'pt-2 pb-4' : 'py-4'} flex items-center gap-4 ${variant === 'no-search' ? '-ml-5' : ''}`}>
        {/* Left Side - Search Bar Container (Tailwind-only sizing) */}
        {showSearch ? (
          <div className={`flex-shrink-0 w-[400px] h-[42px] -ml-[30px]`}>
            {/* Search Bar Box */}
            <div className="w-full h-full rounded-[8px] border border-[#D5D6D6] gap-3 pt-2 pr-2 pb-2 pl-4 bg-[#FAFAFA] opacity-100 flex items-center">
              {/* Icon box */}
              <div className="w-[42px] h-[24px] rounded-[6px] flex items-center justify-center pt-1 pb-1 pr-1.5 pl-1.5">
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#787777]">
                  <path d="M19.5 19.5L24.5 24.5M22.1667 12.8333C22.1667 18.0381 17.9548 22.25 12.75 22.25C7.54518 22.25 3.33333 18.0381 3.33333 12.8333C3.33333 7.62847 7.54518 3.41663 12.75 3.41663C17.9548 3.41663 22.1667 7.62847 22.1667 12.8333Z" stroke="#787777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Search Text/Input */}
              <Input type="text" variant="search" placeholder={searchPlaceholder} className="flex-1 h-full border-none shadow-none p-0 bg-transparent ml-3 text-sm" />
            </div>
          </div>
        ) : (
          <div className="flex-shrink-0 w-[400px] h-[42px] -ml-[30px]" aria-hidden />
        )}

        {/* Right: actions - fixed container width/height, buttons right-aligned */}
        <div className="flex items-center gap-4 ml-auto w-[476.66796875px] h-[40px] justify-end -mr-[30px]">
          <button className="h-[40px] px-3 rounded-[8px] bg-[#FAFAFA] border border-[#EAEAEA] flex items-center gap-2 transition-all duration-300 ease-out hover:bg-[#F0F7F5] hover:border-[#1A5D4A]/40">
            <MapPin size={16} /> <span className="hidden sm:inline">Dubai Marina</span>
          </button>

          {variant === 'frontoffice' ? (
            // Frontoffice: show time only besides location/search
            <div className="w-[121px] flex items-center justify-center bg-[#FAFAFA] text-sm text-[#1E1E1E] px-3 py-2 rounded-md border border-[#EAEAEA] mr-[20px]">
              <span className="font-medium text-center" suppressHydrationWarning>
                {now ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : null}
              </span>
            </div>
          ) : (
            <>
              <button className="w-[48px] h-[40px] rounded-[8px] bg-[#FAFAFA] flex items-center justify-center pt-2 pb-2 pl-3 pr-3 transition-all duration-300 ease-out hover:bg-[#F0F7F5] hover:border-[#1A5D4A]/40">
                <CalendarIcon size={24} />
              </button>
              <button className="w-[48px] h-[40px] rounded-[8px] bg-[#FAFAFA] flex items-center justify-center pt-2 pb-2 pl-3 pr-3 transition-all duration-300 ease-out hover:bg-[#F0F7F5] hover:border-[#1A5D4A]/40">
                <Bell size={24} />
              </button>
              <button className="pt-2 pb-2 px-3 flex items-center justify-center transition-all duration-300 ease-out">
                <div className="flex items-center justify-center">
                  <Image src="/icons/Brewly-brain.svg" alt="Profile" width={48} height={40} className="w-[48px] h-[40px] object-cover fill" />
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
