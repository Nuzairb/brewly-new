import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Base Card Components
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "w-full lg:w-auto min-h-[149px] gap-2 rounded-[16px] border border-[#F6F6F6] p-4 bg-[#FAFAFA] backdrop-blur-[120px] opacity-100",
        className,
        className?.includes('aiSuggestedCard') && "w-[283px] h-[344px] opacity-100 rounded-[24px] bg-[#FAFAFA] border border-[#EEEEEE] relative"
      )}
      {...props}
    />
  )
}

// Flexible CardHeader with Tailwind variants
interface CardHeaderProps extends React.ComponentProps<"div"> {
  variant?: 'default' | 'active-bundle' | 'revenue' | 'slow-moving' | 'weather' | 'sales' | 'suggestion' | 'events' | 'outcome' | 'performance';
  align?: 'between' | 'start' | 'center' | 'end';
  direction?: 'row' | 'col';
}

function CardHeader({ 
  className, 
  variant = 'default',
  align = 'between',
  direction = 'row',
  ...props 
}: CardHeaderProps) {
  const alignClasses = {
    between: "justify-between",
    start: "justify-start", 
    center: "justify-center",
    end: "justify-end"
  };

  const variantClasses = {
    'default': "font-lato font-medium text-[14px] leading-[20px] tracking-[0px] text-[#1E1E1E] h-[20px]",

    'active-bundle': "font-lato font-medium text-[14px] leading-[20px] tracking-[0px] text-[#1E1E1E] h-[20px]",
    'revenue': "font-lato font-medium text-[14px] leading-[20px] tracking-[0px] text-[#1E1E1E] h-[20px]",
    'slow-moving': "font-lato font-medium text-[14px] leading-[20px] tracking-[0px] text-[#1E1E1E] h-[20px]",

    'weather': "font-inter font-medium text-xl text-white",
    'sales': "font-lato font-semibold text-sm text-[#1E1E1E] leading-none",
    'suggestion': "font-lato font-semibold text-[22px] text-white leading-[25px]",
    'events': "font-lato font-semibold text-sm text-[#1E1E1E] leading-none",
    'outcome': "font-lato font-semibold text-sm text-[#1E1E1E] leading-none",
    'performance': "font-lato font-semibold text-sm text-[#1E1E1E] leading-none"
  };

  return (
    <div 
      data-slot={`card-header-${variant}`} 
      className={cn(
        "flex",
        direction === 'row' ? "items-center" : "items-start",
        alignClasses[align],
        `flex-${direction}`,
        variantClasses[variant],
        className
      )} 
      {...props}
    />
  )
}

// Card Title with variants
function CardTitle({ className, variant = 'default', ...props }: React.ComponentProps<"div"> & { variant?: string }) {
  const variantClasses = {
    'default': "font-lato font-normal text-sm text-[#1E1E1E] leading-5",
    'weather-day': "font-inter font-medium text-xl text-white leading-none",
    'weather-date': "font-inter font-normal text-sm text-white leading-none",
    'sales': "font-lato font-semibold text-sm text-[#1E1E1E] leading-none",
    'suggestion': "font-lato font-normal text-base text-white leading-6 text-center",
    'event-title': "font-inter font-medium text-sm text-[#1E1E1E] leading-[21px]",
    'event-subtitle': "font-poppins font-normal text-[11px] text-[#787777] leading-none",
    'outcome-total': "font-poppins font-medium text-[22px] text-[#1E1E1E] leading-[22px]",
    'outcome-label': "font-poppins font-normal text-sm text-[#787777] leading-none",
    'performance-title': "font-poppins font-medium text-xs text-[#1E1E1E] leading-none",
    'performance-subtitle': "font-poppins font-normal text-[11px] text-[#787777] leading-none"
  };

  return (
    <div 
      data-slot="card-title" 
      className={cn(
        variantClasses[variant as keyof typeof variantClasses] || variantClasses.default,
        className
      )}
      {...props}
    />
  )
}

// Card Content with variants
function CardContent({ className, variant = 'default', ...props }: React.ComponentProps<"div"> & { variant?: string }) {
  const variantClasses = {
    'default': "font-lato font-semibold text-[22px] text-[#252430] leading-[42px] tracking-[0px]",
    'sales-amount': "font-lato font-normal text-2xl text-[#1E1E1E] leading-8",
    'weather-temp': "font-inter font-medium text-2xl text-white leading-none",
    'weather-temp-low': "font-inter font-medium text-base text-[#B9B9B9] leading-none",
    'bundle-number': "font-lato font-semibold text-[22px] text-[#252430] leading-[42px] tracking-[0px]",
    'bundle-amount': "font-lato font-semibold text-[22px] text-[#252430] leading-[42px] tracking-[0px]"
  };

  return (
    <div
      data-slot="card-content"
      className={cn(
        variantClasses[variant as keyof typeof variantClasses] || variantClasses.default,
        className
      )}
      {...props}
    />
  )
}

