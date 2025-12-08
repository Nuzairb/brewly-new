"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const data = [
  { month: "Jan", revenue: 20000, expenses: 10000, orders: 500 },
  { month: "Feb", revenue: 40000, expenses: 20000, orders: 800 },
  { month: "Mar", revenue: 60000, expenses: 30000, orders: 1200 },
  { month: "Apr", revenue: 80000, expenses: 40000, orders: 1500 },
  { month: "May", revenue: 100000, expenses: 50000, orders: 1700 },
  { month: "Jun", revenue: 110000, expenses: 60000, orders: 1890 },
  { month: "Jul", revenue: 120000, expenses: 70000, orders: 1600 },
  { month: "Aug", revenue: 140000, expenses: 90000, orders: 1800 },
  { month: "Sep", revenue: 160000, expenses: 110000, orders: 2000 },
  { month: "Oct", revenue: 180000, expenses: 130000, orders: 2200 },
  { month: "Nov", revenue: 210000, expenses: 150000, orders: 2500 },
  { month: "Dec", revenue: 240000, expenses: 170000, orders: 2700 },
];

// Custom tooltip for Figma design
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    // Find the orders value (from June data point)
    const ordersValue = 1890; // This would come from actual data point
    
    return (
      <div className="bg-black text-white rounded-lg p-3 font-lato shadow-lg">
        <div className="mb-2 text-sm font-medium">June 22, 2025</div>
        <div className="text-[15px] font-normal">{ordersValue.toLocaleString()} orders</div>
      </div>
    );
  }
  return null;
};

export function SalesPerformanceChart() {
  return (
  <Card className="w-full h-[533px] bg-white border border-gray-100 rounded-[16px] p-[20px_24px]  mt-[24px]">
      {/* Header Section */}
      <div className="mb-8">
        {/* Title Row */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-lato font-normal text-base leading-6 text-gray-500">
            Sales & Upsell Performance
          </h3>
          
          {/* Legend */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="font-lato text-sm font-normal text-gray-500">
                Revenue
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-black" />
              <span className="font-lato text-sm font-normal text-gray-500">
                Expenses
              </span>
            </div>
          </div>
        </div>
        
        {/* Value and Percentage Row */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-baseline gap-2">
            <span className="font-lato font-normal text-[32px] leading-10 text-black">
              AED 240.8K
            </span>
            <span className="font-lato font-semibold text-sm leading-5 text-green-600 bg-green-100 px-2 py-0.5 rounded">
              +24.6%
            </span>
          </div>
          
          {/* Date Dropdown */}
          <div className="flex items-center">
            <select className="font-lato font-normal text-sm text-gray-500 border border-gray-200 rounded-lg px-3 pr-8 py-2 bg-white cursor-pointer appearance-none bg-no-repeat bg-[right_12px_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%3E%3Cpath%20d%3D%22M1%201.5L6%206.5L11%201.5%22%20stroke%3D%22%23787777%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]">
              <option>Jan 2024 - Dec 2024</option>
              <option>Jan 2024 - Jun 2024</option>
              <option>Jul 2024 - Dec 2024</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="w-full h-[300px] gap-6 mt-30">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            {/* Grid Lines */}
            <CartesianGrid 
              stroke="#F3F4F6" 
              horizontal={true}
              vertical={false}
              strokeDasharray="3 3"
            />
            
            {/* X Axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#6B7280',
                fontSize: 12,
                fontFamily: 'Lato',
                fontWeight: 400,
              }}
              padding={{ left: 10, right: 10 }}
            />
            
            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#6B7280',
                fontSize: 12,
                fontFamily: 'Lato',
                fontWeight: 400,
              }}
              tickFormatter={(value) => {
                if (value === 0) return '0K';
                if (value === 25000) return '25K';
                if (value === 50000) return '50K';
                if (value === 100000) return '100K';
                if (value === 150000) return '150K';
                if (value === 200000) return '200K';
                if (value === 250000) return '250K';
                return '';
              }}
              domain={[0, 250000]}
              ticks={[0, 25000, 50000, 100000, 150000, 200000, 250000]}
            />
            
            {/* Tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            
            {/* Revenue Area with Gradient */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="transparent"
              fill="url(#revenueGradient)"
              fillOpacity={1}
              dot={false}
              activeDot={false}
            />
            
            {/* Expenses Area with Gradient */}
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="transparent"
              fill="url(#expensesGradient)"
              fillOpacity={1}
              dot={false}
              activeDot={false}
            />
            
            {/* Revenue Line */}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 6,
                stroke: '#3B82F6',
                strokeWidth: 2,
                fill: '#fff'
              }}
            />
            
            {/* Expenses Line */}
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#1F2937"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 6,
                stroke: '#1F2937',
                strokeWidth: 2,
                fill: '#fff'
              }}
            />
            
            {/* Gradient Definitions */}
            <defs>
              {/* Blue gradient for Revenue */}
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              
              {/* Black gradient for Expenses */}
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1F2937" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#1F2937" stopOpacity={0} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      
    </Card>
  );
}