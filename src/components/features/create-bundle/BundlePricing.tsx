import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BundleStrategy = () => {
  const [autoActivate, setAutoActivate] = useState(true);
  const [showOnKiosk, setShowOnKiosk] = useState(true);
  const [showOnStaff, setShowOnStaff] = useState(true);

  // Custom round toggle switch
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div
      onClick={onChange}
      style={{
        width: 40,
        height: 24,
        borderRadius: 12,
        background: checked ? "#00674E" : "#E4E4E7",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        display: "flex",
        alignItems: "center",
        marginLeft: 8,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          left: checked ? 18 : 2,
          top: 2,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          transition: "left 0.2s",
        }}
      />
    </div>
  );

  return (
    <section style={{ width: '100%', padding: '0 40px' }}>
    <div
      style={{
        width: '100%',
        minHeight: 405,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0px 1px 2px 0px #0A0D120D",
        padding: 32,
        marginBottom: 32,
        display: "flex",
        flexDirection: "column",
        gap: 25,
        opacity: 1,
        transform: "rotate(0deg)",
      }}
    >
      {/* Pricing & Profit Impact Section */}
      <div
        style={{
          width: '100%',
          display: "flex",
          flexDirection: "column",
          gap: 16,
          opacity: 1,
          transform: "rotate(0deg)",
        }}
      >
        <div
          style={{
            width: 200,
            height: 28,
            fontFamily: "Lato, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "28px",
            letterSpacing: 0,
            color: "#1E1E1E",
            verticalAlign: "middle",
            background: "none",
            opacity: 1,
            marginBottom: 8,
          }}
        >
          Pricing & Profit Impact
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Bundle Price Input */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Label variant="bundle" className="mb-2">
              Bundle Price (AED)
            </Label>
            <Input
              type="number"
              variant="bundlePrice"
              placeholder="0.00"
            />
          </div>
          {/* Discount Input */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Label variant="bundle" className="mb-2">
              Discount (%)
            </Label>
            <Input
              type="number"
              variant="bundlePrice"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          display: "flex",
          flexDirection: "column",
          gap: 16,
          opacity: 1,
          transform: "rotate(0deg)",
        }}
      >
        <div
          style={{
            width: 196,
            height: 28,
            fontFamily: "Lato, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "28px",
            letterSpacing: 0,
            color: "#1E1E1E",
            verticalAlign: "middle",
            background: "none",
            opacity: 1,
            marginBottom: 8,
          }}
        >
          Schedule & Activation
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Start Date Input */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Label variant="bundle" className="mb-2">
              Start Date
            </Label>
            <div style={{ position: "relative" }}>
              <Input
                type="date"
                variant="bundleDate"
                placeholder="Pick a Date"
              />
              {/* Calendar Icon */}
              <span style={{ position: "absolute", left: 14, top: 14 }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <rect x="3" y="6" width="14" height="11" rx="2" stroke="#787777" strokeWidth="1.5" />
                  <path d="M7 2v2M13 2v2" stroke="#787777" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
          {/* End Date Input */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Label variant="bundle" className="mb-2">
              End Date
            </Label>
            <div style={{ position: "relative" }}>
              <Input
                type="date"
                variant="bundleDate"
                placeholder="Pick a Date"
              />
              {/* Calendar Icon */}
              <span style={{ position: "absolute", left: 14, top: 14 }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <rect x="3" y="6" width="14" height="11" rx="2" stroke="#787777" strokeWidth="1.5" />
                  <path d="M7 2v2M13 2v2" stroke="#787777" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activation Buttons Section */}
      <div
        style={{
          width: '100%',
          display: "flex",
          flexDirection: "column",
          gap: 24,
          opacity: 1,
          transform: "rotate(0deg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, height: 36 }}>
          <span style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "20px",
            color: "#1E1E1E",
            verticalAlign: "middle"
          }}>Auto-activate</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <Toggle checked={autoActivate} onChange={() => setAutoActivate((v) => !v)} />
            <span style={{ color: autoActivate ? "#1E1E1E" : "#787777", fontWeight: 500, fontFamily: "Lato, sans-serif", fontSize: 16 }}>{autoActivate ? "Active" : "Inactive"}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, height: 36 }}>
          <span style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "20px",
            color: "#1E1E1E",
            verticalAlign: "middle"
          }}>Show on kiosk</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <Toggle checked={showOnKiosk} onChange={() => setShowOnKiosk((v) => !v)} />
            <span style={{ color: showOnKiosk ? "#1E1E1E" : "#787777", fontWeight: 500, fontFamily: "Lato, sans-serif", fontSize: 16 }}>{showOnKiosk ? "Active" : "Inactive"}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, height: 36 }}>
          <span style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "20px",
            color: "#1E1E1E",
            verticalAlign: "middle"
          }}>Show on Staff screen</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <Toggle checked={showOnStaff} onChange={() => setShowOnStaff((v) => !v)} />
            <span style={{ color: showOnStaff ? "#1E1E1E" : "#787777", fontWeight: 500, fontFamily: "Lato, sans-serif", fontSize: 16 }}>{showOnStaff ? "Active" : "Inactive"}</span>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default BundleStrategy;