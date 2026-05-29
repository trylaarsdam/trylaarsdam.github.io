<script setup>
import { site } from '../data/content'

const resumeUrl = '/text_resources/resume.pdf'
</script>

<template>
  <section class="shell resume-page">
    <div class="resume-heading">
      <p class="eyebrow">{{ site.name }}</p>
      <h1>Resume</h1>
    </div>

    <iframe class="resume-frame" :src="resumeUrl" title="Todd Rylaarsdam resume PDF"></iframe>
  </section>
</template>
