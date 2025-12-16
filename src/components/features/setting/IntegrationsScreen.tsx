"use client";

import React, { useState } from "react";
import { ExternalLink, MousePointer } from "lucide-react";

const integrations = [
  {
    name: "Foodics POS",
    description: "Sync menu, orders & inventory automatically",
    icon: "/figma-assets/foodics-pos-logo.png",
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
    icon: "/figma-assets/local-events-api-logo.png",
    link: "#",
    connected: true,
  },
];

export default function IntegrationsScreen() {
  const [webhookUrl, setWebhookUrl] = useState("https://your-brewly-endpoint.com/webhook");
  const [stripeKey, setStripeKey] = useState("");
  const [foodicsKey, setFoodicsKey] = useState("");
  const [connectedStates, setConnectedStates] = useState([true, true, true]);

  const toggleConnection = (index: number) => {
    const newStates = [...connectedStates];
    newStates[index] = !newStates[index];
    setConnectedStates(newStates);
  };

  // Toggle Switch Component
  const ToggleSwitch = ({ isOn, onChange }: { isOn: boolean, onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-all duration-300 ease-out
                 ${isOn ? 'bg-[#00674e] hover:bg-[#00563d]' : 'bg-gray-300 hover:bg-gray-400'}`}
    >
      <span className={`absolute inline-block h-[20px] w-[20px] rounded-full bg-white shadow-md transform transition-all duration-300 ease-out top-[2px]
                       ${isOn ? 'left-[20px]' : 'left-[2px] hover:left-[3px]'}`} />
    </button>
  );

  return (
    <div className="flex flex-col gap-5 items-start w-full">
      {/* Integrations Title */}
      <p className="font-lato font-medium text-[16px] text-[#071437]">
        Integrations
      </p>

      {/* External Integrations Section */}
      <div className="bg-white border border-[#f1f1f4] rounded-xl w-full overflow-hidden
                     transition-all duration-300 hover:shadow-md">
        <div className="border-b border-[#f1f1f4] p-5">
          <p className="font-lato font-medium text-[16px] text-[#1e1e1e]">
            External Integrations
          </p>
          <p className="font-inter font-normal text-[12px] text-[#4b5675] mt-1">
            Configure third-party service integrations
          </p>
        </div>

        {/* Integration Cards Row */}
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {integrations.map((integration, idx) => (
              <div 
                key={integration.name} 
                className="bg-white border border-[#f1f1f4] rounded-xl shadow-sm overflow-hidden
                          transition-all duration-300 ease-out
                          hover:shadow-md hover:border-gray-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="rounded-lg overflow-hidden size-[40px] transition-all duration-300 hover:scale-110">
                      <img 
                        alt={integration.name} 
                        className="w-full h-full object-cover" 
                        src={integration.icon} 
                      />
                    </div>
                    <button className="flex items-center justify-center p-2 rounded-full
                                     transition-all duration-300 ease-out
                                     hover:bg-gray-100 hover:scale-110">
                      <ExternalLink className="size-[18px] text-[#78829d]" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="font-inter font-medium text-[16px] text-[#071437] 
                                transition-all duration-300 ease-out
                                hover:text-[#00674e]">
                      {integration.name}
                    </p>
                    <p className="font-inter font-normal text-[13px] text-[#4b5675]">
                      {integration.description}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-[#f1f1f4] flex items-center justify-between px-6 py-4">
                  <button className="bg-white border border-[#dbdfe9] flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                                   transition-all duration-300 ease-out
                                   hover:bg-gray-50 hover:scale-[1.02] hover:shadow-sm">
                    <MousePointer className="size-[18px] text-[#99a1b7] 
                                            transition-all duration-300 ease-out" />
                    <p className="font-inter font-medium text-[13px] text-[#4b5675] 
                                transition-all duration-300 ease-out">
                      Connect
                    </p>
                  </button>
                  
                  <ToggleSwitch 
                    isOn={connectedStates[idx]} 
                    onChange={() => toggleConnection(idx)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Webhook Section */}
      <div className="bg-white border border-[#f1f1f4] rounded-xl w-full overflow-hidden
                     transition-all duration-300 hover:shadow-md">
        <div className="p-5 space-y-4">
          <p className="font-lato font-medium text-[16px] text-[#1e1e1e]">
            Webhook
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-inter font-normal text-[14px] text-[#071437]">
                URL
              </p>
              <p className="font-inter font-normal text-[12px] text-[#4b5675]">
                Receive real-time updates about platform events
              </p>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="bg-white border border-[#eeeeee] h-[56px] px-4 py-3 rounded-lg w-full
                         font-inter font-normal text-[13px] text-[#252f4a] outline-none
                         transition-all duration-300 ease-out
                         focus:border-[#00674e] focus:shadow-md"
              />
              <div className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none
                            transition-all duration-300 ease-out
                            focus-within:border-[#00674e]" />
            </div>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="bg-white border border-[#f1f1f4] rounded-xl w-full overflow-hidden
                     transition-all duration-300 hover:shadow-md">
        <div className="p-5 space-y-5">
          <p className="font-lato font-medium text-[16px] text-[#1e1e1e]">
            API Keys
          </p>

          {/* Stripe API Key */}
          <div className="space-y-2">
            <p className="font-inter font-normal text-[14px] text-[#071437]">
              Stripe
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={stripeKey}
                  onChange={(e) => setStripeKey(e.target.value)}
                  placeholder="Enter Key"
                  className="bg-white border border-[#eeeeee] h-[40px] px-4 py-2 rounded-lg w-full
                           font-inter font-normal text-[13px] text-[#252f4a] placeholder:text-[#78829d] outline-none
                           transition-all duration-300 ease-out
                           focus:border-[#00674e] focus:shadow-md"
                />
                <div className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none
                              transition-all duration-300 ease-out
                              focus-within:border-[#00674e]" />
              </div>
              
              <button className="bg-white border border-[#dbdfe9] flex items-center justify-center px-4 py-2 rounded-lg
                               transition-all duration-300 ease-out
                               hover:bg-gray-50 hover:scale-[1.02] hover:shadow-sm">
                <p className="font-inter font-medium text-[13px] text-[#4b5675] 
                            transition-all duration-300 ease-out">
                  Update Key
                </p>
              </button>
            </div>
          </div>

          {/* Foodics POS API Key */}
          <div className="space-y-2">
            <p className="font-inter font-normal text-[14px] text-[#071437]">
              Foodics POS
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={foodicsKey}
                  onChange={(e) => setFoodicsKey(e.target.value)}
                  placeholder="Enter API Token"
                  className="bg-white border border-[#eeeeee] h-[40px] px-4 py-2 rounded-lg w-full
                           font-inter font-normal text-[13px] text-[#252f4a] placeholder:text-[#78829d] outline-none
                           transition-all duration-300 ease-out
                           focus:border-[#00674e] focus:shadow-md"
                />
                <div className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none
                              transition-all duration-300 ease-out
                              focus-within:border-[#00674e]" />
              </div>
              
              <button className="bg-white border border-[#dbdfe9] flex items-center justify-center px-4 py-2 rounded-lg
                               transition-all duration-300 ease-out
                               hover:bg-gray-50 hover:scale-[1.02] hover:shadow-sm">
                <p className="font-inter font-medium text-[13px] text-[#4b5675] 
                            transition-all duration-300 ease-out">
                  Update Key
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}