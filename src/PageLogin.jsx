import { useRef } from "react";
import FormComplete from "./FormComplete";
import axios from "./axios/axios";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setJWT } from "./redux/slices/user";
import { useNavigate } from "react-router-dom";
let loginForm = {
    name : "Login to your Formify account",
    elements : {
        email : {
            type : {type : 'text'},
            label : "Email",
            required : true,
            width : 12,
            weight : 100,
        },
        password : {
            type : {type : 'password'},
            label : "Password",
            required : true,
            width : 12,
            weight : 95,
        },
    }
}

function PageLogin(){
    const navigate = useNavigate();

    const loginToastr = useRef(null);
    const dispatch = useDispatch();
    async function attemptLogin(formData){
        if(loginToastr.current){
            return;
        }

        loginToastr.current = toast.loading("Attempting login", {autoClose : true});

        let result = await axios.postForm("auth/login", formData);

        if(result.success){
            dispatch(setJWT(result.data.body));
            navigate("/");
            toast.update(loginToastr.current, {render : "Successfully logged in", type : 'success', isLoading : false, autoClose : true, className : 'alert alert-success'});
        }else{
            toast.update(loginToastr.current, {render : result.error, type: "error", isLoading : false, autoClose : true, className : 'alert alert-error'});
        }

        loginToastr.current = null;
    }

    return (
        <div className="w-9/12 sm:w-6/12 mx-auto solo-page flex justify-center items-center">
            <FormComplete form={loginForm} onSubmit={attemptLogin}/>
        </div>
    );
}

export default PageLogin;