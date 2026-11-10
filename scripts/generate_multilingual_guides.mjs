import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const guidesDir = path.join(projectRoot, 'guides');
const esDir = path.join(guidesDir, 'es');
const ptDir = path.join(guidesDir, 'pt');

// Ensure localized directories exist
[esDir, ptDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Guide Definitions with full localized copy and technical metadata
const localizedGuides = [
  {
    id: "compress-pdf",
    module: "pdf-utilities.js",
    subtab: "compress",
    category: "office",
    diagram: {
      src: "../../social_media_assets/pdf_manipulation_matrix_poster_1200x800.svg",
      caption: "Arquitectura Técnica de Optimización y Compresión de PDF en el Navegador"
    },
    es: {
      lang: "es",
      title: "Comprimir PDF Online Gratis - Reducir Tamaño de Archivo PDF | OmniTool Hub",
      h1: "Compresor de PDF Online y Reductor de Tamaño",
      description: "Reduce el tamaño de tus documentos PDF para envíos por correo electrónico y plataformas gubernamentales mediante optimización inteligente 100% en tu navegador.",
      keywords: "comprimir pdf, reducir tamano pdf, bajar peso pdf, compresor pdf gratis, achicar pdf, comprimir pdf online",
      categoryName: "Herramientas de Oficina",
      leadParagraph: "Los portales de trámites, plataformas de empleo y clientes de correo electrónico suelen imponer límites estrictos de 2 MB o 5 MB en archivos adjuntos. OmniTool Hub optimiza tus documentos PDF re-codificando imágenes de mapa de bits a densidades DPI personalizadas, comprimiendo tablas de fuentes tipográficas y eliminando metadatos redundantes, todo sin subir ningún archivo a servidores externos.",
      stepsTitle: "Cómo Comprimir un Documento PDF Paso a Paso",
      steps: [
        "Arrastra y suelta tu archivo PDF en el área de trabajo interactiva superior o selecciónalo desde tu dispositivo.",
        "Selecciona el nivel de compresión deseado (Equilibrada, Fuerte o Máxima calidad de lectura).",
        "Haz clic en 'Comprimir PDF' para procesar el archivo directamente en la memoria de tu navegador.",
        "Verifica la reducción porcentual obtenida y descarga el nuevo archivo PDF optimizado."
      ],
      faqs: [
        {
          q: "¿Comprimir el PDF provocará que el texto se vea borroso?",
          a: "No. El texto digital y las fuentes vectoriales permanecen completamente nítidos a cualquier nivel de aumento (zoom) porque se basan en curvas matemáticas. Solo las imágenes incrustadas son optimizadas."
        },
        {
          q: "¿Cómo funciona la compresión sin enviar el archivo a un servidor?",
          a: "El motor utiliza HTML5 Canvas y WebAssembly para decodificar los flujos gráficos directamente en la memoria RAM de tu propio navegador web, garantizando privacidad absoluta."
        },
        {
          q: "¿Se pueden comprimir archivos PDF protegidos con contraseña?",
          a: "Sí, siempre que ingreses la contraseña para desbloquear el archivo en memoria antes de aplicar la optimización y guardarlo nuevamente."
        }
      ],
      backToHub: "← Todas las Guías",
      launchTool: "🚀 Abrir en Aplicación Completa",
      skipToGuide: "📖 Ir a la Guía Escrita ↓",
      collapseTool: "Plegar Herramienta",
      expandTool: "Desplegar Herramienta",
      liveToolLabel: "Herramienta en Vivo — 100% Privada, Sin Envíos al Servidor"
    },
    pt: {
      lang: "pt",
      title: "Comprimir PDF Online Grátis - Diminuir Tamanho de Arquivo PDF | OmniTool Hub",
      h1: "Compressor de PDF Online e Redutor de Tamanho",
      description: "Diminua o tamanho de documentos PDF para anexar em e-mails e portais online com compressão inteligente executada 100% no seu navegador sem enviar arquivos.",
      keywords: "comprimir pdf, diminuir tamanho pdf, reduzir pdf gratis, compressor de pdf online, diminuir arquivo pdf",
      categoryName: "Ferramentas de Escritório",
      leadParagraph: "Portais governamentais, sistemas de processos seletivos e clientes de e-mail frequentemente limitam anexos a 2 MB ou 5 MB. O OmniTool Hub otimiza seus PDFs reamostrando imagens rasterizadas para densidades DPI sob medida, comprimindo tabelas de fontes e descartando metadados redundantes — tudo com total privacidade na memória do seu navegador.",
      stepsTitle: "Como Comprimir Arquivos PDF Passo a Passo",
      steps: [
        "Arraste e solte seu arquivo PDF na janela interativa acima ou selecione-o no seu dispositivo.",
        "Escolha o nível de compressão desejado (Equilibrada, Alta Compressão ou Qualidade Máxima).",
        "Clique em 'Comprimir PDF' para executar a otimização na memória RAM do navegador.",
        "Confira o percentual de redução obtido e baixe instantaneamente o documento otimizado."
      ],
      faqs: [
        {
          q: "A compressão do PDF deixará os textos borrados?",
          a: "Não. Os textos e fontes tipográficas permanecem perfeitamente nítidos em qualquer nível de zoom porque utilizam traçados vetoriais. Apenas as fotos e imagens embutidas são reamostradas."
        },
        {
          q: "Como o OmniTool Hub comprime PDFs sem fazer upload para servidores?",
          a: "O motor de renderização usa WebAssembly e APIs HTML5 Canvas diretamente no seu navegador, mantendo 100% dos dados no seu dispositivo."
        },
        {
          q: "É possível comprimir documentos PDF protegidos por senha?",
          a: "Sim, basta informar a senha para liberar o documento na memória antes de realizar o processo de recompressão e salvamento."
        }
      ],
      backToHub: "← Todos os Guias",
      launchTool: "🚀 Abrir na Aplicação Completa",
      skipToGuide: "📖 Ir para o Guia Escrito ↓",
      collapseTool: "Recolher Ferramenta",
      expandTool: "Expandir Ferramenta",
      liveToolLabel: "Ferramenta Interativa — 100% Privada, Sem Uploads para Servidores"
    }
  },
  {
    id: "pdf-utilities",
    module: "pdf-utilities.js",
    subtab: "merge",
    category: "office",
    diagram: {
      src: "../../social_media_assets/pdf_manipulation_matrix_poster_1200x800.svg",
      caption: "Matriz Técnica de Manipulação, Junção e Divisão de Documentos PDF"
    },
    es: {
      lang: "es",
      title: "Unir, Dividir y Gestionar PDF Online Gratis | OmniTool Hub",
      h1: "Caja de Herramientas y Gestor Integral de PDF",
      description: "Combina varios archivos PDF en uno solo, extrae rangos de páginas, gira hojas desalineadas y reorganiza tus documentos de forma 100% privada en tu navegador.",
      keywords: "unir pdf, juntar pdf gratis, dividir pdf, extraer paginas pdf, combinar pdf online, girar pdf",
      categoryName: "Herramientas de Oficina",
      leadParagraph: "La gestión diaria de documentos requiere con frecuencia unir contratos escaneados, extraer páginas específicas o rotar planos apaisados. La Suite de Utilidades PDF de OmniTool Hub reúne todas estas operaciones en una interfaz unificada que procesa los archivos localmente mediante WebAssembly con velocidad instantánea.",
      stepsTitle: "Cómo Combinar y Organizar Archivos PDF",
      steps: [
        "Carga uno o más documentos PDF en la ventana interactiva.",
        "Reorganiza las páginas o archivos arrastrando las miniaturas a la posición deseada.",
        "Selecciona la operación requerida: Unir varios archivos, Dividir por rangos o Girar páginas.",
        "Haz clic en Guardar para descargar tu documento final compilado."
      ],
      faqs: [
        {
          q: "¿Hay límite en el número de archivos que puedo unir?",
          a: "No hay límites artificiales impuestos. La única limitación es la memoria RAM disponible en tu dispositivo, permitiendo unir decenas de documentos sin restricciones."
        },
        {
          q: "¿Se conservan los enlaces internos y marcadores?",
          a: "Sí, el analizador de objetos PDF conserva la estructura del documento, tablas de contenido y enlaces de navegación siempre que sea técnicamente viable."
        }
      ],
      backToHub: "← Todas las Guías",
      launchTool: "🚀 Abrir en Aplicación Completa",
      skipToGuide: "📖 Ir a la Guía Escrita ↓",
      collapseTool: "Plegar Herramienta",
      expandTool: "Desplegar Herramienta",
      liveToolLabel: "Herramienta en Vivo — 100% Privada, Sin Envíos al Servidor"
    },
    pt: {
      lang: "pt",
      title: "Juntar, Dividir e Organizar PDF Online Grátis | OmniTool Hub",
      h1: "Central de Ferramentas e Gestão de Documentos PDF",
      description: "Junte múltiplos arquivos PDF, separe páginas em arquivos avulsos, gire folhas invertidas e organize seus documentos com total privacidade no navegador.",
      keywords: "juntar pdf, unir pdf gratis, dividir pdf online, extrair paginas pdf, combinar pdf, girar pdf",
      categoryName: "Ferramentas de Escritório",
      leadParagraph: "A rotina corporativa e acadêmica exige com frequência combinar contratos escaneados, separar páginas ou rotacionar folhas orientadas incorretamente. A Central de Utilidades PDF do OmniTool Hub executa essas operações localmente usando WebAssembly sem nenhum upload para a nuvem.",
      stepsTitle: "Como Juntar e Dividir Arquivos PDF Passo a Passo",
      steps: [
        "Carregue um ou múltiplos arquivos PDF na área interativa acima.",
        "Reordene as páginas arrastando as miniaturas para a sequência exata desejada.",
        "Selecione a ação: Juntar Documentos, Dividir Páginas ou Rotacionar.",
        "Clique em Compilar para gerar e salvar instantaneamente o novo arquivo."
      ],
      faqs: [
        {
          q: "Existe limite na quantidade de PDFs que posso juntar?",
          a: "Não há limites arbitrários nem necessidade de cadastro. A única restrição é a memória do seu próprio aparelho, possibilitando combinar dezenas de arquivos com fluidez."
        },
        {
          q: "Meus documentos confidenciais são enviados para algum servidor?",
          a: "Absolutamente não. Nenhum byte sai do seu computador ou celular; tudo é manipulado localmente pela CPU."
        }
      ],
      backToHub: "← Todos os Guias",
      launchTool: "🚀 Abrir na Aplicação Completa",
      skipToGuide: "📖 Ir para o Guia Escrito ↓",
      collapseTool: "Recolher Ferramenta",
      expandTool: "Expandir Ferramenta",
      liveToolLabel: "Ferramenta Interativa — 100% Privada, Sem Uploads para Servidores"
    }
  },
  {
    id: "qr-studio",
    module: "qr-studio.js",
    subtab: "generator",
    category: "design",
    diagram: {
      src: "../../social_media_assets/qr_code_anatomy_matrix_poster_1200x800.svg",
      caption: "Anatomía Técnica de Códigos QR, Corrección de Errores Reed-Solomon y Estilización"
    },
    es: {
      lang: "es",
      title: "Generador de Códigos QR Personalizados con Logo y Colores | OmniTool Hub",
      h1: "Estudio Profesional de Códigos QR con Logotipo",
      description: "Crea códigos QR personalizados de alta definición con degradados, logotipos centrales, marcos de llamada a la acción y descarga en SVG o PNG sin límites.",
      keywords: "generador de codigos qr, crear qr con logo, qr personalizado, hacer qr gratis, generador qr svg, codigos qr para menus",
      categoryName: "Diseño y Gráficos",
      leadParagraph: "Los códigos QR modernos van más allá de los cuadros monocromáticos en blanco y negro. Con QR Studio puedes generar códigos vectoriales elegantes con la paleta de colores de tu marca, incrustar el logotipo de tu empresa y ajustar los niveles de corrección de errores Reed-Solomon para asegurar lecturas rápidas en cualquier cámara de teléfono inteligente.",
      stepsTitle: "Cómo Diseñar un Código QR Personalizado",
      steps: [
        "Introduce la dirección URL, red Wi-Fi, tarjeta de contacto vCard o texto deseado.",
        "Personaliza los colores de primer plano, fondos degradados y el diseño de los módulos angulares.",
        "Sube el logotipo de tu marca para situarlo en el centro del código QR.",
        "Selecciona el formato de exportación vectorial (SVG) para imprenta o PNG para medios digitales."
      ],
      faqs: [
        {
          q: "¿Los códigos QR creados caducan con el tiempo?",
          a: "No. Se trata de códigos QR estáticos donde la información se almacena directamente en la matriz gráfica. Nunca caducarán ni dependen de suscripciones externas."
        },
        {
          q: "¿Qué nivel de corrección de errores debo elegir si añado un logotipo?",
          a: "Recomendamos seleccionar el nivel Alto (30%) para que los lectores puedan reconstruir cualquier porción del código cubierta por la imagen central."
        }
      ],
      backToHub: "← Todas las Guías",
      launchTool: "🚀 Abrir en Aplicación Completa",
      skipToGuide: "📖 Ir a la Guía Escrita ↓",
      collapseTool: "Plegar Herramienta",
      expandTool: "Desplegar Herramienta",
      liveToolLabel: "Herramienta en Vivo — 100% Privada, Sin Envíos al Servidor"
    },
    pt: {
      lang: "pt",
      title: "Gerador de QR Code Personalizado com Logo e Cores Grátis | OmniTool Hub",
      h1: "Estúdio Profissional de Códigos QR com Logotipo",
      description: "Gere QR Codes personalizados em alta resolução com logotipo central, cores em degradê, molduras estilizadas e download em SVG ou PNG sem custos.",
      keywords: "gerador de qr code, criar qr code com logo, qr code personalizado, gerador qr code gratis, qr code svg, qr code para cardapio",
      categoryName: "Design e Gráficos",
      leadParagraph: "Os códigos QR atuais evoluíram muito além dos tradicionais quadrados pretos e brancos. Com o QR Studio você cria códigos vetorizados elegantes combinando as cores da sua identidade visual, embutindo o logo da sua marca e ajustando a tolerância de correção de erros Reed-Solomon para leitura ultra-rápida.",
      stepsTitle: "Como Criar um QR Code Personalizado Passo a Passo",
      steps: [
        "Insira a URL do seu site, dados da rede Wi-Fi, WhatsApp ou texto desejado.",
        "Ajuste as cores de primeiro plano, fundos com gradiente e formato dos módulos dos cantos.",
        "Faça o upload do logotipo da sua marca para posicionar perfeitamente no centro.",
        "Baixe em formato SVG vetorial para impressão profissional ou PNG para redes sociais e web."
      ],
      faqs: [
        {
          q: "Os códigos QR gerados têm data de validade?",
          a: "Não. São QR Codes estáticos em que o conteúdo fica gravado no próprio desenho dos módulos. Eles nunca expiram e não exigem mensalidades."
        },
        {
          q: "Qual nível de correção de erros devo usar ao colocar um logotipo?",
          a: "Recomendamos o nível Alto (30%) para garantir que a câmera do smartphone leia o código mesmo com o centro ocupado pela imagem."
        }
      ],
      backToHub: "← Todos os Guias",
      launchTool: "🚀 Abrir na Aplicação Completa",
      skipToGuide: "📖 Ir para o Guia Escrito ↓",
      collapseTool: "Recolher Ferramenta",
      expandTool: "Expandir Ferramenta",
      liveToolLabel: "Ferramenta Interativa — 100% Privada, Sem Uploads para Servidores"
    }
  },
  {
    id: "json-formatter",
    module: "formatter-suite.js",
    subtab: "json",
    category: "dev",
    diagram: {
      src: "../../social_media_assets/code_formatting_ast_poster_1200x800.svg",
      caption: "Árbol Sintáctico Abstracto (AST) y Arquitectura de Formateo y Validación de JSON"
    },
    es: {
      lang: "es",
      title: "Formateador y Validador JSON Online Gratis - Embellecer JSON | OmniTool Hub",
      h1: "Formateador, Validador y Embellecedor JSON",
      description: "Formatea, valida y repara estructuras de datos JSON con resaltado de sintaxis, sangría configurable y detección instantánea de errores en tu navegador.",
      keywords: "formatear json, validar json, embellecer json, json formatter online, arreglar json, parser json gratis",
      categoryName: "Herramientas de Desarrollador",
      leadParagraph: "El intercambio de datos en aplicaciones web modernas y APIs REST se basa casi en su totalidad en JSON. Analizar cargas útiles no estructuradas o minificadas puede resultar confuso. El Formateador JSON de OmniTool Hub convierte respuestas desordenadas en estructuras legibles con colores sintácticos y validación estricta en tiempo real.",
      stepsTitle: "Cómo Formatear y Validar Datos JSON",
      steps: [
        "Pega tu fragmento JSON minificado o desordenado en el panel de entrada.",
        "Selecciona el espaciado deseado (2 espacios, 4 espacios o formato compacto minificado).",
        "Revisa la validación sintáctica: el editor indicará de inmediato la línea y columna exacta si existe algún error.",
        "Copia el resultado limpio al portapapeles o descárgalo como archivo .json."
      ],
      faqs: [
        {
          q: "¿Se envían mis datos sensibles o credenciales de APIs a algún servidor?",
          a: "De ninguna manera. Toda la validación y el análisis sintáctico (parsing) ocurren en el motor JavaScript de tu propio navegador web, manteniendo tokens y contraseñas totalmente seguros."
        },
        {
          q: "¿Puede reparar errores de sintaxis comunes como comas finales sobrantes?",
          a: "Sí, cuenta con un modo de análisis tolerante que localiza comas finales no permitidas y comillas simples para convertirlas en formato JSON estrictamente válido."
        }
      ],
      backToHub: "← Todas las Guías",
      launchTool: "🚀 Abrir en Aplicación Completa",
      skipToGuide: "📖 Ir a la Guía Escrita ↓",
      collapseTool: "Plegar Herramienta",
      expandTool: "Desplegar Herramienta",
      liveToolLabel: "Herramienta en Vivo — 100% Privada, Sin Envíos al Servidor"
    },
    pt: {
      lang: "pt",
      title: "Formatador e Validador JSON Online Grátis - Embelezador JSON | OmniTool Hub",
      h1: "Formatador, Validador e Embelezador JSON",
      description: "Formate, valide e embeleze payloads JSON com realce de sintaxe colorido, indentação ajustável e diagnóstico imediato de erros no navegador.",
      keywords: "formatar json, validar json, embelezar json, json formatter online gratis, corrigir json, validador json",
      categoryName: "Ferramentas de Desenvolvedor",
      leadParagraph: "A comunicação entre microsserviços e APIs REST depende quase universalmente de JSON. Inspecionar respostas minificadas de banco de dados ou logs densos sem formatação é demorado e propenso a erros. O Formatador JSON do OmniTool Hub organiza seus dados em segundos com indentação configurável e análise sintática rigorosa.",
      stepsTitle: "Como Formatar e Validar Dados JSON Passo a Passo",
      steps: [
        "Cole seu código JSON minificado ou desordenado no painel esquerdo.",
        "Escolha a indentação preferida (2 espaços, 4 espaços ou minificação condensada).",
        "Acompanhe o diagnóstico em tempo real: erros de vírgula ou chaves são apontados instantaneamente.",
        "Copie a saída formatada com um clique ou exporte o arquivo para o seu computador."
      ],
      faqs: [
        {
          q: "Meus tokens de autenticação ou dados de clientes são enviados para a internet?",
          a: "Não. A execução é 100% local no motor JavaScript do seu navegador. Zero dados trafegam pela rede."
        },
        {
          q: "Ele suporta arquivos JSON grandes?",
          a: "Sim, suporta payloads volumosos com renderização otimizada para evitar travamentos de interface."
        }
      ],
      backToHub: "← Todos os Guias",
      launchTool: "🚀 Abrir na Aplicação Completa",
      skipToGuide: "📖 Ir para o Guia Escrito ↓",
      collapseTool: "Recolher Ferramenta",
      expandTool: "Expandir Ferramenta",
      liveToolLabel: "Ferramenta Interativa — 100% Privada, Sem Uploads para Servidores"
    }
  },
  {
    id: "password-generator",
    module: "password-generator.js",
    subtab: "password",
    category: "security",
    diagram: {
      src: "../../social_media_assets/cryptographic_entropy_matrix_poster_1200x800.svg",
      caption: "Entropía Criptográfica, Espacio de Claves y Resistencia Frente a Ataques de Fuerza Bruta"
    },
    es: {
      lang: "es",
      title: "Generador de Contraseñas Seguras y Aleatorias Online | OmniTool Hub",
      h1: "Generador Criptográfico de Contraseñas Seguras",
      description: "Genera contraseñas aleatorias de alta entropía con símbolos especiales, números y longitud personalizada mediante la API Web Crypto de tu navegador.",
      keywords: "generador de contrasenas, crear contrasena segura, password generator, generar claves aleatorias, contrasenas fuertes",
      categoryName: "Seguridad y Criptografía",
      leadParagraph: "Las contraseñas débiles o reutilizadas son la causa de más del 80% de las brechas de seguridad digital. El Generador de Contraseñas de OmniTool Hub aprovecha el generador de números pseudoaleatorios criptográficamente seguro (CSPRNG) de tu sistema operativo mediante `window.crypto.getRandomValues`, garantizando claves impenetrables con cálculo de entropía en bits en tiempo real.",
      stepsTitle: "Cómo Generar una Contraseña Inviolable",
      steps: [
        "Define la longitud deseada (recomendamos 16 caracteres o más para cuentas críticas).",
        "Activa los conjuntos de caracteres necesarios: mayúsculas, minúsculas, números y símbolos.",
        "Comprueba la barra medidora de entropía para verificar que supere los 80 bits de seguridad.",
        "Copia la contraseña generada a tu gestor de contraseñas de confianza."
      ],
      faqs: [
        {
          q: "¿Se guarda mi contraseña generada en algún registro o base de datos?",
          a: "Jamás. Todo el cálculo de números aleatorios se efectúa directamente en el hardware de tu dispositivo a través de la API Web Crypto nativa del navegador."
        },
        {
          q: "¿Qué longitud mínima se recomienda para una seguridad robusta?",
          a: "Para cuentas de correo, banca y desarrollo, recomendamos un mínimo de 16 caracteres combinando caracteres alfanuméricos y símbolos."
        }
      ],
      backToHub: "← Todas las Guías",
      launchTool: "🚀 Abrir en Aplicación Completa",
      skipToGuide: "📖 Ir a la Guía Escrita ↓",
      collapseTool: "Plegar Herramienta",
      expandTool: "Desplegar Herramienta",
      liveToolLabel: "Herramienta en Vivo — 100% Privada, Sin Envíos al Servidor"
    },
    pt: {
      lang: "pt",
      title: "Gerador de Senhas Seguras e Fortes Online Grátis | OmniTool Hub",
      h1: "Gerador Criptográfico de Senhas Fortes e Aleatórias",
      description: "Gere senhas criptograficamente seguras com alta entropia, caracteres especiais, números e comprimento customizado usando a Web Crypto API no navegador.",
      keywords: "gerador de senhas, criar senha forte, gerador de senhas seguras, password generator online, senhas aleatorias",
      categoryName: "Segurança e Criptografia",
      leadParagraph: "Senhas previsíveis ou recicladas entre múltiplos serviços representam a principal causa de invasões de contas online. O Gerador de Senhas do OmniTool Hub utiliza o gerador de números aleatórios de nível militar do seu próprio sistema operacional (`crypto.getRandomValues`), garantindo chaves imprevisíveis com cálculo de entropia em tempo real.",
      stepsTitle: "Como Gerar Senhas Seguras Passo a Passo",
      steps: [
        "Defina a quantidade de caracteres (recomendamos 16 ou mais para serviços bancários e e-mail).",
        "Selecione as classes de caracteres: letras maiúsculas, minúsculas, numerais e símbolos.",
        "Confira o medidor de entropia em bits para validar a resistência contra ataques de força bruta.",
        "Copie a senha com segurança diretamente para o seu gerenciador de senhas favorito."
      ],
      faqs: [
        {
          q: "Minhas senhas geradas ficam salvas em algum servidor?",
          a: "Absolutamente não. A geração ocorre exclusivamente dentro da memória temporária do seu navegador web. Nenhum dado é registrado ou enviado pela internet."
        },
        {
          q: "Qual é a diferença entre uma senha comum e uma gerada com Web Crypto?",
          a: "Algoritmos comuns (`Math.random`) têm padrões previsíveis que ferramentas de hackers conseguem adivinhar. A API Web Crypto produz entropia física de nível bancário."
        }
      ],
      backToHub: "← Todos os Guias",
      launchTool: "🚀 Abrir na Aplicação Completa",
      skipToGuide: "📖 Ir para o Guia Escrito ↓",
      collapseTool: "Recolher Ferramenta",
      expandTool: "Expandir Ferramenta",
      liveToolLabel: "Ferramenta Interativa — 100% Privada, Sem Uploads para Servidores"
    }
  }
];

// HTML Template Builder for Localized Guides
function renderLocalizedGuideHtml(guide, langKey) {
  const l = guide[langKey];
  const canonicalUrl = `https://omnitool.worldsneed.com/guides/${langKey}/${guide.id}`;
  const enUrl = `https://omnitool.worldsneed.com/guides/${guide.id}`;
  const esUrl = `https://omnitool.worldsneed.com/guides/es/${guide.id}`;
  const ptUrl = `https://omnitool.worldsneed.com/guides/pt/${guide.id}`;

  const enNavHref = `/guides/${guide.id}`;
  const esNavHref = `/guides/es/${guide.id}`;
  const ptNavHref = `/guides/pt/${guide.id}`;

  const faqSchema = l.faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }));

  const howToSteps = l.steps.map((s, idx) => ({
    "@type": "HowToStep",
    "position": idx + 1,
    "name": `Paso ${idx + 1}`,
    "text": s
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
            "name": "Guías",
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
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      transition: all 0.2s;
    }
    .nav-link-btn:hover {
      color: var(--text-main);
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.04);
    }
    .nav-launch-btn {
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      text-decoration: none;
      font-size: 13px;
      font-weight: 800;
      padding: 7px 18px;
      border-radius: 8px;
      box-shadow: 0 4px 14px rgba(0, 242, 254, 0.25);
      transition: all 0.2s;
    }
    .nav-launch-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(0, 242, 254, 0.35);
    }
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
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid var(--border-color);
    }
    .live-tool-embed-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 48px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    }
    .live-tool-embed-header {
      padding: 14px 20px;
      background: rgba(10, 14, 23, 0.95);
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
      color: var(--text-main);
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-cyan);
      box-shadow: 0 0 10px var(--accent-cyan);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { opacity: 0.4; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.15); }
      100% { opacity: 0.4; transform: scale(0.9); }
    }
    .live-tool-quick-links {
      display: flex;
      align-items: center;
      gap: 10px;
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
  <nav class="top-nav" aria-label="Navegación principal">
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
          <a href="${esNavHref}" class="lang-btn ${langKey === 'es' ? 'active' : ''}" title="Español">ES</a>
          <a href="${ptNavHref}" class="lang-btn ${langKey === 'pt' ? 'active' : ''}" title="Português">PT</a>
        </div>
        <a href="/guides/${langKey}/" class="nav-link-btn">${l.backToHub}</a>
        <a href="/?lang=${langKey}#tool/${guide.id}" class="nav-launch-btn">${l.launchTool}</a>
      </div>
    </div>
  </nav>

  <!-- Breadcrumbs -->
  <div class="breadcrumbs-wrap">
    <nav class="breadcrumbs" aria-label="Ruta de navegación">
      <a href="/?lang=${langKey}">OmniTool Hub</a>
      <span>&rsaquo;</span>
      <a href="/guides/${langKey}/">Guías</a>
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
        <span class="meta-tag">⚡ Cero Envíos al Servidor</span>
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
          <a href="/#tool/${guide.id}" class="live-fullscreen-link">${l.launchTool}</a>
        </div>
      </div>
      <div id="live-guide-tool-viewport" class="live-guide-tool-viewport">
        <div class="guide-tool-loading">
          <div class="guide-tool-spinner"></div>
          <span>Cargando motor de la herramienta...</span>
        </div>
      </div>
    </section>

    <article id="guide-article">
      <p>${l.leadParagraph}</p>

      <h2>${l.stepsTitle}</h2>
      <ol class="steps-list">
        ${l.steps.map(s => `<li>${s}</li>`).join('\n        ')}
      </ol>

      <h2>Preguntas Frecuentes (FAQ)</h2>
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
      navigateToTool(id) { window.location.href = '../../index.html#tool/' + id; },
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
      const viewport = document.getElementById('live-guide-tool-viewport');
      if (viewport) {
        viewport.innerHTML = \`
          <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 14px;">
            <p style="margin-bottom: 12px;">Esta herramienta está lista para usarse en la aplicación completa.</p>
            <a href="/#tool/${guide.id}" class="nav-launch-btn" style="display: inline-block;">🚀 Abrir Herramienta</a>
          </div>
        \`;
      }
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

// Hub Index Generator for Localized Guides
function renderLocalizedHubHtml(langKey) {
  const isEs = langKey === 'es';
  const title = isEs 
    ? "Centro de Guías y Tutoriales Técnicos en Español | OmniTool Hub" 
    : "Central de Guias e Tutoriais Técnicos em Português | OmniTool Hub";
  const desc = isEs
    ? "Explora guías y tutoriales gratuitos paso a paso para herramientas de PDF, códigos QR, validadores JSON y generadores de contraseñas 100% privados."
    : "Explore guias e tutoriais passo a passo gratuitos para ferramentas de PDF, QR Code, validadores JSON e geradores de senhas 100% privados.";
  const h1 = isEs ? "Centro de Guías y Tutoriales en Español" : "Central de Guias e Tutoriais em Português";
  const canonicalUrl = `https://omnitool.worldsneed.com/guides/${langKey}/`;
  const enUrl = `https://omnitool.worldsneed.com/guides/`;
  const esUrl = `https://omnitool.worldsneed.com/guides/es/`;
  const ptUrl = `https://omnitool.worldsneed.com/guides/pt/`;

  const enNavHref = `/guides/`;
  const esNavHref = `/guides/es/`;
  const ptNavHref = `/guides/pt/`;
  const appBackText = isEs ? '← Ir a la App' : '← Ir para o App';

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
          <a href="${enNavHref}" class="lang-btn">EN</a>
          <a href="${esNavHref}" class="lang-btn ${langKey === 'es' ? 'active' : ''}">ES</a>
          <a href="${ptNavHref}" class="lang-btn ${langKey === 'pt' ? 'active' : ''}">PT</a>
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
          <div class="guide-card-footer">${isEs ? 'Leer Guía y Probar en Vivo →' : 'Ler Guia e Testar ao Vivo →'}</div>
        </a>`;
      }).join('\n')}
    </div>
  </div>
  <script>
    try { localStorage.setItem('omnitool_language', '${langKey}'); } catch (e) {}
  </script>
</body>
</html>`;
}

// Generate all Localized Files
console.log("Generating Spanish & Portuguese Localized Guides...");
localizedGuides.forEach(guide => {
  // Spanish
  const esHtml = renderLocalizedGuideHtml(guide, 'es');
  fs.writeFileSync(path.join(esDir, `${guide.id}.html`), esHtml, 'utf8');
  console.log(`✓ Generated guides/es/${guide.id}.html`);

  // Portuguese
  const ptHtml = renderLocalizedGuideHtml(guide, 'pt');
  fs.writeFileSync(path.join(ptDir, `${guide.id}.html`), ptHtml, 'utf8');
  console.log(`✓ Generated guides/pt/${guide.id}.html`);

  // Inject reciprocal hreflang tags into English counterpart if not present
  const enFile = path.join(guidesDir, `${guide.id}.html`);
  if (fs.existsSync(enFile)) {
    let enHtml = fs.readFileSync(enFile, 'utf8');
    const hreflangBlock = `
  <!-- Multilingual SEO hreflang tags -->
  <link rel="alternate" hreflang="en" href="https://omnitool.worldsneed.com/guides/${guide.id}">
  <link rel="alternate" hreflang="es" href="https://omnitool.worldsneed.com/guides/es/${guide.id}">
  <link rel="alternate" hreflang="pt" href="https://omnitool.worldsneed.com/guides/pt/${guide.id}">
  <link rel="alternate" hreflang="x-default" href="https://omnitool.worldsneed.com/guides/${guide.id}">`;

    if (!enHtml.includes(`hreflang="es"`)) {
      enHtml = enHtml.replace(/<link rel="canonical"[^>]*>/, (m) => `${m}${hreflangBlock}`);
      fs.writeFileSync(enFile, enHtml, 'utf8');
      console.log(`✓ Injected reciprocal hreflang tags into guides/${guide.id}.html`);
    }
  }
});

// Generate Localized Hub Indexes
fs.writeFileSync(path.join(esDir, 'index.html'), renderLocalizedHubHtml('es'), 'utf8');
console.log(`✓ Generated guides/es/index.html`);
fs.writeFileSync(path.join(ptDir, 'index.html'), renderLocalizedHubHtml('pt'), 'utf8');
console.log(`✓ Generated guides/pt/index.html`);

// Inject reciprocal hreflang into guides/index.html
const masterEnHub = path.join(guidesDir, 'index.html');
if (fs.existsSync(masterEnHub)) {
  let hubHtml = fs.readFileSync(masterEnHub, 'utf8');
  if (!hubHtml.includes(`hreflang="es"`)) {
    const hubHreflang = `
  <!-- Multilingual SEO hreflang tags -->
  <link rel="alternate" hreflang="en" href="https://omnitool.worldsneed.com/guides/">
  <link rel="alternate" hreflang="es" href="https://omnitool.worldsneed.com/guides/es/">
  <link rel="alternate" hreflang="pt" href="https://omnitool.worldsneed.com/guides/pt/">
  <link rel="alternate" hreflang="x-default" href="https://omnitool.worldsneed.com/guides/">`;
    hubHtml = hubHtml.replace(/<link rel="canonical"[^>]*>/, (m) => `${m}${hubHreflang}`);
    fs.writeFileSync(masterEnHub, hubHtml, 'utf8');
    console.log(`✓ Injected reciprocal hreflang into master guides/index.html`);
  }
}

console.log("\n🎉 All Spanish and Portuguese Localized Guides successfully generated with full SEO parity!");

