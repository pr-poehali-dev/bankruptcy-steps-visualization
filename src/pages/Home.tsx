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
    <div className="min-h-screen bg-slate-50 font-body relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-200/30 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/3e7e35fe-ef29-4a30-b52d-2ba872294646/bucket/9887576b-326b-4273-a0f5-2a485157ab4a.png"
              alt="АБ Правовой статус"
              className="h-10 w-auto object-contain"
            />
            <div>
              <div className="font-heading font-bold text-slate-900 text-sm leading-none">АБ «Правовой статус»</div>
              <div className="text-xs text-slate-500 leading-none mt-0.5">Адвокатское бюро</div>
            </div>
          </div>
          <a
            href="tel:+78001234567"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-900 transition-colors"
          >
            <Icon name="Phone" size={15} />
            Бесплатная консультация
          </a>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Hero */}
        <section className="py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-7">
              <span className="w-2 h-2 rounded-full bg-blue-700" />
              <span className="text-sm text-slate-600">Банкротство физических лиц</span>
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-slate-900 leading-[1.1] mb-5">
              Избавьтесь от долгов
              <br />
              <span className="text-blue-800">законно и навсегда</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Адвокатское бюро «Правовой статус» проведёт процедуру банкротства
              под ключ — от первичного анализа до полного списания задолженности.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-blue-800 text-white font-semibold text-sm hover:bg-blue-900 transition-colors shadow-md">
                <Icon name="MessageSquare" size={16} />
                Получить консультацию
              </button>
              <button
                onClick={() => navigate('/stages')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:border-blue-200 hover:text-blue-800 transition-all shadow-sm"
              >
                Как это работает
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>

          {/* Hero aside */}
          <div className="animate-fade-in" style={{ animationDelay: '0.15s', opacity: 0 }}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-5">
              <div className="text-sm font-heading font-semibold text-slate-500 uppercase tracking-widest mb-2">Ваш результат</div>
              {[
                { icon: 'CircleCheckBig', color: 'text-teal-600', bg: 'bg-teal-50', text: 'Полное списание долгов по решению суда' },
                { icon: 'CircleCheckBig', color: 'text-teal-600', bg: 'bg-teal-50', text: 'Единственное жильё остаётся у вас' },
                { icon: 'CircleCheckBig', color: 'text-teal-600', bg: 'bg-teal-50', text: 'Прекращение звонков от коллекторов' },
                { icon: 'CircleCheckBig', color: 'text-teal-600', bg: 'bg-teal-50', text: 'Снятие арестов и исполнительных листов' },
                { icon: 'CircleCheckBig', color: 'text-teal-600', bg: 'bg-teal-50', text: 'Чистая жизнь без долгового бремени' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 shrink-0 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <Icon name={item.icon} size={16} className={item.color} fallback="Check" />
                  </div>
                  <span className="text-slate-700 text-sm">{item.text}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['bg-blue-800', 'bg-blue-600', 'bg-teal-600'].map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center`}>
                      <Icon name="User" size={14} className="text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-500">Более <strong className="text-slate-800">500 дел</strong> успешно завершено</span>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="pb-20">
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-3">
              Почему АБ «Правовой статус»
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Мы специализируемся исключительно на защите интересов граждан в делах о несостоятельности
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {advantages.map((a, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all animate-fade-in"
                style={{ animationDelay: `${0.25 + i * 0.08}s`, opacity: 0 }}
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon name={a.icon} size={22} className="text-blue-700" fallback="Star" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 mb-2">{a.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How we work */}
        <section className="pb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
                <Icon name="Route" size={13} className="text-blue-700" fallback="Circle" />
                <span className="text-xs font-semibold text-blue-700">Наш процесс</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Как мы работаем</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-xs md:text-right">От первого звонка до полного списания долгов под ключ</p>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="hidden md:block absolute left-[28px] top-6 bottom-6 w-px bg-slate-200" />

            <div className="space-y-4">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="relative flex gap-5 md:gap-8 items-start animate-fade-in"
                  style={{ animationDelay: `${0.32 + i * 0.08}s`, opacity: 0 }}
                >
                  {/* Circle number */}
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 flex flex-col items-center justify-center shadow-sm z-10 group-hover:border-blue-300 transition-colors">
                    <Icon name={s.icon} size={20} className="text-blue-700 mb-0.5" fallback="Circle" />
                    <span className="font-heading font-black text-[10px] text-slate-400">{s.num}</span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-heading font-bold text-slate-900">{s.title}</h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold shrink-0">
                          {s.tag}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{s.text}</p>
                    </div>
                    {i === steps.length - 1 && (
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                        <Icon name="CheckCheck" size={20} className="text-teal-600" fallback="Check" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
            {/* Stages card */}
            <button
              onClick={() => navigate('/stages')}
              className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 text-left animate-fade-in"
              style={{ animationDelay: '0.4s', opacity: 0 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-6 shadow-md group-hover:-translate-y-1 transition-transform duration-300">
                <Icon name="ListOrdered" size={28} className="text-white" fallback="List" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">Этапы процедуры</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Пять ключевых шагов — от подачи заявления в суд до полного списания долгов.
                Кликайте на этапы для подробностей.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Подача заявления', 'Суд', 'Реструктуризация', 'Реализация', 'Списание'].map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm group-hover:gap-3 transition-all">
                Перейти к этапам
                <Icon name="ArrowRight" size={16} />
              </div>
            </button>

            {/* Consequences card */}
            <button
              onClick={() => navigate('/consequences')}
              className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300 text-left animate-fade-in"
              style={{ animationDelay: '0.48s', opacity: 0 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6 shadow-md group-hover:-translate-y-1 transition-transform duration-300">
                <Icon name="AlertTriangle" size={28} className="text-white" fallback="Alert" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">Последствия банкротства</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Ограничения по срокам, что сохраняется, какие долги не списываются.
                Наглядные шкалы и сравнение плюсов и минусов.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Ограничения', 'Кредиты', 'Руководство', 'Что сохранится', 'Сроки'].map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm group-hover:gap-3 transition-all">
                Перейти к последствиям
                <Icon name="ArrowRight" size={16} />
              </div>
            </button>

            {/* Payments card */}
            <button
              onClick={() => navigate('/payments')}
              className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 text-left animate-fade-in"
              style={{ animationDelay: '0.56s', opacity: 0 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center mb-6 shadow-md group-hover:-translate-y-1 transition-transform duration-300">
                <Icon name="Receipt" size={28} className="text-white" fallback="Wallet" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">Обязательные платежи</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Госпошлина, вознаграждение управляющего, публикации и доп. расходы.
                Сводная таблица всех затрат на процедуру.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Госпошлина', 'Управляющий', 'Публикации', 'МФЦ бесплатно'].map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-teal-700 font-semibold text-sm group-hover:gap-3 transition-all">
                Посмотреть платежи
                <Icon name="ArrowRight" size={16} />
              </div>
            </button>

          </div>
        </section>

        {/* Stats */}
        <section className="pb-20 animate-fade-in" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: 'Users', value: '500+', label: 'завершённых дел' },
              { icon: 'Timer', value: '6–12 мес', label: 'средний срок' },
              { icon: 'Wallet', value: 'от 25 000 ₽', label: 'порог долга' },
              { icon: 'ShieldCheck', value: '100%', label: 'списание долгов' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-5 text-center shadow-sm">
                <Icon name={s.icon} size={24} className="text-blue-700 mx-auto mb-2" fallback="Star" />
                <div className="font-heading font-bold text-xl text-slate-900">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Consultation form */}
        <section className="pb-24 animate-fade-in" style={{ animationDelay: '0.55s', opacity: 0 }}>
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">

              {/* Left info panel */}
              <div className="bg-blue-900 p-10 md:p-12 flex flex-col justify-between">
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
                <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-3">
                  <img
                    src="https://cdn.poehali.dev/projects/3e7e35fe-ef29-4a30-b52d-2ba872294646/bucket/9887576b-326b-4273-a0f5-2a485157ab4a.png"
                    alt="АБ Правовой статус"
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                  <div>
                    <div className="text-xs text-blue-400">Адвокатское бюро</div>
                    <div className="font-heading font-bold text-white text-sm">«Правовой статус»</div>
                  </div>
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
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-800 text-white font-semibold text-sm hover:bg-blue-900 transition-colors shadow-md disabled:opacity-70"
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
      <footer className="relative z-10 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/3e7e35fe-ef29-4a30-b52d-2ba872294646/bucket/9887576b-326b-4273-a0f5-2a485157ab4a.png"
              alt="АБ Правовой статус"
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm text-slate-600 font-medium">Адвокатское бюро «Правовой статус»</span>
          </div>
          <span className="text-xs text-slate-400">Юридическая помощь в делах о банкротстве физических лиц</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;