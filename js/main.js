const app = Vue.createApp({
    data() {
        return {
            records: [],
        }
    },

    methods: {
        getAllRecords() {
            axios.get('http://localhost:5246/api/records')
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    console.error('Error fetching records:', error);
                });
        }
    }
})
app.mount("#app")