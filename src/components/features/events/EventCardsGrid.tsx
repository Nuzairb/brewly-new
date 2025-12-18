"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { EventDate } from "@/components/ui/card";
import { getEvents } from '@/app/api/events/getEvents';

interface CardEvent {
  id?: string | number;
  day: string;
  month: string;
  title: string;
  description: string;
  time: string;
  location: string;
  image?: string;
}

export default function EventCardsGrid() {
  const [events, setEvents] = useState<CardEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getEvents()
      .then((data) => {
        console.log('Events API response:', data);
        const mapped = (Array.isArray(data) ? data : []).map((event: any) => {
          let dateObj = new Date(event.start_date || event.event_date || event.event_datetime || event.start_datetime || Date.now());
          let day = dateObj.getDate().toString().padStart(2, '0');
          let month = dateObj.toLocaleString('default', { month: 'short' });
          let startTime = event.start_time || (event.event_datetime ? new Date(event.event_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
          let endTime = event.end_time || (event.event_end_datetime ? new Date(event.event_end_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
          let time = startTime && endTime ? `${startTime} - ${endTime}` : startTime || '-';
          return {
            day,
            month,
            title: event.name || '-',
            description: event.description || '-',
            time,
            location: event.venue?.name || '-',
            image: event.image_url || event.image || undefined,
          };
        });
        setEvents(mapped);
        setError(null);
      })
      .catch((err) => {
        console.error('Events API error:', err);
        setError(err instanceof Error ? err.message : String(err));
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-6">
        {loading ? (
          <div className="w-full text-center text-gray-500">Loading events...</div>
        ) : error ? (
          <div className="w-full text-center text-red-500">{error}</div>
        ) : events.length === 0 ? (
          <div className="w-full text-center text-gray-500">No events found.</div>
        ) : (
          events.map((event, idx) => (
            <Link key={event.id ?? idx} href={`/Events/${event.id ?? idx}`} className="block">
              <Card
                className="eventCard group w-[250px] h-[251px] flex flex-col justify-between rounded-2xl p-4 border border-[#E5E7EB] opacity-100 relative overflow-hidden
                          transition-all duration-500 ease-out
                          hover:scale-[1.02] 
                          hover:shadow-2xl
                          hover:border-blue-300/30"
              >
              {/* Background image with smooth overlay transition */}
              {event.image ? (
                <>
                  <img
                    src={event.image}
                    alt="Event"
                    className="absolute inset-0 w-full h-full object-cover z-0
                              transition-all duration-700 ease-out
                              group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 z-0 
                                transition-all duration-500 ease-out
                                group-hover:bg-black/40" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0 
                              transition-all duration-500 ease-out
                              group-hover:bg-gradient-to-br group-hover:from-blue-900/30 group-hover:to-purple-900/30" />
              )}
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 z-0
                            bg-gradient-to-r from-blue-500/0 via-blue-300/0 to-purple-500/0
                            transition-all duration-700 ease-out
                            group-hover:opacity-20
                            group-hover:from-blue-500/10 group-hover:via-blue-300/5 group-hover:to-purple-500/10" />
              
              {/* Content with smooth transitions */}
              <div className="relative z-10">
                {/* Date card with subtle hover animation */}
                <div className="transition-transform duration-500 ease-out
                              group-hover:-translate-y-1">
                  <EventDate day={event.day} month={event.month} />
                </div>
                
                <div className="flex flex-col items-start gap-2 mt-3">
                  {/* Title with smooth slide-up */}
                  <h2 className="w-[165px] h-[37px] font-lato font-semibold text-[24px] leading-[36.86px] text-white m-0 truncate
                                transition-all duration-500 ease-out
                                group-hover:-translate-y-1">
                    {event.title}
                  </h2>
                  
                  {/* Description with smooth fade and slide */}
                  <p className="w-[246px] h-[45px] font-lato font-normal text-[14px] leading-[22.12px] text-white/90 m-0 overflow-hidden line-clamp-2
                              transition-all duration-500 ease-out delay-75
                              group-hover:text-white
                              group-hover:-translate-y-1">
                    {event.description}
                  </p>
                  
                  {/* Info section with staggered animations */}
                  <div className="flex flex-col items-start gap-1 mt-2">
                    {/* Time with icon animation */}
                    <div className="w-[180px] h-[23px] flex items-center gap-2 font-lato font-semibold text-[14px] leading-[22.12px] text-white align-middle text-left
                                  transition-all duration-500 ease-out delay-100
                                  group-hover:text-blue-100
                                  group-hover:translate-x-1">
                      <svg 
                        width="16" 
                        height="16" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        className="transition-all duration-500 ease-out
                                  group-hover:scale-110
                                  group-hover:text-blue-300"
                      >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="inline text-left transition-all duration-500 ease-out
                                     group-hover:translate-x-1">
                        {event.time}
                      </span>
                    </div>
                    
                    {/* Location with icon animation */}
                    <div className="flex items-center gap-2 font-lato font-semibold text-[14px] leading-[22.12px] text-white align-middle text-left
                                  transition-all duration-500 ease-out delay-150
                                  group-hover:text-blue-100
                                  group-hover:translate-x-1">
                      <svg 
                        width="16" 
                        height="16" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        className="transition-all duration-500 ease-out
                                  group-hover:scale-110
                                  group-hover:text-blue-300"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"/>
                      </svg>
                      <span className="inline text-left transition-all duration-500 ease-out
                                     group-hover:translate-x-1">
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent
                            transition-all duration-500 ease-out
                            group-hover:border-blue-400/30" />
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}