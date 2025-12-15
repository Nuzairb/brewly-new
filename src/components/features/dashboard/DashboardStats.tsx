"use client";

import React from "react";
import { renderStatCards } from "./StatCard";

interface DashboardStatsProps {
  cardClassName?: string;
}

export function DashboardStats({ cardClassName }: DashboardStatsProps) {
  return renderStatCards({ cardClassName });
}
