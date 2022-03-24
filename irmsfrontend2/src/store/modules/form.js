import axios from 'axios'
import router from '@/router'

const getDefaultState = () => {
  return {
    item: {
      return_id: '',
      operation_date: '',
      amount: '',
      order_id: '',
      customer_name: '',
      customer_surname: '',
      customer_PID: '',
      customer_account: '',
      payment_details: '',
      status: '',
      comments: '',
      brand: '',
    }
  }
}

const state = getDefaultState()
  
const mutations= {
  changeFieldValue (state, payload) {
    state.item[payload.field] = payload.value
  },
  loadItem (state, value) {
    state.item = value
  },
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
}

const getters = {
    item: (state) => state.item
  }

const actions = {
    async loadRecordFromAPI ({ commit }) {
      return axios.get(`/api/v1/return-record/${router.currentRoute.params.record_uuid}/detail`)
        .then(response =>{
            commit('loadItem', response.data)

        })
        .catch(error =>{
            console.log(error)
        })
    },
    async saveData ({ commit }) {

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
