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
  { num: '01', icon: 'MessageSquare', text: 'Бесплатная консультация и анализ ситуации' },
  { num: '02', icon: 'FolderOpen', text: 'Сбор документов и подготовка заявления' },
  { num: '03', icon: 'Landmark', text: 'Подача в арбитражный суд' },
  { num: '04', icon: 'UserCheck', text: 'Сопровождение всей процедуры' },
  { num: '05', icon: 'CircleCheckBig', text: 'Списание долгов и закрытие дела' },
];

const Home = () => {
  const navigate = useNavigate();

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
            <div className="w-9 h-9 rounded-lg bg-blue-800 flex items-center justify-center">
              <Icon name="Scale" size={18} className="text-white" />
            </div>
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
          <div className="text-center mb-10 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-3">Как мы работаем</h2>
            <p className="text-slate-500">От первого звонка до закрытия дела</p>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <div
                key={i}
                className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all animate-fade-in flex flex-col items-center text-center"
                style={{ animationDelay: `${0.32 + i * 0.07}s`, opacity: 0 }}
              >
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[42px] left-[calc(100%+1px)] w-4 h-px bg-slate-200 z-10" />
                )}
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 relative">
                  <Icon name={s.icon} size={22} className="text-blue-700" fallback="Circle" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-800 text-white font-heading font-bold text-[10px] flex items-center justify-center">
                    {s.num.replace('0', '')}
                  </span>
                </div>
                <p className="text-sm text-slate-700 font-medium leading-snug">{s.text}</p>
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

        {/* CTA */}
        <section className="pb-24 animate-fade-in" style={{ animationDelay: '0.55s', opacity: 0 }}>
          <div className="bg-white border border-blue-100 rounded-3xl p-10 md:p-14 text-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
              <Icon name="MessageSquare" size={26} className="text-blue-700" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-4">
              Готовы начать? Расскажите о своей ситуации
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed">
              Первая консультация — бесплатно. Адвокат изучит ваш случай и объяснит, подходит ли
              вам процедура банкротства и каков будет итог.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-colors shadow-md text-sm">
              <Icon name="Phone" size={16} />
              Записаться на консультацию
            </button>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-blue-800 flex items-center justify-center">
              <Icon name="Scale" size={14} className="text-white" />
            </div>
            <span className="text-sm text-slate-600 font-medium">Адвокатское бюро «Правовой статус»</span>
          </div>
          <span className="text-xs text-slate-400">Юридическая помощь в делах о банкротстве физических лиц</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;