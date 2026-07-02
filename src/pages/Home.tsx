import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSiteContent } from "@/hooks/useSiteContent";

const ADV_ICONS = ["BadgeCheck", "TrendingDown", "Landmark", "ShieldCheck"];
const STEP_ICONS = [
  "MessageSquare",
  "FolderOpen",
  "Landmark",
  "UserCheck",
  "CircleCheckBig",
];

const Home = () => {
  const navigate = useNavigate();
  const { g } = useSiteContent();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const advantages = [1, 2, 3, 4].map((n, i) => ({
    icon: ADV_ICONS[i],
    title: g(
      `adv_${n}_title`,
      [
        "Адвокаты, а не юристы",
        "Списываем долги полностью",
        "Опыт в арбитражных судах",
        "Фиксированная стоимость",
      ][i],
    ),
    desc: g(
      `adv_${n}_desc`,
      [
        "Статус адвоката — высший стандарт юридической защиты.",
        "Сопровождаем процедуру от подачи заявления до завершения дела.",
        "Многолетняя практика в делах о несостоятельности.",
        "Цена определяется на первой консультации.",
      ][i],
    ),
  }));

  const steps = [1, 2, 3, 4, 5].map((n, i) => ({
    num: String(n).padStart(2, "0"),
    icon: STEP_ICONS[i],
    title: g(
      `step_${n}_title`,
      ["Консультация", "Документы", "Суд", "Процедура", "Результат"][i],
    ),
    text: g(`step_${n}_text`, ""),
    tag: g(`step_${n}_tag`, ""),
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white font-body">
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
                    <Icon
                      name="Check"
                      size={11}
                      className="text-white"
                      fallback="Check"
                    />
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
              <Icon
                name="Route"
                size={13}
                className="text-blue-700"
                fallback="Circle"
              />
              <span className="text-xs font-semibold text-blue-700">
                Наш процесс
              </span>
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
                    <Icon
                      name={s.icon}
                      size={22}
                      className="text-white"
                      fallback="Circle"
                    />
                  </div>
                  <div className="text-center px-2">
                    <div className="font-heading font-black text-xs text-slate-300 mb-1">
                      {s.num}
                    </div>
                    <div className="font-heading font-bold text-slate-900 text-sm leading-tight mb-1">
                      {s.title}
                    </div>
                    <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 bg-slate-100 text-slate-500">
                      {s.tag}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {s.text}
                    </p>
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
                    <Icon
                      name={s.icon}
                      size={20}
                      className="text-white"
                      fallback="Circle"
                    />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-slate-100 my-1" />
                  )}
                </div>
                <div className="pb-6 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-bold text-slate-900">
                      {s.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      {s.tag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {s.text}
                  </p>
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
              {g(
                "cards_section_subtitle",
                "Интерактивные разделы с детальными схемами процедуры",
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
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
                tags: [1, 2, 3, 4, 5]
                  .map((n) => g(`card_stages_tag_${n}`, ""))
                  .filter(Boolean),
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
                    text: g(
                      "card_consequences_stat_2_text",
                      "Жильё сохраняется",
                    ),
                  },
                ],
                tags: [1, 2, 3, 4, 5]
                  .map((n) => g(`card_consequences_tag_${n}`, ""))
                  .filter(Boolean),
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
                tags: [1, 2, 3, 4, 5]
                  .map((n) => g(`card_payments_tag_${n}`, ""))
                  .filter(Boolean),
                link: g("card_payments_link", "Посмотреть платежи"),
              },
            ].map((card) => (
              <button
                key={card.path}
                onClick={() => navigate(card.path)}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left animate-fade-in flex flex-col"
                style={{ animationDelay: card.delay, opacity: 0 }}
              >
                {/* Top accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: card.color }}
                />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + title row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center shrink-0`}
                    >
                      <Icon
                        name={card.icon}
                        size={22}
                        style={{ color: card.color }}
                        fallback="List"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 leading-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {card.desc}
                  </p>

                  {/* Stats row */}
                  <div className="flex gap-4 mb-5">
                    {card.stats.map((s) => (
                      <div key={s.text} className="flex items-center gap-1.5">
                        <Icon
                          name={s.icon}
                          size={13}
                          className="text-slate-400 shrink-0"
                          fallback="Circle"
                        />
                        <span className="text-xs text-slate-500 font-medium">
                          {s.text}
                        </span>
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
        <section
          className="pb-20 animate-fade-in"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <div className="bg-[#1B3F7C] rounded-2xl grid grid-cols-2 md:grid-cols-4">
            {[
              {
                icon: "Users",
                value: g("stat_1_value", "500+"),
                label: g("stat_1_label", "завершённых дел"),
              },
              {
                icon: "Timer",
                value: g("stat_2_value", "6–12 мес"),
                label: g("stat_2_label", "средний срок"),
              },
              {
                icon: "Wallet",
                value: g("stat_3_value", "от 25 000 ₽"),
                label: g("stat_3_label", "порог долга"),
              },
              {
                icon: "ShieldCheck",
                value: g("stat_4_value", "100%"),
                label: g("stat_4_label", "списание долгов"),
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`p-7 text-center ${i < 3 ? "border-r border-white/5" : ""}`}
              >
                <Icon
                  name={s.icon}
                  size={22}
                  className="text-blue-400 mx-auto mb-3"
                  fallback="Star"
                />
                <div className="font-heading font-black text-2xl text-white">
                  {s.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Consultation form */}
        <section
          className="pb-24 animate-fade-in"
          style={{ animationDelay: "0.55s", opacity: 0 }}
        >
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left info panel */}
              <div className="bg-[#1B3F7C] p-10 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 mb-8">
                    <span className="w-2 h-2 rounded-full bg-blue-300" />
                    <span className="text-xs text-blue-200 font-medium">
                      {g("form_title", "Бесплатная консультация")}
                    </span>
                  </div>
                  <h2 className="font-heading font-extrabold text-3xl text-white leading-tight mb-4">
                    {g("hero_title", "Расскажите о своей ситуации")}
                  </h2>
                  <p className="text-blue-200 text-sm leading-relaxed mb-10">
                    {g(
                      "hero_subtitle",
                      "Адвокат свяжется с вами в течение рабочего дня, изучит ваш случай и объяснит, подходит ли вам процедура банкротства.",
                    )}
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        icon: "Clock",
                        text: g(
                          "form_guarantee_1",
                          "Ответ в течение рабочего дня",
                        ),
                      },
                      {
                        icon: "Lock",
                        text: g(
                          "form_guarantee_2",
                          "Адвокатская тайна гарантирована",
                        ),
                      },
                      {
                        icon: "BadgeCheck",
                        text: g(
                          "form_guarantee_3",
                          "Без обязательств и скрытых условий",
                        ),
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <Icon
                            name={item.icon}
                            size={15}
                            className="text-blue-300"
                            fallback="Circle"
                          />
                        </div>
                        <span className="text-sm text-blue-100">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <div className="text-xs text-blue-400">Адвокатское бюро</div>
                  <div className="font-heading font-bold text-white text-sm">
                    «Правовой статус»
                  </div>
                </div>
              </div>

              {/* Right form */}
              <div className="p-10 md:p-12">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
                      <Icon
                        name="CheckCheck"
                        size={30}
                        className="text-teal-600"
                        fallback="Check"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3">
                      {g("form_success_title", "Заявка отправлена!")}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                      {g(
                        "form_success_text",
                        "Адвокат свяжется с вами в течение рабочего дня. Спасибо за обращение в АБ «Правовой статус».",
                      )}
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", phone: "", message: "" });
                      }}
                      className="mt-6 text-sm text-blue-700 hover:text-blue-900 transition-colors font-medium"
                    >
                      Отправить ещё одну заявку
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-slate-900 mb-1">
                        {g("form_subtitle", "Записаться на консультацию")}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {g("form_subtitle_sub", "Первичный приём — бесплатно")}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Ваше имя
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={g(
                            "form_field_name_placeholder",
                            "Иван Иванов",
                          )}
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Телефон
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder={g(
                            "form_field_phone_placeholder",
                            "+7 (___) ___-__-__",
                          )}
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          {g(
                            "form_field_message_label",
                            "Кратко опишите ситуацию",
                          )}{" "}
                          <span className="text-slate-400 font-normal normal-case">
                            (необязательно)
                          </span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder={g(
                            "form_field_message_placeholder",
                            "Сумма долга, количество кредиторов, наличие имущества...",
                          )}
                          value={form.message}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, message: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1B3F7C] text-white font-semibold text-sm hover:bg-[#163270] transition-colors shadow-md disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Icon
                            name="Loader"
                            size={16}
                            className="animate-spin"
                            fallback="Circle"
                          />
                          Отправляем...
                        </>
                      ) : (
                        <>
                          <Icon name="Send" size={16} />
                          {g("btn_form_submit", "Отправить заявку")}
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-400 text-center leading-relaxed">
                      {g(
                        "form_privacy_text",
                        "Нажимая кнопку, вы соглашаетесь с обработкой персональных данных",
                      )}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/3e7e35fe-ef29-4a30-b52d-2ba872294646/bucket/9887576b-326b-4273-a0f5-2a485157ab4a.png"
              alt="АБ Правовой статус"
              className="h-7 w-auto object-contain opacity-70"
            />
            <span className="text-sm text-slate-500 font-medium">
              Адвокатское бюро «Правовой статус»
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Юридическая помощь в делах о банкротстве физических лиц
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
