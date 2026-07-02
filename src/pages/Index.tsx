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
    color: '#6366F1',
    gradient: 'from-indigo-500 to-violet-600',
    glow: 'shadow-indigo-500/50',
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
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'shadow-pink-500/50',
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
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/50',
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
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-700',
    glow: 'shadow-red-500/50',
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
    color: '#10B981',
    gradient: 'from-emerald-500 to-green-600',
    glow: 'shadow-emerald-500/50',
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
      <div className="min-h-screen bg-[#0B0B1A] text-white overflow-hidden relative font-body">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-pink-600/20 blur-[130px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-emerald-600/20 blur-[120px]" />
        </div>

        {/* Hero */}
        <header className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/70">Пошаговая инструкция 2025</span>
          </div>
          <h1
            className="font-heading font-black text-5xl md:text-7xl leading-[1.05] mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            <span className="bg-gradient-to-r from-indigo-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
              Этапы банкротства
            </span>
            <br />
            физического лица
          </h1>
          <p
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto animate-fade-in"
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
            <div className="hidden lg:block absolute top-[64px] left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-emerald-500 rounded-full opacity-40" />

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
                        <span
                          className="absolute inset-0 rounded-2xl animate-pulse-ring"
                          style={{ backgroundColor: stage.color }}
                        />
                        <div
                          className={`relative w-32 h-32 rounded-2xl bg-gradient-to-br ${stage.gradient} flex items-center justify-center shadow-xl ${stage.glow} transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2`}
                        >
                          <Icon
                            name={stage.icon}
                            size={44}
                            className="text-white"
                            fallback="Circle"
                          />
                          <span className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white text-[#0B0B1A] font-heading font-black text-sm flex items-center justify-center shadow-lg">
                            {stage.id}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-heading font-bold text-lg mb-1 transition-colors group-hover:text-white text-white/90">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-white/50 mb-2">{stage.short}</p>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${stage.color}22`,
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
                    className="max-w-xs bg-[#1A1A2E] border-white/10 text-white/80 text-center"
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
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5 hover:bg-white/10 transition-colors"
              >
                <Icon name={s.icon} size={26} className="text-pink-400 mb-3" fallback="Star" />
                <div className="font-heading font-bold text-xl">{s.value}</div>
                <div className="text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </main>

        {/* Modal */}
        {activeStage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveStage(null)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl bg-[#12122A] border border-white/10 p-8 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveStage(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={18} className="text-white/70" />
              </button>

              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeStage.gradient} flex items-center justify-center shadow-xl ${activeStage.glow} mb-5`}
              >
                <Icon name={activeStage.icon} size={36} className="text-white" fallback="Circle" />
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-sm font-heading font-black px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${activeStage.color}22`, color: activeStage.color }}
                >
                  Этап {activeStage.id}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-white/50">
                  <Icon name="Clock" size={14} />
                  {activeStage.duration}
                </span>
              </div>

              <h2 className="font-heading font-black text-3xl mb-2">{activeStage.title}</h2>
              <p className="text-white/60 mb-6">{activeStage.hint}</p>

              <div className="space-y-3">
                {activeStage.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-6 h-6 shrink-0 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${activeStage.color}22` }}
                    >
                      <Icon name="Check" size={14} style={{ color: activeStage.color }} />
                    </div>
                    <span className="text-white/80">{d}</span>
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
