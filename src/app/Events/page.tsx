"use client";

import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import EventsPageHeader from "@/components/features/events/EventsPageHeader";
import EventsSection from "@/components/features/events/EventsSection";
import CalendarView from "@/components/features/events/CalendarView";
import { Button } from "@/components/ui/button";
import { getEvents } from "../api/events/getEvents";

export default function EventsPage() {
  const [view, setView] = React.useState<'list' | 'card' | 'calendar'>('card');
  
  return (
    <AppLayout>
      <div className="p-6 w-full box-border">
        {/* Events Page Header with Search and Buttons */}
        <EventsPageHeader />

        {/* Events Heading */}
        <h1 className="font-lato font-medium text-3xl leading-[38px] text-black m-0 mb-6 mt-2.5 truncate">
          Events
        </h1>

        {/* View Toggle and Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          {/* Left Side - View Toggle */}
          <div className="flex gap-4">
            {/* List View Button */}
            <button
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium relative transition-all duration-300 ease-out
                ${view === 'list' 
                  ? 'text-[#1E1E1E] shadow-sm' 
                  : 'text-[#787777] hover:bg-[#F0F7F5] hover:text-[#1A5D4A] hover:border hover:border-[#1A5D4A]/10'
                }
              `}
              onClick={() => setView('list')}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-300 ease-out group-hover:scale-110"
              >
                <path 
                  d="M2 4H14M2 8H14M2 12H14" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />
              </svg>
              <span className="transition-all duration-300 ease-out group-hover:translate-x-0.5">
                List
              </span>
              {view === 'list' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5D4A] rounded-full 
                              transition-all duration-300 ease-out
                              group-hover:scale-x-110" />
              )}
            </button>
            
            {/* Card View Button */}
            <button
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium relative transition-all duration-300 ease-out
                ${view === 'card' 
                  ? 'text-[#1E1E1E] shadow-sm ' 
                  : 'text-[#787777] hover:text-[#1A5D4A] hover:border hover:border-[#1A5D4A]/10'
                }
              `}
              onClick={() => setView('card')}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-300 ease-out group-hover:scale-110"
              >
                <rect 
                  x="2" y="2" 
                  width="5" height="5" 
                  rx="1" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="transition-all duration-300 ease-out group-hover:stroke-[#1A5D4A]"
                />
                <rect 
                  x="9" y="2" 
                  width="5" height="5" 
                  rx="1" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="transition-all duration-300 ease-out group-hover:stroke-[#1A5D4A]"
                />
                <rect 
                  x="2" y="9" 
                  width="5" height="5" 
                  rx="1" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="transition-all duration-300 ease-out group-hover:stroke-[#1A5D4A]"
                />
                <rect 
                  x="9" y="9" 
                  width="5" height="5" 
                  rx="1" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="transition-all duration-300 ease-out group-hover:stroke-[#1A5D4A]"
                />
              </svg>
              <span className="transition-all duration-300 ease-out group-hover:translate-x-0.5">
                Card
              </span>
              {view === 'card' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5D4A] rounded-full 
                              transition-all duration-300 ease-out
                              group-hover:scale-x-110" />
              )}
            </button>
            
            {/* Calendar View Button */}
            <button
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium relative transition-all duration-300 ease-out
                ${view === 'calendar' 
                  ? 'text-[#1E1E1E] shadow-sm ' 
                  : 'text-[#787777] hover:bg-[#F0F7F5] hover:text-[#1A5D4A] hover:border hover:border-[#1A5D4A]/10'
                }
              `}
              onClick={() => setView('calendar')}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-300 ease-out group-hover:scale-110"
              >
                <rect 
                  x="2" y="3" 
                  width="12" height="11" 
                  rx="1" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="transition-all duration-300 ease-out group-hover:stroke-[#1A5D4A]"
                />
                <path 
                  d="M2 6H14M5 2V4M11 2V4" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out group-hover:stroke-[#1A5D4A]"
                />
              </svg>
              <span className="transition-all duration-300 ease-out group-hover:translate-x-0.5">
                Calendar
              </span>
              {view === 'calendar' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5D4A] rounded-full 
                              transition-all duration-300 ease-out
                              group-hover:scale-x-110" />
              )}
            </button>
          </div>

          {/* Right Side - Filter and Download Buttons */}
          <div className="flex gap-4 items-center">
            {/* Filter Button with Animation */}
            <Button
              variant="outline"
              size="pageHeader"
              className="group w-[99px] h-[48px] flex items-center justify-center gap-2 
                        transition-all duration-300 ease-out
                        hover:border-[#1A5D4A]/40 hover:bg-[#F0F7F5] hover:shadow-sm"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-300 ease-out 
                          group-hover:scale-110 
                          group-hover:-rotate-12"
              >
                <path
                  d="M2.5 5H17.5M5 10H15M8.33333 15H11.6667"
                  stroke="#787777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 ease-out 
                            group-hover:stroke-[#1A5D4A]"
                />
              </svg>
              <span className="font-lato font-medium text-[14px] leading-5 text-[#787777] 
                             transition-all duration-300 ease-out 
                             group-hover:text-[#1A5D4A] group-hover:translate-x-0.5">
                Filters
              </span>
            </Button>

            {/* Download Button with Animation */}
            <Button
              variant="outline"
              size="pageHeader"
              className="group w-[122px] h-[48px] flex items-center justify-center gap-2 
                        relative overflow-hidden transition-all duration-300 ease-out
                        hover:border-[#1A5D4A]/40 hover:bg-[#F0F7F5] hover:shadow-sm"
            >
              {/* Download icon animation */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-2 transition-all duration-300 ease-out
                          group-hover:-translate-y-1 group-hover:opacity-0"
              >
                <path
                  d="M12 16L12 8M12 16L9 13M12 16L15 13"
                  stroke="#787777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 ease-out"
                />
                <path
                  d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12"
                  stroke="#787777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 ease-out"
                />
              </svg>
              
              {/* Animated download icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-2 transition-all duration-300 ease-out
                          opacity-0 -translate-y-1
                          group-hover:opacity-100 group-hover:translate-y-0"
              >
                <path
                  d="M12 16L12 8M12 16L9 13M12 16L15 13"
                  stroke="#1A5D4A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 ease-out"
                />
                <path
                  d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12"
                  stroke="#1A5D4A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 ease-out"
                />
                {/* Animated arrow */}
                <path
                  d="M12 8L12 16"
                  stroke="#1A5D4A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out 
                            group-hover:animate-bounce "
                />
              </svg>
              
              <span className="font-lato font-medium text-[14px] leading-5 text-[#787777] 
                             transition-all duration-300 ease-out 
                             group-hover:text-[#1A5D4A] group-hover:translate-x-1 
                             whitespace-nowrap pl-4">
                Download all
              </span>
            </Button>
          </div>
        </div>

        {/* Events Table or Calendar Section */}
        {view === 'calendar' ? <CalendarView /> : <EventsSection view={view} />}
      </div>
    </AppLayout>
  );
}