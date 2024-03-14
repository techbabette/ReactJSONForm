import FormInputs from "./FormInputs";
import { useState } from "react";
function FormComplete(props){
    let [formValue, setFormValue] = useState({});
    let [formErrors, setFormErrors] = useState({});
    let form = props.form;

    function handleSubmit(){
        let errors = {};

        let requiredFieldKeys = Object.keys(form.formElements).filter((key) => form.formElements[key]['required'] === true);

        for(let key of requiredFieldKeys){
            if(!formValue[key] || formValue[key].length === 0){
                errors[key] = "This field cannot be empty";
            }
        }

        errors = {...errors, ...props.errors}

        setFormErrors(errors);

        if(Object.keys(errors).length > 0){
            return;
        }

        props.onSubmit(formValue);
    }

    function handleChange(value){
        setFormValue(value);
    }

    return (
    <div className="w-full">
        <h1 className="p-2 text-2xl">{form.formName}</h1>
        <FormInputs form={form} errors={formErrors} value={formValue} onChange={handleChange}/>
        <button type="button" className="btn btn-success w-full px-2 my-5" onClick={handleSubmit}>Submit form</button>
    </div>
    );
}

export default FormComplete