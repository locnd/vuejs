import http from "@/services/HttpService";
import AuthenticationService from "@/services/AuthenticationService";

http.defaults.headers.common['Authorization'] = `Bearer ${AuthenticationService.getAccessToken()}`;

export default http;
