import { TabProps } from './adminSettingsShared';
import { SaveBar, textInput, textareaInput } from './AdminTabsShared';

// ─── StagesTab ────────────────────────────────────────────────────────────────

export const StagesTab = ({ settings, onChange, loading, saveMsg, onSave }: TabProps) => (
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

// ─── ConsequencesTab ──────────────────────────────────────────────────────────

export const ConsequencesTab = ({ settings, onChange, loading, saveMsg, onSave }: TabProps) => (
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

// ─── PaymentsTab ──────────────────────────────────────────────────────────────

export const PaymentsTab = ({ settings, onChange, loading, saveMsg, onSave }: TabProps) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-5">Заголовок страницы</h3>
      <div className="space-y-4">
        {textInput('pay_page_tag', 'Тег', settings['pay_page_tag'] || '', onChange)}
        {textInput('pay_page_title_1', 'Заголовок слово 1', settings['pay_page_title_1'] || '', onChange)}
        {textInput('pay_page_title_2', 'Заголовок слово 2 (синее)', settings['pay_page_title_2'] || '', onChange)}
        {textInput('pay_page_title_3', 'Заголовок слово 3', settings['pay_page_title_3'] || '', onChange)}
        {textareaInput('pay_page_desc', 'Описание', settings['pay_page_desc'] || '', onChange)}
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-5">Карточки итогов</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {[1,2,3,4].map(n => (
          <div key={n} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase">Карточка {n}</div>
            {textInput(`pay_sum_${n}_value`, 'Значение', settings[`pay_sum_${n}_value`] || '', onChange)}
            {textInput(`pay_sum_${n}_label`, 'Заголовок', settings[`pay_sum_${n}_label`] || '', onChange)}
            {textInput(`pay_sum_${n}_sub`, 'Подпись', settings[`pay_sum_${n}_sub`] || '', onChange)}
          </div>
        ))}
      </div>
    </div>
    {[
      { n: 1, title: 'Категория 1 — Судебные расходы' },
      { n: 2, title: 'Категория 2 — Вознаграждение управляющего' },
      { n: 3, title: 'Категория 3 — Публикации и уведомления' },
      { n: 4, title: 'Категория 4 — Дополнительные расходы' },
    ].map(({ n, title }) => (
      <div key={n} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-slate-900 mb-4">{title}</h3>
        {textInput(`pay_cat_${n}_title`, 'Название категории', settings[`pay_cat_${n}_title`] || '', onChange)}
        <div className="mt-4 space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase">Строка {i}</div>
              {textInput(`pay_cat_${n}_i${i}_label`, 'Название', settings[`pay_cat_${n}_i${i}_label`] || '', onChange)}
              {textInput(`pay_cat_${n}_i${i}_value`, 'Сумма', settings[`pay_cat_${n}_i${i}_value`] || '', onChange)}
              {textareaInput(`pay_cat_${n}_i${i}_note`, 'Примечание', settings[`pay_cat_${n}_i${i}_note`] || '', onChange)}
            </div>
          ))}
        </div>
      </div>
    ))}
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-5">Блок МФЦ</h3>
      <div className="space-y-4">
        {textInput('pay_mfc_title', 'Заголовок', settings['pay_mfc_title'] || '', onChange)}
        {textareaInput('pay_mfc_text', 'Текст', settings['pay_mfc_text'] || '', onChange)}
        {textInput('pay_mfc_value', 'Сумма (крупная)', settings['pay_mfc_value'] || '', onChange)}
        {textInput('pay_mfc_sub', 'Подпись к сумме', settings['pay_mfc_sub'] || '', onChange)}
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-3">Нижняя плашка «Важно»</h3>
      {textareaInput('pay_bottom_note', 'Текст', settings['pay_bottom_note'] || '', onChange)}
    </div>
    <SaveBar loading={loading} saveMsg={saveMsg} onSave={onSave} />
  </div>
);

// ─── IndexTab ─────────────────────────────────────────────────────────────────

export const IndexTab = ({ settings, onChange, loading, saveMsg, onSave }: TabProps) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-5">Hero-полоса</h3>
      <div className="space-y-4">
        {textInput('index_tag', 'Тег', settings['index_tag'] || '', onChange)}
        {textInput('index_title_1', 'Заголовок строка 1', settings['index_title_1'] || '', onChange)}
        {textInput('index_title_2', 'Заголовок строка 2', settings['index_title_2'] || '', onChange)}
        {textInput('index_desc', 'Подпись', settings['index_desc'] || '', onChange)}
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-heading font-bold text-slate-900 mb-5">Мини-статистика</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {[1,2,3,4].map(n => (
          <div key={n} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase">Блок {n}</div>
            {textInput(`index_stat_${n}_value`, 'Значение', settings[`index_stat_${n}_value`] || '', onChange)}
            {textInput(`index_stat_${n}_label`, 'Подпись', settings[`index_stat_${n}_label`] || '', onChange)}
          </div>
        ))}
      </div>
    </div>
    <SaveBar loading={loading} saveMsg={saveMsg} onSave={onSave} />
  </div>
);
