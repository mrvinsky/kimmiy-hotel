'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { Plus, Pencil, Trash } from 'lucide-react';

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);

  const loadRooms = async () => {
    try {
      const res = await api.get('/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const deleteRoom = async (id: number) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    try {
      await api.delete(`/rooms/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      loadRooms();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Room Management</h1>
        <Link
          href="/admin/rooms/new"
          className="bg-zinc-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-zinc-800"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Room</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-zinc-800/50">
            <tr>
              <th className="p-4 font-medium text-zinc-500 text-sm">ID</th>
              <th className="p-4 font-medium text-zinc-500 text-sm">Name</th>
              <th className="p-4 font-medium text-zinc-500 text-sm">Price</th>
              <th className="p-4 font-medium text-zinc-500 text-sm">Capacity</th>
              <th className="p-4 font-medium text-zinc-500 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-t border-gray-100 dark:border-zinc-800">
                <td className="p-4">{room.id}</td>
                <td className="p-4 font-medium">
                  {typeof room.name === 'object' ? (room.name['EN'] || Object.values(room.name)[0]) : room.name}
                </td>
                <td className="p-4">€{room.price}</td>
                <td className="p-4">{room.capacity} People</td>
                <td className="p-4 text-right space-x-2">
                  <Link href={`/admin/rooms/${room.id}`} className="text-blue-500 hover:text-blue-600 inline-block" title="Edit">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => deleteRoom(room.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {rooms.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-500">No rooms found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
