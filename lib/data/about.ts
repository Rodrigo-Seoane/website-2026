export interface AboutHeroContent {
  headline: string
  subtitle: string
  tagline: string
  location: {
    city: string
    country: string
  }
  image: string
}

export interface StoryChapter {
  location: string
  years: string
  title: string
  description: string
}

export interface StoryContent {
  beginning: StoryChapter
  evolution: StoryChapter
  illustration: string
}

export interface Philosophy {
  id: string
  title: string
  description: string
  icon: string
}

export interface SkillCategory {
  id: string
  label: string
  skills: string[]
}

export interface Tool {
  id: string
  name: string
  category: string
  icon: string
}

export interface Interest {
  id: string
  title: string
  description: string
  icon: string
}

// ---------------------------------------------------------------------------
// Content data
// ---------------------------------------------------------------------------

export const aboutHero: AboutHeroContent = {
  headline: 'Revenue Recovery Specialist',
  subtitle:
    'Innovation-Driven Product Designer | 25+ Years Transforming Complex Problems into User-Centric Solutions',
  tagline: 'Welcome to my headquarters',
  location: {
    city: 'Barcelona',
    country: 'Spain',
  },
  image: '/images/about/rodrigo-portrait.jpg',
}

export const story: StoryContent = {
  beginning: {
    location: 'Rio de Janeiro, Brazil',
    years: 'First 10 Years',
    title: 'Building the Foundation',
    description:
      'My journey began in Rio de Janeiro, where I honed my craft working with small and local businesses. From marketing materials to responsive websites, every project taught me the fundamentals of translating human needs into visual solutions.',
  },
  evolution: {
    location: 'Barcelona, Spain',
    years: 'Past 15 Years',
    title: 'Scaling the Impact',
    description:
      'Barcelona became my home and my proving ground. Working with large corporations, I shifted from pixel-level execution to product strategy and modular design systems. The complexity grew -- and so did my ability to navigate it, bringing design thinking into the heart of enterprise product development.',
  },
  illustration: '/images/Illustration Rio-BCN.svg',
}

export const philosophy: Philosophy[] = [
  {
    id: 'collaborative',
    title: 'Collaborative Mindset',
    description:
      'I bring a collaborative and proactive mindset to every project, believing that the best solutions emerge from diverse perspectives.',
    icon: 'Users',
  },
  {
    id: 'user-centric',
    title: 'User-Centric Focus',
    description:
      'Profound understanding of user psychology drives every decision, ensuring designs resonate with real human needs.',
    icon: 'Heart',
  },
  {
    id: 'stakeholder',
    title: 'Stakeholder Alignment',
    description:
      'Building strong relationships with stakeholders, clients, and team members to ensure shared vision and successful outcomes.',
    icon: 'Target',
  },
  {
    id: 'learning',
    title: 'Continuous Learning',
    description:
      'Adaptability and continuous learning keep my skills sharp and my approaches fresh in an ever-evolving field.',
    icon: 'TrendingUp',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    id: 'core',
    label: 'Core Competencies',
    skills: [
      'User Research & Psychology',
      'UI/UX Design',
      'Design Systems',
      'Prototyping & Interaction Design',
      'Information Architecture',
      'Product Strategy',
      'Design Thinking Facilitation',
      'Stakeholder Management',
    ],
  },
  {
    id: 'technical',
    label: 'Technical Skills',
    skills: [
      'Figma',
      'Sketch',
      'Adobe Creative Suite',
      'Framer',
      'Prototyping Tools',
      'HTML/CSS',
    ],
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    skills: [
      'Complex Problem Solving',
      'Cross-functional Collaboration',
      'Client Communication',
      'Mentorship',
      'Workshop Facilitation',
    ],
  },
]

export const tools: Tool[] = [
  { id: 'figma', name: 'Figma', category: 'Design', icon: 'Figma' },
  { id: 'sketch', name: 'Sketch', category: 'Design', icon: 'PenTool' },
  { id: 'adobe-xd', name: 'Adobe XD', category: 'Design', icon: 'Layers' },
  { id: 'photoshop', name: 'Photoshop', category: 'Graphics', icon: 'Image' },
  { id: 'illustrator', name: 'Illustrator', category: 'Graphics', icon: 'Paintbrush' },
  { id: 'framer', name: 'Framer', category: 'Prototyping', icon: 'Zap' },
  { id: 'miro', name: 'Miro', category: 'Collaboration', icon: 'LayoutGrid' },
  { id: 'notion', name: 'Notion', category: 'Documentation', icon: 'FileText' },
  { id: 'jira', name: 'Jira', category: 'Project Mgmt', icon: 'ClipboardList' },
  { id: 'slack', name: 'Slack', category: 'Communication', icon: 'MessageSquare' },
  { id: 'vscode', name: 'VS Code', category: 'Development', icon: 'Code2' },
  { id: 'github', name: 'GitHub', category: 'Version Control', icon: 'Github' },
]

export const interests: Interest[] = [
  {
    id: 'travel',
    title: 'Travel & Culture',
    description:
      'Exploring new places and cultures fuels my creativity and broadens my perspective.',
    icon: 'Globe',
  },
  {
    id: 'photography',
    title: 'Photography',
    description:
      'Capturing moments and compositions that tell stories beyond words.',
    icon: 'Camera',
  },
  {
    id: 'cooking',
    title: 'Cooking',
    description:
      'The creative process of cooking parallels design -- experimentation, iteration, and presentation.',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'music',
    title: 'Music',
    description:
      'From Brazilian beats to electronic, music provides rhythm to my creative process.',
    icon: 'Music',
  },
]
