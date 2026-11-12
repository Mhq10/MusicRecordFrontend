const app = Vue.createApp({
    data() {
        return {
            records: [],
            searchTitle: '',
            searchArtist: '',
            searchGenre: '',
            searchYear: ''
        }
    },

    methods: {
        getAllRecords() {
            axios.get('http://localhost:5246/api/records',{
                params: {
                    title: this.searchTitle,
                    artist: this.searchArtist,
                    genre: this.searchGenre,
                    year: this.searchYear
                }   
            })
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