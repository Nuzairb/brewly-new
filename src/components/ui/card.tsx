import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useTemperatureUnit } from './temperature-context'

// Base Card Components with variants
interface CardProps extends React.ComponentProps<"div"> {
  variant?: 'default' | 'dashboard1' | 'dashboard2' | 'aiSuggestedCard' | 'eventCard' | 'weather' | 'sales' | 'suggestion' | 'events' | 'outcome' | 'performance' | 'active-bundle' | 'revenue' | 'slow-moving';
}

function Card({ className, variant = 'default', ...props }: CardProps) {
  const variantClasses = {
    'default': "w-full lg:w-auto min-h-[149px] gap-2 rounded-[16px] border border-[#F6F6F6] p-4 bg-[#FAFAFA] backdrop-blur-[120px] opacity-100",
    'dashboard1': "w-full lg:w-auto min-h-[149px] gap-2 rounded-[16px] border border-[#F6F6F6] p-4 bg-[#FAFAFA] backdrop-blur-[120px] opacity-100",
    // alias variants used by stat cards — reuse dashboard1 container styles
    'active-bundle': "w-full lg:w-auto min-h-[149px] gap-2 rounded-[16px] border border-[#F6F6F6] p-4 bg-[#FAFAFA] backdrop-blur-[120px] opacity-100",
    'revenue': "w-full lg:w-auto min-h-[149px] gap-2 rounded-[16px] border border-[#F6F6F6] p-4 bg-[#FAFAFA] backdrop-blur-[120px] opacity-100",
    'slow-moving': "w-full lg:w-auto min-h-[149px] gap-2 rounded-[16px] border border-[#F6F6F6] p-4 bg-[#FAFAFA] backdrop-blur-[120px] opacity-100",
    'dashboard2': "w-full lg:w-auto min-h-[149px] gap-2 rounded-[16px] border border-[#E5E7EB] p-4 bg-white backdrop-blur-[120px] opacity-100",
    'aiSuggestedCard': "w-[283px] h-[344px] opacity-100 rounded-[24px] bg-[#FAFAFA] border border-[#EEEEEE] relative",
    'eventCard': "min-h-[220px] rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] shadow-sm p-6",
    'weather': "w-full h-[344px] rounded-[24px] pt-[19px] px-4 pb-[19px] bg-gradient-to-br from-[#011913] from-1.29% to-[#004534] to-98.71% opacity-100 flex flex-col justify-between",
    'sales': "w-full h-[344px] rounded-[24px] border border-[#EEEEEE] bg-white opacity-100 p-5 flex flex-col relative",
    'suggestion': "w-full h-[344px] flex flex-col justify-between rounded-[24px] py-[25px] px-4 bg-gradient-to-br from-[#011913] from-1.29% to-[#004534] to-98.71% opacity-100",
    'events': "w-full min-h-[200px] rounded-[24px] border border-[#EEEEEE] py-6 px-4 bg-white opacity-100",
    'outcome': "w-full min-h-[200px] rounded-[16px] border border-[#EEEEEE] p-4 bg-white opacity-100 flex flex-col items-center",
    'performance': "w-full min-h-[200px] rounded-[16px] border border-[#EEEEEE] p-4 bg-white opacity-100"
  };

  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    />
  )
}

