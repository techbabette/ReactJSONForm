import { useState } from "react";
import NavBar from "./NavBar";
import FormEditor from "./FormEditor";

function PageFormNew(){
    let [form, setForm] = new useState(JSON.parse(localStorage.getItem('newFormState')) ||
        {
            formId : 1,
            formName : "New form",
            formDirection : "row",
            formElements : {
                1 : {
                    type : {
                        id : 1,
                        text : 'Text',
                        type : 'text'
                    },
                    label : "First field",
                    required : true,
                    width : 12,
                    weight : 100
                },
            }
        }
    );

    let setFormAndSave = function(newFormState){
        setForm(newFormState);

        localStorage.setItem('newFormState', JSON.stringify(newFormState));
    }

    return (
        <>
        <NavBar/>
        <FormEditor form={form} setForm={setFormAndSave}/>
        </>
    )
}

export default PageFormNew;