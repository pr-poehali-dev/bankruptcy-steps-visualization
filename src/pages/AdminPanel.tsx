import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import AdminStats from '@/components/admin/AdminStats';
import AdminLeads from '@/components/admin/AdminLeads';
import AdminPages from '@/components/admin/AdminPages';
import { ContentTab, FormsTab, SeoTab, HeroTab, AdvantagesTab, StepsTab, StagesTab, ConsequencesTab, PaymentsTab, IndexTab } from '@/components/admin/AdminSettings';
import { invalidateContentCache } from '@/hooks/useSiteContent';

const ADMIN_URL = 'https://functions.poehali.dev/f93de05a-95a2-4dbb-bfdd-35104dcbefc5';

type Tab = 'stats' | 'leads' | 'pages' | 'hero' | 'advantages' | 'steps' | 'stages' | 'consequences' | 'payments_page' | 'index_page' | 'content' | 'forms' | 'seo';

interface Lead {
  id: number;
  name: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface Stats {
  total_views: number;
  total_leads: number;
  new_leads: number;
  pages: { path: string; views: number }[];
  daily: { day: string; views: number }[];
}

interface Settings {
  [key: string]: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('stats');
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settings, setSettings] = useState<Settings>({});
  const [saveMsg, setSaveMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const session = sessionStorage.getItem('admin_session') || '';

  const api = useCallback(async (path: string, method = 'GET', body?: object) => {
    const res = await fetch(`${ADMIN_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'X-Session-Id': session },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 401) { navigate('/admin/login'); return null; }
    return res.json();
  }, [session, navigate]);

  useEffect(() => {
    if (!session) { navigate('/admin/login'); return; }
  }, [session, navigate]);

  useEffect(() => {
    if (tab === 'stats') api('/stats').then(d => d && setStats(d));
    if (tab === 'leads') api('/leads').then(d => d && setLeads(d.leads || []));
    if (!['stats', 'leads'].includes(tab)) api('/settings').then(d => d && setSettings(d.settings || {}));
  }, [tab, api]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session');
    navigate('/admin/login');
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    await api('/settings', 'POST', { settings });
    invalidateContentCache();
    setSaveMsg('Сохранено!');
    setLoading(false);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleLeadStatus = async (id: number, status: string) => {
    await api(`/leads/${id}/status`, 'PUT', { status });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleSettingChange = (key: string, value: string) => {
    setSettings(s => ({ ...s, [key]: value }));
  };

  const tabGroups: { group: string; items: { id: Tab; label: string; icon: string }[] }[] = [
    {
      group: 'Данные',
      items: [
        { id: 'stats', label: 'Статистика', icon: 'BarChart3' },
        { id: 'leads', label: 'Заявки', icon: 'Inbox' },
      ],
    },
    {
      group: 'Главная',
      items: [
        { id: 'hero', label: 'Hero', icon: 'LayoutTemplate' },
        { id: 'advantages', label: 'Преимущества', icon: 'BadgeCheck' },
        { id: 'steps', label: 'Как работаем', icon: 'Route' },
        { id: 'content', label: 'Прочий контент', icon: 'FileEdit' },
        { id: 'forms', label: 'Формы и кнопки', icon: 'MousePointerClick' },
      ],
    },
    {
      group: 'Страницы',
      items: [
        { id: 'pages', label: 'Мои страницы', icon: 'FilePlus' },
        { id: 'index_page', label: 'Этапы', icon: 'ListOrdered' },
        { id: 'stages', label: 'Карточки этапов', icon: 'LayoutList' },
        { id: 'consequences', label: 'Последствия', icon: 'AlertTriangle' },
        { id: 'payments_page', label: 'Платежи', icon: 'Receipt' },
      ],
    },
    {
      group: 'Техн.',
      items: [
        { id: 'seo', label: 'SEO', icon: 'Search' },
      ],
    },
  ];
  const tabs = tabGroups.flatMap(g => g.items);

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <header className="bg-[#1B3F7C] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/3e7e35fe-ef29-4a30-b52d-2ba872294646/bucket/9887576b-326b-4273-a0f5-2a485157ab4a.png"
              alt="Лого"
              className="h-8 w-auto object-contain brightness-0 invert opacity-90"
            />
            <div>
              <div className="font-heading font-bold text-sm leading-none">Панель управления</div>
              <div className="text-blue-200 text-xs mt-0.5">АБ «Правовой статус»</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="text-blue-200 hover:text-white text-sm transition-colors flex items-center gap-1.5">
              <Icon name="ExternalLink" size={14} />
              Сайт
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm transition-colors">
              <Icon name="LogOut" size={14} />
              Выйти
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-x-6 gap-y-0 pb-0">
          {tabGroups.map(group => (
            <div key={group.group} className="flex items-end gap-0.5">
              <span className="text-[10px] text-blue-400/60 font-semibold uppercase tracking-wider mr-1 mb-3 hidden lg:block">{group.group}</span>
              {group.items.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium rounded-t-xl transition-all ${
                    tab === t.id ? 'bg-slate-50 text-[#1B3F7C]' : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon name={t.icon} size={14} fallback="Circle" />
                  {t.label}
                  {t.id === 'leads' && leads.filter(l => l.status === 'new').length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {leads.filter(l => l.status === 'new').length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {tab === 'stats' && <AdminStats stats={stats} />}
        {tab === 'leads' && <AdminLeads leads={leads} onStatusChange={handleLeadStatus} />}
        {tab === 'pages' && <AdminPages session={session} onNavigate={navigate} />}
        {tab === 'hero' && <HeroTab settings={settings} onChange={handleSettingChange} loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />}
        {tab === 'advantages' && <AdvantagesTab settings={settings} onChange={handleSettingChange} loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />}
        {tab === 'steps' && <StepsTab settings={settings} onChange={handleSettingChange} loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />}
        {tab === 'stages' && <StagesTab settings={settings} onChange={handleSettingChange} loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />}
        {tab === 'consequences' && <ConsequencesTab settings={settings} onChange={handleSettingChange} loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />}
        {tab === 'payments_page' && <PaymentsTab settings={settings} onChange={handleSettingChange} loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />}
        {tab === 'index_page' && <IndexTab settings={settings} onChange={handleSettingChange} loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />}
        {tab === 'content' && <ContentTab settings={settings} onChange={handleSettingChange} loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />}
        {tab === 'forms' && <FormsTab settings={settings} onChange={handleSettingChange} loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />}
        {tab === 'seo' && <SeoTab settings={settings} onChange={handleSettingChange} loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />}
      </main>
    </div>
  );
};

export default AdminPanel;