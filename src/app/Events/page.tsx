"use client";

import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import EventsPageHeader from "@/components/features/events/EventsPageHeader";
import EventsSection from "@/components/features/events/EventsSection";
import CalendarView from "@/components/features/events/CalendarView";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const [view, setView] = React.useState<'list' | 'card' | 'calendar'>('list');
  return (
    <AppLayout>
      <div 
        style={{ 
          padding: "24px",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {/* Events Page Header with Search and Buttons */}
        <EventsPageHeader />

        {/* Events Heading */}
        <h1
          style={{
            fontFamily: "Lato",
            fontWeight: 500,
            fontStyle: "normal",
            fontSize: 32,
            lineHeight: "38px",
            color: "#000000",
            margin: 0,
            marginBottom: 24,
            marginTop: 10,
          }}
        >
          Events
        </h1>

        {/* View Toggle and Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          {/* Left Side - View Toggle */}
          <div className="flex gap-4">
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 ${view === 'list' ? 'bg-gray-100 text-[#1E1E1E]' : 'text-[#787777]'}`}
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
              }}
              onClick={() => setView('list')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              List
            </button>
            
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 ${view === 'card' ? 'bg-gray-100 text-[#1E1E1E]' : 'text-[#787777]'}`}
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
              }}
              onClick={() => setView('card')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Card
            </button>
            
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 ${view === 'calendar' ? 'bg-gray-100 text-[#1E1E1E]' : 'text-[#787777]'}`}
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
              }}
              onClick={() => setView('calendar')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 6H14M5 2V4M11 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Calendar
            </button>
          </div>

          {/* Right Side - Filter and Download Buttons */}
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              size="pageHeader"
              className="w-[99px] h-[48px] flex items-center justify-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 5H17.5M5 10H15M8.33333 15H11.6667"
                  stroke="#787777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-lato font-medium text-[14px] leading-5 text-[#787777]">Filters</span>
            </Button>

            <Button
              variant="outline"
              size="pageHeader"
              className="w-[113px] h-[48px] flex items-center justify-center gap-2"
            >
              <span className="font-lato font-medium text-[14px] leading-5 text-[#787777] whitespace-nowrap">Download all</span>
            </Button>
          </div>
        </div>

        {/* Events Table or Calendar Section */}
        {view === 'calendar' ? <CalendarView /> : <EventsSection />}
      </div>
    </AppLayout>
  );
}
