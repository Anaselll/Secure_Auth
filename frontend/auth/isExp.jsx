import * as jwt_decode from "jwt-decode";
import axios from 'axios'
export default async function checktokenExpireandrefresh() {
    let token = localStorage.getItem("accessToken");
    if(!token){
        return !!token
    }
    
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    const expired= decodedToken.exp < currentTime;
    const refreshToken = localStorage.getItem("refreshToken");
    if(expired){

        try {
    const response = await axios.post("/auth/refresh", { refreshToken });
    const newAccessToken =await response.data.access_token;
    localStorage.setItem("accessToken", newAccessToken); 
    return newAccessToken;
        } catch (error) {
    console.error("Failed to refresh access token:", error);
    localStorage.removeItem('refreshToken')
    localStorage.removeItem("acessToken");
    return null
            
        }
    }
    
}