// Flexible CardHeader with Tailwind variants
interface CardHeaderProps extends React.ComponentProps<"div"> {
  variant?: 'default' | 'dashboard1' | 'dashboard2' | 'active-bundle' | 'revenue' | 'slow-moving' | 'weather' | 'sales' | 'suggestion' | 'events' | 'outcome' | 'performance';
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
    'default': "font-family:lato font-medium  weight-500 text-[14px] leading-[20px] tracking-[0px] text-[#1E1E1E] h-[20px]",
    'dashboard1': "font-family:lato font-weight:500 font-medium text-[14px] leading-[20px] tracking-[0px] text-[#1E1E1E] h-[20px]",
    'dashboard2': "font-family:lato font-weight:500 font-medium text-[14px] leading-[20px] tracking-[0px] text-[#1E1E1E] h-[20px]",
    'active-bundle': "font-family:lato font-weight:500 font-medium text-[14px] leading-[20px] tracking-[0px] text-[#1E1E1E] h-[20px]",
    'revenue': "font-family:lato font-weight:500 font-medium  text-[14px] leading-[20px] tracking-[0px] text-[#1E1E1E] h-[20px]",
    'slow-moving': "font-family:lato font-weight:500 font-medium text-[14px] leading-[20px] tracking-[0px] text-[#1E1E1E] h-[20px]",
    'weather': "font-inter font-medium text-xl text-white",
    'sales': "font-family:lato font-semibold text-sm text-[#1E1E1E] leading-none",
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
interface CardTitleProps extends React.ComponentProps<"div"> {
  variant?: 'default' | 'dashboard1' | 'dashboard2' | 'weather-day' | 'weather-date' | 'sales' | 'suggestion' | 'event-title' | 'event-subtitle' | 'outcome-total' | 'outcome-label' | 'performance-title' | 'performance-subtitle';
}

function CardTitle({ className, variant = 'default', ...props }: CardTitleProps) {
  const variantClasses = {
    'default': "font-lato font-normal text-medium text-[#1E1E1E] leading-5",
    'dashboard1': "font-lato font-normal text-medium text-[#1E1E1E] leading-5",
    'dashboard2': "font-lato font-normal text-medium text-[#1E40AF] leading-5",
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
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    />
  )
}

// Card Content with variants
interface CardContentProps extends React.ComponentProps<"div"> {
  variant?: 'default' | 'dashboard1-value' | 'dashboard2-value' | 'sales-amount' | 'weather-temp' | 'weather-temp-low' | 'bundle-number' | 'bundle-amount';
}

function CardContent({ className, variant = 'default', ...props }: CardContentProps) {
  const variantClasses = {
    'default': "w-[131px] h-[42px] font-lato font-semibold text-[22px] text-[#252430] leading-[42px]",
    'dashboard1-value': "w-[131px] h-[42px] font-lato font-semibold text-[22px] text-[#252430] leading-[42px]",
    'dashboard2-value': "w-[131px] h-[42px] font-lato font-semibold text-[22px] text-[#1E40AF] leading-[42px]",
    'sales-amount': "font-lato font-normal text-2xl text-[#1E1E1E] leading-8",
    'weather-temp': "font-inter font-medium text-2xl text-white leading-none",
    'weather-temp-low': "font-inter font-medium text-base text-[#B9B9B9] leading-none",
    'bundle-number': "w-[131px] h-[42px] font-lato font-semibold text-[22px] text-[#252430] leading-[42px]",
    'bundle-amount': "w-[131px] h-[42px] font-lato font-semibold text-[22px] text-[#252430] leading-[42px]"
  };

  return (
    <div
      data-slot="card-content"
      className={cn(
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    />
  )
}

// Card Description with variants
interface CardDescriptionProps extends React.ComponentProps<"div"> {
  variant?: 'default' | 'dashboard1-desc' | 'dashboard2-desc' | 'running-campaigns' | 'this-month' | 'this-week' | 'weather-condition' | 'weather-feels-like' | 'see-all' | 'legend-label' | 'legend-value';
}

function CardDescription({ className, variant = 'default', ...props }: CardDescriptionProps) {
  const variantClasses = {
    'default': "font-lato font-normal text-[12px] text-[#787777] leading-[12px] tracking-[0px]",
    'dashboard1-desc': "font-lato font-normal text-[12px] text-[#787777] leading-[12px] tracking-[0px]",
    'dashboard2-desc': "font-lato font-normal text-[12px] text-[#6B7280] leading-[12px] tracking-[0px]",
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
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    />
  )
}

// Percentage Increase Component with variants
interface CardPercentageProps extends React.ComponentProps<"div"> {
  value: string;
  variant?: 'default' | 'dashboard1' | 'dashboard2';
}

function CardPercentage({ value, className, variant = 'default', ...props }: CardPercentageProps) {
  const variantClasses = {
    'default': "flex items-center gap-1 bg-[#05C16833] px-2 py-1 rounded text-[14px] font-semibold text-[#14CA74]",
    'dashboard1': "flex items-center gap-1 bg-[#05C16833] px-2 py-1 rounded text-[14px] font-semibold text-[#14CA74]",
    'dashboard2': "flex items-center gap-1 bg-[#E5F4FF] px-2 py-1 rounded text-[14px] font-semibold text-[#0066CC]"
  };

  return (
    <div
      data-slot="card-percentage"
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      <Image 
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/increament.svg`}
        alt="increase"
        width={12}
        height={12}
        className="opacity-100"
      />
      <span className="w-9 h-4 font-lato font-semibold text-sm leading-4 opacity-100">
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
        "w-full min-h-[200px] rounded-[24px] border border-[#EEEEEE] py-6 px-4 bg-white opacity-100",
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
        "w-full min-h-[200px] rounded-[16px] border border-[#EEEEEE] p-4 bg-white opacity-100 flex flex-col items-center",
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
        "w-full min-h-[200px] rounded-[16px] border border-[#EEEEEE] p-4 bg-white opacity-100",
        className
      )}
      {...props}
    />
  )
}

// Reusable components with Tailwind
function WeatherLocation({ location, className, onChange, options, ...props }: { location: string; onChange?: (loc: string) => void; options?: string[] } & React.ComponentProps<"div">) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState(location || '');

  React.useEffect(() => {
    setValue(location || '');
  }, [location]);

  const handleSelect = (loc: string) => {
    setValue(loc);
    setIsOpen(false);
    onChange?.(loc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onChange?.(value.trim());
  };

  return (
    <div className={cn("relative inline-block mb-3", className)} {...props}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-[141px] h-[33px] gap-2 rounded-[8px] py-2 px-4 bg-white/10 border border-[#D9D9D9]/30 flex items-center opacity-100 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/typcn_location.svg`}
          alt="location"
          width={16}
          height={16}
          className="opacity-100"
        />
        <span className="font-inter font-normal text-sm text-white opacity-100 whitespace-nowrap truncate">
          {value || 'Select location'}
        </span>
        <svg className="ml-auto w-3 h-3 text-white opacity-80" viewBox="0 0 10 10" fill="none">
          <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white/5 backdrop-blur rounded-lg border border-white/10 shadow-lg z-50 overflow-hidden">
          <div className="p-2">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type a location"
                className="w-full px-2 py-1 rounded bg-transparent border border-white/10 text-white placeholder-white/60 outline-none"
              />
              <button type="submit" className="px-3 py-1 bg-[#00674E] rounded text-white">OK</button>
            </form>
            {options && options.length > 0 && (
              <div className="mt-2 flex flex-col gap-1">
                {options.map((opt) => (
                  <button key={opt} onClick={() => handleSelect(opt)} className="text-left px-2 py-1 rounded hover:bg-white/10 transition-colors text-white">
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

interface TemperatureUnitSelectorProps extends React.ComponentProps<"div"> {
  temperatureUnit?: 'C' | 'F';
  onUnitChange?: (unit: 'C' | 'F') => void;
}

function TemperatureUnitSelector({ 
  temperatureUnit: propUnit, 
  onUnitChange: propOnUnitChange,
  className,
  ...props 
}: TemperatureUnitSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ctx = (() => {
    try { return useTemperatureUnit(); } catch { return undefined; }
  })();

  const temperatureUnit = propUnit ?? ctx?.unit ?? 'C';
  const onUnitChange = propOnUnitChange ?? ctx?.setUnit ?? (() => {});

  const handleUnitChange = (unit: 'C' | 'F') => {
    onUnitChange(unit);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <div 
        className="flex items-center justify-center gap-1 px-2 py-1 bg-white/10 border border-[#D9D9D9]/30 rounded-lg cursor-pointer hover:bg-white/20 transition-colors transform hover:scale-105 duration-150"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm text-white">°{temperatureUnit}</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M4 6L8 10L12 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-20 bg-[#1A1A1A] border border-[#D9D9D9]/30 rounded-lg shadow-lg z-10 overflow-hidden">
          <button
            className="w-full px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors flex items-center justify-between"
            onClick={() => handleUnitChange('C')}
          >
            °C
            {temperatureUnit === 'C' && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 3L4.5 8.5L2 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <button
            className="w-full px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors flex items-center justify-between"
            onClick={() => handleUnitChange('F')}
          >
            °F
            {temperatureUnit === 'F' && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 3L4.5 8.5L2 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
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
        <div className="w-2.5 h-2.5 bg-[#008868] rounded-[1px] flex-shrink-0"></div>
        <span className="font-lato font-normal text-xs leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">
          AI Suggested
        </span>
      </div>
      <div className="flex items-center gap-1 opacity-100">
        <div className="w-2.5 h-2.5 bg-[#231f20] rounded-[1px]"></div>
        <span className="font-lato font-normal text-xs leading-[14px] text-[#787777] opacity-100 whitespace-nowrap">
          Manual
        </span>
      </div>
    </div>
  )
}

function DaysRow({ className, ...props }: React.ComponentProps<"div">) {
  const days = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']

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
        "w-[50px] h-[50px] bg-[#1E2124] rounded-[10px] border border-gradient-to-b from-[#3C4C5C] to-[#7FA0C2] flex flex-col items-center justify-center text-white opacity-100 p-0",
        className
      )}
      style={{ lineHeight: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}
      {...props}
    >
      <div className="w-full text-center font-inter font-bold text-lg leading-none uppercase opacity-100" style={{margin:0,padding:0}}>
        {day}
      </div>
      <div className="w-full text-center font-inter font-medium text-[10px] leading-none capitalize opacity-100 mt-0" style={{margin:0,padding:0}}>
        {month}
      </div>
    </div>
  )
}

function ProgressBar({ percentage, color, className, ...props }: { percentage: number, color: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full h-[8px] rounded-[8px] bg-[#E5E5EA] relative opacity-100",
        className
      )}
      {...props}
    >
      <div
        className="h-[10px] absolute top-0 left-0 rounded-[8px] opacity-100"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      ></div>
    </div>
  )
}

function PercentageBadge({ percentage, className, ...props }: { percentage: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "min-w-[52px] h-[18px] rounded-[2px] px-2 py-0.5 bg-[#05C16833] border border-[#05C16833] flex items-center justify-center gap-1 opacity-100",
        className
      )}
      {...props}
    >
      <span className="w-[28px] h-[14px] font-lato font-medium text-[10px] leading-[14px] text-[#14CA74] opacity-100">
        {percentage}
      </span>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-100 flex-shrink-0 ml-1">
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
  TemperatureUnitSelector,
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

export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardContentProps,
  CardDescriptionProps,
  CardPercentageProps,
}

function TemperatureDisplay({ currentTemp, lowTemp, temperatureUnit: propUnit, className, ...props }: { currentTemp: string; lowTemp?: string; temperatureUnit?: 'C' | 'F' } & React.ComponentProps<"div">) {
  const ctx = (() => {
    try { return useTemperatureUnit(); } catch { return undefined; }
  })();
  const unit = propUnit ?? ctx?.unit ?? 'C';

  // helper: extract first numeric value (can be negative/decimal) from a string
  const parseTemp = (s?: string): number | null => {
    if (!s) return null;
    const m = s.match(/-?\d+(?:\.\d+)?/);
    if (!m) return null;
    return parseFloat(m[0]);
  };

  const cToF = (c: number) => Math.round((c * 9) / 5 + 32);
  const fToC = (f: number) => Math.round(((f - 32) * 5) / 9);

  const format = (value: number | null, targetUnit: 'C' | 'F') => {
    if (value === null) return '';
    return `${value}\u00B0${targetUnit}`;
  };

  // parse incoming temps (assume provided values are in Celsius if '°C' present, else try to infer)
  const parsedCurrent = parseTemp(currentTemp);
  const parsedLow = parseTemp(lowTemp);

  // Determine source unit from provided string if it contains °F or °C, otherwise assume Celsius
  const inferSourceUnit = (s?: string) => {
    if (!s) return 'C';
    return /\u00B0?F/i.test(s) ? 'F' : 'C';
  };

  const sourceUnit = inferSourceUnit(currentTemp) || inferSourceUnit(lowTemp) || 'C';

  const convert = (val: number | null) => {
    if (val === null) return null;
    if (sourceUnit === unit) return Math.round(val);
    if (sourceUnit === 'C' && unit === 'F') return cToF(val);
    if (sourceUnit === 'F' && unit === 'C') return fToC(val);
    return Math.round(val);
  };

  const displayCurrent = format(convert(parsedCurrent), unit as 'C' | 'F');
  const displayLow = parsedLow !== null ? format(convert(parsedLow), unit as 'C' | 'F') : '';

  return (
    <div className={cn("flex flex-col items-end transition-transform duration-150 hover:scale-105", className)} {...props}>
      <div className="text-2xl font-inter font-semibold text-white leading-tight">
        {displayCurrent}
      </div>
      {displayLow && (
        <div className="text-xs font-inter text-white/80 mt-1">
          {displayLow}
        </div>
      )}
    </div>
  );
}