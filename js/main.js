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
            searchYear: '',

            AddedId: null,
            AddedTitle: '',
            AddedArtist: '',
            AddedGenre: '',
            AddedYear: null,
            AddedDuration: null
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
        
        addRecords() {
            const newRecord = {
                id: this.AddedId,
                title: this.AddedTitle,
                artist: this.AddedArtist,
                genre: this.AddedGenre,
                year: this.AddedYear,
                duration: this.AddedDuration
            };

            axios.post('http://localhost:5246/api/records', newRecord, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('MusicToken')}`
                }
            })
                .then(response => {
                    console.log('Record added:', response.data);
                    this.getAllRecords(); // Refresh the records list after adding
                })
                .catch(error => {
                    console.error('Error adding record:', error);
                });
        },

        updateRecords() {
                const newRecord = {
                    id: this.AddedId,
                    title: this.AddedTitle,
                    artist: this.AddedArtist,
                    genre: this.AddedGenre,
                    year: this.AddedYear,
                    duration: this.AddedDuration
                };

                axios.put('http://localhost:5246/api/records', newRecord, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('MusicToken')}`
                    }   
                })
                .then(response => {
                    console.log('Record added:', response.data);
                    this.getAllRecords(); // Refresh the records list after adding
                })
                .catch(error => {
                    console.error('Error adding record:', error);
                });
        },

        deleteRecord() {
            axios.delete(`http://localhost:5246/api/records/${this.AddedId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('MusicToken')}`
                }
            }).then(response => {
                console.log('Record deleted:', response.data);
                this.getAllRecords(); // Refresh the records list after deletion
            })
            .catch(error => {
                console.error('Error deleting record:', error);
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