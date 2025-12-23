import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AddLocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddLocationModal({ open, onOpenChange }: AddLocationModalProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleAdd = () => {
    console.log({ name, address, phone, isActive });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!top-auto !bottom-0 !left-0 !right-0 !translate-x-0 !translate-y-0 max-w-none p-0 gap-0 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom w-screen max-w-screen bg-white rounded-t-2xl">
        <DialogHeader className="py-6 px-8 border-b border-gray-200">
          <DialogTitle className="font-lato font-semibold text-[20px] leading-6 text-[#1E1E1E] m-0">Add Location</DialogTitle>
        </DialogHeader>

        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="font-lato font-semibold text-[14px] leading-5 text-[#1E1E1E] mb-2 block">Location Name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Location name" className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] bg-transparent" />
            </div>

            <div>
              <Label className="font-lato font-semibold text-[14px] leading-5 text-[#1E1E1E] mb-2 block">Address</Label>
              <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Street address" className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] bg-transparent" />
            </div>

            <div>
              <Label className="font-lato font-semibold text-[14px] leading-5 text-[#1E1E1E] mb-2 block">Phone</Label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] bg-transparent" />
            </div>

            <div className="flex flex-col justify-end">
              <Label className="font-lato font-semibold text-[14px] leading-5 text-[#1E1E1E] mb-2 block">Status</Label>
              <div className="flex items-center gap-2">
                <Switch checked={isActive} onCheckedChange={setIsActive} />
                <span className="font-lato text-[16px] text-[#1E1E1E] font-medium">Active</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button onClick={() => onOpenChange(false)} variant="outline" className="h-[48px] px-8 rounded-[8px] border-[#D1D5DB] font-inter font-medium text-[16px] text-[#1E1E1E]">Cancel</Button>
            <Button onClick={handleAdd} className="flex-1 h-[48px] rounded-[8px] bg-[#00674E] font-inter font-medium text-[16px] text-white">Add Location</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
