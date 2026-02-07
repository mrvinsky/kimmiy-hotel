'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

const keys = [
    { key: 'home_title', label: 'Ana Sayfa Başlık' },
    { key: 'home_subtitle', label: 'Ana Sayfa Alt Başlık' },
    { key: 'about_text', label: 'Hakkımızda Metni' },
    { key: 'services_intro', label: 'Hizmetler Giriş Metni' },
];

export default function ContentPage() {
    const [content, setContent] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load initial values (mock or fetch if endpoint existed for bulk get)
        // Currently backend supports one key at a time.
        // For MVP, we fetch individually or just allow setting.
        keys.forEach(k => {
            api.get(`/content/text/${k.key}`).then(res => {
         setContent(prev => ({ ...prev, [k.key]: res.data }));
      });
    });
  }, []);

  const handleSave = async (key: string, value: string) => {
    setLoading(true);
    try {
      await api.put(`/content/text/${key}`, { value }, {
         headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      alert('Kaydedildi');
    } catch (err) {
      console.error(err);
      alert('Hata');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">İçerik Yönetimi</h1>

      <div className="space-y-6">
        {keys.map((item) => (
          <div key={item.key} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
            <label className="block text-sm font-medium mb-2">{item.label}</label>
            <div className="flex space-x-4">
              <textarea 
                value={content[item.key] || ''}
                onChange={(e) => setContent(prev => ({ ...prev, [item.key]: e.target.value }))}
                rows={3}
                className="flex-grow p-3 border rounded-lg dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
              />
              <button 
                onClick={() => handleSave(item.key, content[item.key])}
                disabled={loading}
                className="self-end bg-zinc-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-zinc-800 disabled:opacity-50"
              >
                Kaydet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
