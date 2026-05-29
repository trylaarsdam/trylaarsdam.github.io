<script setup>
import { RouterLink } from 'vue-router'
import MediaGrid from './MediaGrid.vue'
import { projectMediaItems, projectRoute } from '../data/content'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

defineEmits(['open-image'])

const homeMediaItems = projectMediaItems(props.project, 'homeImages')
const imageItems = homeMediaItems.filter((item) => item.type === 'image')
</script>

<template>
  <div class="project-card-inner">
    <div class="project-meta">
      <p v-if="project.year" class="project-year">{{ project.year }}</p>
      <h3>{{ project.title }}</h3>
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
      <p v-if="project.description || project.summary" class="project-summary">
        {{ project.description || project.summary }}
      </p>
    </div>

    <div class="project-actions">
      <RouterLink class="button button-secondary" :to="projectRoute(project.title)">
        Learn more
      </RouterLink>
    </div>

    <MediaGrid
      v-if="homeMediaItems.length"
      :items="homeMediaItems"
      :title="project.title"
      @open-image="$emit('open-image', { items: imageItems, index: $event })"
    />
  </div>
</template>
