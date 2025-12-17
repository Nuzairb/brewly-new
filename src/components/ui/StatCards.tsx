"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardPercentage } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type StatCardItem = {
  title: string;
  value: string;
  percentage?: string;
  description?: string;
  variant?: 'default' | 'dashboard1' | 'dashboard2' | 'active-bundle' | 'revenue' | 'slow-moving' | 'weather' | 'sales' | 'suggestion' | 'events' | 'outcome' | 'performance' | undefined;
  valueVariant?: 'default' | 'dashboard1-value' | 'dashboard2-value' | 'sales-amount' | 'weather-temp' | 'weather-temp-low' | 'bundle-number' | 'bundle-amount' | undefined;
  descVariant?: 'default' | 'dashboard1-desc' | 'dashboard2-desc' | 'running-campaigns' | 'this-month' | 'this-week' | 'weather-condition' | 'weather-feels-like' | 'see-all' | 'legend-label' | 'legend-value' | undefined;
};

export default function StatCards({
  cards,
  animatedValues,
  animatedPercentages,
  isVisible = true,
}: {
  cards: StatCardItem[];
  animatedValues?: string[];
  animatedPercentages?: string[];
  isVisible?: boolean;
}) {
  return (
    <div className="grid grid-cols-4 w-full gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={cn(
            "transform transition-all duration-300 ease-out hover:scale-[1] hover:shadow-2xl hover:-translate-y-1 cursor-pointer border border-[#1A5D4A]/20 hover:border-[#1A5D4A]/40",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <div className="w-full min-h-[117px] flex flex-col justify-between transition-all duration-300">
            <CardHeader variant={card.variant} className="transition-colors duration-300">
              {card.title}
              <CardPercentage value={animatedPercentages?.[index] ?? card.percentage ?? ''} />
            </CardHeader>
            <CardContent variant={card.valueVariant} className="transition-all duration-300">
              {animatedValues?.[index] ?? card.value}
            </CardContent>
            <CardDescription variant={card.descVariant} className="transition-opacity duration-300">
              {card.description}
            </CardDescription>
          </div>
        </Card>
      ))}
    </div>
  );
}
