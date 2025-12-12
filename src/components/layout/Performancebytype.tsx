"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PerformanceCard, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PerformanceItem {
  title: string;
  subtitle: string;
  percentage: number;
  color: string;
  value?: number;
}

interface PerformanceByTypeProps {
  title?: string;
  performanceData?: PerformanceItem[];
  loading?: boolean;
  loadingDelay?: number;
  showChart?: boolean;
  className?: string;
  animationDuration?: number;
}
const DEFAULT_PERFORMANCE_DATA: PerformanceItem[] = [
  { title: "AI Bundles", subtitle: "Smart automated promos", percentage: 36, color: "#FF6961", value: 12847 },
  { title: "Manual", subtitle: "Manager-crafted deals", percentage: 53, color: "#409CFF", value: 8452 },
  { title: "Event", subtitle: "Occasion-based offers", percentage: 78, color: "#FF2311", value: 18721 },
  { title: "Expiry", subtitle: "Clear stock fast", percentage: 36, color: "#6AC4DC", value: 6943 },
];

const PerformanceByType: React.FC<PerformanceByTypeProps> = ({
  title = "Performance by Type",
  performanceData = DEFAULT_PERFORMANCE_DATA,
  loading = false,
  loadingDelay = 500,
  showChart = true,
  className = "",
  animationDuration = 0.8,
}) => {
  const [isLoading, setIsLoading] = useState(loading);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"bars" | "chart">("bars");

  // Memoize normalized percentages so the reference stays stable
  const normalizedData = useMemo(() => {
    const total = performanceData.reduce((sum, item) => sum + item.percentage, 0) || 1;
    return performanceData.map(item => ({
      ...item,
      normalizedPercentage: (item.percentage / total) * 100,
    }));
  }, [performanceData]);

  useEffect(() => {
    setAnimatedPercentages(new Array(performanceData.length).fill(0));
  }, [performanceData]);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), loadingDelay);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [loading, loadingDelay]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Animate normalized percentages
  useEffect(() => {
    if (!isVisible || isLoading) return;

    const duration = animationDuration * 1000;
    const steps = 60;

    const timers: Array<number> = [];

    normalizedData.forEach((item, index) => {
      const increment = item.normalizedPercentage / steps;
      let current = 0;
      let step = 0;

      let timerId: any = null;
      timerId = window.setInterval(() => {
        step++;
        current += increment;

        if (step >= steps) {
          setAnimatedPercentages(prev => {
            const newArr = [...prev];
            newArr[index] = Math.round(item.normalizedPercentage);
            return newArr;
          });
          if (timerId !== null) {
            clearInterval(timerId);
          }
        } else {
          setAnimatedPercentages(prev => {
            const newArr = [...prev];
            newArr[index] = Math.floor(current);
            return newArr;
          });
        }
      }, Math.max(1, Math.floor(duration / steps)));

      timers.push(timerId);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, [isVisible, isLoading, animationDuration, normalizedData]);

  const ProgressBar = ({ normalizedPercentage, color, animatedPercentage, originalPercentage }: { 
    normalizedPercentage: number; 
    color: string; 
    animatedPercentage: number;
    originalPercentage: number;
  }) => (
    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden relative">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: '0%' }}
        animate={{ width: `${animatedPercentage ?? 0}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.div
        className="absolute top-0 right-2 text-xs font-medium text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {originalPercentage}%
      </motion.div>
    </div>
  );

  if (isLoading) {
    return (
      <PerformanceCard className={`${className} animate-pulse`}>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full h-6 bg-gray-200 rounded"></div>
          <div className="w-full flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full flex flex-col gap-2">
                <div className="w-full flex justify-between items-start">
                  <div className="h-5 w-24 bg-gray-200 rounded"></div>
                  <div className="h-5 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </PerformanceCard>
    );
  }

  const chartData = normalizedData.map(item => ({
    name: item.title,
    value: item.value ?? item.percentage * 100,
    percentage: item.percentage,
    color: item.color,
    subtitle: item.subtitle
  }));

  return (
    <PerformanceCard 
      className={`${className} transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <CardHeader variant="performance" className="w-auto">
            {title}
          </CardHeader>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "bars" ? (
            <motion.div
              key="bars"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-4"
            >
              {normalizedData.map((item, index) => (
                <motion.div
                  key={index}
                  className="w-full flex flex-col gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div className="w-full flex justify-between items-start">
                    <CardTitle variant="performance-title" className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.title}
                    </CardTitle>
                    <CardTitle variant="performance-subtitle" className="text-right">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {item.subtitle}
                      </motion.span>
                    </CardTitle>
                  </div>
                  <ProgressBar 
                    normalizedPercentage={item.normalizedPercentage}
                    color={item.color}
                    animatedPercentage={animatedPercentages[index] || 0}
                    originalPercentage={item.percentage}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="chart"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full h-64 mt-4"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Value"]}
                    labelFormatter={(label) => `Type: ${label}`}
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {normalizedData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[12px] font-lato font-medium text-gray-600">{item.title}</span>
                    <span className=" font-lato text-[11px] font-normal text-gray-800">{item.subtitle}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PerformanceCard>
  );
};

export type { PerformanceItem, PerformanceByTypeProps };
export { PerformanceByType };
export default PerformanceByType;