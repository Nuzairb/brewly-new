"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { buildImageUrl, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { SalesPerformanceChart } from "@/components/features/dashboard/SalesPerformanceChart";

import {
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
  LegendItem
} from '@/components/ui/card';
import AverageOutcome from '@/components/layout/Averageoutcome';
import PerformanceByType from '@/components/layout/Performancebytype';
import { TemperatureUnitProvider } from '@/components/ui/temperature-context';
import BundlesPageHeader from '@/components/features/bundles/BundlesPageHeader';
import BundlesSection from '@/components/features/bundles/BundlesSection';
import AISuggestedPageHeader from '@/components/features/ai-suggestions/AISuggestedPageHeader';
import AISuggestedSection from '@/components/features/ai-suggestions/AISuggestedSection';
import { getBundles } from "@/app/api/bundles/getBundles";

// Component ke andar
interface MainContentProps {
  view: 'dashboard' | 'bundles' | 'ai-suggested';
  onViewChange: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void;
}

// Stat cards data for reusability
const statCardsData = [
  {
    title: "Active Bundles",
    value: "22",
    percentage: "+12%",
    description: "Running campaigns",
    variant: "active-bundle" as const,
    valueVariant: "bundle-number" as const,
    descVariant: "running-campaigns" as const,
    className: "w-[102px] sm:w-auto"
  },
  {
    title: "Average bundle",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue" as const,
    valueVariant: "bundle-amount" as const,
    descVariant: "this-month" as const,
    className: "w-[61px] sm:w-auto self-end"
  },
  {
    title: "Revenue from Bundles",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue" as const,
    valueVariant: "bundle-amount" as const,
    descVariant: "this-month" as const,
    className: "w-[61px] sm:w-auto self-end"
  },
  {
    title: "Slow-Moving Items",
    value: "5",
    percentage: "+12%",
    description: "This Week",
    variant: "slow-moving" as const,
    valueVariant: "bundle-number" as const,
    descVariant: "this-week" as const,
    className: "w-[61px] sm:w-auto self-end"
  }
];

// Events data for reusability
const eventsData = [
  { day: "10", month: "June", title: "Winter Music Fest", subtitle: "Promote hot lattes" },
  { day: "10", month: "June", title: "Winter Music Fest", subtitle: "Promote hot lattes" },
  { day: "10", month: "June", title: "Winter Music Fest", subtitle: "Promote hot lattes" }
];

// Performance data for reusability
const performanceData = [
  { title: "AI Bundles", subtitle: "Smart automated promos", percentage: 36, color: "#FF6961" },
  { title: "Manual", subtitle: "Manager-crafted deals", percentage: 53, color: "#409CFF" },
  { title: "Event", subtitle: "Occasion-based offers", percentage: 78, color: "#FF2311" },
  { title: "Expiry", subtitle: "Clear stock fast", percentage: 36, color: "#6AC4DC" }
];

