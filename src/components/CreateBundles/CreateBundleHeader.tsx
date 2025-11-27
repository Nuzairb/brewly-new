
import React from "react";


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
      <div style={{ width: 1117, margin: '97px auto 0 auto', height: 78, display: 'flex', flexDirection: 'column', gap: 24, opacity: 1 }}>
        {/* Upper Sub Container */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 38 }}>
          {/* Left Side Title */}
          <span style={{
            width: 201,
            height: 38,
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
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>Create Bundle</span>
          {/* Right Side Buttons */}
          <div style={{ display: 'flex', gap: 16, width: 272, height: 48 }}>
            {/* Cancel Button */}
            <button style={{
              width: 101,
              height: 48,
              borderRadius: 6,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#E5E7EB',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '12px 16px',
              cursor: 'pointer',
              opacity: 1,
            }}>
              <span style={{
                width: 48,
                height: 20,
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: 16,
                lineHeight: '20px',
                letterSpacing: '0.5px',
                color: '#787777',
                textAlign: 'center',
                verticalAlign: 'middle',
                background: 'transparent',
                opacity: 1,
              }}>Cancel</span>
            </button>
            {/* Next Button */}
            <button
              style={{
                width: 155,
                height: 48,
                borderRadius: 8,
                background: '#1A5D4A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                cursor: 'pointer',
                border: 'none',
                opacity: 1,
              }}
              onClick={onNext}
              disabled={step === 3}
            >
              <span style={{
                width: 39,
                height: 20,
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: 18,
                lineHeight: '20px',
                letterSpacing: 0,
                color: '#fff',
                textAlign: 'center',
                verticalAlign: 'middle',
                background: 'transparent',
                opacity: 1,
              }}>{step === 3 ? 'Save' : 'Next'}</span>
            </button>
          </div>
        </div>
        
        {/* Lower Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 1117, height: 6 }}>
          <div style={{ width: 362, height: 6, borderRadius: 8, background: '#00674E', opacity: 1 }} />
          <div style={{ width: 362, height: 6, borderRadius: 8, background: step >= 2 ? '#00674E' : '#E5E7EB', opacity: 1 }} />
          <div style={{ width: 362, height: 6, borderRadius: 8, background: step === 3 ? '#00674E' : '#E5E7EB', opacity: 1 }} />
        </div>
      </div>
    </>
  );
}
