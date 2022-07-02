import {defineStore} from 'pinia'

export const useAuthUser = defineStore('authUser', {

    state: () => {
        return {
            isLoggedIn: false,
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
    actions: {

        async login(credentials) {

            await this.$axios.post(`http://localhost/api/login`, {
                ...credentials
            }).then((resp) => {
                const response = resp.data;
                if (response.metadata.code === 200) {
                    this.isLoggedIn = true;
                    this.name = response.data.name;
                    this.gender = response.data.gender;
                    this.birthday = response.data.birthday;
                    this.email = response.data.email;
                    this.token.token = response.data.token.token;
                    this.token.expires_at = response.data.token.expires_at;
                    this.$router.push({name: 'home'});
                }
            }).catch((error) => {
                console.log(error);
            });
        },

        async register(credentials) {

            await this.$axios.post(`http://localhost/api/register`, {
                ...credentials
            }).then((resp) => {
                const response = resp.data;
                if (response.metadata.code === 200) {
                    this.$router.push({name: 'login'});
                }
            }).catch((error) => {
                console.log(error);
            });
        },
    },
})
