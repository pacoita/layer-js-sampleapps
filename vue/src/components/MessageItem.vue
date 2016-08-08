<template>
  <div class="message-item">
    <div class="avatar-image"><img :src="message.sender.avatarUrl" /></div>
    <div class="message-content">
      <span class="name">{{ message.sender.displayName }}</span>
      <div class="message-parts">
        <div class="bubble text" v-for="part in message.parts">{{ part.body }}</div>
      </div>
    </div>
    <div class="timestamp">
      {{ timestamp }}
      <span class="message-status"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],

  computed: {
    timestamp: function () {
      return window.layerSample.dateFormat(this.message.sentAt)
    },
    status: function () {
      switch (this.message.readStatus) {
        case 'NONE':
          return 'unread';
        case 'SOME':
          return 'read by some';
        case 'ALL':
          return 'read';
        default:
          return 'unread';
      }
    }
  }
}
</script>
