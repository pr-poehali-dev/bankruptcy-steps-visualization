import Icon from '@/components/ui/icon';

interface Lead {
  id: number;
  name: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'Новая', color: 'text-blue-700', bg: 'bg-blue-50' },
  in_progress: { label: 'В работе', color: 'text-amber-700', bg: 'bg-amber-50' },
  done: { label: 'Завершена', color: 'text-green-700', bg: 'bg-green-50' },
};

interface Props {
  leads: Lead[];
  onStatusChange: (id: number, status: string) => void;
}

const AdminLeads = ({ leads, onStatusChange }: Props) => (
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
                onChange={e => onStatusChange(lead.id, e.target.value)}
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
);

export default AdminLeads;
