import { Project, ExperienceItem, EducationItem, SkillCategory, ShowreelScene } from '../types/portfolio';

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'neo-kyoto-spire',
    title: 'Neo-Kyoto Cyber Spire',
    subtitle: 'Set Arquitectónico Modular Futurista (Coleccionista)',
    category: 'architecture',
    categoryLabel: 'Arquitectura & Esculturas',
    year: '2026',
    pieces: 4850,
    scale: 'Micro-figura modular 1:120',
    client: 'LEGO Architecture Concept Lab',
    coverImage: '/src/assets/images/lego_project_scifi_set_1793783016799.jpg',
    gallery: [
      '/src/assets/images/lego_project_scifi_set_1793783016799.jpg',
      '/src/assets/images/lego_project_packaging_1793783018158.jpg'
    ],
    description: 'Propuesta de rascacielos ciberpunk modular de tres torres interconectadas por pasarelas elevadas, con integración de tubos de fibra óptica translúcida y elementos LED ocultos en el núcleo estructural.',
    challenge: 'Mantener la rigidez estructural vertical en una torre de 82 cm de altura utilizando únicamente piezas LEGO estándar sin pegamentos ni varillas no homologadas.',
    solution: 'Desarrollo de un esqueleto interno basado en marcos Technic reforzados con pasadores axiales y vigas de celosía que distribuyen el centro de gravedad sobre una base triple con contrapeso.',
    tools: ['BrickLink Studio 2.0', 'Blender 4.2', 'Rhino 3D', 'KeyShot Pro', 'Adobe Substance 3D'],
    metrics: [
      { label: 'Piezas Totales', value: '4.850' },
      { label: 'Altura Real', value: '82 cm' },
      { label: 'Sub-ensamblajes', value: '28 módulos' },
      { label: 'Tiempo Prototipado', value: '6 semanas' }
    ],
    featured: true
  },
  {
    id: 'aero-x-hypercar',
    title: 'Aero-X Prototype 1:8',
    subtitle: 'Hiperdeportivo LEGO Technic con Aerodinámica Activa',
    category: 'technic',
    categoryLabel: 'Technic & Mecánica',
    year: '2025',
    pieces: 3980,
    scale: 'Escala 1:8 Ultimate Collector',
    client: 'LEGO Technic Advanced Concept',
    coverImage: '/src/assets/images/lego_project_hypercar_1793783016763.jpg',
    gallery: [
      '/src/assets/images/lego_project_hypercar_1793783016763.jpg',
      '/src/assets/images/lego_project_scifi_set_1793783016799.jpg'
    ],
    description: 'Desarrollo integral de un hipercoche conceptual a escala 1:8. Incluye transmisión secuencial de 8 velocidades con levas funcionales, suspensión neumática adaptativa y alerón trasero sincronizado.',
    challenge: 'Lograr una silueta exterior ultra-fluida y aerodinámica minimizando los huecos característicos de la construcción Technic.',
    solution: 'Hibridación de paneles Technic curvados de última generación con vigas flexibles de poliuretano y un monocasco central que alberga el tren motriz motorizado V12 simulado.',
    tools: ['SolidWorks', 'Studio 2.0', 'Cinema 4D', 'Redshift', 'Octane Render'],
    metrics: [
      { label: 'Escala', value: '1:8' },
      { label: 'Transmisión', value: '8 vel. secuencial' },
      { label: 'Piezas', value: '3.980' },
      { label: 'Velocidad CAD', value: '120 FPS Realtime' }
    ],
    featured: true
  },
  {
    id: 'space-odyssey-unboxing',
    title: 'Space Odyssey Collector Series',
    subtitle: 'Diseño de Packaging Premium & Experiencia Unboxing',
    category: 'packaging',
    categoryLabel: 'Packaging & Campañas',
    year: '2025',
    pieces: 3290,
    scale: 'Edición Limitada 18+',
    client: 'LEGO Master Collector Experience',
    coverImage: '/src/assets/images/lego_project_packaging_1793783018158.jpg',
    gallery: [
      '/src/assets/images/lego_project_packaging_1793783018158.jpg'
    ],
    description: 'Rediseño holístico de la experiencia de compra y desempaquetado para sets 18+. Caja rígida en negro mate con estampado en caliente de oro espacial, bandejas organizadas por fases de misión y libreto técnico de tapa dura.',
    challenge: 'Crear un empaque 100% libre de plásticos desechables que a su vez eleve el estatus del producto al nivel de una pieza de arte de coleccionista.',
    solution: 'Cajas interiores de celulosa termoformada con anclajes modulares para las piezas clave, acompañadas de láminas de acetato impresas con esquemáticas técnicas de la misión.',
    tools: ['Figma', 'Adobe Illustrator', 'Esko Studio', 'Cinema 4D', 'KeyShot'],
    metrics: [
      { label: 'Material', value: '100% Reciclable FSC' },
      { label: 'Acabado', value: 'Hot Stamping Oro + UV' },
      { label: 'Bandejas', value: '8 etapas de armado' },
      { label: 'Premio', value: 'Dieline Concept Gold' }
    ],
    featured: true
  },
  {
    id: 'lumina-chronos-botanical',
    title: 'Lumina Chronos Garden',
    subtitle: 'Escultura Botánica Cinética con Piezas Translúcidas',
    category: 'sets',
    categoryLabel: 'Sets & Conceptos',
    year: '2025',
    pieces: 2150,
    scale: 'Escultura 1:1 de exhibición',
    client: 'LEGO Gallery & Exhibition Design',
    coverImage: '/src/assets/images/lego_project_botanical_1793783018300.jpg',
    gallery: [
      '/src/assets/images/lego_project_botanical_1793783018300.jpg'
    ],
    description: 'Instalación cinética botánica que florece mediante un mecanismo de engranajes planetarios oculto en el zócalo. Utiliza una paleta cromática de policarbonato translúcido ámbar, cian y esmeralda.',
    challenge: 'Asegurar que los pétalos articulados mantengan el clutch-power tras cientos de ciclos de apertura y cierre continuos.',
    solution: 'Cálculo de tolerancia micrométrica en rótulas de baja fricción y contrapesos equilibrados por gravedad para evitar el desgaste por fatiga de material.',
    tools: ['Rhino 3D + Grasshopper', 'Blender', 'Studio 2.0', 'Unreal Engine 5'],
    metrics: [
      { label: 'Piezas Translúcidas', value: '72%' },
      { label: 'Mecanismo', value: 'Tren planetario 4:1' },
      { label: 'Ciclos Probados', value: '+10.000 aperturas' }
    ],
    featured: true
  },
  {
    id: 'redefine-play-campaign',
    title: 'Redefine Play: Global Campaign',
    subtitle: 'Dirección de Arte 3D & Campaña Publicitaria Transmedia',
    category: 'campaigns',
    categoryLabel: 'Packaging & Campañas',
    year: '2024',
    pieces: 0,
    client: 'LEGO Global Marketing Campaign',
    coverImage: '/src/assets/images/lego_project_scifi_set_1793783016799.jpg',
    gallery: [
      '/src/assets/images/lego_project_scifi_set_1793783016799.jpg',
      '/src/assets/images/lego_project_hypercar_1793783016763.jpg'
    ],
    description: 'Estrategia visual y creación de activos CGI para la campaña internacional orientada a creativos adultos "Adults Welcome: Redefine Your Space". Piezas de gran formato para vallas anamórficas 3D en Shinjuku y Times Square.',
    challenge: 'Transmitir la textura táctil real del plástico ABS (microarañazos, biseles y logo LEGO en cada stud) en renders a resolución 8K.',
    solution: 'Pipeline de texturizado procedural fotorealista con mapas de micro-desplazamiento y dispersión sub-superficial calibrada a los polímeros reales de LEGO.',
    tools: ['Unreal Engine 5.4', 'Houdini FX', 'Nuke', 'DaVinci Resolve', 'After Effects'],
    metrics: [
      { label: 'Visualizaciones', value: '+45M Globales' },
      { label: 'Formatos 3D', value: 'Anamórfico 8K 3D' },
      { label: 'Mercados', value: '18 países' }
    ],
    featured: false
  },
  {
    id: 'voxel-metropolis-phygital',
    title: 'Voxel Metropolis Phygital',
    subtitle: 'Plataforma de Gemelo Digital e Interacción Aumentada',
    category: 'sets',
    categoryLabel: 'Sets & Conceptos',
    year: '2024',
    pieces: 1840,
    client: 'LEGO R&D Future Play',
    coverImage: '/src/assets/images/lego_project_botanical_1793783018300.jpg',
    gallery: [
      '/src/assets/images/lego_project_botanical_1793783018300.jpg'
    ],
    description: 'Prototipo de experiencia phygital que permite escanear construcciones físicas en tiempo real y proyectar sobre ellas simulaciones fluidas y de iluminación en realidad mixta.',
    challenge: 'Reconocimiento visual instantáneo de combinaciones de colores y studs sin marcadores QR invasivos.',
    solution: 'Entrenamiento de un modelo de visión por computador optimizado para la topología geométrica de la cuadrícula estándar de LEGO (8mm x 8mm x 9.6mm).',
    tools: ['WebGPU', 'Three.js', 'Python / OpenCV', 'Blender', 'Unity XR'],
    metrics: [
      { label: 'Latencia Reconocimiento', value: '<40ms' },
      { label: 'Precisión Geométrica', value: '99.4%' }
    ],
    featured: false
  }
];

