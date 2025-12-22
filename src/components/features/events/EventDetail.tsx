// app/events/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Star, ChevronRight } from 'lucide-react';

// Types
interface EventBundle {
  id: string;
  title: string;
  description: string;
  image: string;
  isActive?: boolean;
}

interface AIInsight {
  text: string;
}

interface EventData {
  id: string;
  title: string;
  date: number;
  month: string;
  location: string;
  rating: number;
  reviews: string;
  attendees: number;
  attendeeAvatars: string[];
  coverImage: string;
  description: string;
  mapImage: string;
  distance: string;
  driveTime: string;
  lat?: number;
  lng?: number;
  aiInsights: AIInsight[];
  bundles: EventBundle[];
}

// Mock Data
const eventData: EventData = {
  id: '1',
  title: 'Summer Night Music Festival 2025',
  date: 24,
  month: 'Jul',
  location: 'Madison Square Garden, New York',
  rating: 4.8,
  reviews: '2,845 reviews',
  attendees: 250,
  attendeeAvatars: [
    'https://i.pravatar.cc/36?img=1',
    'https://i.pravatar.cc/36?img=2',
    'https://i.pravatar.cc/36?img=3',
    'https://i.pravatar.cc/36?img=4',
  ],
  coverImage: 'https://picsum.photos/1106/320?random=1',
  description:
    'Experience an unforgettable evening filled with live performances from top artists across multiple genres. This year\'s festival promises spectacular light shows, world-class sound systems, and an atmo...',
  mapImage: 'https://picsum.photos/474/384?random=2',
  lat: 31.451309,
  lng: 74.451361,
  distance: '2.5 km',
  driveTime: '15 min drive',
  aiInsights: [
    { text: 'High evening footfall expected' },
    { text: 'Younger audience (18-35)' },
    { text: 'Peak demand: 6:30-9:30 PM' },
    { text: 'Ideal for fast prep bundles.' },
  ],
  bundles: [
    { id: '1', title: 'Peak Hour Hit', description: 'Created by AI to improve order value and optimize inventory movement ...', image: 'https://picsum.photos/300/200?random=3', isActive: true },
    { id: '2', title: 'Peak Hour Hit', description: 'Created by AI to improve order value and optimize inventory movement .....', image: 'https://picsum.photos/300/200?random=4' },
    { id: '3', title: 'Peak Hour Hit', description: 'Created by AI to improve order value and optimize inventory ...', image: 'https://picsum.photos/300/200?random=5' },
  ],
};

