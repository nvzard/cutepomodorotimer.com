import type { TranslationKey } from './en';

const de: Record<TranslationKey, string> = {
	/* Brand / TopBar */
	'brand.title': 'Cute Pomodoro',
	'brand.homeAria': 'Cute Pomodoro Timer Startseite',
	'topbar.langAria': 'Sprache ändern',
	'topbar.themeAria': 'Dunkelmodus umschalten',
	'topbar.settingsAria': 'Einstellungen öffnen',
	'topbar.enterFs': 'Vollbildmodus starten',
	'topbar.exitFs': 'Vollbildmodus beenden',

	/* Language switcher */
	'lang.menuAria': 'Sprache wählen',
	'lang.current': 'Sprache',

	/* Timer */
	'timer.cycleAria': 'Pomodoro-Zyklus-Fortschritt',
	'timer.modeAria': 'Timer-Modus',
	'timer.focus': 'Fokus',
	'timer.short': 'Kurze Pause',
	'timer.long': 'Lange Pause',
	'timer.resetAria': 'Timer zurücksetzen',
	'timer.skipAria': 'Zur nächsten Phase springen',
	'phase.focus': 'Fokuszeit!',
	'phase.short': 'Snackzeit',
	'phase.long': 'Nickerchenzeit ♡',
	'btn.start': 'Start',
	'btn.pause': 'Pause',
	'btn.resume': 'Weiter',
	'todo.tapAdd': 'Tippe, um eine Aufgabe hinzuzufügen ♡',

	/* Settings */
	'settings.dialogAria': 'Timer-Einstellungen',
	'settings.title': 'Einstellungen',
	'settings.closeAria': 'Einstellungen schließen',
	'settings.durations': 'Dauern',
	'settings.focus': 'Fokus',
	'settings.short': 'Kurze Pause',
	'settings.long': 'Lange Pause',
	'settings.minusFocus': 'Fokusminuten verringern',
	'settings.plusFocus': 'Fokusminuten erhöhen',
	'settings.minusShort': 'Minuten der kurzen Pause verringern',
	'settings.plusShort': 'Minuten der kurzen Pause erhöhen',
	'settings.minusLong': 'Minuten der langen Pause verringern',
	'settings.plusLong': 'Minuten der langen Pause erhöhen',
	'settings.autoBreaks': 'Pausen automatisch starten',
	'settings.chime': 'Klingeln, wenn fertig',
	'settings.notify': 'Browser-Benachrichtigungen',

	/* Todo */
	'todo.panelAria': 'Aufgabenliste',
	'todo.title': 'Meine Aufgaben',
	'todo.closeAria': 'Aufgabenliste schließen',
	'todo.inputPlaceholder': 'Worauf fokussierst du dich…',
	'todo.inputAria': 'Neue Aufgabe',
	'todo.add': 'Hinzufügen',
	'todo.empty': 'Noch keine Aufgaben — füge eine kleine Sache zum Fokussieren hinzu ♡',
	'todo.markDone': 'Als erledigt markieren',
	'todo.markNotDone': 'Als nicht erledigt markieren',
	'todo.deleteAria': 'Aufgabe löschen',

	/* Dock */
	'dock.regionAria': 'Aufgaben und Lo-Fi-Musik',
	'dock.todoAria': 'Aufgabenliste öffnen',
	'dock.playMusic': 'Lo-Fi-Musik abspielen',
	'dock.pauseMusic': 'Lo-Fi-Musik pausieren',
	'dock.track0': 'café',
	'dock.track1': 'lofi-beats',
	'dock.switchTrack': 'Lo-Fi-Titel wechseln',
	'dock.volumeAria': 'Musiklautstärke',
	'dock.muteAria': 'Musik stummschalten',

	/* Titles */
	'title.focus': 'Fokus',
	'title.short': 'Kurze Pause',
	'title.long': 'Lange Pause',
	'title.app': 'Cute Timer',
	'title.seo': 'Cute Timer — Cute Pomodoro Timer Online zum Lernen',

	/* Notifications */
	'notify.focusComplete': 'Fokus abgeschlossen',
	'notify.snackMessage': 'Juhu! Zeit für eine Snackpause ♡',
	'notify.napMessage': 'Juhu! Zeit für ein Nickerchen ♡',
	'notify.breakOver': 'Pause vorbei',
	'notify.breakMessage': 'Runde zwei? Du schaffst das! ♡',

	/* Shortcut labels */
	'shortcut.light': 'Hellmodus',
	'shortcut.dark': 'Dunkelmodus',

	/* Page */
	'page.skip': 'Zum Timer springen',
	'page.h1': 'Cute Timer — Kostenloser Cute Pomodoro Timer Online zum Lernen & Fokussieren',
	'page.hintStart': 'start',
	'page.hintReset': 'reset',
	'page.hintMusic': 'musik',
	'page.hintFullscreen': 'vollbild',
	'page.aboutEyebrow': 'Über den Cute Timer',
	'page.sec1Title': 'Was ist der Cute Timer?',
	'page.sec1Body':
		'Willkommen beim Cute Timer — einem kostenlosen süßen Online-Timer, der das Fokussieren freundlich macht. Wenn du nach einem süßen Timer zum Lernen gesucht hast, der genauso niedlich wie nützlich ist, bist du hier genau richtig. Diese Cute-Timer-Website vereint einen kawaii-pinken Pomodoro-Timer mit sanfter Lo-Fi-Musik, einem errötenden Tomaten-Maskottchen und einem verträumten Pastell-Design. Egal, ob du einen Timer brauchst, der niedlich genug ist, um ihn den ganzen Tag offen zu lassen, einen pinken süßen Timer für deine Schreibtisch-Sessions oder einen ästhetischen Pomodoro-Timer, der tiefe Arbeit zu einem kleinen Ritual macht — dieser süße Countdown-Timer kann das alles: direkt in deinem Browser, ganz ohne Anmeldung und ohne Downloads.',
	'page.sec2Title': 'Ein süßer Timer zum Lernen, der dich im Flow hält',
	'page.sec2Body':
		'Schüler und Remote-Arbeitende greifen zu einem süßen Timer zum Lernen, weil er die klassische Pomodoro-Technik in etwas verwandelt, auf das man sich wirklich freut. Ein Standard-Pomodoro-Timer teilt deine Arbeit in fokussierte Sprints auf, die durch kurze Pausen getrennt sind — typischerweise 25 Minuten Fokus, dann eine Fünf-Minuten-Pause. Nach vier Runden verdienst du dir eine längere Nickerchenpause zum Auftanken. Der süße Pomodoro-Timer verfolgt jede abgeschlossene Runde mit kleinen Herz-Punkten, sodass dein Fortschritt auf einen Blick sichtbar ist. Während du arbeitest, begleiten dich die integrierten Lo-Fi-Beats, der zwinkernde Tomaten-Freund und sanfte Klänge, ohne deine Konzentration zu stören. Es ist der ästhetische Pomodoro-Timer, der tiefe Arbeit gemütlich statt anstrengend macht.',
	'page.sec3Title': 'Eine Cute-Timer-Website, voller praktischer Voreinstellungen',
	'page.sec3Body':
		'Nicht jede Aufgabe verdient einen 25-Minuten-Block, deshalb lässt dich diese Cute-Timer-App den perfekten Countdown für jeden Job wählen. Brauchst du einen 10-Minuten-süßen-Timer für eine schnelle Dehnung, ein Aufräumen oder ein Aufwärmen vor einer großen Aufgabe? Erledigt. Lieber einen 15-Minuten-süßen-Timer für konzentriertes Lesen, Karteikarten oder einen Prüfungs-Sprint? Ein Tippen genügt. Die meisten greifen zu einem 30-Minuten-süßen-Timer für Deep-Work-Sessions, und du kannst einen süßen Timer für 30 Minuten mit automatisch startenden Pausen einstellen, um den Rhythmus aufrechtzuerhalten. Jede Option synchronisiert sich mit deiner süßen Timer-Uhr für Lernroutinen, sodass dein ganzer Tag sanft von einer Aufgabe zur nächsten fließt. Es sind süße Timer-Apps wie diese, die Zeitmanagement endlich verspielt wirken lassen.',
	'page.sec4Title': 'Mehr als eine Cute-Timer-App — ein komplettes Fokus-Toolkit',
	'page.sec4Body':
		'Anders als ein simpler Online-Pomodoro-Timer ist dieser kostenlose Pomodoro-Timer ein komplettes Fokus-Toolkit. Füge Aufgaben zur To-do-Liste hinzu und dein aktuelles Ziel erscheint direkt unter dem Countdown, sodass du nie aus den Augen verlierst, was zählt. Wechsle jederzeit zwischen Fokus, kurzer Pause und langer Pause, oder überlasse es den automatischen Pausen. Aktiviere das Klingeln, schalte Browser-Benachrichtigungen ein und lass den pinken süßen Timer während der Arbeit über dich wachen. Die süße Timer-Ästhetik zieht sich durch alles — der Pastellring, die funkelnden Glitzer und die schwebenden Herzen — in Hell- und Dunkelmodus. Weil er im Browser lebt, funktioniert ein süßer Timer zum Lernen auf Laptops, Tablets und Handys gleichermaßen. Er ist eine Cute-Timer-Website, eine Cute-Timer-App und eine Pomodoro-Timer-App in einem.',
	'page.sec5Title': 'Ein kostenloser Online-Pomodoro-Timer, den du wirklich nutzen willst',
	'page.sec5Body':
		'Das Beste daran: Dieser kostenlose Pomodoro-Timer kostet absolut nichts. Keine Anmeldung, keine Werbung und kein App-Store — öffne einfach die Seite und drücke Start. Wenn du auf der Suche nach einem ästhetischen Pomodoro-Timer oder einem süßen Pomodoro-Timer bist, der zu deiner Stimmung passt, lege diese Seite als Lesezeichen ab und mach sie zu deinem täglichen Fokus-Begleiter. Ob du einen 10-Minuten-süßen-Timer, einen 15-Minuten-süßen-Timer oder einen 30-Minuten-süßen-Timer für ein großes Projekt brauchst — es gibt immer einen süßen Timer, der bereit ist, wenn du es bist. Drücke Start, lass den niedlichsten Timer im Netz dir Gesellschaft leisten und bring Dinge zu Ende — ein kleiner, liebevoller Countdown nach dem anderen.',
	'page.faqEyebrow': 'Pomodoro-FAQ',
	'page.faqTitle': 'Pomodoro-Timer-FAQ',
	'page.faq0q': 'Was ist ein Pomodoro-Timer?',
	'page.faq0a':
		'Ein Pomodoro-Timer ist ein Werkzeug, das die Pomodoro-Technik anwendet — eine Zeitmanagement-Methode, bei der du in kurzen, fokussierten Intervallen arbeitest, klassischerweise 25 Minuten, getrennt durch kurze Pausen. Der Name stammt von Francesco Cirillo, der die Technik Ende der 1980er Jahre mit einem tomatenförmigen Küchen-Timer erfand (Pomodoro bedeutet auf Italienisch „Tomate").',
	'page.faq1q': 'Dauert Pomodoro nur 25 Minuten?',
	'page.faq1a':
		'Nein — 25 Minuten ist nur der klassische Standard. Die Technik funktioniert mit jeder Fokusdauer, die zu deiner Aufgabe und deiner Aufmerksamkeitsspanne passt, zum Beispiel 10, 15, 30, 40, 50 oder 60 Minuten, solange jeder Arbeitsblock mit einer angemessenen Pause kombiniert wird. Beim Cute Timer kannst du 10-, 15- oder 30-Minuten-Voreinstellungen wählen oder einen komplett individuellen Countdown einstellen.',
	'page.faq2q': 'Funktioniert Pomodoro bei ADHS?',
	'page.faq2a':
		'Viele Menschen mit ADHS empfinden die Pomodoro-Technik als wirklich hilfreich, weil sie überwältigende Aufgaben in kleine, kurze Häppchen zerlegt, mit einem klaren Ende und einer eingebauten Belohnung (der Pause). Kürzere Intervalle, wie 10–15 Minuten, sind oft leichter zu beginnen und durchzuhalten. Es ist keine Behandlung, aber als Struktur lässt es sich gut mit Medikamenten, Routinen und To-do-Listen kombinieren.',
	'page.faq3q': 'Ist Pomodoro 50/10 oder 25/5 besser?',
	'page.faq3a':
		'Beides ist nicht objektiv besser — es hängt von der Aufgabe und deiner Fokus-Ausdauer ab. 25/5 ist ideal für Anfänger, kurze Aufgaben und schnellen Aufgabenwechsel, während 50/10 sich für tiefe, ausdauernde Arbeit wie Programmieren oder Schreiben eignet, sobald du warmgelaufen bist. Probier beides: Wenn du dich ohne Ermüdung die ganzen 50 Minuten konzentrieren kannst, bleib bei 50/10; sonst starte mit 25/5 und verlängere deine Blöcke nach und nach.',
	'page.faq4q': 'Ist 60/15 Pomodoro gut?',
	'page.faq4a':
		'Ja, 60/15 ist ein solider Rhythmus für Menschen, die lange Fokus-Sessions durchhalten, wie erfahrene Deep-Worker. Es ist erwähnenswert, dass intensive Konzentration typischerweise nach etwa 50 Minuten nachlässt, weshalb 50/10 die häufigere Wahl für lange Formate ist. Wenn dir 60 Minuten Arbeit produktiv vorkommen und du eine echte 15-minütige Pause machst, funktioniert 60/15 perfekt.',
	'page.faq5q': 'Ist 40/10 Pomodoro gut?',
	'page.faq5a':
		'Auf jeden Fall — 40/10 ist ein beliebter Sweet Spot. Es gibt dir einen tieferen Arbeitsblock als die klassischen 25 Minuten und hält die Pausen kurz genug, um den Schwung zu erhalten. Viele Studierende und Entwickler finden, dass 40/10 Produktivität und Ermüdung besser ausbalanciert als 25/5 oder 50/10.',
	'page.faq6q': 'Ist Pomodoro wissenschaftlich belegt?',
	'page.faq6a':
		'Die Technik selbst wurde nicht durch große kontrollierte Studien validiert, also ist sie im strengen wissenschaftlichen Sinne nicht „bewiesen". Sie stützt sich jedoch auf gut etablierte Forschung: häufige Pausen verringern mentale Ermüdung, das Zerlegen großer Aufgaben in kleinere Teile senkt die Hürde, anzufangen, und Vorausplanung reduziert Prokrastination. Deshalb empfehlen so viele Produktivitätsexperten sie.',
	'page.faq7q': 'Wie funktioniert ein Pomodoro-Timer?',
	'page.faq7a':
		'Ein Pomodoro-Timer läuft in einer einfachen Schleife: Wähle eine Aufgabe, starte einen Fokus-Countdown (normalerweise 25 Minuten), arbeite ohne Unterbrechungen, bis es klingelt, und mache dann eine kurze Pause (normalerweise 5 Minuten). Nach vier abgeschlossenen Runden machst du eine längere Pause von 15–30 Minuten. Der tickende Countdown erzeugt Dringlichkeit, und die Pausen geben deinem Gehirn Zeit, sich vor dem nächsten Sprint zu erholen.',
	'page.faq8q': 'Wie benutzt man einen Pomodoro-Timer?',
	'page.faq8a':
		'Wähle eine Aufgabe, stelle den Fokus-Timer ein und arbeite an dieser einen Aufgabe, bis der Timer klingelt. Wenn er klingelt, hör auf — mitten im Gedanken — und mach deine kurze Pause. Verfolge jede abgeschlossene Runde und mache nach vier Runden eine längere Pause. Schließe zuerst ablenkende Tabs und Apps und notiere abwegige Gedanken, damit du dich während deiner Pause darum kümmern kannst.',
	'page.faq9q': 'Wie nutzt man Pomodoro-Timer-Apps effektiv?',
	'page.faq9a':
		'Lass die App das Uhr-Schauen für dich übernehmen: Wähle eine Fokusdauer, schalte automatische Pausen ein und aktiviere Klänge oder Benachrichtigungen. Wähle deine Aufgabe vor dem Start aus einer To-do-Liste, arbeite an einer Sache pro Runde und widerstehe dem Drang, vor der Pause „nur noch schnell fertig" zu werden. Nutze die Pause, um wirklich auszuruhen — steh auf, streck dich oder tritt einen Schritt vom Bildschirm zurück.',
	'page.faq10q': 'Was sind häufige Pomodoro-Fehler?',
	'page.faq10a':
		'Die häufigsten Fehler sind: Pausen auszulassen oder zu kurz zu machen, durch den Timer zu arbeiten, um eine Aufgabe zu beenden, zuzulassen, dass Benachrichtigungen eine Runde unterbrechen, während der Pausen am Handy zu scrollen und mehrere Aufgaben in einem Pomodoro zu erledigen. Auch eine Fokusdauer zu wählen, die nicht zur Aufgabe passt, bringt Leute ins Straucheln. Diese Gewohnheiten zu beheben, ist es, was die Technik wirklich zum Funktionieren bringt.',

	'page.linkAboutDesc': 'Unsere Geschichte, die Mission und die Tomate hinter all der Niedlichkeit.',
	'page.linkContactDesc': 'Fragen oder Feedback? Sag dem Cute-Timer-Team Hallo.',
	'page.linkPrivacyDesc': 'So bleiben deine Daten sicher — Spoiler: sie bleiben in deinem Browser.',
	'page.linkTermsDesc': 'Die fairen und freundlichen Regeln für den kostenlosen Timer.',

	'footer.home': 'Startseite',
	'footer.about': 'Über uns',
	'footer.privacy': 'Datenschutzerklärung',
	'footer.terms': 'Nutzungsbedingungen',
	'footer.contact': 'Kontakt',
	'footer.links': 'Seitenlinks',
	'footer.linksAria': 'Fußzeilen-Links',
	'footer.tagline': 'Ein kostenloser süßer Pomodoro-Timer zum Lernen und für tiefe Konzentration — gemacht mit ♡.',
	'footer.rights': 'Alle Rechte vorbehalten.',
};

export default de;
