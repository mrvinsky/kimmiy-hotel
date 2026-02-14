'use client';

import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ImageUpload } from '@/components/admin/ImageUpload';

type Language = 'EN' | 'SR' | 'ZH';

export default function EditRoomPage() {
    const { register, handleSubmit, setValue, reset } = useForm();
    const router = useRouter();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<Language>('EN');
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            api.get(`/rooms/${id}`)
                .then(res => {
                    const room = res.data;
                    // Populate fields
                    setValue('price', room.price);
                    setValue('capacity', room.capacity);
                    setValue('totalStock', room.totalStock || 1);
                    setImages(room.images || []);
                    if (room.amenities && Array.isArray(room.amenities)) {
                        setValue('amenities', room.amenities.join(', '));
                    }


                    // Handle multi-language fields
                    if (typeof room.name === 'object') {
                        setValue('name_EN', room.name.EN || '');
                        setValue('name_SR', room.name.SR || '');
                        setValue('name_ZH', room.name.ZH || '');
                    } else {
                        // Legacy string fallback
                        setValue('name_EN', room.name);
                    }

                    if (typeof room.description === 'object') {
                        setValue('description_EN', room.description.EN || '');
                        setValue('description_SR', room.description.SR || '');
                        setValue('description_ZH', room.description.ZH || '');
                    } else {
                        // Legacy string fallback
                        setValue('description_EN', room.description);
                    }

                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    alert('Could not load room details');
                    router.push('/admin/rooms');
                });
        }
    }, [id, setValue, router]);

    const onSubmit = async (data: any) => {
        try {
            const name = {
                EN: data.name_EN,
                SR: data.name_SR,
                ZH: data.name_ZH
            };
            const description = {
                EN: data.description_EN,
                SR: data.description_SR,
                ZH: data.description_ZH
            };

            // Process amenities
            const amenities = data.amenities
                ? data.amenities.split(',').map((item: string) => item.trim()).filter(Boolean)
                : [];

            await api.patch(`/rooms/${id}`, {
                name,
                description,
                price: +data.price,
                capacity: +data.capacity,
                totalStock: +data.totalStock,
                images: images,
                amenities: amenities
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            router.push('/admin/rooms');
        } catch (err) {
            console.error(err);
            alert('Update failed');
        }
    };

    const tabs: { id: Language; label: string }[] = [
        { id: 'EN', label: 'English 🇬🇧' },
        { id: 'SR', label: 'Srpski 🇷🇸' },
        { id: 'ZH', label: '中文 🇨🇳' },
    ];

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Edit Room</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">

                {/* Language Tabs */}
                <div className="flex border-b border-gray-200 dark:border-zinc-700 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 font-medium text-sm transition-colors relative ${activeTab === tab.id
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Localized Fields */}
                <div className="space-y-4">
                    {tabs.map((tab) => (
                        <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Room Name ({tab.label})</label>
                                <input
                                    {...register(`name_${tab.id}`, { required: true })}
                                    placeholder={`e.g. Deluxe Room (${tab.id})`}
                                    className="w-full p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description ({tab.label})</label>
                                <textarea
                                    {...register(`description_${tab.id}`, { required: true })}
                                    rows={4}
                                    placeholder={`Room description... (${tab.id})`}
                                    className="w-full p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <div>
                        <label className="block text-sm font-medium mb-1">Price (€)</label>
                        <input
                            type="number"
                            {...register('price', { required: true })}
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Capacity</label>
                        <input
                            type="number"
                            {...register('capacity', { required: true })}
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Room Count</label>
                        <input
                            type="number"
                            {...register('totalStock', { required: true, min: 1 })}
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
                        />
                    </div>
                    {/* Amenities Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Amenities (comma separated)</label>
                        <input
                            type="text"
                            {...register('amenities')}
                            placeholder="wifi, tv, ac, minibar..."
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
                        />
                        <p className="text-xs text-zinc-500 mt-1">Keys: wifi, tv, ac, minibar, tea_coffee...</p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-4">Images</label>
                    <ImageUpload
                        value={images}
                        onChange={(newImages) => setImages(newImages)}
                    />
                </div>

                <div className="flex gap-4">
                    <button type="button" onClick={() => router.back()} className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="w-full bg-zinc-900 text-white py-3 rounded-lg font-bold hover:bg-zinc-800 transition-colors">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
