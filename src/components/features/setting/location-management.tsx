"use client";

import React, { useState } from "react";
import AddLocationModal from "./add-location-modal";
import { Pencil, Trash2, MapPin, AlertCircle } from "lucide-react";

const locations = [
	{ name: "Downtown Cafe", address: "123 Main St, City", contact: "+971 4 123 4567", status: "Active" },
	{ name: "Airport Kiosk", address: "Terminal 2, Gate B", contact: "+971 4 987 6543", status: "Active" },
	{ name: "Mall Outlet", address: "Level 1, Unit 45", contact: "+971 4 555 1212", status: "Active" },
];

export default function LocationManagement() {
	const [modalOpen, setModalOpen] = useState(false);
	const [hoveredAction, setHoveredAction] = useState<number | null>(null);

	const handleOpenModal = () => setModalOpen(true);
	const handleCloseModal = () => setModalOpen(false);

	const ActionButton = ({ icon: Icon, onClick, color = "#787777", label }: { icon: React.ElementType; onClick: () => void; color?: string; label?: string }) => (
		<button
			onClick={onClick}
			className="flex flex-col items-center justify-center p-2 rounded-lg bg-transparent border-none cursor-pointer transition-all duration-300 ease-out hover:bg-gray-100 hover:scale-110 hover:shadow-sm group relative"
			onMouseEnter={() => setHoveredAction(Date.now())}
			onMouseLeave={() => setHoveredAction(null)}
		>
			<Icon className="size-[16px] transition-all duration-300 ease-out" style={{ color }} strokeWidth={1.5} />
			{label && (
				<span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
					{label}
				</span>
			)}
		</button>
	);

	return (
		<>
			<div className="flex flex-col gap-5 items-start w-full">
				{/* Title and Button */}
				<div className="flex items-center justify-between w-full">
					<p className="font-lato font-medium text-[16px] text-[#071437]">Location Management</p>
					<button
						onClick={handleOpenModal}
						className="bg-[#1a5d4a] flex items-center justify-center px-4 py-2 rounded-lg border-none cursor-pointer transition-all duration-300 ease-out hover:bg-[#144b3a] hover:scale-[1.02] hover:shadow-lg active:scale-95"
					>
						<p className="font-lato font-medium text-[18px] text-[#faf8f3] text-center m-0 transition-all duration-300 ease-out">Add new location</p>
					</button>
				</div>

				{/* Table Container */}
				<div className="bg-white flex flex-col items-start p-0 rounded-xl w-full overflow-hidden transition-all duration-300 hover:shadow-md">
					<div className="flex flex-col items-start min-w-full">
						{/* Table Header */}
						<div className="border-[#f0eae4] border-b border-solid grid grid-cols-5 gap-0 w-full min-w-[1000px] transition-all duration-300">
							{["Name", "Address", "Contact", "Status", "Action"].map((header, idx) => (
								<div key={idx} className={`flex flex-col p-4 ${idx === 4 ? 'items-end text-right' : 'items-start'}`}>
									<p className="font-lato font-semibold text-[14px] text-[#1e130e] transition-all duration-300 ease-out">{header}</p>
								</div>
							))}
						</div>

						{/* Table Body */}
					<div className="flex flex-col items-start w-full">
						{locations.map((loc, idx) => (
							<div key={loc.name} className="border-[#e3e8ee] border-b border-solid grid grid-cols-5 gap-0 w-full min-w-[1000px] transition-all duration-300 ease-out hover:bg-gray-50/50">
								<div className="flex flex-col items-start px-4 py-[22.5px]"><p className="font-lato font-medium text-[14px] text-[#1e130e] transition-all duration-300 ease-out">{loc.name}</p></div>
								<div className="flex flex-col items-start px-4 py-[22.5px]"><p className="font-lato font-medium text-[14px] text-[#787777] transition-all duration-300 ease-out">{loc.address}</p></div>
								<div className="flex flex-col items-start px-4 py-[22.5px]"><p className="font-lato font-medium text-[14px] text-[#787777] transition-all duration-300 ease-out">{loc.contact}</p></div>
								<div className="flex flex-col items-start px-4 py-[22.5px]">
									<span className="inline-block px-3 py-1 rounded-sm font-lato text-[12px] font-medium bg-[#E6F8F1] text-[#08724b]">{loc.status}</span>
								</div>
								<div className="flex gap-1 items-center justify-end px-4 py-[22.5px]">
									<ActionButton icon={Pencil} onClick={() => console.log('Edit', loc.name)} label="Edit Location" />
									<ActionButton icon={MapPin} onClick={() => console.log('View on map', loc.name)} label="Open Map" />
									<ActionButton icon={Trash2} onClick={() => console.log('Delete', loc.name)} color="#f36c44" label="Delete Location" />
								</div>
							</div>
						))}
					</div>
					</div>
				</div>

				{/* Warning Message */}
				<div className="w-full">
					<div className="bg-[rgba(243,108,68,0.1)] flex gap-3 items-start p-4 rounded-xl w-full transition-all duration-300 ease-out hover:shadow-sm hover:bg-[rgba(243,108,68,0.15)]">
						<AlertCircle className="size-[20px] text-[#f36c44] flex-shrink-0 transition-all duration-300 ease-out hover:scale-110 hover:rotate-12" strokeWidth={1.5} />
						<div className="flex flex-col items-start">
							<p className="font-lato font-normal text-[14px] text-[#f36c44] transition-all duration-300 ease-out">Changing a location may affect scheduled events and bundles</p>
						</div>
					</div>
				</div>
			</div>

			<AddLocationModal open={modalOpen} onOpenChange={setModalOpen} />
		</>
	);
}

