type Phase = 'focus' | 'short' | 'long';

interface Settings {
	focus: number;
	short: number;
	long: number;
	autoBreaks: boolean;
	sound: boolean;
	notify: boolean;
}

interface Todo {
	id: string;
	text: string;
	done: boolean;
}

const $ = <T extends Element = HTMLElement>(sel: string): T => document.querySelector(sel) as T;
const $$ = <T extends Element>(sel: string): T[] => Array.from(document.querySelectorAll(sel));

import { t, getLang, applyTranslations, setLang, isLang, getBasePath, getLangFromPath, localizePath, type LangCode } from './i18n';

const SETTINGS_KEY = 'pomo:settings';
const TODOS_KEY = 'pomo:todos';
const MUSIC_KEY = 'pomo:music';
const SPOTIFY_URL_KEY = 'pomo:spotify-url';
const CUSTOM_DB = 'pomo-custom-track';
const CUSTOM_DB_STORE = 'files';
const CUSTOM_DB_KEY = 'track';

const BUILTIN_TRACK_KEYS = ['dock.track0', 'dock.track1'];
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

function saveJSON(key: string, value: unknown) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}

interface CustomTrackRecord {
	name: string;
	blob: Blob;
}

function openCustomDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(CUSTOM_DB, 1);
		req.onupgradeneeded = () => {
			if (!req.result.objectStoreNames.contains(CUSTOM_DB_STORE)) req.result.createObjectStore(CUSTOM_DB_STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}

function saveCustomTrack(record: CustomTrackRecord): Promise<void> {
	return openCustomDB().then(
		(db) =>
			new Promise<void>((resolve, reject) => {
				const tx = db.transaction(CUSTOM_DB_STORE, 'readwrite');
				tx.objectStore(CUSTOM_DB_STORE).put(record, CUSTOM_DB_KEY);
				tx.oncomplete = () => resolve();
				tx.onerror = () => reject(tx.error);
			}),
	);
}

function loadCustomTrack(): Promise<CustomTrackRecord | null> {
	return openCustomDB().then(
		(db) =>
			new Promise<CustomTrackRecord | null>((resolve, reject) => {
				const tx = db.transaction(CUSTOM_DB_STORE, 'readonly');
				const req = tx.objectStore(CUSTOM_DB_STORE).get(CUSTOM_DB_KEY);
				req.onsuccess = () => resolve((req.result as CustomTrackRecord | undefined) ?? null);
				req.onerror = () => reject(req.error);
			}),
	);
}

function deleteCustomTrack(): Promise<void> {
	return openCustomDB().then(
		(db) =>
			new Promise<void>((resolve, reject) => {
				const tx = db.transaction(CUSTOM_DB_STORE, 'readwrite');
				tx.objectStore(CUSTOM_DB_STORE).delete(CUSTOM_DB_KEY);
				tx.oncomplete = () => resolve();
				tx.onerror = () => reject(tx.error);
			}),
	);
}

function esc(text: string): string {
	return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

const playSvg = (n: number) =>
	`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${n}" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>`;
const pauseSvg = (n: number) =>
	`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${n}" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg>`;
const checkSvg =
	'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const xSvg =
	'<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

document.addEventListener('DOMContentLoaded', () => {
	/* ------------------------------------------------------------------ */
	/* State                                                               */
	/* ------------------------------------------------------------------ */
	let settings: Settings = loadJSON(SETTINGS_KEY, defaultSettings);
	let todos: Todo[] = loadJSON(TODOS_KEY, []);
	let lang: LangCode = getLang();

	let phase: Phase = 'focus';
	let running = false;
	let totalSec = settings.focus * 60;
	let remaining = totalSec;
	let endAt = 0;
	let intervalId: number | null = null;
	let completedFocuses = 0;

	let track = 0;
	let playing = false;
	let spotifyPlaying = false;
	let spotifyLoaded = false;
	let muted = false;
	let volume = 0.6;

	/* ------------------------------------------------------------------ */
	/* Elements                                                            */
	/* ------------------------------------------------------------------ */
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
	const taskAnchor = $('[data-task-anchor]');
	const taskText = $('[data-task-text]');

	const todoBtn = $('[data-todo-btn]');
	const todoCount = $('[data-todo-count]');
	const todoPanel = $('[data-todo-panel]');
	const todoClose = $('[data-todo-close]');
	const todoForm = $<HTMLFormElement>('[data-todo-form]');
	const todoInput = $<HTMLInputElement>('[data-todo-input]');
	const todoList = $('[data-todo-list]');
	const todoEmpty = $('[data-todo-empty]');
	const todoPanelCount = $('[data-todo-panel-count]');

	const themeToggle = $('[data-theme-toggle]');
	const fullscreenBtn = $('[data-fullscreen-btn]');
	const settingsBtn = $('[data-settings-btn]');
	const settingsPanel = $('[data-settings-panel]');
	const settingsClose = $('[data-settings-close]');
	const durInputs = $$<HTMLInputElement>('[data-dur]');
	const stepMinus = $$<HTMLButtonElement>('[data-step-minus]');
	const stepPlus = $$<HTMLButtonElement>('[data-step-plus]');
	const toggles = $$<HTMLButtonElement>('[data-toggle]');

	const langBtn = $('[data-lang-btn]');
	const langPanel = $('[data-lang-panel]');
	const langOptions = $$<HTMLButtonElement>('[data-lang-option]');
	const langCode = $('[data-lang-code]');

	const dock = $('[data-music]');
	const musicPlayBtn = $('[data-music-play]');
	const musicPlayIcon = $('[data-music-play-icon]');
	const trackBtn = $('[data-track-btn]');
	const trackLabel = $('[data-track-label]');
	const volumeInput = $<HTMLInputElement>('[data-volume]');
	const muteBtn = $('[data-mute-btn]');
	const volumeIcon = $('[data-volume-icon]');
	const audioEls = $$<HTMLAudioElement>('[data-audio]');

	const spotifyBtn = $('[data-spotify-btn]');
	const spotifyPanel = $('[data-spotify-panel]');
	const spotifyClose = $('[data-spotify-close]');
	const spotifyFrame = $<HTMLIFrameElement>('[data-spotify-frame]');
	const spotifyForm = $<HTMLFormElement>('[data-spotify-form]');
	const spotifyUrlInput = $<HTMLInputElement>('[data-spotify-url]');
	const spotifyError = $('[data-spotify-error]');
	const spotifyResetBtn = $('[data-spotify-reset]');
	const spotifyLoginLink = $('[data-spotify-login]');

	const uploadBtn = $('[data-upload-btn]');
	const fileInput = $<HTMLInputElement>('[data-file-input]');
	const customRemoveBtn = $('[data-custom-remove]');

	/* ------------------------------------------------------------------ */
	/* Settings UI                                                         */
	/* ------------------------------------------------------------------ */
	function applySettingsUI() {
		durInputs.forEach((input) => {
			input.value = String(settings[input.dataset.dur as keyof Settings]);
		});
		toggles.forEach((btn) => {
			const key = btn.dataset.toggle as keyof Settings;
			btn.setAttribute('aria-checked', String(Boolean(settings[key])));
		});
	}

	function saveSettings() {
		saveJSON(SETTINGS_KEY, settings);
	}

	function changeDuration(type: 'focus' | 'short' | 'long', value: number) {
		const max = type === 'focus' ? 180 : type === 'short' ? 60 : 90;
		settings[type] = Math.min(max, Math.max(1, Math.round(value)));
		saveSettings();
		applySettingsUI();
		if (!running && phase === type) {
			totalSec = settings[type] * 60;
			remaining = totalSec;
			updateTime();
			updateRing();
			updateStartBtn();
			updateTitle();
		}
	}

	durInputs.forEach((input) => {
		input.addEventListener('change', () => {
			changeDuration(input.dataset.dur as 'focus' | 'short' | 'long', Number(input.value));
		});
	});
	stepMinus.forEach((btn) => {
		btn.addEventListener('click', () => {
			const key = (btn.dataset.stepMinus ?? 'focus') as 'focus' | 'short' | 'long';
			changeDuration(key, settings[key] - 1);
		});
	});
	stepPlus.forEach((btn) => {
		btn.addEventListener('click', () => {
			const key = (btn.dataset.stepPlus ?? 'focus') as 'focus' | 'short' | 'long';
			changeDuration(key, settings[key] + 1);
		});
	});
	toggles.forEach((btn) => {
		btn.addEventListener('click', () => {
			const key = (btn.dataset.toggle ?? 'sound') as 'autoBreaks' | 'sound' | 'notify';
			settings[key] = !settings[key];
			saveSettings();
			applySettingsUI();
			if (key === 'notify' && settings.notify && 'Notification' in window && Notification.permission === 'default') {
				Notification.requestPermission();
			}
		});
	});

	/* ------------------------------------------------------------------ */
	/* Theme                                                               */
	/* ------------------------------------------------------------------ */
	function updateThemeMeta() {
		const isDark = document.documentElement.classList.contains('dark');
		const meta = document.querySelector('meta[name="theme-color"]');
		if (meta) meta.setAttribute('content', isDark ? '#231926' : '#fff3f8');
		const label = document.querySelector('[data-theme-shortcut-label]');
		if (label) label.textContent = isDark ? t(lang, 'shortcut.light') : t(lang, 'shortcut.dark');
	}

	themeToggle.addEventListener('click', () => {
		const isDark = document.documentElement.classList.contains('dark');
		document.documentElement.classList.toggle('dark', !isDark);
		try {
			localStorage.setItem('pomo:theme', isDark ? 'light' : 'dark');
		} catch {}
		updateThemeMeta();
	});

	/* ------------------------------------------------------------------ */
	/* Fullscreen                                                          */
	/* ------------------------------------------------------------------ */
	type FullscreenElement = HTMLElement & { webkitRequestFullscreen?: () => void };
	type FullscreenDocument = Document & { webkitFullscreenElement?: Element | null; webkitExitFullscreen?: () => void };

	const fsDoc = document as FullscreenDocument;

	const fullscreenSupported = 'fullscreenEnabled' in document && document.fullscreenEnabled;

	function isFullscreen(): boolean {
		return Boolean(fsDoc.fullscreenElement || fsDoc.webkitFullscreenElement);
	}

	function updateFullscreenUI() {
		const fs = isFullscreen();
		fullscreenBtn.setAttribute('aria-pressed', String(fs));
		fullscreenBtn.setAttribute('aria-label', fs ? t(lang, 'topbar.exitFs') : t(lang, 'topbar.enterFs'));
	}

	if (!fullscreenSupported) {
		fullscreenBtn.classList.add('hidden');
	} else {
		fullscreenBtn.addEventListener('click', () => {
			if (isFullscreen()) {
				if (document.exitFullscreen) document.exitFullscreen();
				else fsDoc.webkitExitFullscreen?.();
			} else {
				const el = document.documentElement as FullscreenElement;
				if (el.requestFullscreen) el.requestFullscreen();
				else el.webkitRequestFullscreen?.();
			}
		});

		document.addEventListener('fullscreenchange', updateFullscreenUI);
		document.addEventListener('webkitfullscreenchange', updateFullscreenUI);
	}

	/* ------------------------------------------------------------------ */
	/* Todos                                                               */
	/* ------------------------------------------------------------------ */
	function incompleteCount(): number {
		return todos.filter((todo) => !todo.done).length;
	}

	function renderTodos() {
		const items = todos
			.map(
				(todo) => `
			<li class="group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_6%,transparent)]" data-id="${todo.id}">
				<button type="button" data-act="toggle" class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all ${
					todo.done
						? 'border-[var(--tomato-deep)] bg-[var(--tomato-deep)] text-white'
						: 'border-[color-mix(in_srgb,var(--mute)_55%,transparent)] text-transparent hover:border-[var(--tomato)]'
				}" aria-label="${todo.done ? t(lang, 'todo.markNotDone') : t(lang, 'todo.markDone')}">${checkSvg}</button>
				<span class="min-w-0 flex-1 break-words text-sm ${todo.done ? 'text-mute line-through' : 'text-ink'}">${esc(todo.text)}</span>
				<button type="button" data-act="del" class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-mute transition-opacity hover:bg-[color-mix(in_srgb,var(--ink)_8%,transparent)] hover:text-ink [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100" aria-label="${t(lang, 'todo.deleteAria')}">${xSvg}</button>
			</li>`,
			)
			.join('');
		todoList.innerHTML = items;
		todoEmpty.classList.toggle('hidden', todos.length > 0);
		todoPanelCount.textContent = todos.length ? `· ${todos.length}` : '';
		const open = incompleteCount();
		if (open > 0) {
			todoCount.textContent = String(open);
			todoCount.classList.remove('hidden');
			todoCount.classList.add('flex');
		} else {
			todoCount.classList.add('hidden');
			todoCount.classList.remove('flex');
		}
		updateAnchor();
	}

	function updateAnchor() {
		const active = todos.find((t) => !t.done) ?? todos[todos.length - 1];
		taskText.textContent = active ? active.text : t(lang, 'todo.tapAdd');
	}

	function saveTodos() {
		saveJSON(TODOS_KEY, todos);
	}

	todoForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const text = todoInput.value.trim();
		if (!text) return;
		todos.push({ id: crypto.randomUUID(), text, done: false });
		saveTodos();
		renderTodos();
		todoInput.value = '';
		todoInput.focus();
	});

	todoList.addEventListener('click', (e) => {
		const btn = (e.target as HTMLElement).closest('[data-act]') as HTMLElement | null;
		if (!btn) return;
		e.stopPropagation();
		const id = (btn.closest('li') as HTMLElement | null)?.dataset.id;
		if (!id) return;
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;
		if (btn.dataset.act === 'toggle') {
			todo.done = !todo.done;
			saveTodos();
			renderTodos();
		} else if (btn.dataset.act === 'del') {
			todos = todos.filter((t) => t.id !== id);
			saveTodos();
			renderTodos();
		}
	});

	/* ------------------------------------------------------------------ */
	/* Panels                                                              */
	/* ------------------------------------------------------------------ */
	function openPanel(el: HTMLElement, open: boolean, btn?: HTMLElement) {
		el.classList.toggle('hidden', !open);
		if (btn) btn.setAttribute('aria-expanded', String(open));
	}

	function closePanels() {
		openPanel(todoPanel, false, todoBtn);
		openPanel(settingsPanel, false, settingsBtn);
		openPanel(spotifyPanel, false, spotifyBtn);
		langPanel.classList.add('hidden');
		langBtn.setAttribute('aria-expanded', 'false');
	}

	/* Language switcher */
	function updateLangOptions() {
		langOptions.forEach((opt) => {
			opt.setAttribute('aria-checked', String(opt.dataset.langOption === lang));
		});
		langCode.textContent = lang.toUpperCase();
	}

	langBtn.addEventListener('click', () => {
		const open = langPanel.classList.contains('hidden');
		openPanel(settingsPanel, false, settingsBtn);
		openPanel(todoPanel, false, todoBtn);
		openPanel(spotifyPanel, false, spotifyBtn);
		langPanel.classList.toggle('hidden', !open);
		langBtn.setAttribute('aria-expanded', String(open));
	});

	langOptions.forEach((opt) => {
		opt.addEventListener('click', (e) => {
			e.preventDefault();
			const code = opt.dataset.langOption;
			if (code && isLang(code)) {
				lang = code;
				setLang(code);
				history.pushState({}, '', localizePath(code, getBasePath(window.location.pathname)));
			}
			langPanel.classList.add('hidden');
			langBtn.setAttribute('aria-expanded', 'false');
		});
	});

	window.addEventListener('popstate', () => {
		const urlLang = getLangFromPath(window.location.pathname);
		if (urlLang !== lang) {
			lang = urlLang;
			setLang(urlLang);
		}
	});

	document.addEventListener('langchange', (e) => {
		const code = (e as CustomEvent).detail;
		if (isLang(code)) lang = code;
		updateLangOptions();
		renderTodos();
		updateAnchor();
		updateThemeMeta();
		updateTitle();
		updateStartBtn();
		phaseLabel.textContent = phaseLabelText();
		trackLabel.textContent = updateTrackLabel();
		setPlaying(playing);
		updateFullscreenUI();
	});

	todoBtn.addEventListener('click', () => {
		const open = todoPanel.classList.contains('hidden');
		openPanel(settingsPanel, false, settingsBtn);
		openPanel(spotifyPanel, false, spotifyBtn);
		openPanel(todoPanel, open, todoBtn);
		if (open) setTimeout(() => todoInput.focus(), 50);
	});

	todoClose.addEventListener('click', () => openPanel(todoPanel, false, todoBtn));
	settingsBtn.addEventListener('click', () => {
		const open = settingsPanel.classList.contains('hidden');
		openPanel(todoPanel, false, todoBtn);
		openPanel(spotifyPanel, false, spotifyBtn);
		openPanel(settingsPanel, open, settingsBtn);
	});
	settingsClose.addEventListener('click', () => openPanel(settingsPanel, false, settingsBtn));

	spotifyBtn.addEventListener('click', () => {
		const open = spotifyPanel.classList.contains('hidden');
		openPanel(todoPanel, false, todoBtn);
		openPanel(settingsPanel, false, settingsBtn);
		openPanel(spotifyPanel, open, spotifyBtn);
	});
	spotifyClose.addEventListener('click', () => openPanel(spotifyPanel, false, spotifyBtn));

	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (!todoPanel.contains(target) && !todoBtn.contains(target) && !taskAnchor.contains(target))
			openPanel(todoPanel, false, todoBtn);
		if (!settingsPanel.contains(target) && !settingsBtn.contains(target)) openPanel(settingsPanel, false, settingsBtn);
		if (!spotifyPanel.contains(target) && !spotifyBtn.contains(target)) openPanel(spotifyPanel, false, spotifyBtn);
		if (!langPanel.contains(target) && !langBtn.contains(target)) {
			langPanel.classList.add('hidden');
			langBtn.setAttribute('aria-expanded', 'false');
		}
	});

	taskAnchor.addEventListener('click', () => {
		const open = todoPanel.classList.contains('hidden');
		openPanel(settingsPanel, false, settingsBtn);
		openPanel(spotifyPanel, false, spotifyBtn);
		openPanel(todoPanel, open, todoBtn);
		if (open) setTimeout(() => todoInput.focus(), 50);
	});

	/* ------------------------------------------------------------------ */
	/* Timer                                                               */
	/* ------------------------------------------------------------------ */
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

	function updateTitle() {
		const label = t(lang, phase === 'focus' ? 'title.focus' : phase === 'short' ? 'title.short' : 'title.long');
		document.title = running
			? `${timeEl.textContent} · ${label} — ${t(lang, 'title.app')}`
			: t(lang, 'title.seo');
	}

	function updateStartBtn() {
		startBtn.setAttribute('data-running', String(running));
		startLabel.textContent = running
			? t(lang, 'btn.pause')
			: remaining === totalSec
				? t(lang, 'btn.start')
				: t(lang, 'btn.resume');
		startIcon.innerHTML = running ? pauseSvg(20) : playSvg(20);
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
		updateTitle();
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
			updateTitle();
		}
	}

	function start() {
		running = true;
		endAt = Date.now() + remaining * 1000;
		startTicker();
		updateStartBtn();
		updateTitle();
		if (settings.notify && 'Notification' in window && Notification.permission === 'default') {
			Notification.requestPermission();
		}
	}

	function pause() {
		if (!running) return;
		running = false;
		remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
		stopTicker();
		updateStartBtn();
		updateTitle();
	}

	function reset() {
		stopTicker();
		running = false;
		totalSec = phaseDuration();
		remaining = totalSec;
		updateTime();
		updateRing();
		updateStartBtn();
		updateTitle();
	}

	function completePhase() {
		running = false;
		stopTicker();
		if (settings.sound) chime();
		if (phase === 'focus') {
			completedFocuses += 1;
			const next: Phase = completedFocuses % 4 === 0 ? 'long' : 'short';
			notify(
				t(lang, 'notify.focusComplete'),
				next === 'long' ? t(lang, 'notify.napMessage') : t(lang, 'notify.snackMessage'),
			);
			setPhase(next);
			if (settings.autoBreaks) {
				setTimeout(() => {
					if (!running) start();
				}, 500);
			}
		} else {
			notify(t(lang, 'notify.breakOver'), t(lang, 'notify.breakMessage'));
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

	/* ------------------------------------------------------------------ */
	/* Chime + notifications                                               */
	/* ------------------------------------------------------------------ */
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

	function notify(title: string, message: string) {
		if (!settings.notify || !('Notification' in window) || Notification.permission !== 'granted') return;
		try {
			new Notification(title, { body: message });
		} catch {}
	}

	/* ------------------------------------------------------------------ */
	/* Music                                                               */
	/* ------------------------------------------------------------------ */
	const musicPrefs = loadJSON(MUSIC_KEY, { track: 0, volume: 0.6, muted: false });
	volume = musicPrefs.volume;
	muted = musicPrefs.muted;
	volumeInput.value = String(Math.round(volume * 100));

	let customTrack: { name: string; url: string } | null = null;
	let customAudioEl: HTMLAudioElement | null = null;

	function updateTrackLabel(): string {
		const label = spotifyPlaying
			? t(lang, 'dock.spotifyTrack')
			: track >= BUILTIN_TRACK_KEYS.length
				? customTrack?.name ?? t(lang, 'dock.custom')
				: t(lang, BUILTIN_TRACK_KEYS[track] as 'dock.track0' | 'dock.track1');
		trackLabel.textContent = label;
		customRemoveBtn.classList.toggle('hidden', !customTrack);
		return label;
	}

	function removeCustomTrack() {
		if (!customTrack) return;
		const wasPlaying = customAudioEl ? !customAudioEl.paused : false;
		if (customAudioEl) {
			audioEls.splice(audioEls.indexOf(customAudioEl), 1);
			customAudioEl.pause();
			customAudioEl.src = '';
			customAudioEl = null;
		}
		URL.revokeObjectURL(customTrack.url);
		customTrack = null;
		track = Math.min(track, audioEls.length - 1);
		deleteCustomTrack().catch(() => {});
		updateTrackLabel();
		if (wasPlaying) playTrack(track);
	}

	function setCustomTrack(file: File) {
		const name = file.name.replace(/\.[^.]+$/, '') || 'my music';
		if (customTrack) {
			URL.revokeObjectURL(customTrack.url);
			if (customAudioEl) {
				audioEls.splice(audioEls.indexOf(customAudioEl), 1);
				customAudioEl.pause();
				customAudioEl.src = '';
			}
		}
		const url = URL.createObjectURL(file);
		const el = document.createElement('audio');
		el.src = url;
		el.loop = true;
		el.preload = 'none';
		el.muted = muted;
		el.volume = muted ? 0 : volume;
		el.dataset.audio = 'custom';
		customAudioEl = el;
		customTrack = { name, url };
		audioEls.push(el);
		saveCustomTrack({ name, blob: file }).catch(() => {});
		track = audioEls.length - 1;
		updateTrackLabel();
		playTrack(track);
	}

	/* Restore a previously uploaded track from IndexedDB. */
	loadCustomTrack()
		.then((record) => {
			if (!record) return;
			const url = URL.createObjectURL(record.blob);
			const el = document.createElement('audio');
			el.src = url;
			el.loop = true;
			el.preload = 'none';
			el.muted = muted;
			el.volume = muted ? 0 : volume;
			el.dataset.audio = 'custom';
			customAudioEl = el;
			customTrack = { name: record.name, url };
			audioEls.push(el);
		})
		.catch(() => {})
		.finally(() => {
			track = Math.min(musicPrefs.track, audioEls.length - 1);
			updateTrackLabel();
			applyVolume();
		});

	const fades = new Map<HTMLAudioElement, number>();

	function fadeAudio(a: HTMLAudioElement, from: number, to: number, ms: number, done?: () => void) {
		const current = fades.get(a);
		if (current) cancelAnimationFrame(current);
		const t0 = performance.now();
		const step = (t: number) => {
			const p = Math.min(1, (t - t0) / ms);
			a.volume = Math.max(0, Math.min(1, from + (to - from) * p));
			if (p < 1) fades.set(a, requestAnimationFrame(step));
			else {
				fades.delete(a);
				done?.();
			}
		};
		fades.set(a, requestAnimationFrame(step));
	}

	function updateMusicControls() {
		const anyPlaying = playing || spotifyPlaying;
		musicPlayIcon.innerHTML = anyPlaying ? pauseSvg(18) : playSvg(18);
		musicPlayBtn.setAttribute('aria-pressed', String(anyPlaying));
		musicPlayBtn.setAttribute('aria-label', anyPlaying ? t(lang, 'dock.pauseMusic') : t(lang, 'dock.playMusic'));
		dock.setAttribute('data-playing', String(anyPlaying));

		updateTrackLabel();

		/* Spotify's embed exposes no volume/mute API, so the dock's lo-fi
		   volume controls can't affect it. Disable them (with a hint) while
		   Spotify is the active source instead of silently doing nothing. */
		const spotifyDisables = spotifyPlaying;
		volumeInput.disabled = spotifyDisables;
		(muteBtn as HTMLButtonElement).disabled = spotifyDisables;
		volumeInput.title = spotifyDisables ? t(lang, 'dock.spotifyVolumeHint') : '';
		(muteBtn as HTMLButtonElement).title = spotifyDisables ? t(lang, 'dock.spotifyVolumeHint') : '';
		volumeInput.setAttribute('aria-label', spotifyDisables ? t(lang, 'dock.spotifyVolumeHint') : t(lang, 'dock.volumeAria'));
		muteBtn.setAttribute('aria-label', spotifyDisables ? t(lang, 'dock.spotifyVolumeHint') : t(lang, 'dock.muteAria'));
	}

	function setPlaying(p: boolean) {
		playing = p;
		updateMusicControls();
	}

	function setSpotifyPlaying(p: boolean) {
		spotifyPlaying = p;
		updateMusicControls();
	}

	function applyVolume() {
		audioEls.forEach((a) => {
			const fade = fades.get(a);
			if (fade) cancelAnimationFrame(fade);
			a.muted = muted;
			a.volume = muted ? 0 : volume;
		});
		volumeIcon.innerHTML = muted || volume === 0 ? volumeX : volume2;
	}

	function playTrack(index: number, restart = true) {
		pauseSpotify();
		setSpotifyPlaying(false);
		const next = audioEls[index];
		const prev = audioEls.find((a, i) => i !== index && !a.paused);
		setPlaying(true);
		next.volume = 0;
		if (restart) next.currentTime = 0;
		next.muted = muted;
		next.play().catch(() => {
			setPlaying(false);
		});
		fadeAudio(next, 0, muted ? 0 : volume, 900);
		if (prev) {
			fadeAudio(prev, prev.volume, 0, 600, () => prev.pause());
		}
	}

	function stopMusic() {
		setPlaying(false);
		audioEls.forEach((a) => {
			if (!a.paused) fadeAudio(a, a.volume, 0, 400, () => a.pause());
		});
	}

	function toggleMusic() {
		if (playing || spotifyPlaying) {
			stopMusic();
			pauseSpotify();
			setSpotifyPlaying(false);
		} else {
			playTrack(track, false);
		}
	}

	musicPlayBtn.addEventListener('click', toggleMusic);

	trackBtn.addEventListener('click', () => {
		if (audioEls.length < 2) return;
		track = (track + 1) % audioEls.length;
		updateTrackLabel();
		saveJSON(MUSIC_KEY, { track, volume, muted });
		if (playing || spotifyPlaying) playTrack(track);
	});

	volumeInput.addEventListener('input', () => {
		volume = Number(volumeInput.value) / 100;
		muted = volume === 0;
		applyVolume();
		saveJSON(MUSIC_KEY, { track, volume, muted });
	});

	muteBtn.addEventListener('click', () => {
		muted = !muted;
		volumeInput.value = String(Math.round((muted ? 0 : volume) * 100));
		applyVolume();
		saveJSON(MUSIC_KEY, { track, volume, muted });
	});

	uploadBtn.addEventListener('click', () => fileInput.click());

	fileInput.addEventListener('change', () => {
		const file = fileInput.files?.[0];
		fileInput.value = '';
		if (!file) return;
		if (!file.type.startsWith('audio/')) return;
		setCustomTrack(file);
	});

	customRemoveBtn.addEventListener('click', () => {
		removeCustomTrack();
		saveJSON(MUSIC_KEY, { track, volume, muted });
	});

	/* Spotify embed mutual exclusion — never run both players at once. */
	function pauseSpotify() {
		if (!spotifyLoaded || !spotifyFrame?.contentWindow) return;
		try {
			spotifyFrame.contentWindow.postMessage({ command: 'pause' }, 'https://open.spotify.com');
		} catch {}
	}

	window.addEventListener('message', (e) => {
		if (e.origin !== 'https://open.spotify.com') return;
		const msg = e.data as {
			type?: string;
			payload?: {
				isPaused?: boolean;
				is_playing?: boolean;
				isBuffering?: boolean;
				playingURI?: string;
				isLoggedIn?: boolean;
			};
		};
		if (!msg || typeof msg !== 'object') return;
		if (msg.type === 'log_in') {
			spotifyLoginLink?.classList.add('hidden');
			return;
		}
		if (msg.type === 'log_out') {
			spotifyLoginLink?.classList.remove('hidden');
			return;
		}
		if (msg.type !== 'playback_update') return;
		spotifyLoaded = true;
		const payload = msg.payload;
		if (typeof payload?.isLoggedIn === 'boolean') {
			spotifyLoginLink?.classList.toggle('hidden', payload.isLoggedIn);
		}
		const paused =
			typeof payload?.isPaused === 'boolean'
				? payload.isPaused
				: typeof payload?.is_playing === 'boolean'
					? !payload.is_playing
					: null;
		if (paused === null) return;
		setSpotifyPlaying(!paused);
		if (!paused) stopMusic();
	});

	/* Play a user's own Spotify link instead of the preset playlist. */
	const SPOTIFY_DEFAULT_EMBED =
		'https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0&si=2b71826d4bb04043';

	function spotifyEmbedSrc(url: string): string | null {
		const type = url.match(/spotify\.com\/(track|album|playlist|show|episode)\//)?.[1] ?? url.match(/spotify:(track|album|playlist|show|episode):/)?.[1];
		const id =
			url.match(/spotify\.com\/(?:track|album|playlist|show|episode)\/([A-Za-z0-9]+)/)?.[1] ??
			url.match(/spotify:(?:track|album|playlist|show|episode):([A-Za-z0-9]+)/)?.[1];
		if (!type || !id) return null;
		return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
	}

	function applySpotifyUrl(url: string) {
		const src = spotifyEmbedSrc(url.trim());
		if (!src) {
			spotifyError.classList.remove('hidden');
			return;
		}
		spotifyError.classList.add('hidden');
		spotifyFrame.src = src;
		spotifyResetBtn.classList.remove('hidden');
		try {
			localStorage.setItem(SPOTIFY_URL_KEY, url.trim());
		} catch {}
	}

	spotifyForm.addEventListener('submit', (e) => {
		e.preventDefault();
		applySpotifyUrl(spotifyUrlInput.value);
	});

	spotifyResetBtn.addEventListener('click', () => {
		spotifyFrame.src = SPOTIFY_DEFAULT_EMBED;
		spotifyUrlInput.value = '';
		spotifyResetBtn.classList.add('hidden');
		spotifyError.classList.add('hidden');
		try {
			localStorage.removeItem(SPOTIFY_URL_KEY);
		} catch {}
	});

	const savedSpotifyUrl = (() => {
		try {
			return localStorage.getItem(SPOTIFY_URL_KEY) ?? '';
		} catch {
			return '';
		}
	})();
	if (savedSpotifyUrl && spotifyEmbedSrc(savedSpotifyUrl)) {
		spotifyFrame.src = spotifyEmbedSrc(savedSpotifyUrl)!;
		spotifyUrlInput.value = savedSpotifyUrl;
		spotifyResetBtn.classList.remove('hidden');
	}

	const volume2 =
		'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
	const volumeX =
		'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>';

	/* ------------------------------------------------------------------ */
	/* Keyboard                                                            */
	/* ------------------------------------------------------------------ */
	document.addEventListener('keydown', (e) => {
		const target = e.target as HTMLElement;
		const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
		if (e.key === ' ' && !typing) {
			e.preventDefault();
			if (running) pause();
			else start();
		} else if ((e.key === 'r' || e.key === 'R') && !typing) {
			reset();
		} else if ((e.key === 'm' || e.key === 'M') && !typing) {
			musicPlayBtn.click();
		} else if ((e.key === 'd' || e.key === 'D') && !typing) {
			themeToggle.click();
		} else if ((e.key === 'f' || e.key === 'F') && !typing) {
			fullscreenBtn.click();
		} else if (e.key === 'Escape') {
			closePanels();
		}
	});

	/* ------------------------------------------------------------------ */
	/* Init                                                                */
	/* ------------------------------------------------------------------ */
	applyTranslations(lang);
	updateLangOptions();
	applySettingsUI();
	renderTodos();
	updateThemeMeta();
	updateFullscreenUI();
	setPhase('focus');
	applyVolume();
});
