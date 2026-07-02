import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useSiteContent } from '@/hooks/useSiteContent';
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
  hint: string;
  details: string[];
}

const STAGE_ICONS = ['FileText', 'Scale', 'CalendarClock', 'Gavel', 'CircleCheckBig'];
const STAGE_COLORS = ['#1B3F7C', '#1D4ED8', '#2563EB', '#3B82F6', '#0F766E'];

// Статичная детализированная информация по каждому этапу
const STAGE_RICH: {
  what: string;
  who: string;
  result: string;
  docs: string[];
  important: string;
}[] = [
  {
    what: 'Гражданин или его адвокат подаёт заявление о признании банкротом в арбитражный суд по месту жительства. Одновременно вносится депозит на вознаграждение финансового управляющего.',
    who: 'Должник или его представитель (адвокат)',
    result: 'Суд принимает заявление к производству и назначает дату первого заседания',
    docs: [
      'Паспорт и СНИЛС',
      'Список всех кредиторов с суммами долга',
      'Выписки по счетам и кредитным договорам',
      'Опись имущества (квартира, авто, ценности)',
      'Справки о доходах за последние 3 года',
      'Сведения о сделках за последние 3 года',
    ],
    important: 'Госпошлина — 300 ₽. Депозит на управляющего — 25 000 ₽ за одну процедуру.',
  },
  {
    what: 'Суд изучает представленные документы, проверяет наличие признаков банкротства и платёжеспособность должника. На этом заседании назначается финансовый управляющий из СРО.',
    who: 'Арбитражный суд и финансовый управляющий',
    result: 'Суд признаёт заявление обоснованным и вводит одну из процедур: реструктуризацию или реализацию имущества',
    docs: [
      'Подтверждение получения копий заявления кредиторами',
      'Дополнительные документы по запросу суда',
      'Сведения о кандидатуре финансового управляющего',
    ],
    important: 'С момента введения процедуры останавливается начисление штрафов, пеней и процентов по всем долгам.',
  },
  {
    what: 'Если у должника есть стабильный доход, суд может утвердить план погашения долгов сроком до трёх лет. В этот период должник платит по графику, имущество не продаётся.',
    who: 'Финансовый управляющий разрабатывает план; кредиторы и суд его утверждают',
    result: 'Утверждённый план погашения; кредиторы получают частичное удовлетворение требований',
    docs: [
      'Проект плана реструктуризации',
      'Подтверждение источников дохода',
      'Согласие кредиторов (при наличии)',
    ],
    important: 'Если доходов нет или план не утверждён — суд переходит к реализации имущества.',
  },
  {
    what: 'Финансовый управляющий формирует конкурсную массу: всё имущество должника, которое можно продать. Имущество оценивается и реализуется на электронных торгах.',
    who: 'Финансовый управляющий проводит оценку, организует торги и распределяет средства',
    result: 'Имущество продано, вырученные деньги распределены между кредиторами пропорционально долгам',
    docs: [
      'Инвентаризационный список имущества',
      'Отчёт об оценке имущества',
      'Протоколы торгов',
      'Реестр требований кредиторов',
    ],
    important: 'Единственное жильё (если не в ипотеке), предметы быта, личные вещи и инструменты труда не изымаются.',
  },
  {
    what: 'После завершения торгов и расчётов с кредиторами суд выносит определение о завершении процедуры. Все оставшиеся долги перед кредиторами списываются.',
    who: 'Арбитражный суд выносит окончательное определение',
    result: 'Гражданин освобождается от всех долговых обязательств, включённых в реестр кредиторов',
    docs: [
      'Итоговый отчёт финансового управляющего',
      'Документы о закрытии счетов',
      'Определение суда о завершении дела',
    ],
    important: 'Долги по алиментам, возмещению вреда здоровью и субсидиарной ответственности не списываются.',
  },
];

