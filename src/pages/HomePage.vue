<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import PortfolioSidebar from '../components/PortfolioSidebar.vue'
import ProjectSection from '../components/ProjectSection.vue'
import LightboxViewer from '../components/LightboxViewer.vue'
import ContactForm from '../components/ContactForm.vue'
import { heroSlides, sections, site } from '../data/content'

const displaySections = computed(() => {
  const order = ['productions', 'engineering']

  return order.map((sectionId) => sections.find((section) => section.id === sectionId)).filter(Boolean)
})

const lightboxOpen = ref(false)
const lightboxItems = ref([])
const lightboxIndex = ref(0)
const activeProjectSlug = ref('')
const activeSectionId = ref('')
const sidebarVisible = ref(false)
const sidebarState = reactive({
  productions: false,
  engineering: false,
})

let heroObserver
let scrollFrame = 0

function openLightbox(items, index) {
  lightboxItems.value = items
  lightboxIndex.value = index
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function toggleSection(sectionId) {
  sidebarState[sectionId] = !sidebarState[sectionId]
}

function updateSidebarVisibility() {
  const hero = document.querySelector('.hero-stage')

  if (!hero) {
    sidebarVisible.value = true
    return
  }

  sidebarVisible.value = hero.getBoundingClientRect().bottom <= 1
}

function updateActiveProject() {
  const cards = [...document.querySelectorAll('[data-project-id]')]
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0
  const targetLine = Math.min(Math.max(headerHeight + 90, viewportHeight * 0.18), viewportHeight * 0.36)
  const measuredCards = cards.map((card) => {
    const rect = card.getBoundingClientRect()

    return {
      card,
      rect,
      visibleHeight: Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0),
    }
  })

  const activeCard = measuredCards.find(({ rect }) => rect.top <= targetLine && rect.bottom > targetLine)?.card
    || measuredCards
      .filter(({ visibleHeight }) => visibleHeight > 0)
      .sort((left, right) => Math.abs(left.rect.top - targetLine) - Math.abs(right.rect.top - targetLine))[0]?.card

  if (!activeCard) {
    activeProjectSlug.value = ''
    activeSectionId.value = ''
    return
  }

  activeProjectSlug.value = activeCard.dataset.projectId || ''
  activeSectionId.value = activeCard.dataset.sectionId || ''
}

function handleHomeScroll() {
  if (scrollFrame) {
    return
  }

  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0
    updateSidebarVisibility()
    updateActiveProject()
  })
}

function bindHeroObserver() {
  const hero = document.querySelector('.hero-stage')

  if (!hero) {
    sidebarVisible.value = true
    return
  }

  heroObserver = new IntersectionObserver(([entry]) => {
    sidebarVisible.value = !entry.isIntersecting && hero.getBoundingClientRect().bottom <= 1
  })

  heroObserver.observe(hero)
}

onMounted(async () => {
  await nextTick()
  handleHomeScroll()
  window.addEventListener('scroll', handleHomeScroll, { passive: true })
  window.addEventListener('resize', handleHomeScroll)
  bindHeroObserver()
})

onBeforeUnmount(() => {
  heroObserver?.disconnect()
  window.removeEventListener('scroll', handleHomeScroll)
  window.removeEventListener('resize', handleHomeScroll)

  if (scrollFrame) {
    window.cancelAnimationFrame(scrollFrame)
  }
})
</script>

<template>
  <div class="home-page">
    <HeroCarousel :slides="heroSlides" />

    <transition name="sidebar-reveal">
      <PortfolioSidebar
        v-if="sidebarVisible"
        :sections="displaySections"
        :active-section-id="activeSectionId"
        :active-project-slug="activeProjectSlug"
        :open-sections="sidebarState"
        @toggle-section="toggleSection"
      />
    </transition>

    <!-- <section class="shell intro-band" id="about">
      <div class="intro-copy">
        <p class="eyebrow">Portfolio</p>
        <h2>Clean, composed, and built to grow with the work.</h2>
        <p>
          {{ site.bio }}
        </p>
      </div>
      <div class="intro-aside">
        <p class="eyebrow">Focus</p>
        <ul>
          <li>Engineering that stays legible under pressure</li>
          <li>Production work with a quiet, professional finish</li>
          <li>Media collections that can accept more items without layout changes</li>
        </ul>
      </div>
    </section> -->

    <section
      v-for="section in displaySections"
      :id="section.id"
      :key="section.id"
      class="shell project-section"
    >
      <div class="section-heading">
        <div>
          <p class="eyebrow">{{ section.eyebrow }}</p>
          <h2>{{ section.title }}</h2>
        </div>
        <p class="section-description">{{ section.description }}</p>
      </div>

      <div class="project-grid">
        <ProjectSection
          v-for="project in section.projects"
          :key="project.title"
          :project="project"
          :section-id="section.id"
          @open-image="openLightbox($event.items, $event.index)"
        />
      </div>
    </section>

    <section class="shell contact-section" id="contact">
      <div class="section-heading contact-heading">
        <div>
          <h2>Contact Me</h2>
        </div>
        <p class="section-description">
          Use the form for project inquiries, collaboration, or production questions. It opens your mail client with the details prefilled.
        </p>
      </div>
      <ContactForm :email="site.email" />
    </section>

    <LightboxViewer
      :open="lightboxOpen"
      :items="lightboxItems"
      :start-index="lightboxIndex"
      @close="closeLightbox"
    />
  </div>
</template>
