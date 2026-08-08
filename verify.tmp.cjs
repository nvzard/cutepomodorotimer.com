const { chromium } = require('playwright-core');

const EXEC = '/Users/nitanshu/Library/Caches/ms-playwright/chromium-1155/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const URL = 'http://localhost:4321/';

const results = [];
const check = (name, ok, extra = '') => {
	results.push(`${ok ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);
	console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);
};

(async () => {
	const browser = await chromium.launch({ executablePath: EXEC, args: ['--autoplay-policy=no-user-gesture-required', '--no-sandbox'] });
	const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	const errors = [];
	page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
	page.on('console', (m) => m.type() === 'error' && errors.push('console.error: ' + m.text()));

	try {
		await page.goto(URL, { waitUntil: 'networkidle' });

		check('title', (await page.title()).includes('Cute Pomodoro'));
		check('timer digits', (await page.textContent('[data-time]')).includes('25:00'));
		check('phase label', (await page.textContent('[data-phase-label]')).trim() === 'Focus');
		check('audio count', (await page.locator('[data-audio]').count()) === 2);

		await page.click('[data-start-btn]');
		await page.waitForTimeout(1400);
		check('timer running attr', (await page.getAttribute('[data-start-btn]', 'data-running')) === 'true');
		check('timer counts', (await page.textContent('[data-time]')) !== '25:00');
		check('label Pause', (await page.textContent('[data-start-label]')).trim() === 'Pause');
		check('doc title', (await page.title()).includes('Focus'));

		await page.click('[data-start-btn]');
		await page.click('[data-reset-btn]');
		check('reset to 25:00', (await page.textContent('[data-time]')).includes('25:00'));
		check('label Start', (await page.textContent('[data-start-label]')).trim() === 'Start');

		const wasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
		await page.click('[data-theme-toggle]');
		const nowDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
		check('theme toggles', wasDark !== nowDark);
		check('theme persisted', (await page.evaluate(() => localStorage.getItem('pomo:theme'))) === (nowDark ? 'dark' : 'light'));

		await page.click('[data-settings-btn]');
		check('settings opens', await page.isVisible('[data-settings-panel]'));
		await page.click('[data-step-plus="focus"]');
		check('focus 26', (await page.inputValue('[data-dur="focus"]')) === '26');
		await page.click('[data-toggle="notify"]');
		check('notify checked', (await page.getAttribute('[data-toggle="notify"]', 'aria-checked')) === 'true');
		await page.click('[data-settings-close]');
		check('settings closes', !(await page.isVisible('[data-settings-panel]')));

		await page.click('[data-todo-btn]');
		check('todo opens', await page.isVisible('[data-todo-panel]'));
		await page.fill('[data-todo-input]', 'write the intro');
		await page.press('[data-todo-input]', 'Enter');
		check('todo count 1', (await page.locator('[data-todo-list] li').count()) === 1);
		check('anchor task', (await page.textContent('[data-task-text]')).includes('write the intro'));
		check('badge 1', (await page.textContent('[data-todo-count]')).trim() === '1');
		await page.click('[data-todo-list] [data-act="toggle"]');
		const badgeHidden = await page.evaluate(() => document.querySelector('[data-todo-count]').classList.contains('hidden'));
		check('badge hidden after done', badgeHidden === true);
		const closeVisible = await page.isVisible('[data-todo-close]');
		check('todo-close visible', closeVisible === true);
		await page.click('[data-todo-close]');
		check('todo closes', !(await page.isVisible('[data-todo-panel]')));

		const src0 = await page.evaluate(() => document.querySelector('[data-audio="0"]').getAttribute('src'));
		check('audio src', src0.includes('coffee-shop'));
		await page.click('[data-music-play]');
		await page.waitForTimeout(1200);
		const paused = await page.evaluate(() => document.querySelector('[data-audio="0"]').paused);
		check('music plays', paused === false, 'paused=' + paused);
		check('music pressed', (await page.getAttribute('[data-music-play]', 'aria-pressed')) === 'true');
		await page.click('[data-track-btn]');
		check('track label', (await page.textContent('[data-track-label]')).includes('lofi beats'));
		const t1 = await page.evaluate(() => !document.querySelector('[data-audio="1"]').paused);
		check('new track plays', t1 === true);
		await page.fill('[data-volume]', '35');
		check('volume persisted', (await page.evaluate(() => localStorage.getItem('pomo:music'))).includes('"volume":0.35'));
		await page.click('[data-mute-btn]');
		check('mute pressed', (await page.getAttribute('[data-mute-btn]', 'aria-pressed')) === 'true');

		await page.keyboard.press('Space');
		check('space toggles', (await page.getAttribute('[data-start-btn]', 'data-running')) === 'true');
		await page.keyboard.press('Escape');

		await page.screenshot({ path: '/Users/nitanshu/workspace/cutepomodorotimer/screenshot.png' });
		check('no errors', errors.length === 0, errors.join(' | ').slice(0, 400));
	} catch (e) {
		check('SCRIPT ERROR', false, e.message.split('\n')[0]);
	}
	await page.screenshot({ path: '/Users/nitanshu/workspace/cutepomodorotimer/screenshot.png' }).catch(() => {});
	await browser.close();
	process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
})();
