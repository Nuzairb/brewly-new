"use client";

import React from "react";
import { Button } from "@/components/ui/button";

// Table data type
interface EventData {
  eventName: string;
  startDate: string;
  endDate: string;
  expectedFootfall: string;
  aiSuggestions: string;
  status: 'Active' | 'Inactive';
}

// Sample data - backend se aayega
const eventsData: EventData[] = [
  {
    eventName: "Street Fest Dubai Hills Mall",
    startDate: "15 Sept 2025",
    endDate: "9 Oct 2025",
    expectedFootfall: "High peak evenings & weekends",
    aiSuggestions: "Boost drink , snack bundles",
    status: "Active"
  },
  {
    eventName: "Street Fest Dubai Hills Mall",
    startDate: "15 Sept 2025",
    endDate: "9 Oct 2025",
    expectedFootfall: "High peak evenings & weekends",
    aiSuggestions: "Boost drink , snack bundles",
    status: "Active"
  },
  {
    eventName: "Street Fest Dubai Hills Mall",
    startDate: "15 Sept 2025",
    endDate: "9 Oct 2025",
    expectedFootfall: "High peak evenings & weekends",
    aiSuggestions: "Boost drink , snack bundles",
    status: "Active"
  },
  {
    eventName: "Street Fest Dubai Hills Mall",
    startDate: "15 Sept 2025",
    endDate: "9 Oct 2025",
    expectedFootfall: "High peak evenings & weekends",
    aiSuggestions: "Boost drink , snack bundles",
    status: "Active"
  },
  {
    eventName: "Street Fest Dubai Hills Mall",
    startDate: "15 Sept 2025",
    endDate: "9 Oct 2025",
    expectedFootfall: "High peak evenings & weekends",
    aiSuggestions: "Boost drink , snack bundles",
    status: "Active"
  }
];

export default function EventsSection() {
  return (
    <div>
      {/* Events Table Container */}
      <div
        style={{
          width: '100%',
          borderRadius: '16px',
          border: '1px solid #EEEEEE',
          background: '#FFFFFF',
          opacity: 1,
          position: 'relative',
          overflow: 'auto',
          padding: '16px',
        }}
      >
        {/* Table Container */}
        <div className="w-full overflow-x-auto">
          {/* Table */}
          <table className="w-full" style={{ minWidth: '900px' }}>
            {/* Table Header */}
            <thead>
              <tr style={{ borderBottom: '1px solid #EEEEEE' }}>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Event Name
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Start Date
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  End Date
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Expected Footfall Impact
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  AI Sales Suggestions
                </th>
                <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {eventsData.map((event, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index < eventsData.length - 1 ? '1px solid #EEEEEE' : 'none',
                  }}
                >
                  {/* Event Name */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                      }}
                    >
                      {event.eventName}
                    </span>
                  </td>

                  {/* Start Date */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {event.startDate}
                    </span>
                  </td>

                  {/* End Date */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {event.endDate}
                    </span>
                  </td>

                  {/* Expected Footfall Impact */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                      }}
                    >
                      {event.expectedFootfall}
                    </span>
                  </td>

                  {/* AI Sales Suggestions */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                      }}
                    >
                      {event.aiSuggestions}
                    </span>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        background: event.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: event.status === 'Active' ? '#10B981' : '#EF4444',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
