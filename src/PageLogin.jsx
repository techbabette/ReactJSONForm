import FormComplete from "./FormComplete";
import { toast } from 'react-toastify';
let loginForm = {
    formName : "Login to your Formify account",
    formElements : {
        email : {
            type : 'text',
            label : "Email",
            required : true,
            width : 12,
            weight : 100,
        },
        password : {
            type : 'password',
            label : "Password",
            required : true,
            width : 12,
            weight : 95,
        },
    }
}

function PageLogin(){
    function attemptLogin(formData){
        console.log(formData);
        toast.success("Successfully logged in")
    }

    return (
        <div className="w-9/12 sm:w-6/12 mx-auto solo-page flex justify-center items-center">
            <FormComplete form={loginForm} onSubmit={attemptLogin}/>
        </div>
    );
}

export default PageLogin;