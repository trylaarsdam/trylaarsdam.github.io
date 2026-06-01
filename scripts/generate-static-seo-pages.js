import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects, projectSeo, absoluteUrl } from '../src/utils/seo.js'
import { slugify } from '../src/data/content.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')

const escapeAttribute = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const metaTag = (attribute, key, content) =>
  `    <meta ${attribute}="${key}" content="${escapeAttribute(content)}">`

const stripGeneratedSeo = (html) =>
  html
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta\b(?=[^>]*(?:name|property)="(?:description|robots|og:site_name|og:type|og:title|og:description|og:image|og:url|twitter:card|twitter:title|twitter:description|twitter:image)")[^>]*>\n?/g, '')
    .replace(/\s*<link rel="canonical"[^>]*>\n?/g, '')
    .replace(/\s*<script type="application\/ld\+json" data-static-seo>[\s\S]*?<\/script>\n?/g, '')

const renderSeoHead = (meta) => {
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(meta.image)

  return [
    `    <title>${escapeAttribute(meta.title)}</title>`,
    metaTag('name', 'description', meta.description),
    metaTag('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow'),
    metaTag('property', 'og:site_name', 'Todd Rylaarsdam'),
    metaTag('property', 'og:type', meta.type ?? 'website'),
    metaTag('property', 'og:title', meta.title),
    metaTag('property', 'og:description', meta.description),
    metaTag('property', 'og:image', image),
    metaTag('property', 'og:url', url),
    metaTag('name', 'twitter:card', 'summary_large_image'),
    metaTag('name', 'twitter:title', meta.title),
    metaTag('name', 'twitter:description', meta.description),
    metaTag('name', 'twitter:image', image),
    `    <link rel="canonical" href="${escapeAttribute(url)}">`,
    `    <script type="application/ld+json" data-static-seo>${JSON.stringify(meta.jsonLd)}</script>`,
  ].join('\n')
}

const baseHtml = await readFile(resolve(distDir, 'index.html'), 'utf8')
const cleanHtml = stripGeneratedSeo(baseHtml)

await Promise.all(
  projects.map(async (project) => {
    const slug = slugify(project.title)
    const html = cleanHtml.replace('</head>', `${renderSeoHead(projectSeo(project))}\n  </head>`)
    const projectDir = resolve(distDir, 'project', slug)

    await mkdir(projectDir, { recursive: true })
    await writeFile(resolve(projectDir, 'index.html'), html)
  }),
)

await writeFile(resolve(distDir, '404.html'), baseHtml)
