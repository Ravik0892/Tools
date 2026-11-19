import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const guidesDir = path.join(projectRoot, 'guides');
const deDir = path.join(guidesDir, 'de');
const frDir = path.join(guidesDir, 'fr');

[deDir, frDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const localizedGuides = [
  {
    id: "compress-pdf",
    module: "pdf-utilities.js",
    subtab: "compress",
    category: "office",
    diagram: {
      src: "../../social_media_assets/pdf_manipulation_matrix_poster_1200x800.svg",
      caption: "Technische Architektur der PDF-Komprimierung im Webbrowser"
    },
    de: {
      lang: "de",
      title: "PDF Online Komprimieren - PDF Dateigröße Kostenlos Verringern | OmniTool Hub",
      h1: "Online PDF-Kompressor & Dateigrößen-Reduzierer",
      description: "Verringern Sie die Größe Ihrer PDF-Dokumente für E-Mail-Anhänge und Web-Uploads mit intelligenter client-seitiger Optimierung direkt im Browser.",
      keywords: "pdf komprimieren, pdf verkleinern, pdf dateigröße reduzieren, pdf kompressor kostenlos, pdf kleiner machen",
      categoryName: "Büro & Dokumente",
      leadParagraph: "Behördenportale, Bewerbungsplattformen und E-Mail-Clients begrenzen Anhänge oft auf 2 MB oder 5 MB. OmniTool Hub optimiert Ihre PDFs lokal im Browser durch verlustfreie Datenreduktion, Schriftkompression und Bild-Resampling – ohne dass Ihre Dokumente auf einen externen Server hochgeladen werden.",
      stepsTitle: "So komprimieren Sie PDF-Dateien Schritt für Schritt",
      steps: [
        "Ziehen Sie Ihre PDF-Datei in das obige interaktive Arbeitsfeld oder wählen Sie sie von Ihrem Gerät aus.",
        "Wählen Sie die gewünschte Komprimierungsstufe (Ausgewogen, Stark oder Maximale Lesbarkeit).",
        "Klicken Sie auf 'PDF komprimieren', um die Optimierung direkt im Arbeitsspeicher Ihres Browsers auszuführen.",
        "Überprüfen Sie die erreichte Ersparnis und laden Sie das optimierte Dokument sofort herunter."
      ],
      faqs: [
        {
          q: "Wird der Text durch die PDF-Komprimierung unscharf?",
          a: "Nein. Digitaler Text und Vektorschriften bleiben bei jeder Zoomstufe gestochen scharf, da sie auf mathematischen Pfaden basieren. Nur eingebettete Rasterbilder werden intelligent angepasst."
        },
        {
          q: "Wie funktioniert die Komprimierung ohne Server-Upload?",
          a: "Die Render-Engine verwendet HTML5 Canvas und WebAssembly direkt im Arbeitsspeicher Ihres Browsers, sodass 100% Ihrer Daten auf Ihrem Gerät bleiben."
        },
        {
          q: "Können passwortgeschützte PDFs komprimiert werden?",
          a: "Ja, sofern Sie das Passwort eingeben, um das Dokument vor der Optimierung im Speicher zu entsperren."
        }
      ],
      backToHub: "← Alle Leitfäden",
      launchTool: "🚀 Vollständige App Öffnen",
      skipToGuide: "📖 Zum Schriftlichen Leitfaden ↓",
      collapseTool: "Werkzeug Einklappen",
      expandTool: "Werkzeug Ausklappen",
      liveToolLabel: "Live-Werkzeug — 100% Privat, Keine Server-Uploads"
    },
    fr: {
      lang: "fr",
      title: "Compresser PDF en Ligne Gratuit - Réduire la Taille d'un PDF | OmniTool Hub",
      h1: "Compresseur de PDF en Ligne & Réducteur de Taille",
      description: "Réduisez la taille de vos fichiers PDF pour les pièces jointes d'e-mails et les démarches administratives grâce à une optimisation intelligente 100% dans votre navigateur.",
      keywords: "compresser pdf, reduire taille pdf, compresseur pdf gratuit, diminuer poids pdf, compresser pdf en ligne",
      categoryName: "Outils de Bureau",
      leadParagraph: "Les plateformes d'emploi, portails administratifs et messageries imposent souvent des limites strictes de 2 Mo ou 5 Mo par fichier. OmniTool Hub compresse vos documents PDF en rééchantillonnant les images et en purgeant les métadonnées inutiles directement dans la mémoire de votre navigateur, avec une confidentialité absolue.",
      stepsTitle: "Comment compresser un document PDF étape par étape",
      steps: [
        "Glissez-déposez votre fichier PDF dans la zone interactive ci-dessus ou sélectionnez-le depuis votre appareil.",
        "Sélectionnez le niveau de compression souhaité (Équilibré, Forte compression ou Qualité maximale).",
        "Cliquez sur 'Compresser le PDF' pour traiter le fichier immédiatement dans la mémoire de votre navigateur.",
        "Vérifiez le pourcentage de réduction obtenu et téléchargez immédiatement votre PDF optimisé."
      ],
      faqs: [
        {
          q: "La compression rend-elle le texte flou ?",
          a: "Non. Les textes et polices vectorielles restent parfaitement nets à tous les niveaux de zoom car ils reposent sur des tracés mathématiques. Seules les images incorporées sont optimisées."
        },
        {
          q: "Comment fonctionne la compression sans envoi sur serveur ?",
          a: "Le moteur utilise HTML5 Canvas et WebAssembly directement dans la RAM de votre navigateur, garantissant qu'aucune donnée ne quitte votre ordinateur."
        },
        {
          q: "Peut-on compresser des fichiers PDF protégés par mot de passe ?",
          a: "Oui, à condition de saisir le mot de passe pour déverrouiller le document en mémoire avant d'effectuer l'optimisation."
        }
      ],
      backToHub: "← Tous les Guides",
      launchTool: "🚀 Ouvrir dans l'Application Complète",
      skipToGuide: "📖 Aller au Guide Écrit ↓",
      collapseTool: "Réduire l'Outil",
      expandTool: "Développer l'Outil",
      liveToolLabel: "Outil en Direct — 100% Privé, Aucun Envoi sur Serveur"
    }
  },
  {
    id: "pdf-utilities",
    module: "pdf-utilities.js",
    subtab: "merge",
    category: "office",
    diagram: {
      src: "../../social_media_assets/pdf_manipulation_matrix_poster_1200x800.svg",
      caption: "Technische Matrix für PDF-Zusammenführung, Teilung und Organisation"
    },
    de: {
      lang: "de",
      title: "PDFs Zusammenfügen, Teilen und Verwalten Online Kostenlos | OmniTool Hub",
      h1: "Umfassende PDF-Werkzeugsammlung & Dokumentenmanager",
      description: "Mehrere PDFs zusammenführen, Seiten extrahieren, drehen und Dokumente neu ordnen — 100% client-seitig und sicher im Browser.",
      keywords: "pdf zusammenfügen, pdf verbinden, pdf teilen, pdf seiten extrahieren, pdf drehen, pdf tools online",
      categoryName: "Büro & Dokumente",
      leadParagraph: "Im Arbeitsalltag müssen häufig gescannte Verträge zusammengeführt, Seitenbereiche extrahiert oder Querdokumente gedreht werden. Die PDF-Werkzeugsuite von OmniTool Hub vereint all diese Funktionen in einer schnellen Oberfläche, die direkt im Browser per WebAssembly arbeitet.",
      stepsTitle: "PDFs kombinieren und organisieren: Schritt für Schritt",
      steps: [
        "Laden Sie ein oder mehrere PDF-Dokumente in den Arbeitsbereich hoch.",
        "Ordnen Sie Seiten oder Dateien durch Ziehen der Miniaturansichten nach Wunsch an.",
        "Wählen Sie die gewünschte Funktion: Zusammenfügen, Seiten teilen oder Drehen.",
        "Klicken Sie auf Speichern, um das fertige Dokument herunterzuladen."
      ],
      faqs: [
        {
          q: "Gibt es ein Limit für die Anzahl zusammenzufügender Dateien?",
          a: "Es gibt keine künstlichen Beschränkungen. Die einzige Grenze ist der verfügbare Arbeitsspeicher Ihres Geräts."
        },
        {
          q: "Bleiben Hyperlinks und Lesezeichen erhalten?",
          a: "Ja, die interne PDF-Objektstruktur und Verlinkungen bleiben erhalten, wann immer es technisch möglich ist."
        }
      ],
      backToHub: "← Alle Leitfäden",
      launchTool: "🚀 Vollständige App Öffnen",
      skipToGuide: "📖 Zum Schriftlichen Leitfaden ↓",
      collapseTool: "Werkzeug Einklappen",
      expandTool: "Werkzeug Ausklappen",
      liveToolLabel: "Live-Werkzeug — 100% Privat, Keine Server-Uploads"
    },
    fr: {
      lang: "fr",
      title: "Fusionner, Diviser et Organiser des PDF en Ligne Gratuit | OmniTool Hub",
      h1: "Boîte à Outils et Gestionnaire Intégral de PDF",
      description: "Combinez plusieurs PDF, extrayez des plages de pages, faites pivoter des feuilles et réorganisez vos documents en toute confidentialité.",
      keywords: "fusionner pdf, combiner pdf gratuit, diviser pdf, extraire pages pdf, pivoter pdf, outils pdf en ligne",
      categoryName: "Outils de Bureau",
      leadParagraph: "La gestion quotidienne de documents exige souvent de réunir des contrats numérisés, d'extraire des pages spécifiques ou de redresser des pages en paysage. La suite d'utilitaires PDF d'OmniTool Hub regroupe toutes ces opérations dans une interface rapide propulsée par WebAssembly.",
      stepsTitle: "Comment combiner et organiser vos documents PDF",
      steps: [
        "Importez un ou plusieurs documents PDF dans l'espace de travail interactif.",
        "Réorganisez les pages ou fichiers en glissant-déposant les vignettes selon vos préférences.",
        "Sélectionnez l'action souhaitée : Fusionner, Diviser par plages ou Faire pivoter.",
        "Cliquez sur Enregistrer pour télécharger votre document compilé."
      ],
      faqs: [
        {
          q: "Y a-t-il une limite sur le nombre de fichiers fusionnables ?",
          a: "Aucune limite artificielle n'est imposée. La seule limite est la mémoire vive de votre appareil."
        },
        {
          q: "Les liens hypertextes et signets sont-ils conservés ?",
          a: "Oui, l'analyseur d'objets PDF conserve la structure du document, les tables des matières et les liens internes dans la mesure du possible."
        }
      ],
      backToHub: "← Tous les Guides",
      launchTool: "🚀 Ouvrir dans l'Application Complète",
      skipToGuide: "📖 Aller au Guide Écrit ↓",
      collapseTool: "Réduire l'Outil",
      expandTool: "Développer l'Outil",
      liveToolLabel: "Outil en Direct — 100% Privé, Aucun Envoi sur Serveur"
    }
  },
  {
    id: "qr-studio",
    module: "qr-studio.js",
    subtab: "create",
    category: "design",
    diagram: {
      src: "../../social_media_assets/barcode_matrix_architecture_poster_1200x800.svg",
      caption: "Vektorielle QR-Code Struktur und Reed-Solomon Fehlerkorrektur"
    },
    de: {
      lang: "de",
      title: "Professionelles QR-Code Studio mit Logo Kostenlos | OmniTool Hub",
      h1: "Vektor-QR-Code Generator mit Logo & Rahmen",
      description: "Erstellen Sie hochwertige, personalisierte QR-Codes mit Farbverläufen, Logos und Call-to-Action Rahmen im SVG- oder PNG-Format.",
      keywords: "qr code generator, qr code mit logo, qr code erstellen kostenlos, qr studio, vektor qr code",
      categoryName: "Design & Grafik",
      leadParagraph: "QR-Codes verbinden die physische mit der digitalen Welt auf Visitenkarten, Flyern und Plakaten. Mit unserem QR-Code Studio generieren Sie gestochen scharfe Vektor-QR-Codes mit benutzerdefinierten Farben, Logos und Fehlerkorrektur.",
      stepsTitle: "So erstellen Sie einen benutzerdefinierten QR-Code",
      steps: [
        "Wählen Sie den Inhaltstyp (URL, Text, WLAN, Kontakt oder E-Mail).",
        "Passen Sie Farben, Muster und Rahmen nach Ihren Vorstellungen an.",
        "Laden Sie optional Ihr Firmen- oder Markenlogo für das Zentrum hoch.",
        "Laden Sie den fertigen QR-Code als verlustfreie SVG-Vektorgrafik oder hochauflösendes PNG herunter."
      ],
      faqs: [
        {
          q: "Verfallen die erstellten QR-Codes irgendwann?",
          a: "Nein. Die generierten Codes sind statisch und kodieren die Daten direkt. Sie funktionieren dauerhaft ohne Ablaufdatum."
        },
        {
          q: "Funktioniert der QR-Code auch mit einem Logo in der Mitte?",
          a: "Ja, dank der integrierten Reed-Solomon-Fehlerkorrektur (Stufe H mit bis zu 30% Toleranz) bleibt der Code zuverlässig lesbar."
        }
      ],
      backToHub: "← Alle Leitfäden",
      launchTool: "🚀 Vollständige App Öffnen",
      skipToGuide: "📖 Zum Schriftlichen Leitfaden ↓",
      collapseTool: "Werkzeug Einklappen",
      expandTool: "Werkzeug Ausklappen",
      liveToolLabel: "Live-Werkzeug — 100% Privat, Keine Server-Uploads"
    },
    fr: {
      lang: "fr",
      title: "Générateur de Code QR Personnalisé avec Logo Gratuit | OmniTool Hub",
      h1: "Studio Professionnel de Codes QR avec Logo",
      description: "Créez des codes QR personnalisés haute définition avec dégradés, logo central, cadres stylisés et téléchargement en SVG ou PNG sans limite.",
      keywords: "generateur code qr, creer qr code avec logo, qr code personnalise, generateur qr gratuit, qr code vectoriel",
      categoryName: "Design & Graphisme",
      leadParagraph: "Les codes QR modernes vont bien au-delà des simples motifs noirs et blancs. Avec notre studio QR, générez des codes vectoriels haute définition assortis à votre identité visuelle, intégrez votre logo de marque et ajustez la correction d'erreur Reed-Solomon pour un scan ultra-rapide.",
      stepsTitle: "Comment créer un code QR personnalisé étape par étape",
      steps: [
        "Entrez l'URL de votre site, vos identifiants Wi-Fi, numéro WhatsApp ou texte.",
        "Personnalisez les couleurs de premier plan, les dégradés et la forme des yeux d'angle.",
        "Téléversez le logo de votre marque pour le placer au centre du code.",
        "Téléchargez au format vectoriel SVG pour l'impression professionnelle ou PNG pour le web."
      ],
      faqs: [
        {
          q: "Les codes QR générés ont-ils une date d'expiration ?",
          a: "Non. Ce sont des codes QR statiques dont le contenu est encodé dans le motif lui-même. Ils n'expirent jamais et ne nécessitent aucun abonnement."
        },
        {
          q: "Le code QR reste-t-il lisible avec un logo au centre ?",
          a: "Oui, grâce à la correction d'erreur Reed-Solomon (niveau H jusqu'à 30% de redondance), les scanners lisent le code sans aucune difficulté."
        }
      ],
      backToHub: "← Tous les Guides",
      launchTool: "🚀 Ouvrir dans l'Application Complète",
      skipToGuide: "📖 Aller au Guide Écrit ↓",
      collapseTool: "Réduire l'Outil",
      expandTool: "Développer l'Outil",
      liveToolLabel: "Outil en Direct — 100% Privé, Aucun Envoi sur Serveur"
    }
  },
  {
    id: "json-formatter",
    module: "formatter-suite.js",
    subtab: "json",
    category: "dev",
    diagram: {
      src: "../../social_media_assets/code_formatting_ast_poster_1200x800.svg",
      caption: "AST-Syntaxbaum und Architektur der JSON-Formatierung und Validierung"
    },
    de: {
      lang: "de",
      title: "JSON Formatierer, Validator und Beautifier Online | OmniTool Hub",
      h1: "Online JSON-Formatierer, Prüfer & Beautifier",
      description: "Formatieren, validieren und reparieren Sie JSON-Datenstrukturen mit Syntax-Hervorhebung, konfigurierbarem Einzug und sofortiger Fehlererkennung.",
      keywords: "json formatieren, json validator, json beautifier, json prüfen, json online, json editor",
      categoryName: "Entwickler-Tools",
      leadParagraph: "Fehlersuche in unübersichtlichen JSON-Nutzlasten von APIs kann mühsam sein. Unser JSON-Formatierer bereinigt, strukturiert und prüft JSON-Code in Echtzeit vollständig lokal auf Ihrem Rechner.",
      stepsTitle: "JSON formatieren und prüfen: So geht's",
      steps: [
        "Fügen Sie Ihren unformatierten oder fehlerhaften JSON-Code in das Eingabefeld ein.",
        "Wählen Sie Ihren bevorzugten Einzug (2 Leerzeichen, 4 Leerzeichen oder Tabs).",
        "Überprüfen Sie sofortige Validierungshinweise und Syntax-Markierungen.",
        "Kopieren Sie das formatierte JSON in die Zwischenablage oder laden Sie die .json-Datei herunter."
      ],
      faqs: [
        {
          q: "Werden meine vertraulichen JSON-Nutzlasten an externe Server gesendet?",
          a: "Nein. Das Parsing und die Formatierung erfolgen zu 100% lokal im V8-JavaScript-Engine Ihres Browsers."
        },
        {
          q: "Kann das Tool fehlerhaftes JSON automatisch reparieren?",
          a: "Ja, gängige Syntaxfehler wie fehlende Anführungszeichen oder nachgestellte Kommas werden erkannt und können automatisch behoben werden."
        }
      ],
      backToHub: "← Alle Leitfäden",
      launchTool: "🚀 Vollständige App Öffnen",
      skipToGuide: "📖 Zum Schriftlichen Leitfaden ↓",
      collapseTool: "Werkzeug Einklappen",
      expandTool: "Werkzeug Ausklappen",
      liveToolLabel: "Live-Werkzeug — 100% Privat, Keine Server-Uploads"
    },
    fr: {
      lang: "fr",
      title: "Formateur et Validateur JSON en Ligne Gratuit | OmniTool Hub",
      h1: "Formateur, Validateur et Embellisseur JSON en Ligne",
      description: "Formatez, validez et réparez des structures JSON avec coloration syntaxique, indentation réglable et détection immédiate des erreurs.",
      keywords: "formater json, valider json, embellir json, json formatter gratuit, corriger json, formateur json en ligne",
      categoryName: "Outils Développeur",
      leadParagraph: "Dans les API REST et microservices, le format JSON est incontournable. Déboguer des réponses minifiées ou corrompues peut être fastidieux. Le formateur JSON d'OmniTool Hub structure et vérifie vos données en temps réel directement dans votre navigateur.",
      stepsTitle: "Comment formater et valider du JSON pas à pas",
      steps: [
        "Collez votre code JSON brut ou minifié dans le panneau d'entrée.",
        "Choisissez l'indentation voulue (2 espaces, 4 espaces ou compacte minifiée).",
        "Consultez la validation en direct : les erreurs de virgule ou d'accolade sont signalées immédiatement.",
        "Copiez le résultat dans votre presse-papiers ou téléchargez le fichier .json."
      ],
      faqs: [
        {
          q: "Mes données sensibles ou tokens d'API sont-ils envoyés sur Internet ?",
          a: "Absolument pas. Tout le traitement se déroule 100% en local dans le moteur JavaScript de votre navigateur."
        },
        {
          q: "L'outil peut-il réparer automatiquement les erreurs de syntaxe ?",
          a: "Oui, les erreurs fréquentes comme les virgules en trop ou les guillemets simples sont détectées et peuvent être corrigées automatiquement."
        }
      ],
      backToHub: "← Tous les Guides",
      launchTool: "🚀 Ouvrir dans l'Application Complète",
      skipToGuide: "📖 Aller au Guide Écrit ↓",
      collapseTool: "Réduire l'Outil",
      expandTool: "Développer l'Outil",
      liveToolLabel: "Outil en Direct — 100% Privé, Aucun Envoi sur Serveur"
    }
  },
  {
    id: "password-generator",
    module: "password-generator.js",
    subtab: "password",
    category: "security",
    diagram: {
      src: "../../social_media_assets/cryptographic_entropy_matrix_poster_1200x800.svg",
      caption: "Kryptografische Entropie, Schlüsselraum und Brute-Force-Resistenz"
    },
    de: {
      lang: "de",
      title: "Kryptografisch Sicherer Passwort-Generator | OmniTool Hub",
      h1: "Kryptografischer Generator für Sichere Passwörter",
      description: "Generieren Sie hochgradig zufällige Passwörter und Passphrasen mit Sonderzeichen, Ziffern und maximaler Entropie über die Web Crypto API.",
      keywords: "passwort generator, sicheres passwort erstellen, zufälliges passwort, passwort generator kostenlos",
      categoryName: "Sicherheit & Krypto",
      leadParagraph: "Schwache oder wiederverwendete Passwörter gehören zu den größten Sicherheitsrisiken im Internet. Unser kryptografischer Passwort-Generator nutzt den hardwaregestützten Zufallszahlengenerator Ihres Browsers (crypto.getRandomValues), um Passwörter mit unknackbarer Entropie zu erzeugen.",
      stepsTitle: "So generieren Sie ein sicheres Passwort",
      steps: [
        "Legen Sie die gewünschte Passwortlänge fest (empfohlen: mindestens 16 Zeichen).",
        "Aktivieren Sie Großbuchstaben, Kleinbuchstaben, Ziffern und Symbole.",
        "Prüfen Sie den Entropiewert und die geschätzte Knackzeit in Echtzeit.",
        "Kopieren Sie das generierte Passwort mit einem Klick in die Zwischenablage."
      ],
      faqs: [
        {
          q: "Wie sicher ist die Zufallsgenerierung im Browser?",
          a: "Wir verwenden die Web Crypto API mit kryptografisch sicheren Zufallszahlen (CSPRNG), denselben Standard, den moderne Sicherheitssoftware nutzt."
        },
        {
          q: "Wird mein generiertes Passwort irgendwo gespeichert oder protokolliert?",
          a: "Niemals. Das Passwort existiert nur flüchtig im Speicher Ihres Browsers und wird zu keinem Zeitpunkt übertragen oder geloggt."
        }
      ],
      backToHub: "← Alle Leitfäden",
      launchTool: "🚀 Vollständige App Öffnen",
      skipToGuide: "📖 Zum Schriftlichen Leitfaden ↓",
      collapseTool: "Werkzeug Einklappen",
      expandTool: "Werkzeug Ausklappen",
      liveToolLabel: "Live-Werkzeug — 100% Privat, Keine Server-Uploads"
    },
    fr: {
      lang: "fr",
      title: "Générateur de Mots de Passe Sécurisés et Aléatoires | OmniTool Hub",
      h1: "Générateur Cryptographique de Mots de Passe Sécurisés",
      description: "Générez des mots de passe aléatoires à haute entropie avec caractères spéciaux, chiffres et longueur personnalisée via l'API Web Crypto.",
      keywords: "generateur de mot de passe, creer mot de passe fort, mot de passe securise, password generator gratuit",
      categoryName: "Sécurité & Crypto",
      leadParagraph: "Les mots de passe faibles ou recyclés sont responsables de la grande majorité des piratages de comptes. Notre générateur utilise le générateur aléatoire matériel de votre système (crypto.getRandomValues) pour produire des mots de passe à entropie maximale impossibles à deviner.",
      stepsTitle: "Comment générer un mot de passe robuste",
      steps: [
        "Définissez la longueur désirée (recommandé : 16 caractères ou plus).",
        "Activez les majuscules, minuscules, chiffres et symboles spéciaux.",
        "Vérifiez la jauge d'entropie pour confirmer un niveau de sécurité optimal.",
        "Copiez le mot de passe généré dans votre gestionnaire de mots de passe habituel."
      ],
      faqs: [
        {
          q: "Mes mots de passe générés sont-ils enregistrés quelque part ?",
          a: "Jamais. La génération s'effectue uniquement dans la mémoire volatile de votre navigateur. Aucune donnée n'est transmise ni conservée."
        },
        {
          q: "Quelle est la différence avec un générateur basique ?",
          a: "Les algorithmes classiques (comme Math.random) ont des cycles prévisibles. L'API Web Crypto génère une entropie physique inviolable de niveau bancaire."
        }
      ],
      backToHub: "← Tous les Guides",
      launchTool: "🚀 Ouvrir dans l'Application Complète",
      skipToGuide: "📖 Aller au Guide Écrit ↓",
      collapseTool: "Réduire l'Outil",
      expandTool: "Développer l'Outil",
      liveToolLabel: "Outil en Direct — 100% Privé, Aucun Envoi sur Serveur"
    }
  }
];

function renderLocalizedGuideHtml(guide, langKey) {
  const l = guide[langKey];
  const canonicalUrl = `https://omnitool.worldsneed.com/guides/${langKey}/${guide.id}`;
  const enUrl = `https://omnitool.worldsneed.com/guides/${guide.id}`;
  const esUrl = `https://omnitool.worldsneed.com/guides/es/${guide.id}`;
  const ptUrl = `https://omnitool.worldsneed.com/guides/pt/${guide.id}`;
  const deUrl = `https://omnitool.worldsneed.com/guides/de/${guide.id}`;
  const frUrl = `https://omnitool.worldsneed.com/guides/fr/${guide.id}`;

  const enNavHref = `/guides/${guide.id}`;
  const esNavHref = `/guides/es/${guide.id}`;
  const ptNavHref = `/guides/pt/${guide.id}`;
  const deNavHref = `/guides/de/${guide.id}`;
  const frNavHref = `/guides/fr/${guide.id}`;

  const stepWord = {
    es: "Paso",
    pt: "Passo",
    de: "Schritt",
    fr: "Étape"
  }[langKey] || "Step";

  const howToSteps = l.steps.map((s, idx) => ({
    "@type": "HowToStep",
    "position": idx + 1,
    "name": `${stepWord} ${idx + 1}`,
    "text": s
  }));

  const faqSchema = l.faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }));

  return `<!DOCTYPE html>
<html lang="${l.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${l.title}</title>
  <meta name="description" content="${l.description}">
  <meta name="keywords" content="${l.keywords}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Multilingual SEO hreflang tags -->
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="es" href="${esUrl}">
  <link rel="alternate" hreflang="pt" href="${ptUrl}">
  <link rel="alternate" hreflang="de" href="${deUrl}">
  <link rel="alternate" hreflang="fr" href="${frUrl}">
  <link rel="alternate" hreflang="x-default" href="${enUrl}">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${l.title}">
  <meta property="og:description" content="${l.description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="OmniTool Hub">
  <meta property="og:image" content="https://omnitool.worldsneed.com/social_media_assets/opengraph_landscape_1200x630.png">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${l.title}">
  <meta name="twitter:description" content="${l.description}">
  <meta name="twitter:image" content="https://omnitool.worldsneed.com/social_media_assets/opengraph_landscape_1200x630.png">

  <!-- Google Analytics (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-7FG02T8BFR"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    if (window.location.protocol.startsWith('http') && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      gtag('config', 'G-7FG02T8BFR', { anonymize_ip: true });
    }
  </script>

  <!-- Typography & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../style.css?v=2.1.6">

  <!-- JSON-LD Structured Data for Rich Search Snippets -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "name": "${l.h1}",
        "description": "${l.description}",
        "step": ${JSON.stringify(howToSteps, null, 2)}
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "OmniTool Hub",
            "item": "https://omnitool.worldsneed.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "${l.categoryName}",
            "item": "https://omnitool.worldsneed.com/guides/${langKey}/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${l.h1}",
            "item": "${canonicalUrl}"
          }
        ]
      },
      {
        "@type": "TechArticle",
        "headline": "${l.title}",
        "description": "${l.description}",
        "author": {
          "@type": "Organization",
          "name": "OmniTool Hub"
        },
        "publisher": {
          "@type": "Organization",
          "name": "OmniTool Hub",
          "logo": {
            "@type": "ImageObject",
            "url": "https://omnitool.worldsneed.com/social_media_assets/profile_avatar_icon_1080x1080.svg"
          }
        },
        "image": "https://omnitool.worldsneed.com/social_media_assets/opengraph_landscape_1200x630.png",
        "datePublished": "2026-06-27",
        "dateModified": "2026-11-10",
        "mainEntityOfPage": "${canonicalUrl}"
      },
      {
        "@type": "FAQPage",
        "mainEntity": ${JSON.stringify(faqSchema, null, 2)}
      }
    ]
  }
  </script>

  <style>
    :root {
      --bg-app: #07090e;
      --bg-card: rgba(18, 24, 38, 0.65);
      --border-color: rgba(255, 255, 255, 0.08);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-cyan: #00f2fe;
      --accent-purple: #9d4edd;
      --accent-emerald: #10b981;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-app);
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(0, 242, 254, 0.06) 0%, transparent 40%),
        radial-gradient(circle at 85% 85%, rgba(157, 78, 221, 0.06) 0%, transparent 40%);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.65;
      padding: 0 0 60px 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .top-nav {
      width: 100%;
      background: rgba(7, 9, 14, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 14px 24px;
    }
    .top-nav-inner {
      max-width: 1240px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      width: 100%;
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text-main);
      font-weight: 800;
      font-size: 16px;
      flex-shrink: 0;
    }
    .nav-brand svg { width: 22px; height: 22px; color: var(--accent-cyan); }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .lang-switch-capsule {
      display: inline-flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 2px 4px;
      gap: 2px;
    }
    .lang-switch-capsule .lang-btn {
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 700;
      text-decoration: none;
      padding: 3px 8px;
      border-radius: 12px;
      transition: all 0.15s ease;
    }
    .lang-switch-capsule .lang-btn:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.08);
    }
    .lang-switch-capsule .lang-btn.active {
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
    }
    .nav-link-btn {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 8px;
      transition: all 0.2s;
    }
    .nav-link-btn:hover { color: var(--text-main); background: rgba(255, 255, 255, 0.05); }
    .nav-launch-btn {
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      padding: 7px 14px;
      border-radius: 8px;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .nav-launch-btn:hover { opacity: 0.9; transform: translateY(-1px); }
    .breadcrumbs-wrap {
      max-width: 1240px;
      width: 100%;
      margin: 20px auto 0 auto;
      padding: 0 24px;
    }
    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-muted);
    }
    .breadcrumbs a { color: var(--text-muted); text-decoration: none; }
    .breadcrumbs a:hover { color: var(--accent-cyan); }
    .breadcrumbs .current { color: var(--text-main); font-weight: 600; }
    .container {
      max-width: 1240px;
      width: 100%;
      margin: 24px auto 0 auto;
      padding: 0 24px;
      flex: 1;
    }
    header {
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 24px;
      margin-bottom: 32px;
      text-align: center;
    }
    .category-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 242, 254, 0.08);
      border: 1px solid rgba(0, 242, 254, 0.25);
      color: var(--accent-cyan);
      font-size: 12px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 14px;
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 14px;
      letter-spacing: -0.5px;
      line-height: 1.25;
    }
    .meta {
      font-size: 13px;
      color: var(--text-muted);
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .meta-tag {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      padding: 4px 10px;
      border-radius: 6px;
    }
    .live-tool-embed-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      margin-bottom: 40px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    }
    .live-tool-embed-header {
      padding: 12px 20px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .live-status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #10b981;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
    }
    .live-tool-quick-links {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .skip-to-guide-link {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      transition: all 0.2s;
    }
    .skip-to-guide-link:hover {
      color: var(--accent-cyan);
      border-color: rgba(0, 242, 254, 0.3);
    }
    .toggle-tool-collapse-btn {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-color);
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s;
    }
    .toggle-tool-collapse-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .live-fullscreen-link {
      font-size: 12px;
      font-weight: 700;
      color: var(--accent-cyan);
      text-decoration: none;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(0, 242, 254, 0.08);
      border: 1px solid rgba(0, 242, 254, 0.25);
      transition: all 0.2s;
    }
    .live-fullscreen-link:hover {
      background: rgba(0, 242, 254, 0.16);
      border-color: var(--accent-cyan);
    }
    .live-guide-tool-viewport {
      padding: 20px;
      position: relative;
      max-height: 580px;
      overflow: hidden;
      background: rgba(8, 12, 20, 0.4);
      transition: all 0.25s ease;
    }
    .guide-tool-loading {
      padding: 60px 20px;
      text-align: center;
      color: var(--text-muted);
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }
    .guide-tool-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: var(--accent-cyan);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    article {
      max-width: 860px;
      margin: 0 auto;
    }
    article p {
      font-size: 16px;
      color: #d1d5db;
      margin-bottom: 24px;
      line-height: 1.8;
    }
    article h2 {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-main);
      margin: 44px 0 18px 0;
      letter-spacing: -0.3px;
    }
    .steps-list {
      margin: 20px 0 36px 0;
      padding-left: 20px;
    }
    .steps-list li {
      font-size: 15px;
      color: #e5e7eb;
      margin-bottom: 14px;
      line-height: 1.7;
    }
    .faq-item {
      margin-bottom: 16px;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 18px 20px;
      background: rgba(255, 255, 255, 0.02);
    }
    .faq-item h3 {
      font-size: 16px;
      font-weight: 700;
      color: var(--accent-cyan);
      margin-bottom: 8px;
    }
    .faq-item p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
      margin: 0;
    }
  </style>
</head>
<body>

  <!-- Top Navigation Bar -->
  <nav class="top-nav" aria-label="Navigation">
    <div class="top-nav-inner">
      <a href="/?lang=${langKey}" class="nav-brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9.813 15.904L9 21L14.907 18M21 3L13.882 10.118M3 21L10.118 13.882M10.118 10.118L13.882 13.882M10.118 10.118L3 3M13.882 10.118L21 21" />
        </svg>
        <span>OmniTool Hub</span>
      </a>
      <div class="nav-actions">
        <!-- Language Switcher Capsule -->
        <div class="lang-switch-capsule">
          <a href="${enNavHref}" class="lang-btn" title="English">EN</a>
          <a href="${esNavHref}" class="lang-btn" title="Español">ES</a>
          <a href="${ptNavHref}" class="lang-btn" title="Português">PT</a>
          <a href="${deNavHref}" class="lang-btn ${langKey === 'de' ? 'active' : ''}" title="Deutsch">DE</a>
          <a href="${frNavHref}" class="lang-btn ${langKey === 'fr' ? 'active' : ''}" title="Français">FR</a>
        </div>
        <a href="/guides/${langKey}/" class="nav-link-btn">${l.backToHub}</a>
        <a href="/?lang=${langKey}#tool/${guide.id}" class="nav-launch-btn">${l.launchTool}</a>
      </div>
    </div>
  </nav>

  <!-- Breadcrumbs -->
  <div class="breadcrumbs-wrap">
    <nav class="breadcrumbs" aria-label="Breadcrumbs">
      <a href="/?lang=${langKey}">OmniTool Hub</a>
      <span>&rsaquo;</span>
      <a href="/guides/${langKey}/">${l.categoryName}</a>
      <span>&rsaquo;</span>
      <span class="current">${l.h1}</span>
    </nav>
  </div>

  <div class="container">
    <header>
      <div class="category-pill">${l.categoryName}</div>
      <h1>${l.h1}</h1>
      <div class="meta">
        <span class="meta-tag">📅 Nov 2026</span>
        <span class="meta-tag">🔒 100% Offline Client-Side</span>
        <span class="meta-tag">⚡ 0 Server-Uploads</span>
      </div>
    </header>

    <!-- LIVE INTERACTIVE EMBEDDED TOOL WORKSPACE -->
    <section class="live-tool-embed-card">
      <div class="live-tool-embed-header">
        <div class="live-status-indicator">
          <span class="pulse-dot"></span>
          <span><strong>${l.liveToolLabel}</strong></span>
        </div>
        <div class="live-tool-quick-links">
          <a href="#guide-article" class="skip-to-guide-link">${l.skipToGuide}</a>
          <button type="button" class="toggle-tool-collapse-btn" id="toggle-tool-collapse-btn" aria-expanded="true">
            <span class="toggle-icon">▾</span> <span class="toggle-text">${l.collapseTool}</span>
          </button>
          <a href="/?lang=${langKey}#tool/${guide.id}" class="live-fullscreen-link">${l.launchTool}</a>
        </div>
      </div>
      <div id="live-guide-tool-viewport" class="live-guide-tool-viewport">
        <div class="guide-tool-loading">
          <div class="guide-tool-spinner"></div>
          <span>${langKey === 'de' ? 'Werkzeug wird geladen...' : 'Chargement de l\'outil...'}</span>
        </div>
      </div>
    </section>

    <article id="guide-article">
      <p>${l.leadParagraph}</p>

      <h2>${l.stepsTitle}</h2>
      <ol class="steps-list">
        ${l.steps.map(s => `<li>${s}</li>`).join('\n        ')}
      </ol>

      <h2>FAQ</h2>
      <div class="faq-container">
        ${l.faqs.map(f => `
        <div class="faq-item">
          <h3>${f.q}</h3>
          <p>${f.a}</p>
        </div>`).join('\n')}
      </div>
    </article>
  </div>

  <!-- Client-Side Live Tool Embed Initializer -->
  <script type="module">
    const guideApp = {
      activeSubtab: '${guide.subtab}',
      activeSubtool: '${guide.id}',
      tools: [{ id: '${guide.id}', name: '${guide.id}' }],
      showToast(msg, type) { console.log('[' + type + '] ' + msg); },
      playSynthSound() {},
      getConfigValue(k, d) { return localStorage.getItem(k) || d; },
      navigateToTool(id) { window.location.href = '../../index.html?lang=${langKey}#tool/' + id; },
      syncSubtab() {},
      registerTabSwitcher() {}
    };

    try {
      const module = await import('../../tools/${guide.module}');
      const toolInstance = module.default;
      const viewport = document.getElementById('live-guide-tool-viewport');
      if (toolInstance && typeof toolInstance.renderUI === 'function' && viewport) {
        viewport.innerHTML = toolInstance.renderUI();
        if (typeof toolInstance.init === 'function') {
          await toolInstance.init(viewport, guideApp);
        }
      }
    } catch (err) {
      console.warn('[OmniTool Localized Guide] Tool initialization notice:', err);
    }
  </script>

  <!-- Live Tool Viewport Collapse / Expand Handler -->
  <script>
    (function initLiveToolCollapse() {
      const toggleBtn = document.getElementById('toggle-tool-collapse-btn');
      const viewport = document.getElementById('live-guide-tool-viewport');
      if (!toggleBtn || !viewport) return;
      toggleBtn.addEventListener('click', () => {
        const isCollapsed = viewport.style.display === 'none';
        viewport.style.display = isCollapsed ? 'block' : 'none';
        toggleBtn.classList.toggle('is-collapsed', !isCollapsed);
        toggleBtn.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
        const label = toggleBtn.querySelector('.toggle-text');
        if (label) label.textContent = isCollapsed ? '${l.collapseTool}' : '${l.expandTool}';
      });
    })();
  </script>
  <script>
    try { localStorage.setItem('omnitool_language', '${langKey}'); } catch (e) {}
  </script>
</body>
</html>
`;
}

