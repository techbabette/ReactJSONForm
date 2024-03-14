import FormComplete from "./FormComplete";

let registerForm = {
    formName : "Create an account to save your forms",
    formElements : {
        firstName : {
            type : 'text',
            label : "First name",
            required : true,
            width : 6,
            weight : 100,
        },
        lastName : {
            type : 'text',
            label : "Last name",
            required : true,
            width : 6,
            weight : 100,
        },
        email : {
            type : 'text',
            label : "Email",
            required : true,
            width : 12,
            weight : 95,
        },
        password : {
            type : 'password',
            label : "Password",
            required : true,
            width : 12,
            weight : 90,
        },
    }
}

function PageRegister(){
    function attemptRegister(formData){
        console.log(formData);
    }

    return (
        <div className="w-9/12 sm:w-6/12 mx-auto solo-page flex justify-center items-center">
            <FormComplete form={registerForm} onSubmit={attemptRegister}/>
        </div>
    );
}

export default PageRegister;