// Card Description with variants
function CardDescription({ className, variant = 'default', ...props }: React.ComponentProps<"div"> & { variant?: string }) {
  const variantClasses = {
    'default': "font-lato font-normal text-[12px] text-[#787777] leading-[12px] tracking-[0px]",
    'running-campaigns': "font-lato font-normal text-[12px] text-[#787777] leading-[12px] tracking-[0px] text-left whitespace-nowrap",
    'this-month': "font-lato font-normal text-[12px] text-[#787777] leading-[12px] tracking-[0px] text-right whitespace-nowrap",
    'this-week': "font-lato font-normal text-[12px] text-[#787777] leading-[12px] tracking-[0px] text-right whitespace-nowrap",
    'weather-condition': "font-inter font-medium text-base text-white leading-none",
    'weather-feels-like': "font-inter font-normal text-sm text-white text-center leading-none",
    'see-all': "font-poppins font-normal text-xs text-[#00674E] leading-none",
    'legend-label': "font-poppins font-medium text-xs text-[#121212] opacity-70 leading-none",
    'legend-value': "font-poppins font-medium text-xs text-[#787777] opacity-70 leading-none"
  };

  return (
    <div
      data-slot="card-description"
      className={cn(
        variantClasses[variant as keyof typeof variantClasses] || variantClasses.default,
        className
      )}
      {...props}
    />
  )
}

// Percentage Increase Component
function CardPercentage({ value, className, ...props }: { value: string } & React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-percentage"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <Image 
        src="/icons/increament.svg"
        alt="increase"
        width={12}
        height={12}
        className="opacity-100"
      />
      <span className="w-9 h-4 font-lato font-bold text-sm leading-4 text-[#00674E] opacity-100">
        {value}
      </span>
    </div>
  )
}

// Specialized Card Components
function WeatherCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full h-[344px] rounded-[24px] pt-[19px] px-4 pb-[19px] bg-gradient-to-br from-[#011913] from-1.29% to-[#004534] to-98.71% opacity-100 flex flex-col justify-between",
        className
      )}
      {...props}
    />
  )
}

function SalesGraphCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full h-[344px] rounded-[24px] border border-[#EEEEEE] bg-white opacity-100 p-5 flex flex-col relative",
        className
      )}
      {...props}
    />
  )
}

function SuggestionCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full h-[344px] flex flex-col justify-between rounded-[24px] py-[25px] px-4 bg-gradient-to-br from-[#011913] from-1.29% to-[#004534] to-98.71% opacity-100",
        className
      )}
      {...props}
    />
  )
}

function EventsCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full min-h-[230px] rounded-[24px] border border-[#EEEEEE] py-6 px-4 bg-white opacity-100",
        className
      )}
      {...props}
    />
  )
}

function OutcomeCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full min-h-[230px] rounded-[16px] border border-[#EEEEEE] p-4 bg-white opacity-100 flex flex-col items-center",
        className
      )}
      {...props}
    />
  )
}

function PerformanceCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full min-h-[230px] rounded-[16px] border border-[#EEEEEE] p-4 bg-white opacity-100",
        className
      )}
      {...props}
    />
  )
}

// Reusable components with Tailwind
function WeatherLocation({ location, className, ...props }: { location: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-[141px] h-[33px] gap-2 rounded-[8px] py-2 px-4 bg-white/10 border border-[#D9D9D9]/30 flex items-center opacity-100 mb-3",
        className
      )}
      {...props}
    >
      <Image 
        src="/icons/typcn_location.svg"
        alt="location"
        width={16}
        height={16}
        className="opacity-100"
      />
      <span className="font-inter font-normal text-sm text-white opacity-100 whitespace-nowrap">
        {location}
      </span>
    </div>
  )
}

function TemperatureDisplay({ currentTemp, lowTemp, className, ...props }: { currentTemp: string, lowTemp: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-[59px] h-[48px] flex flex-col items-end opacity-100 mt-7",
        className
      )}
      {...props}
    >
      <CardContent variant="weather-temp" className="text-right">
        {currentTemp}
      </CardContent>
      <CardContent variant="weather-temp-low" className="text-right">
        {lowTemp}
      </CardContent>
    </div>
  )
}

