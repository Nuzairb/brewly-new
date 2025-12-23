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

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  const getActiveIcon = () => {
    if (pathname === '/dashboard') return 'home';
    if (pathname && pathname.startsWith('/bundles-dashboard')) return 'bundle';
    if (pathname === '/bundles' || pathname === '/bundles/all') return 'bundle';
    if (pathname === '/ai-suggested') return 'ai-suggested';
    if (pathname === '/orders' || pathname?.startsWith('/orders')) return 'orders';
    if (pathname === '/Events') return 'calendar';
    if (pathname === '/setting') return 'settings';
    if (pathname === '/promo') return 'promo';
    return 'home';
  };

  const activeIcon = getActiveIcon();

  const handleHomeClick = () => {
    console.log('[Sidebar] Home clicked - pathname:', window.location.pathname);
    router.push('/dashboard');
  };

  const handleBundleClick = () => {
    console.log('[Sidebar] Bundles clicked - pathname:', window.location.pathname);
    router.push('/bundles-dashboard');
  };

  const handleAIClick = () => {
    console.log('[Sidebar] AI clicked - pathname:', window.location.pathname);
    router.push('/ai-suggested');
  };

  const handleEventsClick = () => {
    console.log('[Sidebar] Events clicked - pathname:', window.location.pathname);
    router.push('/Events');
  };

  const handleSettingsClick = () => {
    console.log('[Sidebar] Settings clicked - pathname:', window.location.pathname);
    router.push('/setting');
  };

  const handlePromoClick = () => {
    console.log('[Sidebar] Promo clicked - pathname:', window.location.pathname);
    router.push('/promo');
  };

  const toggleSidebar = () => {
    onCollapsedChange?.(!isCollapsed);
  };

  // Base URL for images
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside
        className={`hidden lg:flex flex-col items-center bg-white border border-[#E5E5E5] rounded-r-2xl pt-6 pb-6 gap-2 fixed left-0 top-0 h-screen z-[60] transition-all duration-300 ${isCollapsed ? 'w-[68px]' : 'w-[256px]'}`}
      >
        {/* Upper Container */}
        <div className={`w-full flex flex-col gap-8 ${isCollapsed ? 'items-center px-3' : 'items-start px-5'}`}>
          {/* Logo and Hamburger Menu */}
          <div className={`w-full flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
            {/* Logo */}
            <button
              onClick={toggleSidebar}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="relative w-[42px] h-[42px]">
                <Image 
                  src={`${baseUrl}/logo.svg`} 
                  alt="Brewly Logo" 
                  fill
                  sizes="42px"
                  className="object-contain"
                  priority
                />
              </div>
              {!isCollapsed && (
                <span className="font-lato text-[20px] font-semibold text-[#1E1E1E] tracking-tight">Brewly</span>
              )}
            </button>
            {/* Hamburger Menu Button */}
            {!isCollapsed && (
              <button
                onClick={toggleSidebar}
                className="bg-transparent border-none cursor-pointer p-2 flex flex-col gap-1 items-center justify-center hover:bg-gray-50 rounded-lg"
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
              <div className="relative w-5 h-5">
                <Image 
                  src={`${baseUrl}/icons/home.svg`} 
                  alt="home" 
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Home</span>}
            </button>
            {/* Bundle Icon */}
            <button
              onClick={handleBundleClick}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] ${activeIcon === 'bundle' ? 'bg-[#E8F5E9]' : 'bg-transparent'} hover:bg-[#F5F5F5]`}
            >
              <div className="relative w-5 h-5">
                <Image 
                  src={`${baseUrl}/icons/bundle.svg`} 
                  alt="bundle" 
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Bundles</span>}
            </button>
            {/* AI Suggested Icon */}
            <button
              onClick={handleAIClick}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] ${activeIcon === 'ai-suggested' ? 'bg-[#E8F5E9]' : 'bg-transparent'} hover:bg-[#F5F5F5]`}
            >
              <div className="relative w-5 h-5">
                <Image 
                  src={`${baseUrl}/icons/ai-magic.svg`} 
                  alt="ai-magic" 
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">AI Suggested</span>}
            </button>
            {/* Events Icon */}
            <button
              onClick={handleEventsClick}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] ${activeIcon === 'calendar' ? 'bg-[#E8F5E9]' : 'bg-transparent'} hover:bg-[#F5F5F5]`}
            >
              <div className="relative w-5 h-5">
                <Image 
                  src={`${baseUrl}/icons/calender.svg`} 
                  alt="calendar" 
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Events</span>}
            </button>
              {/* Frontoffice / Orders Icon */}
              <button
                onClick={() => router.push('/orders')}
                className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] ${activeIcon === 'orders' ? 'bg-[#E8F5E9]' : 'bg-transparent'} hover:bg-[#F5F5F5]`}
              >
                  <div className="relative w-5 h-5">
                    <Image
                      src={`${baseUrl}/icons/frontoffice-cion.svg`}
                      alt="frontoffice"
                      fill
                      sizes="20px"
                      className="object-contain"
                    />
                  </div>
                {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Frontoffice</span>}
              </button>
            {/* Promo Icon (Desktop mein bhi add kiya) */}
            
            {/* Settings Icon */}
            <button
              onClick={handleSettingsClick}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] ${activeIcon === 'settings' ? 'bg-[#E8F5E9]' : 'bg-transparent'} hover:bg-[#F5F5F5]`}
            >
              <div className="relative w-5 h-5">
                <Image 
                  src={`${baseUrl}/icons/setting.svg`} 
                  alt="settings" 
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
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
            <div className="relative w-5 h-5">
              <Image 
                src={`${baseUrl}/icons/help-circle.svg`} 
                alt="help" 
                fill
                sizes="20px"
                className="object-contain"
              />
            </div>
            {!isCollapsed && <span className="font-lato text-[14px] font-medium text-[#1E1E1E]">Support</span>}
          </button>
          {/* Logout Button */}
          <button
            className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer border-none ${isCollapsed ? 'justify-center w-[42px] px-0' : 'justify-start w-full px-4'} h-[42px] bg-transparent hover:bg-[#F5F5F5]`}
            onClick={handleLogout}
          >
            <div className="relative w-[28px] h-5">
              <Image 
                src={`${baseUrl}/icons/material-symbols_logout-rounded.svg`} 
                alt="logout" 
                fill
                sizes="28px"
                className="object-contain"
              />
            </div>
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
            <div className="relative w-5 h-5">
              <Image 
                src={`${baseUrl}/icons/home.svg`} 
                alt="home" 
                fill
                sizes="20px"
                className="object-contain"
              />
            </div>
          </Button>
          {/* Bundle */}
          <Button
            variant={activeIcon === 'bundle' ? 'sidebarMobileActive' : 'sidebarMobile'}
            size="sidebar-mobile"
            onClick={handleBundleClick}
          >
            <div className="relative w-5 h-5">
              <Image 
                src={`${baseUrl}/icons/bundle.svg`} 
                alt="bundle" 
                fill
                sizes="20px"
                className="object-contain"
              />
            </div>
          </Button>
          {/* Promo */}
          
          {/* AI Suggested */}
          <Button
            variant={activeIcon === 'ai-suggested' ? 'sidebarMobileActive' : 'sidebarMobile'}
            size="sidebar-mobile"
            onClick={handleAIClick}
          >
            <div className="relative w-5 h-5">
              <Image 
                src={`${baseUrl}/icons/ai-magic.svg`} 
                alt="insights" 
                fill
                sizes="20px"
                className="object-contain"
              />
            </div>
          </Button>
          {/* Frontoffice (Orders) Mobile */}
          <Button
            variant={activeIcon === 'orders' ? 'sidebarMobileActive' : 'sidebarMobile'}
            size="sidebar-mobile"
            onClick={() => router.push('/orders')}
          >
            <div className="relative w-5 h-5">
              <Image 
                src={`${baseUrl}/icons/frontoffice-cion.svg`} 
                alt="frontoffice" 
                fill
                sizes="20px"
                className="object-contain"
              />
            </div>
          </Button>
          {/* Settings */}
          <Button
            variant={activeIcon === 'settings' ? 'sidebarMobileActive' : 'sidebarMobile'}
            size="sidebar-mobile"
            onClick={handleSettingsClick}
          >
            <div className="relative w-5 h-5">
              <Image 
                src={`${baseUrl}/icons/setting.svg`} 
                alt="settings" 
                fill
                sizes="20px"
                className="object-contain"
              />
            </div>
          </Button>
        </div>
      </nav>
    </>
  );
}