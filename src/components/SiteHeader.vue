<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { projectAnchor, sections, site } from '../data/content'

const route = useRoute()
const menuOpen = ref(false)
const mobileSectionsOpen = reactive({
  productions: true,
  engineering: false,
})

const menuSections = computed(() => {
  const order = ['productions', 'engineering']

  return order.map((sectionId) => sections.find((section) => section.id === sectionId)).filter(Boolean)
})

function closeMenu() {
  menuOpen.value = false
}

function toggleMobileSection(sectionId) {
  mobileSectionsOpen[sectionId] = !mobileSectionsOpen[sectionId]
}
</script>

<template>
  <header class="site-header" :class="{ 'menu-open': menuOpen }">
    <div class="shell header-inner">
      <RouterLink class="brand" to="/" @click="closeMenu">
        <img class="brand-mark" src="/image_resources/t-logo%20(1).png" alt="Todd Rylaarsdam logo" />
        <div>
          <span class="brand-name">{{ site.name }}</span>
        </div>
      </RouterLink>

      <nav class="site-nav" aria-label="Primary navigation">
        <RouterLink :class="['nav-link', { active: route.path === '/about' }]" to="/about">About</RouterLink>
        <RouterLink :class="['nav-link', { active: route.path === '/resume' }]" to="/resume">Resume</RouterLink>
        <a class="nav-link nav-link-cta" href="/#contact">Contact</a>
      </nav>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        aria-label="Open navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <transition name="mobile-menu">
      <nav v-if="menuOpen" id="mobile-menu" class="mobile-menu shell" aria-label="Mobile navigation">
        <div class="mobile-menu-primary">
          <RouterLink :class="['mobile-link', { active: route.path === '/' }]" to="/" @click="closeMenu">Home</RouterLink>
          <RouterLink :class="['mobile-link', { active: route.path === '/about' }]" to="/about" @click="closeMenu">About</RouterLink>
          <RouterLink :class="['mobile-link', { active: route.path === '/resume' }]" to="/resume" @click="closeMenu">Resume</RouterLink>
          <a class="mobile-link mobile-link-cta" href="/#contact" @click="closeMenu">Contact</a>
        </div>

        <div
          v-for="section in menuSections"
          :key="section.id"
          class="mobile-menu-section"
        >
          <button
            class="mobile-menu-section-toggle"
            type="button"
            :aria-expanded="mobileSectionsOpen[section.id]"
            @click="toggleMobileSection(section.id)"
          >
            <span>{{ section.title }}</span>
            <svg viewBox="0 0 20 20" aria-hidden="true" class="sidebar-chevron">
              <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
            </svg>
          </button>

          <div v-show="mobileSectionsOpen[section.id]" class="mobile-project-links">
            <RouterLink
              v-for="project in section.projects"
              :key="project.title"
              class="mobile-project-link"
              :to="{ path: '/', hash: projectAnchor(project.title) }"
              @click="closeMenu"
            >
              {{ project.title }}
            </RouterLink>
          </div>
        </div>
      </nav>
    </transition>
  </header>
</template>
