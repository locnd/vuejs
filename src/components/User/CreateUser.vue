<template>
    <div class="submit-form">
        <div class="form-group">
            <label for="username">Username</label>
            <input
                type="text"
                class="form-control"
                id="username"
                required
                v-model="user.username"
                name="username"
            />
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input
                class="form-control"
                id="email"
                required
                v-model="user.email"
                name="email"
            />
        </div>
        <div class="form-group">
            <label for="first_name">Name</label>
            <input
                class="form-control"
                id="first_name"
                required
                v-model="user.first_name"
                name="first_name"
            />
        </div>

        <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
    name: "create_user",
    data() {
        return {
            user: {
                username: '',
                email: "",
                password: "Demo@247",
                first_name : "",
                gender : 1,
                role: 1,
                status: 2
            }
        };
    },
    methods: {
        saveUser() {
            UserService.create(this.user)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
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
