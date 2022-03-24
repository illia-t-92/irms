import axios from 'axios'
import router from '@/router'

const state = () => ({
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
})
  
const mutations= {
  changeFieldValue (state, {field, value}) {
    state.item[field] = value
  },
  loadItem (state, value) {
    state.item = value
  }
    
}

const getters = {
    item: (state) => state.item
  }

const actions = {
    async loadRecordFromAPI ({ commit }) {
      return axios.get(`/api/v1/return-record/${router.currentRoute.params.record_uuid}/detail`)
        .then(response =>{
            commit('loadItem', response.data)
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
