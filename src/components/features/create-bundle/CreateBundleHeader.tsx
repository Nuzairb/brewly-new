
import React from "react";
import { Button } from "@/components/ui/button";


interface CreateBundleHeaderProps {
  step?: number;
  onNext?: () => void;
  onBack?: () => void;
}

export default function CreateBundleHeader({ step = 1, onNext, onBack }: CreateBundleHeaderProps) {
  return (
    <>
      {/* Back Button - Figma Style */}
      <button
        style={{
          position: 'absolute',
          top: 36,
          left: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          color: '#222',
          fontSize: 18,
          fontWeight: 400,
          cursor: 'pointer',
        }}
        onClick={onBack}
        disabled={step === 1}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 6L10 14L18 22" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: 18, color: '#222'}}>Back</span>
      </button>

      {/* Top Section - Title, Buttons, Progress Bar */}
      <div style={{ width: '100%', margin: '97px auto 0 auto', padding: '0 81px', display: 'flex', flexDirection: 'column', gap: 24, opacity: 1 }}>
        {/* Upper Sub Container */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Left Side Title */}
          <span style={{
            fontFamily: 'Lato, sans-serif',
            fontWeight: 500,
            fontSize: 32,
            lineHeight: '38px',
            letterSpacing: 0,
            color: '#1E1E1E',
            display: 'flex',
            alignItems: 'center',
            opacity: 1,
            whiteSpace: 'nowrap',
          }}>Create Bundle</span>
          {/* Right Side Buttons */}
          <div style={{ display: 'flex', gap: 16 }}>
            {/* Cancel Button */}
            <Button
              variant="cancelBtn"
              className="w-[101px] h-[48px] gap-2 px-4 py-3"
            >
              Cancel
            </Button>
            {/* Next Button */}
            <Button
              variant="nextBtn"
              onClick={onNext}
              className="w-[155px] h-[48px] gap-2 px-4 py-2"
            >
              {step === 3 ? 'Save' : 'Next'}
            </Button>
          </div>
        </div>
        
        {/* Lower Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', height: 6 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 8, background: '#00674E', opacity: 1 }} />
          <div style={{ flex: 1, height: 6, borderRadius: 8, background: step >= 2 ? '#00674E' : '#E5E7EB', opacity: 1 }} />
          <div style={{ flex: 1, height: 6, borderRadius: 8, background: step === 3 ? '#00674E' : '#E5E7EB', opacity: 1 }} />
        </div>
      </div>
    </>
  );
}
