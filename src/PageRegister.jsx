import FormComplete from "./FormComplete";
import { toast } from 'react-toastify';
import axios from "./axios/axios";
import { useState, useRef } from "react";
let registerForm = {
    name : "Create an account to save your forms",
    elements : {
        first_name : {
            type : {type : 'text'},
            label : "First name",
            required : true,
            width : 6,
            weight : 100,
        },
        last_name : {
            type : {type : 'text'},
            label : "Last name",
            required : true,
            width : 6,
            weight : 100,
        },
        email : {
            type : {type : 'text'},
            label : "Email",
            required : true,
            width : 12,
            weight : 95,
        },
        password : {
            type : {type : 'password'},
            label : "Password",
            required : true,
            width : 12,
            weight : 90,
        },
    }
}

function PageRegister(){
    const [errors, setErrors] = useState(null);
    const registrationToastr = useRef(null);


    async function attemptRegister(formData){
        if(registrationToastr.current){
            return;
        }

        registrationToastr.current = toast.loading("Sending request", {autoClose : true});

        let result = await axios.postForm("auth/register", formData);

        if(result.success){
            setErrors(null);
            toast.update(registrationToastr.current, {render : "Successfully created new account", type : 'success', isLoading : false, autoClose : true, className : 'alert alert-success'});
        }else{
            let requestErrors = {...result.errors};
            setErrors(requestErrors);
            toast.update(registrationToastr.current, {render : result.error, type: "error", isLoading : false, autoClose : true, className : 'alert alert-error'});
        }

        registrationToastr.current = null;
    }

    return (
        <div className="w-9/12 sm:w-6/12 mx-auto solo-page flex justify-center items-center">
            <FormComplete form={registerForm} onSubmit={attemptRegister} errors={errors}/>
        </div>
    );
}

export default PageRegister;