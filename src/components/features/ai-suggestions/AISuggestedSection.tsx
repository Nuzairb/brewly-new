"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Types
interface AISuggestedBundle {
  id: number;
  name: string;
  description: string;
  status: 'Active' | 'Draft';
  images: string[];
  collaborators?: Array<{
    id: number;
    name: string;
    avatar?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
  bundle_type?: string;
}

// Fetch pending bundles from backend API
import { useEffect } from "react";

const API_URL = "/api/ai-suggested-bundles";

type TabType = 'All' | 'AI Suggested' | 'Manual' | 'Active' | 'Draft' | 'Events' | 'Expire';
type MenuAction = 'edit' | 'archive' | 'delete' | 'goLive' | 'removeCollaborator';

interface AISuggestedSectionProps {
  bundles?: AISuggestedBundle[];
  onEdit?: (bundleId: number) => void;
  onArchive?: (bundleId: number) => void;
  onDelete?: (bundleId: number) => void;
  onGoLive?: (bundleId: number) => void;
  onRemoveCollaborator?: (bundleId: number, collaboratorId: number) => void;
  onTabChange?: (tab: TabType) => void;
  onFilter?: () => void;
  isLoading?: boolean;
}

export default function AISuggestedSection({
  bundles,
  onEdit,
  onArchive,
  onDelete,
  onGoLive,
  onRemoveCollaborator,
  onTabChange,
  onFilter,
  isLoading = false,
}: AISuggestedSectionProps = {}) {
  const [activeTab, setActiveTab] = useState<TabType>('AI Suggested');
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  const [pendingBundles, setPendingBundles] = useState<AISuggestedBundle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Map DB response to frontend bundle type
        const mapped = data.map((bundle: any) => ({
          id: bundle.id,
          name: bundle.bundle_name || bundle.name || 'Untitled',
          description:
            bundle.event_name && bundle.bundle_strategy
              ? `${bundle.event_name} - ${bundle.bundle_strategy}`
              : bundle.bundle_strategy || bundle.description || '',
          status: bundle.status === 'pending' ? 'Draft' : 'Active',
          images: [bundle.image_url || bundle.image || ''],
          bundle_type: bundle.bundle_type,
          createdAt: bundle.created_at,
          updatedAt: bundle.valid_until,
        }));
        setPendingBundles(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const tabs: TabType[] = ['All', 'AI Suggested', 'Manual', 'Active', 'Draft', 'Events', 'Expire'];
  const [bundleTypeFilter, setBundleTypeFilter] = useState<'all' | 'event' | 'expire'>('all');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const handleMenuAction = (action: MenuAction, bundleId: number, collaboratorId?: number) => {
    setShowMenu(null);
    switch (action) {
      case 'edit':
        onEdit?.(bundleId);
        break;
      case 'archive':
        onArchive?.(bundleId);
        break;
      case 'delete':
        onDelete?.(bundleId);
        break;
      case 'goLive':
        onGoLive?.(bundleId);
        break;
      case 'removeCollaborator':
        if (collaboratorId) {
          onRemoveCollaborator?.(bundleId, collaboratorId);
        }
        break;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Title and Filter Section */}
      <div className="flex items-center justify-between w-full">
        <h1 className="font-lato font-normal text-[32px] leading-none text-[#1E1E1E] m-0">AI Suggested Bundles</h1>
        {/* Filter Button */}
        <Button
          variant="aiFilter"
          onClick={onFilter}
          className="flex items-center justify-center gap-2 w-[99px] h-[48px]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 5H17.5M5 10H15M8.33333 15H11.6667"
              stroke="#787777"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-lato font-medium text-[14px] leading-5 text-[#787777]">
            Filters
          </span>
        </Button>
      </div>

      {/* Main Container */}
      <div className="w-full bg-white rounded-[16px] border-none p-6">
        {/* Tabs Row with Bottom Border */}
        <div className="border-b border-[#D0D3D9] mb-6 relative -left-[18px] -top-[5px] w-[calc(100%+36px)]">
          <div className="flex gap-[26px] w-fit h-[26px] opacity-100 relative items-center">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'aiTabActive' : 'aiTabInactive'}
                onClick={() => handleTabChange(tab)}
                className={`h-[26px] px-0 pb-[9px] ${tab === 'All' ? 'w-[17px]' : tab === 'AI Suggested' ? 'w-[81px]' : tab === 'Manual' ? 'w-[46px]' : tab === 'Active' ? 'w-[40px]' : tab === 'Draft' ? 'w-[33px]' : 'w-[60px]'}`}
              >
                {tab}
              </Button>
            ))}
          </div>
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="text-center py-[60px]">
            <p className="font-inter text-[#787777]">Loading bundles...</p>
          </div>
        ) : pendingBundles.length === 0 ? (
          <div className="text-center py-[60px]">
            <p className="font-inter text-[#787777]">No bundles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 w-full gap-4 opacity-100">
            {pendingBundles
              .filter((bundle) => {
                // Only one tab active at a time
                if (activeTab === 'All') return true;
                if (activeTab === 'Events') return bundle.bundle_type === 'event';
                if (activeTab === 'Expire') return bundle.bundle_type === 'expiry_standard' || bundle.bundle_type === 'expire';
                if (activeTab === 'Draft') return bundle.status === 'Draft';
                if (activeTab === 'Active') return bundle.status === 'Active';
                // Extend for Manual, AI Suggested, etc. if needed
                return true;
              })
              .map((bundle) => (
              <Card
                key={bundle.id}
                className="w-[260px] h-auto relative rounded-[20px] bg-[#FAFAFA] border border-[#EEEEEE] p-[14px]"
              >
                {/* Internal Container */}
                <div className="flex flex-col gap-4 items-center">
                  {/* Top Container - Heading, Status, 3 Dots */}
                  <div className="flex items-center w-full h-[25px]">
                    {/* Heading */}
                    <h3 className="w-[138px] h-[25px] font-lato font-semibold text-[16px] leading-[25px] text-[#1E1E1E] m-0 whitespace-nowrap overflow-hidden text-ellipsis">
                      {bundle.name}
                    </h3>
                    {/* Right side container for Status and Dots */}
                    <div className="flex items-center gap-[9px] ml-auto">
                      {/* Status Badge */}
                      <Badge variant={bundle.status === 'Active' ? 'active' : 'draft'}>
                        {bundle.status}
                      </Badge>
                      {/* Three Dots Button */}
                      <Button
                        variant="aiMenuIcon"
                        onClick={() => setShowMenu(showMenu === bundle.id ? null : bundle.id)}
                        className="w-[24px] h-[24px] p-0 relative"
                      >
                        <svg
                          width="16"
                          height="4"
                          viewBox="0 0 16 4"
                          fill="none"
                          className="absolute top-[10.5px] left-[4.13px]"
                        >
                          <circle cx="2" cy="2" r="1.5" fill="#1A5D4A" />
                          <circle cx="8" cy="2" r="1.5" fill="#1A5D4A" />
                          <circle cx="14" cy="2" r="1.5" fill="#1A5D4A" />
                        </svg>
                      </Button>
                    </div>
                    {/* Dropdown Menu */}
                    {showMenu === bundle.id && (
                      <div className="absolute right-0 top-[30px] w-[174px] bg-white shadow-[0_4px_24px_0_#1A5D4A1A] rounded-[12px] z-10 flex flex-col p-3 gap-1">
                        {/* Edit Bundle */}
                        <Button
                          variant="aiMenuItem"
                          onClick={() => handleMenuAction('edit', bundle.id)}
                          onMouseEnter={() => setHoveredMenuItem('edit')}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          className="w-full h-[36px]"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3334 2.00004C11.5085 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.6171 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38297 14.4088 2.61177C14.5036 2.84057 14.5523 3.08577 14.5523 3.33337C14.5523 3.58098 14.5036 3.82618 14.4088 4.05498C14.314 4.28378 14.1751 4.49162 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3334 2.00004Z" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>
                            Edit Bundle
                          </span>
                        </Button>
                        {/* Archive Bundle */}
                        <Button
                          variant="aiMenuItem"
                          onClick={() => handleMenuAction('archive', bundle.id)}
                          onMouseEnter={() => setHoveredMenuItem('archive')}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          className="w-full h-[36px] text-[#787777]"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 5.33337V14C14 14.3536 13.8595 14.6928 13.6095 14.9429C13.3594 15.1929 13.0203 15.3334 12.6667 15.3334H3.33333C2.97971 15.3334 2.64057 15.1929 2.39052 14.9429C2.14048 14.6928 2 14.3536 2 14V5.33337M6 7.33337V12.6667M10 7.33337V12.6667M1.33333 3.33337H14.6667M10.6667 3.33337V1.33337C10.6667 1.15656 10.5964 0.987027 10.4714 0.862003C10.3464 0.73698 10.1768 0.666707 10 0.666707H6C5.82319 0.666707 5.65362 0.73698 5.5286 0.862003C5.40357 0.987027 5.33333 1.15656 5.33333 1.33337V3.33337" stroke="#787777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>
                            Archive Bundle
                          </span>
                        </Button>
                        {/* Delete Bundle */}
                        <Button
                          variant="aiMenuItemDelete"
                          onClick={() => handleMenuAction('delete', bundle.id)}
                          onMouseEnter={() => setHoveredMenuItem('delete')}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          className="w-full h-[36px]"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4H3.33333M3.33333 4H14M3.33333 4V13.3333C3.33333 13.687 3.47381 14.0261 3.72386 14.2761C3.97391 14.5262 4.31304 14.6667 4.66667 14.6667H11.3333C11.687 14.6667 12.0261 14.5262 12.2761 14.2761C12.5262 14.0261 12.6667 13.687 12.6667 13.3333V4H3.33333ZM5.33333 4V2.66667C5.33333 2.31304 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31304 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31304 10.6667 2.66667V4M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333" stroke="#E74C3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>
                            Delete Bundle
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                  {/* Middle Container - Product Images */}
                  <div className="w-full h-[112px] flex justify-center items-center opacity-100">
                    <div className="w-[100px] h-[100px] rounded-[8px] bg-white border border-[#D9D9D9] flex items-center justify-center overflow-hidden">
                      {bundle.images[0] && (
                        <img
                          src={bundle.images[0]}
                          alt="Bundle"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                  {/* Bottom Container - Description and Buttons */}
                  <div className="flex flex-col gap-3 ml-[6px]">
                    {/* Description */}
                    <p className="font-lato font-normal text-[15px] leading-[22px] text-[#1E1E1E] m-0 line-clamp-2">
                      {bundle.description}
                    </p>
                    {/* Go Live Button */}
                    <Button
                      variant="aiGoLive"
                      onClick={() => handleMenuAction('goLive', bundle.id)}
                      className="w-full h-[44px]"
                    >
                      Go Live
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }
