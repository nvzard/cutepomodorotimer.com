type Phase = 'focus' | 'short' | 'long';

interface Settings {
	focus: number;
	short: number;
	long: number;
	autoBreaks: boolean;
	sound: boolean;
	notify: boolean;
}

const $ = <T extends Element = HTMLElement>(sel: string): T => document.querySelector(sel) as T;
const $$ = <T extends Element>(sel: string): T[] => Array.from(document.querySelectorAll(sel));

import { t, applyTranslations, isLang, type LangCode } from './i18n';

const SETTINGS_KEY = 'pomo:settings';
const THEME_KEY = 'pomo:theme';
const RING_CIRC = 842;

const defaultSettings: Settings = { focus: 25, short: 5, long: 15, autoBreaks: true, sound: true, notify: false };

function loadJSON<T>(key: string, fallback: T): T {
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return fallback;
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return parsed as T;
		return { ...fallback, ...parsed } as T;
	} catch {
		return fallback;
	}
}

/* ------------------------------------------------------------------ */
/* URL configuration + embed detection                                 */
/* ------------------------------------------------------------------ */
const params = new URLSearchParams(window.location.search);
const param = (name: string): string | null => params.get(name);

/* ------------------------------------------------------------------ */
/* Theme                                                               */
/* ------------------------------------------------------------------ */
function applyTheme() {
	const requested = param('theme');
	let theme: string | null = null;
	if (requested === 'light' || requested === 'dark') theme = requested;
	else {
		try {
			theme = localStorage.getItem(THEME_KEY);
		} catch {}
	}
	if (!theme) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	document.documentElement.classList.toggle('dark', theme === 'dark');
}

/* ------------------------------------------------------------------ */
/* Language                                                            */
/* ------------------------------------------------------------------ */
const requestedLang = param('lang');
const lang: LangCode = requestedLang && isLang(requestedLang) ? requestedLang : 'en';

/* ------------------------------------------------------------------ */
/* Timer                                                               */
/* ------------------------------------------------------------------ */
function clampMinutes(type: Phase, value: number): number {
	const max = type === 'focus' ? 180 : type === 'short' ? 60 : 90;
	return Math.min(max, Math.max(1, Math.round(value)));
}