// Reusable function for stat cards
const renderStatCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4">
      {statCardsData.map((card, index) => (
        <Card key={index}>
          <div className="w-full min-h-[117px] flex flex-col justify-between">
            <CardHeader variant={card.variant}>
              {card.title}
              <CardPercentage value={card.percentage} />
            </CardHeader>
            <CardContent variant={card.valueVariant}>
              {card.value}
            </CardContent>
            <CardDescription variant={card.descVariant} className={card.className}>
              {card.description}
            </CardDescription>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default function MainContent({ view, onViewChange }: MainContentProps) {
  const router = useRouter();
  
  // Common container styles - fully responsive
  const containerStyle = "flex flex-col w-full mx-auto pb-20 lg:pb-8 px-4 sm:px-6 lg:px-8";
  
  return (
    <TemperatureUnitProvider>
    <div 
      className={cn(containerStyle, 'pt-6 sm:pt-8 lg:pt-[34px] gap-6 sm:gap-8')}
    >
      {/* Header Section - Only one header per view */}
      {view === 'dashboard' && (
        <>
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full min-h-[48px]">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-lato font-normal leading-tight text-black">
              Good Morning, Usfa
            </h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-3">
              <Button
                variant="pageHeaderSecondary"
                size="pageHeader"
                onClick={() => router.push('/create-bundle')}
                className="min-w-[141px] w-full sm:w-auto"
              >
                Create Bundle
              </Button>
              <Button
                variant="pageHeaderPrimary"
                size="pageHeader"
                onClick={() => router.push('/ai-suggested')}
                className="min-w-[222px] gap-2 w-full sm:w-auto"
              >
                <Image 
                  src="/icons/si_ai-fill.svg"
                  alt="AI"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                AI Suggested Bundles
              </Button>
            </div>
          </header>
          {renderStatCards()}
        </>
      )}

      {view === 'bundles' && (
        <>
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full min-h-[48px]">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-lato font-normal leading-tight text-black">
              Good Morning, Usfa
            </h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-3">
              <Button
                variant="pageHeaderSecondary"
                size="pageHeader"
                onClick={() => router.push('/bundles-dashboard/all')}
                className="min-w-[141px] w-full sm:w-auto"
              >
                Create Bundle
              </Button>
              <Button
                variant="pageHeaderPrimary"
                size="pageHeader"
                onClick={() => router.push('/ai-suggested')}
                className="min-w-[222px] gap-2 w-full sm:w-auto"
              >
                <Image 
                  src="/icons/si_ai-fill.svg"
                  alt="AI"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                AI Suggested Bundles
              </Button>
            </div>
          </header>
          {renderStatCards()}
        </>
      )}

      {/* Main Content Sections */}
      {view === 'dashboard' && <DashboardContent onViewChange={onViewChange} />}
      {view === 'bundles' && <DashboardContent onViewChange={onViewChange} />}

      {view === 'ai-suggested' && (
        <div className="flex flex-col w-full">
          <AISuggestedPageHeader
            onBackClick={() => onViewChange('dashboard')}
            searchTerm=""
            onSearchChange={() => {}}
          />
          <AISuggestedSection />
        </div>
      )}
    </div>
    </TemperatureUnitProvider>
  );
}

// Dashboard Content Component
function DashboardContent({ onViewChange }: { onViewChange: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void }) {
  return (
    <>
      {/* Second Row */}
      <div className="grid w-full gap-4 grid-cols-1 lg:grid-cols-3 lg:grid-rows-1">
        <div className="lg:col-span-1">
          <WeatherWidget />
        </div>
        <div className="lg:col-span-1">
          {/* REPLACED: Old static image chart with interactive component (compact for this dashboard only) */}
          <SalesPerformanceChart compact={true} />
        </div>
        <div className="lg:col-span-1">
          <BrewlySuggestion onViewChange={onViewChange} />
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 mt-4 lg:mt-5">
        <UpcomingEvents />
        <AverageOutcome />
        <PerformanceByType />
      </div>
    </>
  );
}

// Weather Widget Component
function WeatherWidget() {
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');

  return (
    <div className="w-full h-[344px] rounded-[24px] pt-[19px] px-4 pb-[19px] bg-gradient-to-br from-[#011913] from-1.29% to-[#004534] to-98.71% opacity-100 flex flex-col justify-between">
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col">
          <WeatherLocation location="Dubai Marina" />
          <div className="flex flex-col gap-1 mt-2">
            <CardTitle variant="weather-day" className="text-lg">Sunday</CardTitle>
            <CardTitle variant="weather-date" className="text-sm">04 Aug,2024</CardTitle>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <TemperatureUnitSelector 
            temperatureUnit={temperatureUnit}
            onUnitChange={setTemperatureUnit}
          />
          <TemperatureDisplay 
            currentTemp="28°C" 
            lowTemp="/24°C" 
            temperatureUnit={temperatureUnit}
          />
        </div>
      </div>

      <div className="flex justify-center items-center flex-1 my-4">
        <Image 
          src="/icons/Raincloud.svg"
          alt="rain cloud"
          width={117}
          height={112}
          className="w-auto h-auto max-w-full max-h-[112px]"
        />
      </div>

      <div className="flex flex-col items-start">
        <div className="text-base font-medium text-white leading-tight">
          Heavy Rain
        </div>
        <div className="text-sm font-normal text-white leading-tight">
          Feels like 31°
        </div>
      </div>
    </div>
  );
}

        
// Fallback data for AI suggestions
const fallbackBundles = [
  {
    bundle_name: "Morning Energy Bundle",
    short_description: "Espresso · Croissant · Orange Juice",
    image_url: "/icons/samplecofeeimage.svg",
  }
];

// Helper function to validate image URL
const isValidImageUrl = (url: string | undefined | null): boolean => {
  if (!url || typeof url !== 'string') return false;
  // Filter out invalid values like "string", empty strings, "undefined", "null"
  const trimmed = url.trim();
  if (!trimmed || trimmed === 'string' || trimmed === 'undefined' || trimmed === 'null') return false;
  // Must start with / or http:// or https://
  return trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://');
};

// Brewly Suggestion Component - Made fully responsive
function BrewlySuggestion({ onViewChange }: { onViewChange: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void }) {
  const router = useRouter();
  const [bundles, setBundles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const bundles = getBundles({ status: 'pending' })
    if (bundles instanceof Promise) {
      bundles.then(data => {
        setBundles(data);
        setLoading(false);
      });
    }
  }, []);

  const suggestions = bundles.slice(0, 2);
  const hasSuggestions = suggestions.length > 0;
  const bundle = hasSuggestions ? suggestions[0] : null;
  const bundleImageSrc = buildImageUrl(bundle?.image_url || bundle?.image);

  // Get valid image URL or fall back to default
  const getImageUrl = (bundle: any): string => {
    const imageUrl = bundle?.image_url || bundle?.image;
    return isValidImageUrl(imageUrl) ? imageUrl : "/icons/samplecofeeimage.svg";
  };

  return (
    <div className="relative w-full h-full min-h-[260px] bg-[#00704A] rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* View All Link */}
      <button
        onClick={() => router.push('/ai-suggested')}
        className="absolute top-4 right-4 z-40 text-white/90 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer px-3 py-1.5 rounded-lg backdrop-blur-sm"
      >
        View All
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-4 h-4">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className="relative w-full h-full flex flex-col">
        {/* Image Container */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center bg-[#00704A] text-white text-sm">
              <div className="animate-pulse">Loading suggestions...</div>
            </div>
          ) : hasSuggestions ? (
            <Image
              src={bundleImageSrc}
              alt={bundle?.bundle_name || bundle?.name || "Bundle"}
              fill
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00704A] to-[#00563E] text-white p-4 text-center">
              <div>
                <div className="text-lg font-semibold mb-2">No AI suggestions available</div>
                <p className="text-sm opacity-90">Try creating a bundle manually or check back later for AI recommendations.</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20" />
        
        {/* Content Container */}
        <div className="relative z-30 flex flex-col justify-end h-full p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="text-white text-xl sm:text-2xl font-semibold leading-tight mb-2 line-clamp-2">
              {bundle?.bundle_name || bundle?.name || 'Bohemia Presents MK'}
            </h2>
            <div className="text-sm sm:text-base text-white/90 mb-4 line-clamp-2">
              {bundle?.short_description || 'Classic Cappuccino · Baked Cake · Vanilla Cookies'}
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/ai-suggested')}
            className="w-full bg-white text-[#00704A] font-semibold text-base sm:text-lg py-3 sm:py-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Go Live
          </button>
        </div>
      </div>
    </div>
  );
}

// Fallback data for upcoming events
const fallbackEvents = [
  {
    id: 1,
    event_name: "Weekend Special",
    event_description: "Promote combo deals",
    event_datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
  },
  {
    id: 2,
    event_name: "Happy Hour",
    event_description: "Afternoon beverage boost",
    event_datetime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
  },
  {
    id: 3,
    event_name: "Holiday Season",
    event_description: "Seasonal bundles launch",
    event_datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  }
];

// Upcoming Events Component
function UpcomingEvents() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/events/upcoming')
      .then(res => res.json())
      .then(data => {
        const eventsArray = Array.isArray(data) ? data : [];
        setEvents(eventsArray.length > 0 ? eventsArray : fallbackEvents);
        setLoading(false);
      })
      .catch(() => {
        // Use fallback data if API fails
        setEvents(fallbackEvents);
        setLoading(false);
      });
  }, []);

  return (
    <EventsCard>
      <CardHeader variant="events" className="w-full mb-4">
        <span>Upcoming events</span>
        <SeeAllButton onClick={() => router.push('/Events')} />
      </CardHeader>

      <div className="w-full flex flex-col gap-3 min-h-[50px]">
        {loading ? (
          <div className="text-center text-gray-500 py-4">Loading events...</div>
        ) : events.length > 0 ? (
          events.slice(0, 3).map((event, index) => {
            const date = new Date(event.event_datetime);
            const day = date.getDate().toString().padStart(2, '0');
            const month = date.toLocaleString('default', { month: 'short' });
            
            // Get venue name or city as subtitle
            const subtitle = event.venue?.name || event.venue?.city || event.category?.genre || 'Event';
            
            return (
              <div key={event.id || index} className="flex gap-3 items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <EventDate day={day} month={month} />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <CardTitle variant="event-title" className="truncate">
                    {event.name || 'Event'}
                  </CardTitle>
                  <CardTitle variant="event-subtitle" className="truncate text-gray-600">
                    {subtitle}
                  </CardTitle>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-4">No upcoming events</div>
        )}
      </div>
    </EventsCard>
  );
}

// Average Outcome Component (rendered above in the dashboard grid)