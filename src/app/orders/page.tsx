"use client";

import React from "react";
import MainHeader from '@/components/ui/MainHeader';
import OrdersList from '@/components/features/Front-office/OrdersList';
import { AppLayout } from '@/components/layout/AppLayout';

export default function OrdersPage() {
  return (
    <AppLayout>
      <div className="px-6">
        <MainHeader variant="frontoffice" />
      </div>
      <div className="p-6 w-full box-border">
        <OrdersList />
      </div>
    </AppLayout>
  );
}
