<template>
  <div class="panel-header conversations-header">
    <conversations-header></conversations-header>
  </div>
  <div class="conversation-list" >
    <a v-for="conversation in conversations" href="#{{ conversation.id.substr(8) }}" class="conversation-item">
      <conversation-item :conversation="conversation"></conversation-item>
    </a>
  </div>
</template>

<script>
import store from '../store'

import ConversationsHeader from '../components/ConversationsHeader.vue'
import ConversationItem from '../components/ConversationItem.vue'

export default {
  components: {
    ConversationsHeader,
    ConversationItem
  },

  data: function () {
    return store.state
  }
}
</script>
