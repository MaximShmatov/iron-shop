const KEY = 'ce03e39174374877b5dc588a9012459b';

const baseURL = (path: string) => {
  const url = new URL('https://newsapi.org');
  url.pathname = path;
  url.searchParams.set('apiKey', KEY);
  return url;
};

export const fetchTopHeadlines = (country: string) => {
  const url = baseURL('/v2/top-headlines');
  url.searchParams.set('country', country);
  return fetch(url.href).then((res) => res.json());
};

export const fetchFromKeywords = (keyword: string) => {
  const url = baseURL('/v2/everything');
  url.searchParams.set('q', keyword);
  return fetch(url.href).then((res) => res.json());
};
