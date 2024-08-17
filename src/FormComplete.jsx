import FormInputs from "./FormInputs";
import { useState, useEffect  } from "react";
import findChangedKey from "./lib/findChangedKey";
import checkFormFieldsAll from "./lib/checkFormFieldsAll";
import checkFormField from "./lib/checkFormField";
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
        let errors = checkFormFieldsAll(form.formElements, formValue);
        setFormErrors(errors);

        if(Object.keys(errors).length > 0){
            return;
        }

        props.onSubmit(formValue);
    }

    function handleReset(){
        setFormValue({});
        setFormErrors({});
    }

    function removeError(key){
        let newErrors = {...formErrors};
        delete newErrors[key];
        setFormErrors(newErrors);
    }

    function addError(key, error){
        let newErrors = {};
        Object.assign(newErrors, formErrors);
        newErrors[key] = error;
        setFormErrors(newErrors);
    }

    function handleChange(newValue, keyChanged, runChecks = true){
        if(!runChecks){
            setFormValue(newValue);
            return;
        }
        let error = checkFormField(form.formElements[keyChanged], newValue[keyChanged]);
        if(!error){
            removeError(keyChanged);
        }else{
            addError(keyChanged, error);
        }
        setFormValue(newValue);
    }

    return (
    <div className={'w-full ' + props.className}>
        <h1 className="p-2 text-2xl">{form.formName ? form.formName : "Form name goes here"}</h1>
        <FormInputs form={form} errors={formErrors} value={formValue} onChange={handleChange}/>
        {form.resetButtonAvailable === "true" && 
        <button type="button" className="btn btn-accent w-full px-2 my-2" onClick={handleReset}>Reset form</button>
        }
        <button type="button" className="btn btn-secondary w-full px-2 my-2" onClick={handleSubmit}>Submit form</button>
    </div>
    );
}

export default FormComplete