'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { format } from 'date-fns';
import { Check, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await api.get('/bookings', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handeAction = async (id: number, action: 'approve' | 'reject') => {
    setLoading(true);
    try {
      await api.patch(`/bookings/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      loadBookings();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30';
      case 'REJECTED': return 'text-red-600 bg-red-50 dark:bg-red-900/30';
      default: return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Booking Management</h1>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-gray-50 dark:bg-zinc-800/50">
            <tr>
              <th className="p-4 font-medium text-zinc-500 text-sm">ID</th>
              <th className="p-4 font-medium text-zinc-500 text-sm">Guest</th>
              <th className="p-4 font-medium text-zinc-500 text-sm">Room</th>
              <th className="p-4 font-medium text-zinc-500 text-sm">Dates</th>
              <th className="p-4 font-medium text-zinc-500 text-sm">Status</th>
              <th className="p-4 font-medium text-zinc-500 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-gray-100 dark:border-zinc-800">
                <td className="p-4">#{booking.id}</td>
                <td className="p-4">
                  <div className="font-medium">{booking.guestName}</div>
                  <div className="text-xs text-zinc-500">{booking.guestEmail}</div>
                </td>
                <td className="p-4 text-sm">
                  {booking.room
                    ? (typeof booking.room.name === 'object'
                      ? (booking.room.name['EN'] || Object.values(booking.room.name)[0])
                      : booking.room.name)
                    : 'Deleted Room'}
                </td>
                <td className="p-4 text-sm">
                  {format(new Date(booking.checkInDate), 'dd/MM')} - {format(new Date(booking.checkOutDate), 'dd/MM/yyyy')}
                </td>
                <td className="p-4">
                  <span className={cn("px-2 py-1 rounded-full text-xs font-semibold", getStatusColor(booking.status))}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {booking.status === 'PENDING' && (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handeAction(booking.id, 'approve')}
                        disabled={loading}
                        className="p-1 text-emerald-600 hover:bg-emerald-50 rounded disabled:opacity-50"
                        title="Approve"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handeAction(booking.id, 'reject')}
                        disabled={loading}
                        className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                        title="Reject"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-zinc-500">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
