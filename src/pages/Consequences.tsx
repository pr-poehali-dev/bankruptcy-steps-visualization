import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useSiteContent } from '@/hooks/useSiteContent';

const RESTRICT_ICONS = ['CreditCard', 'Briefcase', 'RefreshCw', 'Plane', 'PiggyBank'];
const PRESERVED_ICONS = ['Home', 'ShoppingCart', 'Car', 'Baby', 'Heart'];
const LIMIT_COLORS = ['#1D4ED8', '#1E3A8A', '#2563EB', '#3B82F6', '#0F766E'];

const Consequences = () => {
  const navigate = useNavigate();
  const { g } = useSiteContent();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative font-body">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-amber-100/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 max-w-6xl mx-auto px-6 pt-8 flex items-center gap-3">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-700 transition-colors">
          <Icon name="ChevronLeft" size={16} />
          Главная
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-700 font-medium">Последствия банкротства</span>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-24">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-sm text-slate-600">Важно знать заранее</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-slate-900 mb-4">
            Последствия <span className="text-amber-600">банкротства</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Банкротство освобождает от долгов, но накладывает ограничения. Ниже — полный
            перечень с указанием сроков действия.
          </p>
        </div>

        {/* Timeline bar */}
        <div
          className="bg-white border border-slate-200 rounded-3xl p-8 mb-8 shadow-sm animate-fade-in"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <h3 className="font-heading font-semibold text-slate-700 mb-6 text-sm uppercase tracking-widest">
            Шкала ограничений по времени
          </h3>
          <div className="space-y-5">
            {[1,2,3,4,5].map((n, i) => {
              const label = g(`cons_limit_${n}_label`, ['Запрет занимать руководящие должности','Запрет руководить банком или МФО','Обязанность уведомлять банки о банкротстве','Запрет повторного банкротства','Негативная кредитная история'][i]);
              const years = parseInt(g(`cons_limit_${n}_years`, ['3','10','5','5','7'][i]));
              const color = LIMIT_COLORS[i];
              return ({ label, years, max: 10, color });
            }).map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-slate-700">{item.label}</span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${item.color}12`, color: item.color }}
                  >
                    {item.years} {item.years === 3 ? 'года' : 'лет'}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(item.years / item.max) * 100}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Restrictions */}
          <div
            className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm animate-fade-in"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-red-500" fallback="Alert" />
              </div>
              <h2 className="font-heading font-bold text-xl text-slate-900">Ограничения</h2>
            </div>
            <div className="space-y-4">
              {[1,2,3,4,5].map((n, i) => ({
                icon: RESTRICT_ICONS[i],
                title: g(`cons_restrict_${n}_title`, ['Кредитная история','Запрет на руководство','Повторное банкротство','Выезд за рубеж','Новые займы'][i]),
                desc: g(`cons_restrict_${n}_desc`, ['Запись о банкротстве хранится 7–10 лет.','3 года нельзя быть директором ООО.','Следующую процедуру можно начать через 5 лет.','Суд вправе временно ограничить выезд.','5 лет сообщать кредиторам о банкротстве.'][i]),
              })).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-red-50 flex items-center justify-center">
                    <Icon name={item.icon} size={16} className="text-red-400" fallback="Circle" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm mb-0.5">{item.title}</div>
                    <div className="text-sm text-slate-500 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preserved */}
          <div
            className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm animate-fade-in"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                <Icon name="CheckCircle" size={20} className="text-teal-600" fallback="Check" />
              </div>
              <h2 className="font-heading font-bold text-xl text-slate-900">Что сохраняется</h2>
            </div>
            <div className="space-y-4">
              {[1,2,3,4,5].map((n, i) => ({
                icon: PRESERVED_ICONS[i],
                title: g(`cons_preserved_${n}_title`, ['Единственное жильё','Предметы быта','Авто для работы','Детские пособия','Трудовые права'][i]),
                desc: g(`cons_preserved_${n}_desc`, ['Квартира или дом, если не в ипотеке — не изымается.','Бытовая техника, одежда, мебель — остаётся.','Транспорт для профессиональной деятельности.','Выплаты на детей и алименты — не изымаются.','Банкротство не влияет на трудоустройство.'][i]),
              })).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-teal-50 flex items-center justify-center">
                    <Icon name={item.icon} size={16} className="text-teal-600" fallback="Circle" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm mb-0.5">{item.title}</div>
                    <div className="text-sm text-slate-500 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div
          className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 px-6 py-5 flex items-start gap-4 animate-fade-in"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          <Icon name="Info" size={20} className="text-blue-600 mt-0.5 shrink-0" fallback="Circle" />
          <p className="text-sm text-blue-800 leading-relaxed">
            {g('cons_bottom_note', 'Важно: долги по алиментам, возмещению вреда здоровью и уголовным штрафам не списываются даже после завершения процедуры банкротства.')}
          </p>
        </div>

        {/* Bottom nav */}
        <div
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center animate-fade-in"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          <button
            onClick={() => navigate('/stages')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-800 text-white font-semibold text-sm hover:bg-blue-900 transition-colors shadow-md"
          >
            <Icon name="ListOrdered" size={16} fallback="List" />
            Посмотреть этапы процедуры
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

export default Consequences;