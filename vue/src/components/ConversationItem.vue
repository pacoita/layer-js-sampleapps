<template>
  <div class="avatar-image cluster">
    <span v-for="participant in conversation.participants">
      <img :src="participant.avatarUrl" />
    </span>
  </div>
  <div class="info">
    <div class="main">
      <span class="title">{{ title }}</span>
      <span class="delete fa fa-times-circle" @click.prevent="deleteConversation(conversation)" title="Delete conversation"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['conversation'],

  computed: {
    title: function () {
      return this.conversation.metadata.title || (
        this.conversation.participants
          .filter((user) => !user.sessionOwner)
          .map((user) => user.displayName)
      )
    }
  },

  methods: {
    deleteConversation: function () {
      // TODO
    }
  }
}
</script>
