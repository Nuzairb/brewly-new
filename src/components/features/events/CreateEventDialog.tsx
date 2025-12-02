"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateEventDialog({ open, onOpenChange }: CreateEventDialogProps) {
  const [eventName, setEventName] = useState("City A");
  const [eventType, setEventType] = useState("Holiday");
  const [repeat, setRepeat] = useState("Weekly");
  const [selectedDays, setSelectedDays] = useState<string[]>(["S"]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [time, setTime] = useState("11:30 AM");
  const [isActive, setIsActive] = useState(true);

  const days = [
    { label: "M", value: "M" },
    { label: "T", value: "T" },
    { label: "W", value: "W" },
    { label: "T", value: "Th" },
    { label: "F", value: "F" },
    { label: "S", value: "Sa" },
    { label: "S", value: "S" },
  ];

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleCreateEvent = () => {
    // Handle event creation
    console.log({
      eventName,
      eventType,
      repeat,
      selectedDays,
      startDate,
      endDate,
      time,
      isActive
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="!top-auto !bottom-0 !left-0 !right-0 !translate-x-0 !translate-y-0 max-w-none p-0 gap-0 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          borderRadius: '16px 16px 0 0',
          background: '#FFFFFF',
        }}
      >
        {/* Header with Title */}
        <DialogHeader 
          className="py-6"
          style={{
            borderBottom: '1px solid #E5E7EB',
            marginLeft: '32px',
            marginRight: '32px',
          }}
        >
          <DialogTitle 
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '24px',
              color: '#1E1E1E',
              margin: 0,
            }}
          >
            Create New Event
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 py-6">
          {/* Form Fields */}
          <div className="flex flex-col gap-5">
            {/* Row 1 - Event Name, Event Type, and Repeat */}
            <div className="grid grid-cols-3 gap-6">
              {/* Event Name */}
              <div>
                <Label 
                  style={{
                    fontFamily: 'Lato',
                    fontWeight: 600,
                    fontSize: '14px',
                    background: 'transparent',
                    lineHeight: '20px',
                    color: '#1E1E1E',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Event Name
                </Label>
                <Input
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="City A"
                  className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] bg-transparent selection:bg-white selection:text-[#1E1E1E]"
                />
              </div>

              {/* Event Type */}
              <div>
                <Label 
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#1E1E1E',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Event Type
                </Label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Holiday">Holiday</SelectItem>
                    <SelectItem value="Festival">Festival</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Concert">Concert</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Repeat */}
              <div>
                <Label 
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#1E1E1E',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Repeat
                </Label>
                <Select value={repeat} onValueChange={setRepeat}>
                  <SelectTrigger className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2 - Days, Date, Time - All in one row */}
            <div className="grid grid-cols-3 gap-6">
              {/* Days */}
              <div>
                <Label 
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#1E1E1E',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Days
                </Label>
                <div className="flex gap-6">
                  {days.map((day, index) => (
                    <button
                      key={`${day.value}-${index}`}
                      onClick={() => toggleDay(day.value)}
                      className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[14px] font-medium transition-colors"
                      style={{
                        background: selectedDays.includes(day.value) ? "#00674E" : "#F3F4F6",
                        color: selectedDays.includes(day.value) ? "#FFFFFF" : "#6B7280",
                      }}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <Label 
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#1E1E1E',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-[48px] w-full justify-start text-left font-normal text-[16px] rounded-[8px] border-[#D1D5DB]"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="mr-2"
                      >
                        <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      Jan 20,2025 - Feb 09,2025
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="flex items-stretch">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                      <div className="w-px mx-4 bg-[#E5E7EB]" />
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time */}
              <div>
                <Label 
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#1E1E1E',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Time
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-[48px] w-full justify-start text-left font-normal text-[16px] rounded-[8px] border-[#D1D5DB]"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="mr-2"
                      >
                        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      11 : 30 AM
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4" align="start">
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Row 3 - Status */}
            <div className="flex items-center gap-3">
              <Label 
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#1E1E1E',
                }}
              >
                Status
              </Label>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <span 
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '16px',
                  color: '#1E1E1E',
                  fontWeight: 500,
                }}
              >
                Active
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="h-[48px] px-8 rounded-[8px] border-[#D1D5DB]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                color: '#1E1E1E',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateEvent}
              className="flex-1 h-[48px] rounded-[8px]"
              style={{
                background: '#00674E',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                color: '#FFFFFF',
              }}
            >
              Create Event
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="ml-2"
              >
                <path
                  d="M7.5 15l5-5-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
