import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const ADMIN_URL = 'https://functions.poehali.dev/f93de05a-95a2-4dbb-bfdd-35104dcbefc5';

type Tab = 'stats' | 'leads' | 'content' | 'seo';

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

const PAGE_LABELS: Record<string, string> = {
  '/': 'Главная',
  '/stages': 'Этапы процедуры',
  '/consequences': 'Последствия',
  '/payments': 'Платежи',
};

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'Новая', color: 'text-blue-700', bg: 'bg-blue-50' },
  in_progress: { label: 'В работе', color: 'text-amber-700', bg: 'bg-amber-50' },
  done: { label: 'Завершена', color: 'text-green-700', bg: 'bg-green-50' },
};

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
    if (tab === 'content' || tab === 'seo') api('/settings').then(d => d && setSettings(d.settings || {}));
  }, [tab, api]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session');
    navigate('/admin/login');
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    await api('/settings', 'POST', { settings });
    setSaveMsg('Сохранено!');
    setLoading(false);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleLeadStatus = async (id: number, status: string) => {
    await api(`/leads/${id}/status`, 'PUT', { status });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'stats', label: 'Статистика', icon: 'BarChart3' },
    { id: 'leads', label: 'Заявки', icon: 'Inbox' },
    { id: 'content', label: 'Контент', icon: 'FileEdit' },
    { id: 'seo', label: 'SEO', icon: 'Search' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Header */}
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

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 pb-0">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-xl transition-all ${
                tab === t.id ? 'bg-slate-50 text-[#1B3F7C]' : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon name={t.icon} size={15} fallback="Circle" />
              {t.label}
              {t.id === 'leads' && leads.filter(l => l.status === 'new').length > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {leads.filter(l => l.status === 'new').length}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* STATS */}
        {tab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: 'Eye', label: 'Просмотров всего', value: stats?.total_views ?? '—', color: 'text-blue-700' },
                { icon: 'Inbox', label: 'Всего заявок', value: stats?.total_leads ?? '—', color: 'text-slate-700' },
                { icon: 'BellRing', label: 'Новых заявок', value: stats?.new_leads ?? '—', color: 'text-red-600' },
                { icon: 'TrendingUp', label: 'Страниц в топе', value: stats?.pages?.length ?? '—', color: 'text-green-700' },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <Icon name={s.icon} size={20} className={`${s.color} mb-3`} fallback="Star" />
                  <div className={`font-heading font-black text-3xl ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Daily chart (simple bars) */}
            {stats?.daily && stats.daily.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-bold text-slate-900 mb-5">Просмотры за 14 дней</h3>
                <div className="flex items-end gap-2 h-32">
                  {stats.daily.map((d, i) => {
                    const max = Math.max(...stats.daily.map(x => Number(x.views)));
                    const h = max > 0 ? (Number(d.views) / max) * 100 : 0;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] text-slate-400">{d.views}</span>
                        <div className="w-full rounded-t-md bg-[#1B3F7C]/80 transition-all" style={{ height: `${Math.max(h, 4)}%` }} />
                        <span className="text-[9px] text-slate-400">{String(d.day).slice(5)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Top pages */}
            {stats?.pages && stats.pages.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-bold text-slate-900 mb-4">Популярные страницы</h3>
                <div className="space-y-3">
                  {stats.pages.map((p, i) => {
                    const max = Math.max(...stats.pages.map(x => Number(x.views)));
                    const w = max > 0 ? (Number(p.views) / max) * 100 : 0;
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-700">{PAGE_LABELS[p.path] || p.path}</span>
                          <span className="text-slate-500 font-medium">{p.views} просм.</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1B3F7C] rounded-full" style={{ width: `${w}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* LEADS */}
        {tab === 'leads' && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-heading font-bold text-slate-900">Заявки на консультацию</h3>
              <span className="text-sm text-slate-500">{leads.length} заявок</span>
            </div>
            {leads.length === 0 ? (
              <div className="px-6 py-16 text-center text-slate-400">
                <Icon name="Inbox" size={32} className="mx-auto mb-3 opacity-40" />
                <p>Заявок пока нет</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {leads.map(lead => {
                  const s = STATUS_LABELS[lead.status] || STATUS_LABELS.new;
                  return (
                    <div key={lead.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-900">{lead.name || 'Без имени'}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.bg} ${s.color}`}>{s.label}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><Icon name="Phone" size={13} />{lead.phone}</span>
                          <span className="flex items-center gap-1"><Icon name="Clock" size={13} />{new Date(lead.created_at).toLocaleString('ru')}</span>
                        </div>
                        {lead.message && <p className="text-sm text-slate-600 mt-1 italic">«{lead.message}»</p>}
                      </div>
                      <select
                        value={lead.status}
                        onChange={e => handleLeadStatus(lead.id, e.target.value)}
                        className="text-sm border border-slate-200 rounded-xl px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]"
                      >
                        <option value="new">Новая</option>
                        <option value="in_progress">В работе</option>
                        <option value="done">Завершена</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* CONTENT */}
        {tab === 'content' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-bold text-slate-900 mb-5">Главный экран (Hero)</h3>
              <div className="space-y-4">
                {[
                  { key: 'hero_title', label: 'Заголовок', multiline: false },
                  { key: 'hero_subtitle', label: 'Подзаголовок', multiline: true },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
                    {f.multiline ? (
                      <textarea rows={3} value={settings[f.key] || ''} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none" />
                    ) : (
                      <input type="text" value={settings[f.key] || ''} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-bold text-slate-900 mb-5">Контакты</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: 'phone', label: 'Телефон' },
                  { key: 'email', label: 'Email' },
                  { key: 'address', label: 'Адрес' },
                ].map(f => (
                  <div key={f.key} className={f.key === 'address' ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
                    <input type="text" value={settings[f.key] || ''} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-bold text-slate-900 mb-5">Форма заявки</h3>
              <div className="space-y-4">
                {[
                  { key: 'form_title', label: 'Заголовок формы' },
                  { key: 'form_subtitle', label: 'Подзаголовок формы' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
                    <input type="text" value={settings[f.key] || ''} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
                  </div>
                ))}
              </div>
            </div>

            <SaveBar loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />
          </div>
        )}

        {/* SEO */}
        {tab === 'seo' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-bold text-slate-900 mb-5">SEO-настройки</h3>
              <div className="space-y-4">
                {[
                  { key: 'seo_title', label: 'Title страницы', hint: 'Рекомендуется 50–60 символов' },
                  { key: 'seo_description', label: 'Meta Description', hint: 'Рекомендуется 150–160 символов', multiline: true },
                  { key: 'seo_keywords', label: 'Keywords (через запятую)', hint: 'Ключевые слова для поисковиков' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">{f.label}</label>
                    <p className="text-xs text-slate-400 mb-1.5">{f.hint}</p>
                    {f.multiline ? (
                      <textarea rows={3} value={settings[f.key] || ''} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none" />
                    ) : (
                      <input type="text" value={settings[f.key] || ''} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
                    )}
                    <div className="text-right text-xs text-slate-400 mt-1">{(settings[f.key] || '').length} симв.</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-bold text-slate-900 mb-4">Предпросмотр в Google</h3>
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div className="text-blue-700 text-base font-medium truncate">{settings.seo_title || 'Заголовок страницы'}</div>
                <div className="text-green-700 text-xs mt-0.5">https://ваш-сайт.ru</div>
                <div className="text-slate-600 text-sm mt-1 line-clamp-2">{settings.seo_description || 'Описание страницы появится здесь...'}</div>
              </div>
            </div>

            <SaveBar loading={loading} saveMsg={saveMsg} onSave={handleSaveSettings} />
          </div>
        )}

      </main>
    </div>
  );
};

const SaveBar = ({ loading, saveMsg, onSave }: { loading: boolean; saveMsg: string; onSave: () => void }) => (
  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
    {saveMsg ? (
      <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
        <Icon name="CheckCircle" size={16} />
        {saveMsg}
      </span>
    ) : <span className="text-xs text-slate-400">Изменения не сохранены</span>}
    <button
      onClick={onSave}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1B3F7C] text-white font-semibold text-sm hover:bg-[#163270] transition-colors disabled:opacity-60"
    >
      {loading ? <Icon name="Loader" size={15} className="animate-spin" /> : <Icon name="Save" size={15} />}
      Сохранить
    </button>
  </div>
);

export default AdminPanel;
