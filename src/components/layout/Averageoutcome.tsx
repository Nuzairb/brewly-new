"use client";

import React, { useState, useEffect } from "react";
import { OutcomeCard, CardHeader, CardTitle, PercentageBadge, LegendItem } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface LegendData {
  color: string;
  label: string;
  value: number;
}

interface AverageOutcomeProps {
  /** Card title */
  title?: string;
  /** Total orders value */
  totalOrders?: number;
  /** Percentage value with sign */
  percentage?: number;
  /** Array of legend items */
  legendData?: LegendData[];
  /** Additional CSS classes */
  className?: string;
  /** Loading state */
  loading?: boolean;
  /** Animation duration in seconds */
  animationDuration?: number;
}

const AverageOutcome: React.FC<AverageOutcomeProps> = ({
  title = "Average outcome",
  totalOrders = 180,
  percentage = 24.6,
  legendData = [
    { color: "#FF6961", label: "AI Bundles", value: 36 },
    { color: "#409CFF", label: "Manual", value: 53 },
    { color: "#FF2311", label: "Event", value: 78 },
    { color: "#6AC4DC", label: "Expiry", value: 36 },
  ],
  className = "",
  loading = false,
  animationDuration = 2,
}) => {
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Build conic gradient string for 4 colors
  const buildConicGradient = () => {
    const totalValue = legendData.reduce((sum, item) => sum + item.value, 0);
    const gapSize = 4; // White gap size in degrees
    const totalGaps = legendData.length * gapSize;
    const availableAngle = 360 - totalGaps;
    
    let gradient = "conic-gradient(from -90deg";
    let currentAngle = 0;
    
    legendData.forEach((item, index) => {
      // Calculate segment angle proportionally from available space
      const segmentAngle = (item.value / totalValue) * availableAngle;
      const endAngle = currentAngle + segmentAngle;
      
      // Add color segment
      gradient += `, ${item.color} ${currentAngle}deg ${endAngle}deg`;
      
      // Add white gap after each segment
      gradient += `, white ${endAngle}deg ${endAngle + gapSize}deg`;
      currentAngle = endAngle + gapSize;
    });
    
    gradient += ")";
    return gradient;
  };

  // Format percentage with sign
  const formattedPercentage = percentage >= 0 ? `+${percentage.toFixed(1)}%` : `${percentage.toFixed(1)}%`;

  // Trigger animation on mount
  useEffect(() => {
    
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animate total orders counter
  useEffect(() => {
    if (!isVisible || loading) return;

    const duration = animationDuration * 1000;
    const steps = 60;
    const increment = totalOrders / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      
      if (step >= steps) {
        setAnimatedTotal(totalOrders);
        clearInterval(timer);
      } else {
        setAnimatedTotal(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, loading, totalOrders, animationDuration]);

  if (loading) {
    return (
      <OutcomeCard className={`${className} animate-pulse`}>
        <div className="w-full mb-4 h-6 bg-gray-200 rounded"></div>
        <div className="w-full relative mx-auto -mt-5">
          <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-white flex items-center justify-center shadow-inner">
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl text-center h-8 w-16 bg-gray-200 rounded"></div>
                <div className="text-sm sm:text-base text-center whitespace-nowrap mt-1 h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </OutcomeCard>
    );
  }

  return (
    <OutcomeCard 
      className={`${className} transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <CardHeader variant="outcome" className="w-full mb-4 pr-6">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.span>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PercentageBadge percentage={formattedPercentage} />
        </motion.div>
      </CardHeader>

      <div className="w-full relative mx-auto -mt-5">
        <motion.div
          className="mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full flex items-center justify-center overflow-hidden"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
          style={{ 
            background: buildConicGradient(),
          }}
        >
          <motion.div 
            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-white flex items-center justify-center shadow-inner"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-center">
              <CardTitle 
                variant="outcome-total" 
                className="text-2xl sm:text-3xl lg:text-4xl text-center"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={animatedTotal}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {animatedTotal.toLocaleString()}
                  </motion.span>
                </AnimatePresence>
              </CardTitle>
              <CardTitle variant="outcome-label" className="text-sm sm:text-base text-center whitespace-nowrap mt-1">
                Total Order
              </CardTitle>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="w-full flex flex-wrap justify-center gap-3 sm:gap-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {legendData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + (index * 0.1) }}
          >
            <LegendItem 
              color={item.color} 
              label={item.label} 
              value={`${item.value}%`} 
            />
          </motion.div>
        ))}
      </motion.div>
    </OutcomeCard>
  );
};

// Export types
export type { LegendData, AverageOutcomeProps };

// Export component
export { AverageOutcome };
export default AverageOutcome;