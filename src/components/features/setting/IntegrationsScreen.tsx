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

  return (
    <div className="flex flex-col gap-[20px] items-start w-full">
      {/* Integrations Title */}
      <p className="font-lato font-medium leading-[24px] text-[#071437] text-[16px] whitespace-pre">
        Integrations
      </p>

      {/* External Integrations Section */}
      <div className="flex items-start w-full">
        <div className="bg-white border border-[#f1f1f4] border-solid flex flex-col items-start overflow-clip rounded-[12px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] w-full">
          <div className="border-[#f1f1f4] border-[0px_0px_1px] border-solid flex h-[60px] items-center justify-end px-[20px] py-[20px] w-full">
            <div className="flex flex-col gap-[10px] items-start justify-center flex-1 min-h-px min-w-px">
              <p className="font-lato font-medium leading-[16px] text-[16px] text-[#1e1e1e] w-full">
                External Intergations
              </p>
              <div className="flex flex-col gap-[8px] items-start justify-center">
                <p className="font-inter font-normal leading-[12px] text-[#4b5675] text-[12px] whitespace-pre">
                  Configure third-party service integrations
                </p>
              </div>
            </div>
          </div>

          {/* Integration Cards Row */}
          <div className="flex items-center justify-center px-[20px] py-0 w-full">
            <div className="flex flex-row items-center w-full">
              <div className="flex gap-[20px] items-start px-0 py-[20px] w-full">
                {integrations.map((integration, idx) => (
                  <div key={integration.name} className="bg-white border border-[#f1f1f4] border-solid flex flex-col items-start rounded-[12px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] flex-1">
                    <div className="flex flex-col gap-[20px] items-start px-[24px] py-[30px] w-full">
                      <div className="flex items-center justify-between w-full">
                        <div className="rounded-[4px] shrink-0 size-[40px] overflow-hidden">
                          <img alt={integration.name} className="w-full h-full object-cover" src={integration.icon} />
                        </div>
                        <div className="flex gap-[10px] items-center">
                          <button className="flex items-start p-[7px] rounded-[60px]">
                            <ExternalLink className="size-[18px] text-[#78829d]" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[10px] items-start w-full">
                        <p className="font-inter font-medium leading-[16px] text-[#071437] text-[16px] w-full">
                          {integration.name}
                        </p>
                        <p className="font-inter font-normal leading-[20px] text-[#4b5675] text-[13px] w-full">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <div className="border-[#f1f1f4] border-t border-solid flex items-center justify-between px-[24px] py-[14px] w-full">
                      <button className="bg-white border border-[#dbdfe9] border-solid flex gap-[5px] items-center justify-center overflow-clip px-[12px] py-[11px] rounded-[6px]">
                        <MousePointer className="size-[18px] text-[#99a1b7]" />
                        <p className="font-inter font-medium leading-[14px] text-[#4b5675] text-[13px] tracking-[-0.13px] whitespace-pre">
                          Connect
                        </p>
                      </button>
                      <button
                        onClick={() => toggleConnection(idx)}
                        className={`relative inline-flex h-[24px] w-[44px] items-center rounded-[100px] ${connectedStates[idx] ? 'bg-[#00674e]' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute inline-block h-[20px] w-[20px] rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(39,39,39,0.1)] transition top-[2px] ${connectedStates[idx] ? 'left-[20px]' : 'left-[2px]'}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Section */}
      <div className="flex items-start w-full">
        <div className="bg-white border border-[#f1f1f4] border-solid flex flex-col items-start overflow-clip rounded-[12px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] w-full">
          <div className="border-[#f1f1f4] border-[0px_0px_1px] border-solid flex items-center justify-end px-[20px] py-[20px] w-full">
            <div className="flex flex-col gap-[16px] items-start justify-center flex-1 min-h-px min-w-px">
              <p className="font-lato font-medium leading-[16px] text-[16px] text-[#1e1e1e] w-full">
                Webhook
              </p>
              <div className="flex items-start w-full">
                <div className="flex flex-col gap-[4px] items-start flex-1 min-h-px min-w-px">
                  <div className="flex gap-[4px] items-center w-full">
                    <p className="font-inter font-normal leading-[20px] text-[#071437] text-[14px] flex-1 min-h-px min-w-px">
                      URL
                    </p>
                    <p className="font-inter font-normal leading-[16px] text-[#4b5675] text-[12px] whitespace-pre">
                      Receive real-time updates about platform events
                    </p>
                  </div>
                  <div className="bg-white border border-[#eeeeee] border-solid flex gap-[8px] h-[56px] items-center px-[14px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full">
                    <input
                      type="text"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="font-inter font-normal leading-[14px] text-[#252f4a] text-[13px] w-full border-none outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="flex items-start w-full">
        <div className="bg-white border border-[#f1f1f4] border-solid flex flex-col items-start overflow-clip rounded-[12px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] w-full">
          <div className="border-[#f1f1f4] border-[0px_0px_1px] border-solid flex items-center justify-end px-[20px] py-[20px] w-full">
            <div className="flex flex-col gap-[16px] items-start justify-center flex-1 min-h-px min-w-px">
              <p className="font-lato font-medium leading-[16px] text-[16px] text-[#1e1e1e] w-full">
                API Keys
              </p>

              {/* Stripe API Key */}
              <div className="flex gap-[16px] items-end justify-end w-full">
                <div className="flex flex-col gap-[4px] items-start flex-1 min-h-px min-w-px">
                  <div className="flex items-center w-full">
                    <p className="font-inter font-normal leading-[20px] text-[#071437] text-[14px] flex-1 min-h-px min-w-px">
                      Stripe
                    </p>
                  </div>
                  <div className="bg-white border border-[#eeeeee] border-solid flex gap-[8px] h-[40px] items-center px-[14px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full">
                    <input
                      type="text"
                      value={stripeKey}
                      onChange={(e) => setStripeKey(e.target.value)}
                      placeholder="Enter Key"
                      className="font-inter font-normal leading-[14px] text-[#252f4a] text-[13px] placeholder:text-[#78829d] w-full border-none outline-none bg-transparent"
                    />
                  </div>
                </div>
                <button className="bg-white border border-[#dbdfe9] border-solid flex gap-[5px] h-[40px] items-center justify-center overflow-clip px-[12px] py-[11px] rounded-[6px]">
                  <p className="font-inter font-medium leading-[14px] text-[#4b5675] text-[13px] tracking-[-0.13px] whitespace-pre">
                    Update Key
                  </p>
                </button>
              </div>

              {/* Foodics POS API Key */}
              <div className="flex gap-[16px] items-end justify-end w-full">
                <div className="flex flex-col gap-[4px] items-start flex-1 min-h-px min-w-px">
                  <div className="flex items-center w-full">
                    <p className="font-inter font-normal leading-[20px] text-[#071437] text-[14px] flex-1 min-h-px min-w-px">
                      Foodics POS
                    </p>
                  </div>
                  <div className="bg-white border border-[#eeeeee] border-solid flex gap-[8px] h-[40px] items-center px-[14px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full">
                    <input
                      type="text"
                      value={foodicsKey}
                      onChange={(e) => setFoodicsKey(e.target.value)}
                      placeholder="Enter API Token"
                      className="font-inter font-normal leading-[14px] text-[#252f4a] text-[13px] placeholder:text-[#78829d] w-full border-none outline-none bg-transparent"
                    />
                  </div>
                </div>
                <button className="bg-white border border-[#dbdfe9] border-solid flex gap-[5px] h-[40px] items-center justify-center overflow-clip px-[12px] py-[11px] rounded-[6px]">
                  <p className="font-inter font-medium leading-[14px] text-[#4b5675] text-[13px] tracking-[-0.13px] whitespace-pre">
                    Update Key
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
