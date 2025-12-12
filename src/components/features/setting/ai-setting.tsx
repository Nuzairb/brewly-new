import React, { useState } from "react";

export default function AISettings() {
	type SettingsKey = 'autoApprove' | 'weatherBased' | 'eventBased' | 'expiringItems' | 'slowMovers';
	const [settings, setSettings] = useState({
		autoApprove: true,
		weatherBased: true,
		eventBased: true,
		expiringItems: true,
		slowMovers: true,
		aggressiveness: 50,
		sessionTimeout: 30,
		apiPerMinute: 30,
		apiBurstLimit: 30,
	});
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
		<div className="flex flex-col gap-[20px] items-start w-full">
			{/* AI Controls Title */}
			<p className="font-lato font-medium leading-[24px] text-[#071437] text-[16px] w-full">
				AI Controls
			</p>

			{/* Auto-approve AI bundles */}
			<div className="flex items-start w-full">
				<div className="bg-white border border-[#f1f1f4] border-solid flex flex-col items-start overflow-clip rounded-[12px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] w-full">
					<div className="border-[#f1f1f4] border-b border-solid flex gap-[10px] h-[83px] items-center justify-end p-[20px] w-full">
						<div className="flex flex-col items-start justify-center flex-1">
							<p className="font-lato font-medium leading-[16px] text-[16px] text-[#1e1e1e] w-full">
								Auto-approve AI bundles
							</p>
						</div>
						<button
							className={`relative inline-flex h-[24px] w-[44px] items-center rounded-[100px] ${settings.autoApprove ? 'bg-[#00674E]' : 'bg-gray-300'}`}
							onClick={() => handleToggle('autoApprove')}
						>
							<span className={`inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(39,39,39,0.1)] transition ${settings.autoApprove ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
						</button>
					</div>
				</div>
			</div>

			{/* Predictions & Triggers */}
			<div className="bg-white border border-[#f1f1f4] border-solid flex flex-col items-start overflow-clip rounded-[12px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] w-full">
				<div className="border-[#f1f1f4] border-[0px_0px_1px] border-solid flex items-center p-[20px] w-full">
					<div className="flex flex-col gap-[24px] items-start justify-center flex-1 min-h-px min-w-px">
						<p className="font-lato font-medium leading-[16px] text-[16px] text-[#1e1e1e] w-full">
							Predictions & Triggers
						</p>
						<div className="flex flex-col gap-[16px] items-start w-full">
							<div className="flex gap-[16px] items-center w-full">
								<div className="bg-white flex flex-col gap-[8px] items-start justify-center flex-1 min-h-px min-w-px h-[26.803px]">
									<p className="font-inter font-normal leading-[20px] text-[#4b5675] text-[14px] whitespace-pre">
										Weather-based suggestions
									</p>
								</div>
								<button
									className={`relative inline-flex h-[24px] w-[44px] items-center rounded-[100px] ${settings.weatherBased ? 'bg-[#00674e]' : 'bg-gray-300'}`}
									onClick={() => handleToggle('weatherBased')}
								>
									<span className={`absolute inline-block h-[20px] w-[20px] rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(39,39,39,0.1)] transition top-[2px] ${settings.weatherBased ? 'left-[20px]' : 'left-[2px]'}`} />
								</button>
							</div>
							<div className="flex gap-[16px] items-center w-full">
								<div className="bg-white flex flex-col gap-[8px] items-start justify-center flex-1 min-h-px min-w-px h-[26.803px]">
									<p className="font-inter font-normal leading-[20px] text-[#4b5675] text-[14px] whitespace-pre">
										Event-based suggestions
									</p>
								</div>
								<button
									className={`relative inline-flex h-[24px] w-[44px] items-center rounded-[100px] ${settings.eventBased ? 'bg-[#00674e]' : 'bg-gray-300'}`}
									onClick={() => handleToggle('eventBased')}
								>
									<span className={`absolute inline-block h-[20px] w-[20px] rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(39,39,39,0.1)] transition top-[2px] ${settings.eventBased ? 'left-[20px]' : 'left-[2px]'}`} />
								</button>
							</div>
							<div className="flex gap-[16px] items-center w-full">
								<div className="bg-white flex flex-col gap-[8px] items-start justify-center flex-1 min-h-px min-w-px h-[26.803px]">
									<p className="font-inter font-normal leading-[20px] text-[#4b5675] text-[14px] whitespace-pre">
										Expiring items auto-bundles
									</p>
								</div>
								<button
									className={`relative inline-flex h-[24px] w-[44px] items-center rounded-[100px] ${settings.expiringItems ? 'bg-[#00674e]' : 'bg-gray-300'}`}
									onClick={() => handleToggle('expiringItems')}
								>
									<span className={`absolute inline-block h-[20px] w-[20px] rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(39,39,39,0.1)] transition top-[2px] ${settings.expiringItems ? 'left-[20px]' : 'left-[2px]'}`} />
								</button>
							</div>
							<div className="flex gap-[16px] items-center w-full">
								<div className="bg-white flex flex-col gap-[8px] items-start justify-center flex-1 min-h-px min-w-px h-[26.803px]">
									<p className="font-inter font-normal leading-[20px] text-[#4b5675] text-[14px] whitespace-pre">
										Pair slow movers with top sellers
									</p>
								</div>
								<button
									className={`relative inline-flex h-[24px] w-[44px] items-center rounded-[100px] ${settings.slowMovers ? 'bg-[#00674e]' : 'bg-gray-300'}`}
									onClick={() => handleToggle('slowMovers')}
								>
									<span className={`absolute inline-block h-[20px] w-[20px] rounded-full bg-white shadow-[0px_2px_4px_0px_rgba(39,39,39,0.1)] transition top-[2px] ${settings.slowMovers ? 'left-[20px]' : 'left-[2px]'}`} />
								</button>
							</div>
						</div>

						{/* AI Aggressiveness */}
						<div className="flex flex-col gap-[16px] items-start w-full">
							<div className="flex flex-col gap-[8px] items-start w-full">
								<div className="flex items-center justify-between w-full">
									<p className="font-lato font-medium leading-[16px] text-[16px] text-[#1e1e1e] whitespace-pre">
										AI Aggressiveness
									</p>
									<div className="flex gap-0 items-center">
										<p className="font-lato font-semibold leading-[20px] text-[#1e1e1e] text-[14px]">
											{getAggressivenessLabel()}
										</p>
									</div>
								</div>
								<div className="flex items-center justify-center w-full relative">
									<div className="bg-neutral-50 h-[6px] overflow-clip rounded-[33554400px] w-full relative flex-1 min-h-px min-w-px">
										<div
											className="absolute bg-[#00674e] bottom-0 left-0 top-0"
											style={{ right: `${100 - settings.aggressiveness}%` }}
										/>
									</div>
									<div
										className="absolute flex flex-col h-[16px] items-start top-[-5px]"
										style={{ left: `${settings.aggressiveness}%`, transform: 'translateX(-8px)' }}
									>
										<div className="bg-[#00674e] border-[#00674e] border border-solid rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[16px]" />
									</div>
									<input
										type="range"
										min="0"
										max="100"
										value={settings.aggressiveness}
										onChange={handleSliderChange}
										className="absolute w-full h-[16px] opacity-0 cursor-pointer"
									/>
								</div>
							</div>
							<div className="flex flex-col items-end w-full">
								<p className="font-inter font-normal leading-[20px] text-[#4b5675] text-[14px] text-right w-full">
									Controls how aggressively AI suggests bundles & discounts.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Others */}
			<div className="flex items-start w-full">
				<div className="bg-white border border-[#f1f1f4] border-solid flex flex-col h-[150px] items-start overflow-clip rounded-[12px] shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] w-full">
					<div className="border-[#f1f1f4] border-b border-solid flex h-[150px] items-center justify-end p-[20px] w-full">
						<div className="flex flex-col gap-[16px] items-start justify-center flex-1">
							<p className="font-lato font-medium leading-[16px] text-[16px] text-[#1e1e1e] w-full">
								Others
							</p>
							<div className="flex gap-[16px] items-start w-full">
								<div className="flex flex-col gap-[4px] items-start flex-1">
									<p className="font-inter font-normal leading-[20px] text-[#071437] text-[14px] whitespace-nowrap">
										Session Timeout Mintue
									</p>
									<div className="bg-white border border-[#eeeeee] border-solid flex gap-[8px] h-[56px] items-center px-[14px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full">
										<input
											type="number"
											value={settings.sessionTimeout}
											onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 30 }))}
											className="font-inter font-normal leading-[14px] text-[#252f4a] text-[13px] whitespace-nowrap w-full border-none outline-none bg-transparent"
										/>
									</div>
								</div>
								<div className="flex flex-col gap-[4px] items-start flex-1">
									<p className="font-inter font-normal leading-[20px] text-[#071437] text-[14px] whitespace-nowrap">
										API Request per minute
									</p>
									<div className="bg-white border border-[#eeeeee] border-solid flex gap-[8px] h-[56px] items-center px-[14px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full">
										<input
											type="number"
											value={settings.apiPerMinute}
											onChange={(e) => setSettings(prev => ({ ...prev, apiPerMinute: parseInt(e.target.value) || 30 }))}
											className="font-inter font-normal leading-[14px] text-[#252f4a] text-[13px] whitespace-nowrap w-full border-none outline-none bg-transparent"
										/>
									</div>
								</div>
								<div className="flex flex-col gap-[4px] items-start flex-1">
									<p className="font-inter font-normal leading-[20px] text-[#071437] text-[14px] whitespace-nowrap">
										API Burst Limit
									</p>
									<div className="bg-white border border-[#eeeeee] border-solid flex gap-[8px] h-[56px] items-center px-[14px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full">
										<input
											type="number"
											value={settings.apiBurstLimit}
											onChange={(e) => setSettings(prev => ({ ...prev, apiBurstLimit: parseInt(e.target.value) || 30 }))}
											className="font-inter font-normal leading-[14px] text-[#252f4a] text-[13px] whitespace-nowrap w-full border-none outline-none bg-transparent"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Save Button */}
			<div className="h-[44px] w-full relative">
				<div className="absolute bg-[#00674E] flex gap-[5px] items-center overflow-clip px-[16px] py-[12px] right-0 rounded-[6px] top-0 h-[44px] w-[140px]">
					<button
						onClick={handleSave}
						disabled={isSaving}
						className="font-inter font-medium leading-[14px] text-[16px] text-white tracking-[-0.16px] whitespace-nowrap w-full bg-transparent border-none cursor-pointer"
					>
						{isSaving ? 'Saving...' : isSaved ? 'Settings Saved!' : 'Save Settings'}
					</button>
				</div>
			</div>
		</div>
	);
}
