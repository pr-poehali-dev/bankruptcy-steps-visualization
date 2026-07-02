import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface Advantage {
  icon: string;
  title: string;
  desc: string;
}

interface Step {
  num: string;
  icon: string;
  title: string;
  text: string;
  tag: string;
}

interface Props {
  g: (key: string, fallback?: string) => string;
  advantages: Advantage[];
  steps: Step[];
}

const HomeContent = ({ g, advantages, steps }: Props) => {
  const navigate = useNavigate();

  const infoCards = [
    {
      path: "/stages",
      icon: "ListOrdered",
      delay: "0.4s",
      color: "#1B3F7C",
      bg: "bg-blue-50",
      title: g("card_stages_title", "Этапы процедуры"),
      desc: g(
        "card_stages_desc",
        "Пять ключевых шагов — от подачи заявления в суд до полного списания долгов.",
      ),
      stats: [
        {
          icon: g("card_stages_stat_1_icon", "Clock"),
          text: g("card_stages_stat_1_text", "5 этапов"),
        },
        {
          icon: g("card_stages_stat_2_icon", "Timer"),
          text: g("card_stages_stat_2_text", "6–12 месяцев"),
        },
      ],
      tags: [1, 2, 3, 4, 5].map((n) => g(`card_stages_tag_${n}`, "")).filter(Boolean),
      link: g("card_stages_link", "Перейти к этапам"),
    },
    {
      path: "/consequences",
      icon: "AlertTriangle",
      delay: "0.48s",
      color: "#92400E",
      bg: "bg-amber-50",
      title: g("card_consequences_title", "Последствия банкротства"),
      desc: g(
        "card_consequences_desc",
        "Ограничения по срокам, что сохраняется, какие долги не списываются.",
      ),
      stats: [
        {
          icon: g("card_consequences_stat_1_icon", "Ban"),
          text: g("card_consequences_stat_1_text", "5 ограничений"),
        },
        {
          icon: g("card_consequences_stat_2_icon", "ShieldCheck"),
          text: g("card_consequences_stat_2_text", "Жильё сохраняется"),
        },
      ],
      tags: [1, 2, 3, 4, 5].map((n) => g(`card_consequences_tag_${n}`, "")).filter(Boolean),
      link: g("card_consequences_link", "Перейти к последствиям"),
    },
    {
      path: "/payments",
      icon: "Receipt",
      delay: "0.56s",
      color: "#065F46",
      bg: "bg-emerald-50",
      title: g("card_payments_title", "Обязательные платежи"),
      desc: g(
        "card_payments_desc",
        "Госпошлина, вознаграждение управляющего, публикации и доп. расходы.",
      ),
      stats: [
        {
          icon: g("card_payments_stat_1_icon", "Landmark"),
          text: g("card_payments_stat_1_text", "от 300 ₽"),
        },
        {
          icon: g("card_payments_stat_2_icon", "Building2"),
          text: g("card_payments_stat_2_text", "МФЦ — бесплатно"),
        },
      ],
      tags: [1, 2, 3, 4, 5].map((n) => g(`card_payments_tag_${n}`, "")).filter(Boolean),
      link: g("card_payments_link", "Посмотреть платежи"),
    },
  ];

  const statsRow = [
    { icon: "Users",      value: g("stat_1_value", "500+"),          label: g("stat_1_label", "завершённых дел") },
    { icon: "Timer",      value: g("stat_2_value", "6–12 мес"),      label: g("stat_2_label", "средний срок") },
    { icon: "Wallet",     value: g("stat_3_value", "от 25 000 ₽"),   label: g("stat_3_label", "порог долга") },
    { icon: "ShieldCheck",value: g("stat_4_value", "100%"),           label: g("stat_4_label", "списание долгов") },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Advantages */}
      <section className="pt-20 pb-20">
        <div
          className="text-center mb-12 animate-fade-in"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-3">
            {g("adv_section_title", "Почему АБ «Правовой статус»")}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {g(
              "adv_section_subtitle",
              "Мы специализируемся исключительно на защите интересов граждан в делах о несостоятельности",
            )}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {advantages.map((a, i) => (
            <div
              key={i}
              className="group bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:bg-[#1B3F7C] hover:border-[#1B3F7C] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${0.25 + i * 0.08}s`, opacity: 0 }}
            >
              <div className="w-11 h-11 rounded-xl bg-white group-hover:bg-white/10 border border-slate-200 group-hover:border-white/10 flex items-center justify-center mb-4 transition-all">
                <Icon
                  name={a.icon}
                  size={20}
                  className="text-[#1B3F7C] group-hover:text-blue-200 transition-colors"
                  fallback="Star"
                />
              </div>
              <h3 className="font-heading font-bold text-slate-900 group-hover:text-white mb-2 transition-colors">
                {a.title}
              </h3>
              <p className="text-sm text-slate-500 group-hover:text-blue-200 leading-relaxed transition-colors">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="pb-20">
        <div
          className="text-center mb-12 animate-fade-in"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <Icon name="Route" size={13} className="text-blue-700" fallback="Circle" />
            <span className="text-xs font-semibold text-blue-700">Наш процесс</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">
            {g("steps_section_title", "Как мы работаем")}
          </h2>
        </div>

        {/* Desktop stepper */}
        <div className="hidden md:block">
          <div className="relative flex items-start">
            <div className="absolute top-[28px] left-[10%] right-[10%] h-px bg-slate-100 z-0" />
            <div
              className="absolute top-[28px] left-[10%] h-px bg-gradient-to-r from-[#0F2A6B] to-blue-400 z-0"
              style={{ width: "80%" }}
            />
            {steps.map((s, i) => (
              <div
                key={i}
                className="relative z-10 flex-1 flex flex-col items-center gap-4 animate-fade-in"
                style={{ animationDelay: `${0.35 + i * 0.08}s`, opacity: 0 }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm ${i === steps.length - 1 ? "bg-[#0F2A6B]" : "bg-slate-800"}`}
                >
                  <Icon name={s.icon} size={22} className="text-white" fallback="Circle" />
                </div>
                <div className="text-center px-2">
                  <div className="font-heading font-black text-xs text-slate-300 mb-1">{s.num}</div>
                  <div className="font-heading font-bold text-slate-900 text-sm leading-tight mb-1">{s.title}</div>
                  <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 bg-slate-100 text-slate-500">
                    {s.tag}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-0">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex gap-4 animate-fade-in"
              style={{ animationDelay: `${0.35 + i * 0.08}s`, opacity: 0 }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${i === steps.length - 1 ? "bg-[#0F2A6B]" : "bg-slate-800"}`}
                >
                  <Icon name={s.icon} size={20} className="text-white" fallback="Circle" />
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-slate-100 my-1" />}
              </div>
              <div className="pb-6 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-heading font-bold text-slate-900">{s.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {s.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Cards */}
      <section className="pb-20">
        <div
          className="text-center mb-10 animate-fade-in"
          style={{ animationDelay: "0.35s", opacity: 0 }}
        >
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-3">
            {g("cards_section_title", "Полезная информация")}
          </h2>
          <p className="text-slate-500">
            {g("cards_section_subtitle", "Интерактивные разделы с детальными схемами процедуры")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {infoCards.map((card) => (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left animate-fade-in flex flex-col"
              style={{ animationDelay: card.delay, opacity: 0 }}
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: card.color }} />
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center shrink-0`}>
                    <Icon name={card.icon} size={22} style={{ color: card.color }} fallback="List" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 leading-tight">{card.title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{card.desc}</p>
                <div className="flex gap-4 mb-5">
                  {card.stats.map((s) => (
                    <div key={s.text} className="flex items-center gap-1.5">
                      <Icon name={s.icon} size={13} className="text-slate-400 shrink-0" fallback="Circle" />
                      <span className="text-xs text-slate-500 font-medium">{s.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {card.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full border font-medium"
                      style={{
                        borderColor: `${card.color}30`,
                        color: card.color,
                        backgroundColor: `${card.color}08`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  className="mt-auto flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all"
                  style={{ color: card.color }}
                >
                  {card.link}
                  <Icon name="ArrowRight" size={15} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="pb-20 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
        <div className="bg-[#1B3F7C] rounded-2xl grid grid-cols-2 md:grid-cols-4">
          {statsRow.map((s, i) => (
            <div key={s.label} className={`p-7 text-center ${i < 3 ? "border-r border-white/5" : ""}`}>
              <Icon name={s.icon} size={22} className="text-blue-400 mx-auto mb-3" fallback="Star" />
              <div className="font-heading font-black text-2xl text-white">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
