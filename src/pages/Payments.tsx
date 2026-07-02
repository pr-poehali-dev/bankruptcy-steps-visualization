import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useSiteContent } from '@/hooks/useSiteContent';

const CAT_META = [
  { icon: 'Landmark',  color: '#1E3A8A', bg: 'bg-blue-50',  textColor: 'text-blue-800', fixed: [true,  true,  false] },
  { icon: 'UserCheck', color: '#1D4ED8', bg: 'bg-blue-50',  textColor: 'text-blue-700', fixed: [true,  false, false] },
  { icon: 'Newspaper', color: '#2563EB', bg: 'bg-blue-50',  textColor: 'text-blue-600', fixed: [false, false, false] },
  { icon: 'Receipt',   color: '#0F766E', bg: 'bg-teal-50',  textColor: 'text-teal-700', fixed: [false, false, false] },
];

const SUM_COLORS = ['#0F766E', '#1D4ED8', '#2563EB', '#1E3A8A'];

const Payments = () => {
  const navigate = useNavigate();
  const { g } = useSiteContent();

  const CAT_DEFAULTS = [
    {
      title: 'Судебные расходы',
      items: [
        { label: 'Государственная пошлина',                          value: '300 ₽',      note: 'Оплачивается при подаче заявления в арбитражный суд' },
        { label: 'Депозит на вознаграждение финансового управляющего', value: '25 000 ₽',  note: 'За одну процедуру (реструктуризация или реализация). Вносится на депозит суда' },
        { label: 'Депозит при двух процедурах',                      value: '50 000 ₽',   note: 'Если сначала реструктуризация, затем реализация имущества' },
      ],
    },
    {
      title: 'Вознаграждение финансового управляющего',
      items: [
        { label: 'Фиксированное вознаграждение',          value: '25 000 ₽', note: 'За каждую процедуру — выплачивается из депозита суда' },
        { label: 'Процент от реализованного имущества',   value: '7%',       note: 'От суммы вырученных средств при продаже имущества должника' },
        { label: 'Процент от погашенных требований',      value: '7%',       note: 'При реструктуризации — от суммы, фактически выплаченной кредиторам' },
      ],
    },
    {
      title: 'Публикации и уведомления',
      items: [
        { label: 'Публикация в газете «Коммерсантъ»',  value: '~11 000 ₽',       note: 'За каждую процедуру. Цена зависит от объёма текста' },
        { label: 'Публикации в ЕФРСБ',                 value: '~5 000–10 000 ₽', note: 'Единый федеральный реестр сведений о банкротстве. Несколько обязательных публикаций' },
        { label: 'Почтовые уведомления кредиторам',    value: '~2 000–5 000 ₽',  note: 'Стоимость зависит от количества кредиторов' },
      ],
    },
    {
      title: 'Дополнительные расходы',
      items: [
        { label: 'Оценка имущества',                            value: 'от 5 000 ₽',       note: 'При наличии имущества, подлежащего реализации на торгах' },
        { label: 'Организация торгов (электронная площадка)',   value: '~5 000–15 000 ₽',  note: 'Зависит от площадки и стоимости лота' },
        { label: 'Юридическое сопровождение (адвокат/юрист)',  value: 'от 80 000 ₽',       note: 'Стоимость услуг представителя — зависит от сложности дела' },
      ],
    },
  ];

  const categories = CAT_META.map((meta, ci) => {
    const n = ci + 1;
    const def = CAT_DEFAULTS[ci];
    return {
      ...meta,
      title: g(`pay_cat_${n}_title`, def.title),
      items: [1, 2, 3].map((ii, idx) => ({
        label: g(`pay_cat_${n}_i${ii}_label`, def.items[idx].label),
        value: g(`pay_cat_${n}_i${ii}_value`, def.items[idx].value),
        note:  g(`pay_cat_${n}_i${ii}_note`,  def.items[idx].note),
        fixed: meta.fixed[idx],
      })),
    };
  });

  const SUM_DEFAULTS = [
    { value: '0 ₽',               label: 'Минимальные расходы (через МФЦ, без имущества)', sub: 'внесудебное банкротство — бесплатно' },
    { value: '~50 000 ₽',         label: 'Минимальные расходы (через суд)',                sub: 'госпошлина + управляющий + публикации' },
    { value: '~100 000–150 000 ₽', label: 'Средние расходы',                               sub: 'с учётом юридического сопровождения' },
    { value: 'индивидуально',      label: 'При наличии имущества',                          sub: 'зависит от состава и стоимости активов' },
  ];

  const summary = [1, 2, 3, 4].map((n, i) => ({
    value: g(`pay_sum_${n}_value`, SUM_DEFAULTS[i].value),
    label: g(`pay_sum_${n}_label`, SUM_DEFAULTS[i].label),
    sub:   g(`pay_sum_${n}_sub`,   SUM_DEFAULTS[i].sub),
    color: SUM_COLORS[i],
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative font-body">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-teal-100/40 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 max-w-6xl mx-auto px-6 pt-8 flex items-center gap-3">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-700 transition-colors">
          <Icon name="ChevronLeft" size={16} />
          Главная
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-700 font-medium">{g('pay_page_title_3', 'Обязательные платежи')}</span>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-24">

        {/* Header */}
        <div className="text-center mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-700" />
            <span className="text-sm text-slate-600">{g('pay_page_tag', 'Финансовая сторона процедуры')}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-slate-900 mb-4">
            {g('pay_page_title_1', 'Размеры')} <span className="text-blue-800">{g('pay_page_title_2', 'обязательных')}</span>
            <br />{g('pay_page_title_3', 'платежей')}
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            {g('pay_page_desc', 'Все расходы, которые несёт должник при прохождении процедуры банкротства физического лица')}
          </p>
        </div>

        {/* Summary row */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-fade-in"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          {summary.map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="font-heading font-black text-2xl mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="font-semibold text-slate-800 text-sm mb-1">{s.label}</div>
              <div className="text-xs text-slate-400">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((cat, ci) => (
            <div
              key={ci}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm animate-fade-in"
              style={{ animationDelay: `${0.15 + ci * 0.08}s`, opacity: 0 }}
            >
              <div className="flex items-center gap-4 px-8 py-5 border-b border-slate-100">
                <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center`}>
                  <Icon name={cat.icon} size={20} className={cat.textColor} fallback="Circle" />
                </div>
                <h2 className="font-heading font-bold text-lg text-slate-900">{cat.title}</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {cat.items.map((item, ii) => (
                  <div key={ii} className="px-8 py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 hover:bg-slate-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-slate-800">{item.label}</span>
                        {item.fixed && (
                          <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium mt-0.5">
                            фиксировано
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{item.note}</p>
                    </div>
                    <div className="shrink-0 font-heading font-black text-2xl md:text-right" style={{ color: cat.color }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* MFC block */}
        <div
          className="mt-8 bg-teal-800 rounded-3xl p-8 md:p-10 animate-fade-in"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Icon name="Building2" size={28} className="text-white" fallback="Home" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                {g('pay_mfc_title', 'Внесудебное банкротство через МФЦ — бесплатно')}
              </h3>
              <p className="text-teal-200 text-sm leading-relaxed">
                {g('pay_mfc_text', 'Если долг от 25 000 до 1 000 000 ₽ и исполнительные производства окончены в связи с отсутствием имущества — можно подать на банкротство через МФЦ. Госпошлина, публикации и управляющий не требуются. Процедура занимает 6 месяцев.')}
              </p>
            </div>
            <div className="shrink-0 text-center">
              <div className="font-heading font-black text-4xl text-white">{g('pay_mfc_value', '0 ₽')}</div>
              <div className="text-teal-300 text-sm">{g('pay_mfc_sub', 'через МФЦ')}</div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div
          className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 px-6 py-5 flex items-start gap-4 animate-fade-in"
          style={{ animationDelay: '0.55s', opacity: 0 }}
        >
          <Icon name="Info" size={20} className="text-blue-600 mt-0.5 shrink-0" fallback="Circle" />
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong>Важно:</strong> {g('pay_bottom_note', 'указанные суммы актуальны по состоянию на 2025 год.')}
          </p>
        </div>

        {/* Navigation */}
        <div
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          <button
            onClick={() => navigate('/stages')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-800 text-white font-semibold text-sm hover:bg-blue-900 transition-colors shadow-md"
          >
            <Icon name="ListOrdered" size={16} fallback="List" />
            {g('card_stages_title', 'Этапы процедуры')}
          </button>
          <button
            onClick={() => navigate('/consequences')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:border-blue-200 hover:text-blue-800 transition-all shadow-sm"
          >
            <Icon name="AlertTriangle" size={16} fallback="Alert" />
            {g('card_consequences_title', 'Последствия банкротства')}
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-[#1B3F7C] hover:text-white hover:border-[#1B3F7C] transition-all shadow-sm"
          >
            <Icon name="Home" size={16} />
            На главную
          </button>
        </div>

      </div>
    </div>
  );
};

export default Payments;