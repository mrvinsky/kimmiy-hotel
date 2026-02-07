'use client';

import { AdminSidebar } from '@/components/admin/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Simple client-side auth check
    useEffect(() => {


        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [pathname, router]);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (!isAuthenticated) return null; // Or loading spinner

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            <AdminSidebar />
            <main className="flex-grow p-8 overflow-auto h-screen">
                {children}
            </main>
        </div>
    );
}
