import axios from 'axios'

export default class CustomerService {

    async getRecords(params) {
        const apiURL='/api/v1/records-list/'
        console.log(params)
        return await axios.get(apiURL, { params }).then(res => res.data).catch(error => {console.log(error)})
    }
}