<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
    name: "logout",
    methods: {
        logout() {
            AuthenticationService.logout();
            this.$global.isAuthenticated = false;
            this.$router.push('/login')
        }
    },
    mounted() {
        this.logout();
    }
};
</script>
