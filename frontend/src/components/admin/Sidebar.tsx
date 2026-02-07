'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, BedDouble, CalendarDays, Images, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const links = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/rooms', label: 'Odalar', icon: BedDouble },
        { href: '/admin/bookings', label: 'Rezervasyonlar', icon: CalendarDays },
        { href: '/admin/content', label: 'İçerik Yönetimi', icon: Images }, // Pending implementation
    ];

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        router.push('/admin/login');
    };

    return (
        <div className="w-64 bg-zinc-900 min-h-screen text-white flex flex-col">
            <div className="p-6">
                <h2 className="text-xl font-bold tracking-tighter">KIMMIY ADMIN</h2>
            </div>

            <nav className="flex-grow px-4 pb-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname.startsWith(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-zinc-800",
                                isActive ? "bg-zinc-800 text-white" : "text-zinc-400"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium text-red-400 hover:bg-zinc-800 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Çıkış Yap</span>
                </button>
            </div>
        </div>
    );
}
