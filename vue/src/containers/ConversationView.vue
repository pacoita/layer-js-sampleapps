<template>
  <div class='conversation-header panel-header'></div>
  <div class="message-list" v-for="message in messages">
    <message-item :message="message"></message-item>
  </div>
  <div class='typing-indicator-panel'></div>
  <div class="message-composer">
    <compose-message :conversation="activeConversation"></compose-message>
  </div>
</template>

<script>
import store from '../store'
import MessageItem from '../components/MessageItem.vue'
import ComposeMessage from '../components/ComposeMessage.vue'

export default {
  components:{
    MessageItem,
    ComposeMessage
  },

  data: function () {
    return store.state
  },

  route: {
    data: function () {
      store.conversationSelected(this.$route.params.id)
    }
  }
}
</script>