const Index = () => {
  const [activeStage, setActiveStage] = useState<Stage | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'docs'>('overview');
  const navigate = useNavigate();
  const { g } = useSiteContent();

  const stages: Stage[] = [1, 2, 3, 4, 5].map((n, i) => ({
    id: n,
    title: g(`stage_${n}_title`, ['Подача заявления','Рассмотрение судом','Реструктуризация долга','Реализация имущества','Списание долгов'][i]),
    short: g(`stage_${n}_short`, ['Старт процедуры','Проверка обоснованности','План погашения','Продажа активов','Финал процедуры'][i]),
    duration: g(`stage_${n}_duration`, ['1–2 недели','1–3 месяца','до 3 лет','6 месяцев','по итогу'][i]),
    icon: STAGE_ICONS[i],
    color: STAGE_COLORS[i],
    hint: g(`stage_${n}_hint`, ''),
    details: [1,2,3,4].map(d => g(`stage_${n}_detail_${d}`, '')).filter(Boolean),
  }));

  const rich = activeStage ? STAGE_RICH[activeStage.id - 1] : null;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-white text-slate-900 font-body">

        {/* Header */}
        <header className="border-b border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/')} className="flex items-center gap-2">
                <img
                  src="https://cdn.poehali.dev/projects/3e7e35fe-ef29-4a30-b52d-2ba872294646/bucket/9887576b-326b-4273-a0f5-2a485157ab4a.png"
                  alt="АБ Правовой статус"
                  className="h-9 w-auto object-contain"
                />
                <div>
                  <div className="font-heading font-bold text-slate-900 text-sm leading-none">АБ «Правовой статус»</div>
                  <div className="text-xs text-slate-400 leading-none mt-0.5">Адвокатское бюро</div>
                </div>
              </button>
            </div>
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <button onClick={() => navigate('/')} className="hover:text-[#1B3F7C] transition-colors">Главная</button>
              <Icon name="ChevronRight" size={13} className="text-slate-300" />
              <span className="text-slate-900 font-medium">Этапы процедуры</span>
            </nav>
          </div>
        </header>

        {/* Hero strip */}
        <div className="bg-[#1B3F7C]">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 mb-5">
                <Icon name="ListOrdered" size={13} className="text-blue-200" />
                <span className="text-xs text-blue-100 font-medium">{g('index_tag', 'Пошаговая инструкция')}</span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white leading-tight">
                {g('index_title_1', 'Этапы банкротства')}<br />{g('index_title_2', 'физического лица')}
              </h1>
            </div>
            <p className="text-blue-200 text-sm max-w-xs md:text-right leading-relaxed">
              {g('index_desc', 'Нажмите на любой этап — откроется подробное описание шага')}
            </p>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-6 py-16">

          {/* Timeline cards */}
          <div className="relative">
            <div className="hidden lg:block absolute top-[52px] left-[52px] right-[52px] h-px bg-slate-100 z-0" />
            <div className="hidden lg:block absolute top-[52px] left-[52px] h-px z-0"
              style={{ width: 'calc(80%)', background: 'linear-gradient(to right, #1B3F7C, #3B82F6)' }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4">
              {stages.map((stage, i) => (
                <Tooltip key={stage.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => { setActiveStage(stage); setActiveTab('overview'); }}
                      className="group relative flex flex-col items-center text-center animate-fade-in border border-slate-100 rounded-2xl p-5 bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0 }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: stage.color }} />

                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mt-2 z-10"
                        style={{ backgroundColor: `${stage.color}12` }}
                      >
                        <Icon name={stage.icon} size={26} style={{ color: stage.color }} fallback="Circle" />
                      </div>

                      <span className="w-6 h-6 rounded-full bg-white border-2 text-[11px] font-heading font-black flex items-center justify-center mb-2 shadow-sm"
                        style={{ borderColor: stage.color, color: stage.color }}>
                        {stage.id}
                      </span>

                      <h3 className="font-heading font-semibold text-sm mb-1 text-slate-800 group-hover:text-[#1B3F7C] transition-colors leading-tight">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-400 mb-3">{stage.short}</p>
                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: `${stage.color}10`, color: stage.color }}
                      >
                        <Icon name="Clock" size={11} />
                        {stage.duration}
                      </span>

                      {/* Hint preview */}
                      {stage.hint && (
                        <p className="mt-3 text-[11px] text-slate-400 leading-relaxed line-clamp-2 text-center">
                          {stage.hint}
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-1 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: stage.color }}>
                        Подробнее
                        <Icon name="ArrowRight" size={11} />
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs bg-slate-900 border-slate-800 text-white text-center">
                    {stage.hint || stage.title}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 bg-[#1B3F7C] rounded-2xl grid grid-cols-2 md:grid-cols-4 animate-fade-in" style={{ animationDelay: '0.7s', opacity: 0 }}>
            {[
              { icon: 'Wallet',      value: g('index_stat_1_value', 'от 25 000 ₽'),  label: g('index_stat_1_label', 'минимальный долг для МФЦ') },
              { icon: 'Timer',       value: g('index_stat_2_value', '6–12 мес'),      label: g('index_stat_2_label', 'средний срок процедуры') },
              { icon: 'Home',        value: g('index_stat_3_value', 'сохраняется'),   label: g('index_stat_3_label', 'единственное жильё') },
              { icon: 'ShieldCheck', value: g('index_stat_4_value', '100%'),          label: g('index_stat_4_label', 'списание долгов') },
            ].map((s, i) => (
              <div key={s.label} className={`p-6 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}>
                <Icon name={s.icon} size={20} className="text-blue-300 mx-auto mb-2" fallback="Star" />
                <div className="font-heading font-black text-xl text-white">{s.value}</div>
                <div className="text-xs text-blue-300 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Link to consequences */}
          <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 flex flex-col sm:flex-row items-center gap-5 justify-between animate-fade-in" style={{ animationDelay: '0.8s', opacity: 0 }}>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Icon name="AlertTriangle" size={22} className="text-amber-600" fallback="Alert" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-slate-900">{g('card_consequences_title', 'Последствия банкротства')}</h3>
                <p className="text-sm text-slate-500">{g('card_consequences_desc', 'Ограничения, сроки, что сохраняется — на отдельной странице')}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/consequences')}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B3F7C] text-white font-semibold text-sm hover:bg-[#163270] transition-colors"
            >
              Перейти
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          {/* На главную */}
          <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.9s', opacity: 0 }}>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-[#1B3F7C] hover:text-white hover:border-[#1B3F7C] transition-all shadow-sm"
            >
              <Icon name="Home" size={16} />
              На главную
            </button>
          </div>

        </main>

        {/* Modal */}
        {activeStage && rich && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveStage(null)}
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Colored header */}
              <div className="shrink-0 px-8 pt-7 pb-6" style={{ background: `linear-gradient(135deg, ${activeStage.color}15, ${activeStage.color}05)`, borderBottom: `1px solid ${activeStage.color}20` }}>
                <button
                  onClick={() => setActiveStage(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
                >
                  <Icon name="X" size={16} className="text-slate-500" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: `${activeStage.color}18` }}>
                    <Icon name={activeStage.icon} size={28} style={{ color: activeStage.color }} fallback="Circle" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-heading font-bold px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: `${activeStage.color}15`, color: activeStage.color }}>
                        Этап {activeStage.id} из 5
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-white/70 text-slate-600">
                        <Icon name="Clock" size={11} />
                        {activeStage.duration}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-xl text-slate-900 leading-tight">{activeStage.title}</h2>
                    <p className="text-sm text-slate-500 mt-0.5">{activeStage.short}</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mt-5">
                  {(['overview', 'docs'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {tab === 'overview' ? 'Описание' : 'Документы'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 px-8 py-6 space-y-5">

                {activeTab === 'overview' && (
                  <>
                    {/* What happens */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${activeStage.color}12` }}>
                          <Icon name="Info" size={13} style={{ color: activeStage.color }} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Что происходит</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">{rich.what}</p>
                    </div>

                    {/* Who / Result row */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="rounded-2xl p-4 border border-slate-100 bg-slate-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="User" size={14} className="text-slate-400" />
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Кто участвует</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{rich.who}</p>
                      </div>
                      <div className="rounded-2xl p-4 border border-slate-100" style={{ backgroundColor: `${activeStage.color}06` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="CheckCircle" size={14} style={{ color: activeStage.color }} />
                          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: activeStage.color }}>Результат</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{rich.result}</p>
                      </div>
                    </div>

                    {/* Details from DB */}
                    {activeStage.details.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${activeStage.color}12` }}>
                            <Icon name="ListChecks" size={13} style={{ color: activeStage.color }} fallback="List" />
                          </div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Ключевые шаги</span>
                        </div>
                        <div className="space-y-2">
                          {activeStage.details.map((d, i) => (
                            <div key={i} className="flex items-start gap-3 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100">
                              <div className="mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold"
                                style={{ backgroundColor: `${activeStage.color}12`, color: activeStage.color }}>
                                {i + 1}
                              </div>
                              <span className="text-slate-700 text-sm">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Important note */}
                    <div className="flex items-start gap-3 rounded-2xl p-4 bg-amber-50 border border-amber-100">
                      <Icon name="AlertTriangle" size={16} className="text-amber-600 shrink-0 mt-0.5" fallback="Alert" />
                      <p className="text-sm text-amber-900 leading-relaxed">
                        <strong>Важно: </strong>{rich.important}
                      </p>
                    </div>
                  </>
                )}

                {activeTab === 'docs' && (
                  <>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${activeStage.color}12` }}>
                          <Icon name="FolderOpen" size={13} style={{ color: activeStage.color }} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Необходимые документы</span>
                      </div>
                      <div className="space-y-2">
                        {rich.docs.map((doc, i) => (
                          <div key={i} className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-white border border-slate-100 hover:border-slate-200 transition-colors">
                            <Icon name="FileText" size={14} className="text-slate-400 shrink-0" />
                            <span className="text-slate-700 text-sm">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl p-4 border border-blue-100 bg-blue-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Lightbulb" size={14} className="text-blue-600" fallback="Info" />
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Совет адвоката</span>
                      </div>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        Адвокаты АБ «Правовой статус» помогут собрать полный пакет документов и исключат риск отказа из-за неполного комплекта. Это экономит время и снижает стресс.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Footer nav */}
              <div className="shrink-0 px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const prev = stages.find(s => s.id === activeStage.id - 1);
                    if (prev) { setActiveStage(prev); setActiveTab('overview'); }
                  }}
                  disabled={activeStage.id === 1}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors"
                >
                  <Icon name="ChevronLeft" size={14} />
                  Назад
                </button>

                <div className="flex gap-1.5">
                  {stages.map(s => (
                    <button
                      key={s.id}
                      onClick={() => { setActiveStage(s); setActiveTab('overview'); }}
                      className="w-6 h-6 rounded-full text-[10px] font-bold transition-all"
                      style={
                        s.id === activeStage.id
                          ? { backgroundColor: activeStage.color, color: '#fff' }
                          : { backgroundColor: '#e2e8f0', color: '#64748b' }
                      }
                    >
                      {s.id}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const next = stages.find(s => s.id === activeStage.id + 1);
                    if (next) { setActiveStage(next); setActiveTab('overview'); }
                  }}
                  disabled={activeStage.id === 5}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors"
                >
                  Далее
                  <Icon name="ChevronRight" size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default Index;