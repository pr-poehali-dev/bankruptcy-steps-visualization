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

const Index = () => {
  const [activeStage, setActiveStage] = useState<Stage | null>(null);
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
              <Icon name="ChevronRight" size={14} className="text-slate-300" />
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
                <span className="text-xs text-blue-100 font-medium">Пошаговая инструкция</span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white leading-tight">
                Этапы банкротства<br />физического лица
              </h1>
            </div>
            <p className="text-blue-200 text-sm max-w-xs md:text-right leading-relaxed">
              Нажмите на любой этап — откроется подробное описание шага
            </p>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-6 py-16">

          {/* Timeline cards */}
          <div className="relative">
            {/* Desktop line */}
            <div className="hidden lg:block absolute top-[52px] left-[52px] right-[52px] h-px bg-slate-100 z-0" />
            <div className="hidden lg:block absolute top-[52px] left-[52px] h-px z-0"
              style={{ width: 'calc(80%)', background: 'linear-gradient(to right, #1B3F7C, #3B82F6)' }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4">
              {stages.map((stage, i) => (
                <Tooltip key={stage.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveStage(stage)}
                      className="group relative flex flex-col items-center text-center animate-fade-in border border-slate-100 rounded-2xl p-5 bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0 }}
                    >
                      {/* Top accent */}
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
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs bg-slate-900 border-slate-800 text-white text-center">
                    {stage.hint}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 bg-[#1B3F7C] rounded-2xl grid grid-cols-2 md:grid-cols-4 animate-fade-in" style={{ animationDelay: '0.7s', opacity: 0 }}>
            {[
              { icon: 'Wallet', value: 'от 25 000 ₽', label: 'минимальный долг для МФЦ' },
              { icon: 'Timer', value: '6–12 мес', label: 'средний срок процедуры' },
              { icon: 'Home', value: 'сохраняется', label: 'единственное жильё' },
              { icon: 'ShieldCheck', value: '100%', label: 'списание долгов' },
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
                <h3 className="font-heading font-bold text-slate-900">Последствия банкротства</h3>
                <p className="text-sm text-slate-500">Ограничения, сроки, что сохраняется — на отдельной странице</p>
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

        </main>

        {/* Modal */}
        {activeStage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveStage(null)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar */}
              <div className="h-1.5" style={{ backgroundColor: activeStage.color }} />

              <div className="p-8">
                <button
                  onClick={() => setActiveStage(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <Icon name="X" size={17} className="text-slate-500" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${activeStage.color}12` }}>
                    <Icon name={activeStage.icon} size={28} style={{ color: activeStage.color }} fallback="Circle" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-heading font-bold px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: `${activeStage.color}12`, color: activeStage.color }}>
                        Этап {activeStage.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <Icon name="Clock" size={11} />
                        {activeStage.duration}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-2xl text-slate-900">{activeStage.title}</h2>
                  </div>
                </div>

                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{activeStage.hint}</p>

                <div className="space-y-3">
                  {activeStage.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${activeStage.color}12` }}>
                        <Icon name="Check" size={12} style={{ color: activeStage.color }} />
                      </div>
                      <span className="text-slate-700 text-sm">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default Index;