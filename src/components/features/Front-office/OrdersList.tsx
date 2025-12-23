"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Printer } from 'lucide-react';

const sampleOrders = Array.from({ length: 5 }).map((_, i) => ({
  id: 900 + i,
  title: `Order #${925 + i}`,
  date: "Wed, Jul 12, 2023 • 06:12 PM",
  method: i % 2 === 0 ? "Dine In • Cash" : "Dine In • Apple Pay",
  amount: "AED 20.00",
  status: ["New", "Ready", "Preparing", "Served", "Cancelled"][i % 5],
  payment: ["Paid", "Paid", "Paid", "Payment Processing", "Payment Refunded"][i % 5],
  items: [
    { name: "Americano", qty: 2, price: "$12.99" },
    { name: "Cappuccino", qty: 1, price: "$14.49" },
    { name: "Croissant", qty: 2, price: "$8.98" }
  ]
}));

function OrderDrawer({ open, onClose, order }: any) {
  if (!order) return null;

  const [headerHeight, setHeaderHeight] = useState<number>(66);

  useEffect(() => {
    const getHeaderHeight = () => document.querySelector('header')?.getBoundingClientRect().height ?? 66;
    setHeaderHeight(getHeaderHeight());
    const headerEl = document.querySelector('header');
    if (!headerEl) return;
    const ro = new ResizeObserver(() => setHeaderHeight(getHeaderHeight()));
    ro.observe(headerEl);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed bg-white transform transition-transform duration-300 ease-out flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ 
          zIndex: 9999,
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
          top: `${headerHeight}px`,
          right: '24px',
          width: '367px',
          height: `calc(100vh - ${headerHeight}px)`,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#E5E5E5',
          boxSizing: 'border-box',
          padding: 0,
          margin: 0,
          overflow: 'hidden'
        }}
      >
        {/* Orange top bar - thicker */}
        <div className="h-[6px] bg-[#FF8A00] w-full flex-shrink-0" />
        
        {/* Header Section */}
        <div className="px-4 pt-4 pb-3 border-b border-[#E8E8E8] flex-shrink-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] bg-[#F5F5F5] rounded-[6px] flex items-center justify-center border border-[#EAEAEA]">
                <span className="text-[13px] font-medium text-[#4A4A4A]">T4</span>
              </div>
              <div>
                <div className="text-[15px] font-semibold text-[#1A1A1A] leading-tight">A4</div>
                <div className="text-[13px] text-[#666666] mt-0.5">Dine In</div>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-[#EEF2FF] text-[#4F46E5] text-[12px] font-medium rounded-[4px]">
              In Progress
            </span>
          </div>
        </div>

        {/* Order Info */}
        <div className="px-4 py-3 border-b border-[#E8E8E8] flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[15px] font-semibold text-[#1A1A1A]">{order.title}</div>
              <div className="text-[12px] text-[#666666] mt-0.5">{order.date}</div>
            </div>
            <div className="text-[12px] text-[#666666]">Items:14</div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="px-4 py-3 border-b border-[#E8E8E8] flex gap-4 flex-shrink-0">
          <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white rounded-[6px] text-[#DC2626] text-[13px] font-medium shadow-sm border border-[#F0F0F0] hover:bg-gray-50 transition-colors">
            <X className="w-[15px] h-[15px]" />
            Void Order
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white rounded-[6px] text-[#F97316] text-[13px] font-medium shadow-sm border border-[#F0F0F0] hover:bg-gray-50 transition-colors">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="mt-0.5">
              <rect x="1" y="1" width="3" height="12" rx="0.5" fill="#F97316"/>
              <rect x="8" y="1" width="3" height="12" rx="0.5" fill="#F97316"/>
            </svg>
            Hold Order
          </button>
        </div>

        {/* Items List - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {/* Items Header */}
          <div className="flex justify-between text-[11px] font-medium text-[#666666] mb-2 pb-2">
            <div className="flex-1">Items</div>
            <div className="w-12 text-center">Qty</div>
            <div className="w-20 text-right">Price</div>
          </div>

          {/* Items List */}
          <div className="space-y-0">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between py-2.5 border-b border-[#F0F0F0] last:border-0">
                <div className="flex-1">
                  <div className="text-[14px] font-normal text-[#1A1A1A]">{item.name}</div>
                </div>
                <div className="w-12 text-[14px] text-[#4A4A4A] text-center">{item.qty}</div>
                <div className="w-20 text-[14px] font-medium text-[#1A1A1A] text-right">{item.price}</div>
              </div>
            ))}
          </div>

          {/* Payment Method Section */}
          <div className="mt-6">
            <div className="text-[13px] font-semibold text-[#1A1A1A] mb-2.5">Payment Method</div>
            <div className="flex items-center gap-2.5 p-3 border border-[#E0E0E0] rounded-[6px] bg-white">
              <div className="w-[18px] h-[18px] border-2 border-[#D1D5DB] rounded-[3px]"></div>
              <span className="text-[13px] text-[#333333]">Credit/Debit Card</span>
            </div>
          </div>
        </div>

        {/* Footer Actions - Sticky */}
        <div className="px-4 py-4 border-t border-[#E8E8E8] bg-white space-y-3 flex-shrink-0">
          <div className="flex gap-2.5">
            <button className="flex-1 h-[44px] border border-[#D1D5DB] text-[#374151] text-[14px] font-medium rounded-[6px] hover:bg-[#F9FAFB] transition-colors">
              Mark as Paid
            </button>
            <button className="flex-1 h-[44px] border border-[#D1D5DB] text-[#374151] text-[14px] font-medium rounded-[6px] hover:bg-[#F9FAFB] flex items-center justify-center gap-2 transition-colors">
              <Printer className="w-[16px] h-[16px]" />
              Print Receipt
            </button>
          </div>
          
          <button className="w-full h-[48px] bg-[#065F46] hover:bg-[#047857] text-white text-[15px] font-semibold rounded-[6px] transition-colors">
            Bump
          </button>
        </div>
      </div>
    </>
  );
}