function renderLocalizedHubHtml(langKey) {
  const isDe = langKey === 'de';
  const title = isDe
    ? "Zentrum für Technische Leitfäden & Tutorials auf Deutsch | OmniTool Hub"
    : "Centre de Guides et Tutoriels Techniques en Français | OmniTool Hub";
  const desc = isDe
    ? "Entdecken Sie kostenlose Schritt-für-Schritt-Anleitungen für PDF-Werkzeuge, QR-Codes, JSON-Validatoren und sichere Passwortgeneratoren — 100% privat."
    : "Découvrez des guides et tutoriels gratuits étape par étape pour les outils PDF, codes QR, validateurs JSON et générateurs de mots de passe — 100% privés.";
  const h1 = isDe
    ? "Zentrum für Leitfäden & Tutorials auf Deutsch"
    : "Centre de Guides & Tutoriels en Français";
  const appBackText = isDe ? "← Zur App" : "← Aller à l'App";
  const readGuideBtn = isDe ? "Leitfaden Lesen & Live Testen →" : "Lire le Guide & Tester en Direct →";

  const canonicalUrl = `https://omnitool.worldsneed.com/guides/${langKey}/`;
  const enUrl = `https://omnitool.worldsneed.com/guides/`;
  const esUrl = `https://omnitool.worldsneed.com/guides/es/`;
  const ptUrl = `https://omnitool.worldsneed.com/guides/pt/`;
  const deUrl = `https://omnitool.worldsneed.com/guides/de/`;
  const frUrl = `https://omnitool.worldsneed.com/guides/fr/`;

  return `<!DOCTYPE html>
<html lang="${langKey}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Multilingual SEO hreflang tags -->
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="es" href="${esUrl}">
  <link rel="alternate" hreflang="pt" href="${ptUrl}">
  <link rel="alternate" hreflang="de" href="${deUrl}">
  <link rel="alternate" hreflang="fr" href="${frUrl}">
  <link rel="alternate" hreflang="x-default" href="${enUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="OmniTool Hub">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../style.css?v=2.1.6">

  <style>
    :root {
      --bg-app: #07090e;
      --bg-card: rgba(18, 24, 38, 0.65);
      --border-color: rgba(255, 255, 255, 0.08);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-cyan: #00f2fe;
      --accent-purple: #9d4edd;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-app);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .top-nav {
      background: rgba(7, 9, 14, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      padding: 14px 24px;
    }
    .top-nav-inner {
      max-width: 1240px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .lang-switch-capsule {
      display: inline-flex;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 2px 4px;
      gap: 2px;
    }
    .lang-switch-capsule .lang-btn {
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 700;
      text-decoration: none;
      padding: 3px 8px;
      border-radius: 12px;
    }
    .lang-switch-capsule .lang-btn.active {
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
    }
    .container {
      max-width: 1240px;
      margin: 40px auto;
      padding: 0 24px;
      flex: 1;
    }
    h1 {
      font-size: 36px;
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
    }
    p.lead {
      color: var(--text-muted);
      font-size: 16px;
      max-width: 720px;
      margin-bottom: 36px;
    }
    .guides-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }
    .guide-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 24px;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
    }
    .guide-card:hover {
      transform: translateY(-2px);
      border-color: rgba(0, 242, 254, 0.35);
      box-shadow: 0 10px 30px rgba(0, 242, 254, 0.1);
    }
    .guide-card-tag {
      font-size: 11px;
      font-weight: 700;
      color: var(--accent-cyan);
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .guide-card h2 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      color: var(--text-main);
    }
    .guide-card p {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.6;
      flex: 1;
    }
    .guide-card-footer {
      margin-top: 18px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--accent-cyan);
      display: flex;
      align-items: center;
      gap: 6px;
    }
  </style>
</head>
<body>
  <nav class="top-nav">
    <div class="top-nav-inner">
      <a href="/?lang=${langKey}" style="color: #fff; font-weight: 800; text-decoration: none;">OmniTool Hub</a>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="lang-switch-capsule">
          <a href="/guides/" class="lang-btn">EN</a>
          <a href="/guides/es/" class="lang-btn">ES</a>
          <a href="/guides/pt/" class="lang-btn">PT</a>
          <a href="/guides/de/" class="lang-btn ${langKey === 'de' ? 'active' : ''}">DE</a>
          <a href="/guides/fr/" class="lang-btn ${langKey === 'fr' ? 'active' : ''}">FR</a>
        </div>
        <a href="/?lang=${langKey}" style="color: #9ca3af; text-decoration: none; font-size: 13px;">${appBackText}</a>
      </div>
    </div>
  </nav>

  <div class="container">
    <h1>${h1}</h1>
    <p class="lead">${desc}</p>

    <div class="guides-grid">
      ${localizedGuides.map(g => {
        const item = g[langKey];
        return `
        <a href="/guides/${langKey}/${g.id}" class="guide-card">
          <div class="guide-card-tag">${item.categoryName}</div>
          <h2>${item.h1}</h2>
          <p>${item.description}</p>
          <div class="guide-card-footer">${readGuideBtn}</div>
        </a>`;
      }).join('\n')}
    </div>
  </div>
  <script>
    try { localStorage.setItem('omnitool_language', '${langKey}'); } catch (e) {}
  </script>
</body>
</html>
`;
}

// Generate all Localized Files
console.log("Generating German & French Localized Guides...");
localizedGuides.forEach(guide => {
  // German
  const deHtml = renderLocalizedGuideHtml(guide, 'de');
  fs.writeFileSync(path.join(deDir, `${guide.id}.html`), deHtml, 'utf8');
  console.log(`✓ Generated guides/de/${guide.id}.html`);

  // French
  const frHtml = renderLocalizedGuideHtml(guide, 'fr');
  fs.writeFileSync(path.join(frDir, `${guide.id}.html`), frHtml, 'utf8');
  console.log(`✓ Generated guides/fr/${guide.id}.html`);
});

// Generate Localized Hub Indexes
fs.writeFileSync(path.join(deDir, 'index.html'), renderLocalizedHubHtml('de'), 'utf8');
console.log(`✓ Generated guides/de/index.html`);
fs.writeFileSync(path.join(frDir, 'index.html'), renderLocalizedHubHtml('fr'), 'utf8');
console.log(`✓ Generated guides/fr/index.html`);

// Sync 200.html if needed
console.log("\n🎉 All German and French Localized Guides successfully generated with full SEO parity!");
