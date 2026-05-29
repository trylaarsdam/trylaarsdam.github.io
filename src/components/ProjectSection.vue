<script setup>
import ProjectCard from './ProjectCard.vue'
import { projectAnchor, slugify } from '../data/content'

defineProps({
  project: {
    type: Object,
    required: true,
  },
  sectionId: {
    type: String,
    default: '',
  },
})

defineEmits(['open-image'])
</script>

<template>
  <article
    :id="projectAnchor(project.title).slice(1)"
    :data-project-id="slugify(project.title)"
    :data-section-id="sectionId"
    class="project-card"
  >
    <ProjectCard :project="project" @open-image="$emit('open-image', $event)" />
  </article>
</template>
