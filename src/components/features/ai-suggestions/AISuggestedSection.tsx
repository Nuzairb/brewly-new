"use client";

import React, { useState } from "react";

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
}

type TabType = 'All' | 'AI Suggested' | 'Manual' | 'Active' | 'Draft';

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

// Sample data - replace with API call
const sampleBundles: AISuggestedBundle[] = [
  {
    id: 1,
    name: "Weather-Based...",
    description: "Warm up your rainy afternoon with this treat",
    status: "Active",
    images: ["/bundle1.jpg", "/bundle2.jpg"],
    collaborators: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ],
  },
  {
    id: 2,
    name: "Peak Hour Hit",
    description: "High footfall hours boost impulse add-ons by 19%.",
    status: "Active",
    images: ["/bundle1.jpg", "/bundle2.jpg"],
  },
  {
    id: 3,
    name: "Trend Spike",
    description: "Real-time demand shows a 14% jump in the last hour",
    status: "Active",
    images: ["/bundle1.jpg", "/bundle2.jpg"],
  },
  {
    id: 4,
    name: "Weather-Based Boost",
    description: "Warm up your rainy afternoon with this treat",
    status: "Active",
    images: ["/bundle1.jpg", "/bundle2.jpg"],
    collaborators: [
      { id: 3, name: "Mike Wilson" },
      { id: 4, name: "Sarah Johnson" },
    ],
  },
  {
    id: 5,
    name: "Weather-Based...",
    description: "Warm up your rainy afternoon with this treat",
    status: "Active",
    images: ["/bundle1.jpg", "/bundle2.jpg"],
  },
  {
    id: 6,
    name: "Peak Hour Hit",
    description: "High footfall hours boost impulse add-ons by 19%.",
    status: "Active",
    images: ["/bundle1.jpg", "/bundle2.jpg"],
  },
  {
    id: 7,
    name: "Trend Spike",
    description: "Real-time demand shows a 14% jump in the last hour",
    status: "Active",
    images: ["/bundle1.jpg", "/bundle2.jpg"],
  },
  {
    id: 8,
    name: "Weather-Based Boost",
    description: "Warm up your rainy afternoon with this treat",
    status: "Draft",
    images: ["/bundle1.jpg", "/bundle2.jpg"],
  },
];

// Reusable styles
const styles = {
  title: {
    fontFamily: 'Lato, sans-serif',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '32px',
    color: '#1E1E1E',
    margin: 0,
    marginTop: '32px',
    marginBottom: '24px',
  },
  container: {
    width: '100%',
    background: '#FFFFFF',
    borderRadius: '16px',
    border: 'none',
    padding: '24px',
  },
  tabButton: (isActive: boolean) => ({
    background: 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid #10A760' : '2px solid transparent',
    padding: '8px 0',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    color: isActive ? '#10A760' : '#787777',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }),
  card: {
    background: '#FFFFFF',
    border: '1px solid #EEEEEE',
    borderRadius: '12px',
    padding: '16px',
    position: 'relative' as const,
  },
  statusBadge: (status: string) => ({
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    background: status === 'Active' ? '#10A7601A' : '#7877771A',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '12px',
    color: status === 'Active' ? '#10A760' : '#787777',
  }),
};

