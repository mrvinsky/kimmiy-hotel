'use client';

import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils'; // Assuming utilities exist

export default function AdminLoginPage() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const [error, setError] = useState('');

    const onSubmit = async (data: any) => {
        try {
            const res = await api.post('/auth/login', data);
            localStorage.setItem('access_token', res.data.access_token);
            router.push('/admin/dashboard');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950">
            <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-center mb-8">Admin Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            {...register('username', { required: true })}
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full bg-zinc-900 text-white py-3 rounded-lg font-bold hover:bg-zinc-800">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
