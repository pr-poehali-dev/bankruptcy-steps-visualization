import Icon from '@/components/ui/icon';

interface Settings {
  [key: string]: string;
}

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

interface ContentTabProps {
  settings: Settings;
  onChange: (key: string, value: string) => void;
  loading: boolean;
  saveMsg: string;
  onSave: () => void;
}

export const ContentTab = ({ settings, onChange, loading, saveMsg, onSave }: ContentTabProps) => (
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
              <textarea rows={3} value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none" />
            ) : (
              <input type="text" value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
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
            <input type="text" value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
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
            <input type="text" value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
          </div>
        ))}
      </div>
    </div>

    <SaveBar loading={loading} saveMsg={saveMsg} onSave={onSave} />
  </div>
);

interface FormsTabProps {
  settings: Settings;
  onChange: (key: string, value: string) => void;
  loading: boolean;
  saveMsg: string;
  onSave: () => void;
}

export const FormsTab = ({ settings, onChange, loading, saveMsg, onSave }: FormsTabProps) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-[#1B3F7C]/10 flex items-center justify-center">
          <Icon name="MousePointerClick" size={18} className="text-[#1B3F7C]" fallback="Circle" />
        </div>
        <h3 className="font-heading font-bold text-slate-900">Кнопки сайта</h3>
      </div>
      <div className="space-y-4">
        {[
          { key: 'btn_header_cta', label: 'Кнопка в шапке', hint: 'Кнопка «Консультация» в правом верхнем углу' },
          { key: 'btn_hero_primary', label: 'Главная кнопка Hero', hint: 'Основная кнопка на главном экране' },
          { key: 'btn_hero_secondary', label: 'Вторая кнопка Hero', hint: 'Кнопка рядом с главной (прозрачная)' },
          { key: 'btn_form_submit', label: 'Кнопка отправки формы', hint: 'Текст кнопки в форме заявки' },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">{f.label}</label>
            <p className="text-xs text-slate-400 mb-1.5">{f.hint}</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={settings[f.key] || ''}
                onChange={e => onChange(f.key, e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]"
              />
              <div className="shrink-0 px-4 py-2.5 rounded-xl bg-[#1B3F7C] text-white text-sm font-semibold whitespace-nowrap">
                {settings[f.key] || '...'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-[#1B3F7C]/10 flex items-center justify-center">
          <Icon name="FormInput" size={18} className="text-[#1B3F7C]" fallback="Circle" />
        </div>
        <h3 className="font-heading font-bold text-slate-900">Поля формы заявки</h3>
      </div>
      <div className="space-y-4">
        {[
          { key: 'form_field_name_placeholder', label: 'Плейсхолдер поля «Имя»' },
          { key: 'form_field_phone_placeholder', label: 'Плейсхолдер поля «Телефон»' },
          { key: 'form_field_message_label', label: 'Подпись поля «Сообщение»' },
          { key: 'form_field_message_placeholder', label: 'Плейсхолдер поля «Сообщение»' },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
            <input
              type="text"
              value={settings[f.key] || ''}
              onChange={e => onChange(f.key, e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]"
            />
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-[#1B3F7C]/10 flex items-center justify-center">
          <Icon name="ShieldCheck" size={18} className="text-[#1B3F7C]" fallback="Circle" />
        </div>
        <h3 className="font-heading font-bold text-slate-900">Гарантии (левая панель формы)</h3>
      </div>
      <div className="space-y-4">
        {[
          { key: 'form_guarantee_1', label: 'Гарантия 1' },
          { key: 'form_guarantee_2', label: 'Гарантия 2' },
          { key: 'form_guarantee_3', label: 'Гарантия 3' },
        ].map(f => (
          <div key={f.key} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/10 border border-slate-200 flex items-center justify-center shrink-0">
              <Icon name="Check" size={13} className="text-[#1B3F7C]" />
            </div>
            <input
              type="text"
              value={settings[f.key] || ''}
              onChange={e => onChange(f.key, e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]"
            />
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
          <Icon name="CheckCircle" size={18} className="text-green-600" fallback="Circle" />
        </div>
        <h3 className="font-heading font-bold text-slate-900">Сообщение после отправки</h3>
      </div>
      <div className="space-y-4">
        {[
          { key: 'form_success_title', label: 'Заголовок', multiline: false },
          { key: 'form_success_text', label: 'Текст', multiline: true },
          { key: 'form_privacy_text', label: 'Текст о персональных данных', multiline: false },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
            {f.multiline ? (
              <textarea
                rows={2}
                value={settings[f.key] || ''}
                onChange={e => onChange(f.key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none"
              />
            ) : (
              <input
                type="text"
                value={settings[f.key] || ''}
                onChange={e => onChange(f.key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 border border-slate-200 rounded-xl p-5 bg-slate-50 text-center">
        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
          <Icon name="CheckCheck" size={22} className="text-teal-600" fallback="Check" />
        </div>
        <div className="font-heading font-bold text-slate-900 mb-1">{settings['form_success_title'] || '—'}</div>
        <div className="text-xs text-slate-500 leading-relaxed">{settings['form_success_text'] || '—'}</div>
      </div>
    </div>

    <SaveBar loading={loading} saveMsg={saveMsg} onSave={onSave} />
  </div>
);

interface SeoTabProps {
  settings: Settings;
  onChange: (key: string, value: string) => void;
  loading: boolean;
  saveMsg: string;
  onSave: () => void;
}

export const SeoTab = ({ settings, onChange, loading, saveMsg, onSave }: SeoTabProps) => (
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
              <textarea rows={3} value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none" />
            ) : (
              <input type="text" value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
            )}
            <div className="text-right text-xs text-slate-400 mt-1">{(settings[f.key] || '').length} симв.</div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-4">Предпросмотр в Google</h3>
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
        <div className="text-blue-700 text-base font-medium truncate">{settings.seo_title || 'Заголовок страницы'}</div>
        <div className="text-green-700 text-xs mt-0.5">https://ваш-сайт.ru</div>
        <div className="text-slate-600 text-sm mt-1 line-clamp-2">{settings.seo_description || 'Описание страницы появится здесь...'}</div>
      </div>
    </div>

    <SaveBar loading={loading} saveMsg={saveMsg} onSave={onSave} />
  </div>
);

// ─── Hero Tab ────────────────────────────────────────────────────────────────

interface HeroTabProps { settings: Settings; onChange: (k: string, v: string) => void; loading: boolean; saveMsg: string; onSave: () => void; }

const textInput = (key: string, label: string, value: string, onChange: (k: string, v: string) => void) => (
  <div key={key}>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{label}</label>
    <input type="text" value={value} onChange={e => onChange(key, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
  </div>
);

const textareaInput = (key: string, label: string, value: string, onChange: (k: string, v: string) => void) => (
  <div key={key}>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{label}</label>
    <textarea rows={2} value={value} onChange={e => onChange(key, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none" />
  </div>
);

export const HeroTab = ({ settings, onChange, loading, saveMsg, onSave }: HeroTabProps) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-5">Главный экран</h3>
      <div className="space-y-4">
        {textInput('hero_tag', 'Тег над заголовком', settings['hero_tag'] || '', onChange)}
        {textInput('hero_title_1', 'Заголовок строка 1', settings['hero_title_1'] || '', onChange)}
        {textInput('hero_title_2', 'Заголовок строка 2 (синяя)', settings['hero_title_2'] || '', onChange)}
        {textareaInput('hero_desc', 'Описание', settings['hero_desc'] || '', onChange)}
        {textInput('hero_result_label', 'Заголовок блока результатов', settings['hero_result_label'] || '', onChange)}
        {textInput('hero_cases_stat', 'Статистика (счётчик дел)', settings['hero_cases_stat'] || '', onChange)}
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-5">Список результатов</h3>
      <div className="space-y-3">
        {[1,2,3,4,5].map(n => textInput(`hero_result_${n}`, `Результат ${n}`, settings[`hero_result_${n}`] || '', onChange))}
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-5">Статистика</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {[1,2,3,4].map(n => (
          <div key={n} className="space-y-3 p-4 rounded-xl border border-slate-100 bg-slate-50">
            <div className="text-xs font-bold text-slate-500 uppercase">Блок {n}</div>
            {textInput(`stat_${n}_value`, 'Значение', settings[`stat_${n}_value`] || '', onChange)}
            {textInput(`stat_${n}_label`, 'Подпись', settings[`stat_${n}_label`] || '', onChange)}
          </div>
        ))}
      </div>
    </div>
    <SaveBar loading={loading} saveMsg={saveMsg} onSave={onSave} />
  </div>
);

// ─── Advantages Tab ───────────────────────────────────────────────────────────

interface AdvTabProps { settings: Settings; onChange: (k: string, v: string) => void; loading: boolean; saveMsg: string; onSave: () => void; }

export const AdvantagesTab = ({ settings, onChange, loading, saveMsg, onSave }: AdvTabProps) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-5">Заголовок раздела</h3>
      <div className="space-y-4">
        {textInput('adv_section_title', 'Заголовок', settings['adv_section_title'] || '', onChange)}
        {textInput('adv_section_subtitle', 'Подзаголовок', settings['adv_section_subtitle'] || '', onChange)}
      </div>
    </div>
    {[1,2,3,4].map(n => (
      <div key={n} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-slate-900 mb-4">Преимущество {n}</h3>
        <div className="space-y-4">
          {textInput(`adv_${n}_title`, 'Заголовок', settings[`adv_${n}_title`] || '', onChange)}
          {textareaInput(`adv_${n}_desc`, 'Описание', settings[`adv_${n}_desc`] || '', onChange)}
        </div>
      </div>
    ))}
    <SaveBar loading={loading} saveMsg={saveMsg} onSave={onSave} />
  </div>
);

// ─── Steps Tab ────────────────────────────────────────────────────────────────

interface StepsTabProps { settings: Settings; onChange: (k: string, v: string) => void; loading: boolean; saveMsg: string; onSave: () => void; }

export const StepsTab = ({ settings, onChange, loading, saveMsg, onSave }: StepsTabProps) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-4">Заголовок раздела</h3>
      {textInput('steps_section_title', 'Заголовок', settings['steps_section_title'] || '', onChange)}
    </div>
    {[1,2,3,4,5].map(n => (
      <div key={n} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-slate-900 mb-4">Шаг {n}</h3>
        <div className="space-y-4">
          {textInput(`step_${n}_title`, 'Название', settings[`step_${n}_title`] || '', onChange)}
          {textInput(`step_${n}_tag`, 'Тег / срок', settings[`step_${n}_tag`] || '', onChange)}
          {textInput(`step_${n}_text`, 'Описание', settings[`step_${n}_text`] || '', onChange)}
        </div>
      </div>
    ))}
    <SaveBar loading={loading} saveMsg={saveMsg} onSave={onSave} />
  </div>
);

// ─── Stages Tab ───────────────────────────────────────────────────────────────

interface StagesTabProps { settings: Settings; onChange: (k: string, v: string) => void; loading: boolean; saveMsg: string; onSave: () => void; }

export const StagesTab = ({ settings, onChange, loading, saveMsg, onSave }: StagesTabProps) => (
  <div className="space-y-5">
    {[1,2,3,4,5].map(n => (
      <div key={n} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-slate-900 mb-4">Этап {n}</h3>
        <div className="space-y-4">
          {textInput(`stage_${n}_title`, 'Название', settings[`stage_${n}_title`] || '', onChange)}
          {textInput(`stage_${n}_short`, 'Подпись', settings[`stage_${n}_short`] || '', onChange)}
          {textInput(`stage_${n}_duration`, 'Срок', settings[`stage_${n}_duration`] || '', onChange)}
          {textareaInput(`stage_${n}_hint`, 'Подсказка (тултип)', settings[`stage_${n}_hint`] || '', onChange)}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Детали (в модальном окне)</label>
            <div className="space-y-2">
              {[1,2,3,4].map(d => (
                <input key={d} type="text" placeholder={`Пункт ${d}`} value={settings[`stage_${n}_detail_${d}`] || ''} onChange={e => onChange(`stage_${n}_detail_${d}`, e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
    <SaveBar loading={loading} saveMsg={saveMsg} onSave={onSave} />
  </div>
);

// ─── Consequences Tab ─────────────────────────────────────────────────────────

interface ConsequencesTabProps { settings: Settings; onChange: (k: string, v: string) => void; loading: boolean; saveMsg: string; onSave: () => void; }

export const ConsequencesTab = ({ settings, onChange, loading, saveMsg, onSave }: ConsequencesTabProps) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-4">Шкала ограничений</h3>
      <div className="space-y-4">
        {[1,2,3,4,5].map(n => (
          <div key={n} className="grid grid-cols-[1fr_80px] gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Ограничение {n}</label>
              <input type="text" value={settings[`cons_limit_${n}_label`] || ''} onChange={e => onChange(`cons_limit_${n}_label`, e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Лет</label>
              <input type="number" min="1" max="20" value={settings[`cons_limit_${n}_years`] || ''} onChange={e => onChange(`cons_limit_${n}_years`, e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-4">Ограничения (левая колонка)</h3>
      <div className="space-y-4">
        {[1,2,3,4,5].map(n => (
          <div key={n} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-3">
            <div className="text-xs font-bold text-slate-500">Пункт {n}</div>
            <input type="text" placeholder="Заголовок" value={settings[`cons_restrict_${n}_title`] || ''} onChange={e => onChange(`cons_restrict_${n}_title`, e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
            <textarea rows={2} placeholder="Описание" value={settings[`cons_restrict_${n}_desc`] || ''} onChange={e => onChange(`cons_restrict_${n}_desc`, e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none" />
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-4">Что сохраняется (правая колонка)</h3>
      <div className="space-y-4">
        {[1,2,3,4,5].map(n => (
          <div key={n} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-3">
            <div className="text-xs font-bold text-slate-500">Пункт {n}</div>
            <input type="text" placeholder="Заголовок" value={settings[`cons_preserved_${n}_title`] || ''} onChange={e => onChange(`cons_preserved_${n}_title`, e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
            <textarea rows={2} placeholder="Описание" value={settings[`cons_preserved_${n}_desc`] || ''} onChange={e => onChange(`cons_preserved_${n}_desc`, e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none" />
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-3">Нижняя плашка</h3>
      {textareaInput('cons_bottom_note', 'Текст', settings['cons_bottom_note'] || '', onChange)}
    </div>
    <SaveBar loading={loading} saveMsg={saveMsg} onSave={onSave} />
  </div>
);