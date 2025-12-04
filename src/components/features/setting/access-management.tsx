import React, { useState } from "react";
import AddUserModal from "./add-user-modal";
import { Eye, Pencil, Copy, Trash2, Lock, RotateCcw } from "lucide-react";
const users = [
  { name: "Ahmed Hassan", role: "Manager", pin: "•••" },
  { name: "Fatima Ali", role: "Cashier", pin: "•••" },
  { name: "Omar Mohamed", role: "Barista", pin: "•••" },
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
      <div className="w-full bg-white rounded-xl  p-0 min-h-[calc(100vh-48px)]">
        <div className="px-8  pb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">User Access & PIN Management</h2>
            <button
              onClick={handleOpenModal}
              className="w-[180px] h-[48px] rounded-lg px-4 py-3 bg-[#1A5D4A] text-white font-inter font-medium text-[20px] leading-6 flex items-center justify-center border-none shadow-sm cursor-pointer whitespace-nowrap "
            >
              Add new user
            </button>
          </div>
          <div className="bg-white rounded-lg  mb-6 overflow-x-auto mt-2 mx-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">PIN</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, idx) => (
                  <tr key={user.name}>
                    <td className="px-4 py-3 text-gray-900 font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-gray-700">{user.role}</td>
                    <td className="px-4 py-3">
                      <span>{showPin[idx] ? "1234" : user.pin}</span>
                      <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => handleShowPin(idx)}>
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-4 py-3 flex gap-4">
                      <button className="text-gray-500 hover:text-gray-700"><Pencil className="w-4 h-4" /></button>
                      <button className="text-gray-500 hover:text-gray-700"><RotateCcw className="w-4 h-4" /></button>
                      <button className="text-gray-500 hover:text-gray-700"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-400" />
            <span className="text-red-700 text-sm font-medium">Owner PIN required for sensitive changes</span>
          </div>
        </div>
      </div>
      <AddUserModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
