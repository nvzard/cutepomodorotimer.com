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
	'page.linksTitle': 'Entdecke den Cute Timer',
	'page.linksAria': 'Seitenlinks',
	'page.skipContent': 'Zum Inhalt springen',

	'footer.home': 'Startseite',
	'footer.about': 'Über uns',
	'footer.privacy': 'Datenschutzerklärung',
	'footer.terms': 'Nutzungsbedingungen',
	'footer.contact': 'Kontakt',
	'footer.github': 'GitHub',
	'footer.links': 'Seitenlinks',
	'footer.linksAria': 'Fußzeilen-Links',
	'footer.tagline': 'Ein kostenloser süßer Pomodoro-Timer zum Lernen und für tiefe Konzentration — gemacht mit ♡.',
	'footer.rights': 'Alle Rechte vorbehalten.',

	'meta.homeDesc':
		'Ein kostenloser süßer Timer online — ein ästhetischer rosa Pomodoro-Timer zum Lernen mit Lo-Fi-Musik, einem niedlichen Maskottchen und 10-, 15- und 30-Minuten-Countdowns. Jetzt starten.',

	'about.eyebrow': 'Über den Cute Timer ♡',
	'about.title': 'Über uns',
	'about.metaTitle': 'Über uns — Cute Timer | Süßer Pomodoro-Timer zum Lernen',
	'about.metaDesc':
		'Erfahre mehr über Cute Timer, den kostenlosen ästhetischen rosa Pomodoro-Timer zum Lernen und konzentrierten Arbeiten. Unsere Geschichte, unsere Mission und die Tomate hinter der Niedlichkeit.',
	'contact.eyebrow': 'Sag Hallo ♡',
	'contact.title': 'Kontakt',
	'contact.metaTitle': 'Kontakt — Cute Timer | Süßer Pomodoro-Timer',
	'contact.metaDesc':
		'Kontaktiere das Cute-Timer-Team. Fragen, Feedback oder einfach Pommy der Tomate Hallo sagen — wir freuen uns auf deine Nachricht.',
	'terms.eyebrow': 'Fair und freundlich ♡',
	'terms.title': 'Nutzungsbedingungen',
	'terms.metaTitle': 'Nutzungsbedingungen — Cute Timer | Süßer Pomodoro-Timer',
	'terms.metaDesc':
		'Die Nutzungsbedingungen für Cute Timer, den kostenlosen süßen Pomodoro-Timer zum Lernen. Einfache, faire Regeln für ein einfaches, kostenloses Tool.',
	'privacy.eyebrow': 'Deine Privatsphäre zählt ♡',
	'privacy.title': 'Datenschutzerklärung',
	'privacy.metaTitle': 'Datenschutzerklärung — Cute Timer | Süßer Pomodoro-Timer',
	'privacy.metaDesc':
		'Lies die Datenschutzerklärung von Cute Timer. Wir sammeln keine persönlichen Daten — alles, was du einstellst, bleibt im lokalen Speicher deines Browsers. Einfach, privat und kostenlos.',

	/* Shared */
	'page.lastUpdated': 'Zuletzt aktualisiert:',
	'page.lastUpdatedDate': '9. August 2026',

	/* About body */
	'about.intro':
		'Cute Timer ist ein kostenloser süßer Online-Timer für Studierende, Remote-Arbeitende und alle, die tiefe Konzentration wollen, ohne das Gefühl zu haben, benotet zu werden. Wir glauben, dass Produktivität weder kalt noch bestrafend sein sollte — sie sollte sich wie ein gemütliches kleines Ritual anfühlen, auf das du dich wirklich freust.',
	'about.sec1Title': 'Warum wir ihn gebaut haben',
	'about.sec1Body':
		'Es gibt viele Pomodoro-Timer-Apps, aber die meisten sehen aus wie Tabellenkalkulationen mit einer Stoppuhr. Wir wollten einen süßen Pomodoro-Timer, der die klassische Pomodoro-Technik mit sanften Pastellfarben, ruhiger Lo-Fi-Musik, einem errötenden Tomaten-Maskottchen und kleinen Herz-Punkten kombiniert, die jede abgeschlossene Runde feiern. Ein Timer, den du gerne den ganzen Tag auf deinem Schreibtisch offen lässt.',
	'about.sec2Title': 'Unsere Mission',
	'about.sec2Body':
		'Unsere Mission ist einfach: fokussiertes Arbeiten freundlich machen. Ob du einen 10-Minuten-süßen-Timer für ein schnelles Aufräumen, einen 15-Minuten-süßen-Timer für Karteikarten oder einen 30-Minuten-süßen-Timer für tiefe Arbeit brauchst — wir wollen, dass jede Sitzung mit einem kleinen Erfolgserlebnis endet — und mit einer Pause, die du wirklich machst.',
	'about.sec3Title': 'Die kleine Tomate',
	'about.sec3Body':
		'Unser Maskottchen ist eine winzige errötende Tomate namens Pommy. Pommy nickt mit, während du dich konzentrierst, blinzelt während der Pausen und feiert, wenn deine Runde abgeschlossen ist. Es ist eine sanfte Erinnerung daran, dass der ursprüngliche Pomodoro nur ein tomatenförmiger Küchen-Timer war — und dass Konzentration nicht die ganze Zeit ernst sein muss.',
	'about.sec4Title': 'Unsere Werte',
	'about.sec4Body':
		'Für immer kostenlos. Keine Anmeldung, keine Werbung, keine Konten. Alles, was du einstellst — deine Timer-Dauern, deine To-do-Liste, deine Musikvorliebe — wird nur in deinem eigenen Browser gespeichert, damit du die Kontrolle behältst. Wir bauen im Offenen, halten die Oberfläche einfach und stellen immer deinen Fokus an erste Stelle.',

	/* Privacy body */
	'privacy.introAfterDate':
		'Diese Datenschutzerklärung erklärt, wie Cute Timer („wir") mit Informationen umgeht, wenn du unsere Website nutzt, unter',
	'privacy.sec1Title': 'Die Kurzfassung',
	'privacy.sec1Body':
		'Wir sammeln, speichern oder teilen keinerlei persönliche Informationen über dich. Keine Konten, keine Tracking-Profile, keine Daten, die jemals an Dritte verkauft werden. Cute Timer ist eine Client-seitige App: Alles passiert in deinem Browser.',
	'privacy.sec2Title': 'Nur lokaler Speicher',
	'privacy.sec2Body':
		'Damit sich der Timer persönlich anfühlt, speichern wir ein paar Einstellungen im lokalen Speicher deines Browsers: deine gewählten Timer-Dauern, die Einstellung für automatische Pausen, Ton- und Benachrichtigungseinstellungen, deine To-do-Liste, den Lo-Fi-Titel, der dir gefallen hat, die Lautstärke sowie deine Themen- und Spracheinstellungen. Diese Daten verlassen nie dein Gerät und werden nie an unsere Server gesendet. Du kannst sie jederzeit löschen, indem du die Website-Daten in deinem Browser bereinigst.',
	'privacy.sec3Title': 'Analysen und Cookies',
	'privacy.sec3Body':
		'Cute Timer verwendet keine Tracking-Cookies, Werbe-Cookies oder Analyse-Skripte von Drittanbietern. Wir haben kein Interesse daran, dich durch das Internet zu verfolgen.',
	'privacy.sec4Title': 'Dienste von Drittanbietern',
	'privacy.sec4Body':
		'Unsere Seiten laden die Schriftart Baloo 2 von Google Fonts und streamen, wenn du Musik abspielst, zwei Lo-Fi-Audiodateien von unserem eigenen Hosting. Diese Dienste verarbeiten möglicherweise deine IP-Adresse als Teil des normalen Internetverkehrs. Wir kontrollieren ihre Datenschutzpraktiken nicht und empfehlen dir, ihre Richtlinien zu lesen.',
	'privacy.sec5Title': 'Benachrichtigungen',
	'privacy.sec5Body':
		'Wenn du Browser-Benachrichtigungen aktivierst, übernimmt dein Browser die Erlaubnis und Zustellung lokal. Wir erhalten deine Benachrichtigungsdaten nie.',
	'privacy.sec6Title': 'Datenschutz von Kindern',
	'privacy.sec6Body':
		'Da wir überhaupt keine persönlichen Daten sammeln, ist Cute Timer für alle sicher, auch für Kinder. Wenn du glaubst, dass dein Kind uns über eine Kontaktnachricht persönliche Informationen mitgeteilt hat, melde dich bitte bei uns, und wir löschen sie umgehend.',
	'privacy.sec7Title': 'Änderungen an dieser Richtlinie',
	'privacy.sec7Body':
		'Wir können diese Richtlinie von Zeit zu Zeit aktualisieren. Wenn wir das tun, überarbeiten wir das „zuletzt aktualisiert"-Datum oben. Schau für die neueste Version gerne wieder hier vorbei.',
	'privacy.sec8Title': 'Kontakt',
	'privacy.sec8Prefix': 'Fragen zum Datenschutz? Wir freuen uns auf deine Nachricht an',

	/* Terms body */
	'terms.introAfterDate': 'Durch den Zugriff auf oder die Nutzung von',
	'terms.introSuffix':
		'„Cute Timer", „der Dienst"), stimmst du diesen Bedingungen zu. Wenn du nicht zustimmst, nutze den Dienst bitte nicht.',
	'terms.sec1Title': '1. Nutzung des Dienstes',
	'terms.sec1Body':
		'Cute Timer ist ein kostenloses Werkzeug für deinen persönlichen, nicht-kommerziellen Gebrauch. Du kannst es nutzen, um Timer zu starten, eine To-do-Liste zu verwalten und während der Arbeit unsere Lo-Fi-Titel zu hören. Du stimmst zu, den Dienst nicht zu missbrauchen, nicht zu versuchen, ihn zu stören, oder ihn für unrechtmäßige Zwecke zu nutzen.',
	'terms.sec2Title': '2. Keine Konten, keine Daten',
	'terms.sec2Body':
		'Der Dienst läuft vollständig in deinem Browser. Wir erstellen keine Konten und speichern weder deine To-do-Liste noch deine Einstellungen auf unseren Servern. Deine Daten leben im lokalen Speicher deines Browsers, und du bist dafür verantwortlich, sie nach deinem Ermessen zu sichern (oder einfach loszulassen).',
	'terms.sec3Title': '3. Geistiges Eigentum',
	'terms.sec3Body':
		'Der Name Cute Timer, das Logo, das Maskottchen („Pommy"), die Grafiken und alle Inhalte dieser Website sind unser Eigentum oder das der jeweiligen Eigentümer. Du darfst ohne Erlaubnis keinen Teil des Dienstes oder seines Designs kopieren, verändern, verbreiten oder weiterverkaufen.',
	'terms.sec4Title': '4. Der Dienst wird „wie besehen" bereitgestellt',
	'terms.sec4Body':
		'Cute Timer wird kostenlos und „wie besehen" bereitgestellt, ohne jegliche ausdrückliche oder stillschweigende Gewährleistung. Wir garantieren nicht, dass der Dienst ununterbrochen, fehlerfrei oder jederzeit verfügbar ist. Du nutzt den Dienst auf eigenes Risiko.',
	'terms.sec5Title': '5. Haftungsbeschränkung',
	'terms.sec5Body':
		'Im gesetzlich maximal zulässigen Umfang haften Cute Timer und seine Entwickler nicht für mittelbare, zufällige oder Folgeschäden, die aus deiner Nutzung — oder Unfähigkeit zur Nutzung — des Dienstes entstehen. Dazu gehören verpasste Fristen, verlorene Produktivität oder ein versehentliches Nickerchen, das zu lange gedauert hat.',
	'terms.sec6Title': '6. Änderungen dieser Bedingungen',
	'terms.sec6Body':
		'Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Wenn du den Dienst nach der Veröffentlichung von Änderungen weiter nutzt, bedeutet das, dass du die aktualisierten Bedingungen akzeptierst.',
	'terms.sec7Title': '7. Kontakt',
	'terms.sec7Prefix': 'Eine Frage zu diesen Bedingungen? Melde dich unter',

	/* Contact body */
	'contact.intro':
		'Fragen, Feature-Ideen, oder du willst Pommy der Tomate einfach sagen, dass sie einen tollen Job macht? Wir freuen uns wirklich über jede Nachricht. Fülle das Formular aus und wir melden uns bei dir — ohne Konto, ohne Tracking, ohne Umstände.',
	'contact.nameLabel': 'Dein Name',
	'contact.namePlaceholder': 'Pommy die Tomate',
	'contact.emailLabel': 'Deine E-Mail',
	'contact.emailPlaceholder': 'du@beispiel.de',
	'contact.messageLabel': 'Deine Nachricht',
	'contact.messagePlaceholder': 'Erzähl uns, was dich beschäftigt…',
	'contact.submit': 'Nachricht senden ♡',
	'contact.sending': 'Senden…',
	'contact.success': 'Gesendet! Danke für deine Nachricht ♡',
	'contact.error': 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
	'contact.directTitle': 'Lieber direkt per E-Mail?',
	'contact.directPrefix': 'Du kannst uns jederzeit schreiben an',
	'contact.directSuffix': 'Wir lesen jede Nachricht und antworten, sobald Pommy uns eine Pause erlaubt.',
	'contact.subjectFrom': 'Nachricht von',
	'contact.subjectFallback': 'einem freundlichen Besucher',
	'contact.bodyName': 'Name',
	'contact.bodyEmail': 'E-Mail',
};

export default de;
