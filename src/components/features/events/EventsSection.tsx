interface EventsSectionProps {
  view: 'list' | 'card';
}

// Table data type
interface EventData {
  eventName: string;
  startDate: string;
  endDate: string;
  expectedFootfall: string;
  aiSuggestions: string;
  status: 'Active' | 'Inactive';
}

import React, { useEffect, useState } from "react";
import EventCardsGrid from "./EventCardsGrid";

// Update EventData type to match API response (add optional fields for safety)
interface ApiEventData {
  id: number;
  name: string;
  start_date?: string;
  end_date?: string;
  event_datetime?: string;
  event_end_datetime?: string;
  description?: string;
  status?: string;
  [key: string]: any;
}

export default function EventsSection({ view }: EventsSectionProps) {
  const [events, setEvents] = useState<EventData[]>([]);
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
        // Map API data to frontend fields
        const mapped = data.map((event: any) => ({
          eventName: event.name || '-',
          startDate: event.start_date || event.event_start_date || event.event_datetime?.slice(0, 10) || '-',
          endDate: event.end_date || event.event_end_date || event.event_end_datetime?.slice(0, 10) || '-',
          expectedFootfall: event.expected_footfall || event.expectedFootfall || '-',
          aiSuggestions: event.ai_suggestions || event.aiSuggestions || '-',
          status: event.status === 'active' || event.status === 'Active' ? 'Active' : 'Inactive',
        }));
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
    <div>
      {/* Card View */}
      {view === 'card' && <EventCardsGrid />}
      {/* List View */}
      {view === 'list' && (
        <div className="bg-white opacity-100 relative overflow-auto p-4">
          <div className="w-full overflow-x-auto rounded-lg overflow-hidden border border-[#EEEEEE] bg-white">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading events...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : (
              <table className="w-full min-w-[900px] rounded-lg overflow-hidden">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-[#EEEEEE]">
                    <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-5 text-[#787777] whitespace-nowrap">Event Name</th>
                    <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-5 text-[#787777] whitespace-nowrap">Start Date</th>
                    <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-5 text-[#787777] whitespace-nowrap">End Date</th>
                    <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-5 text-[#787777] whitespace-nowrap">Expected Footfall Impact</th>
                    <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-5 text-[#787777] whitespace-nowrap">AI Sales Suggestions</th>
                    <th className="text-left px-4 py-2 font-lato font-medium text-[14px] leading-5 text-[#787777] whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">
                        <span className="font-lato font-medium text-[14px] leading-5 text-[#1E1E1E] whitespace-nowrap">{event.eventName}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="font-lato font-medium text-[14px] leading-5 text-[#1E1E1E] whitespace-nowrap">{event.startDate}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="font-lato font-medium text-[14px] leading-5 text-[#1E1E1E] whitespace-nowrap">{event.endDate}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="font-lato font-medium text-[14px] leading-5 text-[#1E1E1E] whitespace-nowrap">{event.expectedFootfall}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="font-lato font-medium text-[14px] leading-5 text-[#1E1E1E] whitespace-nowrap">{event.aiSuggestions}</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className={`inline-flex rounded px-3 py-1 ${event.status === 'Active' ? 'bg-[#10A7601A]' : 'bg-[#FF23111A]'} items-center justify-center`}>
                          <span className={`font-lato font-normal text-[14px] leading-5 ${event.status === 'Active' ? 'text-[#10A760]' : 'text-[#FF2311]'}`}>{event.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}