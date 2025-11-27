import React, { useState } from "react";

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
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        minHeight: 405,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0px 1px 2px 0px #0A0D120D",
        padding: 0,
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
          width: 1121,
          height: 120,
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
        <div style={{ display: "flex", gap: 16 }}>
          {/* Bundle Price Input */}
          <div style={{ width: 546, height: 48, display: "flex", flexDirection: "column" }}>
            <label
              style={{
                width: 200,
                height: 20,
                fontFamily: "Lato, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "20px",
                color: "#1E1E1E",
                marginBottom: 8,
              }}
            >
              Bundle Price (AED)
            </label>
            <input
              type="number"
              placeholder="0.00"
              style={{
                width: 546,
                height: 48,
                borderRadius: 8,
                border: "1px solid #EEEEEE",
                padding: "10px 14px",
                background: "#FFFFFF",
                boxShadow: "0px 1px 2px 0px #0A0D120D",
                fontFamily: "Lato, sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: "#1E1E1E",
                outline: "none",
              }}
            />
          </div>
          {/* Discount Input */}
          <div style={{ width: 546, height: 76, display: "flex", flexDirection: "column" }}>
            <label
              style={{
                width: 89,
                height: 20,
                fontFamily: "Lato, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "20px",
                color: "#1E1E1E",
                marginBottom: 8
              }}
            >
              Discount (%)
            </label>
            <input
              type="number"
              placeholder="0"
              style={{
                width: 546,
                height: 48,
                borderRadius: 8,
                border: "1px solid #EEEEEE",
                padding: "10px 14px",
                background: "#FFFFFF",
                boxShadow: "0px 1px 2px 0px #0A0D120D",
                fontFamily: "Lato, sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: "#1E1E1E",
                outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          width: 1121,
          height: 120,
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
        <div style={{ display: "flex", gap: 16 }}>
          {/* Start Date Input */}
          <div style={{ width: 546, height: 48, display: "flex", flexDirection: "column" }}>
            <label
              style={{
                width: 200,
                height: 20,
                fontFamily: "Lato, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "20px",
                color: "#1E1E1E",
                marginBottom: 8,
              }}
            >
              Start Date
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="date"
                style={{
                  width: 546,
                  height: 48,
                  borderRadius: 8,
                  border: "1px solid #EEEEEE",
                  padding: "10px 14px 10px 40px",
                  background: "#FFFFFF",
                  boxShadow: "0px 1px 2px 0px #0A0D120D",
                  fontFamily: "Lato, sans-serif",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#1E1E1E",
                  outline: "none",
                }}
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
          <div style={{ width: 546, height: 48, display: "flex", flexDirection: "column" }}>
            <label
              style={{
                width: 200,
                height: 20,
                fontFamily: "Lato, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "20px",
                color: "#1E1E1E",
                marginBottom: 8,
              }}
            >
              End Date
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="date"
                style={{
                  width: 546,
                  height: 48,
                  borderRadius: 8,
                  border: "1px solid #EEEEEE",
                  padding: "10px 14px 10px 40px",
                  background: "#FFFFFF",
                  boxShadow: "0px 1px 2px 0px #0A0D120D",
                  fontFamily: "Lato, sans-serif",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#1E1E1E",
                  outline: "none",
                }}
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
          width: 1121,
          height: 108,
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
  );
};

export default BundleStrategy;