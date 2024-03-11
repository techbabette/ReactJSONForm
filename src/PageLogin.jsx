import FormComplete from "./FormComplete";

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
    }

    return (
        <div className="w-9/12 mx-auto">
            <FormComplete form={loginForm} onSubmit={attemptLogin}/>
        </div>
    );
}

export default PageLogin;