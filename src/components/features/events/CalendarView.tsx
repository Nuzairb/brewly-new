import React from "react";

// Dummy event data for demonstration
const events = [
  {
    title: "Local Market Day",
    start: "2024-04-25T09:45",
    end: "2024-04-25T10:00",
    color: "#F87171",
  },
  {
    title: "Local Market Day",
    start: "2024-04-26T09:45",
    end: "2024-04-26T10:00",
    color: "#F87171",
  },
  {
    title: "Halloween Fest",
    start: "2024-05-01T00:00",
    end: "2024-05-01T23:59",
    color: "#2563EB",
  },
];

export default function CalendarView() {
  // For demo, just render a static grid similar to Figma
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 w-full shadow-sm">
      <div className="flex items-center mb-4">
        <span className="font-bold text-[20px] mr-6">September 2024</span>
        <div className="flex gap-2 ml-auto">
          <button className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[#2563EB] font-medium shadow-md">Month</button>
          <button className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#1E1E1E] font-medium">Week</button>
          <button className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#1E1E1E] font-medium">Day</button>
          <button className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#1E1E1E] font-medium">List</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full">
          <table className="w-full border-separate" style={{ borderSpacing: 0 }}>
            <thead>
              <tr>
                <th className="text-left text-xs font-semibold text-[#71717A] py-2 px-2 bg-[#F9FAFB] border-r border-b border-[#E5E7EB]">GMT +5</th>
                {Array.from({ length: 7 }).map((_, i) => (
                  <th key={i} className="text-left text-xs font-semibold text-[#71717A] py-2 px-2 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                    {['25 Apr, Monday','26 Apr, Tuesday','27 Apr, Wednesday','28 Apr, Thursday','29 May, Friday','30 May, Saturday','01 May, Sunday'][i]}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="text-xs font-semibold text-[#71717A] py-2 px-2 bg-[#F9FAFB] border-r border-b border-[#E5E7EB]">All Day</th>
                {Array.from({ length: 7 }).map((_, i) => {
                  // Find all-day event for this day
                  const event = events.find(e => {
                    const eventDate = new Date(e.start);
                    return eventDate.getDate() === 25 + i && e.start.endsWith('00:00');
                  });
                  // Halloween Fest is on 1 May (index 6)
                  return (
                    <th key={i} className="h-12 px-2 border-b border-r border-[#E5E7EB] bg-white">
                      {i === 6 ? (
                        <div className="bg-[#2563EB] text-white rounded-md px-3 py-2 text-xs font-medium flex items-center justify-center shadow-sm">
                          Halloween Fest
                        </div>
                      ) : null}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 14 }).map((_, hourIdx) => (
                <tr key={hourIdx}>
                  <td className="text-xs text-[#71717A] py-2 px-2 w-20 bg-[#F9FAFB] border-r border-b border-[#E5E7EB]">{`${(8 + hourIdx).toString().padStart(2, '0')}:00`}</td>
                  {Array.from({ length: 7 }).map((_, dayIdx) => {
                    // Find event for this cell
                    const event = events.find(e => {
                      const eventDate = new Date(e.start);
                      return eventDate.getDate() === 25 + dayIdx && eventDate.getHours() === 8 + hourIdx;
                    });
                    return (
                      <td key={dayIdx} className="relative h-12 px-2 border-b border-r border-[#E5E7EB] bg-white">
                        {event && (
                          <div className="absolute top-0 left-0 right-0 bg-[#FFF1F1] border border-[#F87171] rounded-md p-2 text-xs text-[#1E1E1E] shadow-sm">
                            <div className="font-medium mb-1">{event.title}</div>
                            <div className="flex items-center gap-1 text-[#71717A]">
                              <span className="w-2 h-2 rounded-full bg-[#71717A] inline-block" />
                              {`${new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}–${new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`}
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
