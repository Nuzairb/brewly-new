import React, { useState } from "react";
import { CheckCircle, Save } from "lucide-react";

export default function AISettings() {
	type SettingsKey = 'weatherBased' | 'eventBased' | 'expiringItems' | 'slowMovers';
	const [settings, setSettings] = useState({
		weatherBased: true,
		eventBased: false,
		expiringItems: true,
		slowMovers: false,
		aggressiveness: 50,
		sessionTimeout: 30,
		apiPerMinute: 60,
		apiBurstLimit: 100,
	});
	const [barColor, setBarColor] = useState("#00674E");
	const [isSaving, setIsSaving] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	const handleToggle = (key: SettingsKey) => {
		setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
		setIsSaved(false);
	};
	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prev) => ({ ...prev, aggressiveness: parseInt(e.target.value) }));
		setIsSaved(false);
	};
	const handleBarColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBarColor(e.target.value);
		setIsSaved(false);
	};
	const handleSave = () => {
		setIsSaving(true);
		setTimeout(() => {
			setIsSaving(false);
			setIsSaved(true);
		}, 1200);
	};
	const getAggressivenessLabel = () => {
		if (settings.aggressiveness < 33) return "Low";
		if (settings.aggressiveness < 66) return "Balanced";
		return "High";
	};

	return (
		<div className="w-full bg-white  p-0 flex flex-col gap-8 min-h-[calc(100vh-48px)]">

			{/* Main Content */}
			<div className="w-full px-8 pt-6 pb-8">
				<h2 className="font-lato font-medium text-[16px] leading-6 mb-6">AI Controls</h2>
				{/* AI Controls */}
				<div className="w-full flex items-center justify-between mb-6 px-8 py-4 rounded-xl border border-[#F1F1F4] bg-white min-h-[83px]">
					<span className="font-lato font-medium text-[16px] leading-4">Auto-approve AI bundles</span>
					<button className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.weatherBased ? 'bg-[#00674E]' : 'bg-gray-300'}`}
						onClick={() => handleToggle('weatherBased')}>
						<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.weatherBased ? 'translate-x-6' : 'translate-x-1'}`} />
					</button>
				</div>
				{/* Predictions & Triggers */}
				<div className="w-full rounded-xl border border-[#F1F1F4] bg-white mb-6 px-8 py-8 min-h-[335px]">
					<div className="flex items-center justify-between mb-6">
						<span className="font-lato font-medium text-[16px] leading-4">Predictions & Triggers</span>
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<span className="font-inter font-normal text-[14px] leading-5 text-[#787777]">Weather-based suggestions</span>
							<button className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.weatherBased ? 'bg-[#00674E]' : 'bg-gray-300'}`}
								onClick={() => handleToggle('weatherBased')}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.weatherBased ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<span className="font-inter font-normal text-[14px] leading-5 text-[#787777]">Event-based suggestions</span>
							<button className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.eventBased ? 'bg-[#00674E]' : 'bg-gray-300'}`}
								onClick={() => handleToggle('eventBased')}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.eventBased ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<span className="font-inter font-normal text-[14px] leading-5 text-[#787777]">Pair slow movers with top sellers</span>
							<button className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.slowMovers ? 'bg-[#00674E]' : 'bg-gray-300'}`}
								onClick={() => handleToggle('slowMovers')}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.slowMovers ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<span className="font-inter font-normal text-[14px] leading-5 text-[#787777]">Expiring items auto-bundles</span>
							<button className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.expiringItems ? 'bg-[#00674E]' : 'bg-gray-300'}`}
								onClick={() => handleToggle('expiringItems')}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.expiringItems ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
					</div>
					{/* AI Aggressiveness */}
					<div className="mt-8">
						<div className="flex items-center mb-2">
							<span className="font-lato font-medium text-[16px] leading-4 text-[#1E1E1E]">AI Aggressiveness</span>
							<div className="flex-1 mx-6">
								<input
									type="range"
									
									min="0"
									max="100"
									value={settings.aggressiveness}
									onChange={handleSliderChange}
									className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#00674E] accent-transparent" 
									
								/>
							</div>
							<span className="font-lato font-medium text-[16px] leading-4">{getAggressivenessLabel()}</span>
						</div>
						<div className="flex items-center gap-2 mt-2">
							<label htmlFor="barColor" className="font-inter font-normal text-[14px] leading-5 text-[#787777]">Bar Color:</label>
							<input
								id="barColor"
								type="color"
								value={barColor}
								onChange={handleBarColorChange}
								className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer align-middle"
							/>
							<span className="font-inter font-normal text-[14px] leading-5 text-[#787777]">{barColor}</span>
						</div>
						<p className="font-inter font-normal text-[14px] leading-5 text-[#787777] text-right mt-2">Controls how aggressively AI suggests bundles & discounts.</p>
					</div>
				</div>
				{/* Others */}
				<div className="w-full max-w-[1112px] rounded-xl border border-[#F1F1F4] bg-white mb-6 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<label className="font-lato font-medium text-[16px] leading-4 mb-2 block">Session Timeout Minute</label>
						<input
							type="number"
							min="1"
							max="120"
							value={settings.sessionTimeout}
							onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 30 }))}
							className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] font-inter font-normal text-[14px] leading-5"
						/>
					</div>
					<div>
						<label className="font-lato font-medium text-[16px] leading-4 mb-2 block">API Request per minute</label>
						<input
							type="number"
							min="1"
							max="120"
							value={settings.apiPerMinute}
							onChange={(e) => setSettings(prev => ({ ...prev, apiPerMinute: parseInt(e.target.value) || 30 }))}
							className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] font-inter font-normal text-[14px] leading-5"
						/>
					</div>
					<div>
						<label className="font-lato font-medium text-[16px] leading-4 mb-2 block">API Burst Limit</label>
						<input
							type="number"
							min="1"
							max="120"
							value={settings.apiBurstLimit}
							onChange={(e) => setSettings(prev => ({ ...prev, apiBurstLimit: parseInt(e.target.value) || 30 }))}
							className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] font-inter font-normal text-[14px] leading-5"
						/>
					</div>
				</div>
				{/* Save Button */}
				<div className="flex justify-end w-full">
					<button
						onClick={handleSave}
						disabled={isSaving}
						className="w-[140px] h-[44px] rounded-md px-4 py-3 bg-[#00674E] text-white font-inter font-medium text-[16px] flex items-center justify-center whitespace-nowrap"
					>
						{isSaving ? (
							'Saving...'
						) : isSaved ? (
							'Settings Saved!'
						) : (
							'Save Settings'
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
