import {defineStore} from 'pinia'

export const useAuthUser = defineStore('authUser', {

    state: () => {
        return {
            isLoggedIn: false,
            id: '',
            name: '',
            email: '',
            gender: '',
            birthday: '',
            token: {
                token: '',
                expires_at: '',
            },
        }
    },
    persist: true,
    actions: {

        async login(credentials) {
            try {
                let resp = await this.$axios.post(`http://localhost/api/login`, {
                    ...credentials
                })
                const response = resp.data;
                if (response.metadata.code === 200) {
                    this.isLoggedIn = true;
                    this.id = response.data.id;
                    this.name = response.data.name;
                    this.gender = response.data.gender;
                    this.birthday = response.data.birthday;
                    this.email = response.data.email;
                    this.token.token = response.data.token.token;
                    this.token.expires_at = response.data.token.expires_at;
                    this.$router.push({name: 'diagnostics'});
                }
            } catch (error) {
                return error;
            }
        },

        async register(credentials) {
            try {
                await this.$axios.post(`http://localhost/api/register`, {
                    ...credentials
                });
                this.$router.push({name: 'login'});
            } catch (error) {
                return error;
            }
        },

        logout() {
            this.isLoggedIn = false;
            this.id = '';
            this.name = '';
            this.gender = '';
            this.birthday = '';
            this.email = '';
            this.token.token = '';
            this.token.expires_at = '';
            this.$router.push({name: 'login'});
        },
    },
})
