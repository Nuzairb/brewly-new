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
    <div className="bg-white   p-6 w-full ">
      <div className="flex items-center mb-2">
        <span className="font-lato font-semibold text-[24px] mr-6">September 2024</span>
        <div className="bg-[#E5E7EB] rounded-xl flex gap-2 ml-auto p-2">
          <button className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-black font-medium shadow-md">Month</button>
          <button className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-[#E5E7EB] text-[#1E1E1E] font-medium">Week</button>
          <button className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-[#E5E7EB] text-[#1E1E1E] font-medium">Day</button>
          <button className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-[#E5E7EB] text-[#1E1E1E] font-medium">List</button>
        </div>
      </div>
      <hr className="border-b border-[#E5E7EB] mb-4" />
      <div className="overflow-x-auto">
        <div className="w-full">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left text-xs font-semibold text-[#71717A] py-2 px-2 bg-[#F9FAFB] border-r border-b border-[#E5E7EB]">GMT +5</th>
                {[
                  {date: '25', monthDay: 'Apr, Monday'},
                  {date: '26', monthDay: 'Apr, Tuesday'},
                  {date: '27', monthDay: 'Apr, Wednesday'},
                  {date: '28', monthDay: 'Apr, Thursday'},
                  {date: '29', monthDay: 'May, Friday'},
                  {date: '30', monthDay: 'May, Saturday'},
                  {date: '01', monthDay: 'May, Sunday'},
                ].map((d, i) => (
                  <th key={i} className="text-left text-xs font-lato font-normal text-[#71717A] py-2 px-2 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-[18px] font-lato font-semibold text-[#1E1E1E] leading-none">{d.date}</span>
                      <span className="text-xs font-lato font-normal text-[#71717A] leading-none">{d.monthDay}</span>
                    </div>
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
                    <th key={i} className="h-12 px-2 border-b border-r border-[#E5E7EB]">
                      {i === 6 ? (
                        <div className="bg-[#CDE3FB] border border-[#2563EB] text-black rounded-[7px] px-4 py-4 text-xs font-lato font-semibold flex items-center justify-center shadow-[0_2px_8px_0_rgba(37,99,235,0.10)]">
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
                    const cellDate = new Date(2024, 3, 25 + dayIdx, 8 + hourIdx, 0, 0, 0);
                    // Find event that starts at this cell
                    const event = events.find(e => {
                      const start = new Date(e.start);
                      return (
                        start.getDate() === cellDate.getDate() &&
                        start.getMonth() === cellDate.getMonth() &&
                        start.getFullYear() === cellDate.getFullYear() &&
                        start.getHours() === cellDate.getHours()
                      );
                    });
                    // If event starts here, calculate how many rows it should span
                    let rowSpan = 1;
                    if (event) {
                      const start = new Date(event.start);
                      const end = new Date(event.end);
                      const startMinutes = start.getHours() * 60 + start.getMinutes();
                      const endMinutes = end.getHours() * 60 + end.getMinutes();
                      // If event ends exactly at the start of a slot, still include that slot
                      let spanMinutes = endMinutes - startMinutes;
                      if (end.getMinutes() === 0 && end.getSeconds() === 0) {
                        spanMinutes += 60;
                      }
                      rowSpan = Math.max(1, Math.ceil(spanMinutes / 60));
                    }
                    // Check if this cell is covered by an event that started in a previous row
                    const isCovered = events.some(e => {
                      const start = new Date(e.start);
                      const end = new Date(e.end);
                      const startMinutes = start.getHours() * 60 + start.getMinutes();
                      const endMinutes = end.getHours() * 60 + end.getMinutes();
                      const cellMinutes = (8 + hourIdx) * 60;
                      return (
                        start.getDate() === cellDate.getDate() &&
                        start.getMonth() === cellDate.getMonth() &&
                        start.getFullYear() === cellDate.getFullYear() &&
                        cellMinutes > startMinutes && cellMinutes < endMinutes
                      );
                    });
                    if (isCovered && !event) {
                      // Don't render a cell if it's covered by a previous event's rowSpan
                      return <td key={dayIdx} className="h-12 px-2 border-b border-r border-[#E5E7EB] bg-white" />;
                    }
                    return (
                      <td
                        key={dayIdx}
                        className="relative h-12 px-2 border-b border-r border-[#E5E7EB] bg-white"
                        rowSpan={event ? rowSpan : 1}
                        style={event ? { verticalAlign: 'top' } : {}}
                      >
                        {event && (
                          <div className="absolute top-0 left-0 right-0 bg-[#FFF1F1] border border-[#F87171] rounded-md p-2 text-xs text-[#1E1E1E] shadow-sm w-full h-full flex flex-col justify-center">
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
