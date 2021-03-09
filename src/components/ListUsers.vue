<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search"
                       v-model="search"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                            @click="search"
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
                    @click="setcurrentUser(user, index)"
                >
                    {{ user.full_name }}
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <div v-if="currentUser">
                <h4>user</h4>
                <div>
                    <label><strong>Full name:</strong></label> {{ currentUser.full_name }}
                </div>
                <div>
                    <label><strong>Email:</strong></label> {{ currentUser.email }}
                </div>
                <div>
                    <label><strong>Status:</strong></label> {{ currentUser.status }}
                </div>

                <router-link :to="'/users/' + currentUser.id" class="badge badge-warning">Edit</router-link>
            </div>
            <div v-else>
                <br/>
                <p>Click to view user detail...</p>
            </div>
        </div>
    </div>
</template>

<script>

import UserService from "@/services/UserService";

export default {
    name: "users-list",
    data() {
        return {
            users: [],
            currentUser: null,
            currentIndex: -1,
        };
    },
    methods: {
        getUsers() {
            UserService.getAll().then(function (data) {
                console.log(data);
            });
        },
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
</style>
