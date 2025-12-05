import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { EventDate } from "@/components/ui/card";

interface CardEvent {
  day: string;
  month: string;
  title: string;
  description: string;
  time: string;
  location: string;
}

export default function EventCardsGrid() {
  const [events, setEvents] = useState<CardEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/events/upcoming")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        // Map API data to card fields
        const mapped = data.map((event: any) => {
          // Date parsing
          let dateObj = new Date(event.start_date || event.event_date || event.event_datetime || event.start_datetime || Date.now());
          let day = dateObj.getDate().toString().padStart(2, '0');
          let month = dateObj.toLocaleString('default', { month: 'short' }); // Use short month name
          // Time formatting
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
          };
        });
        setEvents(mapped);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center text-gray-500">Loading events...</div>
        ) : error ? (
          <div className="col-span-3 text-center text-red-500">{error}</div>
        ) : events.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">No events found.</div>
        ) : (
          events.map((event, idx) => (
            <Card key={idx} className="eventCard w-[250px] h-[251px] flex flex-col justify-between rounded-2xl p-4 border border-[#E5E7EB] opacity-100">
              <EventDate day={event.day} month={event.month} />
              <div className="flex flex-col items-start gap-2 mt-3">
                <h2 className="w-[165px] h-[37px] font-lato font-semibold text-[24px] leading-[36.86px] text-[#1E1E1E] m-0 align-middle bg-[#fbfbfb] opacity-100">{event.title}</h2>
                <p className="w-[246px] h-[45px] font-lato font-normal text-[14px] leading-[22.12px] text-[#1E1E1E] m-0 align-middle bg-[#fbfbfb] opacity-100 overflow-hidden line-clamp-2">{event.description}</p>
                <div className="flex flex-col items-start gap-1 mt-2">
                    <div className="w-[180px] h-[23px] flex items-center gap-2 font-lato font-semibold text-[14px] leading-[22.12px] text-[#1E1E1E] align-middle bg-[#fbfbfb] opacity-100 text-left">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#1E1E1E" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="inline text-left">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 font-lato font-semibold text-[14px] leading-[22.12px] text-[#1E1E1E] align-middle bg-[#fbfbfb] opacity-100 text-left">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="inline text-left">{event.location}</span>
                    </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
