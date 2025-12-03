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
    icon: "/icons/google-weather.svg",
    link: "#",
    connected: true,
  },
  {
    name: "Local Events API",
    description: "Admin login via Google",
    icon: "/icons/google-calendar.svg",
    link: "#",
    connected: true,
  },
];

export default function IntegrationsScreen() {
  const [webhookUrl, setWebhookUrl] = useState("https://your-brewly-endpoint.com/webhook");
  const [stripeKey, setStripeKey] = useState("");
  const [foodicsKey, setFoodicsKey] = useState("");

  return (
    <div className="pl-2 pr-8  pb-12">
      <h1 className="mb-6" style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '24px', letterSpacing: 0, color: '#1E1E1E' }}>Integrations</h1>
   
      <div className="mb-8">
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
          <div className="mb-4">
            <h2 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '24px', letterSpacing: 0, color: '#1E1E1E', marginBottom: '6px' }}>External Integrations</h2>
            <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: '#787777' }}>Configure third-party service integrations</p>
          </div>
          <div className="flex gap-6">
            {integrations.map((integration, idx) => (
              <Card key={integration.name} className="flex-1 p-6 rounded-2xl bg-white border border-[#E5E7EB] flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-2">
                  <img src={integration.icon} alt={integration.name} className="w-10 h-10" />
                  <a href={integration.link} target="_blank" rel="noopener noreferrer" className="ml-auto">
                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" rx="10" fill="#FFFFFF"/><path d="M8.5 11.5L11.5 8.5M11.5 8.5V11.5M11.5 8.5H8.5" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
                <div className="mb-4">
                  <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '24px', letterSpacing: 0, color: '#1E1E1E' }}>{integration.name}</h3>
                  <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: '#787777' }}>{integration.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" className="rounded-lg px-4 py-2 text-sm font-medium" style={{ fontFamily: 'Lato' }}>Connect</Button>
                  <Switch checked={integration.connected} className="ml-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-2">
            <h2 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '24px', letterSpacing: 0, color: '#1E1E1E' }}>Webhook</h2>
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: 0, color: '#787777', whiteSpace: 'nowrap' }}>Receive real-time updates about platform events</span>
          </div>
          <div className="flex flex-col gap-2">
            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', fontStyle: 'Regular', lineHeight: '20px', letterSpacing: 0, color: '#433535ff' }}>URL</span>
            <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px', fontStyle: 'Regular', lineHeight: '14px', letterSpacing: 0, color: '#787777', background: '#fff', borderRadius: '8px', border: '1px solid #D1D5DB', padding: '12px 16px', width: '100%', minWidth: '700px' }}>{webhookUrl}</div>
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
