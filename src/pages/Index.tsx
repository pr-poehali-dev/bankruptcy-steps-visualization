import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Stage {
  id: number;
  title: string;
  short: string;
  duration: string;
  icon: string;
  color: string;
  gradient: string;
  glow: string;
  hint: string;
  details: string[];
}

const stages: Stage[] = [
  {
    id: 1,
    title: 'Подача заявления',
    short: 'Старт процедуры',
    duration: '1–2 недели',
    icon: 'FileText',
    color: '#1E3A8A',
    gradient: 'from-blue-800 to-blue-900',
    glow: 'shadow-blue-900/10',
    hint: 'Заявление подаётся в арбитражный суд или через МФЦ при долге от 25 000 ₽',
    details: [
      'Сбор документов: паспорт, СНИЛС, список кредиторов и долгов',
      'Подготовка описи имущества и сделок за 3 года',
      'Оплата госпошлины 300 ₽ и депозит на управляющего',
      'Подача в арбитражный суд по месту жительства',
    ],
  },
  {
    id: 2,
    title: 'Рассмотрение судом',
    short: 'Проверка обоснованности',
    duration: '1–3 месяца',
    icon: 'Scale',
    color: '#1D4ED8',
    gradient: 'from-blue-700 to-blue-800',
    glow: 'shadow-blue-800/10',
    hint: 'Суд проверяет заявление и признаёт его обоснованным или отклоняет',
    details: [
      'Первое судебное заседание по делу',
      'Проверка признаков банкротства и платёжеспособности',
      'Назначение финансового управляющего',
      'Выбор процедуры: реструктуризация или реализация',
    ],
  },
  {
    id: 3,
    title: 'Реструктуризация долга',
    short: 'План погашения',
    duration: 'до 3 лет',
    icon: 'CalendarClock',
    color: '#2563EB',
    gradient: 'from-blue-600 to-blue-700',
    glow: 'shadow-blue-700/10',
    hint: 'Если есть доход — суд утверждает план погашения на срок до 3 лет',
    details: [
      'Разработка плана реструктуризации',
      'Замораживание процентов и штрафов по долгам',
      'Погашение по утверждённому графику',
      'Возможность сохранить имущество',
    ],
  },
  {
    id: 4,
    title: 'Реализация имущества',
    short: 'Продажа активов',
    duration: '6 месяцев',
    icon: 'Gavel',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-600',
    glow: 'shadow-blue-600/10',
    hint: 'Имущество продаётся с торгов, деньги делятся между кредиторами',
    details: [
      'Формирование конкурсной массы',
      'Оценка и продажа имущества на торгах',
      'Единственное жильё не изымается (кроме ипотеки)',
      'Распределение средств между кредиторами',
    ],
  },
  {
    id: 5,
    title: 'Списание долгов',
    short: 'Финал процедуры',
    duration: 'по итогу',
    icon: 'CircleCheckBig',
    color: '#0F766E',
    gradient: 'from-teal-700 to-teal-800',
    glow: 'shadow-teal-800/10',
    hint: 'Оставшиеся долги списываются, гражданин освобождается от обязательств',
    details: [
      'Суд выносит определение о завершении процедуры',
      'Списание всех оставшихся долгов',
      'Освобождение от требований кредиторов',
      'Начало жизни без долгового бремени',
    ],
  },
];

