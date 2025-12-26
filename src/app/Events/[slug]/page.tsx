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

  // no-op: removed temporary debug logging

  // Map backend shape to EventDetail partial shape
  let mapped = null;
  if (event) {
    const dateStr = event.event_date || event.start_date || event.event_datetime || event.start_datetime;
    const dateObj = dateStr ? new Date(dateStr) : null;
    const day = dateObj ? String(dateObj.getDate()).padStart(2, '0') : undefined;
    const month = dateObj ? dateObj.toLocaleString('default', { month: 'short' }) : undefined;

    // normalize bundles and insights into UI-friendly shapes
    const normalizeBundle = (b: any) => ({
      id: String(b?.id ?? b?.bundle_id ?? b?.uid ?? b?._id ?? ''),
      title: b?.title ?? b?.name ?? b?.bundle_name ?? 'Bundle',
      description: b?.description ?? b?.desc ?? b?.summary ?? '',
      image: b?.image_url ?? b?.image ?? b?.cover ?? `https://picsum.photos/300/200?random=${b?.id ?? Math.random()}`,
      isActive: Boolean(b?.is_active ?? b?.active ?? b?.isActive),
    });

    const normalizeInsight = (i: any) => {
      if (!i) return null;
      if (typeof i === 'string') return { text: i };
      if (i.text) return { text: i.text };
      if (i.title) return { text: i.title };
      return { text: String(i) };
    };

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
      bundles: (event.bundles ?? event.recommended_bundles ?? event.recommendations ?? []).map(normalizeBundle),
      aiInsights: (event.ai_insights ?? event.aiInsights ?? event.insights ?? []).map(normalizeInsight).filter(Boolean),
    };
  }

  return <EventDetailPage eventProp={mapped} />;
}
