'use client';

import { Hero } from '@/components/ui/Hero';
import { RoomCard } from '@/components/ui/RoomCard';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

// Define Room type locally or import
interface Room {
    id: number;
    name: Record<string, string>;
    description: Record<string, string>;
    price: number;
    capacity: number;
    images: string[];
}

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        // Fetch rooms from API
        api.get('/rooms')
            .then(res => setRooms(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <Hero
                title={t.rooms.title}
                subtitle={t.rooms.subtitle}
                height="h-[50vh]"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {loading ? (
                    <div className="text-center py-20">{t.rooms.loading}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.length > 0 ? (
                            rooms.map(room => (
                                <RoomCard key={room.id} room={room} />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 text-zinc-500">
                                {t.rooms.noRooms}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
