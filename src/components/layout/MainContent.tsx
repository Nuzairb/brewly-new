"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BundlesPageHeader from '@/components/features/bundles/BundlesPageHeader';
import AISuggestedPageHeader from '@/components/features/ai-suggestions/AISuggestedPageHeader';
import BundlesSection from '@/components/features/bundles/BundlesSection';
import AISuggestedSection from '@/components/features/ai-suggestions/AISuggestedSection';

interface MainContentProps {
  view?: 'dashboard' | 'bundles' | 'ai-suggested';
  onViewChange?: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void;
}

export function MainContent({ view: externalView, onViewChange }: MainContentProps = {}) {
    const router = useRouter();
  const [internalView, setInternalView] = useState<'dashboard' | 'bundles' | 'ai-suggested'>('dashboard');
  
  // Use external view if provided, otherwise use internal
  const view = externalView ?? internalView;
  
  const handleViewChange = (newView: 'dashboard' | 'bundles' | 'ai-suggested') => {
    setInternalView(newView);
    onViewChange?.(newView);
  };

  // Sync internal view with external view
  useEffect(() => {
    if (externalView) {
      setInternalView(externalView);
    }
  }, [externalView]);

  return (
    <div 
      className="flex flex-col w-full max-w-[1096px] mx-auto px-4 sm:px-5 lg:px-0 pb-20 lg:pb-8"
      style={{
        paddingTop: view === 'dashboard' ? '34px' : '0px',
        gap: '32px',
        opacity: 1,
      }}
    >
      {/* Conditional Header */}
      {view === 'dashboard' ? (
        <header 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 w-full"
          style={{
            height: 'auto',
            minHeight: '48px',
            opacity: 1,
          }}
        >
          {/* Left Side - Greeting */}
          <h1 
            className="text-[24px] sm:text-[32px]"
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 400,
              lineHeight: '100%',
              letterSpacing: '0px',
              color: '#000000',
              margin: 0,
            }}
          >
            Good Morning, Usfa
          </h1>

          {/* Right Side - Buttons Container */}
          <div 
            className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto"
            style={{
              gap: '12px',
            }}
          >
            {/* Button 1 - Create Bundle */}
            <button 
              onClick={() => handleViewChange('bundles')}
              className="flex items-center justify-center hover:bg-[#1A5D4A0A] transition-colors w-full sm:w-auto"
              style={{
                minWidth: '141px',
                height: '48px',
                borderRadius: '8px',
                border: '1px solid #1A5D4A',
                padding: '8px 16px',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  color: '#1A5D4A',
                  whiteSpace: 'nowrap',
                }}
              >
                Create Bundle
              </span>
            </button>

            {/* Button 2 - AI Suggested Bundles */}
            <button 
              onClick={() => handleViewChange('ai-suggested')}
              className="flex items-center justify-center hover:opacity-90 transition-opacity w-full sm:w-auto"
              style={{
                minWidth: '222px',
                height: '48px',
                borderRadius: '8px',
                padding: '8px 16px',
                background: 'linear-gradient(114.41deg, #007256 8.52%, #00A57D 91.48%)',
                border: 'none',
                cursor: 'pointer',
                gap: '8px',
              }}
            >
              <Image 
                src="/icons/si_ai-fill.svg"
                alt="AI"
                width={16}
                height={16}
              />
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                }}
              >
                AI Suggested Bundles
              </span>
            </button>
          </div>
        </header>
      ) : view === 'bundles' ? (
        <BundlesPageHeader onBackClick={() => handleViewChange('dashboard')} />
      ) : view === 'ai-suggested' ? (
        <AISuggestedPageHeader onBackClick={() => handleViewChange('dashboard')} />
      ) : null}

      {/* Main Content Area - Conditional */}
      {(view === 'dashboard' || view === 'bundles') && (
        <div className="flex-1 w-full">
          {/* Stats Container */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full"
            style={{
              gap: '16px',
              opacity: 1,
            }}
          >
          {/* Component 1 - Active Bundles */}
          <div
            className="w-full lg:w-auto"
            style={{
              minHeight: '149px',
              gap: '8px',
              borderRadius: '16px',
              border: '1px solid #F6F6F6',
              padding: '16px',
              background: '#FAFAFA',
              backdropFilter: 'blur(120px)',
              opacity: 1,
            }}
          >
            {/* Inner Container */}
            <div
              className="w-full"
              style={{
                minHeight: '117px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: 1,
              }}
            >
              {/* Top Row - Active Bundles & +12% */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {/* Active Bundles Text */}
                <div
                  style={{
                    width: '93px',
                    height: '20px',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0%',
                    color: '#1E1E1E',
                    opacity: 1,
                  }}
                >
                  Active Bundles
                </div>

                {/* +12% with Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Image 
                    src="/icons/increament.svg"
                    alt="increase"
                    width={12}
                    height={12}
                    style={{ opacity: 1 }}
                  />
                  <span
                    style={{
                      width: '36px',
                      height: '16px',
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      lineHeight: '16px',
                      letterSpacing: '0%',
                      color: '#00674E',
                      opacity: 1,
                    }}
                  >
                    +12%
                  </span>
                </div>
              </div>

              {/* Number 22 */}
              <div
                style={{
                  width: '26px',
                  height: '42px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 700,
                  fontSize: '22px',
                  lineHeight: '42px',
                  letterSpacing: '0%',
                  color: '#252430',
                  opacity: 1,
                }}
              >
                22
              </div>

              {/* Running campaigns */}
              <div
                style={{
                  width: '102px',
                  height: '24px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  textAlign: 'left',
                  color: '#787777',
                  opacity: 1,
                }}
              >
                Running campaigns
              </div>
            </div>
          </div>

          {/* Component 2 */}
          <div
            className="w-full lg:w-auto"
            style={{
              minHeight: '149px',
              gap: '8px',
              borderRadius: '16px',
              border: '1px solid #F6F6F6',
              padding: '16px',
              background: '#FAFAFA',
              backdropFilter: 'blur(120px)',
              opacity: 1,
            }}
          >
            <div
              className="w-full"
              style={{
                minHeight: '117px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '127px',
                    height: '20px',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0%',
                    color: '#1E1E1E',
                    opacity: 1,
                  }}
                >
                  average bundle
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Image 
                    src="/icons/increament.svg"
                    alt="increase"
                    width={12}
                    height={12}
                    style={{ opacity: 1 }}
                  />
                  <span
                    style={{
                      width: '36px',
                      height: '16px',
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      lineHeight: '16px',
                      letterSpacing: '0%',
                      color: '#00674E',
                      opacity: 1,
                    }}
                  >
                    +12%
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: '131px',
                  height: '42px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 600,
                  fontSize: '22px',
                  lineHeight: '42px',
                  letterSpacing: '0%',
                  color: '#252430',
                  opacity: 1,
                }}
              >
                +38,240 AED
              </div>

              <div
                style={{
                  width: '61px',
                  height: '24px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  textAlign: 'right',
                  color: '#787777',
                  opacity: 1,
                  alignSelf: 'flex-end',
                }}
              >
                This Month
              </div>
            </div>
          </div>

          {/* Component 3 */}
          <div
            className="w-full lg:w-auto"
            style={{
              minHeight: '149px',
              gap: '8px',
              borderRadius: '16px',
              border: '1px solid #F6F6F6',
              padding: '16px',
              background: '#FAFAFA',
              backdropFilter: 'blur(120px)',
              opacity: 1,
            }}
          >
            <div
              className="w-full"
              style={{
                minHeight: '117px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '139px',
                    height: '20px',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0%',
                    color: '#1E1E1E',
                    opacity: 1,
                  }}
                >
                  Revenue from Bundles
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Image 
                    src="/icons/increament.svg"
                    alt="increase"
                    width={12}
                    height={12}
                    style={{ opacity: 1 }}
                  />
                  <span
                    style={{
                      width: '36px',
                      height: '16px',
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      lineHeight: '16px',
                      letterSpacing: '0%',
                      color: '#00674E',
                      opacity: 1,
                    }}
                  >
                    +12%
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: '131px',
                  height: '42px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 600,
                  fontSize: '22px',
                  lineHeight: '42px',
                  letterSpacing: '0%',
                  color: '#252430',
                  opacity: 1,
                }}
              >
                +38,240 AED
              </div>

              <div
                style={{
                  width: '61px',
                  height: '24px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  textAlign: 'right',
                  color: '#787777',
                  opacity: 1,
                  alignSelf: 'flex-end',
                }}
              >
                This Month
              </div>
            </div>
          </div>

          {/* Component 4 */}
          <div
            className="w-full lg:w-auto"
            style={{
              minHeight: '149px',
              gap: '8px',
              borderRadius: '16px',
              border: '1px solid #F6F6F6',
              padding: '16px',
              background: '#FAFAFA',
              backdropFilter: 'blur(120px)',
              opacity: 1,
            }}
          >
            <div
              className="w-full"
              style={{
                minHeight: '117px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '119px',
                    height: '20px',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0%',
                    color: '#1E1E1E',
                    opacity: 1,
                  }}
                >
                  Slow-Moving Items
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Image 
                    src="/icons/increament.svg"
                    alt="increase"
                    width={12}
                    height={12}
                    style={{ opacity: 1 }}
                  />
                  <span
                    style={{
                      width: '36px',
                      height: '16px',
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      lineHeight: '16px',
                      letterSpacing: '0%',
                      color: '#00674E',
                      opacity: 1,
                    }}
                  >
                    +12%
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: '131px',
                  height: '42px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 600,
                  fontSize: '22px',
                  lineHeight: '42px',
                  letterSpacing: '0%',
                  color: '#252430',
                  opacity: 1,
                }}
              >
                5
              </div>

              <div
                style={{
                  width: '61px',
                  height: '24px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  textAlign: 'right',
                  color: '#787777',
                  opacity: 1,
                  alignSelf: 'flex-end',
                }}
              >
                This Week
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Content - Charts or Bundles */}
        {view === 'dashboard' ? (
          <>
        {/* Second Row Container */}
        <div
          className="flex flex-col lg:flex-row w-full"
          style={{
            gap: '16px',
            opacity: 1,
            marginTop: '30px',
          }}
        >
          {/* Component 1 - Weather Widget */}
          <div
            className="w-full lg:w-[363px]"
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Location & Temperature Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                {/* Dubai Marina Location Box */}
                <div style={{ 
                  width: '141px',
                  height: '33px',
                  gap: '8px',
                  borderRadius: '8px',
                  paddingTop: '8px',
                  paddingRight: '16px',
                  paddingBottom: '8px',
                  paddingLeft: '16px',
                  background: '#FFFFFF1A',
                  border: '1px solid rgba(217, 217, 217, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: 1,
                  marginBottom: '12px',
                }}>
                  <Image 
                    src="/icons/typcn_location.svg"
                    alt="location"
                    width={16}
                    height={16}
                    style={{ opacity: 1 }}
                  />
                  <span style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    opacity: 1,
                    whiteSpace: 'nowrap',
                  }}>
                    Dubai Marina
                  </span>
                </div>

                {/* Sunday + Date Box */}
                <div style={{ 
                  width: '159px',
                  height: '45px',
                  gap: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '72px',
                    height: '24px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '20px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    opacity: 1,
                  }}>
                    Sunday
                  </div>
                  <div style={{ 
                    width: '159px',
                    height: '17px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    opacity: 1,
                  }}>
                    04 Aug,2024
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                {/* Temperature Degree Box */}
                <div style={{ 
                  width: '56px',
                  height: '32px',
                  gap: '8px',
                  borderRadius: '8px',
                  paddingTop: '4px',
                  paddingRight: '8px',
                  paddingBottom: '4px',
                  paddingLeft: '8px',
                  background: '#FFFFFF1A',
                  border: '1px solid rgba(217, 217, 217, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 1,
                }}>
                  <span style={{ 
                    width: '24px',
                    height: '24px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#FFFFFF',
                    opacity: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    °C
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Temperature Display Box */}
                <div style={{ 
                  width: '59px',
                  height: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  opacity: 1,
                  marginTop: '28px',
                }}>
                  <div style={{ 
                    width: '59px',
                    height: '29px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '24px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    opacity: 1,
                    textAlign: 'right',
                  }}>
                    28°C
                  </div>
                  <div style={{ 
                    width: '59px',
                    height: '19px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'right',
                    color: '#B9B9B9',
                    opacity: 1,
                  }}>
                    /24°C
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Icon */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              flex: 1,
            }}>
              <Image 
                src="/icons/Rain cloud.svg"
                alt="rain cloud"
                width={117}
                height={112}
                style={{ 
                  opacity: 1,
                }}
              />
            </div>

            {/* Weather Description */}
            <div style={{ 
              width: '87px',
              height: '43px',
              gap: '7px',
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'flex-end',
              opacity: 1,
            }}>
              <div style={{ 
                width: '86px',
                height: '19px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#FFFFFF',
                opacity: 1,
              }}>
                Heavy Rain
              </div>
              <div style={{ 
                width: '87px',
                height: '17px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#FFFFFF',
                opacity: 1,
              }}>
                Feels like 31°
              </div>
            </div>
          </div>

          {/* Component 2 - Sales Graph */}
          <div
            className="w-full lg:w-[418px]"
            style={{
              height: '344px',
              borderRadius: '24px',
              border: '1px solid #EEEEEE',
              background: '#FFFFFF',
              opacity: 1,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Header Container */}
            <div style={{ 
              position: 'absolute',
              width: '203.59px',
              height: '57.5px',
              top: '27px',
              left: '23px',
              opacity: 1,
            }}>
              {/* Title */}
              <div style={{ 
                width: '201.59px',
                height: '17px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#1E1E1E',
                opacity: 1,
              }}>
                Sales & Upsell Performance
              </div>

              {/* Amount and Percentage Box */}
              <div style={{ 
                width: '184px',
                height: '32px',
                marginTop: '8.5px',
                gap: '6px',
                display: 'flex',
                alignItems: 'center',
                opacity: 1,
              }}>
                {/* Amount */}
                <div style={{ 
                  width: '132px',
                  height: '32px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '32px',
                  letterSpacing: '0px',
                  color: '#1E1E1E',
                  opacity: 1,
                }}>
                  AED 240.8K
                </div>

                {/* Percentage Badge */}
                <div style={{ 
                  width: '46px',
                  height: '18px',
                  borderRadius: '2px',
                  paddingTop: '2px',
                  paddingRight: '4px',
                  paddingBottom: '2px',
                  paddingLeft: '4px',
                  background: '#05C16833',
                  border: '0.6px solid #05C16833',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '2px',
                  opacity: 1,
                }}>
                  <span style={{ 
                    width: '28px',
                    height: '14px',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 500,
                    fontSize: '10px',
                    lineHeight: '14px',
                    letterSpacing: '0%',
                    color: '#14CA74',
                    opacity: 1,
                  }}>
                    24.6%
                  </span>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
                    <path d="M1 7L7 1M7 1H2M7 1V6" stroke="#14CA74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Legend Box - AI Suggested & Manual */}
            <div style={{ 
              position: 'absolute',
              width: '160.22px',
              height: '14px',
              top: '26.5px',
              left: '238.16px',
              display: 'flex',
              gap: '37.17px',
              opacity: 1,
            }}>
              {/* AI Suggested */}
              <div style={{ 
                height: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                opacity: 1,
              }}>
                <div style={{ 
                  width: '10px',
                  height: '10px',
                  background: '#00A57D',
                  borderRadius: '2px',
                  flexShrink: 0,
                }}></div>
                <span style={{ 
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '14px',
                  letterSpacing: '0%',
                  color: '#787777',
                  opacity: 1,
                  whiteSpace: 'nowrap',
                }}>
                  AI Suggested
                </span>
              </div>

              {/* Manual */}
              <div style={{ 
                width: '54px',
                height: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                opacity: 1,
              }}>
                <div style={{ 
                  width: '10px',
                  height: '10px',
                  background: '#1E1E1E',
                  borderRadius: '2px',
                }}></div>
                <span style={{ 
                  width: '40px',
                  height: '14px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '14px',
                  letterSpacing: '0%',
                  color: '#787777',
                  opacity: 1,
                }}>
                  Manual
                </span>
              </div>
            </div>

            {/* Graph */}
            <div style={{ 
              position: 'absolute',
              width: '375px',
              height: '224px',
              top: '78px',
              left: '25px',
              opacity: 1,
            }}>
              <Image 
                src="/icons/sales-graph.svg"
                alt="sales graph"
                width={375}
                height={224}
                style={{ opacity: 1 }}
              />
            </div>

            {/* Days Row */}
            <div style={{ 
              position: 'absolute',
              width: '373px',
              height: '14px',
              top: '310px',
              left: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              opacity: 1,
            }}>
              <div style={{ 
                width: '21px',
                height: '14px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#787777',
                opacity: 1,
              }}>Mon</div>
              <div style={{ 
                width: '21px',
                height: '14px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#787777',
                opacity: 1,
              }}>Tue</div>
              <div style={{ 
                width: '21px',
                height: '14px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#787777',
                opacity: 1,
              }}>Wed</div>
              <div style={{ 
                width: '21px',
                height: '14px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#787777',
                opacity: 1,
              }}>Thu</div>
              <div style={{ 
                width: '21px',
                height: '14px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#787777',
                opacity: 1,
              }}>Fri</div>
              <div style={{ 
                width: '21px',
                height: '14px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#787777',
                opacity: 1,
              }}>Sat</div>
              <div style={{ 
                width: '21px',
                height: '14px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#787777',
                opacity: 1,
              }}>Sun</div>
            </div>
          </div>

          {/* Component 3 - Brewly Suggestion */}
          <div
            className="w-full lg:w-[283px]"
            style={{
              height: '344px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '24px',
              paddingTop: '25px',
              paddingRight: '16px',
              paddingBottom: '25px',
              paddingLeft: '16px',
              background: 'linear-gradient(29.86deg, #011913 1.29%, #004534 98.71%)',
              opacity: 1,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ 
                width: '180px',
                height: '25px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 600,
                fontSize: '22px',
                lineHeight: '25px',
                letterSpacing: '0%',
                color: '#FFFFFF',
                opacity: 1,
              }}>
                Brewly Suggestion
              </div>
              <div 
                onClick={() => handleViewChange('bundles')}
                style={{ 
                  width: '42px',
                  height: '24px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  textAlign: 'right',
                  textDecoration: 'underline',
                  color: '#FFFFFF',
                  opacity: 1,
                  cursor: 'pointer',
                }}
              >
                View all
              </div>
            </div>

            {/* Product Images */}
            <div style={{ 
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
            }}>
              {/* Image Box 1 */}
              <div style={{ 
                width: '115px',
                height: '112px',
                gap: '8px',
                borderRadius: '8px',
                background: '#FFFFFF1A',
                border: '1px solid rgba(255,255,255,0.2)',
                paddingTop: '4px',
                paddingRight: '21px',
                paddingBottom: '4px',
                paddingLeft: '21px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 1,
              }}>
                <Image 
                  src="/icons/samplecofeeimage.svg"
                  alt="coffee"
                  width={65}
                  height={104}
                  style={{ opacity: 1 }}
                />
              </div>

              {/* Image Box 2 */}
              <div style={{ 
                width: '115px',
                height: '112px',
                gap: '8px',
                borderRadius: '8px',
                background: '#FFFFFF1A',
                border: '1px solid rgba(255,255,255,0.2)',
                paddingTop: '4px',
                paddingRight: '21px',
                paddingBottom: '4px',
                paddingLeft: '21px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 1,
              }}>
                <Image 
                  src="/icons/samplecofeeimage.svg"
                  alt="coffee"
                  width={65}
                  height={104}
                  style={{ opacity: 1 }}
                />
              </div>
            </div>

            {/* Description */}
            <div style={{ 
              width: '246px',
              height: '48px',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '0%',
              color: '#FFFFFF',
              opacity: 1,
              textAlign: 'center',
              alignSelf: 'center',
            }}>
              Warm up your rainy afternoon with this treat
            </div>

            {/* Button */}
            <button style={{ 
              width: '246px',
              height: '44px',
              gap: '8px',
              borderRadius: '8px',
              paddingTop: '8px',
              paddingRight: '16px',
              paddingBottom: '8px',
              paddingLeft: '16px',
              background: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              opacity: 1,
              alignSelf: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ 
                width: '49px',
                height: '20px',
                fontFamily: 'Geist, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#00674E',
                opacity: 1,
              }}>
                Go Live
              </span>
            </button>
          </div>
        </div>

        {/* Third Row Container */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 w-full"
          style={{
            gap: '16px',
            opacity: 1,
            marginTop: '20px',
          }}
        >
          {/* Component 1 - Upcoming Events */}
          <div
            className="lg:col-span-4 w-full"
            style={{
              minHeight: '250px',
              gap: '8px',
              borderRadius: '24px',
              border: '1px solid #EEEEEE',
              paddingTop: '24px',
              paddingRight: '16px',
              paddingBottom: '24px',
              paddingLeft: '16px',
              opacity: 1,
              background: '#FFFFFF',
            }}
          >
            {/* Header */}
            <div 
              className="w-full"
              style={{ 
                height: '34px',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '16px',
                opacity: 1,
              }}>
              <div style={{
                width: '129px',
                height: '17px',
                gap: '12px',
                opacity: 1,
              }}>
                <h3 style={{ 
                  width: '129px',
                  height: '17px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#1E1E1E',
                  margin: 0,
                  opacity: 1,
                }}>
                  Upcomming events
                </h3>
              </div>
              <div style={{ 
                width: '63px',
                height: '34px',
                gap: '8px',
                borderRadius: '8px',
                paddingTop: '10px',
                paddingRight: '12px',
                paddingBottom: '10px',
                paddingLeft: '12px',
                background: '#FFFFFF',
                opacity: 1,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ 
                  width: '39px',
                  height: '18px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '12px',
                  lineHeight: '100%',
                  letterSpacing: '-1%',
                  color: '#00674E',
                  opacity: 1,
                  whiteSpace: 'nowrap',
                }}>
                  See all
                </span>
              </div>
            </div>

            {/* Events List */}
            <div style={{ 
              width: '315px',
              height: '156px',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              opacity: 1,
            }}>
              {/* Event 1 */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ 
                  width: '50px',
                  height: '44px',
                  background: '#1E2124',
                  borderRadius: '10px',
                  border: '1px solid',
                  borderImage: 'linear-gradient(180deg, #3C4C5C 0%, #7FA0C2 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '18px',
                    height: '20px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '16px',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    textTransform: 'uppercase',
                    opacity: 1,
                  }}>10</div>
                  <div style={{ 
                    width: '24px',
                    height: '12px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '10px',
                    lineHeight: '12px',
                    letterSpacing: '0px',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    textTransform: 'capitalize',
                    opacity: 1,
                  }}>June</div>
                </div>
                <div style={{
                  width: '121px',
                  height: '42px',
                  gap: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '121px',
                    height: '21px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#1E1E1E',
                    opacity: 1,
                    whiteSpace: 'nowrap',
                  }}>Winter Music Fest</div>
                  <div style={{ 
                    width: '100px',
                    height: '17px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '11px',
                    lineHeight: '100%',
                    letterSpacing: '-1%',
                    color: '#787777',
                    opacity: 1,
                    whiteSpace: 'nowrap',
                  }}>Promote hot lattes</div>
                </div>
              </div>

              {/* Event 2 */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ 
                  width: '50px',
                  height: '44px',
                  background: '#1E2124',
                  borderRadius: '10px',
                  border: '1px solid',
                  borderImage: 'linear-gradient(180deg, #3C4C5C 0%, #7FA0C2 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '18px',
                    height: '20px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '16px',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    textTransform: 'uppercase',
                    opacity: 1,
                  }}>10</div>
                  <div style={{ 
                    width: '24px',
                    height: '12px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '10px',
                    lineHeight: '12px',
                    letterSpacing: '0px',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    textTransform: 'capitalize',
                    opacity: 1,
                  }}>June</div>
                </div>
                <div style={{
                  width: '121px',
                  height: '42px',
                  gap: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '121px',
                    height: '21px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#1E1E1E',
                    opacity: 1,
                    whiteSpace: 'nowrap',
                  }}>Winter Music Fest</div>
                  <div style={{ 
                    width: '100px',
                    height: '17px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '11px',
                    lineHeight: '100%',
                    letterSpacing: '-1%',
                    color: '#787777',
                    opacity: 1,
                    whiteSpace: 'nowrap',
                  }}>Promote hot lattes</div>
                </div>
              </div>

              {/* Event 3 */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ 
                  width: '50px',
                  height: '44px',
                  background: '#1E2124',
                  borderRadius: '10px',
                  border: '1px solid',
                  borderImage: 'linear-gradient(180deg, #3C4C5C 0%, #7FA0C2 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '18px',
                    height: '20px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '16px',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    textTransform: 'uppercase',
                    opacity: 1,
                  }}>10</div>
                  <div style={{ 
                    width: '24px',
                    height: '12px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '10px',
                    lineHeight: '12px',
                    letterSpacing: '0px',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    textTransform: 'capitalize',
                    opacity: 1,
                  }}>June</div>
                </div>
                <div style={{
                  width: '121px',
                  height: '42px',
                  gap: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '121px',
                    height: '21px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#1E1E1E',
                    opacity: 1,
                    whiteSpace: 'nowrap',
                  }}>Winter Music Fest</div>
                  <div style={{ 
                    width: '100px',
                    height: '17px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '11px',
                    lineHeight: '100%',
                    letterSpacing: '-1%',
                    color: '#787777',
                    opacity: 1,
                    whiteSpace: 'nowrap',
                  }}>Promote hot lattes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Component 2 - Average Outcome */}
          <div
            className="lg:col-span-4 w-full"
            style={{
              minHeight: '250px',
              borderRadius: '16px',
              border: '1px solid #EEEEEE',
              padding: '16px',
              background: '#FFFFFF',
              opacity: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div 
              className="w-full"
              style={{
                height: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: 1,
                marginBottom: '16px',
              }}>
              <h3 style={{ 
                width: '109px',
                height: '17px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#1E1E1E',
                margin: 0,
                opacity: 1,
              }}>
                Average outcome
              </h3>
              
              <div style={{ 
                width: '46px',
                height: '18px',
                borderRadius: '2px',
                paddingTop: '2px',
                paddingRight: '4px',
                paddingBottom: '2px',
                paddingLeft: '4px',
                background: '#05C16833',
                border: '0.6px solid #05C16833',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                opacity: 1,
              }}>
                <span style={{ 
                  width: '28px',
                  height: '14px',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 500,
                  fontSize: '10px',
                  lineHeight: '14px',
                  letterSpacing: '0%',
                  color: '#14CA74',
                  opacity: 1,
                }}>
                  24.6%
                </span>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1, flexShrink: 0 }}>
                  <path d="M1 7L7 1M7 1H2M7 1V6" stroke="#14CA74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Donut Chart */}
            <div 
              className="w-full max-w-[318px]"
              style={{ 
                height: '180px',
                position: 'relative',
                margin: '0 auto',
                marginTop: '-20px',
              }}>
              {/* Donut Chart using Conic Gradient */}
              <div 
                className="mx-auto"
                style={{
                  width: '164px',
                  height: '164px',
                  position: 'absolute',
                  top: '0px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: '50%',
                  background: 'conic-gradient(from -90deg, white 0deg 2deg, #FF6961 2deg 138deg, white 138deg 140deg, #FF2311 140deg 235deg, white 235deg 237deg, #28CD41 237deg 320deg, white 320deg 322deg, #6AC4DC 322deg 358deg, white 358deg 360deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* White Center Circle */}
                <div style={{
                  width: '126px',
                  height: '126px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {/* Center Text */}
                  <div style={{
                    width: '77px',
                    height: '45px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 1,
                  }}>
                    <div style={{ 
                      width: '77px',
                      height: '22px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      fontSize: '22px',
                      lineHeight: '22px',
                      letterSpacing: '-1%',
                      textAlign: 'center',
                      color: '#1E1E1E',
                      opacity: 1,
                    }}>180</div>
                    <div style={{ 
                      width: '77px',
                      height: '21px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '14px',
                      lineHeight: '100%',
                      letterSpacing: '-1%',
                      textAlign: 'center',
                      color: '#787777',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                    }}>Total Order</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div 
              className="w-full max-w-[320px] flex-wrap justify-center"
              style={{ 
                height: 'auto',
                minHeight: '34px',
                display: 'flex', 
                gap: '24px', 
                marginTop: '16px',
                opacity: 1,
              }}>
              {/* Afternoon */}
              <div style={{ 
                width: '83.68502044677734px',
                height: '34px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                opacity: 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#28CD41', borderRadius: '2px', flexShrink: 0 }}></div>
                  <span style={{ 
                    width: '66.12154388427734px',
                    height: '12px',
                    fontFamily: 'Poppins, sans-serif', 
                    fontWeight: 500, 
                    fontSize: '12px', 
                    lineHeight: '12px',
                    letterSpacing: '0.5px',
                    color: '#121212',
                    opacity: 0.7,
                    whiteSpace: 'nowrap',
                  }}>Afternoon</span>
                </div>
                <span style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontWeight: 500, 
                  fontSize: '12px', 
                  lineHeight: '12px',
                  letterSpacing: '0.5px',
                  color: '#787777',
                  opacity: 0.7,
                }}>40%</span>
              </div>

              {/* Morning */}
              <div style={{ 
                width: '83.68502044677734px',
                height: '34px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                opacity: 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#FF2311', borderRadius: '2px', flexShrink: 0 }}></div>
                  <span style={{ 
                    width: '66.12154388427734px',
                    height: '12px',
                    fontFamily: 'Poppins, sans-serif', 
                    fontWeight: 500, 
                    fontSize: '12px', 
                    lineHeight: '12px',
                    letterSpacing: '0.5px',
                    color: '#121212',
                    opacity: 0.7,
                    whiteSpace: 'nowrap',
                  }}>Morning</span>
                </div>
                <span style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontWeight: 500, 
                  fontSize: '12px', 
                  lineHeight: '12px',
                  letterSpacing: '0.5px',
                  color: '#787777',
                  opacity: 0.7,
                }}>28%</span>
              </div>

              {/* Evening */}
              <div style={{ 
                width: '83.68502044677734px',
                height: '34px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                opacity: 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#6AC4DC', borderRadius: '2px', flexShrink: 0 }}></div>
                  <span style={{ 
                    width: '66.12154388427734px',
                    height: '12px',
                    fontFamily: 'Poppins, sans-serif', 
                    fontWeight: 500, 
                    fontSize: '12px', 
                    lineHeight: '12px',
                    letterSpacing: '0.5px',
                    color: '#121212',
                    opacity: 0.7,
                    whiteSpace: 'nowrap',
                  }}>Evening</span>
                </div>
                <span style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontWeight: 500, 
                  fontSize: '12px', 
                  lineHeight: '12px',
                  letterSpacing: '0.5px',
                  color: '#787777',
                  opacity: 0.7,
                }}>32%</span>
              </div>
            </div>
          </div>

          {/* Component 3 - Performance by Type */}
          <div
            className="w-full lg:w-[350px]"
            style={{
              minHeight: '250px',
              gap: '8px',
              borderRadius: '16px',
              border: '1px solid #EEEEEE',
              padding: '16px',
              background: '#FFFFFF',
              opacity: 1,
            }}
          >
            <div 
              style={{
                width: '318px',
                height: '222px',
                gap: '13px',
                display: 'flex',
                flexDirection: 'column',
                opacity: 1,
              }}>
              <h3 style={{ 
                width: '318px',
                height: '17px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#1E1E1E',
                margin: 0,
                opacity: 1,
              }}>
                Performance by Type
              </h3>

              {/* Progress Bars Container */}
              <div style={{ 
                width: '318px',
                height: '192px',
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                opacity: 1,
              }}>
                {/* AI Bundles */}
                <div style={{
                  width: '318px',
                  height: '36px',
                  gap: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '317px',
                    height: '18px',
                    display: 'flex', 
                    justifyContent: 'space-between',
                    opacity: 1,
                  }}>
                    <span style={{ 
                      width: '62px',
                      height: '18px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      fontSize: '12px',
                      lineHeight: '100%',
                      letterSpacing: '-1%',
                      color: '#1E1E1E',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                    }}>AI Bundles</span>
                    <span style={{ 
                      width: '143px',
                      height: '17px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '11px',
                      lineHeight: '100%',
                      letterSpacing: '-1%',
                      color: '#787777',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                    }}>Smart automated promos</span>
                  </div>
                  <div style={{ 
                    width: '318px',
                    height: '8px',
                    borderRadius: '8px',
                    background: '#E5E5EA',
                    position: 'relative',
                    opacity: 1,
                  }}>
                    <div style={{ 
                      width: '114.4800033569336px',
                      height: '10px',
                      position: 'absolute',
                      top: '-1px',
                      left: 0,
                      borderRadius: '8px',
                      background: '#FF6961',
                      opacity: 1,
                    }}></div>
                  </div>
                </div>

                {/* Manual */}
                <div style={{
                  width: '318px',
                  height: '36px',
                  gap: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '317px',
                    height: '18px',
                    display: 'flex', 
                    justifyContent: 'space-between',
                    opacity: 1,
                  }}>
                    <span style={{ 
                      width: '62px',
                      height: '18px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      fontSize: '12px',
                      lineHeight: '100%',
                      letterSpacing: '-1%',
                      color: '#1E1E1E',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                    }}>Manual</span>
                    <span style={{ 
                      width: '143px',
                      height: '17px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '11px',
                      lineHeight: '100%',
                      letterSpacing: '-1%',
                      color: '#787777',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                    }}>Manager-crafted deals</span>
                  </div>
                  <div style={{ 
                    width: '318px',
                    height: '8px',
                    borderRadius: '8px',
                    background: '#E5E5EA',
                    position: 'relative',
                    opacity: 1,
                  }}>
                    <div style={{ 
                      width: '170px',
                      height: '10px',
                      position: 'absolute',
                      top: '-1px',
                      left: 0,
                      borderRadius: '8px',
                      background: '#409CFF',
                      opacity: 1,
                    }}></div>
                  </div>
                </div>

                {/* Event */}
                <div style={{
                  width: '318px',
                  height: '36px',
                  gap: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '317px',
                    height: '18px',
                    display: 'flex', 
                    justifyContent: 'space-between',
                    opacity: 1,
                  }}>
                    <span style={{ 
                      width: '62px',
                      height: '18px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      fontSize: '12px',
                      lineHeight: '100%',
                      letterSpacing: '-1%',
                      color: '#1E1E1E',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                    }}>Event</span>
                    <span style={{ 
                      width: '143px',
                      height: '17px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '11px',
                      lineHeight: '100%',
                      letterSpacing: '-1%',
                      color: '#787777',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                    }}>Occasion-based offers</span>
                  </div>
                  <div style={{ 
                    width: '318px',
                    height: '8px',
                    borderRadius: '8px',
                    background: '#E5E5EA',
                    position: 'relative',
                    opacity: 1,
                  }}>
                    <div style={{ 
                      width: '247px',
                      height: '10px',
                      position: 'absolute',
                      top: '-1px',
                      left: 0,
                      borderRadius: '8px',
                      background: '#FF2311',
                      opacity: 1,
                    }}></div>
                  </div>
                </div>

                {/* Expiry */}
                <div style={{
                  width: '318px',
                  height: '36px',
                  gap: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 1,
                }}>
                  <div style={{ 
                    width: '317px',
                    height: '18px',
                    display: 'flex', 
                    justifyContent: 'space-between',
                    opacity: 1,
                  }}>
                    <span style={{ 
                      width: '62px',
                      height: '18px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      fontSize: '12px',
                      lineHeight: '100%',
                      letterSpacing: '-1%',
                      color: '#1E1E1E',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                    }}>Expiry</span>
                    <span style={{ 
                      width: '143px',
                      height: '17px',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '11px',
                      lineHeight: '100%',
                      letterSpacing: '-1%',
                      color: '#787777',
                      opacity: 1,
                      whiteSpace: 'nowrap',
                    }}>Clear stock fast</span>
                  </div>
                  <div style={{ 
                    width: '318px',
                    height: '8px',
                    borderRadius: '8px',
                    background: '#E5E5EA',
                    position: 'relative',
                    opacity: 1,
                  }}>
                    <div style={{ 
                      width: '114.4800033569336px',
                      height: '10px',
                      position: 'absolute',
                      top: '-1px',
                      left: 0,
                      borderRadius: '8px',
                      background: '#6AC4DC',
                      opacity: 1,
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        ) : view === 'bundles' ? (
          <BundlesSection />
        ) : null}
        
      </div>
      )}

      {view === 'ai-suggested' && (
        <div className="flex-1 w-full">
          <AISuggestedSection />
        </div>
      )}
    </div>
  );
}
