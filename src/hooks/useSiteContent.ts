import { useState, useEffect } from 'react';

const ADMIN_URL = 'https://functions.poehali.dev/f93de05a-95a2-4dbb-bfdd-35104dcbefc5';

export type SiteContent = Record<string, string>;

let cache: SiteContent | null = null;
let promise: Promise<SiteContent> | null = null;

async function fetchContent(): Promise<SiteContent> {
  if (cache) return cache;
  if (!promise) {
    promise = fetch(ADMIN_URL + '/settings', {
      headers: { 'X-Session-Id': 'public-read' },
    })
      .then(r => r.json())
      .then(d => {
        cache = d.settings || {};
        return cache as SiteContent;
      })
      .catch(() => {
        promise = null;
        return {} as SiteContent;
      });
  }
  return promise;
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(cache || {});
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) { setContent(cache); setLoading(false); return; }
    fetchContent().then(c => { setContent(c); setLoading(false); });
  }, []);

  const g = (key: string, fallback = '') => content[key] ?? fallback;

  return { content, loading, g };
}

export function invalidateContentCache() {
  cache = null;
  promise = null;
}
