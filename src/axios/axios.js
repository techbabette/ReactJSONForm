import axios from "axios";
import store from "../redux/store";
import { getJWT, setJWT } from "../redux/slices/user";


const axiosInstance = axios.create({baseURL : window.__ENV__.API_URL});


axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = getJWT(state);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

axiosInstance.interceptors.response.use(
    function (response){
        if(response.data){
            return {success : true, data : response.data, message : response.data.message};
        }
    }, 
    function(error){
        let response = {success : false, error : "Error communicating with server"};
        console.log(error);
        if(!error.response){
            return response;
        }

        if(error.response.data.message){
            response.error = error.response.data.message;
        }

        if(error.response.data.errors){
            response.errors = {};
            for(let key of Object.keys(error.response.data.errors)){
                response.errors[key] = error.response.data.errors[key][0];
            }
        }

        if(error.response.status === 401){
            store.dispatch(setJWT(null));
        }

        return response;
    }
);

export default axiosInstance;