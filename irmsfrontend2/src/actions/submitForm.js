function loadRecordFromAPI() {
    return axios.get(`/api/v1/return-record/${this.record_uuid}/detail`);
}

export default loadRecordFromAPI;