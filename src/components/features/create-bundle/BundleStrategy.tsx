import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function BundleStrategy() {
  return (
    <>
    <section
      style={{
        width: '100%',
        maxWidth: '100%',
        height: 196,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: 1,
        marginBottom: 32,
        marginTop: 40,
        position: 'relative',
        padding: '0 65px',
      }}
    >
      {/* Title */}
      <div
        style={{
          width: '100%',
          height: 28,
          fontFamily: 'Lato, sans-serif',
          fontWeight: 600,
          fontSize: 20,
          lineHeight: '28px',
          letterSpacing: 0,
          color: '#1E1E1E',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          verticalAlign: 'middle',
          opacity: 1,
          marginBottom: 16,
        }}
      >
        Bundle Strategy
      </div>
      {/* Cards Container */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          opacity: 1,
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            height: 152,
            borderRadius: 14,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#EEEEEE',
            background: '#FAFAFA',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            gap: 8,
            padding: '18px 17px',
            opacity: 1,
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              opacity: 1,
              height: '100%',
            }}
          >
            <img src="/icons/moon-slow-wind.svg" alt="" style={{ width: 32, height: 32, marginBottom: 'auto' }} />
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontStyle: 'Medium',
                fontSize: 16,
                lineHeight: '20px',
                letterSpacing: '0%',
                color: '#1E1E1E',
                background: 'transparent',
                verticalAlign: 'middle',
                opacity: 1,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Reduce Slow-Moving Stock
            </span>
          </div>
        </div>
        {/* Card 2 */}
        <div
          style={{
            height: 152,
            borderRadius: 14,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#EEEEEE',
            background: '#FAFAFA',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            gap: 8,
            padding: '18px 17px',
            opacity: 1,
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              opacity: 1,
              height: '100%',
            }}
          >
            <img src="/icons/ai-magic.svg" alt="" style={{ width: 32, height: 32, marginBottom: 'auto' }} />
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontStyle: 'Medium',
                fontSize: 16,
                lineHeight: '20px',
                letterSpacing: '0%',
                color: '#1E1E1E',
                background: 'transparent',
                verticalAlign: 'middle',
                opacity: 1,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              AI Suggested Combo
            </span>
          </div>
        </div>
        {/* Card 3 */}
        <div
          style={{
            height: 152,
            borderRadius: 14,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#EEEEEE',
            background: '#FAFAFA',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            gap: 8,
            padding: '18px 17px',
            opacity: 1,
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              opacity: 1,
              height: '100%',
            }}
          >
            <img src="/icons/analytics-01.svg" alt="" style={{ width: 32, height: 32, marginBottom: 'auto' }} />
            <span
              style={{
                height: 20,
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontStyle: 'Medium',
                fontSize: 16,
                lineHeight: '20px',
                letterSpacing: '0%',
                color: '#1E1E1E',
                background: 'transparent',
                verticalAlign: 'middle',
                opacity: 1,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Increase Average Order Value
            </span>
          </div>
        </div>
        {/* Card 4 */}
        <div
          style={{
            height: 152,
            borderRadius: 14,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#EEEEEE',
            background: '#FAFAFA',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            gap: 8,
            padding: '18px 17px',
            opacity: 1,
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              opacity: 1,
              height: '100%',
            }}
          >
            <img src="/icons/dollar-square.svg" alt="" style={{ width: 32, height: 32, marginBottom: 'auto' }} />
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontStyle: 'Medium',
                fontSize: 16,
                lineHeight: '20px',
                letterSpacing: '0%',
                color: '#1E1E1E',
                background: 'transparent',
                verticalAlign: 'middle',
                opacity: 1,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Promote High-Margin Items
            </span>
          </div>
        </div>
      </div>
    </section>
      {/* Bundle Composition Section */}
      <section
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              opacity: 1,
              marginTop: 32,
              padding: '0 81px',
            }}
          >
            {/* Top Row: Heading and Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              {/* Left Side Heading */}
              <span
                style={{
                  width: 198,
                  height: 28,
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 600,
                  fontSize: 20,
                  lineHeight: '28px',
                  letterSpacing: 0,
                  color: '#1E1E1E',
                  background: 'transparent',
                  verticalAlign: 'middle',
                  opacity: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Bundle Composition
              </span>
              {/* Right Side AI Suggestion Button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="aiSuggestionBtn"
                          className="w-[227px] h-[44px] gap-2 px-4 py-3"
                        >
                          <img src="/icons/magic-wand-05.svg" alt="" style={{ width: 20, height: 20 }} />
                          <span style={{whiteSpace: 'nowrap'}}>AI Suggestion</span>
                        </Button>
                      </div>
            </div>
            {/* Slot Section */}
            <div
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                opacity: 1,
              }}
            >
              {/* Slot 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span
                  style={{
                    width: 41,
                    height: 20,
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 400,
                    fontSize: 16,
                    
                    lineHeight: '20px',
                    letterSpacing: 0,
                    color: '#1E1E1E',
                    opacity: 1,
                  }}
                >
                  Slot 1
                </span>
                <Select defaultValue="">
                  <SelectTrigger variant="bundle" className="w-full h-12" style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: '#787777' }}>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Slot 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: '20px',
                    letterSpacing: 0,
                    color: '#1E1E1E',
                    opacity: 1,
                  }}
                >
                  Slot 2
                </span>
                <Select defaultValue="">
                  <SelectTrigger variant="bundle" className="w-full h-12" style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: '#787777' }}>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
          {/* Bundle Basics Section */}
          <section
            style={{
              width: '100%',
              marginTop: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              opacity: 1,
              marginBottom: 32,
              padding: '0 81px',
            }}
          >
            {/* Top Row: Heading */}
            <span
              style={{
                width: 198,
                height: 28,
                fontFamily: 'Lato, sans-serif',
                fontWeight: 600,
                fontSize: 20,
                lineHeight: '28px',
                letterSpacing: 0,
                marginTop: 32,
                color: '#1E1E1E',
                background: 'transparent',
                verticalAlign: 'middle',
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Bundle Basics
            </span>
            {/* Slot Section */}
            <div
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                opacity: 1,
                marginTop: 16,
              }}
            >
              {/* Bundle Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
                <span
                  style={{
                    width: 110,
                    height: 20,
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: '20px',
                    letterSpacing: 0,
                    color: '#1E1E1E',
                    opacity: 1,
                  }}
                >
                  Bundle Name
                </span>
                <Select defaultValue="">
                  <SelectTrigger variant="bundle" className="w-full h-12" style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: '#787777' }}>
                    <SelectValue placeholder="Grill Sandwich" />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    <SelectItem value="grill">Grill Sandwich</SelectItem>
                    <SelectItem value="club">Club Sandwich</SelectItem>
                    <SelectItem value="veggie">Veggie Sandwich</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Bundle Type */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span
                  style={{
                    width: 90,
                    height: 20,
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: '20px',
                    letterSpacing: 0,
                    color: '#1E1E1E',
                    opacity: 1,
                  }}
                >
                  Bundle Type
                </span>
                <Select defaultValue="">
                  <SelectTrigger variant="bundle" className="w-full h-12" style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: '#787777' }}>
                    <SelectValue placeholder="Manual" />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="auto">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
    </>
    
  );
}
