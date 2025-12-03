import React from "react";
import { Card } from "@/components/ui/card";
import { EventDate } from "@/components/ui/card";

const events = [
  {
    date: { day: "10", month: "June" },
    title: "Tech Workshop",
    description: "Hands-on workshop exploring the latest web technologies",
    time: "10:00 AM - 10.00 PM",
    location: "Innovation Lab",
    color: "#F9FAFB"
  },
  // Add more event objects as needed
];

export default function EventCardsGrid() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <Card key={idx} className="eventCard" style={{ width: 323, height: 251, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 16, padding: 16, border: '1px solid #E5E7EB', opacity: 1 }}>
            <EventDate day={event.date.day} month={event.date.month} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, marginTop: 12 }}>
              <h2 style={{ width: 165, height: 37, fontFamily: 'Lato', fontWeight: 600, fontSize: 24, lineHeight: '36.86px', color: '#1E1E1E', margin: 0, letterSpacing: 0, verticalAlign: 'middle', background: '#fbfbfbff', opacity: 1 }}>{event.title}</h2>
              <p style={{ width: 246, height: 45, fontFamily: 'Lato', fontWeight: 400, fontSize: 14, lineHeight: '22.12px', color: '#1E1E1E', margin: 0, letterSpacing: 0, verticalAlign: 'middle', background: '#fbfbfbff', opacity: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{event.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, marginTop: 8 }}>
                  <div style={{ width: 180, height: 23, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Lato', fontWeight: 600, fontSize: 14, lineHeight: '22.12px', color: '#1E1E1E', letterSpacing: 0, verticalAlign: 'middle', background: '#fbfbfbff', opacity: 1, textAlign: 'left' }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#1E1E1E" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ display: 'inline', textAlign: 'left' }}>{event.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Lato', fontWeight: 600, fontSize: 14, lineHeight: '22.12px', color: '#1E1E1E', letterSpacing: 0, verticalAlign: 'middle', background: '#fbfbfbff', opacity: 1, textAlign: 'left' }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ display: 'inline', textAlign: 'left' }}>{event.location}</span>
                  </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
