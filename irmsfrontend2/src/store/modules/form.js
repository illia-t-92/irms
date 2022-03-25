import axios from 'axios'
import router from '@/router'

const getDefaultState = () => {
  return {
    addingRecord: false,
    isValid: false,
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
    },
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
  validate (state, status ) {
    state.isValid = status
  },
  setAddingRecord (state, value) {
    state.addingRecord = value
  }
}

const getters = {
    item: (state) => state.item,
    addingRecord: (state) => state.addingRecord
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
    async saveData ({ commit, dispatch }) {
      let payload = JSON.stringify(state.item)
      record_uuid = router.currentRoute.params.record_uuid
      await axios.put(`/api/v1/return-record/${record_uuid}/detail`, payload , 
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(() => {
                    store.commit('alert/showAlert', {
                        alertType: 'success',
                        alertMessages: ['Data saved correctly']
                    })
                    
                })
                .catch(error =>{
                    console.log(error)
                      store.commit('alert/showAlert', {
                        alertType: 'error',
                        alertMessages: ['Something went wrong']
                    })
                })
        dispatch('loadRecordFromAPI')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
