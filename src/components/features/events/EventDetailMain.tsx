"use client";

import React, { useEffect, useState } from 'react';
import EventDetailPage from '@/components/features/events/EventDetail';
import { getEventBySlugClient } from '@/app/api/events/getEventBySlugClient';

export default function EventDetailMain({ slug }: { slug: string }) {
  const [mapped, setMapped] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    setMapped(null);

    (async () => {
      try {
        const event = await getEventBySlugClient(slug);
        if (!mounted) return;
        if (!event) {
          setError('Event not found');
          setLoading(false);
          return;
        }

        const dateStr = event.event_date || event.start_date || event.event_datetime || event.start_datetime;
        const dateObj = dateStr ? new Date(dateStr) : null;
        const day = dateObj ? String(dateObj.getDate()).padStart(2, '0') : undefined;
        const month = dateObj ? dateObj.toLocaleString('default', { month: 'short' }) : undefined;

        const mappedEvent = {
          id: String(event.id),
          title: event.name,
          description: event.description ?? event.name ?? '',
          coverImage: event.image_url || event.image || `https://picsum.photos/1106/320?random=${event.id}`,
          mapImage: (event.latitude && event.longitude)
            ? `https://picsum.photos/seed/map${event.id}/474/384`
            : `https://picsum.photos/474/384?random=${event.id}`,
          lat: event.latitude ?? event.lat ?? null,
          lng: event.longitude ?? event.lon ?? event.lng ?? null,
          date: day ? Number(day) : undefined,
          month,
          location: event.venue?.name ?? (event.location ?? ''),
          attendees: event.attendees ?? 0,
          attendeeAvatars: [
            'https://i.pravatar.cc/36?img=5',
            'https://i.pravatar.cc/36?img=6',
            'https://i.pravatar.cc/36?img=7',
          ],
          distance: event.distance ?? undefined,
          driveTime: event.drive_time ?? undefined,
          bundles: [],
          aiInsights: [],
        };

        setMapped(mappedEvent);
      } catch (e: any) {
        setError(e?.message ?? String(e));
      } finally {
        setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [slug]);

  if (loading) return <div className="p-6 text-center">Loading event...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!mapped) return <div className="p-6 text-center">Event not available</div>;

  return <EventDetailPage eventProp={mapped} />;
}
