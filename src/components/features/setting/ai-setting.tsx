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
		<div className="w-full bg-white rounded-xl shadow-sm p-0 flex flex-col gap-8" style={{ minHeight: 'calc(100vh - 48px)' }}>

			{/* Main Content */}
			<div className="w-full px-8 pt-6 pb-8">
				<h2 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', fontStyle: 'Medium', lineHeight: '24px', letterSpacing: 0, marginBottom: '24px' }}>AI Controls</h2>
				{/* AI Controls */}
				<div className="w-full flex items-center justify-between mb-6 px-8 py-4 rounded-xl border border-[#F1F1F4] bg-white" style={{ minHeight: 83 }}>
					<span style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: 16, fontStyle: 'Medium', lineHeight: '16px', letterSpacing: 0 }}>Auto-approve AI bundles</span>
					<button className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.weatherBased ? 'bg-[#00843D]' : 'bg-gray-300'}`}
						onClick={() => handleToggle('weatherBased')}>
						<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.weatherBased ? 'translate-x-6' : 'translate-x-1'}`} />
					</button>
				</div>
				{/* Predictions & Triggers */}
				<div className="w-full rounded-xl border border-[#F1F1F4] bg-white mb-6 px-8 py-8" style={{ minHeight: 335 }}>
					<div className="flex items-center justify-between mb-6">
						<span style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: 16, fontStyle: 'Medium', lineHeight: '16px', letterSpacing: 0 }}>Predictions & Triggers</span>
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, fontStyle: 'Regular', lineHeight: '20px', letterSpacing: 0, color: '#787777' }}>Weather-based suggestions</span>
							<button className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.weatherBased ? 'bg-green-600' : 'bg-gray-300'}`}
								onClick={() => handleToggle('weatherBased')}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.weatherBased ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, fontStyle: 'Regular', lineHeight: '20px', letterSpacing: 0, color: '#787777' }}>Event-based suggestions</span>
							<button className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.eventBased ? 'bg-[#00843D]' : 'bg-gray-300'}`}
								onClick={() => handleToggle('eventBased')}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.eventBased ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, fontStyle: 'Regular', lineHeight: '20px', letterSpacing: 0, color: '#787777' }}>Pair slow movers with top sellers</span>
							<button className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.slowMovers ? 'bg-[#00843D]' : 'bg-gray-300'}`}
								onClick={() => handleToggle('slowMovers')}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.slowMovers ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, fontStyle: 'Regular', lineHeight: '20px', letterSpacing: 0, color: '#787777' }}>Expiring items auto-bundles</span>
							<button className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.expiringItems ? 'bg-[#00843D]' : 'bg-gray-300'}`}
								onClick={() => handleToggle('expiringItems')}>
								<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.expiringItems ? 'translate-x-6' : 'translate-x-1'}`} />
							</button>
						</div>
					</div>
					{/* AI Aggressiveness */}
					<div className="mt-8">
						<div className="flex items-center mb-2">
							<span style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: 16, fontStyle: 'Medium', lineHeight: '16px', letterSpacing: 0, color: '#1E1E1E' }}>AI Aggressiveness</span>
							<div className="flex-1 mx-6">
								<input
									type="range"
									min="0"
									max="100"
									value={settings.aggressiveness}
									onChange={handleSliderChange}
									style={{ background: barColor }}
									className="w-full h-2 rounded-lg appearance-none cursor-pointer"
								/>
							</div>
							<span style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: 16, fontStyle: 'Medium', lineHeight: '16px', letterSpacing: 0 }}>{getAggressivenessLabel()}</span>
						</div>
						<div className="flex items-center gap-2 mt-2">
							<label htmlFor="barColor" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, fontStyle: 'Regular', lineHeight: '20px', letterSpacing: 0, color: '#787777' }}>Bar Color:</label>
							<input
								id="barColor"
								type="color"
								value={barColor}
								onChange={handleBarColorChange}
								className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer"
								style={{ verticalAlign: 'middle' }}
							/>
							<span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, fontStyle: 'Regular', lineHeight: '20px', letterSpacing: 0, color: '#787777' }}>{barColor}</span>
						</div>
						<p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 14, fontStyle: 'Regular', lineHeight: '20px', letterSpacing: 0, color: '#787777', textAlign: 'right', marginTop: '8px' }}>Controls how aggressively AI suggests bundles & discounts.</p>
					</div>
				</div>
				{/* Others */}
				<div style={{ width: 1112, borderRadius: 12, border: '1px solid #F1F1F4', background: '#fff', marginBottom: 24, padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
					<div>
						<label style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: 16, fontStyle: 'Medium', lineHeight: '16px', letterSpacing: 0, marginBottom: '8px', display: 'block' }}>Session Timeout Minute</label>
						<input
							type="number"
							min="1"
							max="120"
							value={settings.sessionTimeout}
							onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 30 }))}
							style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontFamily: 'Inter', fontWeight: 400, fontSize: 14, lineHeight: '20px' }}
						/>
					</div>
					<div>
						<label style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: 16, fontStyle: 'Medium', lineHeight: '16px', letterSpacing: 0, marginBottom: '8px', display: 'block' }}>API Request per minute</label>
						<input
							type="number"
							min="1"
							max="120"
							value={settings.apiPerMinute}
							onChange={(e) => setSettings(prev => ({ ...prev, apiPerMinute: parseInt(e.target.value) || 30 }))}
							style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontFamily: 'Inter', fontWeight: 400, fontSize: 14, lineHeight: '20px' }}
						/>
					</div>
					<div>
						<label style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: 16, fontStyle: 'Medium', lineHeight: '16px', letterSpacing: 0, marginBottom: '8px', display: 'block' }}>API Burst Limit</label>
						<input
							type="number"
							min="1"
							max="120"
							value={settings.apiBurstLimit}
							onChange={(e) => setSettings(prev => ({ ...prev, apiBurstLimit: parseInt(e.target.value) || 30 }))}
							style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontFamily: 'Inter', fontWeight: 400, fontSize: 14, lineHeight: '20px' }}
						/>
					</div>
				</div>
				{/* Save Button */}
				<div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
					<button
						onClick={handleSave}
						disabled={isSaving}
						style={{ width: 140, height: 44, borderRadius: 6, padding: '12px 16px', background: '#00674E', color: '#fff', fontFamily: 'Inter', fontWeight: 500, fontSize: 16, fontStyle: 'Medium', lineHeight: '14px', letterSpacing: '-1%', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}
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
