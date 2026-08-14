import type { TranslationKey } from './en';

const fr: Record<TranslationKey, string> = {
	/* Brand / TopBar */
	'brand.title': 'Cute Pomodoro',
	'brand.homeAria': 'Accueil de Cute Pomodoro Timer',
	'topbar.langAria': 'Changer de langue',
	'topbar.themeAria': 'Activer le mode sombre',
	'topbar.settingsAria': 'Ouvrir les paramètres',
	'topbar.enterFs': 'Passer en plein écran',
	'topbar.exitFs': 'Quitter le plein écran',

	/* Language switcher */
	'lang.menuAria': 'Choisir la langue',
	'lang.current': 'Langue',

	/* Timer */
	'timer.cycleAria': 'Progression du cycle Pomodoro',
	'timer.modeAria': 'Mode du minuteur',
	'timer.focus': 'Concentration',
	'timer.short': 'Pause courte',
	'timer.long': 'Pause longue',
	'timer.resetAria': 'Réinitialiser le minuteur',
	'timer.skipAria': 'Passer à la phase suivante',
	'phase.focus': 'C’est l’heure de se concentrer !',
	'phase.short': 'L’heure du goûter',
	'phase.long': 'L’heure de la sieste ♡',
	'btn.start': 'Démarrer',
	'btn.pause': 'Pause',
	'btn.resume': 'Reprendre',
	'todo.tapAdd': 'Touche pour ajouter une tâche ♡',

	/* Settings */
	'settings.dialogAria': 'Paramètres du minuteur',
	'settings.title': 'Paramètres',
	'settings.closeAria': 'Fermer les paramètres',
	'settings.durations': 'Durées',
	'settings.focus': 'Concentration',
	'settings.short': 'Pause courte',
	'settings.long': 'Pause longue',
	'settings.minusFocus': 'Diminuer les minutes de concentration',
	'settings.plusFocus': 'Augmenter les minutes de concentration',
	'settings.minusShort': 'Diminuer les minutes de pause courte',
	'settings.plusShort': 'Augmenter les minutes de pause courte',
	'settings.minusLong': 'Diminuer les minutes de pause longue',
	'settings.plusLong': 'Augmenter les minutes de pause longue',
	'settings.autoBreaks': 'Démarrer les pauses automatiquement',
	'settings.chime': 'Carillon à la fin',
	'settings.notify': 'Notifications du navigateur',

	/* Todo */
	'todo.panelAria': 'Liste de tâches',
	'todo.title': 'Mes tâches',
	'todo.closeAria': 'Fermer la liste de tâches',
	'todo.inputPlaceholder': 'Sur quoi veux-tu te concentrer…',
	'todo.inputAria': 'Nouvelle tâche',
	'todo.add': 'Ajouter',
	'todo.empty': 'Pas encore de tâches — ajoute une petite chose sur laquelle te concentrer ♡',
	'todo.markDone': 'Marquer comme terminée',
	'todo.markNotDone': 'Marquer comme non terminée',
	'todo.deleteAria': 'Supprimer la tâche',

	/* Dock */
	'dock.regionAria': 'Tâches et musique lo-fi',
	'dock.todoAria': 'Ouvrir la liste de tâches',
	'dock.playMusic': 'Jouer la musique lo-fi',
	'dock.pauseMusic': 'Mettre en pause la musique lo-fi',
	'dock.track0': 'café',
	'dock.track1': 'beats lofi',
	'dock.switchTrack': 'changer de piste lo-fi',
	'dock.volumeAria': 'Volume de la musique',
	'dock.muteAria': 'Couper la musique',
	'dock.spotifyAria': 'Ouvrir la playlist Spotify',
	'dock.uploadAria': 'Envoyer votre propre musique',
	'dock.removeCustomAria': 'Supprimer le morceau envoyé',
	'dock.custom': 'ma musique',

	/* Spotify */
	'spotify.panelAria': 'Playlist de concentration Spotify',
	'spotify.title': 'Playlist de concentration',
	'spotify.closeAria': 'Fermer le lecteur de musique',
	'spotify.apply': 'Lire',
	'spotify.urlAria': 'Lien Spotify',
	'spotify.urlPlaceholder': 'Collez un lien Spotify…',
	'spotify.urlError': "Cela ne ressemble pas à un lien Spotify — essayez un lien de morceau, d'album ou de playlist.",
	'spotify.ownHint': "Collez n'importe quel lien Spotify (morceau, album ou playlist) pour le lire à la place de la playlist prédéfinie.",
	'spotify.reset': 'Réinitialiser',
	'spotify.signIn':
		'Les chansons complètes nécessitent une connexion Spotify gratuite — sinon Spotify diffuse de courts extraits. Ou importez vos propres chansons dans la barre.',

	/* Titles */
	'title.focus': 'Concentration',
	'title.short': 'Pause courte',
	'title.long': 'Pause longue',
	'title.app': 'Cute Timer',
	'title.seo': 'Cute Timer — Minuteur Pomodoro en ligne pour étudier',

	/* Notifications */
	'notify.focusComplete': 'Concentration terminée',
	'notify.snackMessage': 'Youpi ! L’heure de la pause goûter ♡',
	'notify.napMessage': 'Youpi ! L’heure de la pause sieste ♡',
	'notify.breakOver': 'Pause terminée',
	'notify.breakMessage': 'Deuxième round ? Tu assures ! ♡',

	/* Shortcut labels */
	'shortcut.light': 'mode clair',
	'shortcut.dark': 'mode sombre',

	/* Page */
	'page.skip': 'Aller au minuteur',
	'page.h1': 'Cute Timer — Minuteur Pomodoro gratuit en ligne pour étudier et se concentrer',
	'page.hintStart': 'démarrer',
	'page.hintReset': 'réinitialiser',
	'page.hintMusic': 'musique',
	'page.hintFullscreen': 'plein écran',
	'page.embedCta': 'Intégrez ce joli minuteur dans Notion ♡',
	'page.aboutEyebrow': 'À propos du Cute Timer',
	'page.sec1Title': 'Qu’est-ce que le Cute Timer ?',
	'page.sec1Body':
		'Bienvenue sur le Cute Timer — un joli minuteur gratuit en ligne qui rend la concentration conviviale. Si tu cherchais un joli minuteur pour étudier, aussi adorable qu’utile, tu l’as trouvé. Ce site de minuteur mignon associe un minuteur pomodoro rose kawaii à une douce musique lo-fi, une mascotte tomate qui rougit et un design pastel de rêve. Que tu veuilles un minuteur assez mignon pour le garder ouvert toute la journée, un joli minuteur rose pour tes sessions de bureau, ou un minuteur pomodoro esthétique qui transforme le travail en profondeur en petit rituel, ce compte à rebours adorable fait tout — directement dans ton navigateur, sans inscription et sans téléchargement.',
	'page.sec2Title': 'Un joli minuteur pour étudier qui te garde dans le flow',
	'page.sec2Body':
		'Les étudiants et les télétravailleurs adoptent un joli minuteur pour étudier parce qu’il transforme la technique Pomodoro classique en quelque chose que tu attends avec impatience. Un minuteur pomodoro standard découpe ton travail en sprints de concentration séparés par de courtes pauses — généralement 25 minutes de concentration, puis cinq minutes de pause. Après quatre rounds, tu gagnes une pause sieste plus longue pour recharger les batteries. Le joli minuteur pomodoro suit chaque round terminé avec de petits points-cœurs, pour que ta progression soit visible d’un coup d’œil. Pendant que tu travailles, les beats lo-fi intégrés, le petit copain tomate qui cligne des yeux et les carillons doux te tiennent compagnie sans briser ta concentration. C’est le minuteur pomodoro esthétique qui rend le travail en profondeur douillet plutôt qu’éreintant.',
	'page.sec3Title': 'Un seul site de minuteur mignon, plein de préréglages pratiques',
	'page.sec3Body':
		'Toutes les tâches ne méritent pas un bloc de 25 minutes, alors cette app de minuteur mignon te laisse choisir le compte à rebours parfait pour chaque besoin. Besoin d’un joli minuteur de 10 minutes pour un petit étirement, un rangement ou un échauffement avant une grosse tâche ? C’est fait. Tu préfères un joli minuteur de 15 minutes pour une lecture ciblée, des flashcards ou un sprint d’examen ? Une seule touche. La plupart des gens choisissent un joli minuteur de 30 minutes pour les sessions de travail en profondeur, et tu peux régler un joli minuteur de 30 minutes avec des pauses qui démarrent automatiquement pour garder le rythme. Chaque option se synchronise avec ton minuteur mignon pour tes routines d’étude, pour que ta journée s’écoule en douceur d’une tâche à l’autre. C’est ce genre d’apps de minuteur mignon qui rend enfin la gestion du temps ludique.',
	'page.sec4Title': 'Plus qu’une app de minuteur mignon — une boîte à outils de concentration complète',
	'page.sec4Body':
		'Contrairement à un simple minuteur pomodoro en ligne, ce minuteur pomodoro gratuit est une boîte à outils de concentration complète. Ajoute des tâches à la liste de tâches et ton objectif actuel apparaît juste sous le compte à rebours, pour ne jamais perdre de vue l’essentiel. Bascule entre concentration, pause courte et pause longue quand tu veux, ou laisse les pauses automatiques prendre le relais. Active le carillon, autorise les notifications du navigateur, et laisse le joli minuteur rose veiller sur toi pendant que tu travailles. L’esthétique mignonne du minuteur traverse tout — l’anneau pastel, les étincelles scintillantes et les cœurs flottants — en mode clair comme en mode sombre. Comme il vit dans le navigateur, un joli minuteur d’étude fonctionne aussi bien sur ordinateur portable, tablette que téléphone. C’est un site de minuteur mignon, une app de minuteur mignon et une app de minuteur pomodoro, le tout en un.',
	'page.sec5Title': 'Un minuteur pomodoro gratuit en ligne que tu auras vraiment envie d’utiliser',
	'page.sec5Body':
		'Et le meilleur pour la fin : ce minuteur pomodoro gratuit ne coûte absolument rien. Pas d’inscription, pas de publicité, pas d’app store — il suffit d’ouvrir la page et d’appuyer sur démarrer. Si tu cherchais un minuteur pomodoro esthétique ou un joli minuteur pomodoro qui correspond à ton style, mets cette page en favori et fais-en ton compagnon de concentration quotidien. Que tu aies besoin d’un joli minuteur de 10 minutes, d’un joli minuteur de 15 minutes ou d’un joli minuteur de 30 minutes pour un gros projet, il y a toujours un joli minuteur prêt quand tu l’es. Appuie sur démarrer, laisse le plus mignon des minuteurs du web te tenir compagnie, et fais avancer les choses — un adorable petit compte à rebours à la fois.',
	'page.faqEyebrow': 'FAQ Pomodoro',
	'page.faqTitle': 'FAQ du minuteur Pomodoro',
	'page.faq0q': 'Qu’est-ce qu’un minuteur Pomodoro ?',
	'page.faq0a':
		'Un minuteur Pomodoro est un outil qui applique la technique Pomodoro, une méthode de gestion du temps où tu travailles par courtes périodes intenses — classiquement 25 minutes — séparées par de courtes pauses. Le nom vient de Francesco Cirillo, qui a inventé la technique à la fin des années 1980 en utilisant un minuteur de cuisine en forme de tomate (pomodoro signifie « tomate » en italien).',
	'page.faq1q': 'Le Pomodoro se limite-t-il à 25 minutes ?',
	'page.faq1a':
		'Non — 25 minutes n’est que la valeur classique par défaut. La technique fonctionne avec n’importe quelle durée de concentration qui convient à ta tâche et à ta capacité d’attention, comme 10, 15, 30, 40, 50 ou 60 minutes, à condition que chaque bloc de travail soit associé à une pause proportionnelle. Sur le Cute Timer, tu peux choisir des préréglages de 10, 15 ou 30 minutes ou régler un compte à rebours entièrement personnalisé.',
	'page.faq2q': 'Le Pomodoro fonctionne-t-il pour le TDAH ?',
	'page.faq2a':
		'Beaucoup de personnes avec un TDAH trouvent la technique Pomodoro réellement utile parce qu’elle découpe les tâches accablantes en petits morceaux courts, avec une fin claire et une récompense intégrée (la pause). Des intervalles plus courts, comme 10 à 15 minutes, sont souvent plus faciles à démarrer et à tenir. Ce n’est pas un traitement, mais en tant que structure, il se combine bien avec les médicaments, les routines et les listes de tâches.',
	'page.faq3q': 'Le Pomodoro 50/10 ou 25/5, lequel est le meilleur ?',
	'page.faq3a':
		'Aucun n’est objectivement meilleur — cela dépend de la tâche et de ton endurance de concentration. Le 25/5 est idéal pour les débutants, les tâches courtes et les changements rapides de tâche, tandis que le 50/10 convient au travail profond et long, comme coder ou écrire, une fois que tu es échauffé. Essaie les deux : si tu peux rester concentré pendant les 50 minutes sans fatigue, garde le 50/10 ; sinon, commence par du 25/5 et allonge tes blocs progressivement.',
	'page.faq4q': 'Le pomodoro 60/15 est-il bon ?',
	'page.faq4a':
		'Oui, le 60/15 est un bon rythme pour les personnes qui peuvent tenir de longues sessions de concentration, comme les travailleurs en profondeur expérimentés. Il faut noter que la concentration intense commence généralement à décliner après environ 50 minutes, c’est pourquoi le 50/10 est le choix de format long le plus courant. Si 60 minutes de travail te semblent productives et que tu prends une vraie pause de 15 minutes, le 60/15 fonctionne parfaitement.',
	'page.faq5q': 'Le Pomodoro 40/10 est-il bon ?',
	'page.faq5a':
		'Absolument — le 40/10 est un compromis très apprécié. Il offre un bloc de travail plus profond que les 25 minutes classiques tout en gardant des pauses assez courtes pour préserver l’élan. Beaucoup d’étudiants et de développeurs trouvent que le 40/10 équilibre mieux productivité et fatigue que le 25/5 ou le 50/10.',
	'page.faq6q': 'Le Pomodoro est-il scientifiquement prouvé ?',
	'page.faq6a':
		'La technique elle-même n’a pas été validée par de grands essais contrôlés, elle n’est donc pas « prouvée » au sens scientifique strict. Elle repose toutefois sur des recherches bien établies : les pauses fréquentes réduisent la fatigue mentale, découper les grandes tâches en petites parties abaisse la barrière du démarrage, et planifier à l’avance réduit la procrastination. C’est pourquoi tant d’experts en productivité la recommandent.',
	'page.faq7q': 'Comment fonctionne un minuteur pomodoro ?',
	'page.faq7a':
		'Un minuteur Pomodoro exécute une simple boucle : choisis une tâche, démarre un compte à rebours de concentration (généralement 25 minutes), travaille sans interruption jusqu’à ce qu’il sonne, puis prends une courte pause (généralement 5 minutes). Après quatre rounds terminés, tu prends une pause plus longue de 15 à 30 minutes. Le tic-tac du compte à rebours crée un sentiment d’urgence, et les pauses donnent à ton cerveau le temps de se ressourcer avant le sprint suivant.',
	'page.faq8q': 'Comment utiliser un minuteur pomodoro ?',
	'page.faq8a':
		'Choisis une tâche, règle le minuteur de concentration et travaille sur cette seule tâche jusqu’à ce que le minuteur sonne. Quand il sonne, arrête-toi — même au milieu d’une réflexion — et prends ta pause courte. Suis chaque round terminé, et après quatre rounds, prends une pause plus longue. Ferme d’abord les onglets et les apps distrayants, et note les pensées parasites pour t’en occuper pendant ta pause.',
	'page.faq9q': 'Comment utiliser efficacement les apps de minuteur pomodoro ?',
	'page.faq9a':
		'Laisse l’app surveiller l’horloge pour toi : choisis une durée de concentration, active les pauses automatiques et active les carillons ou les notifications. Choisis ta tâche dans une liste de tâches avant de commencer, travaille sur une seule chose par round, et résiste à l’envie d’« juste finir » avant la pause. Profite de la pause pour vraiment te reposer — lève-toi, étire-toi ou éloigne-toi de l’écran.',
	'page.faq10q': 'Quelles sont les erreurs Pomodoro courantes ?',
	'page.faq10a':
		'Les erreurs les plus courantes sont de sauter les pauses ou de les rendre trop courtes, de continuer à travailler après la sonnerie pour finir une tâche, de laisser les notifications interrompre un round, de scroller sur son téléphone pendant les pauses, et de s’attaquer à plusieurs tâches dans un seul pomodoro. Choisir une durée de concentration qui ne correspond pas à la tâche piège aussi beaucoup de monde. Corriger ces habitudes, c’est ce qui fait vraiment fonctionner la technique.',

	'page.linkAboutDesc': 'Notre histoire, la mission et la tomate derrière toute cette mignonnerie.',
	'page.linkContactDesc': 'Des questions ou des retours ? Dites bonjour à l’équipe Cute Timer.',
	'page.linkPrivacyDesc': 'Comment nous protégeons vos données — spoiler : elles restent dans votre navigateur.',
	'page.linkTermsDesc': 'Les règles justes et amicales pour utiliser le minuteur gratuit.',
	'page.linksTitle': 'Découvrez le Cute Timer',
	'page.linksAria': 'Liens du site',
	'page.skipContent': 'Aller au contenu',

	'footer.home': 'Accueil',
	'footer.about': 'À propos',
	'footer.embed': 'Intégrer dans Notion, WordPress et sites web',
	'footer.privacy': 'Politique de confidentialité',
	'footer.terms': 'Conditions d’utilisation',
	'footer.contact': 'Contactez-nous',
	'footer.github': 'GitHub',
	'footer.links': 'Liens du site',
	'footer.linksAria': 'Liens du pied de page',
	'footer.tagline': 'Un mignon minuteur Pomodoro gratuit pour étudier et se concentrer — fait avec ♡.',
	'footer.rights': 'Tous droits réservés.',

	'meta.homeDesc':
		'Un minuteur mignon gratuit en ligne — un minuteur pomodoro rose esthétique pour étudier avec de la musique lo-fi, une mascotte adorable et des comptes à rebours de 10, 15 et 30 minutes. Commencez maintenant.',

	'about.eyebrow': 'À propos du Cute Timer ♡',
	'about.title': 'À propos',
	'about.metaTitle': 'À propos — Cute Timer | Minuteur Pomodoro mignon pour étudier',
	'about.metaDesc':
		'Découvrez Cute Timer, le minuteur pomodoro rose esthétique et gratuit pour étudier et se concentrer. Notre histoire, notre mission et la tomate derrière la mignonnerie.',
	'contact.eyebrow': 'Dis bonjour ♡',
	'contact.title': 'Contact',
	'contact.metaTitle': 'Contact — Cute Timer | Minuteur Pomodoro mignon',
	'contact.metaDesc':
		'Contactez l’équipe Cute Timer. Questions, commentaires ou juste pour dire bonjour à Pommy la tomate — nous serions ravis de vous lire.',
	'terms.eyebrow': 'Juste et convivial ♡',
	'terms.title': 'Conditions d’utilisation',
	'terms.metaTitle': 'Conditions d’utilisation — Cute Timer | Minuteur Pomodoro mignon',
	'terms.metaDesc':
		'Les conditions d’utilisation de Cute Timer, le minuteur pomodoro mignon et gratuit pour étudier. Des règles simples et équitables pour un outil simple et gratuit.',
	'privacy.eyebrow': 'Votre vie privée compte ♡',
	'privacy.title': 'Politique de confidentialité',
	'privacy.metaTitle': 'Politique de confidentialité — Cute Timer | Minuteur Pomodoro mignon',
	'privacy.metaDesc':
		'Lisez la politique de confidentialité de Cute Timer. Nous ne collectons aucune donnée personnelle — tout ce que vous configurez reste dans le stockage local de votre navigateur. Simple, privé et gratuit.',

	/* Shared */
	'page.lastUpdated': 'Dernière mise à jour :',
	'page.lastUpdatedDate': '9 août 2026',

	/* About body */
	'about.intro':
		'Cute Timer est un joli minuteur gratuit en ligne conçu pour les étudiants, les télétravailleurs et tous ceux qui veulent une concentration profonde sans avoir l’impression d’être notés. Nous croyons que la productivité ne devrait être ni froide ni punitive — elle devrait ressembler à un petit rituel douillet que l’on attend avec impatience.',
	'about.sec1Title': 'Pourquoi nous l’avons créé',
	'about.sec1Body':
		'Il existe beaucoup d’applications de minuteur pomodoro, mais la plupart ressemblent à des tableurs avec un chronomètre. Nous voulions un joli minuteur pomodoro qui associe la technique Pomodoro classique à de douces couleurs pastel, une musique lo-fi apaisante, une mascotte tomate qui rougit et de petits points-cœurs qui célèbrent chaque round terminé. Un minuteur que vous serez heureux de garder ouvert toute la journée sur votre bureau.',
	'about.sec2Title': 'Notre mission',
	'about.sec2Body':
		'Notre mission est simple : rendre le travail concentré convivial. Que vous ayez besoin d’un joli minuteur de 10 minutes pour un petit rangement rapide, d’un joli minuteur de 15 minutes pour vos cartes mémoire, ou d’un joli minuteur de 30 minutes pour un travail en profondeur, nous voulons que chaque session se termine avec une petite sensation d’accomplissement — et une pause que vous prenez vraiment.',
	'about.sec3Title': 'La petite tomate',
	'about.sec3Body':
		'Notre mascotte est une minuscule tomate qui rougit, nommée Pommy. Pommy acquiesce pendant que vous vous concentrez, cligne des yeux pendant les pauses et célèbre quand votre round est terminé. C’est un doux rappel que le pomodoro d’origine n’était qu’un minuteur de cuisine en forme de tomate — et que la concentration n’a pas à être sérieuse tout le temps.',
	'about.sec4Title': 'Nos valeurs',
	'about.sec4Body':
		'Gratuit pour toujours. Pas d’inscription, pas de publicités, pas de comptes. Tout ce que vous réglez — vos durées de minuteur, votre liste de tâches, vos préférences musicales — est stocké uniquement dans votre propre navigateur, pour que vous restiez maître de vos données. Nous construisons au grand jour, gardons l’interface simple et mettons toujours votre concentration en premier.',

	/* Privacy body */
	'privacy.introAfterDate':
		'Cette politique de confidentialité explique comment Cute Timer (« nous ») gère les informations lorsque vous utilisez notre site Web à',
	'privacy.sec1Title': 'La version courte',
	'privacy.sec1Body':
		'Nous ne collectons, ne stockons et ne partageons aucune information personnelle vous concernant. Pas de comptes, pas de profils de suivi, aucune donnée vendue à qui que ce soit — jamais. Cute Timer est une application côté client : tout se passe dans votre navigateur.',
	'privacy.sec2Title': 'Stockage local uniquement',
	'privacy.sec2Body':
		'Pour que le minuteur soit personnel, nous stockons quelques réglages dans le stockage local de votre navigateur : vos durées de minuteur choisies, la préférence de pauses automatiques, les réglages de son et de notifications, votre liste de tâches, la piste lo-fi que vous avez aimée, le volume et vos préférences de thème et de langue. Ces données ne quittent jamais votre appareil et ne sont jamais envoyées à nos serveurs. Vous pouvez les effacer à tout moment en vidant les données du site dans votre navigateur.',
	'privacy.sec3Title': 'Analyse et cookies',
	'privacy.sec3Body':
		'Cute Timer n’utilise ni cookies de suivi, ni cookies publicitaires, ni scripts d’analyse tiers. Nous n’avons aucune envie de vous suivre sur Internet.',
	'privacy.sec4Title': 'Services tiers',
	'privacy.sec4Body':
		'Nos pages chargent la police Baloo 2 depuis Google Fonts et, lorsque vous jouez de la musique, diffusent deux fichiers audio lo-fi hébergés chez nous. Ces services peuvent traiter votre adresse IP dans le cadre du trafic Internet normal. Nous ne contrôlons pas leurs pratiques de confidentialité et vous encourageons à consulter leurs politiques.',
	'privacy.sec5Title': 'Notifications',
	'privacy.sec5Body':
		'Si vous activez les notifications du navigateur, c’est votre navigateur qui gère l’autorisation et la livraison localement. Nous ne recevons jamais vos données de notification.',
	'privacy.sec6Title': 'Confidentialité des enfants',
	'privacy.sec6Body':
		'Comme nous ne collectons aucune donnée personnelle, Cute Timer est sûr pour tout le monde, y compris les enfants. Si vous pensez que votre enfant nous a partagé des informations personnelles via un message de contact, n’hésitez pas à nous écrire et nous les supprimerons rapidement.',
	'privacy.sec7Title': 'Modifications de cette politique',
	'privacy.sec7Body':
		'Nous pouvons mettre à jour cette politique de temps à autre. Le cas échéant, nous réviserons la date de « dernière mise à jour » ci-dessus. Revenez consulter cette page pour la version la plus récente.',
	'privacy.sec8Title': 'Contact',
	'privacy.sec8Prefix': 'Des questions sur la confidentialité ? Nous serions ravis de vous lire à',

	/* Terms body */
	'terms.introAfterDate': 'En accédant à ou en utilisant',
	'terms.introSuffix':
		'« Cute Timer », « le Service »), vous acceptez ces conditions. Si vous n’êtes pas d’accord, merci de ne pas utiliser le Service.',
	'terms.sec1Title': '1. Utilisation du Service',
	'terms.sec1Body':
		'Cute Timer est un outil gratuit fourni pour votre usage personnel et non commercial. Vous pouvez l’utiliser pour lancer des minuteurs, gérer une liste de tâches et écouter nos pistes lo-fi pendant que vous travaillez. Vous acceptez de ne pas abuser du Service, de ne pas tenter de le perturber ni de l’utiliser à des fins illégales.',
	'terms.sec2Title': '2. Pas de comptes, pas de données',
	'terms.sec2Body':
		'Le Service fonctionne entièrement dans votre navigateur. Nous ne créons pas de comptes et nous ne stockons ni votre liste de tâches ni vos réglages sur nos serveurs. Vos données vivent dans le stockage local de votre navigateur et vous êtes responsable de leur sauvegarde (ou simplement de les laisser partir) comme bon vous semble.',
	'terms.sec3Title': '3. Propriété intellectuelle',
	'terms.sec3Body':
		'Le nom Cute Timer, le logo, la mascotte (« Pommy »), les illustrations et tout le contenu de ce site sont notre propriété ou celle de leurs propriétaires respectifs. Vous ne pouvez ni copier, ni modifier, ni distribuer, ni revendre une partie du Service ou de son design sans autorisation.',
	'terms.sec4Title': '4. Le Service est fourni « tel quel »',
	'terms.sec4Body':
		'Cute Timer est fourni gratuitement et « tel quel », sans garanties d’aucune sorte, expresses ou implicites. Nous ne garantissons pas que le Service sera ininterrompu, sans erreur ou disponible à tout moment. Vous utilisez le Service à vos propres risques.',
	'terms.sec5Title': '5. Limitation de responsabilité',
	'terms.sec5Body':
		'Dans toute la mesure permise par la loi, Cute Timer et ses créateurs ne seront pas responsables des dommages indirects, accessoires ou consécutifs découlant de votre utilisation — ou de votre impossibilité d’utiliser — le Service. Cela inclut les délais manqués, la productivité perdue ou une petite sieste qui a duré un peu trop longtemps.',
	'terms.sec6Title': '6. Modifications de ces conditions',
	'terms.sec6Body':
		'Nous pouvons mettre à jour ces conditions de temps à autre. Continuer à utiliser le Service après la publication des modifications signifie que vous acceptez les conditions mises à jour.',
	'terms.sec7Title': '7. Contact',
	'terms.sec7Prefix': 'Une question sur ces conditions ? Écrivez-nous à',

	/* Contact body */
	'contact.intro':
		'Des questions, des idées de fonctionnalités, ou juste envie de dire à Pommy la tomate qu’elle fait un super travail ? Nous serions sincèrement ravis de vous lire. Remplissez le formulaire et nous vous répondrons — pas de compte, pas de suivi, pas de prise de tête.',
	'contact.nameLabel': 'Votre nom',
	'contact.namePlaceholder': 'Pommy la Tomate',
	'contact.emailLabel': 'Votre e-mail',
	'contact.emailPlaceholder': 'vous@exemple.com',
	'contact.messageLabel': 'Votre message',
	'contact.messagePlaceholder': 'Dites-nous ce qui vous trotte dans la tête…',
	'contact.submit': 'Envoyer le message ♡',
	'contact.sending': 'Envoi…',
	'contact.success': 'Envoyé ! Merci pour votre message ♡',
	'contact.error': 'Une erreur est survenue. Veuillez réessayer.',
	'contact.directTitle': 'Vous préférez écrire directement ?',
	'contact.directPrefix': 'Vous pouvez toujours nous écrire à',
	'contact.directSuffix': 'Nous lisons chaque message et répondons dès que Pommy nous autorise une pause.',
	'contact.subjectFrom': 'Message de',
	'contact.subjectFallback': 'un visiteur sympathique',
	'contact.bodyName': 'Nom',
	'contact.bodyEmail': 'E-mail',
};

export default fr;
