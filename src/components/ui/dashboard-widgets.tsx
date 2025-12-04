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
      className="w-full lg:w-[363px] flex flex-col justify-between h-[344px] gap-2 rounded-[24px] pt-[19px] pr-4 pb-[19px] pl-4 bg-[linear-gradient(29.86deg,#011913_1.29%,#004534_98.71%)] opacity-100"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="w-[120px] h-[24px] gap-2 flex items-center opacity-100">
          <Image
            src="/icons/typcn_location.svg"
            alt="location"
            width={16}
            height={16}
            className="opacity-100"
          />            
          <span className="font-inter font-normal text-[14px] text-white whitespace-nowrap opacity-100">{location}</span>
          </div>
          <div className="w-[159px] h-[45px] gap-1 flex flex-col opacity-100">
            <div className="w-[72px] h-[24px] font-inter font-medium text-[20px] text-white opacity-100">{day}</div>
            <div className="w-[159px] h-[17px] font-inter font-normal text-[14px] text-white opacity-100">{date}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="w-[56px] h-[32px] gap-2 rounded-[8px] px-2 py-1 flex items-center justify-center bg-[#FFFFFF1A] border border-[rgba(217,217,217,0.3)] opacity-100">

            <span className="w-[24px] h-[24px] font-inter font-normal text-[14px] text-white flex items-center opacity-100">°C</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="w-[59px] h-[48px] flex flex-col items-end mt-7 opacity-100">
            <div className="w-[59px] h-[29px] font-inter font-medium text-[24px] text-white text-right opacity-100">{temperature}</div>
            <div className="w-[59px] h-[19px] font-inter font-medium text-[16px] text-right text-[#B9B9B9] opacity-100">{minTemperature}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-1">
        <Image src={weatherIcon} alt="rain cloud" width={117} height={112} className="opacity-100" />
      </div>
      <div className="w-[87px] h-[43px] gap-[7px] flex flex-col self-end opacity-100">
        <div className="w-[86px] h-[19px] font-inter font-medium text-[16px] text-white opacity-100">{weatherType}</div>
        <div className="w-[87px] h-[17px] font-inter font-normal text-[14px] text-center text-white opacity-100">{feelsLike}</div>
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
      className="w-full lg:w-[418px] flex flex-col h-[344px] rounded-[24px] border border-[#EEEEEE] bg-white opacity-100 p-5 relative"
    >
      <div className="absolute w-[203.59px] h-[57.5px] top-[27px] left-[23px] opacity-100">
        <div className="w-[201.59px] h-[17px] font-lato font-semibold text-[14px] text-[#1E1E1E] opacity-100">{title}</div>
        <div className="w-[184px] h-[32px] mt-[8.5px] gap-[6px] flex items-center opacity-100">
          <div className="w-[132px] h-[32px] font-lato font-normal text-[24px] text-[#1E1E1E] opacity-100">{amount}</div>
          <div className="w-[46px] h-[18px] rounded-[2px] px-1 py-[2px] flex items-center justify-between gap-[2px] opacity-100 bg-[#05C16833] border-[0.6px] border-[#05C16833]">


                      <span className="w-[28px] h-[14px] font-lato font-medium text-[10px] text-[#14CA74] opacity-100">24.6%</span>
           <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100">
              <path d="M1 7L7 1M7 1H2M7 1V6" stroke="#14CA74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
         </div>
        </div>
      </div>
      <div className="absolute w-[160.22px] h-[14px] top-[26.5px] left-[238.16px] flex gap-[37.17px] opacity-100">
        <div className="h-[14px] flex items-center gap-1 opacity-100">
          <div className="w-[10px] h-[10px] rounded-[2px] flex-shrink-0 bg-[#00A57D]"></div>
         <span className="font-lato font-normal text-[12px] text-[#787777] opacity-100 whitespace-nowrap">AI Suggested</span>
        </div>
        <div className="w-[54px] h-[14px] flex items-center gap-1 opacity-100">
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#1E1E1E]"></div>
          <span className="w-[40px] h-[14px] font-lato font-normal text-[12px] text-[#787777] opacity-100">Manual</span>
        </div>
      </div>
      <div className="absolute w-[375px] h-[224px] top-[78px] left-[25px] opacity-100">
        <Image src={graphSrc} alt="sales graph" width={375} height={224} className="opacity-100" />
      </div>
      <div className="absolute w-[373px] h-[14px] top-[310px] left-[24px] flex justify-between opacity-100">
        {days.map((day, idx) => (
          <div key={idx} className="w-[21px] h-[14px] font-lato font-medium text-[10px] text-[#787777] opacity-100 text-center">{day}</div>
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
  className="w-full lg:w-[283px] flex flex-col justify-between h-[344px] rounded-[24px] pt-[25px] pr-4 pb-[25px] pl-4 bg-[linear-gradient(29.86deg,#011913_1.29%,#004534_98.71%)] opacity-100"
    >
      <div className="flex justify-between items-center">
        <div className="w-[180px] h-[25px] font-lato font-semibold text-[22px] text-white opacity-100">{title}</div>
        <div onClick={onViewAllClick} className="w-[42px] h-[24px] font-lato font-normal text-[12px] text-right underline text-white opacity-100 cursor-pointer">View all</div>
      </div>
      <div className="flex gap-2 justify-center">
        {images.map((img, idx) => (
         <div
          key={idx}
          className="w-[115px] h-[112px] gap-2 rounded-[8px] px-[21px] py-1 flex items-center justify-center opacity-100 bg-[#FFFFFF1A] border border-[rgba(255,255,255,0.2)]">

         <Image src={img} alt="coffee" width={65} height={104} className="opacity-100" />
          </div>
        ))}
      </div>
      <div className="w-[246px] h-[48px] font-lato font-normal text-[16px] text-white opacity-100 text-center self-center">{description}</div>
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
