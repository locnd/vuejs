import axios from "axios";
import AuthenticationService from "@/services/AuthenticationService";

export default axios.create({
    baseURL: 'http://camxuc.me/api/v1',
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + AuthenticationService.getAccessToken()
    }
});
