<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
  startIndex: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['close'])

const currentIndex = ref(0)
const controlsOnLightImage = ref(false)

const currentItem = computed(() => props.items[currentIndex.value] ?? {})

function stopEvent(event) {
  event.stopPropagation()
}

function close() {
  emit('close')
}

function previous() {
  if (!props.items.length) {
    return
  }

  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
}

function next() {
  if (!props.items.length) {
    return
  }

  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

function handleKeydown(event) {
  if (!props.open) {
    return
  }

  if (event.key === 'Escape') {
    close()
  } else if (event.key === 'ArrowLeft') {
    previous()
  } else if (event.key === 'ArrowRight') {
    next()
  }
}

function sampleImageLuminance(src) {
  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const size = 24
        canvas.width = size
        canvas.height = size
        const context = canvas.getContext('2d', { willReadFrequently: true })

        if (!context) {
          resolve(false)
          return
        }

        context.drawImage(image, 0, 0, size, size)
        const { data } = context.getImageData(0, 0, size, size)
        let total = 0

        for (let index = 0; index < data.length; index += 4) {
          total += data[index] * 0.2126 + data[index + 1] * 0.7152 + data[index + 2] * 0.0722
        }

        resolve(total / (data.length / 4) > 165)
      } catch {
        resolve(false)
      }
    }

    image.onerror = () => resolve(false)
    image.src = src
  })
}

watch(
  () => [props.open, props.startIndex, props.items.length],
  () => {
    currentIndex.value = props.items.length
      ? Math.min(Math.max(props.startIndex, 0), props.items.length - 1)
      : 0
  },
  { immediate: true },
)

watch(
  () => [props.open, currentItem.value.src],
  async ([isOpen, src]) => {
    document.body.classList.toggle('lightbox-open', isOpen)

    if (isOpen && src) {
      controlsOnLightImage.value = await sampleImageLuminance(src)
    }
  },
  { immediate: true },
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('lightbox-open')
})
</script>

<template>
  <teleport to="body">
    <div v-if="open && items.length" class="lightbox-backdrop" @click="close">
      <div class="lightbox-panel" @click="stopEvent">
        <button
          :class="['lightbox-icon-button', { 'controls-on-light': controlsOnLightImage }]"
          class="lightbox-close"
          type="button"
          aria-label="Close lightbox"
          @click="close"
        >
          <svg viewBox="0 0 20 20" class="lightbox-icon" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.9" />
          </svg>
        </button>
        <button
          :class="['lightbox-icon-button', 'lightbox-nav', 'lightbox-prev', { 'controls-on-light': controlsOnLightImage }]"
          type="button"
          aria-label="Previous image"
          @click="previous"
        >
          <svg viewBox="0 0 20 20" class="lightbox-icon" aria-hidden="true">
            <path d="M12 4l-6 6 6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9" />
          </svg>
        </button>
        <button
          :class="['lightbox-icon-button', 'lightbox-nav', 'lightbox-next', { 'controls-on-light': controlsOnLightImage }]"
          type="button"
          aria-label="Next image"
          @click="next"
        >
          <svg viewBox="0 0 20 20" class="lightbox-icon" aria-hidden="true">
            <path d="M8 4l6 6-6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9" />
          </svg>
        </button>

        <figure class="lightbox-figure">
          <img :src="currentItem.src" :alt="currentItem.alt" />
          <figcaption>{{ currentItem.alt }}</figcaption>
        </figure>

        <div class="lightbox-actions">
          <a class="button button-primary" :href="currentItem.src" :download="currentItem.downloadName || ''">
            Download image
          </a>
        </div>
      </div>
    </div>
  </teleport>
</template>
