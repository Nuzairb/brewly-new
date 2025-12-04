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

import React from "react";
import EventCardsGrid from "./EventCardsGrid";

const eventsData: EventData[] = [
  {
    eventName: "Street Fest Dubai Hills Mall",
    startDate: "15 Sept 2025",
    endDate: "9 Oct 2025",
    expectedFootfall: "High peak evenings & weekends",
    aiSuggestions: "Boost drink , snack bundles",
    status: "Active"
  }
];
export default function EventsSection({ view }: EventsSectionProps) {
  return (
    <div>
      {/* Card View */}
      {view === 'card' && <EventCardsGrid />}
      {/* List View */}
      {view === 'list' && (
        <div className="bg-white opacity-100 relative overflow-auto p-4">
          <div className="w-full overflow-x-auto rounded-lg overflow-hidden border border-[#EEEEEE] bg-white">
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
                {eventsData.map((event, index) => (
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
          </div>
        </div>
      )}
    </div>
  );
}