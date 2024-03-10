import FormInputsItem from "./FormInputsItem"
import { useState } from "react";
let formJSON = {
    formId : 1,
    formName : "New form",
    formDirection : "row",
    formElements : {
        2 : {
            type : "text",
            label : "Last name",
            width : 6,
            weight : 99
        },
        3 : {
            type : "email",
            label : "Email",
            width : 12,
            weight : 98
        },
        1 : {
            type : "text",
            label : "First name",
            width : 6,
            weight : 100,
        },
        4 : {
            type : "select",
            label : "Select city",
            width : 12,
            weight : 97,
            options : ["Belgrade", "Novi sad", "Nis"]
        },
    }
}

function FormInputs(){
    let [formValue, setFormValue] = useState({});

    let inputKeys = Object.keys(formJSON.formElements);
    let sortedInputKeys = inputKeys.sort((a,b) => b.weight - a.weight);

    function handleInputChange(newValue, key){
        let newFormValue = {...formValue};
        newFormValue[key] = newValue;
        setFormValue(newFormValue);
    }

    let inputs = sortedInputKeys.map((key) => {
        let currentInput = formJSON.formElements[key];
        let defaultValue = "";

        if(currentInput.type === "select"){
            defaultValue = 0;
        }

        let handler = function(value){
            handleInputChange(value, key);
        }
        
        return <FormInputsItem key={key} id={key} value={formValue[key] ?? defaultValue} onChange={handler} {...formJSON.formElements[key]}/>
    }
    )

    return (
        <div className="w-full flex flex-row flex-wrap">
            {inputs}
        </div>
    );

}

export default FormInputs