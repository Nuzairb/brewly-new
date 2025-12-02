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
        style={{
          width: isCollapsed ? '68px' : '256px',
          transition: 'width 0.3s ease',
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          zIndex: 40,
        }}
        className="
          hidden lg:flex
          flex-col items-center bg-white 
          border border-[#E5E5E5] rounded-r-[16px] 
          pt-6 pb-6 gap-2 
        "
      >
        {/* Upper Container */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px', alignItems: isCollapsed ? 'center' : 'flex-start', padding: isCollapsed ? '0 13px' : '0 20px' }}>
          {/* Logo and Hamburger Menu */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: isCollapsed ? 'pointer' : 'default' }} onClick={isCollapsed ? toggleSidebar : undefined}>
              <Image 
                src="/logo.svg" 
                alt="logo" 
                width={42} 
                height={42} 
              />
              {!isCollapsed && (
                <span style={{ 
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#1E1E1E',
                  letterSpacing: '-0.5px'
                }}>
                  Brewly
                </span>
              )}
            </div>
            
            {/* Hamburger Menu Button */}
            {!isCollapsed && (
              <button
                onClick={toggleSidebar}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '18px', height: '2px', background: '#1E1E1E', borderRadius: '2px' }} />
                <div style={{ width: '18px', height: '2px', background: '#1E1E1E', borderRadius: '2px' }} />
                <div style={{ width: '18px', height: '2px', background: '#1E1E1E', borderRadius: '2px' }} />
              </button>
            )}
          </div>

          {/* Icon Buttons Container */}
          <div className="flex flex-col gap-4" style={{ width: '100%', alignItems: isCollapsed ? 'center' : 'stretch' }}>
            {/* Home Icon */}
            <button
              onClick={handleHomeClick}
              style={{
                width: isCollapsed ? '42px' : '100%',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: '12px',
                padding: isCollapsed ? '0' : '0 16px',
                background: activeIcon === 'home' ? '#E8F5E9' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeIcon !== 'home') {
                  e.currentTarget.style.background = '#F5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (activeIcon !== 'home') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Image 
                src="/icons/home.svg" 
                alt="home" 
                width={20} 
                height={20}
              />
              {!isCollapsed && <span style={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Home</span>}
            </button>

            {/* Bundle Icon */}
            <button
              onClick={handleBundleClick}
              style={{
                width: isCollapsed ? '42px' : '100%',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: '12px',
                padding: isCollapsed ? '0' : '0 16px',
                background: activeIcon === 'bundle' ? '#E8F5E9' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeIcon !== 'bundle') {
                  e.currentTarget.style.background = '#F5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (activeIcon !== 'bundle') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Image 
                src="/icons/bundle.svg" 
                alt="bundle" 
                width={20} 
                height={20}
              />
              {!isCollapsed && <span style={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Bundles</span>}
            </button>

            {/* AI Suggested Icon */}
            <button
              onClick={handleAIClick}
              style={{
                width: isCollapsed ? '42px' : '100%',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: '12px',
                padding: isCollapsed ? '0' : '0 16px',
                background: activeIcon === 'ai-suggested' ? '#E8F5E9' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeIcon !== 'ai-suggested') {
                  e.currentTarget.style.background = '#F5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (activeIcon !== 'ai-suggested') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Image 
                src="/icons/ai-magic.svg" 
                alt="ai-magic" 
                width={20} 
                height={20}
              />
              {!isCollapsed && <span style={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>AI Suggested</span>}
            </button>

            {/* Events Icon */}
            <button
              onClick={handleEventsClick}
              style={{
                width: isCollapsed ? '42px' : '100%',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: '12px',
                padding: isCollapsed ? '0' : '0 16px',
                background: activeIcon === 'calendar' ? '#E8F5E9' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeIcon !== 'calendar') {
                  e.currentTarget.style.background = '#F5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (activeIcon !== 'calendar') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Image 
                src="/icons/calender.svg" 
                alt="calendar" 
                width={20} 
                height={20}
              />
              {!isCollapsed && <span style={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Events</span>}
            </button>

            {/* Settings Icon */}
            <button
              onClick={handleSettingsClick}
              style={{
                width: isCollapsed ? '42px' : '100%',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: '12px',
                padding: isCollapsed ? '0' : '0 16px',
                background: activeIcon === 'settings' ? '#E8F5E9' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeIcon !== 'settings') {
                  e.currentTarget.style.background = '#F5F5F5';
                }
              }}
              onMouseLeave={(e) => {
                if (activeIcon !== 'settings') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Image 
                src="/icons/setting.svg" 
                alt="settings" 
                width={20} 
                height={20}
              />
              {!isCollapsed && <span style={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Settings</span>}
            </button>
          </div>
        </div>

        {/* Lower Container */}
        <div className="flex flex-col gap-4 mt-auto" style={{ padding: isCollapsed ? '0 13px' : '0 20px', width: '100%', alignItems: isCollapsed ? 'center' : 'stretch' }}>
          {/* Support Button */}
          <button
            style={{
              width: isCollapsed ? '42px' : '100%',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: '12px',
              padding: isCollapsed ? '0' : '0 16px',
              background: 'transparent',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Image 
              src="/icons/help-circle.svg" 
              alt="help" 
              width={20} 
              height={20}
            />
            {!isCollapsed && <span style={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Support</span>}
          </button>

          {/* Logout Button */}
          <button
            style={{
              width: isCollapsed ? '42px' : '100%',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: '12px',
              padding: isCollapsed ? '0' : '0 16px',
              background: 'transparent',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Image 
              src="/icons/material-symbols_logout-rounded.svg" 
              alt="logout" 
              width={20} 
              height={20}
            />
            {!isCollapsed && <span style={{ fontFamily: 'Lato', fontSize: '14px', fontWeight: 500, color: '#1E1E1E' }}>Logout</span>}
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
            onClick={handlePromoClick}
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
            variant={activeIcon === 'ai-suggested' ? 'sidebarMobileActive' : 'sidebarMobile'}
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
            onClick={handleSettingsClick}
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