export const SHOWREEL_SCENES: ShowreelScene[] = [
  {
    id: 'shot-01',
    title: '01. Aero-X Hypercar Kinematics',
    timestamp: '00:00 - 00:32',
    category: 'Mecánica & Despiece 3D',
    description: 'Explosión orbital del tren motriz Technic V12, mostrando el acoplamiento sincrónico de engranajes y la respuesta de amortiguación hidráulica.',
    thumbnail: '/src/assets/images/lego_project_hypercar_1793783016763.jpg',
    technicalSpecs: {
      engine: 'Redshift GPU 3.5',
      renderTime: '4m 12s / frame',
      sampleRate: '2048 samples (ACEScg)',
      lighting: '3-Point Studio Softbox + IBL Automotive'
    }
  },
  {
    id: 'shot-02',
    title: '02. Neo-Kyoto Cyber Nocturne',
    timestamp: '00:33 - 01:05',
    category: 'Arquitectura & Volumetría',
    description: 'Travelling vertical por las fachadas del rascacielos modular con niebla volumétrica y dispersión luminosa en los bloques de acrílico translúcido.',
    thumbnail: '/src/assets/images/lego_project_scifi_set_1793783016799.jpg',
    technicalSpecs: {
      engine: 'Unreal Engine 5.4 Lumen',
      renderTime: 'Real-time 60 FPS (4K)',
      sampleRate: 'Path Tracer Multi-Bounce',
      lighting: 'Emissive Stud Lightpipes + HDR Skylight'
    }
  },
  {
    id: 'shot-03',
    title: '03. Space Odyssey Packaging Reveal',
    timestamp: '01:06 - 01:38',
    category: 'Packaging & Luxury Presentation',
    description: 'Secuencia cinemática de apertura magnética de la caja Collector Series, con relieve háptico de los manuales y bandejas de piezas numeradas.',
    thumbnail: '/src/assets/images/lego_project_packaging_1793783018158.jpg',
    technicalSpecs: {
      engine: 'KeyShot 11 Pro',
      renderTime: '2m 45s / frame',
      sampleRate: '512 samples',
      lighting: 'Studio Matte Black Rim Lighting'
    }
  },
  {
    id: 'shot-04',
    title: '04. Lumina Chronos Blooming',
    timestamp: '01:39 - 02:15',
    category: 'Arte Cinético & Bioluminiscencia',
    description: 'Animación en cámara superlenta del florecimiento de los pétalos de policarbonato policromático al interactuar con el sol.',
    thumbnail: '/src/assets/images/lego_project_botanical_1793783018300.jpg',
    technicalSpecs: {
      engine: 'Blender Cycles X',
      renderTime: '3m 20s / frame',
      sampleRate: '1024 samples con OptiX Denoise',
      lighting: 'Volumetric Sunbeam + Subsurface Scatter'
    }
  }
];

