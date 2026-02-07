'use client';

import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { useState } from 'react';
import { format } from 'date-fns';
import { useLanguage } from '@/context/LanguageContext';

interface BookingFormData {
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
    specialRequests?: string;
}

interface BookingFormProps {
    roomId: number;
    roomName: string;
}

export function BookingForm({ roomId, roomName }: BookingFormProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const { t } = useLanguage();

    const onSubmit = async (data: BookingFormData) => {
        setStatus('submitting');
        try {
            await api.post('/bookings', {
                ...data,
                roomId,
                adults: +data.adults,
                children: +data.children,
            });
            setStatus('success');
            reset();
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">{t.booking.successTitle}</h3>
                <p>{t.booking.successDesc}</p>
                <button onClick={() => setStatus('idle')} className="mt-4 underline text-sm">{t.booking.newRequest}</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-700">
            <h3 className="text-xl font-bold mb-4">{roomName} {t.booking.title}</h3>

            {/* Date Pickers (Simplified as native date inputs for now) */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t.booking.labels.checkIn}</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded-md dark:bg-zinc-900 border-gray-300 dark:border-zinc-700"
                        {...register('checkInDate', { required: t.booking.validation.checkInRequired })}
                    />
                    {errors.checkInDate && <span className="text-red-500 text-xs">{errors.checkInDate.message}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t.booking.labels.checkOut}</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded-md dark:bg-zinc-900 border-gray-300 dark:border-zinc-700"
                        {...register('checkOutDate', { required: t.booking.validation.checkOutRequired })}
                    />
                    {errors.checkOutDate && <span className="text-red-500 text-xs">{errors.checkOutDate.message}</span>}
                </div>
            </div>

            {/* Guest Count */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t.booking.labels.adults}</label>
                    <input
                        type="number"
                        min="1"
                        className="w-full p-2 border rounded-md dark:bg-zinc-900 border-gray-300 dark:border-zinc-700"
                        {...register('adults', { required: true, min: 1 })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t.booking.labels.children}</label>
                    <input
                        type="number"
                        min="0"
                        className="w-full p-2 border rounded-md dark:bg-zinc-900 border-gray-300 dark:border-zinc-700"
                        {...register('children', { required: true, min: 0 })}
                    />
                </div>
            </div>

            {/* Personal Info */}
            <div>
                <label className="block text-sm font-medium mb-1">{t.booking.labels.name}</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md dark:bg-zinc-900 border-gray-300 dark:border-zinc-700"
                    {...register('guestName', { required: t.booking.validation.nameRequired })}
                />
                {errors.guestName && <span className="text-red-500 text-xs">{errors.guestName.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t.booking.labels.email}</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded-md dark:bg-zinc-900 border-gray-300 dark:border-zinc-700"
                        {...register('guestEmail', { required: t.booking.validation.emailRequired })}
                    />
                    {errors.guestEmail && <span className="text-red-500 text-xs">{errors.guestEmail.message}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t.booking.labels.phone}</label>
                    <input
                        type="tel"
                        className="w-full p-2 border rounded-md dark:bg-zinc-900 border-gray-300 dark:border-zinc-700"
                        {...register('guestPhone', { required: t.booking.validation.phoneRequired })}
                    />
                    {errors.guestPhone && <span className="text-red-500 text-xs">{errors.guestPhone.message}</span>}
                </div>
            </div>

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium mb-1">{t.booking.labels.specialRequests}</label>
                <textarea
                    rows={3}
                    className="w-full p-2 border rounded-md dark:bg-zinc-900 border-gray-300 dark:border-zinc-700"
                    {...register('specialRequests')}
                />
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-zinc-900 text-white py-3 rounded-lg font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
                {status === 'submitting' ? t.booking.submitting : t.booking.submit}
            </button>

            {status === 'error' && (
                <div className="text-red-500 text-sm text-center">{t.booking.error}</div>
            )}
        </form>
    );
}
