import Icon from "@/components/ui/icon";

interface FormState {
  name: string;
  phone: string;
  message: string;
}

interface Props {
  g: (key: string, fallback?: string) => string;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const HomeForm = ({ g, form, setForm, submitted, setSubmitted, loading, handleSubmit }: Props) => (
  <>
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
                  { icon: "Clock",       text: g("form_guarantee_1", "Ответ в течение рабочего дня") },
                  { icon: "Lock",        text: g("form_guarantee_2", "Адвокатская тайна гарантирована") },
                  { icon: "BadgeCheck",  text: g("form_guarantee_3", "Без обязательств и скрытых условий") },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={15} className="text-blue-300" fallback="Circle" />
                    </div>
                    <span className="text-sm text-blue-100">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="text-xs text-blue-400">Адвокатское бюро</div>
              <div className="font-heading font-bold text-white text-sm">«Правовой статус»</div>
            </div>
          </div>

          {/* Right form */}
          <div className="p-10 md:p-12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
                  <Icon name="CheckCheck" size={30} className="text-teal-600" fallback="Check" />
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
                      placeholder={g("form_field_name_placeholder", "Иван Иванов")}
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
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
                      placeholder={g("form_field_phone_placeholder", "+7 (___) ___-__-__")}
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      {g("form_field_message_label", "Кратко опишите ситуацию")}{" "}
                      <span className="text-slate-400 font-normal normal-case">(необязательно)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder={g(
                        "form_field_message_placeholder",
                        "Сумма долга, количество кредиторов, наличие имущества...",
                      )}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
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
                      <Icon name="Loader" size={16} className="animate-spin" fallback="Circle" />
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
  </>
);

export default HomeForm;
