/* global layer */

export default {
  /**
   * Application state
   */
  state: {
    activeConversation: null,
    conversations: [],
    messages: []
  },
  /**
   * Store initialization
   *
   * @param {Object} client - Layer WebSDK client instance
   */
  init: function (client) {
    this.client = client

    /**
     * Create the Conversation List Query
     */
    this.conversationQuery = this.client.createQuery({
      model: layer.Query.Conversation
    })

    /**
     * Create the Message List Query
     */
    this.messagesQuery = this.client.createQuery({
      model: layer.Query.Message,
      paginationWindow: 30
    })

    /**
     * Create Announcements Query
     */
    this.announcementsQuery = client.createQuery({
      model: layer.Query.Announcement,
      paginationWindow: 30
    })

    /**
     * Create Identity List Query
     */
    this.identityQuery = client.createQuery({
      model: layer.Query.Identity
    })

    /**
     * Any time a query data changes we should rerender.  Data changes when:
     *
     * * The Query data has loaded from the server
     * * A new Conversation/Message is created and added to the results
     * * A Conversation/Message is deleted and removed from the results
     * * Any properties of objects in the results have changed
     *
     * See http://static.layer.com/sdk/docs/#!/api/layer.Query
     */
    this.conversationQuery.on('change', () => {
      this.state.conversations = this.conversationQuery.data
    })
    this.messagesQuery.on('change', (e) => {
      switch (e.type) {
        case 'data':
        case 'property':
          // create a copy and reverse order
          this.state.messages = this.messagesQuery.data.concat([]).reverse()
          break
      }
    })
    this.identityQuery.on('change', (e) => {
      if (e.type === 'data') window.layerSample.validateSetup(client)

      // identityQuery.data;
    })
  },
  /**
   * Conversation selected from URL route
   *
   * @param {String} uuid - Conversation UUID
   */
  conversationSelected: function (uuid) {
    this.activeConversationId = `layer:///conversations/${uuid}`
    this.state.activeConversation = this.client.getConversation(this.activeConversationId, true)

    // Update the Message Query to load the new Conversation
    this.messagesQuery.update({
      predicate: 'conversation.id = "' + this.activeConversationId + '"'
    })
  }
}
