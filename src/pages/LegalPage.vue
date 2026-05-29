<script setup>
import { site } from '../data/content'
</script>

<template>
  <section class="shell content-page legal-page">
    <div class="content-page-heading">
      <p class="eyebrow">{{ site.name }}</p>
      <h1>Legal</h1>
      <p class="content-page-lede">
        Privacy policy placeholder for {{ site.name }}.
      </p>
    </div>

    <div class="content-panel markdown-body">
      <h2>Privacy Policy</h2>
      <p>
        This is a placeholder privacy policy. Replace this text with the final policy before collecting personal
        information, analytics data, form submissions, or other visitor details.
      </p>
      <p>
        As a baseline, this site should only collect information intentionally provided by visitors, such as details
        submitted through a contact form or email link. Any future analytics, cookies, embedded services, or third-party
        tools should be described here before they are enabled.
      </p>
      <p>
        For privacy questions, contact <a :href="`mailto:${site.email}`">{{ site.email }}</a>.
      </p>
    </div>
  </section>
</template>
