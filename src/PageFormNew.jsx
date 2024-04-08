import FormComplete from "./FormComplete";
import FormInputsItem from "./FormInputsItem";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import InputAdaptable from "./InputAdaptable";
import FormEditorField from "./FormEditorField";
import axios from "./axios/axios";
function PageFormNew(){
    let [form, setForm] = new useState(
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
                    weight : 99
                },
            }
        }
    );
    let [formTypeOptions, setFormTypeOptions] = new useState([]);

    useEffect(() => {
        async function loadFormTypes() {
            let result = await axios.get('/input');
            console.log(result.data.body);
            if(result.success){
                setFormTypeOptions(result.data.body);
            }
        }

        console.log(loadFormTypes());
    }, [])

    let dummySubmit = function(data){
        console.log("Successfully submitted form");
    }

    let changeName = function(newValue){
        let newForm = {...form};
        newForm.formName = newValue;
        setForm(newForm);
    }

    let formFieldsIDs = Object.keys(form.formElements);

    let formFields = formFieldsIDs.map((fieldId) => {
        let formElement = form.formElements[fieldId];
        return (
            <FormEditorField id={fieldId} element={formElement} form={form} setForm={setForm} formTypeOptions={formTypeOptions}/>
        )
    }) 

    return (
        <>
        <NavBar/>
        <div>
        <label htmlFor="formNameInput" className="text-2xl p-2">Form name</label>
            <InputAdaptable id="formNameInput" className="w-2/6 block" type="text" onChange={changeName} value={form.formName}/>
        </div>
        <hr/>
        <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-2 solo-page">
            <h2 className="text-4xl">Form fields</h2>
            {formFields}
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