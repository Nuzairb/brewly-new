'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ isCollapsed = true, onCollapsedChange }: SidebarProps = {}) {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveIcon = () => {
    if (pathname === '/dashboard') return 'home';
    if (pathname === '/bundles' || pathname === '/bundles/all') return 'bundle';
    if (pathname === '/bundles-dashboard') return 'bundle';
    if (pathname === '/ai-suggested') return 'ai-suggested';
    if (pathname === '/Events') return 'calendar';
    if (pathname === '/setting') return 'settings';
    if (pathname === '/promo') return 'promo';
    return 'home';
  };

  const activeIcon = getActiveIcon();

  const handleHomeClick = () => {
    router.push('/dashboard');
  };

  const handleBundleClick = () => {
    router.push('/bundles-dashboard');
  };

  const handleAIClick = () => {
    router.push('/ai-suggested');
  };

  const handleEventsClick = () => {
    router.push('/Events');
  };

  const handleSettingsClick = () => {
    router.push('/setting');
  };

  const handlePromoClick = () => {
    router.push('/promo');
  };

  const toggleSidebar = () => {
    onCollapsedChange?.(!isCollapsed);
  };


  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside
        className={`hidden lg:flex flex-col items-center bg-white border border-[#E5E5E5] rounded-r-2xl pt-6 pb-6 gap-2 fixed left-0 top-0 h-screen z-40 transition-all duration-300 ${isCollapsed ? 'w-[68px]' : 'w-[256px]'}`}
      >
        {/* Upper Container */}
        <div className={`w-full flex flex-col gap-8 ${isCollapsed ? 'items-center px-3' : 'items-start px-5'}`}>
          {/* Logo and Hamburger Menu */}
          <div className="w-full flex justify-between items-center">
            {/* Logo */}
            <div className={`flex items-center gap-3 ${isCollapsed ? 'cursor-pointer' : ''}`} onClick={isCollapsed ? toggleSidebar : undefined}>
              <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg`} alt="Brewly Logo" width={42} height={42} />
              {!isCollapsed && (
                <span className="font-lato text-[20px] font-semibold text-[#1E1E1E] tracking-tight">Brewly</span>
              )}
            </div>
            {/* Hamburger Menu Button */}
            {!isCollapsed && (
              <button
                onClick={toggleSidebar}
                className="bg-transparent border-none cursor-pointer p-2 flex flex-col gap-1 items-center justify-center"
              >
                <div className="w-[18px] h-[2px] bg-[#1E1E1E] rounded" />
                <div className="w-[18px] h-[2px] bg-[#1E1E1E] rounded" />
                <div className="w-[18px] h-[2px] bg-[#1E1E1E] rounded" />
              </button>
            )}
          </div>
          {/* Icon Buttons Container */}
          <div className="flex flex-col gap-4 w-full items-center lg:items-stretch">
            {/* Home Icon */}
            <button
              onClick={handleHomeClick}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] ${activeIcon === 'home' ? 'bg-[#E8F5E9]' : 'bg-transparent'} hover:bg-[#F5F5F5]`}
            >
              <Image 
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/home.svg`} 
                alt="home" 
                width={20} 
                height={20}
              />
              {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Home</span>}
            </button>
            {/* Bundle Icon */}
            <button
              onClick={handleBundleClick}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] ${activeIcon === 'bundle' ? 'bg-[#E8F5E9]' : 'bg-transparent'} hover:bg-[#F5F5F5]`}
            >
              <Image 
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/bundle.svg`} 
                alt="bundle" 
                width={20} 
                height={20}
              />
              {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Bundles</span>}
            </button>
            {/* AI Suggested Icon */}
            <button
              onClick={handleAIClick}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] ${activeIcon === 'ai-suggested' ? 'bg-[#E8F5E9]' : 'bg-transparent'} hover:bg-[#F5F5F5]`}
            >
              <Image 
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/ai-magic.svg`} 
                alt="ai-magic" 
                width={20} 
                height={20}
              />
              {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">AI Suggested</span>}
            </button>
            {/* Events Icon */}
            <button
              onClick={handleEventsClick}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] ${activeIcon === 'calendar' ? 'bg-[#E8F5E9]' : 'bg-transparent'} hover:bg-[#F5F5F5]`}
            >
              <Image 
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/calender.svg`} 
                alt="calendar" 
                width={20} 
                height={20}
              />
              {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Events</span>}
            </button>
            {/* Settings Icon */}
            <button
              onClick={handleSettingsClick}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] ${activeIcon === 'settings' ? 'bg-[#E8F5E9]' : 'bg-transparent'} hover:bg-[#F5F5F5]`}
            >
              <Image 
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/setting.svg`} 
                alt="settings" 
                width={20} 
                height={20}
              />
              {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Settings</span>}
            </button>
          </div>
        </div>
        {/* Lower Container */}
        <div className={`flex flex-col gap-4 mt-auto w-full ${isCollapsed ? 'items-center px-3' : 'items-stretch px-5'}`}>
          {/* Support Button */}
          <button
            className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] bg-transparent hover:bg-[#F5F5F5]`}
          >
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/help-circle.svg`} 
              alt="help" 
              width={20} 
              height={20}
            />
            {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Support</span>}
          </button>
          {/* Logout Button */}
          <button
            className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] bg-transparent hover:bg-[#F5F5F5]`}
          >
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/material-symbols_logout-rounded.svg`} 
              alt="logout" 
              width={20} 
              height={20}
            />
            {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Logout</span>}
          </button>
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
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/home.svg`} 
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
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/bundle.svg`} 
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
            onClick={handlePromoClick}
          >
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/Vector.svg`} 
              alt="promo" 
              width={20} 
              height={20}
              className="w-5 h-5"
            />
          </Button>
          {/* Insights */}
          <Button
            variant={activeIcon === 'ai-suggested' ? 'sidebarMobileActive' : 'sidebarMobile'}
            size="sidebar-mobile"
            onClick={handleAIClick}
          >
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/ai-magic.svg`} 
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
            onClick={handleSettingsClick}
          >
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/setting.svg`} 
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