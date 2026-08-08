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

const SETTINGS_KEY = 'pomo:settings';
const TODOS_KEY = 'pomo:todos';
const MUSIC_KEY = 'pomo:music';

const TRACK_NAMES = ['coffee shop', 'lofi beats'];
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

	let phase: Phase = 'focus';
	let running = false;
	let totalSec = settings.focus * 60;
	let remaining = totalSec;
	let endAt = 0;
	let intervalId: number | null = null;
	let completedFocuses = 0;

	let track = 0;
	let playing = false;
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
	const settingsBtn = $('[data-settings-btn]');
	const settingsPanel = $('[data-settings-panel]');
	const settingsClose = $('[data-settings-close]');
	const durInputs = $$<HTMLInputElement>('[data-dur]');
	const stepMinus = $$<HTMLButtonElement>('[data-step-minus]');
	const stepPlus = $$<HTMLButtonElement>('[data-step-plus]');
	const toggles = $$<HTMLButtonElement>('[data-toggle]');

	const dock = $('[data-music]');
	const musicPlayBtn = $('[data-music-play]');
	const musicPlayIcon = $('[data-music-play-icon]');
	const trackBtn = $('[data-track-btn]');
	const trackLabel = $('[data-track-label]');
	const volumeInput = $<HTMLInputElement>('[data-volume]');
	const muteBtn = $('[data-mute-btn]');
	const volumeIcon = $('[data-volume-icon]');
	const audioEls = $$<HTMLAudioElement>('[data-audio]');

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
		if (meta) meta.setAttribute('content', isDark ? '#17171b' : '#f7f2ea');
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
	/* Todos                                                               */
	/* ------------------------------------------------------------------ */
	function incompleteCount(): number {
		return todos.filter((t) => !t.done).length;
	}

	function renderTodos() {
		const items = todos
			.map(
				(t) => `
			<li class="group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_6%,transparent)]" data-id="${t.id}">
				<button type="button" data-act="toggle" class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all ${
					t.done
						? 'border-[var(--tomato)] bg-[var(--tomato)] text-white'
						: 'border-[color-mix(in_srgb,var(--mute)_55%,transparent)] text-transparent hover:border-[var(--tomato)]'
				}" aria-label="${t.done ? 'Mark as not done' : 'Mark as done'}">${checkSvg}</button>
				<span class="min-w-0 flex-1 break-words text-sm ${t.done ? 'text-mute line-through' : 'text-ink'}">${esc(t.text)}</span>
				<button type="button" data-act="del" class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-mute opacity-0 transition-opacity hover:bg-[color-mix(in_srgb,var(--ink)_8%,transparent)] hover:text-ink group-hover:opacity-100" aria-label="Delete task">${xSvg}</button>
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
		taskText.textContent = active ? active.text : 'Add a task to stay anchored';
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
	}

	todoBtn.addEventListener('click', () => {
		const open = todoPanel.classList.contains('hidden');
		openPanel(settingsPanel, false, settingsBtn);
		openPanel(todoPanel, open, todoBtn);
		if (open) setTimeout(() => todoInput.focus(), 50);
	});

	todoClose.addEventListener('click', () => openPanel(todoPanel, false, todoBtn));
	settingsBtn.addEventListener('click', () => {
		const open = settingsPanel.classList.contains('hidden');
		openPanel(todoPanel, false, todoBtn);
		openPanel(settingsPanel, open, settingsBtn);
	});
	settingsClose.addEventListener('click', () => openPanel(settingsPanel, false, settingsBtn));

	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (!todoPanel.contains(target) && !todoBtn.contains(target) && !taskAnchor.contains(target))
			openPanel(todoPanel, false, todoBtn);
		if (!settingsPanel.contains(target) && !settingsBtn.contains(target)) openPanel(settingsPanel, false, settingsBtn);
	});

	taskAnchor.addEventListener('click', () => {
		const open = todoPanel.classList.contains('hidden');
		openPanel(settingsPanel, false, settingsBtn);
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
		const label = phase === 'focus' ? 'Focus' : phase === 'short' ? 'Short Break' : 'Long Break';
		document.title = running ? `${timeEl.textContent} · ${label} — Cute Pomodoro` : 'Cute Pomodoro Timer';
	}

	function updateStartBtn() {
		startBtn.setAttribute('data-running', String(running));
		startLabel.textContent = running ? 'Pause' : remaining === totalSec ? 'Start' : 'Resume';
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

	function setPhase(p: Phase) {
		phase = p;
		running = false;
		stopTicker();
		totalSec = phaseDuration();
		remaining = totalSec;
		body.setAttribute('data-phase', p);
		phaseLabel.textContent = p === 'focus' ? 'Focus' : p === 'short' ? 'Short break' : 'Long break';
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
			notify('Focus complete', next === 'long' ? 'Great work — time for a long break.' : 'Nice work — time for a short break.');
			setPhase(next);
			if (settings.autoBreaks) {
				setTimeout(() => {
					if (!running) start();
				}, 500);
			}
		} else {
			notify('Break over', 'Ready for another focus session?');
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
	let audioCtx: AudioContext | null = null;

	function chime() {
		try {
			audioCtx = audioCtx || new AudioContext();
			const ctx = audioCtx;
			if (ctx.state === 'suspended') ctx.resume();
			const now = ctx.currentTime;
			const notes = phase === 'focus' ? [659.25, 987.77] : [987.77, 659.25];
			notes.forEach((freq, i) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				const t = now + i * 0.2;
				osc.type = 'sine';
				osc.frequency.value = freq;
				gain.gain.setValueAtTime(0.0001, t);
				gain.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
				gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(t);
				osc.stop(t + 0.85);
			});
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
	track = musicPrefs.track;
	volume = musicPrefs.volume;
	muted = musicPrefs.muted;
	trackLabel.textContent = TRACK_NAMES[track];
	volumeInput.value = String(Math.round(volume * 100));

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

	function setPlaying(p: boolean) {
		playing = p;
		musicPlayIcon.innerHTML = p ? pauseSvg(18) : playSvg(18);
		musicPlayBtn.setAttribute('aria-pressed', String(p));
		musicPlayBtn.setAttribute('aria-label', p ? 'Pause lo-fi music' : 'Play lo-fi music');
		dock.setAttribute('data-playing', String(p));
	}

	function applyVolume() {
		audioEls.forEach((a) => {
			a.volume = muted ? 0 : volume;
		});
		volumeIcon.innerHTML = muted || volume === 0 ? volumeX : volume2;
	}

	function playTrack(index: number, restart = true) {
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

	musicPlayBtn.addEventListener('click', () => {
		if (playing) stopMusic();
		else playTrack(track, false);
	});

	trackBtn.addEventListener('click', () => {
		track = (track + 1) % TRACK_NAMES.length;
		trackLabel.textContent = TRACK_NAMES[track];
		saveJSON(MUSIC_KEY, { track, volume, muted });
		if (playing) playTrack(track);
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
		} else if (e.key === 'Escape') {
			closePanels();
		}
	});

	/* ------------------------------------------------------------------ */
	/* Init                                                                */
	/* ------------------------------------------------------------------ */
	applySettingsUI();
	renderTodos();
	updateThemeMeta();
	setPhase('focus');
	applyVolume();
});
