<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search"
                       v-model="search"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                            @click="getUsers"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Users List</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(user, index) in users"
                    :key="index"
                    @click="setCurrentUser(user, index)"
                >
                    {{ user.full_name }}
                </li>
                <router-link :to="'/users/create'" class="badge badge-primary edit-btn" style="margin-top: 10px">Create</router-link>
            </ul>
        </div>
        <div class="col-md-6">
            <div v-if="currentUser">
                <h4>User</h4>
                <div>
                    <label><strong>Full name:</strong></label> {{ currentUser.full_name }}
                </div>
                <div>
                    <label><strong>Email:</strong></label> {{ currentUser.email }}
                </div>
                <div>
                    <label><strong>Status:</strong></label> {{ currentUser.status }}
                </div>

                <router-link :to="'/users/' + currentUser.id" class="badge badge-warning edit-btn">Edit</router-link>
                <button @click="deleteUser" class="badge badge-danger edit-btn" style="border: none;margin-left: 10px;">Delete</button>
            </div>
            <div v-else>
                <p>Click to view user detail...</p>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
    name: "list_users",
    data() {
        return {
            users: [],
            currentUser: null,
            currentIndex: -1,
            search: '',
        };
    },
    methods: {
        getUsers() {
            UserService.getAll({
                search: this.search
            }).then((res) => {
                this.users = res.data.data;
            });
        },
        deleteUser() {
            if (confirm('Are you sure to delete user "' + this.currentUser.full_name+'" ?')) {
                UserService.delete(this.currentUser.id).then(() => {
                    this.users.splice(this.currentIndex, 1);
                    this.currentUser = null;
                    this.currentIndex = -1;
                });
            }
        },
        setCurrentUser(user, index) {
            this.currentUser = user;
            this.currentIndex = index;
        }
    },
    mounted() {
        this.getUsers();
    }
};
</script>

<style>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
.edit-btn {
    padding: 10px 20px;
    font-size: 15px;
    color: white;
}
</style>
