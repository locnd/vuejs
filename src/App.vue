<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <router-link to="/" class="navbar-brand">Home</router-link>
            <div class="navbar-nav mr-auto">
                <li class="nav-item" v-if="$global.isAuthenticated">
                    <router-link to="/users" class="nav-link">Users</router-link>
                </li>
                <li class="nav-item" v-if="$global.isAuthenticated">
                    <router-link to="/logout" class="nav-link">Logout</router-link>
                </li>
            </div>
        </nav>

        <div class="container mt-3">
            <router-view/>
        </div>
    </div>
</template>

<script>

export default {
    name: "app"
};
</script>
