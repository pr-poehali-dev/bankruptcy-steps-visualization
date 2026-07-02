import Icon from '@/components/ui/icon';
import { Settings } from './adminSettingsShared';

interface SaveBarProps {
  loading: boolean;
  saveMsg: string;
  onSave: () => void;
}

export const SaveBar = ({ loading, saveMsg, onSave }: SaveBarProps) => (
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

export const textInput = (key: string, label: string, value: string, onChange: (k: string, v: string) => void) => (
  <div key={key}>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{label}</label>
    <input type="text" value={value} onChange={e => onChange(key, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
  </div>
);

export const textareaInput = (key: string, label: string, value: string, onChange: (k: string, v: string) => void) => (
  <div key={key}>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{label}</label>
    <textarea rows={2} value={value} onChange={e => onChange(key, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none" />
  </div>
);

// Shared field renderer used in ContentTab
export const SettingsField = ({ f, settings, onChange }: {
  f: { key: string; label: string; multiline?: boolean };
  settings: Settings;
  onChange: (key: string, value: string) => void;
}) => (
  <div>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
    {f.multiline ? (
      <textarea rows={3} value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none" />
    ) : (
      <input type="text" value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
    )}
  </div>
);
