<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
})

const form = reactive({
  name: '',
  replyTo: '',
  subject: '',
  message: '',
})

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(form.subject || 'Portfolio inquiry')
  const body = encodeURIComponent(
    [
      `Name: ${form.name || 'Not provided'}`,
      `Reply-to: ${form.replyTo || 'Not provided'}`,
      '',
      form.message || 'Add your message here.',
    ].join('\n'),
  )

  return `mailto:${props.email}?subject=${subject}&body=${body}`
})
</script>

<template>
  <form class="contact-form" :action="mailtoHref" method="post" @submit.prevent>
    <label>
      <span>Name</span>
      <input v-model="form.name" type="text" name="name" placeholder="Your name" />
    </label>
    <label>
      <span>Email</span>
      <input v-model="form.replyTo" type="email" name="replyTo" placeholder="you@example.com" />
    </label>
    <label>
      <span>Subject</span>
      <input v-model="form.subject" type="text" name="subject" placeholder="Project inquiry" />
    </label>
    <label class="message-field">
      <span>Message</span>
      <textarea v-model="form.message" name="message" rows="6" placeholder="What's on your mind?"></textarea>
    </label>
    <div class="contact-actions">
      <a class="button button-primary" :href="mailtoHref">Open mail app</a>
      <a class="button button-secondary" :href="`mailto:${email}`">Direct email</a>
    </div>
  </form>
</template>