export const CV_EXPERIENCE: ExperienceItem[] = [
  {
    period: '2023 - Presente',
    role: 'Senior Master Model & Concept Designer',
    company: 'LEGO Creative Labs & Independent Atelier',
    location: 'Barcelona & Remoto (Colaboraciones Globales)',
    description: 'Liderazgo en el diseño de sets conceptuales de alta complejidad para líneas 18+ (Architecture, Technic e Ideas). Dirección de prototipado rápido físico y gemelos digitales 3D para validación de mercado.',
    achievements: [
      'Desarrollo y propuesta de 4 sets conceptuales con más de 3.500 piezas aprobados para evaluación técnica de clutch-power y producción.',
      'Implementación de un pipeline de renderizado fotorrealista en tiempo real que redujo un 40% el tiempo de aprobación de empaquetado y licencias.',
      'Supervisión de tolerancias dimensionales en moldes de inyección y selección de resinas recicladas de bajo impacto ecológico.'
    ]
  },
  {
    period: '2020 - 2023',
    role: 'Lead 3D Artist & Toy Concept Lead',
    company: 'BrickVision Studios',
    location: 'Madrid, España',
    description: 'Creación de activos 3D hiperrealistas, cinemáticas publicitarias y modelos para campañas globales de marcas de entretenimiento y construcción modular.',
    achievements: [
      'Dirección técnica de más de 20 spots publicitarios CGI para televisión y pantallas anamórficas 3D.',
      'Creación de la biblioteca interna de materiales PBR de plástico ABS con calibración colorimétrica física oficial.',
      'Coordinación de un equipo de 6 artistas de modelado y rigging de sistemas Technic complejos.'
    ]
  },
  {
    period: '2018 - 2020',
    role: 'Industrial & Packaging Designer',
    company: 'FutureCraft Design Studio',
    location: 'Valencia, España',
    description: 'Diseño de productos coleccionables de consumo, ergonomía de agarre y packaging premium para el sector juguetero y de artículos de diseño.',
    achievements: [
      'Ganador del premio A’ Design Award en la categoría de Diseño de Juguetes e Innovación Modular.',
      'Desarrollo de 12 líneas de empaques sostenibles de cartón corrugado certificado FSC.'
    ]
  }
];