document.addEventListener('DOMContentLoaded', () => {
	const saved = loadJSON<Partial<Settings>>(SETTINGS_KEY, {});
	const settings: Settings = { ...defaultSettings, ...saved };

	const focusParam = param('minutes') ?? param('focus');
	if (focusParam && !Number.isNaN(Number(focusParam))) settings.focus = clampMinutes('focus', Number(focusParam));
	const shortParam = param('short');
	if (shortParam && !Number.isNaN(Number(shortParam))) settings.short = clampMinutes('short', Number(shortParam));
	const longParam = param('long');
	if (longParam && !Number.isNaN(Number(longParam))) settings.long = clampMinutes('long', Number(longParam));
	const soundParam = param('sound');
	if (soundParam === '0') settings.sound = false;
	if (soundParam === '1') settings.sound = true;
	const autoParam = param('auto');
	if (autoParam === '1') settings.autoBreaks = true;
	if (autoParam === '0') settings.autoBreaks = false;

	const requestedMode = param('mode');
	const initialPhase: Phase = requestedMode === 'short' || requestedMode === 'long' ? requestedMode : 'focus';

	const body = document.body;
	const phaseLabel = $('[data-phase-label]');
	const timeEl = $('[data-time]');
	const ring = $<SVGCircleElement>('[data-ring]');
	const startBtn = $('[data-start-btn]');
	const startLabel = $('[data-start-label]');
	const startIcon = $('[data-start-icon]');
	const resetBtn = $('[data-reset-btn]');
	const skipBtn = $('[data-skip-btn]');
	const modePills = $$<HTMLButtonElement>('[data-mode-pill]');
	const dots = $$<HTMLElement>('[data-dot]');

	let phase: Phase = initialPhase;
	let running = false;
	let totalSec = (initialPhase === 'focus' ? settings.focus : initialPhase === 'short' ? settings.short : settings.long) * 60;
	let remaining = totalSec;
	let endAt = 0;
	let intervalId: number | null = null;
	let completedFocuses = 0;

	applyTheme();
	applyTranslations(lang);

	body.setAttribute('data-phase', phase === 'focus' ? 'focus' : 'break');

	function phaseDuration(): number {
		return (phase === 'focus' ? settings.focus : phase === 'short' ? settings.short : settings.long) * 60;
	}

	function updateTime() {
		const m = Math.floor(remaining / 60);
		const s = remaining % 60;
		timeEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
	}

	function updateRing() {
		const frac = totalSec > 0 ? remaining / totalSec : 0;
		ring.style.strokeDashoffset = String(RING_CIRC * (1 - frac));
	}

	function updateStartBtn() {
		startBtn.setAttribute('data-running', String(running));
		startLabel.textContent = running
			? t(lang, 'btn.pause')
			: remaining === totalSec
				? t(lang, 'btn.start')
				: t(lang, 'btn.resume');
		startIcon.innerHTML = running
			? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg>'
			: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
	}

	function updateDots() {
		const pos = completedFocuses % 4;
		dots.forEach((dot, i) => {
			dot.dataset.done = String(i < pos);
			dot.dataset.current = String(phase === 'focus' && i === pos);
		});
	}

	function updateModePills() {
		modePills.forEach((pill) => {
			pill.setAttribute('aria-pressed', String(pill.dataset.modePill === phase));
		});
	}

	function phaseLabelText(): string {
		return t(lang, phase === 'focus' ? 'phase.focus' : phase === 'short' ? 'phase.short' : 'phase.long');
	}

	function setPhase(p: Phase) {
		phase = p;
		running = false;
		stopTicker();
		totalSec = phaseDuration();
		remaining = totalSec;
		body.setAttribute('data-phase', p === 'focus' ? 'focus' : 'break');
		phaseLabel.textContent = phaseLabelText();
		updateTime();
		updateRing();
		updateStartBtn();
		updateModePills();
		updateDots();
	}

	function startTicker() {
		stopTicker();
		intervalId = window.setInterval(tick, 250);
		tick();
	}

	function stopTicker() {
		if (intervalId !== null) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	function tick() {
		if (!running) return;
		const rem = (endAt - Date.now()) / 1000;
		if (rem <= 0) {
			remaining = 0;
			updateTime();
			updateRing();
			completePhase();
		} else {
			remaining = Math.ceil(rem);
			updateTime();
			updateRing();
		}
	}

	function start() {
		running = true;
		endAt = Date.now() + remaining * 1000;
		startTicker();
		updateStartBtn();
	}

	function pause() {
		if (!running) return;
		running = false;
		remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
		stopTicker();
		updateStartBtn();
	}

	function reset() {
		stopTicker();
		running = false;
		totalSec = phaseDuration();
		remaining = totalSec;
		updateTime();
		updateRing();
		updateStartBtn();
	}

	let chimeEl: HTMLAudioElement | null = null;

	function chime() {
		try {
			chimeEl = chimeEl || document.querySelector<HTMLAudioElement>('[data-chime]');
			if (!chimeEl) return;
			chimeEl.currentTime = 0;
			chimeEl.volume = 1;
			chimeEl.play().catch(() => {});
		} catch {}
	}

	function completePhase() {
		running = false;
		stopTicker();
		if (settings.sound) chime();
		if (phase === 'focus') {
			completedFocuses += 1;
			const next: Phase = completedFocuses % 4 === 0 ? 'long' : 'short';
			setPhase(next);
			if (settings.autoBreaks) {
				setTimeout(() => {
					if (!running) start();
				}, 500);
			}
		} else {
			setPhase('focus');
		}
	}

	function skip() {
		stopTicker();
		if (phase === 'focus') {
			const next: Phase = completedFocuses % 4 === 3 ? 'long' : 'short';
			setPhase(next);
		} else {
			setPhase('focus');
		}
	}

	startBtn.addEventListener('click', () => {
		if (running) pause();
		else start();
	});
	resetBtn.addEventListener('click', reset);
	skipBtn.addEventListener('click', skip);
	modePills.forEach((pill) => {
		pill.addEventListener('click', () => {
			setPhase(pill.dataset.modePill as Phase);
		});
	});

	/* Keyboard — avoid hijacking the landing page controls */
	document.addEventListener('keydown', (e) => {
		const target = e.target as HTMLElement;
		const interactive = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(target.tagName);
		if (e.key === ' ' && !interactive) {
			e.preventDefault();
			if (running) pause();
			else start();
		} else if ((e.key === 'r' || e.key === 'R') && !interactive) {
			reset();
		}
	});

	/* ------------------------------------------------------------------ */
	/* Generator (landing page only)                                       */
	/* ------------------------------------------------------------------ */
	const genInput = $<HTMLInputElement>('[data-gen-minutes]');
	const genMode = $<HTMLSelectElement>('[data-gen-mode]');
	const genAuto = $<HTMLInputElement>('[data-gen-auto]');
	const genTheme = $<HTMLSelectElement>('[data-gen-theme]');
	const genLang = $<HTMLSelectElement>('[data-gen-lang]');
	const genUrl = $('[data-gen-url]');
	const genCopy = $('[data-gen-copy]');
	const genCode = $('[data-gen-code]');
	const genCodeCopy = $('[data-gen-code-copy]');

	function buildEmbedUrl(): string {
		const url = new URL(window.location.href);
		url.search = '';
		if (genInput && !Number.isNaN(Number(genInput.value)) && Number(genInput.value) > 0) {
			url.searchParams.set('minutes', String(clampMinutes('focus', Number(genInput.value))));
		}
		if (genMode && genMode.value !== 'focus') url.searchParams.set('mode', genMode.value);
		if (genAuto && genAuto.checked) url.searchParams.set('auto', '1');
		if (genTheme && genTheme.value !== 'auto') url.searchParams.set('theme', genTheme.value);
		if (genLang && genLang.value !== 'en') url.searchParams.set('lang', genLang.value);
		const out = url.pathname.replace(/\/+$/, '') + (url.search ? url.search : '');
		return `${url.origin}${out}`;
	}

	function buildEmbedCode(): string {
		return `<iframe src="${buildEmbedUrl()}" style="width:100%;max-width:420px;height:560px;border:0" title="Cute Pomodoro timer" loading="lazy"></iframe>`;
	}

	function updateGenerator() {
		if (!genUrl) return;
		genUrl.textContent = buildEmbedUrl();
		if (genCode) genCode.textContent = buildEmbedCode();
	}

	if (genInput) {
		[genInput, genMode, genAuto, genTheme, genLang].forEach((el) => {
			if (el) el.addEventListener('input', updateGenerator);
		});
		updateGenerator();
	}

	if (genCopy) {
		genCopy.addEventListener('click', async () => {
			const text = buildEmbedUrl();
			try {
				await navigator.clipboard.writeText(text);
				const original = genCopy.textContent;
				genCopy.textContent = 'Copied ♡';
				setTimeout(() => {
					genCopy.textContent = original;
				}, 1600);
			} catch {
				if (genUrl) genUrl.textContent = text;
			}
		});
	}

	if (genCodeCopy) {
		genCodeCopy.addEventListener('click', async () => {
			const text = buildEmbedCode();
			try {
				await navigator.clipboard.writeText(text);
				const original = genCodeCopy.textContent;
				genCodeCopy.textContent = 'Copied ♡';
				setTimeout(() => {
					genCodeCopy.textContent = original;
				}, 1600);
			} catch {
				if (genCode) genCode.textContent = text;
			}
		});
	}

	/* ------------------------------------------------------------------ */
	/* Init                                                                */
	/* ------------------------------------------------------------------ */
	phaseLabel.textContent = phaseLabelText();
	updateTime();
	updateRing();
	updateStartBtn();
	updateModePills();
	updateDots();

	if (param('auto') === '1') start();
});
