<template>
    <div class="submit-form">
        <div class="form-group">
            <label for="email">Email</label>
            <input
                type="email"
                class="form-control"
                id="email"
                required
                v-model="auth.email"
                v-on:keyup="submitIfEnter"
                name="email"
            />
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input
                class="form-control"
                id="password"
                required
                v-model="auth.password"
                v-on:keyup="submitIfEnter"
                name="password"
                autocomplete="off"
            />
        </div>

        <button @click="login" class="btn btn-success">Login</button>
    </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
    name: "login",
    data() {
        return {
            auth: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        submitIfEnter: function(e) {
            if (e.keyCode === 13) {
                if (this.auth.email.length > 0 && this.auth.password.length > 0) {
                    this.login();
                }
            }
        },

        async login() {
            if (!AuthenticationService.isAuthenticated()) {
                await AuthenticationService.login(this.auth)
                    .then(() => {
                        this.$global.isAuthenticated = true;
                        this.$router.push('/');
                    })
                    .catch(e => {
                    console.log(e.response.data);
                });
            }
        }
    }
};
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>
