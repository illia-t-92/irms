
const state = () => ({
    alert: {
      status: false,
      type: '',
      messages: [],
    }
  })
  
const mutations= {
    showAlert (state, data) {
      state.alert = {
        status: true,
        type: data.alertType,
        messages: data.alertMessages
      }
    },
    dismissAlert (state) {
      state.alert.status=false
    },
  }

const getters = {
  }

const actions = {
  }

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
