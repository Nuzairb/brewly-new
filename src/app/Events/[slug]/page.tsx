import React from 'react';
import EventDetailPage from '@/components/features/events/EventDetail';
import { getEventBySlug, getEventById } from '@/app/api/events/getEvents';
import { redirect } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export default async function EventDetailBySlug({ params }: Props) {
  const { slug } = params;
  let event = null;
  try {
    // If the param looks like a numeric id, try fetching by id and redirect to canonical slug
    console.log('[EventDetailBySlug] param slug:', slug);
    if (/^\d+$/.test(String(slug))) {
      const byId = await getEventById(slug).catch(() => null);
      const resolved = byId?.slug ?? byId?.ticketmaster_id ?? String(byId?.id ?? slug);
      if (resolved && String(resolved) !== String(slug)) {
        // redirect to canonical slug
        redirect(`/Events/${encodeURIComponent(String(resolved))}`);
      }
      event = byId;
    } else {
      event = await getEventBySlug(slug).catch((err) => {
        console.error('[EventDetailBySlug] getEventBySlug error:', err);
        return null;
      });
    }
  } catch (e) {
    event = null;
  }

  // Map backend shape to EventDetail partial shape
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
  }

  return <EventDetailPage eventProp={mapped} />;
}
