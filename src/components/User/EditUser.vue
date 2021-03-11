<template>
    <div class="submit-form">
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
    name: "edit_user",
    data() {
        return {
            id: 0,
            user: false
        };
    },
    methods: {
        findUser(id) {
            this.id = id;
            UserService.get(id).then(response => {
                this.user = {
                    username: response.data.username,
                    email: response.data.email,
                    first_name : response.data.full_name,
                    last_name : '',
                    gender : 1,
                    role: 1,
                    status: 2
                };
            })
            .catch(e => {
                console.log(e);
            });
        },
        saveUser() {
            UserService.update(this.id, this.user)
                .then(() => {
                    this.$router.push('/users');
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.findUser(this.$route.params.id);
    }
};
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>
