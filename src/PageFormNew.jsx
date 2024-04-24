import FormComplete from "./FormComplete";
import FormInputsItem from "./FormInputsItem";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import InputAdaptable from "./InputAdaptable";
import FormEditorField from "./FormEditorField";
import axios from "./axios/axios";

function PageFormNew(){
    let [defaultFieldType, setDefaultFieldType] = new useState(
        {
            id : 1,
            text : 'Text',
            type : 'text'
        }
    )
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
                    weight : 100
                },
            }
        }
    );

    let setFormAndSave = function(newFormState){
        setForm(newFormState);

        localStorage.setItem('newFormState', JSON.stringify(newFormState));
    }

    let [formTypeOptions, setFormTypeOptions] = new useState([]);

    useEffect(() => {
        async function loadFormTypes() {
            let result = await axios.get('/input');
            console.log(result.data.body);
            if(result.success){
                setFormTypeOptions(result.data.body);
                setDefaultFieldType(result.data.body[0]);
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
        setFormAndSave(newForm);
    }

    let formFieldsIDs = Object.keys(form.formElements);

    let formFields = formFieldsIDs.map((fieldId) => {
        let formElement = form.formElements[fieldId];
        return (
            <FormEditorField key={fieldId} id={fieldId} element={formElement} form={form} setForm={setFormAndSave} formTypeOptions={formTypeOptions}/>
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

        console.log(fieldIdsAsNumbers);

        setFormAndSave(formCopy);
    }

    let newFieldButton = (<button className="w-full btn btn-success p-4" onClick={addNewField}>New field</button>)

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

export default PageFormNew;