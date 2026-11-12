const app = Vue.createApp({
    data() {
        return {
            username: '',
            password: '',
            Role: '',
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
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('MusicToken')}`
                },
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
        },
        login() {
            const loginData = {
                username: this.username,
                password: this.password
            };
            axios.post('http://localhost:5246/api/auth/login', loginData)
                .then(response => {
                    localStorage.setItem('MusicToken', response.data.token);
                    this.Role = response.data.role; // Assuming the role is returned in the response

                })
                .catch(error => {
                    console.error('Login failed:', error);
                });
        },
        logout() {
            localStorage.removeItem('MusicToken');
            this.Role = '';
        }
    }
})
app.mount("#app")