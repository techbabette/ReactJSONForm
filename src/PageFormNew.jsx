import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import FormEditor from "./FormEditor";
import axios from "./axios/axios";

function PageFormNew(){
    let [defaultFieldType, setDefaultFieldType] = new useState(null)
    let [regexOptions, setRegexOptions] = new useState(null)
    let [form, setForm] = new useState(null);
    let [formTypeOptions, setFormTypeOptions] = new useState(null);

    let setFormAndSave = function(newFormState){
        setForm(newFormState);
        localStorage.setItem('newFormState', JSON.stringify(newFormState));
    }

    useEffect(() => {
        async function loadFormTypes() {
            let result = await axios.get('/inputs');
            if(result.success){
                setFormTypeOptions(result.data.body);
                setDefaultFieldType(result.data.body[0]);
            }
        }
        async function loadRegexOptions() {
            let result = await axios.get("/regex_options");
            if(result.success){
                setRegexOptions(result.data.body);
            }
        }
        loadFormTypes();
        loadRegexOptions();
    }, [])

    useEffect(() => {
        if(defaultFieldType && regexOptions){
            loadInitialForm();
        }
    }, [defaultFieldType, regexOptions])

    let loadInitialForm = async function(){
        if(localStorage.getItem('newFormState')) {
            setForm(JSON.parse(localStorage.getItem("newFormState")));
            return;
        };

        let newFormObject = {
            formId : 1,
            formName : "New form",
            formDirection : "row",
            formElements : {}
        }

        newFormObject.formElements[1] = {
            type : defaultFieldType,
            label : "First field",
            required : true,
            width : 12,
            weight : 100
        }

        setForm(newFormObject);
    }

    return (
        <>
        {!form && 
        <div className='w-full h-screen mk-text-center'>
            <p className='my-2 text-8xl text-primary'>Loading editor</p>
            <span className="loading loading-spinner mx-auto loading-lg"></span>
        </div>
        }
        {form && 
        <>
        <NavBar/>
        <FormEditor form={form} setForm={setFormAndSave}
        defaultFieldType={defaultFieldType} regexOptions={regexOptions}
        formTypeOptions={formTypeOptions}/>
        </>
        }
        </>
    )
}

export default PageFormNew;