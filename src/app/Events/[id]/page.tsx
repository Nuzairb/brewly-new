import React from 'react';
import EventDetailPage from '@/components/features/events/EventDetail';
import { getEventById } from '@/app/api/events/getEvents';

interface Props {
  params: { id: string };
}

export default async function EventDetailRoute({ params }: Props) {
  const { id } = params;
  // Attempt to fetch event server-side; fall back to mock if fetch fails
  let event = null;
  try {
    event = await getEventById(id);
  } catch (e) {
    event = null;
  }
  // Map backend event shape to EventDetail's expected partial shape
  let mapped = null;
  if (event) {
    const dateStr = event.event_date || event.start_date || event.event_datetime || event.start_datetime;
    const dateObj = dateStr ? new Date(dateStr) : null;
    const day = dateObj ? String(dateObj.getDate()).padStart(2, '0') : undefined;
    const month = dateObj ? dateObj.toLocaleString('default', { month: 'short' }) : undefined;

    mapped = {
      id: String(event.id),
      title: event.name,
      description: event.description ?? event.name ?? '',
      coverImage: event.image_url || event.image || `https://picsum.photos/1106/320?random=${event.id}`,
      mapImage: (event.latitude && event.longitude)
        ? `https://picsum.photos/seed/map${event.id}/474/384`
        : `https://picsum.photos/474/384?random=${event.id}`,
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
  }

  return <EventDetailPage eventProp={mapped} />;
}
