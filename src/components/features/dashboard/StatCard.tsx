"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardPercentage } from '@/components/ui/card';

interface StatCardData {
  title: string;
  value: string;
  percentage: string;
  description: string;
  variant: "active-bundle" | "revenue" | "slow-moving";
  valueVariant: "bundle-number" | "bundle-amount";
  descVariant: "running-campaigns" | "this-month" | "this-week";
  className: string;
}

// Dashboard stat cards data
const statCardsData: StatCardData[] = [
  {
    title: "AI Profit",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue",
    valueVariant: "bundle-amount",
    descVariant: "this-month",
    className: "w-[61px] self-end font-lato"
  },
  {
    title: "AI Upsell Revenue",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue",
    valueVariant: "bundle-amount",
    descVariant: "this-month",
    className: "w-[61px] self-end font-lato"
  },
  {
    title: "Labor Cost Saved",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue",
    valueVariant: "bundle-amount",
    descVariant: "this-month",
    className: "w-[61px] self-end font-lato"
  },
  {
    title: "Waste Reduced",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue",
    valueVariant: "bundle-amount",
    descVariant: "this-month",
    className: "w-[61px] self-end font-lato"
  }
];

// Reusable function for stat cards
export const renderStatCards = () => {
  const [animatedValues, setAnimatedValues] = useState<number[]>(statCardsData.map(() => 0));
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>(statCardsData.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const targetValues = statCardsData.map(card => 
      parseFloat(card.value.replace(/[^0-9.]/g, ''))
    );

    const targetPercentages = statCardsData.map(card => 
      parseFloat(card.percentage.replace(/[^0-9.]/g, ''))
    );

    const duration = 2000; // 2 seconds animation
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);

      setAnimatedValues(targetValues.map(target => 
        Math.floor(target * easeOutQuad)
      ));

      setAnimatedPercentages(targetPercentages.map(target => 
        Math.floor(target * easeOutQuad)
      ));

      if (currentStep >= steps) {
        setAnimatedValues(targetValues);
        setAnimatedPercentages(targetPercentages);
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCardsData.map((card, index) => (
        <Card
          key={index}
          className={`transform transition-all duration-700 hover:scale-100 hover:shadow-xl cursor-pointer ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          {/* Header with title and percentage on right */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <CardHeader className="transition-colors duration-300 text-sm font-medium text-gray-700">
              {card.title}
            </CardHeader>
            <CardPercentage 
              className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs font-medium bg-[#05C16833]" 
              value={"12%"}
            >
              +{animatedPercentages[index]}%
            </CardPercentage>
          </div>
          
          <div className="p-4">
            <CardContent 
              variant={card.valueVariant}
              className="transition-all duration-300 hover:scale-100 text-xl font-bold text-gray-900"
            >
              +{animatedValues[index].toLocaleString()} AED
            </CardContent>
            <CardDescription variant={card.descVariant} className="transition-opacity duration-300 text-xs text-gray-500 mt-2">
              {card.description}
            </CardDescription>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default renderStatCards;