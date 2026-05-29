<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import LightboxViewer from '../components/LightboxViewer.vue'
import MediaGrid from '../components/MediaGrid.vue'
import { buildProjectMarkdown, projectMediaItems, sections, slugify } from '../data/content'

const route = useRoute()
const markdown = new MarkdownIt({ html: true, linkify: true, breaks: true })

const project = computed(() =>
  sections
    .flatMap((section) => section.projects)
    .find((item) => slugify(item.title) === route.params.slug),
)

const projectImages = computed(() => (project.value ? projectMediaItems(project.value, 'projectImages') : []))
const coverImage = computed(() => projectImages.value.find((item) => item.type === 'image'))
const detailImages = computed(() => projectImages.value.filter((item) => item.type === 'image'))

const markdownHtml = computed(() => (project.value ? markdown.render(buildProjectMarkdown(project.value)) : ''))
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const backTarget = computed(() => ({
  path: '/',
  hash: typeof route.query.from === 'string' ? route.query.from : '',
}))

function openLightbox(index) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}
</script>

<template>
  <section class="shell project-detail-page">
    <div v-if="project" class="project-detail-layout">
      <header class="project-detail-hero">
        <RouterLink class="project-detail-back" :to="backTarget" aria-label="Back to portfolio">
          <svg viewBox="0 0 20 20" aria-hidden="true" class="project-detail-back-icon">
            <path d="M12.5 4.5 7 10l5.5 5.5M7.5 10H17" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
          </svg>
          <span>Back to portfolio</span>
        </RouterLink>

        <div class="project-detail-copy">
          <p v-if="project.year" class="eyebrow">{{ project.year }}</p>
          <h1>{{ project.title }}</h1>
          <dl class="project-fields">
            <div v-if="project.role" class="project-field">
              <dt>Role(s)</dt>
              <dd>{{ project.role }}</dd>
            </div>
            <div v-if="project.client" class="project-field">
              <dt>Client</dt>
              <dd>{{ project.client }}</dd>
            </div>
          </dl>
          <p class="project-detail-summary">{{ project.summary }}</p>
        </div>

        <figure v-if="coverImage" class="project-detail-figure">
          <img :src="coverImage.src" :alt="coverImage.alt" fetchpriority="high" decoding="async" />
        </figure>
      </header>

      <article
        v-if="markdownHtml"
        class="project-detail-markdown markdown-body"
        v-html="markdownHtml"
      ></article>

      <section v-if="projectImages.length" class="project-detail-gallery">
        <MediaGrid
          :items="projectImages"
          :title="project.title"
          @open-image="openLightbox"
        />
      </section>

      <LightboxViewer
        :open="lightboxOpen"
        :items="detailImages"
        :start-index="lightboxIndex"
        @close="lightboxOpen = false"
      />
    </div>

    <div v-else class="project-detail-empty">
      <p class="eyebrow">Project not found</p>
      <h1>That project page is unavailable.</h1>
    </div>
  </section>
</template>
