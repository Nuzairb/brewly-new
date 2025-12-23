"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Printer } from 'lucide-react';

type Order = {
  id: number;
  title: string;
  date: string;
  method: string;
  amount: string;
  items?: Array<{ name: string; qty: number; price: string }>;
  status?: string;
};

interface OrderDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export default function OrderDrawer({ open, onOpenChange, order }: OrderDrawerProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
          className={`bg-white fixed z-[80] p-0 m-0 shadow-lg overflow-hidden border border-[#E5E5E5] rounded-l-2xl transition-opacity duration-200`}
          style={{
            top: `${headerHeight}px`,
            right: '24px',
            width: '367px',
            height: `calc(100vh - ${headerHeight}px)`,
            opacity: open ? 1 : 0,
            transform: 'none',
            boxSizing: 'border-box',
            padding: 0,
            margin: 0
          }}
          showCloseButton={false}
        >
        <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="px-5 pt-4 pb-3 border-b flex-shrink-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">T4</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">A4</div>
                <div className="text-xs text-gray-500">Dine In</div>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
              In Progress
            </span>
          </div>
        </div>

        {/* Order Info */}
        <div className="px-5 py-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[14px] font-lato font-semibold text-black">Order #925</div>
              <div className="text-[14px] font-lato font-medium text-gray-500">Wed, Jul 12, 2023 • 06:12 PM</div>
            </div>
            <div className="text-[14px] font-lato font-medium text-gray-500">Items:14</div>
          </div>
        </div>
        {/* Action Buttons Row */}
        <div className="px-5 py-3 flex items-center gap-2">
          <button className="w-[158px] h-[40px] flex items-center gap-1.5 text-red-600 text-[14px] font-lato font-medium text-black">
            <X className="text-[14px] font-lato font-medium" />
            Void Order
          </button>
          <button className="w-[158px] h-[40px] flex items-center gap-1.5 text-orange-500 text-[14px] font-lato font-medium text-black ml-6">
            <span className="text-[14px] font-lato font-medium ">⏸</span>
            Hold Order
          </button>
        </div>

        {/* Items List - Scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <div className="flex-1">
                <div className="text-[14px] font-lato font-semibold text-black">Americano</div>
              </div>
              <div className="text-[14px] text-gray-600 mx-8">2</div>
              <div className="text-[14px] font-lato font-semibold text-black w-16 text-right">$12.99</div>
            </div>
            
            <div className="flex justify-between py-2">
              <div className="flex-1">
                <div className="text-[14px] font-lato font-semibold text-black">Cappuccino</div>
              </div>
              <div className="text-[14px] text-gray-600 mx-8">1</div>
              <div className="text-[14px] font-lato font-semibold text-black w-16 text-right">$14.49</div>
            </div>
            
            <div className="flex justify-between py-2">
              <div className="flex-1">
                <div className="text-[14px] font-lato font-semibold text-black">Croissant</div>
              </div>
              <div className="text-[14px] text-gray-600 mx-8">2</div>
              <div className="text-[14px] font-lato font-semibold text-black w-16 text-right">$8.98</div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mt-6">
            <div className="text-[14px] font-lato font-semibold text-gray-900 mb-3">Payment Method</div>
            <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
              <div className="w-[332px] h-[45px] border-2 border-gray-300 rounded"></div>
              <span className="text-[14px] font-lato font-normal text-black">Credit/Debit Card</span>
            </div>
          </div>
        </div>

        {/* Footer Actions - Sticky */}
        <div className="px-5 py-4 border-t bg-white space-y-3 flex-shrink-0">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 font-lato font-medium text-[14px] shadow-sm text-black hover:bg-gray-50"
            >
              Mark as Paid
            </Button>
            <Button 
              variant="outline"
              className="flex-1 font-lato font-medium text-[14px] shadow-sm text-black hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Receipt
            </Button>
          </div>
          
          <Button className="w-[332px] h-[44px] bg-[#1A5D4A] hover:bg-[#14532D] text-white font-lato font-medium py-6 text-[18px]">
            Bump
          </Button>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}