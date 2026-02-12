import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar } from '../ui/Calendar';
import { format } from 'date-fns';

interface BookingFormData {
    guestName: string;
    guestEmail: string;
    guestPhone: string;
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
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useLanguage();

    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [bookedDates, setBookedDates] = useState<{ from: string; to: string }[]>([]);

    useEffect(() => {
        // Fetch booked dates for this room
        api.get(`/bookings/availability/${roomId}`)
            .then(res => setBookedDates(res.data))
            .catch(console.error);
    }, [roomId]);

    const handleDateSelect = (start: Date | null, end: Date | null) => {
        setCheckIn(start);
        setCheckOut(end);
    };

    const onSubmit = async (data: BookingFormData) => {
        if (!checkIn || !checkOut) {
            setErrorMessage(t.booking?.datesRequired || "Please select check-in and check-out dates");
            return;
        }

        setStatus('submitting');
        setErrorMessage('');
        try {
            await api.post('/bookings', {
                ...data,
                roomId,
                checkInDate: format(checkIn, 'yyyy-MM-dd'),
                checkOutDate: format(checkOut, 'yyyy-MM-dd'),
                adults: +data.adults,
                children: +data.children,
            });
            setStatus('success');
            reset();
            setCheckIn(null);
            setCheckOut(null);
            // Re-fetch availability to update calendar immediately
            api.get(`/bookings/availability/${roomId}`).then(res => setBookedDates(res.data));
        } catch (error: any) {
            console.error('Booking Error:', error);
            setStatus('error');
            const message = error.response?.data?.message;
            setErrorMessage(Array.isArray(message) ? message.join(', ') : (message || t.booking?.error || "Booking failed"));
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20">
            <h3 className="text-2xl font-playfair font-bold mb-6 text-zinc-800 dark:text-white border-b border-zinc-100 dark:border-zinc-700 pb-4">
                {roomName} <span className="text-blue-500 font-normal text-base block mt-1">{t.booking.title}</span>
            </h3>

            {/* Custom Calendar */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300 uppercase tracking-wider text-xs">
                    {t.booking.labels.dates || "Select Dates"}
                </label>
                <Calendar
                    bookedDates={bookedDates}
                    onSelectRange={handleDateSelect}
                    checkIn={checkIn}
                    checkOut={checkOut}
                />
                {(!checkIn || !checkOut) && errorMessage && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
            </div>

            {/* Selected Dates Summary */}
            {(checkIn && checkOut) && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex justify-between items-center text-sm mb-6 border border-blue-100 dark:border-blue-900/30">
                    <div>
                        <span className="text-zinc-500 dark:text-zinc-400 block text-xs uppercase">Check-in</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{format(checkIn, 'dd MMM yyyy')}</span>
                    </div>
                    <div className="text-zinc-300">➜</div>
                    <div className="text-right">
                        <span className="text-zinc-500 dark:text-zinc-400 block text-xs uppercase">Check-out</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{format(checkOut, 'dd MMM yyyy')}</span>
                    </div>
                </div>
            )}

            {/* Guest Count */}
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">{t.booking.labels.adults}</label>
                    <input
                        type="number"
                        min="1"
                        className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        {...register('adults', { required: true, min: 1 })}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">{t.booking.labels.children}</label>
                    <input
                        type="number"
                        min="0"
                        className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        {...register('children', { required: true, min: 0 })}
                    />
                </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">{t.booking.labels.name}</label>
                    <input
                        type="text"
                        className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                        {...register('guestName', { required: t.booking.validation.nameRequired })}
                    />
                    {errors.guestName && <span className="text-red-500 text-xs mt-1 block">{errors.guestName.message}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">{t.booking.labels.email}</label>
                        <input
                            type="email"
                            className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                            {...register('guestEmail', { required: t.booking.validation.emailRequired })}
                        />
                        {errors.guestEmail && <span className="text-red-500 text-xs mt-1 block">{errors.guestEmail.message}</span>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">{t.booking.labels.phone}</label>
                        <input
                            type="tel"
                            className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                            {...register('guestPhone', { required: t.booking.validation.phoneRequired })}
                        />
                        {errors.guestPhone && <span className="text-red-500 text-xs mt-1 block">{errors.guestPhone.message}</span>}
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">{t.booking.labels.specialRequests}</label>
                <textarea
                    rows={3}
                    className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    {...register('specialRequests')}
                />
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
                {status === 'submitting' ? t.booking.submitting : t.booking.submit}
            </button>

            {status === 'error' && (
                <div className="text-red-500 text-sm text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
                    {errorMessage || t.booking.error}
                </div>
            )}
        </form>
    );
}
