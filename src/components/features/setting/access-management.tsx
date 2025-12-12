import React, { useState } from "react";
import AddUserModal from "./add-user-modal";
import { Eye, Pencil, RotateCcw, Trash2, AlertCircle } from "lucide-react";

const users = [
  { name: "Ahmed Hassan", role: "Manager", pin: "••••" },
  { name: "Fatima Ali", role: "Cashier", pin: "••••" },
  { name: "Omar Mohamed", role: "Barista", pin: "••••" },
];

export default function AccessManagement() {
  const [showPin, setShowPin] = useState([false, false, false]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleShowPin = (idx: number) => {
    setShowPin((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <div className="flex flex-col gap-[20px] items-start w-full">
        {/* Title and Button */}
        <div className="flex items-center justify-between w-full">
          <p className="font-lato font-medium leading-[24px] text-[#071437] text-[16px]">
            User Access & PIN Management
          </p>
          <button
            onClick={handleOpenModal}
            className="bg-[#1a5d4a] flex items-center justify-center px-[16px] py-[8px] rounded-[8px] border-none cursor-pointer"
          >
            <p className="font-lato font-medium leading-[20px] text-[#faf8f3] text-[18px] text-center whitespace-pre m-0">
              Add new user
            </p>
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white flex flex-col items-start pb-[24px] pl-0 pr-[16px] pt-0 rounded-[12px] w-full overflow-x-auto">
          <div className="flex flex-col items-start min-w-full">
            {/* Table Header */}
            <div className="border-[#f0eae4] border-b border-solid grid grid-cols-4 gap-0 w-full min-w-[1000px]">
              <div className="flex flex-col items-start p-[16px]">
                <p className="font-semibold leading-[20px] text-[#1e130e] text-[14px]">
                  Name
                </p>
              </div>
              <div className="flex flex-col items-start p-[16px]">
                <p className="font-semibold leading-[20px] text-[#1e130e] text-[14px]">
                  Role
                </p>
              </div>
              <div className="flex flex-col items-start p-[16px]">
                <p className="font-semibold leading-[20px] text-[#1e130e] text-[14px]">
                  PIN
                </p>
              </div>
              <div className="flex flex-col items-end p-[16px]">
                <p className="font-semibold leading-[20px] text-[#1e130e] text-[14px]">
                  Actions
                </p>
              </div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col items-start w-full">
              {users.map((user, idx) => (
                <div key={user.name} className="border-[#e3e8ee] border-b border-solid grid grid-cols-4 gap-0 w-full min-w-[1000px]">
                  {/* Name */}
                  <div className="flex flex-col items-start px-[16px] py-[22.5px]">
                    <p className="font-medium leading-[20px] text-[#1e130e] text-[14px]">
                      {user.name}
                    </p>
                  </div>

                  {/* Role */}
                  <div className="flex flex-col items-start px-[16px] py-[22.5px]">
                    <p className="font-normal leading-[20px] text-[#787777] text-[14px]">
                      {user.role}
                    </p>
                  </div>

                  {/* PIN */}
                  <div className="flex gap-[8px] items-center px-[16px] py-[22.5px]">
                    <div className="flex flex-col items-start">
                      <p className="font-mono font-normal leading-[20px] text-[#787777] text-[14px]">
                        {showPin[idx] ? "1234" : user.pin}
                      </p>
                    </div>
                    <button
                      onClick={() => handleShowPin(idx)}
                      className="flex flex-col items-start bg-transparent border-none cursor-pointer p-0"
                    >
                      <Eye className="size-[16px] text-[#787777]" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-[8px] items-center justify-end px-[16px] py-[22.5px]">
                    <button className="flex flex-col items-start p-[8px] rounded-[12px] bg-transparent border-none cursor-pointer hover:bg-gray-100">
                      <Pencil className="size-[16px] text-[#787777]" />
                    </button>
                    <button className="flex flex-col items-start p-[8px] rounded-[12px] bg-transparent border-none cursor-pointer hover:bg-gray-100">
                      <RotateCcw className="size-[16px] text-[#787777]" />
                    </button>
                    <button className="flex flex-col items-start p-[8px] rounded-[12px] bg-transparent border-none cursor-pointer hover:bg-gray-100">
                      <Trash2 className="size-[16px] text-[#787777]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="flex items-start w-full">
          <div className="bg-[rgba(243,108,68,0.1)] flex gap-[12px] items-start p-[16px] rounded-[12px] w-full">
            <AlertCircle className="size-[20px] text-[#f36c44] flex-shrink-0" />
            <div className="flex flex-col items-start">
              <p className="font-normal leading-[20px] text-[#f36c44] text-[14px] whitespace-pre">
                Owner PIN required for sensitive changes
              </p>
            </div>
          </div>
        </div>
      </div>
      <AddUserModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
