import axios from "axios";

const axiosInstance = axios.create({baseURL : "http://localhost:8000/api/"});

axiosInstance.interceptors.response.use(
    function (response){
        if(response.data){
            return {success : true, data : response.data, message : response.data.message};
        }
    }, 
    function(error){
        let response = {success : false, error : "Error communicating with server"};
        if(!error.response){
            return response;
        }
        if(!error.response.data.errors){
            return response;
        }
        response.error = error.response.data.message;
        response.errors = {};
        for(let key of Object.keys(error.response.data.errors)){
            response.errors[key] = error.response.data.errors[key][0];
        }
        return response;
    }
);

export default axiosInstance;