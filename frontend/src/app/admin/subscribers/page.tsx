'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { format } from 'date-fns';
import { Mail, Send } from 'lucide-react';

export default function AdminSubscribersPage() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        loadSubscribers();
    }, []);

    const loadSubscribers = async () => {
        try {
            const res = await api.get('/subscribers', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            setSubscribers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject || !message) return alert('Konu ve mesaj gereklidir.');

        if (!confirm(`Bu mesajı ${subscribers.length} aboneye göndermek istediğinize emin misiniz?`)) return;

        setSending(true);
        try {
            const res = await api.post('/subscribers/send-email', { subject, message }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            alert(`Başarılı! ${res.data.sentCount} kişiye gönderildi.`);
            setSubject('');
            setMessage('');
        } catch (err) {
            console.error(err);
            alert('Gönderim sırasında hata oluştu.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* List Section */}
            <div>
                <h1 className="text-3xl font-bold mb-8">Subscribers List ({subscribers.length})</h1>

                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden max-h-[600px] overflow-y-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-zinc-800/50 sticky top-0">
                            <tr>
                                <th className="p-4 font-medium text-zinc-500 text-sm">ID</th>
                                <th className="p-4 font-medium text-zinc-500 text-sm">Email</th>
                                <th className="p-4 font-medium text-zinc-500 text-sm">Date Registered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((sub) => (
                                <tr key={sub.id} className="border-t border-gray-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                    <td className="p-4 text-xs text-zinc-400">#{sub.id}</td>
                                    <td className="p-4 font-medium">{sub.email}</td>
                                    <td className="p-4 text-sm text-zinc-500">
                                        {format(new Date(sub.createdAt), 'dd MMMM yyyy HH:mm')}
                                    </td>
                                </tr>
                            ))}
                            {subscribers.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-zinc-500">No subscribers yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Send Form Section */}
            <div>
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Mail className="w-8 h-8" />
                    Send Bulk Email
                </h1>

                <form onSubmit={handleSend} className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g. Summer Sale Started!"
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Message Content</label>
                        <textarea
                            rows={10}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your message here..."
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            required
                        />
                        <p className="text-xs text-zinc-500 mt-2">* This message will be sent to all {subscribers.length} subscribers.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={sending || subscribers.length === 0}
                        className="w-full bg-zinc-900 text-white py-4 rounded-lg font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sending ? (
                            <>Sending...</>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Send
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