export const CV_EDUCATION: EducationItem[] = [
  {
    period: '2017 - 2018',
    degree: 'Máster en Modelado 3D, Dirección de Arte y CGI Avanzado',
    institution: 'Elisava, Escuela Universitaria de Diseño e Ingeniería de Barcelona',
    details: 'Especialización en simulaciones físicas, iluminación cinemática y renderizado fotorrealista para diseño de producto y publicidad.'
  },
  {
    period: '2013 - 2017',
    degree: 'Grado en Ingeniería en Diseño Industrial y Desarrollo de Producto',
    institution: 'Universitat Politècnica de València (UPV)',
    details: 'Fundamentos de ciencia de materiales (termoplásticos, ABS, policarbonatos), matrices de inyección, cinemática de mecanismos y metodología de diseño centrado en el usuario.'
  }
];

export const CV_SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Software de Diseño 3D & CAD',
    skills: [
      { name: 'BrickLink Studio 2.0 (LDraw)', level: 98, note: 'Validación de colisión y clutch' },
      { name: 'Rhinoceros 3D + Grasshopper', level: 94, note: 'Modelado paramétrico y superficies nurbs' },
      { name: 'Blender 4.x / Cycles', level: 92, note: 'Lookdev, iluminación y rigging' },
      { name: 'KeyShot Pro & Substance 3D', level: 90, note: 'Shading de plástico ABS y microtexturas' },
      { name: 'Unreal Engine 5 (Lumen/Nanite)', level: 85, note: 'Cinemáticas y visualización en tiempo real' },
      { name: 'Cinema 4D + Redshift', level: 88, note: 'Motion graphics y spots publicitarios' }
    ]
  },
  {
    name: 'Habilidades Especializadas LEGO',
    skills: [
      { name: 'Física y Tolerancia Clutch-Power', level: 96, note: 'Estabilidad y resistencia a fatiga' },
      { name: 'Arquitectura de Esqueleto Technic', level: 95, note: 'Transmisión de fuerza y contrapeso' },
      { name: 'Optimización de Part List (BOM)', level: 92, note: 'Minimización de costes y moldes existentes' },
      { name: 'Diseño de Instrucciones de Montaje', level: 89, note: 'Curva pedagógica y ergonomía de armado' },
      { name: 'Diseño de Packaging Sostenible', level: 91, note: 'Cajas rígidas para coleccionistas 18+' }
    ]
  }
];

export const DESIGNER_PROFILE = {
  name: 'JAVIER SAEZ',
  title: 'CREATIVE LEGO DESIGNER & 3D ARTIST',
  location: 'Barcelona, España · Trabajo Global',
  status: 'Disponible para proyectos exclusivos, consultoría y desarrollo de sets',
  email: 'mrjaviersaez@gmail.com',
  bio: 'Diseñador industrial y director creativo especializado en el ecosistema LEGO, arquitectura modular y experiencias visuales 3D de alta gama. Combino el rigor matemático de las tolerancias de inyección con la narrativa visual cinemática que exige el público adulto y coleccionista.',
  manifesto: 'Un bloque LEGO no es un juguete: es una coordenada en un espacio infinito de posibilidades. Mi trabajo consiste en encontrar la conexión perfecta entre la física del plástico y la imaginación futurista.',
  stats: [
    { value: '8+', label: 'Años de Trayectoria' },
    { value: '14+', label: 'Sets Conceptuales Diseñados' },
    { value: '120K+', label: 'Piezas Modeladas en 3D' },
    { value: '3', label: 'Premios Internacionales' }
  ]
};
