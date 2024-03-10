import InputAdaptable from "./InputAdaptable"
import { useState } from "react";
let formJSON = {
    "formId" : 1,
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
    }
}

function InputForm(){
    let [formValue, setFormValue] = useState({});

    let inputKeys = Object.keys(formJSON.formElements);
    let sortedInputKeys = inputKeys.sort((a,b) => b.weight - a.weight);

    function handleInputChange(newValue, key){
        let newFormValue = {...formValue};
        newFormValue[key] = newValue;
        setFormValue(newFormValue);
    }

    let inputs = sortedInputKeys.map((key) => 
        <InputAdaptable key={key} id={key} value={formValue[key] ?? ""} onChange={handleInputChange} {...formJSON.formElements[key]}/>
    )

    return (
        <div className="w-full flex flex-row flex-wrap">
            {inputs}
        </div>
    );

}

export default InputForm