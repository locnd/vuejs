import LocalStorageService from '@/services/LocalStorageService';
import http from "@/services/HttpService";

class AuthenticationService {
    ACCESS_TOKEN_KEY = 'access_token';
    CURRENT_USER_KEY = 'current_user';

    accessToken = '';
    currentUser = false;
    dataLoaded = false;

    isAuthenticated() {
        this.loadDataIfNeed();
        return this.accessToken !== '' && this.currentUser !== false;
    }

    getAccessToken() {
        this.loadDataIfNeed();
        return this.accessToken;
    }

    getCurrentUser() {
        this.loadDataIfNeed();
        return this.currentUser;
    }

    saveAuthenticationData(data) {
        this.saveAccessToken(data.token);
        this.saveCurrentUser(data.user);
    }

    saveCurrentUser(currentUser) {
        LocalStorageService.saveItem(this.CURRENT_USER_KEY, currentUser);
        this.currentUser = currentUser;
    }

    saveAccessToken(accessToken) {
        LocalStorageService.saveItem(this.ACCESS_TOKEN_KEY, accessToken);
        this.accessToken = accessToken;
    }

    removeAuthenticationData() {
        LocalStorageService.removeItem(this.ACCESS_TOKEN_KEY);
        LocalStorageService.removeItem(this.CURRENT_USER_KEY);
        this.accessToken = '';
        this.currentUser = false;
    }

    loadData() {
        this.accessToken = LocalStorageService.getItem(this.ACCESS_TOKEN_KEY) || '';
        this.currentUser = LocalStorageService.getItem(this.CURRENT_USER_KEY) || false;
        this.dataLoaded = true;
    }

    loadDataIfNeed() {
        if (this.dataLoaded === false) {
            this.loadData();
        }
    }

    async login(auth) {
        let res = await http.post("/login", auth);
        this.saveAuthenticationData(res.data);
    }

    async logout() {
        await this.removeAuthenticationData();
    }
}

export default new AuthenticationService();
