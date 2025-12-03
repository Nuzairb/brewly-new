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
        <div
          style={{
            background: '#FFFFFF',
            opacity: 1,
            position: 'relative',
            overflow: 'auto',
            padding: '16px',
          }}
        >
          <div className="w-full overflow-x-auto" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #EEEEEE', background: '#fff' }}>
            <table className="w-full" style={{ minWidth: '900px', borderRadius: '8px', overflow: 'hidden' }}>
              {/* Table Header */}
              <thead>
                <tr style={{ borderBottom: '1px solid #EEEEEE' }}>
                  <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>Event Name</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>Start Date</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>End Date</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>Expected Footfall Impact</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>AI Sales Suggestions</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {eventsData.map((event, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px 16px' }}>
                      <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#1E1E1E', whiteSpace: 'nowrap' }}>{event.eventName}</span>
                    </td>
                    <td style={{ padding: '8px 16px' }}>
                      <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#1E1E1E', whiteSpace: 'nowrap' }}>{event.startDate}</span>
                    </td>
                    <td style={{ padding: '8px 16px' }}>
                      <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#1E1E1E', whiteSpace: 'nowrap' }}>{event.endDate}</span>
                    </td>
                    <td style={{ padding: '8px 16px' }}>
                      <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#1E1E1E', whiteSpace: 'nowrap' }}>{event.expectedFootfall}</span>
                    </td>
                    <td style={{ padding: '8px 16px' }}>
                      <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#1E1E1E', whiteSpace: 'nowrap' }}>{event.aiSuggestions}</span>
                    </td>
                    <td style={{ padding: '8px 16px' }}>
                      <div style={{ display: 'inline-flex', borderRadius: '4px', padding: '4px 12px', background: event.status === 'Active' ? '#10A7601A' : '#FF23111A', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: event.status === 'Active' ? '#10A760' : '#FF2311' }}>{event.status}</span>
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