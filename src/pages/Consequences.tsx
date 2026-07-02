import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Consequences = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative font-body">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-amber-100/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 max-w-6xl mx-auto px-6 pt-8 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-700 transition-colors"
        >
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
            {[
              { label: 'Запрет занимать руководящие должности', years: 3, max: 10, color: '#1D4ED8' },
              { label: 'Запрет руководить банком или МФО', years: 10, max: 10, color: '#1E3A8A' },
              { label: 'Обязанность уведомлять банки о банкротстве', years: 5, max: 10, color: '#2563EB' },
              { label: 'Запрет повторного банкротства', years: 5, max: 10, color: '#3B82F6' },
              { label: 'Негативная кредитная история', years: 7, max: 10, color: '#0F766E' },
            ].map((item, i) => (
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
              {[
                {
                  icon: 'CreditCard',
                  title: 'Кредитная история',
                  desc: 'Запись о банкротстве хранится 7–10 лет. Банки будут требовать её раскрытия при заявках.',
                },
                {
                  icon: 'Briefcase',
                  title: 'Запрет на руководство',
                  desc: '3 года нельзя быть директором ООО, 5 лет — руководить МФО, 10 лет — банком.',
                },
                {
                  icon: 'RefreshCw',
                  title: 'Повторное банкротство',
                  desc: 'Следующую процедуру можно начать не ранее чем через 5 лет.',
                },
                {
                  icon: 'Plane',
                  title: 'Выезд за рубеж',
                  desc: 'Суд вправе временно ограничить выезд до завершения процедуры.',
                },
                {
                  icon: 'PiggyBank',
                  title: 'Новые займы',
                  desc: '5 лет обязательно сообщать кредиторам о факте банкротства при подаче заявок.',
                },
              ].map((item, i) => (
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
              {[
                {
                  icon: 'Home',
                  title: 'Единственное жильё',
                  desc: 'Квартира или дом, если не в ипотеке — не изымается ни при каких условиях.',
                },
                {
                  icon: 'ShoppingCart',
                  title: 'Предметы быта',
                  desc: 'Бытовая техника, одежда, мебель — всё необходимое для жизни остаётся.',
                },
                {
                  icon: 'Car',
                  title: 'Авто для работы',
                  desc: 'Транспортное средство, без которого невозможна профессиональная деятельность.',
                },
                {
                  icon: 'Baby',
                  title: 'Детские пособия',
                  desc: 'Выплаты на детей и алименты — не входят в конкурсную массу.',
                },
                {
                  icon: 'Heart',
                  title: 'Трудовые права',
                  desc: 'Банкротство не влияет на трудоустройство и не является основанием для увольнения.',
                },
              ].map((item, i) => (
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
            <strong>Важно:</strong> долги по алиментам, возмещению вреда здоровью и уголовным
            штрафам не списываются даже после завершения процедуры банкротства.
          </p>
        </div>

        {/* Back to stages */}
        <div
          className="mt-8 text-center animate-fade-in"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          <button
            onClick={() => navigate('/stages')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-800 text-white font-semibold text-sm hover:bg-blue-900 transition-colors shadow-md"
          >
            <Icon name="ListOrdered" size={16} fallback="List" />
            Посмотреть этапы процедуры
          </button>
        </div>
      </div>
    </div>
  );
};

export default Consequences;
