"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { buildImageUrl, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

const SalesPerformanceChart = dynamic(() => import('@/components/features/dashboard/SalesPerformanceChart').then(mod => mod.SalesPerformanceChart), { ssr: false });

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
import StatCards from '@/components/ui/StatCards';
const PerformanceByType = dynamic(() => import('@/components/layout/Performancebytype'), { ssr: false });
import { TemperatureUnitProvider } from '@/components/ui/temperature-context';
import BundlesPageHeader from '@/components/features/bundles/BundlesPageHeader';
import BundlesSection from '@/components/features/bundles/BundlesSection';
import AISuggestedPageHeader from '@/components/features/ai-suggestions/AISuggestedPageHeader';
import AISuggestedSection from '@/components/features/ai-suggestions/AISuggestedSection';
import { getBundles } from "@/app/api/bundles/getBundles";
import { getEvents } from '@/app/api/events/getEvents';

interface MainContentProps {
  view: 'dashboard' | 'bundles' | 'ai-suggested';
  onViewChange: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void;
  statCards?: typeof statCardsData;
}

const statCardsData = [
  {
    title: "Active Bundles",
    value: "22",
    percentage: "+12%",
    description: "Running campaigns",
    variant: "active-bundle" as const,
    valueVariant: "bundle-number" as const,
    descVariant: "running-campaigns" as const,
  },
  {
    title: "Average bundle",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue" as const,
    valueVariant: "bundle-amount" as const,
    descVariant: "this-month" as const,
  },
  {
    title: "Revenue from Bundles",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue" as const,
    valueVariant: "bundle-amount" as const,
    descVariant: "this-month" as const,
  },
  {
    title: "Slow-Moving Items",
    value: "5",
    percentage: "+12%",
    description: "This Week",
    variant: "slow-moving" as const,
    valueVariant: "bundle-number" as const,
    descVariant: "this-week" as const,
  }
];

// StatCards is now a shared presentational component in src/components/ui/StatCards.tsx

