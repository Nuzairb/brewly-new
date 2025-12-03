import React, { useState } from "react";

export default function SystemSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [vat, setVat] = useState(25);
  const [discountLimit, setDiscountLimit] = useState(35);
  const [posSyncInterval, setPosSyncInterval] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
    }, 1200);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-0" style={{ minHeight: 'calc(100vh - 48px)' }}>
      <div className="px-8 pt-6 pb-8">
        <h2 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '24px', letterSpacing: 0, color: '#1E1E1E', marginBottom: '24px' }}>System Settings</h2>
        {/* Maintenance Mode */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 px-6 py-5 flex items-center justify-between">
          <div>
            <span style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '24px', letterSpacing: 0, color: '#1E1E1E' }}>Maintenance Mode</span>
            <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: '#787777' }}>Temporarily disable public access</div>
          </div>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${maintenanceMode ? 'bg-[#00843D]' : 'bg-gray-300'}`}
            onClick={() => setMaintenanceMode((prev) => !prev)}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        {/* Product Fees */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: '#787777', marginBottom: '8px', display: 'block' }}>VAT %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={vat}
              onChange={(e) => setVat(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
            />
          </div>
          <div>
            <label style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: '#787777', marginBottom: '8px', display: 'block' }}>AI Discount Limit %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={discountLimit}
              onChange={(e) => setDiscountLimit(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
            />
          </div>
        </div>
        {/* Others */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 px-6 py-5">
          <label style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: '#787777', marginBottom: '8px', display: 'block' }}>POS Sync Interval</label>
          <input
            type="number"
            min="1"
            value={posSyncInterval}
            onChange={(e) => setPosSyncInterval(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
          />
        </div>
        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{
              width: 180,
              height: 48,
              borderRadius: 8,
              padding: '12px 16px',
              background: '#00843D',
              color: '#fff',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: 20,
              fontStyle: 'normal',
              lineHeight: '24px',
              letterSpacing: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {isSaving ? "Saving..." : isSaved ? "Settings Saved!" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
