import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


interface CreateBundleHeaderProps {
  step?: number;
  onNext?: () => void;
  onBack?: () => void;
}

export default function CreateBundleHeader({ step = 1, onNext, onBack }: CreateBundleHeaderProps) {
  const router = useRouter();
  
  const handleBackClick = () => {
    if (step > 1 && onBack) {
      onBack(); // Step 2 ya 3 se previous step par jao
    } else if (step === 1) {
      router.back(); // Step 1 se previous page par jao
    }
  };

  return (
    <>
      {/* Back Button - Material Icon */}
      <button
        className="absolute top-[36px] left-4 flex items-center gap-2 bg-transparent border-none shadow-none text-[#222] text-[18px] font-normal cursor-pointer hover:opacity-70 transition-opacity"
        onClick={handleBackClick}
      >
        <span className="material-symbols-outlined text-[28px] text-[#222]">
          arrow_back
        </span>
        <span className="font-lato font-normal text-[18px] text-[#222]">Back</span>
      </button>

      {/* Top Section - Title, Buttons, Progress Bar */}
      <div className="w-full mt-[97px] mx-auto px-[81px] flex flex-col gap-6 opacity-100">
        {/* Upper Sub Container */}
        <div className="flex justify-between items-center w-full">
          {/* Left Side Title */}
          <span className="font-lato font-medium text-[32px] leading-[38px] text-[#1E1E1E] flex items-center opacity-100 whitespace-nowrap">
            Create Bundle
          </span>
          {/* Right Side Buttons */}
          <div className="flex gap-4">
            {/* Cancel Button */}
            <Button
              variant="cancelBtn"
              className="w-[101px] h-[48px] gap-2 px-4 py-3"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            {/* Next Button */}
            <Button
              variant="nextBtn"
              onClick={onNext}
              className="w-[155px] h-[48px] gap-2 px-4 py-2"
            >
              {step === 3 ? 'Save' : 'Next'}
            </Button>
          </div>
        </div>
        
        {/* Lower Progress Bar */}
        <div className="flex items-center gap-3 w-full h-[6px]">
          <div className="flex-1 h-[6px] rounded-lg bg-[#00674E] opacity-100" />
          <div className={`flex-1 h-[6px] rounded-lg ${step >= 2 ? 'bg-[#00674E]' : 'bg-gray-200'} opacity-100`} />
          <div className={`flex-1 h-[6px] rounded-lg ${step === 3 ? 'bg-[#00674E]' : 'bg-gray-200'} opacity-100`} />
        </div>
      </div>
    </>
  );
}