const Index = () => {
  const [activeStage, setActiveStage] = useState<Stage | null>(null);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative font-body">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[120px]" />
        </div>

        {/* Hero */}
        <header className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-blue-700" />
            <span className="text-sm text-slate-600">Пошаговая инструкция</span>
          </div>
          <h1
            className="font-heading font-extrabold text-5xl md:text-7xl leading-[1.05] mb-6 animate-fade-in text-slate-900"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            <span className="text-blue-800">Этапы банкротства</span>
            <br />
            физического лица
          </h1>
          <p
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            Интерактивная схема всего пути — от подачи заявления до полного списания
            долгов. Наведите на этап для подсказки, кликните для деталей.
          </p>
        </header>

        {/* Timeline */}
        <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
          <div className="relative mt-16">
            {/* Progress line (desktop) */}
            <div className="hidden lg:block absolute top-[64px] left-0 right-0 h-0.5 bg-slate-200 rounded-full" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
              {stages.map((stage, i) => (
                <Tooltip key={stage.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveStage(stage)}
                      className="group relative flex flex-col items-center text-center animate-fade-in"
                      style={{ animationDelay: `${0.3 + i * 0.12}s`, opacity: 0 }}
                    >
                      {/* Number badge */}
                      <div className="relative mb-4">
                        <div
                          className={`relative w-28 h-28 rounded-2xl bg-gradient-to-br ${stage.gradient} flex items-center justify-center shadow-md ${stage.glow} ring-4 ring-white transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lg`}
                        >
                          <Icon
                            name={stage.icon}
                            size={40}
                            className="text-white"
                            fallback="Circle"
                          />
                          <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-slate-900 font-heading font-bold text-sm flex items-center justify-center shadow-sm border border-slate-100">
                            {stage.id}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-heading font-semibold text-lg mb-1 transition-colors group-hover:text-blue-800 text-slate-800">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-2">{stage.short}</p>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${stage.color}12`,
                          color: stage.color,
                        }}
                      >
                        <Icon name="Clock" size={12} />
                        {stage.duration}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="max-w-xs bg-slate-900 border-slate-800 text-white text-center"
                  >
                    {stage.hint}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in"
            style={{ animationDelay: '1s', opacity: 0 }}
          >
            {[
              { icon: 'Wallet', value: 'от 25 000 ₽', label: 'минимальный долг для МФЦ' },
              { icon: 'Timer', value: '6–12 мес', label: 'средний срок процедуры' },
              { icon: 'Home', value: 'сохраняется', label: 'единственное жильё' },
              { icon: 'ShieldCheck', value: '100%', label: 'списание долгов' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 hover:shadow-md hover:border-blue-200 transition-all"
              >
                <Icon name={s.icon} size={26} className="text-blue-700 mb-3" fallback="Star" />
                <div className="font-heading font-bold text-xl text-slate-900">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </main>

        {/* Consequences Section */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
          <div className="text-center mb-14 animate-fade-in" style={{ animationDelay: '1.2s', opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-sm text-slate-600">Важно знать заранее</span>
            </div>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-slate-900 mb-4">
              Последствия банкротства
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Банкротство освобождает от долгов, но накладывает ограничения. Ниже — полный
              перечень с указанием сроков действия.
            </p>
          </div>

          {/* Timeline bar */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-8 shadow-sm animate-fade-in" style={{ animationDelay: '1.3s', opacity: 0 }}>
            <h3 className="font-heading font-semibold text-slate-700 mb-6 text-sm uppercase tracking-widest">Шкала ограничений по времени</h3>
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
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.color}12`, color: item.color }}>
                      {item.years} {item.years === 10 ? 'лет' : item.years >= 5 ? 'лет' : 'года'}
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
            {/* Negative */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm animate-fade-in" style={{ animationDelay: '1.4s', opacity: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-red-500" fallback="Alert" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900">Ограничения</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: 'CreditCard', title: 'Кредитная история', desc: 'Запись о банкротстве хранится 7–10 лет. Банки будут требовать её раскрытия при заявках.' },
                  { icon: 'Briefcase', title: 'Запрет на руководство', desc: '3 года нельзя быть директором ООО, 5 лет — руководить МФО, 10 лет — банком.' },
                  { icon: 'RefreshCw', title: 'Повторное банкротство', desc: 'Следующую процедуру можно начать не ранее чем через 5 лет.' },
                  { icon: 'Plane', title: 'Выезд за рубеж', desc: 'Суд вправе временно ограничить выезд до завершения процедуры.' },
                  { icon: 'PiggyBank', title: 'Новые займы', desc: '5 лет обязательно сообщать кредиторам о факте банкротства при подаче заявок.' },
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

            {/* Positive */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm animate-fade-in" style={{ animationDelay: '1.5s', opacity: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-teal-600" fallback="Check" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900">Что сохраняется</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: 'Home', title: 'Единственное жильё', desc: 'Квартира или дом, если не в ипотеке — не изымается ни при каких условиях.' },
                  { icon: 'ShoppingCart', title: 'Предметы быта', desc: 'Бытовая техника, одежда, мебель — всё необходимое для жизни остаётся.' },
                  { icon: 'Car', title: 'Авто для работы', desc: 'Транспортное средство, без которого невозможна профессиональная деятельность.' },
                  { icon: 'Baby', title: 'Детские пособия', desc: 'Выплаты на детей и алименты — не входят в конкурсную массу.' },
                  { icon: 'Heart', title: 'Трудовые права', desc: 'Банкротство не влияет на трудоустройство и не является основанием для увольнения.' },
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
          <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 px-6 py-5 flex items-start gap-4 animate-fade-in" style={{ animationDelay: '1.6s', opacity: 0 }}>
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5 shrink-0" fallback="Circle" />
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong>Важно:</strong> долги по алиментам, возмещению вреда здоровью и уголовным штрафам не списываются даже после завершения процедуры банкротства.
            </p>
          </div>
        </section>

        {/* Modal */}
        {activeStage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveStage(null)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-8 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveStage(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={18} className="text-slate-500" />
              </button>

              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeStage.gradient} flex items-center justify-center shadow-md ${activeStage.glow} mb-5`}
              >
                <Icon name={activeStage.icon} size={36} className="text-white" fallback="Circle" />
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-sm font-heading font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${activeStage.color}12`, color: activeStage.color }}
                >
                  Этап {activeStage.id}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-slate-400">
                  <Icon name="Clock" size={14} />
                  {activeStage.duration}
                </span>
              </div>

              <h2 className="font-heading font-bold text-3xl mb-2 text-slate-900">{activeStage.title}</h2>
              <p className="text-slate-500 mb-6">{activeStage.hint}</p>

              <div className="space-y-3">
                {activeStage.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-6 h-6 shrink-0 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${activeStage.color}12` }}
                    >
                      <Icon name="Check" size={14} style={{ color: activeStage.color }} />
                    </div>
                    <span className="text-slate-700">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default Index;