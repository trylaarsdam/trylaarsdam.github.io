<script setup>
import { RouterLink } from 'vue-router'
import { projectAnchor, slugify } from '../data/content'

const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
  activeSectionId: {
    type: String,
    default: '',
  },
  activeProjectSlug: {
    type: String,
    default: '',
  },
  openSections: {
    type: Object,
    default: () => ({}),
  },
})

defineEmits(['toggle-section'])

function sectionOpen(sectionId) {
  return Boolean(props.openSections[sectionId] || props.activeSectionId === sectionId)
}
</script>

<template>
  <aside class="portfolio-sidebar" aria-label="Portfolio navigation">
    <div
      v-for="section in sections"
      :key="section.id"
      class="sidebar-section"
      :class="{ open: sectionOpen(section.id), active: activeSectionId === section.id }"
    >
      <button
        class="sidebar-section-toggle"
        type="button"
        :aria-expanded="sectionOpen(section.id)"
        @click="$emit('toggle-section', section.id)"
      >
        <span>{{ section.title }}</span>
        <svg viewBox="0 0 20 20" aria-hidden="true" class="sidebar-chevron">
          <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
        </svg>
      </button>

      <transition name="sidebar-collapse">
        <div v-show="sectionOpen(section.id)" class="sidebar-projects">
          <RouterLink
            v-for="project in section.projects"
            :key="project.title"
            class="sidebar-project-link"
            :class="{ active: activeProjectSlug === slugify(project.title) }"
            :to="{ path: '/', hash: projectAnchor(project.title) }"
          >
            {{ project.title }}
          </RouterLink>
        </div>
      </transition>
    </div>
  </aside>
</template>
