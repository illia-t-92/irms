import axios from 'axios'
import router from '@/router'

const getDefaultState = () => {
  return {
    addingRecord: false,
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

      let payload = JSON.stringify(state.item);
      let params={
        method: 'post',
        url: '/api/v1/records-list/',
        header: {
          'Content-Type' :'application/json'
        },
        data: payload
      }

      if (!state.addingRecord) {
        let record_uuid = router.currentRoute.params.record_uuid;
        params.url = `/api/v1/return-record/${record_uuid}/detail`
        params.method = 'put'
      } 

      await axios({...params}).then(
        () => {
          commit('alert/showAlert', {
            alertType: 'success',
            alertMessages: ['Data saved correctly']
          }, {root:true})
        }
      ).catch(
        (error) => {
          console.log(error)
          commit('alert/showAlert', {
            alertType: 'error',
            alertMessages: ['Something went wrong']
          }, {root:true})
        }
      )
      
      if (!state.addingRecord) {
        dispatch('loadRecordFromAPI')
      } else {
        router.go('records-list')
      }   
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
