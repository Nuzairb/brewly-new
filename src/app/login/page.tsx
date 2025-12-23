"use client";
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-66px)] flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm border">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 block mb-1">Email</label>
            <Input placeholder="you@example.com" type="email" />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Password</label>
            <Input placeholder="••••••••" type="password" />
          </div>

          <Button className="w-full">Sign in</Button>
        </div>
      </div>
    </main>
  );
}
