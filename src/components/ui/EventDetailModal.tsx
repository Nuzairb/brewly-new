"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import EventDetailMain from '@/components/features/events/EventDetailMain';

export default function EventDetailModal({ slug, onClose }: { slug: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-auto max-h-[90vh]">
        <div className="flex justify-end p-3">
          <button onClick={onClose} className="px-3 py-2 bg-gray-100 rounded">Close</button>
        </div>
        <div>
          <EventDetailMain slug={slug} />
        </div>
      </div>
    </div>
  );
}
