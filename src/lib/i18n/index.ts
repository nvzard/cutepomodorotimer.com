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

export function isLang(value: string): value is LangCode {
	return (LANGUAGES as readonly { code: string }[]).some((l) => l.code === value);
}

export function t(lang: LangCode, key: TranslationKey): string {
	return translations[lang][key] ?? translations.en[key] ?? key;
}

export function getLang(): LangCode {
	try {
		const saved = localStorage.getItem(LANG_KEY);
		if (saved && isLang(saved)) return saved;
		const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
		if (isLang(nav)) return nav;
	} catch {}
	return 'en';
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
}
