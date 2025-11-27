'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image';

export function CreateBundleDialog() {
  const [open, setOpen] = useState(false);
  const [bundleName, setBundleName] = useState('');
  const [bundlePrice, setBundlePrice] = useState('');

  const handleCreate = () => {
    // Handle bundle creation logic
    console.log('Creating bundle:', { name: bundleName, price: bundlePrice });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className="flex items-center justify-center hover:bg-[#1A5D4A0A] transition-colors w-full sm:w-auto"
          style={{
            minWidth: '141px',
            height: '48px',
            borderRadius: '8px',
            border: '1px solid #1A5D4A',
            padding: '8px 16px',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '20px',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#1A5D4A',
              whiteSpace: 'nowrap',
            }}
          >
            Create Bundle
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px] rounded-[16px]">
        <DialogHeader>
          <DialogTitle 
            className="font-lato"
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#1E1E1E',
            }}
          >
            Create New Bundle
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {/* Bundle Name */}
          <div className="space-y-2">
            <Label 
              htmlFor="name"
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#1E1E1E',
              }}
            >
              Bundle Name
            </Label>
            <Input 
              id="name" 
              placeholder="e.g., Morning Coffee Pack"
              value={bundleName}
              onChange={(e) => setBundleName(e.target.value)}
              className="h-[48px] rounded-[8px] border-[#E5E5E5]"
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '16px',
              }}
            />
          </div>

          {/* Bundle Price */}
          <div className="space-y-2">
            <Label 
              htmlFor="price"
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#1E1E1E',
              }}
            >
              Price (AED)
            </Label>
            <Input 
              id="price" 
              type="number" 
              placeholder="0.00"
              value={bundlePrice}
              onChange={(e) => setBundlePrice(e.target.value)}
              className="h-[48px] rounded-[8px] border-[#E5E5E5]"
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '16px',
              }}
            />
          </div>

          {/* Bundle Description */}
          <div className="space-y-2">
            <Label 
              htmlFor="description"
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#1E1E1E',
              }}
            >
              Description
            </Label>
            <textarea
              id="description"
              placeholder="Describe your bundle..."
              rows={4}
              className="w-full rounded-[8px] border border-[#E5E5E5] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00674E]"
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '16px',
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-[#E5E5E5]">
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-[#F6F6F6] transition-colors"
              style={{
                minWidth: '100px',
                height: '48px',
                borderRadius: '8px',
                border: '1px solid #E5E5E5',
                padding: '8px 16px',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                color: '#1E1E1E',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="hover:opacity-90 transition-opacity"
              style={{
                minWidth: '150px',
                height: '48px',
                borderRadius: '8px',
                padding: '8px 16px',
                background: 'linear-gradient(114.41deg, #007256 8.52%, #00A57D 91.48%)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                color: '#FFFFFF',
              }}
            >
              Create Bundle
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
