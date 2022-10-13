const PRODUCTION_BASE_URL = 'https://api.tenor.com/v1';

export type ContentFilter = 'off' | 'low' | 'medium' | 'high';

export type GifFormat =
  | 'gif'
  | 'mediumgif'
  | 'tinygif'
  | 'nanogif'
  | 'mp4'
  | 'loopedmp4'
  | 'tinymp4'
  | 'nanomp4'
  | 'webm'
  | 'tinywebm'
  | 'nanowebm';

export type CategoryType = 'featured' | 'emoji' | 'trending';

export interface SearchResult {
  next: string;
  results: Gif[];
}

export type TrendingResult = SearchResult;

export interface CategoryResult {
  tags: Tag[];
}

export interface Media {
  preview: string;
  url: string;
  dims: number[];
  size: number;
}

export interface Gif {
  created: number;
  hasaudio: boolean;
  id: string;
  // https://github.com/microsoft/TypeScript/issues/24220
  media: { [format in GifFormat]: Media };
  tags: string[];
  title: string;
  itemurl: string;
  hascaption: boolean;
  url: string;
}

export interface Tag {
  searchterm: string;
  path: string;
  image: string;
  name: string;
}

export interface SearchOptions {
  locale?: string;
  media_filter?: string;
  ar_range?: string;
  contentfilter?: ContentFilter;
  limit?: number;
  pos?: string;
  anon_id?: string;
}

export type TrendingOptions = SearchOptions;

export interface CategoryOptions {
  locale?: string;
  type?: CategoryType;
  contentfilter?: ContentFilter;
  anon_id?: string;
}

export interface SearchSuggestionsOptions {
  locale?: string;
  limit?: number;
  anon_id?: string;
}

export interface SearchSuggestionsResult {
  results: string[];
}

export type AutoCompleteOptions = SearchSuggestionsOptions;
export type AutoCompleteResult = SearchSuggestionsResult;
export type TrendingSearchTermsOptions = SearchSuggestionsOptions;
export type TrendingSearchTermsResult = SearchSuggestionsResult;

export interface RegisterShareOptions {
  locale?: string;
  q?: string;
  anon_id?: string;
}

export interface RegisterShareResult {
  status: string;
}

export interface GifsOptions {
  media_filter?: string;
  limit?: number;
  pos?: string;
  anon_id?: string;
}

export type GifsResult = SearchResult;

export interface AnonymousIDResult {
  anon_id: string;
}

export default class TenorFetch {
  baseURL: string;

  constructor(private apiKey: string) {
    this.baseURL = PRODUCTION_BASE_URL;
  }

  get(endpoint: string, ...params: object[]): Promise<any> {
    const searchParams = new URLSearchParams(Object.assign({key: this.apiKey}, ...params)).toString();
    const url = `${this.baseURL}/${endpoint}?${searchParams}`;
    return fetch(url).then((resp) => resp.json());
  }

  search(term: string, options?: SearchOptions): Promise<SearchResult> {
    return this.get('search', { q: term }, options || {}) as Promise<SearchResult>;
  }

  trending(options?: TrendingOptions): Promise<TrendingResult> {
    return this.get('trending', options || {}) as Promise<TrendingResult>;
  }

  categories(options?: CategoryOptions): Promise<CategoryResult> {
    return this.get('categories', options || {}) as Promise<CategoryResult>;
  }

  searchSuggestions(term: string, options?: SearchSuggestionsOptions): Promise<SearchSuggestionsResult> {
    return this.get('search_suggestions', { q: term }, options || {}) as Promise<SearchSuggestionsResult>;
  }

  autoComplete(term: string, options?: AutoCompleteOptions): Promise<AutoCompleteResult> {
    return this.get('autocomplete', { q: term }, options || {}) as Promise<AutoCompleteResult>;
  }

  trendingSearchTerms(options?: TrendingSearchTermsOptions): Promise<TrendingSearchTermsResult> {
    return this.get('trending_terms', options || {}) as Promise<TrendingSearchTermsResult>;
  }

  registerShare(id: string, options?: RegisterShareOptions): Promise<RegisterShareResult> {
    return this.get('registershare', options || {}) as Promise<RegisterShareResult>;
  }

  gifs(ids: string[], options?: GifsOptions): Promise<GifsResult> {
    const idsString = ids.join(',');
    return this.get('gifs', { ids: idsString }, options || {}) as Promise<GifsResult>;
  }

  random(term: string, options?: SearchOptions): Promise<SearchResult> {
    return this.get('random', { q: term }, options || {}) as Promise<SearchResult>;
  }

  anonymousID(): Promise<AnonymousIDResult> {
    return this.get('anonid') as Promise<AnonymousIDResult>;
  }
}
