'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Users, BedDouble, CalendarDays } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    pendingBookings: 0,
    totalRooms: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, roomsRes] = await Promise.all([
          api.get('/bookings', {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
          }),
          api.get('/rooms')
        ]);

        const pending = bookingsRes.data.filter((b: any) => b.status === 'PENDING').length;
        setStats({
          pendingBookings: pending,
          totalRooms: roomsRes.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 flex items-center">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mr-4">
            <CalendarDays className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-500">Pending Bookings</h3>
            <p className="text-3xl font-bold">{stats.pendingBookings}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 flex items-center">
          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 mr-4">
            <BedDouble className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-500">Total Rooms</h3>
            <p className="text-3xl font-bold">{stats.totalRooms}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 flex items-center">
          <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 mr-4">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-500">Visitors</h3>
            <p className="text-sm text-zinc-400">Analytics integration pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
