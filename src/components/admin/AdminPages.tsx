import { useState, useEffect } from 'react';
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
  created_at: string;
  updated_at: string;
}

type View = 'list' | 'edit' | 'create';

const emptyPage: Omit<Page, 'id' | 'created_at' | 'updated_at'> = {
  slug: '',
  title: '',
  subtitle: '',
  content: '',
  seo_title: '',
  seo_description: '',
  published: true,
};

const inputCls = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F7C] transition';
const labelCls = 'block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide';

interface Props {
  session: string;
  onNavigate: (path: string) => void;
}

const AdminPages = ({ session, onNavigate }: Props) => {
  const [view, setView] = useState<View>('list');
  const [pages, setPages] = useState<Page[]>([]);
  const [editing, setEditing] = useState<Partial<Page>>(emptyPage);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const api = async (path: string, method = 'GET', body?: object) => {
    const res = await fetch(`${ADMIN_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'X-Session-Id': session },
      body: body ? JSON.stringify(body) : undefined,
    });
    return res.json();
  };

  const loadPages = () => api('/pages').then(d => setPages(d.pages || []));

  useEffect(() => { loadPages(); }, []);

  const openCreate = () => { setEditing({ ...emptyPage }); setView('create'); };
  const openEdit = (p: Page) => { setEditing({ ...p }); setView('edit'); };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    if (view === 'create') {
      await api('/pages', 'POST', editing);
    } else {
      await api(`/pages/${editing.id}`, 'PUT', editing);
    }
    await loadPages();
    setSaving(false);
    setSaveMsg('Сохранено!');
    setTimeout(() => { setSaveMsg(''); setView('list'); }, 1200);
  };

  const handleDelete = async (id: number) => {
    await api(`/pages/${id}`, 'DELETE');
    setDeleteId(null);
    loadPages();
  };

  const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-zа-я0-9\s-]/gi, '').replace(/\s+/g, '-').replace(/[а-я]/g, c =>
      'abvgdeёzhziyklmnoprstufkhtschchshschyeyuya'.split('')[
        'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.indexOf(c)
      ] || c
    );

  if (view === 'list') {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900">Страницы сайта</h2>
            <p className="text-sm text-slate-500 mt-0.5">Создавайте и редактируйте информационные страницы</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B3F7C] text-white text-sm font-semibold hover:bg-[#163270] transition-colors shadow-sm"
          >
            <Icon name="Plus" size={16} />
            Создать страницу
          </button>
        </div>

        {pages.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Icon name="FileText" size={26} className="text-slate-400" />
            </div>
            <h3 className="font-heading font-bold text-slate-900 mb-2">Страниц пока нет</h3>
            <p className="text-slate-500 text-sm mb-5">Создайте первую информационную страницу сайта</p>
            <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B3F7C] text-white text-sm font-semibold hover:bg-[#163270] transition-colors">
              <Icon name="Plus" size={15} />
              Создать страницу
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {pages.map(p => (
                <div key={p.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900 truncate">{p.title}</span>
                      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${p.published ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {p.published ? 'Опубликована' : 'Скрыта'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Icon name="Link" size={11} />
                        /page/{p.slug}
                      </span>
                      <span>·</span>
                      <span>{new Date(p.updated_at).toLocaleDateString('ru')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onNavigate(`/page/${p.slug}`)}
                      className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Открыть страницу"
                    >
                      <Icon name="ExternalLink" size={15} />
                    </button>
                    <button
                      onClick={() => openEdit(p)}
                      className="p-2 rounded-lg text-slate-400 hover:text-[#1B3F7C] hover:bg-blue-50 transition-colors"
                      title="Редактировать"
                    >
                      <Icon name="Pencil" size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Удалить"
                    >
                      <Icon name="Trash2" size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete confirmation */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Icon name="Trash2" size={22} className="text-red-500" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-center mb-2">Удалить страницу?</h3>
              <p className="text-slate-500 text-sm text-center mb-5">Это действие нельзя отменить. Страница будет удалена безвозвратно.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">Отмена</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">Удалить</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Editor header */}
      <div className="flex items-center gap-4">
        <button onClick={() => setView('list')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1B3F7C] transition-colors">
          <Icon name="ChevronLeft" size={16} />
          Назад
        </button>
        <h2 className="font-heading font-bold text-xl text-slate-900">
          {view === 'create' ? 'Новая страница' : 'Редактирование страницы'}
        </h2>
        {editing.slug && (
          <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg font-mono">/page/{editing.slug}</span>
        )}
      </div>

      {/* Main fields */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-slate-900 mb-5">Основное</h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Заголовок страницы</label>
              <input
                type="text"
                placeholder="Например: Услуги банкротства"
                value={editing.title || ''}
                onChange={e => {
                  const title = e.target.value;
                  setEditing(prev => ({
                    ...prev,
                    title,
                    ...(view === 'create' ? { slug: slugify(title), seo_title: title } : {}),
                  }));
                }}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>URL (slug)</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 shrink-0">/page/</span>
                <input
                  type="text"
                  placeholder="uslugi-bankrotstva"
                  value={editing.slug || ''}
                  onChange={e => setEditing(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-') }))}
                  className={inputCls}
                  disabled={view === 'edit'}
                />
              </div>
              {view === 'edit' && <p className="text-xs text-slate-400 mt-1">URL нельзя изменить после создания</p>}
            </div>
          </div>

          <div>
            <label className={labelCls}>Подзаголовок</label>
            <input
              type="text"
              placeholder="Краткое описание или подзаголовок раздела"
              value={editing.subtitle || ''}
              onChange={e => setEditing(prev => ({ ...prev, subtitle: e.target.value }))}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Содержимое страницы</label>
            <p className="text-xs text-slate-400 mb-2">Поддерживается форматирование: **жирный**, *курсив*, ## Заголовок, - список</p>
            <textarea
              rows={12}
              placeholder="Введите текст страницы..."
              value={editing.content || ''}
              onChange={e => setEditing(prev => ({ ...prev, content: e.target.value }))}
              className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => setEditing(prev => ({ ...prev, published: !prev.published }))}
              className={`relative w-11 h-6 rounded-full transition-colors ${editing.published ? 'bg-[#1B3F7C]' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${editing.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
            <span className="text-sm text-slate-700">{editing.published ? 'Страница опубликована' : 'Страница скрыта'}</span>
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-slate-900 mb-5">SEO</h3>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Title страницы</label>
            <input
              type="text"
              placeholder="Заголовок для поисковиков"
              value={editing.seo_title || ''}
              onChange={e => setEditing(prev => ({ ...prev, seo_title: e.target.value }))}
              className={inputCls}
            />
            <div className="text-right text-xs text-slate-400 mt-1">{(editing.seo_title || '').length} симв. (рекомендуется 50–60)</div>
          </div>
          <div>
            <label className={labelCls}>Meta Description</label>
            <textarea
              rows={3}
              placeholder="Описание для поисковиков"
              value={editing.seo_description || ''}
              onChange={e => setEditing(prev => ({ ...prev, seo_description: e.target.value }))}
              className={`${inputCls} resize-none`}
            />
            <div className="text-right text-xs text-slate-400 mt-1">{(editing.seo_description || '').length} симв. (рекомендуется 150–160)</div>
          </div>

          {/* Google preview */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-2">Предпросмотр в Google</div>
            <div className="text-blue-700 text-base font-medium truncate">{editing.seo_title || editing.title || 'Заголовок страницы'}</div>
            <div className="text-green-700 text-xs mt-0.5">ваш-сайт.ru/page/{editing.slug || 'slug'}</div>
            <div className="text-slate-600 text-sm mt-1 line-clamp-2">{editing.seo_description || 'Описание появится здесь...'}</div>
          </div>
        </div>
      </div>

      {/* Save bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
        {saveMsg
          ? <span className="flex items-center gap-2 text-green-600 text-sm font-medium"><Icon name="CheckCircle" size={16} />{saveMsg}</span>
          : <span className="text-xs text-slate-400">Изменения не сохранены</span>
        }
        <div className="flex items-center gap-3">
          <button onClick={() => setView('list')} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
            Отмена
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !editing.title || !editing.slug}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1B3F7C] text-white font-semibold text-sm hover:bg-[#163270] transition-colors disabled:opacity-60"
          >
            {saving ? <Icon name="Loader" size={15} className="animate-spin" /> : <Icon name="Save" size={15} />}
            {view === 'create' ? 'Создать' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPages;
