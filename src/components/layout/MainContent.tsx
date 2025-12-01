"use client";
import React from "react";
import Image from "next/image";
import { Button } from '@/components/ui/button';
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
import BundlesPageHeader from '@/components/features/bundles/BundlesPageHeader';
import BundlesSection from '@/components/features/bundles/BundlesSection';
import AISuggestedPageHeader from '@/components/features/ai-suggestions/AISuggestedPageHeader';
import AISuggestedSection from '@/components/features/ai-suggestions/AISuggestedSection';

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
    className: "w-[102px]"
  },
  {
    title: "Average bundle",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue" as const,
    valueVariant: "bundle-amount" as const,
    descVariant: "this-month" as const,
    className: "w-[61px] self-end"
  },
  {
    title: "Revenue from Bundles",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue" as const,
    valueVariant: "bundle-amount" as const,
    descVariant: "this-month" as const,
    className: "w-[61px] self-end"
  },
  {
    title: "Slow-Moving Items",
    value: "5",
    percentage: "+12%",
    description: "This Week",
    variant: "slow-moving" as const,
    valueVariant: "bundle-number" as const,
    descVariant: "this-week" as const,
    className: "w-[61px] self-end"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 opacity-100">
      {statCardsData.map((card, index) => (
        <Card key={index}>
          <div className="w-full min-h-[117px] flex flex-col justify-between opacity-100">
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
  // Common container styles - fully responsive
  const containerStyle = "flex flex-col w-full mx-auto pb-20 lg:pb-8";
  
  return (
    <div 
      className={containerStyle}
      style={{
        paddingTop: view === 'dashboard' ? '34px' : '0px',
        gap: '32px',
        opacity: 1,
      }}
    >
      {/* Header Section - Only one header per view */}
      {view === 'dashboard' && (
        <>
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 w-full" style={{ height: 'auto', minHeight: '48px', opacity: 1 }}>
            <h1 className="text-[24px] sm:text-[32px] font-lato font-normal leading-none text-black m-0">
              Good Morning, Usfa
            </h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-3">
              <Button
                variant="pageHeaderSecondary"
                size="pageHeader"
                onClick={() => onViewChange('bundles')}
                className="min-w-[141px]"
              >
                Create Bundle
              </Button>
              <Button
                variant="pageHeaderPrimary"
                size="pageHeader"
                onClick={() => onViewChange('ai-suggested')}
                className="min-w-[222px] gap-2"
              >
                <Image 
                  src="/icons/si_ai-fill.svg"
                  alt="AI"
                  width={16}
                  height={16}
                />
                AI Suggested Bundles
              </Button>
            </div>
          </header>
          {renderStatCards()}
        </>
      )}

      {view === 'bundles' && (
        <div className="flex flex-col w-full gap-6">
          <BundlesPageHeader onBackClick={() => onViewChange('dashboard')} />
          <h1 className="text-[32px] font-lato font-normal leading-none text-black mt-2 mb-4">Bundles</h1>
          {renderStatCards()}
          <BundlesSection />
        </div>
      )}

      {view === 'ai-suggested' && (
        <div className="flex flex-col w-full">
          <AISuggestedPageHeader onBackClick={() => onViewChange('dashboard')} />
          <AISuggestedSection />
        </div>
      )}

      {/* Main Content Sections */}
      {view === 'dashboard' && <DashboardContent onViewChange={onViewChange} />}
    </div>
  );
}

// Dashboard Content Component
function DashboardContent({ onViewChange }: { onViewChange: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void }) {
  return (
    <>
      {/* Second Row */}
      <div className="grid w-full gap-4 opacity-100" style={{ gridTemplateColumns: '1fr 1.15fr 0.85fr' }}>
        <WeatherWidget />
        <SalesGraph />
        <BrewlySuggestion onViewChange={onViewChange} />
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-3 w-full gap-4 opacity-100 mt-5">
        <UpcomingEvents />
        <AverageOutcome />
        <PerformanceByType />
      </div>
    </>
  );
}

// Weather Widget Component
function WeatherWidget() {
  return (
    <WeatherCard>
      <div className="flex justify-between items-start">
        <div>
          <WeatherLocation location="Dubai Marina" />
          <div className="w-[159px] h-[45px] gap-1 flex flex-col opacity-100">
            <CardTitle variant="weather-day" className="w-[72px] h-6">Sunday</CardTitle>
            <CardTitle variant="weather-date" className="w-[159px] h-[17px]">04 Aug,2024</CardTitle>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="w-[56px] h-8 gap-2 rounded-[8px] px-2 py-1 bg-white/10 border border-[#D9D9D9]/30 flex items-center justify-center opacity-100">
            <span className="w-6 h-6 font-inter font-normal text-sm text-white opacity-100 flex items-center">
              °C
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <TemperatureDisplay currentTemp="28°C" lowTemp="/24°C" />
        </div>
      </div>

      <div className="flex justify-center items-center flex-1">
        <Image 
          src="/icons/Rain cloud.svg"
          alt="rain cloud"
          width={117}
          height={112}
          className="opacity-100"
        />
      </div>

      <div className="w-[87px] h-[43px] gap-[7px] flex flex-col self-end opacity-100">
        <div className="w-[86px] h-[19px] font-inter font-medium text-base text-white leading-none opacity-100">
          Heavy Rain
        </div>
        <div className="w-[87px] h-[17px] font-inter font-normal text-sm text-white text-center leading-none opacity-100">
          Feels like 31°
        </div>
      </div>
    </WeatherCard>
  );
}

// Sales Graph Component
function SalesGraph() {
  return (
    <SalesGraphCard>
      <div className="flex justify-between items-start w-full">
        <SalesPerformanceHeader 
          title="Sales & Upsell Performance" 
          amount="AED 240.8K" 
          percentage="24.6%" 
        />
        <GraphLegend />
      </div>
      <div className="w-full flex justify-center items-center mt-4 opacity-100">
        <Image 
          src="/icons/sales-graph.svg"
          alt="sales graph"
          width={375}
          height={224}
          className="opacity-100 max-w-full h-auto"
        />
      </div>
      <DaysRow />
    </SalesGraphCard>
  );
}

// Brewly Suggestion Component
function BrewlySuggestion({ onViewChange }: { onViewChange: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void }) {
  return (
    <SuggestionCard>
      <CardHeader variant="suggestion">
        <span>Brewly Suggestion</span>
        <div 
          onClick={() => onViewChange('bundles')}
          className="w-[42px] h-6 font-lato font-normal text-xs leading-6 text-right underline text-white opacity-100 cursor-pointer hover:opacity-80 transition-opacity"
        >
          View all
        </div>
      </CardHeader>

      <div className="flex gap-2 justify-center">
        {[1, 2].map((item) => (
          <SuggestionProduct key={item}>
            <Image 
              src="/icons/samplecofeeimage.svg"
              alt="coffee"
              width={65}
              height={104}
              className="opacity-100"
            />
          </SuggestionProduct>
        ))}
      </div>

      <CardTitle variant="suggestion" className="w-[246px] h-12 self-center">
        Warm up your rainy afternoon with this treat
      </CardTitle>

      <GoLiveButton />
    </SuggestionCard>
  );
}

// Upcoming Events Component
function UpcomingEvents() {
  return (
    <EventsCard>
      <CardHeader variant="events" className="w-full mb-4 opacity-100">
        <span>Upcomming events</span>
        <SeeAllButton />
      </CardHeader>

      <div className="w-full flex flex-col gap-3 opacity-100">
        {eventsData.map((event, index) => (
          <div key={index} className="flex gap-3 items-center">
            <EventDate day={event.day} month={event.month} />
            <div className="gap-1 flex flex-col opacity-100">
              <CardTitle variant="event-title" className="whitespace-nowrap">
                {event.title}
              </CardTitle>
              <CardTitle variant="event-subtitle" className="whitespace-nowrap">
                {event.subtitle}
              </CardTitle>
            </div>
          </div>
        ))}
      </div>
    </EventsCard>
  );
}

// Average Outcome Component
function AverageOutcome() {
  return (
    <OutcomeCard>
      <CardHeader variant="outcome" className="w-full mb-4 opacity-100">
        <span>Average outcome</span>
        <PercentageBadge percentage="24.6%" />
      </CardHeader>

      <div className="w-full relative mx-auto -mt-5">
        <div 
          className="mx-auto w-[164px] h-[164px] rounded-full flex items-center justify-center"
          style={{
            background: 'conic-gradient(from -90deg, white 0deg 2deg, #FF6961 2deg 138deg, white 138deg 140deg, #FF2311 140deg 235deg, white 235deg 237deg, #28CD41 237deg 320deg, white 320deg 322deg, #6AC4DC 322deg 358deg, white 358deg 360deg)'
          }}
        >
          <div className="w-[126px] h-[126px] rounded-full bg-white flex items-center justify-center">
            <div className="flex flex-col items-center justify-center opacity-100">
              <CardTitle variant="outcome-total" className="text-center">180</CardTitle>
              <CardTitle variant="outcome-label" className="text-center whitespace-nowrap">
                Total Order
              </CardTitle>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center gap-4 mt-4 opacity-100">
        <LegendItem color="#28CD41" label="Afternoon" value="40%" />
        <LegendItem color="#FF2311" label="Morning" value="28%" />
        <LegendItem color="#6AC4DC" label="Evening" value="32%" />
      </div>
    </OutcomeCard>
  );
}

// Performance by Type Component
function PerformanceByType() {
  return (
    <PerformanceCard>
      <div className="w-full gap-[13px] flex flex-col opacity-100">
        <CardHeader variant="performance" className="w-full">
          Performance by Type
        </CardHeader>

        <div className="w-full flex flex-col gap-4 opacity-100">
          {performanceData.map((item, index) => (
            <div key={index} className="w-full gap-2 flex flex-col opacity-100">
              <div className="w-full flex justify-between opacity-100">
                <CardTitle variant="performance-title" className="whitespace-nowrap">
                  {item.title}
                </CardTitle>
                <CardTitle variant="performance-subtitle" className="whitespace-nowrap">
                  {item.subtitle}
                </CardTitle>
              </div>
              <ProgressBar percentage={item.percentage} color={item.color} />
            </div>
          ))}
        </div>
      </div>
    </PerformanceCard>
  );
}

// Bundles Content Component - No duplicate header
function BundlesContent() {
  return (
    <div className="flex flex-col w-full gap-6">
      <BundlesSection />
    </div>
  );
}

// AI Suggested Content Component
function AISuggestedContent() {
  return (
    <div className="flex-1 w-full">
      {/* AI Suggested content goes here */}
      <div className="text-center py-8 text-gray-500">
        AI Suggested Content - Coming Soon
      </div>
    </div>
  );
}