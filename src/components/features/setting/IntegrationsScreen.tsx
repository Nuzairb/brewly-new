import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const integrations = [
  {
    name: "Foodics POS",
    description: "Sync menu, orders & inventory automatically",
    icon: "/icons/foodics.svg",
    link: "#",
    connected: true,
  },
  {
    name: "Google Weather",
    description: "Auto-fetch local temperature for predictive upsells",
    icon: "/icons/google-icon.svg",
    link: "#",
    connected: true,
  },
  {
    name: "Local Events API",
    description: "Admin login via Google",
    icon: "/icons/localeventapi.svg",
    link: "#",
    connected: true,
  },
];

export default function IntegrationsScreen() {
  const [webhookUrl, setWebhookUrl] = useState("https://your-brewly-endpoint.com/webhook");
  const [stripeKey, setStripeKey] = useState("");
  const [foodicsKey, setFoodicsKey] = useState("");

  return (
    <div className="w-full px-4 pb-12 flex flex-col gap-8">
      <h1 className="mb-6" style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '24px', letterSpacing: 0, color: '#1E1E1E' }}>Integrations</h1>
   
      <div className="mb-8">
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] w-full">
          <div className="mb-4 w-full">
            <h2 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '24px', letterSpacing: 0, color: '#1E1E1E', marginBottom: '6px' }} className="w-full">External Integrations</h2>
            <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: '#787777' }} className="w-full">Configure third-party service integrations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {integrations.map((integration, idx) => (
              <Card key={integration.name} className="w-full h-full p-6 rounded-2xl bg-white border border-[#E5E7EB] flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-2">
                  {/* Foodics POS icon */}
                  {integration.name === "Foodics POS" ? (
                    <img src="/icons/foodics.svg" alt={integration.name} style={{ width: 40, height: 40, display: 'block' }} />
                  ) : (
                    <img src={integration.icon} alt={integration.name} className="w-10 h-10" />
                  )}
                  <a href={integration.link} target="_blank" rel="noopener noreferrer" className="ml-auto">
                    <img src="/icons/connect-icon.svg" alt="external link" className="w-5 h-5" />
                  </a>
                </div>
                <div className="mb-4">
                  <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '24px', letterSpacing: 0, color: '#1E1E1E' }}>{integration.name}</h3>
                  <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: '#787777' }}>{integration.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" className="rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2" style={{ fontFamily: 'Lato' }}>
                    <img src="/icons/mouse-square.svg" alt="connect" className="w-5 h-5" />
                    Connect
                  </Button>
                  <Switch checked={integration.connected} className="ml-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] w-full">
          <div className="flex items-center justify-between mb-2">
            <h2 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '24px', letterSpacing: 0, color: '#1E1E1E' }}>Webhook</h2>
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: '#787777', whiteSpace: 'nowrap' }}>Receive real-time updates about platform events</span>
          </div>
          <div className="flex flex-col gap-2">
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', fontStyle: 'Regular', lineHeight: '20px', letterSpacing: 0, color: '#433535ff' }}>URL</span>
            <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px', fontStyle: 'Regular', lineHeight: '14px', letterSpacing: 0, color: '#787777', background: '#fff', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '12px 16px', width: '100%' }}>{webhookUrl}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
          <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Lato' }}>API Keys</h2>
          <div className="grid grid-cols-[3fr_1fr] gap-6">
            {/* Inputs column */}
            <div className="flex flex-col gap-8">
              <div>
                <Label className="mb-2 block" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0 }}>Stripe</Label>
                <Input
                  value={stripeKey}
                  onChange={e => setStripeKey(e.target.value)}
                  placeholder="Enter Key"
                  className="h-[40px] w-full min-w-[950px] text-[16px] rounded-[8px] border-[#D1D5DB] bg-[#FFFFFF] placeholder:text-gray-400 text-[#1E1E1E]"
                />
              </div>
              <div>
                <Label className="mb-2 block" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0 }}>Foodics POS</Label>
                <Input
                  value={foodicsKey}
                  onChange={e => setFoodicsKey(e.target.value)}
                  placeholder="Enter API Token"
                  className="h-[40px] w-full min-w-[950px] text-[16px] rounded-[8px] border-[#D1D5DB] bg-[#FFFFFF] placeholder:text-gray-400 text-[#1E1E1E]"
                />
              </div>
            </div>
            {/* Buttons column */}
            <div className="flex flex-col gap-[65px] justify-start items-end pt-6">
              <Button
                className="w-[95px] h-[40px] rounded-[6px] border border-[#E5E7EB] bg-white text-[#1E1E1E] px-[12px] py-[11px] opacity-100"
                style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '16px', letterSpacing: 0, fontStyle: 'Medium' }}
              >
                Update Key
              </Button>
              <Button
                className="w-[95px] h-[40px] rounded-[6px] border border-[#E5E7EB] bg-white text-[#1E1E1E] px-[12px] py-[11px] opacity-100"
                style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '16px', letterSpacing: 0, fontStyle: 'Medium' }}
              >
                Update Key
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
