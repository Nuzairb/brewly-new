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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white px-4 py-4 sm:px-6">
            <Link href="/Events" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </Link>
      </header>

      {/* Main Content */}
        <main className="w-full px-[100px] py-6">
        <h1 className="mb-4 font-lato text-[32px] font-medium text-black sm:mb-6 sm:text-2xl">Event Detail</h1>

        <div className="space-y-4">
          {/* Banner (unchanged) */}
          <div className="w-full h-[320px] rounded-[24px] overflow-hidden relative bg-gray-200">
            <Image src={data.coverImage ?? eventData.coverImage} alt={(data.title ?? eventData.title) as string} fill className="object-cover" priority />
            <div className="absolute w-[83px] h-[84px] right-[24px] top-[12px] ] flex flex-col items-center rounded-lg bg-white px-3 py-2 shadow">
              <span className="text-[14px] font-lato font-normal text-[#787777]">{data.month ?? eventData.month}</span>
              <span className="text-[30px] font-lato font-normal text-black">{data.date ?? eventData.date}</span>
            </div>
          </div>

          {/* Two-column area below banner: left = main content, right = location */}
          <div className="w-full">
            <div className="w-full flex flex-col lg:flex-row lg:items-start lg:gap-0">
              {/* Left column: main content */}
              <div className="w-full lg:flex-1 space-y-4">
                <div>
                  <h2 className="mb-2 text-[32px] font-lato font-medium text-black sm:text-xl">{data.title ?? eventData.title}</h2>
                  <div className="mb-2 flex items-center gap-2 text-gray-500 sm:mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-[16px] font-lato font-normal text-[#787777]">{data.location ?? eventData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-lato font-normal text-[18px] text-black">{eventData.rating}</span>
                    <span className="text-[18px] font-lato font-normal text-[#787777]">({eventData.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm w-full max-w-md">
                  <div className="flex -space-x-2">
                      {(data.attendeeAvatars ?? eventData.attendeeAvatars).map((avatar, index) => (
                        <div key={index} className="h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-gray-300">
                          <Image src={avatar} alt={`Attendee ${index + 1}`} width={36} height={36} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="ml-3 text-[16px] font-lato font-normal text-[#4A5565]">{data.attendees ?? eventData.attendees}K People Joined</span>
                </div>

                <div>
                  <h3 className="mb-2 text-[20px] font-lato font-semibold text-black sm:mb-3 sm:text-lg">Description</h3>
                  <div className="text-[16px] w-full max-w-[693px] font-lato font-normal leading-relaxed text-[#787777] sm:text-base">{data.description ?? eventData.description}</div>
                  <button className="mt-2 text-[12px] font-medium text-[#00674E] hover:text-emerald-700">Read More</button>
                </div>

                <div>
                  <h3 className="mb-3 text-[20px] font-lato font-semibold text-black sm:mb-4 sm:text-lg">AI Event Insights</h3>
                  <div className="space-y-2 w-full max-w-[693px] sm:space-y-3 rounded-lg border border-gray-100 bg-[#FBFCFF] shadow-sm ml-[-8px] ">
                    {(data.aiInsights ?? eventData.aiInsights).map((insight, index) => (
                      <div key={index} className=" px-3 py-2.5 text-[16px] font-lato font-normal text-[#787777] sm:px-4 sm:py-3">{insight.text}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-[20px] font-lato font-semibold text-black sm:text-lg mr-2">Recommended Bundles for This Event</h3>
                    <p className="text-[14px] font-lato font-normal text-[#787777] sm:text-sm">Suggested based on event type, timing, and past sales.</p>
                  </div>

                  {/* Parent container with fixed width/height and gap */}
                  <div className="w-full max-w-[1096px] h-[358px] flex items-start gap-[23px]">
                    {((data.bundles ?? eventData.bundles) || []).slice(0, 3).map((bundle) => (
                      <div key={bundle.id} className="w-[350px] h-[357px] rounded-[24px] p-4 bg-[#FAFAFA] flex flex-col gap-[8px]">
                        <BundleCardCompact bundle={bundle as EventBundle} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: location card (fixed width on large screens) */}
              <aside className="w-full lg:w-[380px] flex-shrink-0 lg:h-auto mt-2 lg:mt-0">
                <div className="rounded-[12px] bg-white ">
                  <div className="pt-3 px-4">
                    <h3 className="mb-2 text-[20px] font-lato font-semibold text-black">Location</h3>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="relative w-full h-[300px] rounded-[24px] overflow-hidden bg-gray-200">
                          <Image src={data.mapImage ?? eventData.mapImage} alt="Event Location Map" fill className="object-cover" />
                          <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow">{data.distance ?? eventData.distance}</span>
                            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow">{data.driveTime ?? eventData.driveTime}</span>
                          </div>
                      <button className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600">
                        <ChevronRight className="h-4 w-4" />
                      </button>
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
// Compact Bundle Card for the recommended section (matches requested design)
function BundleCardCompact({ bundle }: { bundle: EventBundle }) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full h-[200px] rounded-[12px] overflow-hidden bg-gray-100">
        {bundle.isActive && (
          <span className="absolute left-3 top-3 rounded bg-emerald-500 px-2 py-1 text-xs font-medium text-white">Active</span>
        )}
        <Image src={bundle.image || 'https://picsum.photos/300/200'} alt={bundle.title} fill className="object-cover" />
      </div>

      <div className="mt-2 flex-1 flex flex-col gap-[8px]">
        <h4 className="text-[18px] font-lato font-semibold text-black line-clamp-1">{bundle.title}</h4>
        <p className="text-[16px] font-lato text-gray-500 line-clamp-2">{bundle.description}</p>
        <div className="mt-auto">
          <button className="w-full h-[44px] rounded-[12px] bg-white border border-emerald-500 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50">Go Live</button>
        </div>
      </div>
    </div>
  );
}

// More Icon Component
function MoreIcon() {
    return (
      <div className="w-full flex flex-col lg:flex-row lg:items-start lg:gap-2">
        <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      </div>
  );
}