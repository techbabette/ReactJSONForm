import FormEditorField from "./FormEditorField";
import InputAdaptable from "./InputAdaptable";
import FormComplete from "./FormComplete";

export default function FormEditor(props){
    let defaultFieldType = props.defaultFieldType;
    let formTypeOptions = props.formTypeOptions;
    let regexOptions = [{"text": "None", "value": ""},...props.regexOptions, {"text" : "Custom", "value" : "!!$$", "disabled" : true}];

    let form = props.form;
    let setForm = props.setForm;

    let formFieldsIDs = Object.keys(form.elements).sort(function(a, b){
        return form.elements[b].weight - form.elements[a].weight;
    });

    let formFields = formFieldsIDs.map((fieldId) => {
        let formElement = form.elements[fieldId];
        return (
            <FormEditorField key={fieldId} id={fieldId} element={formElement}
            form={form} setForm={setForm}
            formTypeOptions={formTypeOptions} regexOptions={regexOptions}/>
        )
    }) 

    let addNewField = function(){
        let formCopy = {...form};
        let newFieldId = 1;
        let fieldIdsAsNumbers = Object.keys(formCopy.elements).map((key) => parseInt(key));
        if(fieldIdsAsNumbers.length > 0){
            let maxFieldId = Math.max(...fieldIdsAsNumbers);
            newFieldId = maxFieldId + 1;
        }

        let minimumWeight = 50000;
        for(let index of Object.keys(formCopy.elements)){
            let element = formCopy.elements[index];
            if(element.weight <= minimumWeight){
                minimumWeight = element.weight - 5;
            }
        }

        formCopy.elements[newFieldId] = {
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
        newForm.name = newValue;
        setForm(newForm);
    }

    let changeFormResetButtonAvailability = function(newValue){
        let newForm = {...form};
        newForm.resetButtonAvailable = newValue;
        setForm(newForm);
    }

    let newFieldButton = (<button className="w-full btn btn-success p-4" onClick={addNewField}>New field</button>)

    return (
        <>
        <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-6/12">
                <label htmlFor="nameInput" className="text-2xl p-2">Form name</label>
                    <InputAdaptable id="nameInput" className="w-full block" type="text" onChange={changeName} value={form.name}/>
            </div>
            <div className="w-full md:w-6/12">
                <label htmlFor="formResetButton" className="text-2xl p-2">Form reset button</label>
                    <InputAdaptable id="formResetButton" className="w-full block" type="select" 
                    onChange={changeFormResetButtonAvailability} value={form.resetButtonAvailable}
                    options={[{text : 'Available', value : true}, {text : 'Unavailable', value : false}]}
                    option_value_field={'value'} option_text_field={'text'}
                    no_hint={true}
                    />
            </div>
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