export default function AISuggestedSection({
  bundles = sampleBundles,
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

  const tabs: TabType[] = ['All', 'AI Suggested', 'Manual', 'Active', 'Draft'];

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
        if (collaboratorId) onRemoveCollaborator?.(bundleId, collaboratorId);
        break;
    }
  };

  if (isLoading) {
    return (
      <div style={{ ...styles.container, textAlign: 'center', padding: '60px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#787777' }}>Loading bundles...</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '-32px' }}>
      {/* Title and Filter Container */}
      <div
        style={{
          width: '1074px',
          height: '48px',
          justifyContent: 'space-between',
          opacity: 1,
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        {/* Left Side - AI Suggested Bundles Title */}
        <h2
          style={{
            width: '306px',
            height: '38px',
            opacity: 1,
            fontFamily: 'Lato, sans-serif',
            fontWeight: 500,
            fontSize: '32px',
            lineHeight: '100%',
            letterSpacing: '0px',
            color: '#1E1E1E',
            margin: 0,
          }}
        >
          AI Suggested Bundles
        </h2>

        {/* Right Side - Filters Button */}
        <button
          onClick={onFilter}
          style={{
            width: '99px',
            height: '48px',
            borderRadius: '8px',
            border: '1px solid #D0D3D9',
            opacity: 1,
            background: 'transparent',
            cursor: 'pointer',
            padding: 0,
          }}
          className="hover:bg-gray-50 transition-colors"
        >
          <div
            style={{
              width: '99px',
              height: '40px',
              borderRadius: '8px',
              gap: '8px',
              paddingTop: '10px',
              paddingRight: '16px',
              paddingBottom: '10px',
              paddingLeft: '16px',
              opacity: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
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
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#787777',
              }}
            >
              Filters
            </span>
          </div>
        </button>
      </div>

      {/* Main Container */}
      <div style={styles.container}>
        {/* Tabs Row with Bottom Border */}
        <div
          style={{
            borderBottom: '1px solid #D0D3D9',
            marginBottom: '24px',
            position: 'relative',
            left: '-18px',
            top: '-5px',
            width: 'calc(100% + 36px)',
          }}
        >
          <div
            style={{
              width: '321px',
              height: '26px',
              opacity: 1,
              gap: '26px',
              display: 'flex',
              position: 'relative',
            }}
          >
          {/* All Button */}
          <button
            onClick={() => handleTabChange('All')}
            style={{
              width: '17px',
              height: '26px',
              opacity: 1,
              gap: '10px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'All' ? '2px solid #00674E' : 'none',
              cursor: 'pointer',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: activeTab === 'All' ? '#00674E' : '#787777',
              padding: 0,
              paddingBottom: '9px',
            }}
          >
            All
          </button>

          {/* AI Suggested Button */}
          <button
            onClick={() => handleTabChange('AI Suggested')}
            style={{
              width: '81px',
              height: '26px',
              opacity: 1,
              gap: '10px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'AI Suggested' ? '2px solid #00674E' : 'none',
              cursor: 'pointer',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: activeTab === 'AI Suggested' ? '#00674E' : '#787777',
              padding: 0,
              paddingBottom: '9px',
            }}
          >
            AI Suggested
          </button>

          {/* Manual Button */}
          <button
            onClick={() => handleTabChange('Manual')}
            style={{
              width: '46px',
              height: '26px',
              opacity: 1,
              gap: '10px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'Manual' ? '2px solid #00674E' : 'none',
              cursor: 'pointer',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: activeTab === 'Manual' ? '#00674E' : '#787777',
              padding: 0,
              paddingBottom: '9px',
            }}
          >
            Manual
          </button>

          {/* Active Button */}
          <button
            onClick={() => handleTabChange('Active')}
            style={{
              width: '40px',
              height: '26px',
              opacity: 1,
              gap: '10px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'Active' ? '2px solid #00674E' : 'none',
              cursor: 'pointer',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: activeTab === 'Active' ? '#00674E' : '#787777',
              padding: 0,
              paddingBottom: '9px',
            }}
          >
            Active
          </button>

          {/* Draft Button */}
          <button
            onClick={() => handleTabChange('Draft')}
            style={{
              width: '33px',
              height: '26px',
              opacity: 1,
              gap: '10px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'Draft' ? '2px solid #00674E' : 'none',
              cursor: 'pointer',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: activeTab === 'Draft' ? '#00674E' : '#787777',
              padding: 0,
              paddingBottom: '9px',
            }}
          >
            Draft
          </button>
        </div>
      </div>

        {/* Cards Grid */}
        {bundles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#787777' }}>
              No bundles found
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 283px)',
              gap: '23px',
              width: '1127px',
              justifyContent: 'start',
              marginLeft: '-21px',
            }}
          >
            {bundles.map((bundle) => (
              <div 
                key={bundle.id}
                style={{
                  width: '283px',
                  height: '344px',
                  opacity: 1,
                  borderRadius: '24px',
                  background: '#FAFAFA',
                  border: '1px solid #EEEEEE',
                  position: 'relative',
                }}
              >
                {/* Internal Container */}
                <div
                  style={{
                    width: '246px',
                    height: '294px',
                    justifyContent: 'space-between',
                    opacity: 1,
                    position: 'absolute',
                    top: '30px',
                    left: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Top Container - Heading, Status, 3 Dots */}
                  <div
                    style={{
                      width: '246px',
                      height: '25px',
                      opacity: 1,
                      gap: '9px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {/* Heading */}
                    <h3
                      style={{
                        width: '138px',
                        height: '25px',
                        opacity: 1,
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '25px',
                        letterSpacing: '0%',
                        color: '#1E1E1E',
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                      }}
                    >
                      {bundle.name}
                    </h3>

                    {/* Status Badge */}
                    <div
                      style={{
                        width: '66px',
                        height: '25px',
                        opacity: 1,
                        borderRadius: '4px',
                        paddingTop: '4px',
                        paddingRight: '12px',
                        paddingBottom: '4px',
                        paddingLeft: '12px',
                        background: bundle.status === 'Active' ? '#10A7601A' : '#7877771A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          width: '34px',
                          height: '20px',
                          opacity: 1,
                          fontFamily: 'Lato, sans-serif',
                          fontWeight: 400,
                          fontSize: '12px',
                          lineHeight: '20px',
                          letterSpacing: '0%',
                          color: bundle.status === 'Active' ? '#10A760' : '#787777',
                        }}
                      >
                        {bundle.status}
                      </span>
                    </div>

                    {/* Three Dots Button */}
                    <button
                      onClick={() => setShowMenu(showMenu === bundle.id ? null : bundle.id)}
                      style={{
                        width: '24px',
                        height: '24px',
                        opacity: 1,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        position: 'relative',
                      }}
                    >
                      <svg 
                        width="16" 
                        height="4" 
                        viewBox="0 0 16 4" 
                        fill="none"
                        style={{
                          position: 'absolute',
                          top: '10.5px',
                          left: '4.13px',
                        }}
                      >
                        <circle cx="2" cy="2" r="1.5" fill="#1A5D4A" />
                        <circle cx="8" cy="2" r="1.5" fill="#1A5D4A" />
                        <circle cx="14" cy="2" r="1.5" fill="#1A5D4A" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu === bundle.id && (
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: '30px',
                          width: '174px',
                          height: '144px',
                          opacity: 1,
                          borderRadius: '6px',
                          paddingTop: '12px',
                          paddingBottom: '12px',
                          background: '#FFFFFF',
                          border: '1px solid #F1F6FF',
                          boxShadow: '0px 12px 32px 0px #18191C14',
                          zIndex: 10,
                        }}
                      >
                        <button
                          onClick={() => handleMenuAction('edit', bundle.id)}
                          onMouseEnter={() => setHoveredMenuItem('edit')}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          style={{
                            width: '100%',
                            height: '40px',
                            opacity: 1,
                            background: hoveredMenuItem === 'edit' ? '#00674E1A' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '16px',
                            gap: '8px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <img src="/icons/mynaui_edit.svg" alt="Edit" width="20" height="20" />
                            <span
                              style={{
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '0%',
                                color: hoveredMenuItem === 'edit' ? '#00674E' : '#1E1E1E',
                              }}
                            >
                              Edit Bundle
                            </span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleMenuAction('archive', bundle.id)}
                          onMouseEnter={() => setHoveredMenuItem('archive')}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          style={{
                            width: '100%',
                            height: '40px',
                            opacity: 1,
                            background: hoveredMenuItem === 'archive' ? '#00674E1A' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '16px',
                            gap: '8px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <img src="/icons/_archive-.svg" alt="Archive" width="20" height="20" />
                            <span
                              style={{
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '0%',
                                color: hoveredMenuItem === 'archive' ? '#00674E' : '#1E1E1E',
                              }}
                            >
                              Archive Bundle
                            </span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleMenuAction('delete', bundle.id)}
                          onMouseEnter={() => setHoveredMenuItem('delete')}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          style={{
                            width: '100%',
                            height: '40px',
                            opacity: 1,
                            background: hoveredMenuItem === 'delete' ? '#00674E1A' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '16px',
                            gap: '8px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <img src="/icons/Delete-icon.svg" alt="Delete" width="20" height="20" />
                            <span
                              style={{
                                fontFamily: 'Lato, sans-serif',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '0%',
                                color: hoveredMenuItem === 'delete' ? '#00674E' : '#1E1E1E',
                              }}
                            >
                              Delete Bundle
                            </span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Middle Container - Product Images */}
                  <div
                    style={{
                      width: '246px',
                      height: '112px',
                      opacity: 1,
                      gap: '16px',
                      display: 'flex',
                    }}
                  >
                    {[1, 2].map((idx) => (
                      <div
                        key={idx}
                        style={{
                          width: '115px',
                          height: '112px',
                          opacity: 1,
                          borderRadius: '8px',
                          paddingTop: '4px',
                          paddingRight: '21px',
                          paddingBottom: '4px',
                          paddingLeft: '21px',
                          background: '#FFFFFF',
                          border: '1px solid',
                          borderImageSource: 'linear-gradient(180deg, rgba(217, 217, 217, 0.3) 0%, rgba(115, 115, 115, 0.3) 100%)',
                          borderImageSlice: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src="/icons/samplecofeeimage.svg"
                          alt="Product"
                          style={{
                            width: '65px',
                            height: '104px',
                            opacity: 1,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Bottom Container - Description and Button */}
                  <div>
                    {/* Description */}
                    <div
                      style={{
                        width: '246px',
                        height: '48px',
                        opacity: 1,
                        gap: '12px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'Lato, sans-serif',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '24px',
                          letterSpacing: '0%',
                          color: '#1E1E1E',
                          marginTop: 0,
                          marginRight: 0,
                          marginBottom: 0,
                          marginLeft: 0,
                        }}
                      >
                        {bundle.description}
                      </p>
                    </div>

                    {/* Go Live / Remove Button */}
                    <button
                      onClick={() => handleMenuAction(bundle.status === 'Active' ? 'removeCollaborator' : 'goLive', bundle.id, bundle.collaborators?.[0]?.id)}
                      style={{
                        width: '246px',
                        height: '44px',
                        opacity: 1,
                        borderRadius: '8px',
                        gap: '8px',
                        paddingTop: '8px',
                        paddingRight: '16px',
                        paddingBottom: '8px',
                        paddingLeft: '16px',
                        background: '#FFFFFF',
                        border: bundle.status === 'Active' ? '1px solid #EEEEEE' : '1px solid #00674E',
                        fontFamily: 'Geist, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        letterSpacing: '0%',
                        textAlign: 'center',
                        color: bundle.status === 'Active' ? '#787777' : '#00674E',
                        cursor: 'pointer',
                      }}
                    >
                      {bundle.status === 'Active' ? 'Remove' : 'Go Live'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
