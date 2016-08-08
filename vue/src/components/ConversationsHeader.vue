<template>
  <div class="title">{{ title }}</div>
  <a href='#conversations/new' class='create-conversation' title="Create a new conversation">
    <i class="icon fa fa-pencil-square-o"></i>
  </a>
</template>

<script>
import store from '../store'

export default {
  data: function () {
    return {
      title: `${store.client.user.displayName}'s Conversations`
    }
  }
}
</script>
