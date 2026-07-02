import Icon from '@/components/ui/icon';
import { TabProps, Settings } from './adminSettingsShared';
import { SaveBar, textInput, textareaInput, SettingsField } from './AdminTabsShared';

// ─── ContentTab ───────────────────────────────────────────────────────────────

export const ContentTab = ({ settings, onChange, loading, saveMsg, onSave }: TabProps) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-5">Главный экран (Hero)</h3>
      <div className="space-y-4">
        {[
          { key: 'hero_title', label: 'Заголовок', multiline: false },
          { key: 'hero_subtitle', label: 'Подзаголовок', multiline: true },
        ].map(f => <SettingsField key={f.key} f={f} settings={settings} onChange={onChange} />)}
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

// ─── FormsTab ─────────────────────────────────────────────────────────────────

const FormsSuccessField = ({ f, settings, onChange }: {
  f: { key: string; label: string; multiline?: boolean };
  settings: Settings;
  onChange: (key: string, value: string) => void;
}) => (
  <div>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
    {f.multiline ? (
      <textarea rows={2} value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] resize-none" />
    ) : (
      <input type="text" value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
    )}
  </div>
);

export const FormsTab = ({ settings, onChange, loading, saveMsg, onSave }: TabProps) => (
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
              <input type="text" value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
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
            <input type="text" value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
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
            <input type="text" value={settings[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C]" />
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
        ].map(f => <FormsSuccessField key={f.key} f={f} settings={settings} onChange={onChange} />)}
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

// ─── SeoTab ───────────────────────────────────────────────────────────────────

export const SeoTab = ({ settings, onChange, loading, saveMsg, onSave }: TabProps) => (
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

// ─── HeroTab ──────────────────────────────────────────────────────────────────

export const HeroTab = ({ settings, onChange, loading, saveMsg, onSave }: TabProps) => (
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

// ─── AdvantagesTab ────────────────────────────────────────────────────────────

export const AdvantagesTab = ({ settings, onChange, loading, saveMsg, onSave }: TabProps) => (
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

// ─── StepsTab ─────────────────────────────────────────────────────────────────

export const StepsTab = ({ settings, onChange, loading, saveMsg, onSave }: TabProps) => (
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
