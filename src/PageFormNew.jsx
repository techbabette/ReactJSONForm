import FormComplete from "./FormComplete";
import FormInputsItem from "./FormInputsItem";
import { useState } from "react";
function PageFormNew(){
    let [form, setForm] = new useState(
        {
            formId : 1,
            formName : "New form",
            formDirection : "row",
            formElements : {
                2 : {
                    type : "text",
                    label : "First field",
                    required : true,
                    width : 12,
                    weight : 99
                },
            }
        }
    );

    let dummySubmit = function(data){
        console.log("Successfully submitted form");
    }

    let changeName = function(newValue){
        let newForm = {...form};
        newForm.formName = newValue;
        setForm(newForm);
    }

    return (
        <div className="flex flex-row">
        <div className="w-full md:w-1/2 p-2">
            <h2>Form editor</h2>
            <hr />
            <FormInputsItem type="text" label="Form name" onChange={changeName} value={form.formName}/>
        </div>
        <div className="w-full md:w-1/2 border-l-2 p-2">
            <h2>Form preview</h2>
            <hr />
            <FormComplete form={form} onSubmit={dummySubmit}/>        
        </div>
        </div>
    )
}

export default PageFormNew;