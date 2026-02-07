'use client';

import { Hero } from '@/components/ui/Hero';
import { BookingForm } from '@/components/forms/BookingForm';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

interface Room {
  id: number;
  name: Record<string, string>;
  description: Record<string, string>;
  price: number;
  capacity: number;
  images: string[];
}

export default function RoomDetailPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    if (id) {
      api.get(`/rooms/${id}`)
        .then(res => setRoom(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="text-center py-20">{t.rooms.loading}</div>;
  if (!room) return <div className="text-center py-20">{t.rooms.noRooms}</div>;

  // Helper to get localized content safely
  const getName = () => room.name[language] || room.name['EN'] || Object.values(room.name)[0] || '';
  const getDescription = () => room.description[language] || room.description['EN'] || Object.values(room.description)[0] || '';

  return (
    <div>
      <Hero
        title={getName()}
        subtitle={`€${room.price} ${t.rooms.night}`}
        backgroundImage={room.images?.[0]}
        height="h-[60vh]"
      >
      </Hero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Details Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description Card */}
            <div className="backdrop-blur-xl bg-white/50 dark:bg-zinc-900/60 border border-white/20 p-8 rounded-3xl shadow-xl">
              <h2 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100 flex items-center gap-3">
                <span>📝</span> {t.rooms.detail.descriptionTitle}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                <p>{getDescription()}</p>
              </div>

              {/* Amenities Section inside the card */}
              <div className="mt-10 pt-10 border-t border-zinc-200 dark:border-zinc-700">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">✨</span>
                  {t.rooms.detail.featuresTitle}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/10 hover:bg-white/60 transition-colors">
                    <span className="text-2xl">👥</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{room.capacity} {t.rooms.capacity}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/10 hover:bg-white/60 transition-colors">
                    <span className="text-2xl">📐</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">35 m²</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/10 hover:bg-white/60 transition-colors">
                    <span className="text-2xl">📶</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{t.rooms.features.wifi}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/10 hover:bg-white/60 transition-colors">
                    <span className="text-2xl">❄️</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{t.rooms.features.ac}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/10 hover:bg-white/60 transition-colors">
                    <span className="text-2xl">📺</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{t.rooms.features.tv}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/10 hover:bg-white/60 transition-colors">
                    <span className="text-2xl">🛁</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{t.rooms.features.minibar}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Gallery */}
            <div className="backdrop-blur-xl bg-white/50 dark:bg-zinc-900/60 border border-white/20 p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-100 flex items-center gap-3">
                <span>📸</span> {t.gallery.title}
              </h3>
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600 scrollbar-track-transparent">
                {room.images && room.images.map((img, idx) => (
                  <div key={idx} className="flex-none w-80 h-64 relative snap-center rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-white/10">
                    <Image
                      src={img}
                      alt={`${getName()} ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                ))}
                {(!room.images || room.images.length === 0) && (
                  <div className="text-zinc-500 italic text-center w-full py-10">Görsel bulunmuyor.</div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Form Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm roomId={room.id} roomName={getName()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
