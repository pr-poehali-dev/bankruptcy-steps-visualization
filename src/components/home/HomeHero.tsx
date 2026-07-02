import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { SiteContent } from "@/hooks/useSiteContent";

interface Props {
  g: (key: string, fallback?: string) => string;
}

const HomeHero = ({ g }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <header className="relative z-20 border-b border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/3e7e35fe-ef29-4a30-b52d-2ba872294646/bucket/9887576b-326b-4273-a0f5-2a485157ab4a.png"
              alt="АБ Правовой статус"
              className="h-9 w-auto object-contain"
            />
            <div>
              <div className="font-heading font-bold text-slate-900 text-sm leading-none">
                {g("header_firm_name", "АБ «Правовой статус»")}
              </div>
              <div className="text-xs text-slate-400 leading-none mt-0.5">
                {g("header_firm_subtitle", "Адвокатское бюро")}
              </div>
            </div>
          </div>
          <a
            href={`tel:${g("header_phone", "+7 (995) 265-25-35")}`}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B3F7C] text-white text-sm font-semibold hover:bg-[#163270] transition-colors"
          >
            <Icon name="Phone" size={14} />
            {g("btn_header_cta", "Бесплатная консультация")}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1B3F7C]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-400/15 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-200" />
              <span className="text-sm text-blue-100">
                {g("hero_tag", "Банкротство физических лиц")}
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-white leading-[1.05] mb-6">
              {g("hero_title_1", "Избавьтесь от долгов")}
              <br />
              <span className="text-blue-200">
                {g("hero_title_2", "законно и навсегда")}
              </span>
            </h1>
            <p className="text-blue-100/80 text-lg leading-relaxed mb-10 max-w-lg">
              {g(
                "hero_desc",
                "Адвокатское бюро «Правовой статус» проведёт процедуру банкротства под ключ — от первичного анализа до полного списания задолженности.",
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#1B3F7C] font-semibold text-sm hover:bg-blue-50 transition-colors shadow-md">
                <Icon name="MessageSquare" size={16} />
                {g("btn_hero_primary", "Получить консультацию")}
              </button>
              <button
                onClick={() => navigate("/stages")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 border border-white/25 text-white font-semibold text-sm hover:bg-white/25 transition-all"
              >
                {g("btn_hero_secondary", "Как это работает")}
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>

          {/* Hero aside */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: "0.15s", opacity: 0 }}
          >
            <div className="bg-white rounded-3xl p-8 space-y-4 shadow-xl">
              <div className="text-xs font-heading font-semibold text-[#1B3F7C] uppercase tracking-widest mb-4">
                {g("hero_result_label", "Ваш результат")}
              </div>
              {[1, 2, 3, 4, 5].map((n, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 shrink-0 rounded-full bg-[#1B3F7C] flex items-center justify-center">
                    <Icon name="Check" size={11} className="text-white" fallback="Check" />
                  </div>
                  <span className="text-slate-700 text-sm">
                    {g(
                      `hero_result_${n}`,
                      [
                        "Полное списание долгов по решению суда",
                        "Единственное жильё остаётся у вас",
                        "Прекращение звонков от коллекторов",
                        "Снятие арестов и исполнительных листов",
                        "Чистая жизнь без долгового бремени",
                      ][i],
                    )}
                  </span>
                </div>
              ))}
              <div className="pt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["bg-blue-700", "bg-blue-500", "bg-blue-400"].map((c, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center`}
                    >
                      <Icon name="User" size={13} className="text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-500">
                  {g("hero_cases_stat", "Более 500 дел успешно завершено")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Re-export type for consumers
export type { SiteContent };
export default HomeHero;