function SalesPerformanceHeader({ title, amount, percentage, className, ...props }: { title: string, amount: string, percentage: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full opacity-100",
        className
      )}
      {...props}
    >
      <CardHeader variant="sales">
        {title}
      </CardHeader>
      <div className="w-full h-8 mt-[8.5px] gap-1.5 flex items-center opacity-100">
        <CardContent variant="sales-amount">
          {amount}
        </CardContent>
        <div className="min-w-[46px] h-[18px] rounded-[2px] px-1 py-0.5 bg-[#05C16833] border border-[#05C16833] flex items-center justify-between gap-0.5 opacity-100">
          <span className="font-lato font-medium text-[10px] leading-[14px] text-[#14CA74] opacity-100 whitespace-nowrap">
            {percentage}
          </span>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-100">
            <path d="M1 7L7 1M7 1H2M7 1V6" stroke="#14CA74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function GraphLegend({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex gap-3 items-center opacity-100",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1 opacity-100">
        <div className="w-2.5 h-2.5 bg-[#00A57D] rounded-[2px] flex-shrink-0"></div>
        <span className="font-lato font-normal text-xs leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">
          AI Suggested
        </span>
      </div>
      <div className="flex items-center gap-1 opacity-100">
        <div className="w-2.5 h-2.5 bg-[#1E1E1E] rounded-[2px]"></div>
        <span className="font-lato font-normal text-xs leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">
          Manual
        </span>
      </div>
    </div>
  )
}

function DaysRow({ className, ...props }: React.ComponentProps<"div">) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  return (
    <div
      className={cn(
        "w-full flex justify-between px-2 mt-2 opacity-100",
        className
      )}
      {...props}
    >
      {days.map((day, index) => (
        <div 
          key={index}
          className="font-lato font-medium text-[10px] leading-[14px] text-center text-[#787777] opacity-100"
        >
          {day}
        </div>
      ))}
    </div>
  )
}

function SuggestionProduct({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-[115px] h-[112px] gap-2 rounded-[8px] bg-white/10 border border-white/20 py-1 px-[21px] flex items-center justify-center opacity-100",
        className
      )}
      {...props}
    />
  )
}

function GoLiveButton({ onClick, className, ...props }: { onClick?: () => void } & React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "w-[246px] h-[44px] gap-2 rounded-[8px] px-4 py-2 bg-white border-none cursor-pointer opacity-100 self-center flex items-center justify-center hover:opacity-90 transition-opacity",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <span className="w-[49px] h-5 font-geist font-medium text-sm leading-5 text-center text-[#00674E] opacity-100">
        Go Live
      </span>
    </button>
  )
}

function SeeAllButton({ onClick, className, ...props }: { onClick?: () => void } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-[63px] h-[34px] gap-2 rounded-[8px] px-3 py-[10px] bg-white opacity-100 cursor-pointer flex items-center justify-center hover:bg-gray-50 transition-colors",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <CardDescription variant="see-all" className="whitespace-nowrap">
        See all
      </CardDescription>
    </div>
  )
}

function EventDate({ day, month, className, ...props }: { day: string, month: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-[50px] h-[44px] bg-[#1E2124] rounded-[10px] border border-gradient-to-b from-[#3C4C5C] to-[#7FA0C2] flex flex-col items-center justify-center text-white opacity-100",
        className
      )}
      {...props}
    >
      <div className="w-[18px] h-5 font-inter font-medium text-base leading-5 text-center uppercase opacity-100">
        {day}
      </div>
      <div className="w-6 h-3 font-inter font-medium text-[10px] leading-3 text-center capitalize opacity-100">
        {month}
      </div>
    </div>
  )
}

function ProgressBar({ percentage, color, className, ...props }: { percentage: number, color: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full h-2 rounded-[8px] bg-[#E5E5EA] relative opacity-100",
        className
      )}
      {...props}
    >
      <div 
        className="h-[10px] absolute top-[-1px] left-0 rounded-[8px] opacity-100"
        style={{ 
          width: `${percentage}%`,
          backgroundColor: color
        }}
      ></div>
    </div>
  )
}

function PercentageBadge({ percentage, className, ...props }: { percentage: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-[46px] h-[18px] rounded-[2px] px-1 py-0.5 bg-[#05C16833] border border-[#05C16833] flex items-center justify-center gap-0.5 opacity-100",
        className
      )}
      {...props}
    >
      <span className="w-[28px] h-[14px] font-lato font-medium text-[10px] leading-[14px] text-[#14CA74] opacity-100">
        {percentage}
      </span>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-100 flex-shrink-0">
        <path d="M1 7L7 1M7 1H2M7 1V6" stroke="#14CA74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

function LegendItem({ color, label, value, className, ...props }: { color: string, label: string, value: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-[83.69px] h-[34px] flex flex-col gap-1 opacity-100",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1">
        <div 
          className="w-2.5 h-2.5 rounded-[2px] flex-shrink-0" 
          style={{ backgroundColor: color }}
        ></div>
        <CardDescription variant="legend-label" className="whitespace-nowrap">
          {label}
        </CardDescription>
      </div>
      <CardDescription variant="legend-value">
        {value}
      </CardDescription>
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardPercentage,
  WeatherCard,
  SalesGraphCard,
  SuggestionCard,
  EventsCard,
  OutcomeCard,
  PerformanceCard,
  WeatherLocation,
  TemperatureDisplay,
  SalesPerformanceHeader,
  GraphLegend,
  DaysRow,
  SuggestionProduct,
  GoLiveButton,
  SeeAllButton,
  EventDate,
  ProgressBar,
  PercentageBadge,
  LegendItem,
}