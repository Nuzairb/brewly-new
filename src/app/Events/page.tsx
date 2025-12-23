"use client";

import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import EventsSection from "@/components/features/events/EventsSection";
import CalendarView from "@/components/features/events/CalendarView";
import { Button } from "@/components/ui/button";
import MainHeader from '@/components/ui/MainHeader';
import CreateEventDialog from '@/components/features/events/CreateEventDialog';

export default function EventsPage() {
  const [view, setView] = React.useState<'list' | 'card' | 'calendar'>('card');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);

  return (
    <AppLayout>
      <div className="px-6">
        <MainHeader variant="default" />
      </div>
      <div className="p-6 w-full box-border">

        {/* Events Heading with action buttons */}
        <div className="flex items-center justify-between mb-6 mt-4">
          <h1 className="font-lato font-medium text-3xl leading-[38px] text-black m-0 truncate">Events</h1>

          <div className="flex items-center gap-4">
            <Button
              variant="pageHeaderSecondary"
              size="pageHeader"
              onClick={() => console.log('Export report')}
            >
              Export Report
            </Button>

            <Button
              variant="pageHeaderPrimary"
              size="pageHeader"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              Create New Event
            </Button>
          </div>
        </div>

        {/* View Toggle and other controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            {/* List View Button */}
            <button
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium relative transition-all duration-300 ease-out
                ${view === 'list' ? 'text-[#1E1E1E] shadow-sm' : 'text-[#787777] hover:bg-[#F0F7F5] hover:text-[#1A5D4A] hover:border hover:border-[#1A5D4A]/10'}`}
              onClick={() => setView('list')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
                   className="transition-all duration-300 ease-out group-hover:scale-110">
                <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="transition-all duration-300 ease-out group-hover:translate-x-0.5">List</span>
              {view === 'list' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5D4A] rounded-full" />}
            </button>

            {/* Card View Button */}
            <button
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium relative transition-all duration-300 ease-out
                ${view === 'card' ? 'text-[#1E1E1E] shadow-sm' : 'text-[#787777] hover:bg-[#F0F7F5] hover:text-[#1A5D4A] hover:border hover:border-[#1A5D4A]/10'}`}
              onClick={() => setView('card')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
                   className="transition-all duration-300 ease-out group-hover:scale-110">
                <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="transition-all duration-300 ease-out group-hover:translate-x-0.5">Card</span>
              {view === 'card' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5D4A] rounded-full" />}
            </button>

            {/* Calendar View Button */}
            <button
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium relative transition-all duration-300 ease-out
                ${view === 'calendar' ? 'text-[#1E1E1E] shadow-sm' : 'text-[#787777] hover:bg-[#F0F7F5] hover:text-[#1A5D4A] hover:border hover:border-[#1A5D4A]/10'}`}
              onClick={() => setView('calendar')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
                   className="transition-all duration-300 ease-out group-hover:scale-110">
                <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 6H14M5 2V4M11 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="transition-all duration-300 ease-out group-hover:translate-x-0.5">Calendar</span>
              {view === 'calendar' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A5D4A] rounded-full" />}
            </button>
          </div>

          {/* Right Side - Filter Button */}
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              size="pageHeader"
              className="group w-[99px] h-[48px] flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:border-[#1A5D4A]/40 hover:bg-[#F0F7F5] hover:shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" 
                   className="transition-all duration-300 ease-out group-hover:scale-110">
                <path d="M2.5 5H17.5M5 10H15M8.33333 15H11.6667" stroke="#787777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-lato font-medium text-[14px] leading-5 text-[#787777] transition-all duration-300 ease-out group-hover:text-[#1A5D4A]">
                Filters
              </span>
            </Button>
          </div>
        </div>

        <CreateEventDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />

        {/* Events Table or Calendar Section */}
        {view === 'calendar' ? <CalendarView /> : <EventsSection view={view} />}
      </div>
    </AppLayout>
  );
}