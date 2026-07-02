import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-body relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center min-h-screen py-24">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <Icon name="Scale" size={14} className="text-blue-700" />
            <span className="text-sm text-slate-600">Справочник по банкротству</span>
          </div>
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl text-slate-900 leading-[1.1] mb-4">
            <span className="text-blue-800">Банкротство</span>
            <br />
            физического лица
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Выберите раздел — подробная интерактивная схема откроется на отдельной странице
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          {/* Stages card */}
          <button
            onClick={() => navigate('/stages')}
            className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 text-left animate-fade-in"
            style={{ animationDelay: '0.15s', opacity: 0 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mb-6 shadow-md group-hover:-translate-y-1 transition-transform duration-300">
              <Icon name="ListOrdered" size={28} className="text-white" fallback="List" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">Этапы процедуры</h2>
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
            style={{ animationDelay: '0.28s', opacity: 0 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6 shadow-md group-hover:-translate-y-1 transition-transform duration-300">
              <Icon name="AlertTriangle" size={28} className="text-white" fallback="Alert" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">Последствия банкротства</h2>
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
        </div>

        {/* Bottom stat row */}
        <div
          className="mt-10 grid grid-cols-3 gap-4 w-full animate-fade-in"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          {[
            { icon: 'Timer', value: '6–12 мес', label: 'средний срок' },
            { icon: 'Wallet', value: 'от 25 000 ₽', label: 'порог долга' },
            { icon: 'ShieldCheck', value: '100%', label: 'списание долгов' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-sm"
            >
              <Icon name={s.icon} size={22} className="text-blue-700 mx-auto mb-2" fallback="Star" />
              <div className="font-heading font-bold text-lg text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