export default function OrdersList() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Orders List Container with dynamic width */}
      <div 
        className={`transition-all duration-300 ${drawerOpen ? 'w-[calc(100%-367px)] pr-6' : 'w-full pr-0'}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <h2 className="font-lato text-[32px] font-medium">Orders</h2>
            <div className="mt-3">
              <div className="font-lato text-[14px] font-medium text-[#787777] flex items-center gap-[26px] w-fit h-[26px] relative items-center pb-3">
                {['All','Active(14)','Pending','Completed','History'].map((t, i) => (
                  <button key={t} className={`text-sm ${i===1? 'text-[#00674E] font-medium' : 'text-[#787777]'} pb-[9px]`}>{t}</button>
                ))}
                <div className="absolute bottom-0 h-[3px] bg-[#1A5D4A] rounded w-[68px] left-[44px]" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!drawerOpen && (
              <>
                <div className="h-[48px] font-lato font-medium bg-white px-4 py-2 rounded-[8px] border border-[#EAEAEA] text-[14px] flex items-center">Jan 2024 - Dec 2024</div>
                <Button variant="ordersSecondary" size="ordersHeader">Export Orders</Button>
                <Button variant="ordersPrimary" size="ordersHeader">Share Summary</Button>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[12px] border border-[#F0F0F0] overflow-hidden">
          {sampleOrders.map((o, idx) => (
            <div
              key={o.id}
              className="relative h-[162px] flex items-center justify-between border-b last:border-b-0 cursor-pointer hover:bg-[#F6F6F6] transition-colors px-6"
              onClick={() => { setSelectedOrder(o); setDrawerOpen(true); }}
            >
              {(o.status === 'Ready' || o.status === 'Preparing' || o.status === 'Cancelled') && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[5px] ${o.status === 'Ready' ? 'bg-[#11B86C]' : o.status === 'Preparing' ? 'bg-[#FF800A]' : 'bg-[#FF2311]'}`}
                />
              )}
              <div className="flex items-start gap-4 min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        o.status === 'New' ? 'new' :
                        o.status === 'Ready' ? 'ready' :
                        o.status === 'Preparing' ? 'preparing' :
                        o.status === 'Served' ? 'served' :
                        o.status === 'Cancelled' ? 'cancelled' : 'draft'
                      }
                    >
                      {o.status}
                    </Badge>

                    <Badge
                      variant={
                        o.payment === 'Paid' ? 'paid' :
                        o.payment === 'Payment Processing' ? 'paymentProcessing' :
                        o.payment === 'Payment Refunded' ? 'paymentRefunded' : 'draft'
                      }
                    >
                      {o.payment}
                    </Badge>
                  </div>

                  <h3 className="font-lato text-[18px] text-[#2D2416] font-semibold truncate mb-1">{o.title}</h3>
                  {!drawerOpen && (
                    <p className="font-lato font-normal text-[14px] text-[#787777] mt-1">{o.date}</p>
                  )}
                  <p className="font-lato font-normal text-[14px] text-[#6B5D50]">{o.method}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  {!drawerOpen && (
                    <>
                      <button onClick={(e) => e.stopPropagation()} className="w-[42px] h-[36px] bg-white rounded-[8px] p-2 shadow-sm hover:bg-gray-50 transition-colors">
                        <Printer className="w-[18px] h-[18px] text-[#4A4A4A]" />
                      </button>

                      <button onClick={(e) => { e.stopPropagation(); }} className="w-[42px] h-[36px] bg-white rounded-[8px] shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <svg width="18" height="6" viewBox="0 0 18 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="3" cy="3" r="2" fill="#1A5D4A" />
                          <circle cx="9" cy="3" r="2" fill="#1A5D4A" />
                          <circle cx="15" cy="3" r="2" fill="#1A5D4A" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                <div className="text-[18px] font-lato font-semibold text-[#1A1A1A]">{o.amount}</div>
                      
                {!drawerOpen && (
                  <button onClick={(e) => e.stopPropagation()} className="w-[42px] h-[42px] bg-[#FAFAFA] rounded-[6px] border border-[#EAEAEA] flex items-center justify-center text-[13px] font-medium text-[#4A4A4A]">T4</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        order={selectedOrder} 
      />
    </div>
  );
}