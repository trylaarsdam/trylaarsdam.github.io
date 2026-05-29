<script setup>
import { computed } from 'vue'
import { normalizeMediaItem } from '../data/content'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: 'Project',
  },
})

defineEmits(['open-image'])

const mediaItems = computed(() => props.items.map((item, index) => normalizeMediaItem(item, index, props.title)))
const imageItems = computed(() => mediaItems.value.filter((item) => item.type === 'image'))
</script>

<template>
  <div class="media-grid">
    <template v-for="(item, index) in mediaItems" :key="`${item.type}-${item.src}-${index}`">
      <button
        v-if="item.type === 'image'"
        class="media-tile media-image"
        type="button"
        @click="$emit('open-image', imageItems.findIndex((mediaItem) => mediaItem.src === item.src))"
      >
        <img :src="item.src" :alt="item.alt" loading="lazy" decoding="async" />
        <span class="media-caption" aria-hidden="true">
          <svg viewBox="0 0 20 20" class="media-fullscreen-icon">
            <path d="M6 3H3v3M14 3h3v3M3 14v3h3M17 14v3h-3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
          </svg>
        </span>
        <span class="sr-only">Open fullscreen image</span>
      </button>

      <div v-else-if="item.type === 'embed'" class="media-tile media-embed">
        <iframe
          v-if="item.provider === 'youtube' || item.provider === 'drive'"
          :src="item.src"
          :title="item.title"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <a v-else class="embed-fallback" :href="item.src" target="_blank" rel="noreferrer">
          Open embedded media
        </a>
      </div>
    </template>
  </div>
</template>