export default function EventDetailPage({ eventProp }: { eventProp?: Partial<EventData> | null } = {}) {
  const data: Partial<EventData> = eventProp ?? eventData;

  // Sample fallback content to show when AI insights or bundles are empty
  const sampleInsights: AIInsight[] = [
    { text: 'Sample insight: Expect high evening footfall.' },
    { text: 'Sample insight: Younger audience, 18-35.' },
    { text: 'Sample insight: Peak demand around 7 PM.' },
  ];

  const aiInsightsToRender: AIInsight[] = ((data.aiInsights ?? eventData.aiInsights) || []).length > 0
    ? (data.aiInsights ?? eventData.aiInsights)
    : sampleInsights;

  const sampleBundles: EventBundle[] = [
    { id: 'd1', title: 'Sample Bundle 1', description: 'Dummy bundle to illustrate layout.', image: 'https://picsum.photos/300/200?random=11' },
    { id: 'd2', title: 'Sample Bundle 2', description: 'Dummy bundle to illustrate layout.', image: 'https://picsum.photos/300/200?random=12' },
    { id: 'd3', title: 'Sample Bundle 3', description: 'Dummy bundle to illustrate layout.', image: 'https://i.pravatar.cc/36?img=13' },
  ];

  const bundlesToRender: EventBundle[] = ((data.bundles ?? eventData.bundles) || []).length > 0
    ? (data.bundles ?? eventData.bundles)
    : sampleBundles;

  // compute map source from event coordinates if available; otherwise use existing embed
    const _lat = data.lat ?? eventData.lat;
    const _lng = data.lng ?? eventData.lng;
    const fallbackEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.649721512732!2d74.44936127339164!3d31.451308796579855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391909c751468cf9%3A0xbd0a3b97fc0f7ec3!2sGame%20On%20-%20Sports%20Complex!5e0!3m2!1sen!2s!4v1766155032994!5m2!1sen!2s";
    const mapSrc = (_lat != null && _lng != null)
      ? `https://www.google.com/maps?q=${encodeURIComponent(String(_lat))},${encodeURIComponent(String(_lng))}&z=15&output=embed`
      : fallbackEmbed;
  
    // Public maps search URL for the "open in maps" action (use coords when available, otherwise fall back to location string)
    const mapsSearchUrl = (_lat != null && _lng != null)
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(String(_lat))},${encodeURIComponent(String(_lng))}`
      : `https://www.google.com/maps?q=${encodeURIComponent(String(data.location ?? eventData.location ?? ''))}`;

  // Server page will pass `null` when an event wasn't found.
  // Distinguish between `undefined` (no prop -> use local mock preview)
  // and explicit `null` (lookup failed) -> show Not Found UI.
  if (eventProp === null) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white transition-all duration-300 ease-in-out">
        <div className="max-w-lg text-center p-8 transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold mb-4 transition-all duration-300 ease-in-out">Event not found</h2>
          <p className="text-sm text-gray-600 mb-6 transition-all duration-300 ease-in-out">We couldn't find the event you were looking for. It may have been removed or the link is incorrect.</p>
          <div className="flex items-center justify-center gap-4 transition-all duration-300 ease-in-out">
            <Link href="/Events" className="px-4 py-2 rounded-md bg-[#00674E] text-white transition-all duration-300 ease-in-out hover:bg-emerald-700 hover:scale-105 active:scale-95">
              Back to events
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white transition-all duration-300 ease-in-out">
      {/* Header */}
      <header className="bg-white px-4 py-4 sm:px-6 transition-all duration-300 ease-in-out">
            <Link href="/Events" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-300 ease-in-out group">
          <ArrowLeft className="h-5 w-5 transition-all duration-300 ease-in-out group-hover:-translate-x-1" />
          <span className="font-medium transition-all duration-300 ease-in-out group-hover:text-emerald-700">Back</span>
        </Link>
      </header>

      {/* Main Content */}
        <main className="w-full px-[60px] py-6 transition-all duration-300 ease-in-out">
        <h1 className="mb-4 font-lato text-[32px] font-medium text-black transition-all duration-300 ease-in-out hover:text-emerald-800">
          Event Detail
        </h1>

        <div className="space-y-4 transition-all duration-300 ease-in-out">
          {/* Banner */}
          <div className="w-full h-[320px] rounded-[24px] overflow-hidden relative bg-gray-200 transition-all duration-500 ease-in-out hover:shadow-xl group">
            <Image src={data.coverImage ?? eventData.coverImage} alt={(data.title ?? eventData.title) as string} fill className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-103" priority />
            <div className="absolute w-[83px] h-[84px] right-[24px] top-[12px] flex flex-col items-center rounded-lg bg-white px-3 py-2 shadow transition-all duration-300 ease-in-out hover:scale-100 hover:shadow-lg">
              <span className="text-[14px] font-lato font-normal text-[#787777] transition-all duration-300 ease-in-out">{data.month ?? eventData.month}</span>
              <span className="text-[30px] font-lato font-normal text-black transition-all duration-300 ease-in-out">{data.date ?? eventData.date}</span>
            </div>
          </div>

          {/* Two-column area below banner: left = main content, right = location */}
          <div className="w-full transition-all duration-300 ease-in-out">
            <div className="w-full flex flex-col lg:flex-row lg:items-start lg:gap-8 transition-all duration-300 ease-in-out">
              {/* Left column: main content */}
              <div className="w-full lg:flex-1 space-y-4 transition-all duration-300 ease-in-out">
                <div className="transition-all duration-300 ease-in-out">
                  <div className="mb-2 text-[32px] font-lato font-medium text-black sm:text-[32px] transition-all duration-300 ease-in-out hover:text-emerald-800">
                    {data.title ?? eventData.title}
                  </div>
                  <div className="mb-2 flex items-center gap-2 text-gray-500 sm:mb-3 transition-all duration-300 ease-in-out group">
                    <MapPin className="h-4 w-4 transition-all duration-300 ease-in-out group-hover:text-emerald-600" />
                    <span className="text-[16px] font-lato font-normal text-[#787777] transition-all duration-300 ease-in-out group-hover:text-emerald-700">
                      {data.location ?? eventData.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 transition-all duration-300 ease-in-out">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 transition-all duration-300 ease-in-out hover:scale-100" />
                    <span className="font-lato font-normal text-[18px] text-black transition-all duration-300 ease-in-out">
                      {eventData.rating}
                    </span>
                    <span className="text-[18px] font-lato font-normal text-[#787777] transition-all duration-300 ease-in-out">
                      ({eventData.reviews})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-[#F9FAFB] p-4 w-full max-w-[693px] h-[88px] group">
                  <div className="flex -space-x-2 transition-all duration-300 ease-in-out">
                      {(data.attendeeAvatars ?? eventData.attendeeAvatars).map((avatar, index) => (
                        <div key={index} className="h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-gray-300 transition-all duration-300 ease-in-out hover:scale-100 hover:border-emerald-200 hover:shadow-md">
                          <Image src={avatar} alt={`Attendee ${index + 1}`} width={48} height={48} className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110" />
                        </div>
                      ))}
                    </div>
                    <span className="ml-3 text-[16px] font-lato font-normal text-[#4A5565] transition-all duration-300 ease-in-out group-hover:text-emerald-700">
                      {data.attendees ?? eventData.attendees}K People Joined
                    </span>
                </div>

                <div className="transition-all duration-300 ease-in-out">
                  <h3 className="mb-2 text-[20px] font-lato font-semibold text-black transition-all duration-300 ease-in-out hover:text-emerald-800">
                    Description
                  </h3>
                  <div className="text-[16px] w-full max-w-[693px] font-lato font-normal leading-relaxed text-[#787777] sm:text-base transition-all duration-300 ease-in-out">
                    {data.description ?? eventData.description}
                  </div>
                  <button className="mt-2 text-[12px] font-medium text-[#00674E] hover:text-emerald-700 transition-all duration-300 ease-in-out hover:gap-1 inline-flex items-center group">
                    Read More <ChevronRight className="w-3 h-3 transition-all duration-300 ease-in-out group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="transition-all duration-300 ease-in-out">
                  <h3 className="mb-3 text-[20px] font-lato font-semibold text-black sm:mb-4 sm:text-lg transition-all duration-300 ease-in-out hover:text-emerald-800">
                    AI Event Insights
                  </h3>
                  <div className="space-y-1 w-full max-w-[693px] sm:space-y-2 rounded-lg border border-[#EEEEEE] bg-[#FBFCFF] ml-[-8px]">
                    {(aiInsightsToRender || []).map((insight, index) => (
                      <div key={index} className="px-3 py-2 text-[16px] font-lato font-normal text-[#787777] sm:px-4 sm:py-2 transition-all duration-300 ease-in-out hover:translate-x-1 hover:text-emerald-700 border-b border-gray-50 last:border-b-0 group">
                        <div className="flex items-center gap-2 transition-all duration-300 ease-in-out">
                          
                          {insight.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="transition-all duration-300 ease-in-out">
                  <div className="mb-3 sm:mb-4 transition-all duration-300 ease-in-out">
                    <h3 className="text-[20px] font-lato font-semibold text-black sm:text-lg mr-2 transition-all duration-300 ease-in-out hover:text-emerald-800">
                      Recommended Bundles for This Event
                    </h3>
                    <p className="text-[14px] font-lato font-normal text-[#787777] sm:text-sm transition-all duration-300 ease-in-out">
                      Suggested based on event type, timing, and past sales.
                    </p>
                  </div>

                  {/* Parent container with fixed width/height and gap */}
                  <div className="w-full max-w-[1096px] h-[358px] flex items-start gap-[23px]  ">
                    {(bundlesToRender || []).slice(0, 3).map((bundle) => (
                      <div key={bundle.id} className="w-[350px] h-[357px] rounded-[24px] p-4 bg-[#FAFAFA] flex flex-col gap-[8px]">
                        <BundleCardCompact bundle={bundle as EventBundle} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: location card */}
              <aside className="w-full lg:w-[424px] flex-shrink-0 lg:h-auto mt-2 lg:mt-[-10px] lg:ml-[-130px] lg:sticky lg:top-0 lg:self-start transition-all duration-300 ease-in-out">
            <div className="rounded-[12px] transition-all duration-300 ease-in-out hover:shadow-lg">
              <div className="pt-3 px-4 transition-all duration-300 ease-in-out">
                <h3 className="mb-2 text-[20px] font-lato font-semibold text-black">
                  Location
                </h3>
              </div>
              <div className="px-4 pb-4 transition-all duration-300 ease-in-out">
                <div className="relative w-full h-[300px] rounded-[24px] overflow-hidden bg-gray-200 ">
                  {/* Google Maps iframe */}
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 transition-all duration-300 ease-in-out group-hover:scale-103"
                  />
                  
                  {/* Overlay elements */}
                  {/* <div className="absolute left-3 top-3 z-10 flex flex-col gap-2 transition-all duration-300 ease-in-out">
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md">
                      {data.distance ?? eventData.distance}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md">
                      {data.driveTime ?? eventData.driveTime}
                    </span>
                  </div> */}
                  
                  {/* <a 
                    href={mapsSearchUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#00674E] text-white shadow-lg hover:bg-emerald-600 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl active:scale-95"
                  >
                    <svg className="h-6 w-6 rotate-45 transition-all duration-300 ease-in-out group-hover:rotate-90" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                    </svg>
                  </a> */}
                </div>
              </div>
            </div>
          </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Bundle Card Component
function BundleCardCompact({ bundle }: { bundle: EventBundle }) {
  return (
    <div className="flex flex-col h-full transition-all duration-300 ease-in-out group">
      <div className="relative w-full h-[200px] rounded-[12px] overflow-hidden bg-gray-100 transition-all duration-500 ease-in-out group-hover:scale-103">
        {bundle.isActive && (
          <span className="absolute left-3 top-3 rounded bg-emerald-500 px-2 py-1 text-xs font-medium text-white transition-all duration-300 ease-in-out hover:scale-103 hover:shadow-md">
            Active
          </span>
        )}
        <Image src={bundle.image || 'https://picsum.photos/300/200'} alt={bundle.title} fill className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
      </div>

      <div className="mt-2 flex-1 flex flex-col gap-[8px] transition-all duration-300 ease-in-out">
        <h4 className="text-[18px] font-lato font-semibold text-black line-clamp-1 transition-all duration-300 ease-in-out group-hover:text-emerald-800">
          {bundle.title}
        </h4>
        <p className="text-[16px] font-lato text-gray-500 line-clamp-2 transition-all duration-300 ease-in-out group-hover:text-gray-700">
          {bundle.description}
        </p>
        <div className="mt-auto transition-all duration-300 ease-in-out">
          <button className="w-full h-[44px] rounded-[12px] bg-white border border-emerald-500 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-95 group/btn">
            <span className="transition-all duration-300 ease-in-out group-hover/btn:text-emerald-700">
              Go Live
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// More Icon Component
function MoreIcon() {
    return (
      <div className="w-full flex flex-col lg:flex-row lg:items-start lg:gap-2 transition-all duration-300 ease-in-out">
        <svg className="h-4 w-4 text-gray-500 transition-all duration-300 ease-in-out hover:text-emerald-600 hover:scale-106" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      </div>
  );
}