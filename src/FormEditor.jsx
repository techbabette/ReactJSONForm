import { useEffect, useState } from "react";
import FormEditorField from "./FormEditorField";
import InputAdaptable from "./InputAdaptable";
import FormComplete from "./FormComplete";
import axios from "./axios/axios";

export default function FormEditor(props){
    let [defaultFieldType, setDefaultFieldType] = new useState(
        {
            id : 1,
            text : 'Text',
            type : 'text'
        }
    )

    let [formTypeOptions, setFormTypeOptions] = new useState([]);

    let form = props.form;
    let setForm = props.setForm;

    useEffect(() => {
        async function loadFormTypes() {
            let result = await axios.get('/input');
            if(result.success){
                setFormTypeOptions(result.data.body);
                setDefaultFieldType(result.data.body[0]);
            }
        }
        loadFormTypes();
    }, [])

    let formFieldsIDs = Object.keys(form.formElements);

    let formFields = formFieldsIDs.map((fieldId) => {
        let formElement = form.formElements[fieldId];
        return (
            <FormEditorField key={fieldId} id={fieldId} element={formElement} form={form} setForm={setForm} formTypeOptions={formTypeOptions}/>
        )
    }) 

    let addNewField = function(){
        let formCopy = {...form};
        let fieldIdsAsNumbers = Object.keys(formCopy.formElements).map((key) => parseInt(key));
        let maxFieldId = Math.max(...fieldIdsAsNumbers);
        let newFieldId = maxFieldId + 1;
        let minimumWeight = 50000;
        for(let index of Object.keys(formCopy.formElements)){
            let element = formCopy.formElements[index];
            if(element.weight < minimumWeight){
                minimumWeight = element.weight - 5;
            }
        }

        formCopy.formElements[newFieldId] = {
            type : defaultFieldType,
            label : "New field",
            required : true,
            width : 12,
            weight : minimumWeight
        }

        setForm(formCopy);
    }

    let dummySubmit = function(data){
        console.log("Successfully submitted form");
    }

    let changeName = function(newValue){
        let newForm = {...form};
        newForm.formName = newValue;
        setForm(newForm);
    }

    let newFieldButton = (<button className="w-full btn btn-success p-4" onClick={addNewField}>New field</button>)

    return (
        <>
        <div>
        <label htmlFor="formNameInput" className="text-2xl p-2">Form name</label>
            <InputAdaptable id="formNameInput" className="w-2/6 block" type="text" onChange={changeName} value={form.formName}/>
        </div>
        <hr/>
        <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-2 solo-page">
            <h2 className="text-4xl">Form fields</h2>
            {formFields}
            {newFieldButton}
        </div>
        <div className="w-full md:w-1/2 border-t-2 md:border-t-0 md:border-l-2 p-2 solo-page">
            <h2 className="text-4xl p-2">Form preview</h2>
            <FormComplete form={form} onSubmit={dummySubmit}/>        
        </div>
        </div>
        </>
    )
}