export interface TimeInfo {
  datetime: string
  label: string
}

export interface PortfolioItem {
  imgName: string
  time: TimeInfo
  title: string
  href?: string
  description?: string
  stack: string[]
  hasImageWrapperBorder?: boolean
}

export interface WorkExperienceItem {
  time: TimeInfo
  title: string
  href?: string
  position: string
  description?: string
  stack: string[]
}

export interface SocialItem {
  label: string
  href: string
  icon: string
}