export default function MainContent({ view, onViewChange, statCards }: MainContentProps) {
  const router = useRouter();
  const [cardsData, setCardsData] = useState(() => statCards ?? statCardsData);
  const [animatedValues, setAnimatedValues] = useState<string[]>([]);
  const [animatedPercentages, setAnimatedPercentages] = useState<string[]>([]);
  const rafRefs = useRef<Array<number | null>>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (statCards) {
      console.log('[MainContent] Using provided statCards prop');
      setCardsData(statCards);
      hasLoadedRef.current = true;
      return;
    }

    if (isLoadingRef.current || hasLoadedRef.current) {
      console.log('[MainContent] Already loading or loaded, skipping...');
      return;
    }

    isLoadingRef.current = true;
    console.log('[MainContent] Starting to load stats...');

    const loadStats = async () => {
      try {
        const bundles = await getBundles();
        console.log('[MainContent] getBundles result:', bundles);
        
        const activeCount = Array.isArray(bundles) ? bundles.length : 0;
        const updated = statCardsData.map((c) => ({ ...c }));
        updated[0] = { ...updated[0], value: String(activeCount) };

        setCardsData(updated);
        hasLoadedRef.current = true;
        console.log('[MainContent] Stats loaded successfully');
      } catch (err) {
        console.error('[MainContent] Failed to load stats:', err);
        setCardsData(statCardsData);
      } finally {
        isLoadingRef.current = false;
      }
    };

    loadStats();
  }, [statCards]);

  useEffect(() => {
    rafRefs.current.forEach(id => id && cancelAnimationFrame(id));
    rafRefs.current = [];

    if (!cardsData || cardsData.length === 0) {
      setAnimatedValues([]);
      return;
    }

    const duration = 700;
    const now = () => performance.now();

    const formatDisplay = (raw: string, valueNum: number) => {
      const prefixMatch = raw.match(/^[^0-9+\-\.]+/);
      const suffixMatch = raw.match(/[^0-9\.]*$/);
      const prefix = prefixMatch ? prefixMatch[0] : (raw.startsWith('+') ? '+' : '');
      const suffix = suffixMatch ? suffixMatch[0] : '';
      const formatted = Math.round(valueNum).toLocaleString();
      return `${prefix}${formatted}${suffix}`.trim();
    };

    const parsedTargets = cardsData.map(c => {
      const raw = String(c.value || '0');
      const numStr = raw.replace(/[^0-9.\-]/g, '');
      const n = numStr ? Number(numStr.replace(/,/g, '')) : 0;
      const percentRaw = String(c.percentage || '0%');
      const percentNumStr = percentRaw.replace(/[^0-9.\-]/g, '');
      const p = percentNumStr ? Number(percentNumStr) : 0;
      return { raw, target: isNaN(n) ? 0 : n, percentRaw, percentTarget: isNaN(p) ? 0 : p };
    });

    const startTime = now();
    const startValues = parsedTargets.map(() => 0);
    const startPercents = parsedTargets.map(() => 0);
    setAnimatedValues(parsedTargets.map(p => formatDisplay(p.raw, 0)));
    setAnimatedPercentages(parsedTargets.map(p => formatDisplay(p.percentRaw, 0)));

    parsedTargets.forEach((p, idx) => {
      const tick = (t: number) => {
        const elapsed = t - startTime;
        const progress = Math.min(1, elapsed / duration);
        const current = startValues[idx] + (p.target - startValues[idx]) * progress;
        const currentPercent = startPercents[idx] + (p.percentTarget - startPercents[idx]) * progress;
        setAnimatedValues(prev => {
          const copy = [...prev];
          copy[idx] = formatDisplay(p.raw, current);
          return copy;
        });
        setAnimatedPercentages(prev => {
          const copy = [...prev];
          copy[idx] = formatDisplay(p.percentRaw, currentPercent);
          return copy;
        });
        if (progress < 1) {
          rafRefs.current[idx] = requestAnimationFrame(tick);
        }
      };
      rafRefs.current[idx] = requestAnimationFrame(tick);
    });

    return () => {
      rafRefs.current.forEach(id => id && cancelAnimationFrame(id));
      rafRefs.current = [];
    };
  }, [cardsData]);

  useEffect(() => {
    setIsVisible(false);
    const t = setTimeout(() => setIsVisible(true), 30);
    return () => clearTimeout(t);
  }, [cardsData]);

  const dashboardHeader = useMemo(() => (
    <header className="flex flex-row justify-between items-center gap-4 w-full">
      <h1 className="text-3xl font-lato font-normal leading-tight text-black whitespace-nowrap">
        Good Morning, Usfa
      </h1>
      <div className="flex flex-row items-center gap-3 flex-shrink-0">
        <Button
          variant="pageHeaderSecondary"
          size="pageHeader"
          onClick={() => router.push('/create-bundle')}
          className="whitespace-nowrap"
        >
          Create Bundle
        </Button>
        <Button
          variant="pageHeaderPrimary"
          size="pageHeader"
          onClick={() => router.push('/ai-suggested')}
          className="gap-2 whitespace-nowrap"
        >
          <Image 
            src="/icons/si_ai-fill.svg"
            alt="AI"
            width={16}
            height={16}
            className="w-4 h-4 flex-shrink-0"
          />
          AI Suggested Bundles
        </Button>
      </div>
    </header>
  ), [router]);

  const bundlesHeader = useMemo(() => (
    <header className="flex flex-row justify-between items-center gap-4 w-full">
      <h1 className="text-3xl font-lato font-normal leading-tight text-black whitespace-nowrap">
        Good Morning, Usfa
      </h1>
      <div className="flex flex-row items-center gap-3 flex-shrink-0">
        <Button
          variant="pageHeaderSecondary"
          size="pageHeader"
          onClick={() => router.push('/bundles-dashboard/all')}
          className="whitespace-nowrap"
        >
          Create Bundle
        </Button>
        <Button
          variant="pageHeaderPrimary"
          size="pageHeader"
          onClick={() => router.push('/ai-suggested')}
          className="gap-2 whitespace-nowrap"
        >
          <div className="w-4 h-4 relative flex-shrink-0">
            <Image 
              src="/icons/si_ai-fill.svg"
              alt="AI"
              fill
              sizes="16px"
              className="object-contain"
            />
          </div>
          AI Suggested Bundles
        </Button>
      </div>
    </header>
  ), [router]);
  
  return (
    <TemperatureUnitProvider>
      <div className="flex flex-col w-full mx-auto pb-8 px-8 pt-8 gap-8">
        {view === 'dashboard' && (
          <>
            {dashboardHeader}
            <StatCards 
              cards={cardsData}
              animatedValues={animatedValues}
              animatedPercentages={animatedPercentages}
              isVisible={isVisible}
            />
          </>
        )}

        {view === 'bundles' && (
          <>
            {bundlesHeader}
            <StatCards 
              cards={cardsData}
              animatedValues={animatedValues}
              animatedPercentages={animatedPercentages}
              isVisible={isVisible}
            />
          </>
        )}

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

function DashboardContent({ onViewChange }: { onViewChange: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void }) {
  return (
    <>
      <div className="grid w-full gap-4 grid-cols-3">
        <div className="w-full">
          <WeatherWidget />
        </div>
        <div className="w-full">
          <SalesPerformanceChart compact={true} className="h-[556px]" />
        </div>
        <div className="w-full">
          <BrewlySuggestion onViewChange={onViewChange} />
        </div>
      </div>

      <div className="grid grid-cols-3 w-full gap-4 mt-5">
        <UpcomingEvents className="h-[290px]"/>
        <AverageOutcome className="h-[290px]"/>
        <PerformanceByType className="h-[290px]"/>
      </div>
    </>
  );
}

function WeatherWidget() {
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');

  return (
    <div className="w-full h-[344px] rounded-3xl pt-5 px-4 pb-5 bg-gradient-to-br from-[#011913] to-[#004534] flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] cursor-pointer group">
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col transition-transform duration-300 group-hover:translate-x-1">
          <WeatherLocation location="Dubai Marina" />
          <div className="flex flex-col gap-1 mt-2">
            <CardTitle variant="weather-day" className="text-lg">Sunday</CardTitle>
            <CardTitle variant="weather-date" className="text-sm">04 Aug,2024</CardTitle>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 transition-transform duration-300 group-hover:-translate-x-1">
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
        <div className="relative w-[117px] h-[112px] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Image 
            src="/icons/Raincloud.svg"
            alt="rain cloud"
            fill
            sizes="117px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col items-start transition-all duration-300 group-hover:translate-y-[-2px]">
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

const isValidImageUrl = (url: string | undefined | null): boolean => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === 'string' || trimmed === 'undefined' || trimmed === 'null') return false;
  return trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://');
};

function BrewlySuggestion({ onViewChange }: { onViewChange: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void }) {
  const router = useRouter();
  const [bundles, setBundles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const bundlesPromise = getBundles({ status: 'pending' });
    if (bundlesPromise instanceof Promise) {
      bundlesPromise.then(data => {
        setBundles(data);
        setLoading(false);
      }).catch(() => {
        setBundles([]);
        setLoading(false);
      });
    }
  }, []);

  const suggestions = bundles.slice(0, 2);
  const hasSuggestions = suggestions.length > 0;
  const bundle = hasSuggestions ? suggestions[0] : null;
  const bundleImageSrc = buildImageUrl(bundle?.image_url || bundle?.image);

  return (
    <div className="relative w-full h-full min-h-[260px] bg-[#00704A] rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group cursor-pointer">
      <button
        onClick={() => router.push('/ai-suggested')}
        className="absolute top-4 right-4 z-40 text-white/90 hover:text-white text-sm font-medium flex items-center gap-1 transition-all duration-300 cursor-pointer px-3 py-1.5 rounded-lg backdrop-blur-sm hover:backdrop-blur-md hover:bg-white/10"
      >
        View All
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className="relative w-full h-full flex flex-col">
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
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              sizes="33vw"
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
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20 transition-all duration-500 group-hover:from-black/80" />
        
        <div className="relative z-30 flex flex-col justify-end h-full p-6 transition-all duration-300 group-hover:translate-y-[-4px]">
          <div className="mb-4">
            <h2 className="text-white text-2xl font-semibold leading-tight mb-2 line-clamp-2 transition-all duration-300 group-hover:text-[#90EE90]">
              {bundle?.bundle_name || bundle?.name || 'Bohemia Presents MK'}
            </h2>
            <div className="text-base text-white/90 mb-4 line-clamp-2 transition-opacity duration-300 group-hover:text-white">
              {bundle?.short_description || 'Classic Cappuccino · Baked Cake · Vanilla Cookies'}
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/ai-suggested')}
            className="w-full bg-white text-[#00704A] font-semibold text-lg py-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Go Live
          </button>
        </div>
      </div>
    </div>
  );
}

const fallbackEvents = [
  {
    id: 1,
    event_name: "Weekend Special",
    event_description: "Promote combo deals",
    event_datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    event_name: "Happy Hour",
    event_description: "Afternoon beverage boost",
    event_datetime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    event_name: "Holiday Season",
    event_description: "Seasonal bundles launch",
    event_datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

function UpcomingEvents({ className }: { className?: string }) {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEvents()
      .then((data) => {
        const eventsArray = Array.isArray(data) ? data : [];
        setEvents(eventsArray.length > 0 ? eventsArray : fallbackEvents);
        setLoading(false);
      })
      .catch(() => {
        setEvents(fallbackEvents);
        setLoading(false);
      });
  }, []);

  return (
    <EventsCard className={className}>
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
            const subtitle = event.venue?.name || event.venue?.city || event.category?.genre || 'Event';
            
            return (
              <div key={event.id || index} className="flex gap-3 items-center p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer group hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5">
                <EventDate day={day} month={month} className="transition-transform duration-300 group-hover:scale-110" />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <CardTitle variant="event-title" className="truncate transition-colors duration-300 group-hover:text-[#00704A]">
                    {event.name || 'Event'}
                  </CardTitle>
                  <CardTitle variant="event-subtitle" className="truncate text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
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