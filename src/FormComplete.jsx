import FormInputs from "./FormInputs";
import { useState, useEffect  } from "react";
import findChangedKey from "./lib/findChangedKey";
function FormComplete(props){
    let [formValue, setFormValue] = useState({});
    let [formErrors, setFormErrors] = useState({});
    let form = props.form;

    useEffect(() => {
        let newFormErrors = {};
        Object.assign(newFormErrors, formErrors);
        Object.assign(newFormErrors, props.errors);
        setFormErrors(newFormErrors);
    }, [props.errors]);

    function handleSubmit(){
        let errors = {};

        let requiredFieldKeys = Object.keys(form.formElements).filter((key) => form.formElements[key]['required'] === true);

        for(let key of requiredFieldKeys){
            if(!formValue[key] || formValue[key].length === 0){
                errors[key] = "This field cannot be empty";
            }
        }

        let newErrors = {...Object.assign(formErrors, errors)};

        setFormErrors(newErrors);

        if(Object.keys(errors).length > 0){
            return;
        }

        props.onSubmit(formValue);
    }

    function removeError(key){
        let newErrors = {...formErrors};
        delete newErrors[key];
        setFormErrors(newErrors);
    }

    function handleChange(newValue){
        let keyChanged = findChangedKey(formValue, newValue);
        removeError(keyChanged);
        setFormValue(newValue);
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