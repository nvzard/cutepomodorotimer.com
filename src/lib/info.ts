import {
	getLang,
	isLang,
	type LangCode,
	LANG_KEY,
} from './i18n/client';

document.addEventListener('DOMContentLoaded', () => {
	let lang: LangCode = getLang();

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
		if (langBtn) {
			const label = langBtn.getAttribute('aria-label') || 'Change language';
			const base = label.split('(')[0].trim();
			langBtn.setAttribute('aria-label', `${base} (${lang.toUpperCase()})`);
		}
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
		opt.addEventListener('click', () => {
			const code = opt.dataset.langOption;
			if (code && isLang(code)) {
				try {
					localStorage.setItem(LANG_KEY, code);
				} catch {}
			}
			langPanel?.classList.add('hidden');
			langBtn?.setAttribute('aria-expanded', 'false');
		});
	});

	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (langPanel && langBtn && !langPanel.contains(target) && !langBtn.contains(target)) {
			langPanel.classList.add('hidden');
			langBtn.setAttribute('aria-expanded', 'false');
		}
	});
});
