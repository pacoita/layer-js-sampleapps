<template>
  <input class="message-textarea" placeholder="Enter a message..."
          @keyup.enter="sendMessage" v-model="message"></input>
</template>

<script>
export default {
  props: ['conversation'],

  data: function () {
    return {
      message: null
    }
  },

  methods: {
    sendMessage: function () {
      if (!this.message) return
      this.conversation.createMessage(this.message.trim()).send()
      this.message = ''
    }
  }
}
