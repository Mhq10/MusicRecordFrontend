app.component('login-component', { 
    props: ['baseUrl'],
    emits: ['login-success'],

    template:
    `
    <div v-if="Role === ''" class="card shadow-sm mb-4 mx-auto" style="max-width: 450px">

            <div class="card-body p-4">

                <h2 class="h4 mb-4">Login</h2>

                <div class="mb-3">

                    <label class="form-label">Username</label>

                    <input
                        id="usernameInput"
                        class="form-control"
                        v-model="username"
                        placeholder="Enter username">

                </div>

                <div class="mb-3">

                    <label class="form-label">Password</label>

                    <input
                        id="password"
                        class="form-control"
                        v-model="password"
                        type="password"
                        placeholder="Enter password">

                </div>

                <button
                    id="loginBtn"
                    class="btn btn-primary w-100"
                    @click="login">
                    Login
                </button>

            </div>

        </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            Role: ''
        }
    },
    methods: {
        login() {
            axios.post(`${this.baseUrl}/api/auth/login`, {
                username: this.username,
                password: this.password
            })
            .then(response => {
                localStorage.setItem('MusicToken', response.data.token);
                this.$emit('login-success', response.data.role);
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
            
        }
    }
})