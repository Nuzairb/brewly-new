"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Input } from '@/components/ui/input';
import { Search, Bell, MapPin, Calendar as CalendarIcon, User } from 'lucide-react';

type MainHeaderProps = {
  hideOnPaths?: string[]; // path prefixes where header should be hidden
  replaceSearchOnPaths?: string[]; // path prefixes where search is replaced by alternate content
  alternateRender?: (pathname: string) => React.ReactNode; // used when search is replaced
};

export default function MainHeader({ hideOnPaths = ['/login','/signup','/api'], replaceSearchOnPaths = [], alternateRender }: MainHeaderProps) {
  const pathname = usePathname() || '/';

  // Hide header on configured prefixes
  if (hideOnPaths.some(p => pathname.startsWith(p))) return null;

  const replaceSearch = replaceSearchOnPaths.some(p => pathname.startsWith(p));

  return (
    <header className="w-full bg-white border-b border-[#F0F0F0]">
      <div className="max-w-full mx-auto px-6 py-4 flex items-center gap-4">
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
          {!replaceSearch ? (
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#787777]"><Search size={18} /></div>
                <Input placeholder="Search bundle, date" variant="search" className="pl-12" />
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              {alternateRender ? alternateRender(pathname) : null}
            </div>
          )}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-4 ml-4">
          <button className="px-3 py-2 rounded-md bg-white border border-[#EAEAEA] flex items-center gap-2">
            <MapPin size={16} /> <span className="hidden sm:inline">Dubai Marina</span>
          </button>
          <button className="p-2 rounded-md hover:bg-gray-50"><CalendarIcon size={18} /></button>
          <button className="p-2 rounded-md hover:bg-gray-50"><Bell size={18} /></button>
          <button className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"><User size={16} /></div>
          </button>
        </div>
      </div>
    </header>
  );
}
