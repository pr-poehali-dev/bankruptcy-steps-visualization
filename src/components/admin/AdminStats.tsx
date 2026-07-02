import Icon from '@/components/ui/icon';

interface Stats {
  total_views: number;
  total_leads: number;
  new_leads: number;
  pages: { path: string; views: number }[];
  daily: { day: string; views: number }[];
}

const PAGE_LABELS: Record<string, string> = {
  '/': 'Главная',
  '/stages': 'Этапы процедуры',
  '/consequences': 'Последствия',
  '/payments': 'Платежи',
};

interface Props {
  stats: Stats | null;
}

const AdminStats = ({ stats }: Props) => (
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
);

export default AdminStats;
