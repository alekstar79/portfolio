import type { PortfolioItem, SocialItem, WorkExperienceItem } from '@/types/content'

export const menuItems = ['About', 'Skills', 'Portfolio', 'Work Experience', 'Contacts'] as const

export const hardSkills: string[] = [
  'HTML (HTML5), EJS, JSX',
  'CSS (CSS3), SASS (SCSS), PostCSS, Bootstrap, Tailwind, Animations',
  'JavaScript (ES6+, OOP), jQuery, TypeScript',
  'React',
  'Redux (Redux Toolkit, Redux Persist), MobX, Zustand',
  'Formik, React Hook Form, Yup, Axios, React Router, React Query',
  'Webpack, Vite, Gulp, Rollup',
  'Jest, React Testing Library, Enzyme, Chai, Mocha, Vitest',
  'REST API, WebSockets, Long Polling',
  'BEM, Feature-Sliced Design, Accessibility, UX',
  'Git (GitHub, BitBucket, GitLab)',
  'Figma, Adobe Photoshop, Avocode',
  'CMS 1C-Bitrix, Drupal, OpenCart, MODX',
  'Basic understanding PHP, Blade, Twig',
  'Agile, Waterfall, SCRUM',
  'Competent written and oral speech',
  'English level - B1',
]

export const softSkills: string[] = [
  'I know how to work in a team, I have experience in communication with designers, managers and other developers',
  'I am responsible about deadlines',
  'I am attentive to the details of the terms of reference',
  'I am demanding of the quality of my code, I follow the code-style',
  'I have time management skills',
  'I welcome constructive criticism and am always happy to find new points of professional and personal growth',
  'I know how to solve conflict situations',
  'I am correctly convey thoughts, formulate questions',
  'I write detailed reports on the work done, if required',
  'I have experience working with a geographically distributed team (remote work)',
  'I have experience in mentoring, training of junior specialists',
  'I am motivated to improve my skills, constantly studying new technologies in my field of activity',
]

export const portfolioItems: PortfolioItem[] = [
  {
    imgName: '2022-08',
    time: { datetime: '2022-08', label: 'August 2022' },
    title: 'Fancy Auth Form',
    href: 'https://aleksanderlamkov.github.io/fancy-auth-form/',
    description:
      'Minimalistic form of authorization based on SPA with integration of several technologies: Vite, TypeScript, React, React Router, Redux, Redux Toolkit, Redux Persist, Formik, Yup, classNames, PostCSS, Vite SVG icon, Vitest etc.',
    stack: ['Vite', 'TypeScript', 'React', 'React Router', 'Redux', 'Redux Toolkit', 'Redux Persist', 'Formik', 'Yup', 'PostCSS', 'Vitest'],
    hasImageWrapperBorder: true,
  },
  {
    imgName: '2022-01',
    time: { datetime: '2022-01', label: 'January 2022' },
    title: 'Adeart - Online Gift Shop',
    href: 'https://adeart.ru/',
    description: 'Multi-page online store.',
    stack: ['EJS', 'PostCSS', 'JS', 'WebPack'],
  },
  {
    imgName: '2021-12',
    time: { datetime: '2021-12', label: 'December 2021' },
    title: 'Multi-page website of the largest bank in the region',
    description:
      'Many complex components were implemented in the project: credit calculators, multi-stage mortgage application forms, asynchronous filter of bank services, custom maps (REST API YandexMap) with ATMs and office points.',
    stack: ['EJS', 'PostCSS', 'JS', 'React', 'Redux', 'WebPack'],
  },
]

export const workExperienceItems: WorkExperienceItem[] = [
  {
    time: { datetime: '2022-09', label: 'September 2022 - Present' },
    title: 'VK Team',
    href: 'https://team.vk.company/',
    position: 'Frontend Engineer',
    description: "<p>Development and support of the frontend of the company's internal tools, automation of development processes.</p>",
    stack: ['JavaScript', 'TypeScript', 'React', 'Redux', 'WebPack'],
  },
  {
    time: { datetime: '2021-06/2022-09', label: 'June 2021 - September 2022' },
    title: 'Digital Element',
    href: 'https://d-element.ru/',
    position: 'Frontend Developer',
    description:
      '<p>Development of the frontend part of projects in the field of e-commerce and fintech. Development in pure JavaScript in the OOP style. Creating simple React components. Writing autotests for interface components.</p>',
    stack: ['EJS', 'PostCSS', 'JavaScript', 'React', 'Redux', 'TypeScript', 'WebPack', 'Jest', 'Figma', 'Bitrix'],
  },
  {
    time: { datetime: '2020-09/2021-05', label: 'September 2020 - May 2021' },
    title: 'Ribbla',
    href: 'https://ribbla.com/',
    position: 'Frontend Developer',
    description: '<p>Development of the frontend part of landing pages and e-commerce projects.</p>',
    stack: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'jQuery', 'Gulp', 'Figma', 'Drupal'],
  },
  {
    time: { datetime: '2019-07/2020-08', label: 'July 2019 - August 2020' },
    title: 'Freelance',
    position: 'Web Developer',
    description: '<p>Website development. Fixing layout bugs. Writing simple scripts.</p>',
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP', 'Gulp', 'Adobe Photoshop'],
  },
]

export const socialItems: SocialItem[] = [
  { label: 'GitHub', href: 'https://github.com/aleksanderlamkov', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aleksander-lamkov-569b87231/?locale=en_US', icon: 'linkedin' },
  { label: 'Telegram', href: 'https://t.me/AleksanderLamkov', icon: 'telegram' },
  { label: 'Email', href: 'mailto:aleksanderlamkov@gmail.com', icon: 'email' },
  { label: 'Boosty', href: 'https://boosty.to/friendly-frontend', icon: 'boosty' },
  { label: 'YouTube', href: 'https://www.youtube.com/@AleksanderLamkov', icon: 'youtube' },
]
