"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardPercentage,
} from '@/components/ui/card';

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
    title: "AI Upsell Revenue ",
    value: "+38,240 AED",
    percentage: "+12%",
    description: "This Month",
    variant: "revenue",
    valueVariant: "bundle-amount",
    descVariant: "this-month",
    className: "w-[61px] self-end font-lato"
  },
  {
    title: "Labor Cost Saved ",
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 opacity-100">
      {statCardsData.map((card, index) => (
        <Card key={index}>
          <div className="w-full min-h-[117px] flex flex-col justify-between opacity-100">
            <CardHeader variant={card.variant}>
              {card.title}
              <CardPercentage value={card.percentage} />
            </CardHeader>
            <CardContent variant={card.valueVariant}>
              {card.value}
            </CardContent>
            <CardDescription variant={card.descVariant} className={card.className}>
              {card.description}
            </CardDescription>
          </div>
        </Card>
      ))}
    </div>
  );
};
