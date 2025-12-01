'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onNavigate?: (view: 'dashboard' | 'bundles' | 'ai-suggested') => void;
}

export function Sidebar({ onNavigate }: SidebarProps = {}) {
  const [activeIcon, setActiveIcon] = useState('home');

  const handleHomeClick = () => {
    setActiveIcon('home');
    onNavigate?.('dashboard');
  };

  const handleBundleClick = () => {
    setActiveIcon('bundle');
    onNavigate?.('bundles');
  };

  const handleAIClick = () => {
    setActiveIcon('sparkle');
    onNavigate?.('ai-suggested');
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside
        className="
          hidden lg:flex
          w-[120px] h-full flex-col items-center bg-white 
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
            <Button
              variant={activeIcon === 'home' ? 'sidebarActive' : 'sidebar'}
              size="sidebar-desktop"
              onClick={handleHomeClick}
            >
              <Image 
                src="/icons/home.svg" 
                alt="home" 
                width={20} 
                height={20}
                className="w-full h-full"
              />
            </Button>

            {/* Bundle Icon */}
            <Button
              variant={activeIcon === 'bundle' ? 'sidebarActive' : 'sidebar'}
              size="sidebar-desktop"
              onClick={handleBundleClick}
            >
              <Image 
                src="/icons/bundle.svg" 
                alt="bundle" 
                width={20} 
                height={20}
                className="w-full h-full"
              />
            </Button>

            {/* Sparkle Icon */}
            <Button
              variant={activeIcon === 'sparkle' ? 'sidebarActive' : 'sidebar'}
              size="sidebar-desktop"
              onClick={handleAIClick}
            >
              <Image 
                src="/icons/ai-magic.svg" 
                alt="ai-magic" 
                width={20} 
                height={20}
                className="w-full h-full"
              />
            </Button>

            {/* Calendar Icon */}
            <Button
              variant={activeIcon === 'calendar' ? 'sidebarActive' : 'sidebar'}
              size="sidebar-desktop"
              onClick={() => setActiveIcon('calendar')}
            >
              <Image 
                src="/icons/calender.svg" 
                alt="calendar" 
                width={20} 
                height={20}
                className="w-full h-full"
              />
            </Button>

            {/* Settings Icon */}
            <Button
              variant={activeIcon === 'settings' ? 'sidebarActive' : 'sidebar'}
              size="sidebar-desktop"
              onClick={() => setActiveIcon('settings')}
            >
              <Image 
                src="/icons/setting.svg" 
                alt="settings" 
                width={20} 
                height={20}
                className="w-full h-full"
              />
            </Button>
          </div>
        </div>

        {/* Lower Container */}
        <div className="flex flex-col items-center justify-between w-[52px] h-[100px] opacity-100">
          {/* Help Button */}
          <Button
            variant="sidebarHelp"
            size="sidebar-help"
          >
            <Image 
              src="/icons/help-circle.svg" 
              alt="help" 
              width={20.5} 
              height={20.5}
            />
          </Button>

          {/* Logout Button */}
          <Button
            variant="sidebarHelp"
            size="sidebar-help"
          >
            <Image 
              src="/icons/material-symbols_logout-rounded.svg" 
              alt="logout" 
              width={20.5} 
              height={20.5}
            />
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] z-50">
        <div className="flex justify-around items-center h-16 px-4">
          {/* Home */}
          <Button
            variant={activeIcon === 'home' ? 'sidebarMobileActive' : 'sidebarMobile'}
            size="sidebar-mobile"
            onClick={handleHomeClick}
          >
            <Image 
              src="/icons/home.svg" 
              alt="home" 
              width={20} 
              height={20}
              className="w-5 h-5"
            />
          </Button>

          {/* Bundle */}
          <Button
            variant={activeIcon === 'bundle' ? 'sidebarMobileActive' : 'sidebarMobile'}
            size="sidebar-mobile"
            onClick={handleBundleClick}
          >
            <Image 
              src="/icons/bundle.svg" 
              alt="bundle" 
              width={20} 
              height={20}
              className="w-5 h-5"
            />
          </Button>

          {/* Promo */}
          <Button
            variant={activeIcon === 'promo' ? 'sidebarMobileActive' : 'sidebarMobile'}
            size="sidebar-mobile"
            onClick={() => setActiveIcon('promo')}
          >
            <Image 
              src="/icons/Vector.svg" 
              alt="promo" 
              width={20} 
              height={20}
              className="w-5 h-5"
            />
          </Button>

          {/* Insights */}
          <Button
            variant={activeIcon === 'insights' ? 'sidebarMobileActive' : 'sidebarMobile'}
            size="sidebar-mobile"
            onClick={handleAIClick}
          >
            <Image 
              src="/icons/ai-magic.svg" 
              alt="insights" 
              width={20} 
              height={20}
              className="w-5 h-5"
            />
          </Button>

          {/* Settings */}
          <Button
            variant={activeIcon === 'settings' ? 'sidebarMobileActive' : 'sidebarMobile'}
            size="sidebar-mobile"
            onClick={() => setActiveIcon('settings')}
          >
            <Image 
              src="/icons/setting.svg" 
              alt="settings" 
              width={20} 
              height={20}
              className="w-5 h-5"
            />
          </Button>
        </div>
      </nav>
    </>
  );
}