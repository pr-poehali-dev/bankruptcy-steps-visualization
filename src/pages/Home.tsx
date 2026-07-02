import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const advantages = [
  {
    icon: 'BadgeCheck',
    title: 'Адвокаты, а не юристы',
    desc: 'Статус адвоката — высший стандарт юридической защиты. Адвокатская тайна гарантирована законом.',
  },
  {
    icon: 'TrendingDown',
    title: 'Списываем долги полностью',
    desc: 'Сопровождаем процедуру от подачи заявления до определения суда о завершении дела.',
  },
  {
    icon: 'Landmark',
    title: 'Опыт в арбитражных судах',
    desc: 'Многолетняя практика в делах о несостоятельности физических лиц и ИП.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Фиксированная стоимость',
    desc: 'Цена услуг определяется на первой консультации — никаких скрытых платежей.',
  },
];

const steps = [
  {
    num: '01',
    icon: 'MessageSquare',
    title: 'Консультация',
    text: 'Бесплатно разберём вашу ситуацию, оценим шансы и объясним, подходит ли вам банкротство',
    tag: 'Бесплатно',
  },
  {
    num: '02',
    icon: 'FolderOpen',
    title: 'Документы',
    text: 'Поможем собрать полный пакет документов и подготовим заявление в арбитражный суд',
    tag: '1–2 недели',
  },
  {
    num: '03',
    icon: 'Landmark',
    title: 'Суд',
    text: 'Подаём заявление и представляем ваши интересы на всех заседаниях арбитражного суда',
    tag: '1–3 месяца',
  },
  {
    num: '04',
    icon: 'UserCheck',
    title: 'Процедура',
    text: 'Контролируем работу финансового управляющего и защищаем ваше имущество',
    tag: 'до 12 мес',
  },
  {
    num: '05',
    icon: 'CircleCheckBig',
    title: 'Результат',
    text: 'Суд выносит определение о списании долгов. Вы свободны от обязательств',
    tag: 'Долги списаны',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
              <div className="font-heading font-bold text-slate-900 text-sm leading-none">АБ «Правовой статус»</div>
              <div className="text-xs text-slate-400 leading-none mt-0.5">Адвокатское бюро</div>
            </div>
          </div>
          <a
            href="tel:+78001234567"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B3F7C] text-white text-sm font-semibold hover:bg-[#163270] transition-colors"
          >
            <Icon name="Phone" size={14} />
            Бесплатная консультация
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
              <span className="text-sm text-blue-100">Банкротство физических лиц</span>
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-white leading-[1.05] mb-6">
              Избавьтесь от долгов
              <br />
              <span className="text-blue-200">законно и навсегда</span>
            </h1>
            <p className="text-blue-100/80 text-lg leading-relaxed mb-10 max-w-lg">
              Адвокатское бюро «Правовой статус» проведёт процедуру банкротства
              под ключ — от первичного анализа до полного списания задолженности.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#1B3F7C] font-semibold text-sm hover:bg-blue-50 transition-colors shadow-md">
                <Icon name="MessageSquare" size={16} />
                Получить консультацию
              </button>
              <button
                onClick={() => navigate('/stages')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 border border-white/25 text-white font-semibold text-sm hover:bg-white/25 transition-all"
              >
                Как это работает
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>

          {/* Hero aside */}
          <div className="animate-fade-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 space-y-4 backdrop-blur-sm">
              <div className="text-xs font-heading font-semibold text-blue-200 uppercase tracking-widest mb-4">Ваш результат</div>
              {[
                'Полное списание долгов по решению суда',
                'Единственное жильё остаётся у вас',
                'Прекращение звонков от коллекторов',
                'Снятие арестов и исполнительных листов',
                'Чистая жизнь без долгового бремени',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 shrink-0 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon name="Check" size={11} className="text-white" fallback="Check" />
                  </div>
                  <span className="text-slate-300 text-sm">{text}</span>
                </div>
              ))}
              <div className="pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['bg-blue-600', 'bg-blue-500', 'bg-blue-400'].map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#1B3F7C] flex items-center justify-center`}>
                      <Icon name="User" size={13} className="text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-400">Более <strong className="text-white">500 дел</strong> успешно завершено</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">

        {/* Advantages */}
        <section className="pt-20 pb-20">
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-3">
              Почему АБ «Правовой статус»
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Мы специализируемся исключительно на защите интересов граждан в делах о несостоятельности
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
                  <Icon name={a.icon} size={20} className="text-[#1B3F7C] group-hover:text-blue-200 transition-colors" fallback="Star" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 group-hover:text-white mb-2 transition-colors">{a.title}</h3>
                <p className="text-sm text-slate-500 group-hover:text-blue-200 leading-relaxed transition-colors">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How we work */}
        <section className="pb-20">
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <Icon name="Route" size={13} className="text-blue-700" fallback="Circle" />
              <span className="text-xs font-semibold text-blue-700">Наш процесс</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Как мы работаем</h2>
          </div>

          {/* Desktop stepper */}
          <div className="hidden md:block">
            <div className="relative flex items-start">
              <div className="absolute top-[28px] left-[10%] right-[10%] h-px bg-slate-100 z-0" />
              <div className="absolute top-[28px] left-[10%] h-px bg-gradient-to-r from-[#0F2A6B] to-blue-400 z-0" style={{ width: '80%' }} />
              {steps.map((s, i) => (
                <div key={i} className="relative z-10 flex-1 flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: `${0.35 + i * 0.08}s`, opacity: 0 }}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm ${i === steps.length - 1 ? 'bg-[#0F2A6B]' : 'bg-slate-800'}`}>
                    <Icon name={s.icon} size={22} className="text-white" fallback="Circle" />
                  </div>
                  <div className="text-center px-2">
                    <div className="font-heading font-black text-xs text-slate-300 mb-1">{s.num}</div>
                    <div className="font-heading font-bold text-slate-900 text-sm leading-tight mb-1">{s.title}</div>
                    <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 bg-slate-100 text-slate-500">{s.tag}</div>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden space-y-0">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${0.35 + i * 0.08}s`, opacity: 0 }}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${i === steps.length - 1 ? 'bg-[#0F2A6B]' : 'bg-slate-800'}`}>
                    <Icon name={s.icon} size={20} className="text-white" fallback="Circle" />
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-slate-100 my-1" />}
                </div>
                <div className="pb-6 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-bold text-slate-900">{s.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{s.tag}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Cards */}
        <section className="pb-20">
          <div className="text-center mb-10 animate-fade-in" style={{ animationDelay: '0.35s', opacity: 0 }}>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-3">
              Полезная информация
            </h2>
            <p className="text-slate-500">Интерактивные разделы с детальными схемами процедуры</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                path: '/stages', icon: 'ListOrdered', delay: '0.4s',
                title: 'Этапы процедуры',
                desc: 'Пять ключевых шагов — от подачи заявления в суд до полного списания долгов.',
                tags: ['Подача заявления', 'Суд', 'Реструктуризация', 'Реализация', 'Списание'],
                link: 'Перейти к этапам',
              },
              {
                path: '/consequences', icon: 'AlertTriangle', delay: '0.48s',
                title: 'Последствия банкротства',
                desc: 'Ограничения по срокам, что сохраняется, какие долги не списываются.',
                tags: ['Ограничения', 'Кредиты', 'Руководство', 'Что сохранится', 'Сроки'],
                link: 'Перейти к последствиям',
              },
              {
                path: '/payments', icon: 'Receipt', delay: '0.56s',
                title: 'Обязательные платежи',
                desc: 'Госпошлина, вознаграждение управляющего, публикации и доп. расходы.',
                tags: ['Госпошлина', 'Управляющий', 'Публикации', 'МФЦ бесплатно'],
                link: 'Посмотреть платежи',
              },
            ].map((card) => (
              <button
                key={card.path}
                onClick={() => navigate(card.path)}
                className="group bg-white border border-slate-100 rounded-2xl p-7 hover:border-slate-300 hover:shadow-lg transition-all duration-300 text-left animate-fade-in"
                style={{ animationDelay: card.delay, opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#0A1628] flex items-center justify-center mb-5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <Icon name={card.icon} size={22} className="text-blue-400" fallback="List" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{card.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {card.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[#1B3F7C] font-semibold text-sm group-hover:gap-3 transition-all">
                  {card.link}
                  <Icon name="ArrowRight" size={15} />
                </div>
              </button>
            ))}

          </div>
        </section>

        {/* Stats */}
        <section className="pb-20 animate-fade-in" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <div className="bg-[#1B3F7C] rounded-2xl grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: 'Users', value: '500+', label: 'завершённых дел' },
              { icon: 'Timer', value: '6–12 мес', label: 'средний срок' },
              { icon: 'Wallet', value: 'от 25 000 ₽', label: 'порог долга' },
              { icon: 'ShieldCheck', value: '100%', label: 'списание долгов' },
            ].map((s, i) => (
              <div key={s.label} className={`p-7 text-center ${i < 3 ? 'border-r border-white/5' : ''}`}>
                <Icon name={s.icon} size={22} className="text-blue-400 mx-auto mb-3" fallback="Star" />
                <div className="font-heading font-black text-2xl text-white">{s.value}</div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Consultation form */}
        <section className="pb-24 animate-fade-in" style={{ animationDelay: '0.55s', opacity: 0 }}>
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">

              {/* Left info panel */}
              <div className="bg-[#1B3F7C] p-10 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 mb-8">
                    <span className="w-2 h-2 rounded-full bg-blue-300" />
                    <span className="text-xs text-blue-200 font-medium">Бесплатная консультация</span>
                  </div>
                  <h2 className="font-heading font-extrabold text-3xl text-white leading-tight mb-4">
                    Расскажите о своей ситуации
                  </h2>
                  <p className="text-blue-200 text-sm leading-relaxed mb-10">
                    Адвокат свяжется с вами в течение рабочего дня, изучит ваш случай
                    и объяснит, подходит ли вам процедура банкротства.
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: 'Clock', text: 'Ответ в течение рабочего дня' },
                      { icon: 'Lock', text: 'Адвокатская тайна гарантирована' },
                      { icon: 'BadgeCheck', text: 'Без обязательств и скрытых условий' },
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
                    <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3">Заявка отправлена!</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                      Адвокат свяжется с вами в течение рабочего дня. Спасибо за обращение в АБ «Правовой статус».
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', message: '' }); }}
                      className="mt-6 text-sm text-blue-700 hover:text-blue-900 transition-colors font-medium"
                    >
                      Отправить ещё одну заявку
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-slate-900 mb-1">Записаться на консультацию</h3>
                      <p className="text-sm text-slate-500">Первичный приём — бесплатно</p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Ваше имя</label>
                        <input
                          type="text"
                          required
                          placeholder="Иван Иванов"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Телефон</label>
                        <input
                          type="tel"
                          required
                          placeholder="+7 (___) ___-__-__"
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Кратко опишите ситуацию <span className="text-slate-400 font-normal normal-case">(необязательно)</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Сумма долга, количество кредиторов, наличие имущества..."
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
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
                          Отправить заявку
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-400 text-center leading-relaxed">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
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
            <span className="text-sm text-slate-500 font-medium">Адвокатское бюро «Правовой статус»</span>
          </div>
          <span className="text-xs text-slate-400">Юридическая помощь в делах о банкротстве физических лиц</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;