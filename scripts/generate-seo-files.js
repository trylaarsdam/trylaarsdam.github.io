import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects, absoluteUrl } from '../src/utils/seo.js'
import { slugify } from '../src/data/content.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const publicDir = resolve(root, 'public')

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.7' },
  { path: '/resume', priority: '0.7' },
  ...projects.map((project) => ({
    path: `/project/${slugify(project.title)}`,
    priority: '0.8',
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`

await mkdir(publicDir, { recursive: true })
await writeFile(resolve(publicDir, 'sitemap.xml'), sitemap)
await writeFile(resolve(publicDir, 'robots.txt'), robots)
