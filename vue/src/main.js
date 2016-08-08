/* global layer */
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import Conversations from './containers/Conversations.vue'
import Empty from './containers/Empty.vue'
import ConversationView from './containers/ConversationView.vue'
import NewConversation from './containers/NewConversation.vue'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    name: 'empty',
    component: Empty
  },
  '/conversations/:id': {
    name: 'conversation',
    component: ConversationView
  },
  '/conversations/new': {
    name: 'conversation-new',
    component: NewConversation
  }
})

/**
 * Wait for identity dialog message to complete
 */
window.addEventListener('message', function (evt) {
  if (evt.data !== 'layer:identity') return

  /**
   * Initialize Layer Client with `appId`
   */
  const client = new layer.Client({
    appId: window.layerSample.appId
  })

  /**
   * Client authentication challenge.
   * Sign in to Layer sample identity provider service.
   *
   * See http://static.layer.com/sdk/docs/#!/api/layer.Client-event-challenge
   */
  client.once('challenge', (e) => {
    window.layerSample.challenge(e.nonce, e.callback)
  })

  /**
   * Start authentication.
   */
  client.connect(window.layerSample.userId)

  /**
   * Client ready.
   */
  client.once('ready', function () {
    // Initialize store
    store.init(client)

    // Start router
    router.start(Vue.extend({
      components: {
        Conversations
      }
    }), '.main-app')
  })
})
