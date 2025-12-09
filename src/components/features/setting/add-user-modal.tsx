import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function AddUserModal({ open, onOpenChange }: AddUserModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState<Date | undefined>(undefined);
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  const handleAddUser = () => {
    onOpenChange(false);
  };


  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="!top-auto !bottom-0 !left-0 !right-0 !translate-x-0 !translate-y-0 max-w-none p-0 gap-0 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom w-screen max-w-screen bg-white rounded-t-2xl"
      >
        <DialogHeader className="py-6 px-8 border-b border-gray-200">
          <DialogTitle className="font-lato font-semibold text-[20px] leading-6 text-[#1E1E1E] m-0">Add User</DialogTitle>
        </DialogHeader>
        {/* Tabs */}
        <div className="flex gap-0 px-8 mb-6 flex-shrink-0">
          <div className="flex w-full bg-[#F5F7F9] rounded-lg overflow-hidden relative">
            <button
              className={`flex-1 px-4 py-2 font-medium transition rounded-lg z-10 ${activeTab === "details" ? "bg-white shadow text-gray-900 border border-gray-300 border-r-0 relative z-20" : "bg-transparent text-gray-600"}`}
              onClick={() => setActiveTab("details")}
            >
              User Details
            </button>
            <button
              className={`flex-1 px-4 py-2 font-medium transition rounded-lg z-10 ${activeTab === "permission" ? "bg-white shadow text-gray-900 border border-gray-300 border-l-0 relative z-20" : "bg-transparent text-gray-600"}`}
              onClick={() => setActiveTab("permission")}
            >
              Permission
            </button>
          </div>
        </div>
        {/* Tab Content (scrollable area) */}
        <div>
          {activeTab === "details" && (
            <div className="px-8 pb-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* ...existing code for details fields... */}
                <div>
                  <Label className="font-lato font-semibold text-[14px] leading-5 text-[#1E1E1E] mb-2 block">Full Name</Label>
                  <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] bg-transparent" />
                </div>
                <div>
                  <Label className="font-lato font-semibold text-[14px] leading-5 text-[#1E1E1E] mb-2 block">Email</Label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] bg-transparent" />
                </div>
                <div>
                  <Label className="font-lato font-semibold text-[14px] leading-5 text-[#1E1E1E] mb-2 block">Phone</Label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] bg-transparent" />
                </div>
                <div>
                  <Label className="font-lato font-semibold text-[14px] leading-5 text-[#1E1E1E] mb-2 block">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Input
                        readOnly
                        value={pin ? pin.toLocaleDateString() : "Pick a Date"}
                        className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] bg-transparent cursor-pointer text-left"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={pin}
                        onSelect={setPin}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label className="font-lato font-semibold text-[14px] leading-5 text-[#1E1E1E] mb-2 block">Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="h-[48px] text-[16px] rounded-[8px] border-[#D1D5DB] w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col justify-end">
                  <Label className="font-lato font-semibold text-[14px] leading-5 text-[#1E1E1E] mb-2 block">Status</Label>
                  <div className="flex items-center gap-2">
                    <Switch checked={isActive} onCheckedChange={setIsActive} />
                    <span className="font-lato text-[16px] text-[#1E1E1E] font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "permission" && (
            <div className="px-8 pb-2">
              {/* Static permission content, styled as in Figma */}
              <div className="flex flex-wrap gap-2">
                {/* ...existing code for permissions... */}
                 <div className="space-y-6">
                   {/* Dashboard & Reporting */}
                  <div className="mb-2">
                    <div className="font-semibold text-gray-900 mb-2">Dashboard & Reporting</div>
                    <div className="bg-white rounded-lg shadow-sm p-1 min-h-[24px]">
                      <div className="grid grid-cols-5 gap-4">
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> View Dashboard</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> View Reports & Analytics</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> View AI Insights</label>
                        <label className="flex items-center gap-2"><input type="checkbox" readOnly /> Import CSV</label>
                      </div>
                    </div>
                  </div>
                   {/* Bundles Management */}
                  <div className="mb-2">
                    <div className="font-semibold text-gray-900 mb-2">Bundles Management</div>
                    <div className="bg-white rounded-lg shadow-sm p-1 min-h-[24px]">
                      <div className="grid grid-cols-5 gap-4">
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> View Bundles</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> Create Manual Bundles</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> Approve AI Bundles</label>
                        <label className="flex items-center gap-2"><input type="checkbox" readOnly /> Edit / Disable Active Bundles</label>
                      </div>
                    </div>
                  </div>
                   {/* Events */}
                  <div className="mb-2">
                    <div className="font-semibold text-gray-900 mb-2">Events</div>
                    <div className="bg-white rounded-lg shadow-sm p-1 min-h-[24px]">
                      <div className="grid grid-cols-5 gap-4">
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> View Events</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> Edit Event</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> Create Event</label>
                        <label className="flex items-center gap-2"><input type="checkbox" readOnly /> Delete Event</label>
                      </div>
                    </div>
                  </div>
                   {/* Users */}
                  <div className="mb-2">
                    <div className="font-semibold text-gray-900 mb-2">Users</div>
                    <div className="bg-white rounded-lg shadow-sm p-1 min-h-[24px]">
                      <div className="grid grid-cols-5 gap-4">
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> Manage Users</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> Change Permissions</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> Assign Roles</label>
                        <label className="flex items-center gap-2"><input type="checkbox" readOnly /> Delete User</label>
                      </div>
                    </div>
                  </div>
                   {/* Settings & Integrations */}
                  <div className="mb-2">
                    <div className="font-semibold text-gray-900 mb-2">Settings & Integrations</div>
                    <div className="bg-white rounded-lg shadow-sm p-1 min-h-[24px]">
                      <div className="grid grid-cols-5 gap-4">
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> Edit Business Settings</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> Access POS Settings</label>
                        <label className="flex items-center gap-2"><input type="checkbox" checked readOnly /> Manage Integrations</label>
                        <label className="flex items-center gap-2"><input type="checkbox" readOnly /> Update API Keys</label>
                      </div>
                    </div>
                  </div>
                 </div>
              </div>
            </div>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4 px-8 pt-4 mb-[5px]">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="h-[48px] px-8 rounded-[8px] border-[#D1D5DB] font-inter font-medium text-[16px] text-[#1E1E1E]"
          >
            Cancel
          </Button>
          <Button
            onClick={activeTab === "details" ? handleAddUser : () => onOpenChange(false)}
            className="flex-1 h-[48px] rounded-[8px] bg-[#00674E] font-inter font-medium text-[16px] text-white"
          >
            {activeTab === "details" ? "Add User" : "Save Permission"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
