'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SidebarProps {
  onNavigate?: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void;
}

export function Sidebar({ onNavigate }: SidebarProps = {}) {
  const [activeIcon, setActiveIcon] = useState('home');

  const handleHomeClick = () => {
    setActiveIcon('home');
    onNavigate?.('dashboard');
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside
        className="
          hidden lg:flex
          w-[120px] h-[800px] flex-col items-center bg-white 
          border border-[#E5E5E5] rounded-r-[16px] 
          pt-6 pr-[17.75px] pb-6 pl-[17.75px] gap-2 
        "
      >
      {/* Upper Container */}
      <div className="w-[52px] h-[649px] flex flex-col gap-8 items-center">
        {/* Logo */}
        <div className="w-[62px] h-[62px]">
          <Image 
            src="/logo.svg" 
            alt="logo" 
            width={62} 
            height={62} 
          />
        </div>

        {/* Icon Buttons Container */}
        <div className="flex flex-col gap-4 items-center">
          {/* Home Icon */}
          <button 
            onClick={handleHomeClick}
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              background: activeIcon === 'home' ? '#00674E1A' : 'transparent',
              width: '52px',
              height: '53px',
              padding: '16px',
            }}
          >
            <Image 
              src="/icons/home.svg" 
              alt="home" 
              width={20} 
              height={20}
              className="w-full h-full"
            />
          </button>

          {/* Bundle Icon */}
          <button 
            onClick={() => setActiveIcon('bundle')}
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              background: activeIcon === 'bundle' ? '#00674E1A' : 'transparent',
              width: '52px',
              height: '53px',
              padding: '16px',
            }}
          >
            <Image 
              src="/icons/bundle.svg" 
              alt="bundle" 
              width={20} 
              height={20}
              className="w-full h-full"
            />
          </button>

          {/* Sparkle Icon */}
          <button 
            onClick={() => setActiveIcon('sparkle')}
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              background: activeIcon === 'sparkle' ? '#00674E1A' : 'transparent',
              width: '52px',
              height: '53px',
              padding: '16px',
            }}
          >
            <Image 
              src="/icons/sparkle.svg" 
              alt="sparkle" 
              width={20} 
              height={20}
              className="w-full h-full"
            />
          </button>

          {/* Calendar Icon */}
          <button 
            onClick={() => setActiveIcon('calendar')}
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              background: activeIcon === 'calendar' ? '#00674E1A' : 'transparent',
              width: '52px',
              height: '53px',
              padding: '16px',
            }}
          >
            <Image 
              src="/icons/calender.svg" 
              alt="calendar" 
              width={20} 
              height={20}
              className="w-full h-full"
            />
          </button>

          {/* Settings Icon */}
          <button 
            onClick={() => setActiveIcon('settings')}
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              background: activeIcon === 'settings' ? '#00674E1A' : 'transparent',
              width: '52px',
              height: '53px',
              padding: '16px',
            }}
          >
            <Image 
              src="/icons/setting.svg" 
              alt="settings" 
              width={20} 
              height={20}
              className="w-full h-full"
            />
          </button>
        </div>
      </div>

      {/* Lower Container */}
      <div 
        className="flex flex-col items-center justify-between"
        style={{
          width: '52px',
          height: '100px',
          opacity: 1,
        }}
      >
        {/* Help Button */}
        <button 
          className="flex items-center justify-center transition-all"
          style={{
            width: '20.5px',
            height: '20.5px',
            opacity: 1,
          }}
        >
          <Image 
            src="/icons/help-circle.svg" 
            alt="help" 
            width={20.5} 
            height={20.5}
          />
        </button>

        {/* Logout Button */}
        <button 
          className="flex items-center justify-center transition-all"
          style={{
            width: '20.5px',
            height: '20.5px',
            opacity: 1,
          }}
        >
          <Image 
            src="/icons/material-symbols_logout-rounded.svg" 
            alt="logout" 
            width={20.5} 
            height={20.5}
          />
        </button>
      </div>
    </aside>

    {/* Mobile Bottom Navigation - Hidden on desktop */}
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {/* Home */}
        <button 
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center gap-1 transition-all"
        >
          <div 
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              background: activeIcon === 'home' ? '#00674E1A' : 'transparent',
              width: '40px',
              height: '40px',
              padding: '10px',
            }}
          >
            <Image 
              src="/icons/home.svg" 
              alt="home" 
              width={20} 
              height={20}
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        </button>

        {/* Bundle */}
        <button 
          onClick={() => setActiveIcon('bundle')}
          className="flex flex-col items-center justify-center gap-1 transition-all"
        >
          <div 
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              background: activeIcon === 'bundle' ? '#00674E1A' : 'transparent',
              width: '40px',
              height: '40px',
              padding: '10px',
            }}
          >
            <Image 
              src="/icons/bundle.svg" 
              alt="bundle" 
              width={20} 
              height={20}
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        </button>

        {/* Promo */}
        <button 
          onClick={() => setActiveIcon('promo')}
          className="flex flex-col items-center justify-center gap-1 transition-all"
        >
          <div 
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              background: activeIcon === 'promo' ? '#00674E1A' : 'transparent',
              width: '40px',
              height: '40px',
              padding: '10px',
            }}
          >
            <Image 
              src="/icons/Vector.svg" 
              alt="promo" 
              width={20} 
              height={20}
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        </button>

        {/* Insights */}
        <button 
          onClick={() => setActiveIcon('insights')}
          className="flex flex-col items-center justify-center gap-1 transition-all"
        >
          <div 
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              background: activeIcon === 'insights' ? '#00674E1A' : 'transparent',
              width: '40px',
              height: '40px',
              padding: '10px',
            }}
          >
            <Image 
              src="/icons/sparkle.svg" 
              alt="insights" 
              width={20} 
              height={20}
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        </button>

        {/* Settings */}
        <button 
          onClick={() => setActiveIcon('settings')}
          className="flex flex-col items-center justify-center gap-1 transition-all"
        >
          <div 
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              background: activeIcon === 'settings' ? '#00674E1A' : 'transparent',
              width: '40px',
              height: '40px',
              padding: '10px',
            }}
          >
            <Image 
              src="/icons/setting.svg" 
              alt="settings" 
              width={20} 
              height={20}
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        </button>
      </div>
    </nav>
    </>
  );
}
