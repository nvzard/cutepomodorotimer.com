import {
	applyTranslations,
	getLang,
	setLang,
	isLang,
	getBasePath,
	getLangFromPath,
	localizePath,
	type LangCode,
} from './i18n';

document.addEventListener('DOMContentLoaded', () => {
	let lang: LangCode = getLang();
	applyTranslations(lang);

	const themeToggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
	const langBtn = document.querySelector<HTMLButtonElement>('[data-lang-btn]');
	const langPanel = document.querySelector<HTMLElement>('[data-lang-panel]');
	const langOptions = document.querySelectorAll<HTMLAnchorElement>('[data-lang-option]');
	const langCode = document.querySelector<HTMLElement>('[data-lang-code]');

	function updateLangOptions() {
		langOptions.forEach((opt) => {
			opt.setAttribute('aria-checked', String(opt.dataset.langOption === lang));
		});
		if (langCode) langCode.textContent = lang.toUpperCase();
	}

	updateLangOptions();

	themeToggle?.addEventListener('click', () => {
		const isDark = document.documentElement.classList.contains('dark');
		document.documentElement.classList.toggle('dark', !isDark);
		try {
			localStorage.setItem('pomo:theme', isDark ? 'light' : 'dark');
		} catch {}
	});

	langBtn?.addEventListener('click', () => {
		const open = langPanel?.classList.contains('hidden');
		langPanel?.classList.toggle('hidden', !open);
		langBtn.setAttribute('aria-expanded', String(!open));
	});

	langOptions.forEach((opt) => {
		opt.addEventListener('click', (e) => {
			e.preventDefault();
			const code = opt.dataset.langOption;
			if (code && isLang(code)) {
				lang = code;
				setLang(code);
				updateLangOptions();
				history.pushState({}, '', localizePath(code, getBasePath(window.location.pathname)));
			}
			langPanel?.classList.add('hidden');
			langBtn?.setAttribute('aria-expanded', 'false');
		});
	});

	window.addEventListener('popstate', () => {
		const urlLang = getLangFromPath(window.location.pathname);
		if (urlLang !== lang) {
			lang = urlLang;
			setLang(urlLang);
			updateLangOptions();
		}
	});

	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (langPanel && langBtn && !langPanel.contains(target) && !langBtn.contains(target)) {
			langPanel.classList.add('hidden');
			langBtn.setAttribute('aria-expanded', 'false');
		}
	});
});
