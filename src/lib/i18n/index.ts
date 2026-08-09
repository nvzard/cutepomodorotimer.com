import { en, type TranslationKey } from './en';
import es from './es';
import de from './de';
import fr from './fr';
import hi from './hi';
import ja from './ja';
import pt from './pt';

export type LangCode = (typeof LANGUAGES)[number]['code'];

export const LANGUAGES = [
	{ code: 'en', name: 'English', flag: '🇬🇧' },
	{ code: 'es', name: 'Español', flag: '🇪🇸' },
	{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
	{ code: 'fr', name: 'Français', flag: '🇫🇷' },
	{ code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
	{ code: 'ja', name: '日本語', flag: '🇯🇵' },
	{ code: 'pt', name: 'Português', flag: '🇧🇷' },
] as const;

export const translations: Record<LangCode, Record<TranslationKey, string>> = {
	en,
	es,
	de,
	fr,
	hi,
	ja,
	pt,
};

export const LANG_KEY = 'pomo:lang';

export const DEFAULT_LANG: LangCode = 'en';

export function isLang(value: string): value is LangCode {
	return (LANGUAGES as readonly { code: string }[]).some((l) => l.code === value);
}

export function t(lang: LangCode, key: TranslationKey): string {
	return translations[lang][key] ?? translations.en[key] ?? key;
}

/** Extract the language from a URL pathname, e.g. `/es/about/` → `es`. */
export function getLangFromPath(pathname: string): LangCode {
	const first = pathname.split('/')[1];
	return isLang(first) ? first : DEFAULT_LANG;
}

/** Strip a language prefix from a pathname, e.g. `/es/about/` → `/about/`. */
export function getBasePath(pathname: string): string {
	const lang = getLangFromPath(pathname);
	const prefix = `/${lang}`;
	const rest = lang === DEFAULT_LANG || !pathname.startsWith(prefix) ? pathname : pathname.slice(prefix.length);
	return rest.startsWith('/') ? rest : `/${rest}`;
}

/** Build a locale-prefixed path for a language, e.g. `es` + `/about/` → `/es/about/`. */
export function localizePath(lang: LangCode, path: string): string {
	if (lang === DEFAULT_LANG) return path;
	const base = path.startsWith('/') ? path : `/${path}`;
	return `/${lang}${base}`;
}

export function getLang(): LangCode {
	try {
		const fromUrl = getLangFromPath(window.location.pathname);
		if (isLang(fromUrl)) return fromUrl;
	} catch {}
	try {
		const saved = localStorage.getItem(LANG_KEY);
		if (saved && isLang(saved)) return saved;
		const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
		if (isLang(nav)) return nav;
	} catch {}
	return DEFAULT_LANG;
}

export function setLang(lang: LangCode) {
	try {
		localStorage.setItem(LANG_KEY, lang);
	} catch {}
	applyTranslations(lang);
	document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

export function applyTranslations(lang: LangCode) {
	document.documentElement.lang = lang;
	document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
		const key = el.dataset.i18n as TranslationKey;
		el.textContent = t(lang, key);
	});
	document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((el) => {
		const key = el.dataset.i18nPlaceholder as TranslationKey;
		el.setAttribute('placeholder', t(lang, key));
	});
	document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
		const key = el.dataset.i18nAria as TranslationKey;
		el.setAttribute('aria-label', t(lang, key));
	});
	document.querySelectorAll<HTMLElement>('[data-i18n-title]').forEach((el) => {
		const key = el.dataset.i18nTitle as TranslationKey;
		el.setAttribute('title', t(lang, key));
	});
	document.querySelectorAll<HTMLAnchorElement>('[data-i18n-href]').forEach((el) => {
		const path = el.dataset.i18nHref;
		if (path) el.href = localizePath(lang, path);
	});

	// Keep canonical + hreflang alternates in sync with the current URL language.
	const basePath = getBasePath(window.location.pathname);
	const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
	if (canonical) {
		try {
			canonical.href = new URL(localizePath(lang, basePath), new URL(canonical.href, location.href)).toString();
		} catch {}
	}
	document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"]').forEach((el) => {
		const hl = el.getAttribute('hreflang');
		if (!hl || hl === 'x-default' || !isLang(hl)) return;
		try {
			el.href = new URL(localizePath(hl, basePath), new URL(el.href, location.href)).toString();
		} catch {}
	});
}
