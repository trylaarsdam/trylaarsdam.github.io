<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import { site } from './data/content'
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main>
      <RouterView />
    </main>
    <footer class="site-footer">
      <div class="shell footer-grid">
        <div>
          <p class="eyebrow">Contact</p>
          <a class="footer-link" :href="`mailto:${site.email}`">{{ site.email }}</a>
        </div>
        <div>
          <p class="eyebrow">Resources</p>
          <div class="footer-links">
            <RouterLink class="footer-link" to="/about">About</RouterLink>
            <RouterLink class="footer-link" to="/resume">Resume</RouterLink>
            <RouterLink class="footer-link" to="/legal">Legal</RouterLink>
          </div>
        </div>
        <div>
          <p class="eyebrow">Socials</p>
          <div class="footer-links">
            <a
              v-for="social in site.socials.filter((item) => item.label !== 'Resume PDF')"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noreferrer"
            >
              {{ social.label }}
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
