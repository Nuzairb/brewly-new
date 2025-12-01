import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface WeatherCardProps {
  location: string;
  day: string;
  date: string;
  temperature: string;
  minTemperature: string;
  weatherIcon: string;
  weatherType: string;
  feelsLike: string;
}

export function WeatherCard({ location, day, date, temperature, minTemperature, weatherIcon, weatherType, feelsLike }: WeatherCardProps) {
  return (
    <div
      className="w-full lg:w-[363px] flex flex-col justify-between"
      style={{
        height: '344px',
        gap: '8px',
        borderRadius: '24px',
        paddingTop: '19px',
        paddingRight: '16px',
        paddingBottom: '19px',
        paddingLeft: '16px',
        background: 'linear-gradient(29.86deg, #011913 1.29%, #004534 98.71%)',
        opacity: 1,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ width: '141px', height: '33px', gap: '8px', borderRadius: '8px', padding: '8px 16px', background: '#FFFFFF1A', border: '1px solid rgba(217, 217, 217, 0.3)', display: 'flex', alignItems: 'center', opacity: 1, marginBottom: '12px' }}>
            <Image src="/icons/typcn_location.svg" alt="location" width={16} height={16} style={{ opacity: 1 }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', color: '#FFFFFF', opacity: 1, whiteSpace: 'nowrap' }}>{location}</span>
          </div>
          <div style={{ width: '159px', height: '45px', gap: '4px', display: 'flex', flexDirection: 'column', opacity: 1 }}>
            <div style={{ width: '72px', height: '24px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '20px', color: '#FFFFFF', opacity: 1 }}>{day}</div>
            <div style={{ width: '159px', height: '17px', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', color: '#FFFFFF', opacity: 1 }}>{date}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ width: '56px', height: '32px', gap: '8px', borderRadius: '8px', padding: '4px 8px', background: '#FFFFFF1A', border: '1px solid rgba(217, 217, 217, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 }}>
            <span style={{ width: '24px', height: '24px', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', color: '#FFFFFF', opacity: 1, display: 'flex', alignItems: 'center' }}>°C</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ width: '59px', height: '48px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', opacity: 1, marginTop: '28px' }}>
            <div style={{ width: '59px', height: '29px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '24px', color: '#FFFFFF', opacity: 1, textAlign: 'right' }}>{temperature}</div>
            <div style={{ width: '59px', height: '19px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '16px', textAlign: 'right', color: '#B9B9B9', opacity: 1 }}>{minTemperature}</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Image src={weatherIcon} alt="rain cloud" width={117} height={112} style={{ opacity: 1 }} />
      </div>
      <div style={{ width: '87px', height: '43px', gap: '7px', display: 'flex', flexDirection: 'column', alignSelf: 'flex-end', opacity: 1 }}>
        <div style={{ width: '86px', height: '19px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '16px', color: '#FFFFFF', opacity: 1 }}>{weatherType}</div>
        <div style={{ width: '87px', height: '17px', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', textAlign: 'center', color: '#FFFFFF', opacity: 1 }}>{feelsLike}</div>
      </div>
    </div>
  );
}

interface SalesCardProps {
  title: string;
  amount: string;
  percentage: string;
  graphSrc: string;
  days: string[];
}

export function SalesCard({ title, amount, percentage, graphSrc, days }: SalesCardProps) {
  return (
    <div
      className="w-full lg:w-[418px] flex flex-col"
      style={{
        height: '344px',
        borderRadius: '24px',
        border: '1px solid #EEEEEE',
        background: '#FFFFFF',
        opacity: 1,
        padding: '20px',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', width: '203.59px', height: '57.5px', top: '27px', left: '23px', opacity: 1 }}>
        <div style={{ width: '201.59px', height: '17px', fontFamily: 'Lato, sans-serif', fontWeight: 600, fontSize: '14px', color: '#1E1E1E', opacity: 1 }}>{title}</div>
        <div style={{ width: '184px', height: '32px', marginTop: '8.5px', gap: '6px', display: 'flex', alignItems: 'center', opacity: 1 }}>
          <div style={{ width: '132px', height: '32px', fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: '24px', color: '#1E1E1E', opacity: 1 }}>{amount}</div>
          <div style={{ width: '46px', height: '18px', borderRadius: '2px', padding: '2px 4px', background: '#05C16833', border: '0.6px solid #05C16833', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2px', opacity: 1 }}>
            <span style={{ width: '28px', height: '14px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '10px', color: '#14CA74', opacity: 1 }}>24.6%</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}><path d="M1 7L7 1M7 1H2M7 1V6" stroke="#14CA74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', width: '160.22px', height: '14px', top: '26.5px', left: '238.16px', display: 'flex', gap: '37.17px', opacity: 1 }}>
        <div style={{ height: '14px', display: 'flex', alignItems: 'center', gap: '4px', opacity: 1 }}>
          <div style={{ width: '10px', height: '10px', background: '#00A57D', borderRadius: '2px', flexShrink: 0 }}></div>
          <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: '12px', color: '#787777', opacity: 1, whiteSpace: 'nowrap' }}>AI Suggested</span>
        </div>
        <div style={{ width: '54px', height: '14px', display: 'flex', alignItems: 'center', gap: '4px', opacity: 1 }}>
          <div style={{ width: '10px', height: '10px', background: '#1E1E1E', borderRadius: '2px' }}></div>
          <span style={{ width: '40px', height: '14px', fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: '12px', color: '#787777', opacity: 1 }}>Manual</span>
        </div>
      </div>
      <div style={{ position: 'absolute', width: '375px', height: '224px', top: '78px', left: '25px', opacity: 1 }}>
        <Image src={graphSrc} alt="sales graph" width={375} height={224} style={{ opacity: 1 }} />
      </div>
      <div style={{ position: 'absolute', width: '373px', height: '14px', top: '310px', left: '24px', display: 'flex', justifyContent: 'space-between', opacity: 1 }}>
        {days.map((day, idx) => (
          <div key={idx} style={{ width: '21px', height: '14px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '10px', color: '#787777', opacity: 1, textAlign: 'center' }}>{day}</div>
        ))}
      </div>
    </div>
  );
}

interface SuggestionCardProps {
  title: string;
  images: string[];
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
  onViewAllClick?: () => void;
}

export function SuggestionCard({ title, images, description, buttonText, onButtonClick, onViewAllClick }: SuggestionCardProps) {
  return (
    <div
      className="w-full lg:w-[283px] flex flex-col justify-between"
      style={{
        height: '344px',
        borderRadius: '24px',
        paddingTop: '25px',
        paddingRight: '16px',
        paddingBottom: '25px',
        paddingLeft: '16px',
        background: 'linear-gradient(29.86deg, #011913 1.29%, #004534 98.71%)',
        opacity: 1,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '180px', height: '25px', fontFamily: 'Lato, sans-serif', fontWeight: 600, fontSize: '22px', color: '#FFFFFF', opacity: 1 }}>{title}</div>
        <div onClick={onViewAllClick} style={{ width: '42px', height: '24px', fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: '12px', textAlign: 'right', textDecoration: 'underline', color: '#FFFFFF', opacity: 1, cursor: 'pointer' }}>View all</div>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {images.map((img, idx) => (
          <div key={idx} style={{ width: '115px', height: '112px', gap: '8px', borderRadius: '8px', background: '#FFFFFF1A', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 21px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 }}>
            <Image src={img} alt="coffee" width={65} height={104} style={{ opacity: 1 }} />
          </div>
        ))}
      </div>
      <div style={{ width: '246px', height: '48px', fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: '16px', color: '#FFFFFF', opacity: 1, textAlign: 'center', alignSelf: 'center' }}>{description}</div>
      <Button
        variant="dashboardWidget"
        onClick={onButtonClick}
        className="w-[246px] h-[44px] gap-2 px-4 py-2 self-center"
      >
        {buttonText}
      </Button>
    </div>
  );
}
