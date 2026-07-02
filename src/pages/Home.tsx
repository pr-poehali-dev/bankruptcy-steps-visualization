import { useState } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import HomeHero from "@/components/home/HomeHero";
import HomeContent from "@/components/home/HomeContent";
import HomeForm from "@/components/home/HomeForm";

const ADV_ICONS = ["BadgeCheck", "TrendingDown", "Landmark", "ShieldCheck"];
const STEP_ICONS = ["MessageSquare", "FolderOpen", "Landmark", "UserCheck", "CircleCheckBig"];

const Home = () => {
  const { g } = useSiteContent();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const advantages = [1, 2, 3, 4].map((n, i) => ({
    icon: ADV_ICONS[i],
    title: g(`adv_${n}_title`, ["Адвокаты, а не юристы", "Списываем долги полностью", "Опыт в арбитражных судах", "Фиксированная стоимость"][i]),
    desc: g(`adv_${n}_desc`, ["Статус адвоката — высший стандарт юридической защиты.", "Сопровождаем процедуру от подачи заявления до завершения дела.", "Многолетняя практика в делах о несостоятельности.", "Цена определяется на первой консультации."][i]),
  }));

  const steps = [1, 2, 3, 4, 5].map((n, i) => ({
    num: String(n).padStart(2, "0"),
    icon: STEP_ICONS[i],
    title: g(`step_${n}_title`, ["Консультация", "Документы", "Суд", "Процедура", "Результат"][i]),
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
      <HomeHero g={g} />
      <HomeContent g={g} advantages={advantages} steps={steps} />
      <div className="max-w-6xl mx-auto px-6">
        <HomeForm
          g={g}
          form={form}
          setForm={setForm}
          submitted={submitted}
          setSubmitted={setSubmitted}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Home;
