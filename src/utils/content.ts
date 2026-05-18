import type { PortfolioItem, SocialItem, WorkExperienceItem } from '@/types/content'

export const menuItems = [
  'menu.about',
  'menu.skills',
  'menu.portfolio',
  'menu.work-experience',
  'menu.contacts'
] as const

export const hardSkills: string[] = [
  'content.hardSkills.0',
  'content.hardSkills.1',
  'content.hardSkills.2',
  'content.hardSkills.3',
  'content.hardSkills.4',
  'content.hardSkills.5',
  'content.hardSkills.6',
  'content.hardSkills.7',
  'content.hardSkills.8',
  'content.hardSkills.9',
  'content.hardSkills.10',
  'content.hardSkills.11',
  'content.hardSkills.12',
  'content.hardSkills.13',
  'content.hardSkills.14',
  'content.hardSkills.15',
  'content.hardSkills.16',
]

export const softSkills: string[] = [
  'content.softSkills.0',
  'content.softSkills.1',
  'content.softSkills.2',
  'content.softSkills.3',
  'content.softSkills.4',
  'content.softSkills.5',
  'content.softSkills.6',
  'content.softSkills.7',
  'content.softSkills.8',
  'content.softSkills.9',
  'content.softSkills.10',
  'content.softSkills.11',
]

export const portfolioItems: PortfolioItem[] = [
  {
    imgName: '2022-08',
    time: { datetime: '2022-08', label: 'content.portfolio.0.timeLabel' },
    titleKey: 'content.portfolio.0.title',
    href: 'https://aleksanderlamkov.github.io/fancy-auth-form/',
    descriptionKey: 'content.portfolio.0.description',
    stack: ['TypeScript', 'Vite', 'Vue', 'Vue Router', 'Vuex', 'Redux Toolkit', 'Redux Persist', 'Formik', 'Yup', 'PostCSS', 'Vitest'],
    hasImageWrapperBorder: true,
  },
  {
    imgName: '2022-01',
    time: { datetime: '2022-01', label: 'content.portfolio.1.timeLabel' },
    titleKey: 'content.portfolio.1.title',
    href: 'https://adeart.ru/',
    descriptionKey: 'content.portfolio.1.description',
    stack: ['JS', 'Vue', 'SCSS', 'WebPack'],
  },
  {
    imgName: '2021-12',
    time: { datetime: '2021-12', label: 'content.portfolio.2.timeLabel' },
    titleKey: 'content.portfolio.2.title',
    descriptionKey: 'content.portfolio.2.description',
    stack: ['EJS', 'PostCSS', 'JS', 'React', 'Redux', 'WebPack'],
  },
]

export const workExperienceItems: WorkExperienceItem[] = [
  {
    time: { datetime: '2022-09', label: 'content.workExperience.0.timeLabel' },
    titleKey: 'content.workExperience.0.title',
    href: 'https://team.vk.company/',
    positionKey: 'content.workExperience.0.position',
    descriptionKey: 'content.workExperience.0.description',
    stack: ['JavaScript', 'TypeScript', 'React', 'Redux', 'WebPack'],
  },
  {
    time: { datetime: '2021-06/2022-09', label: 'content.workExperience.1.timeLabel' },
    titleKey: 'content.workExperience.1.title',
    href: 'https://d-element.ru/',
    positionKey: 'content.workExperience.1.position',
    descriptionKey: 'content.workExperience.1.description',
    stack: ['EJS', 'PostCSS', 'JavaScript', 'React', 'Redux', 'TypeScript', 'WebPack', 'Jest', 'Figma', 'Bitrix'],
  },
  {
    time: { datetime: '2020-09/2021-05', label: 'content.workExperience.2.timeLabel' },
    titleKey: 'content.workExperience.2.title',
    href: 'https://ribbla.com/',
    positionKey: 'content.workExperience.2.position',
    descriptionKey: 'content.workExperience.2.description',
    stack: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'jQuery', 'Gulp', 'Figma', 'Drupal'],
  },
  {
    time: { datetime: '2019-07/2020-08', label: 'content.workExperience.3.timeLabel' },
    titleKey: 'content.workExperience.3.title',
    positionKey: 'content.workExperience.3.position',
    descriptionKey: 'content.workExperience.3.description',
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP', 'Gulp', 'Adobe Photoshop'],
  },
]

export const socialItems: SocialItem[] = [
  { label: 'content.social.GitHub', href: 'https://github.com/alekstar79', icon: 'github' },
  { label: 'content.social.Max', href: 'https://max.ru/u/f9LHodD0cOLX8Cx6cnzAXbjyxtz5ukKF2bLAIjZRpqQfpdMT68sEQ9Q6BwQ', icon: 'max' },
  { label: 'content.social.Telegram', href: 'https://t.me/alekstar79', icon: 'telegram' },
  { label: 'content.social.Email', href: 'mailto:alekstar79@yandex.ru', icon: 'email' }
]
