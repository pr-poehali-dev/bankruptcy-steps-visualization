import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const ADMIN_URL = 'https://functions.poehali.dev/f93de05a-95a2-4dbb-bfdd-35104dcbefc5';

interface Page {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  seo_title: string;
  seo_description: string;
  published: boolean;
}

// Простой парсер Markdown → HTML (жирный, курсив, заголовки, списки, абзацы)
function renderMarkdown(text: string): string {
  return text
    .split('\n\n')
    .map(block => {
      const lines = block.split('\n');
      // Заголовки
      if (lines[0].startsWith('## ')) return `<h2>${lines[0].slice(3)}</h2>`;
      if (lines[0].startsWith('### ')) return `<h3>${lines[0].slice(4)}</h3>`;
      if (lines[0].startsWith('# ')) return `<h1>${lines[0].slice(2)}</h1>`;
      // Списки
      if (lines.every(l => l.startsWith('- '))) {
        return `<ul>${lines.map(l => `<li>${fmt(l.slice(2))}</li>`).join('')}</ul>`;
      }
      if (lines.every(l => /^\d+\.\s/.test(l))) {
        return `<ol>${lines.map(l => `<li>${fmt(l.replace(/^\d+\.\s/, ''))}</li>`).join('')}</ol>`;
      }
      return `<p>${lines.map(fmt).join('<br />')}</p>`;
    })
    .join('');
}

function fmt(s: string) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`${ADMIN_URL}/page/${slug}`)
      .then(r => r.json())
      .then(d => {
        if (d.page) setPage(d.page);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // SEO meta update
  useEffect(() => {
    if (!page) return;
    document.title = page.seo_title || page.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', page.seo_description || '');
  }, [page]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center font-body">
      <div className="text-center">
        <Icon name="Loader" size={32} className="text-slate-300 animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Загрузка...</p>
      </div>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen bg-white flex items-center justify-center font-body">
      <div className="text-center max-w-sm px-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
          <Icon name="FileX" size={28} className="text-slate-400" />
        </div>
        <h1 className="font-heading font-bold text-2xl text-slate-900 mb-2">Страница не найдена</h1>
        <p className="text-slate-500 text-sm mb-6">Возможно, она была удалена или адрес указан неверно.</p>
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B3F7C] text-white font-semibold text-sm hover:bg-[#163270] transition-colors">
          <Icon name="Home" size={15} />
          На главную
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-body">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/3e7e35fe-ef29-4a30-b52d-2ba872294646/bucket/9887576b-326b-4273-a0f5-2a485157ab4a.png"
              alt="АБ Правовой статус"
              className="h-9 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-slate-900 text-sm leading-none">АБ «Правовой статус»</div>
              <div className="text-xs text-slate-400 leading-none mt-0.5">Адвокатское бюро</div>
            </div>
          </button>
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <button onClick={() => navigate('/')} className="hover:text-[#1B3F7C] transition-colors">Главная</button>
            <Icon name="ChevronRight" size={13} className="text-slate-300" />
            <span className="text-slate-900 font-medium truncate max-w-[160px]">{page!.title}</span>
          </nav>
        </div>
      </header>

      {/* Hero strip */}
      <div className="bg-[#1B3F7C]">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white leading-tight mb-3">
            {page!.title}
          </h1>
          {page!.subtitle && (
            <p className="text-blue-200 text-lg max-w-2xl">{page!.subtitle}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 pb-24">
        {page!.content ? (
          <div
            className="prose prose-slate max-w-none
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-900
              prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl
              prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-base
              prose-strong:text-slate-900 prose-strong:font-semibold
              prose-li:text-slate-600 prose-li:leading-relaxed
              prose-ul:my-4 prose-ol:my-4
            "
            dangerouslySetInnerHTML={{ __html: renderMarkdown(page!.content) }}
          />
        ) : (
          <p className="text-slate-400 italic">Содержимое страницы не добавлено.</p>
        )}

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-[#1B3F7C] hover:text-white hover:border-[#1B3F7C] transition-all shadow-sm"
          >
            <Icon name="Home" size={16} />
            На главную
          </button>
        </div>
      </main>
    </div>
  );
};

export default DynamicPage;