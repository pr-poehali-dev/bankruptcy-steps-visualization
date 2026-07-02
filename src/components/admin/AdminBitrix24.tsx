import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const ADMIN_URL = 'https://functions.poehali.dev/f93de05a-95a2-4dbb-bfdd-35104dcbefc5';

interface Lead {
  id: number;
  name: string;
  phone: string;
  status: string;
  bitrix24_id: string | null;
  bitrix24_status: string | null;
  bitrix24_synced_at: string | null;
  created_at: string;
}

interface Settings {
  [key: string]: string;
}

interface Props {
  session: string;
  settings: Settings;
  onChange: (key: string, value: string) => void;
  loading: boolean;
  saveMsg: string;
  onSave: () => void;
}

const inputCls = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] transition';
const labelCls = 'block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide';

const AdminBitrix24 = ({ session, settings, onChange, loading, saveMsg, onSave }: Props) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [syncingId, setSyncingId] = useState<number | null>(null);

  const api = async (path: string, method = 'GET', body?: object) => {
    const res = await fetch(`${ADMIN_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'X-Session-Id': session },
      body: body ? JSON.stringify(body) : undefined,
    });
    return res.json();
  };

  useEffect(() => {
    api('/bitrix24/leads').then(d => setLeads(d.leads || []));
  }, []);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const d = await api('/bitrix24/test', 'POST');
    setTestResult({ ok: d.ok, message: d.ok ? `Портал: ${d.portal}` : d.error });
    setTesting(false);
  };

  const handleSync = async (id: number) => {
    setSyncingId(id);
    const d = await api(`/bitrix24/sync/${id}`, 'POST');
    if (d.ok) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, bitrix24_id: d.bitrix24_id, bitrix24_status: 'synced', bitrix24_synced_at: new Date().toISOString() } : l));
    }
    setSyncingId(null);
  };

  const enabled = settings['bitrix24_enabled'] === 'true';

  return (
    <div className="space-y-5">

      {/* Status banner */}
      <div className={`rounded-2xl p-5 border flex items-center gap-4 ${enabled ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${enabled ? 'bg-green-100' : 'bg-slate-100'}`}>
          <Icon name={enabled ? 'Zap' : 'ZapOff'} size={20} className={enabled ? 'text-green-600' : 'text-slate-400'} fallback="Circle" />
        </div>
        <div className="flex-1">
          <div className={`font-heading font-bold text-sm ${enabled ? 'text-green-800' : 'text-slate-700'}`}>
            {enabled ? 'Интеграция активна' : 'Интеграция отключена'}
          </div>
          <div className={`text-xs mt-0.5 ${enabled ? 'text-green-600' : 'text-slate-400'}`}>
            {enabled ? 'Новые заявки автоматически отправляются в Битрикс24' : 'Включите ниже, чтобы активировать интеграцию'}
          </div>
        </div>
        <button
          onClick={() => onChange('bitrix24_enabled', enabled ? 'false' : 'true')}
          className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${enabled ? 'bg-green-500' : 'bg-slate-300'}`}
        >
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
        </button>
      </div>

      {/* Connection settings */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-slate-900 mb-1">Подключение</h3>
        <p className="text-xs text-slate-400 mb-5">URL вебхука задаётся в секретах проекта (BITRIX24_WEBHOOK_URL). Здесь можно проверить соединение.</p>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTest}
            disabled={testing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            {testing
              ? <Icon name="Loader" size={15} className="animate-spin" />
              : <Icon name="Wifi" size={15} />}
            Проверить подключение
          </button>
          {testResult && (
            <span className={`flex items-center gap-1.5 text-sm font-medium ${testResult.ok ? 'text-green-600' : 'text-red-600'}`}>
              <Icon name={testResult.ok ? 'CheckCircle' : 'XCircle'} size={15} fallback="Circle" />
              {testResult.message}
            </span>
          )}
        </div>
      </div>

      {/* CRM settings */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-slate-900 mb-5">Настройки CRM</h3>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Тип записи в Битрикс24</label>
            <div className="flex gap-3">
              {[{ val: 'lead', label: 'Лид' }, { val: 'deal', label: 'Сделка' }].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => onChange('bitrix24_entity_type', opt.val)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    settings['bitrix24_entity_type'] === opt.val
                      ? 'bg-[#1B3F7C] text-white border-[#1B3F7C]'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>ID ответственного менеджера</label>
            <p className="text-xs text-slate-400 mb-1.5">Числовой ID пользователя в Битрикс24. Оставьте пустым — назначится по умолчанию.</p>
            <input
              type="text"
              placeholder="Например: 3"
              value={settings['bitrix24_responsible_id'] || ''}
              onChange={e => onChange('bitrix24_responsible_id', e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Источник (SOURCE_ID)</label>
            <input
              type="text"
              placeholder="WEB"
              value={settings['bitrix24_source'] || 'WEB'}
              onChange={e => onChange('bitrix24_source', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Status mapping */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-slate-900 mb-2">Маппинг статусов</h3>
        <p className="text-xs text-slate-400 mb-5">Когда статус меняется в Битрикс24, он автоматически обновится и на сайте. Укажите коды статусов из вашего Битрикс24.</p>
        <div className="space-y-3">
          {[
            { our: 'new', label: 'Новая', icon: 'Circle', color: 'text-blue-600', bg: 'bg-blue-50' },
            { our: 'in_progress', label: 'В работе', icon: 'Clock', color: 'text-amber-600', bg: 'bg-amber-50' },
            { our: 'done', label: 'Завершена', icon: 'CheckCircle', color: 'text-green-600', bg: 'bg-green-50' },
          ].map(s => (
            <div key={s.our} className="flex items-center gap-3">
              <div className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl ${s.bg} w-36`}>
                <Icon name={s.icon} size={13} className={s.color} fallback="Circle" />
                <span className={`text-xs font-semibold ${s.color}`}>{s.label}</span>
              </div>
              <Icon name="ArrowRight" size={14} className="text-slate-300 shrink-0" />
              <input
                type="text"
                placeholder="Код статуса Б24"
                value={settings[`bitrix24_status_map_${s.our}`] || ''}
                onChange={e => onChange(`bitrix24_status_map_${s.our}`, e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>URL для входящего вебхука Битрикс24:</strong><br />
            <span className="font-mono break-all">{ADMIN_URL}/bitrix24/webhook</span><br />
            <span className="mt-1 block">Вставьте этот адрес в настройки обработчика событий в Битрикс24, чтобы статусы синхронизировались автоматически.</span>
          </p>
        </div>
      </div>

      {/* Save bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
        {saveMsg
          ? <span className="flex items-center gap-2 text-green-600 text-sm font-medium"><Icon name="CheckCircle" size={16} />{saveMsg}</span>
          : <span className="text-xs text-slate-400">Изменения не сохранены</span>}
        <button
          onClick={onSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1B3F7C] text-white font-semibold text-sm hover:bg-[#163270] transition-colors disabled:opacity-60"
        >
          {loading ? <Icon name="Loader" size={15} className="animate-spin" /> : <Icon name="Save" size={15} />}
          Сохранить
        </button>
      </div>

      {/* Leads sync table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-slate-900">Синхронизация заявок</h3>
            <p className="text-xs text-slate-400 mt-0.5">Статус отправки каждой заявки в Битрикс24</p>
          </div>
          <button
            onClick={() => api('/bitrix24/leads').then(d => setLeads(d.leads || []))}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Icon name="RefreshCw" size={15} />
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400">
            <Icon name="Inbox" size={28} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">Заявок пока нет</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {leads.map(lead => {
              const synced = !!lead.bitrix24_id;
              const hasError = lead.bitrix24_status?.startsWith('error');
              return (
                <div key={lead.id} className="px-6 py-3.5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800 truncate">{lead.name || 'Без имени'}</span>
                      <span className="text-xs text-slate-400">{lead.phone}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{new Date(lead.created_at).toLocaleString('ru')}</div>
                  </div>

                  <div className="shrink-0">
                    {synced && !hasError ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                        <Icon name="CheckCircle" size={12} />
                        ID {lead.bitrix24_id}
                      </div>
                    ) : hasError ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium max-w-[180px] truncate" title={lead.bitrix24_status || ''}>
                        <Icon name="AlertCircle" size={12} fallback="Circle" />
                        Ошибка
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
                        <Icon name="Minus" size={12} />
                        Не отправлено
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleSync(lead.id)}
                    disabled={syncingId === lead.id}
                    className="shrink-0 p-2 rounded-xl text-slate-400 hover:text-[#1B3F7C] hover:bg-blue-50 transition-colors disabled:opacity-40"
                    title="Отправить в Битрикс24"
                  >
                    {syncingId === lead.id
                      ? <Icon name="Loader" size={15} className="animate-spin" />
                      : <Icon name="Send" size={15} />}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBitrix24;
