import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import EventService from '@/services/EventService'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    user: 'Adam Jahr',
    events: [],
    totalEvents: 0,
    event: null
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, response) {
      state.events = response.data
      state.totalEvents = response.headers['x-total-count']
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          commit('SET_EVENT', event)
        })
        .catch(error => {
          throw error
        })
    },
    fetchEvents({ commit }, { perPage, currentPage }) {
      return EventService.getEvents(perPage, currentPage)
        .then(response => {
          commit('SET_EVENTS', response)
        })
        .catch(error => {
          throw error
        })
    },
    fetchEvent({ state, commit }, id) {
      const event = state.events.find(event => event.id === id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        return EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            throw error
          })
      }
    }
  }
})
