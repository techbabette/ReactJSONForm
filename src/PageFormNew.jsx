import FormComplete from "./FormComplete";
import FormInputsItem from "./FormInputsItem";
import { useState } from "react";
import NavBar from "./NavBar";
import InputAdaptable from "./InputAdaptable";
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
        <>
        <NavBar/>
        <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-2 solo-page">
            <h2 className="text-4xl p-2">Form editor</h2>
            <label htmlFor="formNameInput" className="text-2xl p-2">Form name</label>
            <InputAdaptable id="formNameInput" className="w-full" type="text" onChange={changeName} value={form.formName}/>
            <hr/>
        </div>
        <div className="w-full md:w-1/2 border-t-2 md:border-t-0 md:border-l-2 p-2 solo-page">
            <h2 className="text-4xl p-2">Form preview</h2>
            <FormComplete form={form} onSubmit={dummySubmit}/>        
        </div>
        </div>
        </>
    )
}

export default PageFormNew;