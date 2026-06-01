import { projectMediaItems, sections, site, slugify } from '../data/content.js'

const DEFAULT_IMAGE = '/image_resources/t-logo.png'
const DESCRIPTION_LIMIT = 155

const pageMeta = {
  home: {
    title: `${site.name} | ${site.title}`,
    description: `${site.name} is a software engineer and audio engineer based out of Seattle`,
    path: '/',
  },
  about: {
    title: `About | ${site.name}`,
    description: `${site.name} is a software engineer and audio engineer based out of Seattle.`,
    path: '/about',
  },
  resume: {
    title: `Resume | ${site.name}`,
    description: `Resume for ${site.name}, a software engineer and audio engineer`,
    path: '/resume',
  },
  legal: {
    title: `Legal | ${site.name}`,
    description: `Privacy policy and legal information for ${site.name}.`,
    path: '/legal',
    noindex: true,
  },
  'not-found': {
    title: `Page Not Found | ${site.name}`,
    description: `This page could not be found on ${site.name}'s portfolio.`,
    path: '/',
    noindex: true,
  },
}

export const projects = sections.flatMap((section) =>
  section.projects.map((project) => ({
    ...project,
    sectionId: section.id,
    sectionTitle: section.title,
  })),
)

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString()

export const findProjectBySlug = (slug) => projects.find((project) => slugify(project.title) === slug)

const toPlainText = (value = '') =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const clampDescription = (value) => {
  const text = toPlainText(value)

  if (text.length <= DESCRIPTION_LIMIT) {
    return text
  }

  return `${text.slice(0, DESCRIPTION_LIMIT - 1).trimEnd()}...`
}

const firstImageForProject = (project) =>
  projectMediaItems(project, 'projectImages').find((item) => item.type === 'image')?.src
  ?? projectMediaItems(project, 'homeImages').find((item) => item.type === 'image')?.src
  ?? DEFAULT_IMAGE

export const projectSeo = (project) => {
  const path = `/project/${slugify(project.title)}`
  const projectContext = [project.role, project.client || project.venue, project.year]
    .filter(Boolean)
    .join(', ')
  const fallbackDescription = `${project.title} project by ${site.name}${projectContext ? `: ${projectContext}.` : '.'}`
  const description = clampDescription(project.summary || fallbackDescription)
  const image = firstImageForProject(project)

  return {
    title: `${project.title} | ${site.name}`,
    description,
    path,
    image,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description,
      url: absoluteUrl(path),
      image: absoluteUrl(image),
      dateCreated: project.year,
      genre: project.sectionTitle,
      creator: {
        '@type': 'Person',
        name: site.name,
        url: site.url,
      },
      client: project.client
        ? {
            '@type': 'Organization',
            name: project.client,
          }
        : undefined,
    },
  }
}

export const metaForRoute = (route) => {
  if (route.name === 'project-detail') {
    const project = findProjectBySlug(route.params.slug)

    if (project) {
      return projectSeo(project)
    }

    return pageMeta['not-found']
  }

  return pageMeta[route.name] ?? pageMeta.home
}

const ensureTag = (selector, createTag) => {
  const existing = document.head.querySelector(selector)

  if (existing) {
    return existing
  }

  const tag = createTag()
  document.head.append(tag)
  return tag
}

const setMeta = (attribute, key, content) => {
  const selector = `meta[${attribute}="${key}"]`
  const tag = ensureTag(selector, () => {
    const element = document.createElement('meta')
    element.setAttribute(attribute, key)
    return element
  })

  tag.setAttribute('content', content)
}

export const applySeo = (meta) => {
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(meta.image ?? DEFAULT_IMAGE)
  const type = meta.type ?? 'website'

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow')
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:type', type)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:image', image)
  setMeta('property', 'og:site_name', site.name)
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setMeta('name', 'twitter:image', image)

  const canonical = ensureTag('link[rel="canonical"]', () => {
    const element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    return element
  })
  canonical.setAttribute('href', url)

  const structuredData = ensureTag('script[data-seo-json-ld]', () => {
    const element = document.createElement('script')
    element.type = 'application/ld+json'
    element.dataset.seoJsonLd = 'true'
    return element
  })

  if (meta.jsonLd) {
    structuredData.textContent = JSON.stringify(meta.jsonLd)
  } else {
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      url: site.url,
      jobTitle: site.title,
      email: site.email,
      sameAs: site.socials.map((social) => social.href),
    })
  }
}
