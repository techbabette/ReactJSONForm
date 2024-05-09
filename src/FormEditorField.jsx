import InputAdaptable from "./InputAdaptable";
import { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
function FormEditorField(props){
    let setForm = props.setForm;
    let form = props.form;
    let element = props.element;
    let formTypeOptions = props.formTypeOptions ?? [];
    let id = props.id;

    const elementTypesWithRegex = ['text'];
    const elementTypesWithOptions = ['select', 'select_multiple'];

    useEffect(() => {
        if(elementTypesWithOptions.includes(element.type.type) && !element.options){
            changeCurrentElement('options')([""]);
        }
    }, [element.type.type])

    let changeCurrentElement = function(attribute){
        return function(newValue){
            let currentShape = {...element};
            currentShape[attribute] = newValue;
    
            let currentForm = {...form};
            currentForm.formElements[id] = currentShape;
    
            setForm(currentForm);
        }
    }

    let changeName = changeCurrentElement('label');

    let changeWidth = changeCurrentElement('width');

    let changeType = function(newTypeId){
        let newType = props.formTypeOptions.filter((x) => x.id == newTypeId)[0];

        changeCurrentElement('type')(newType)
    }

    let deleteField = function(){
        let currentForm = {...form};
        delete currentForm.formElements[id];

        setForm(currentForm);
    }

    let addNewOption = function(){
        let newOptions = [...element.options];
        newOptions.push("");
        changeCurrentElement('options')(newOptions);
    }

    let changeOption = function(index){
        return function(newValue){
            let newOptions = [...element.options];
            newOptions[index] = newValue;

            changeCurrentElement('options')(newOptions);
        }
    }

    let deleteOption = function(index){
        let newOptions = [...element.options];
        if(newOptions.length < 2){
            return;
        }

        newOptions.splice(index, 1);
        changeCurrentElement('options')(newOptions);
    }

    let options = element.options?.map((option, index) => {
        let onChange = changeOption(index)
        return (
            <div key={index} className="w-full my-1">
                <InputAdaptable type="text" placeholder="New option" onChange={onChange} value={option} className="w-10/12"/>
                <button onClick={() => deleteOption(index)} className="w-2/12 btn btn-error border-0 rounded-sm">delete</button>
            </div>
        )
    });

    return (
    <div className="flex flex-row flex-wrap border bg-base-200 rounded-lg p-2 my-2">
        <div className="flex flex-row w-full border-1 border-base-300">
            <div className="w-6/12">
                <button><Icon onClick={deleteField} className="text-error text-xl" icon="mdi:trash"/></button>
            </div>
            <div className="w-6/12 text-right">
                <button className="px-1">&uarr;</button>
                <button>&darr;</button>
            </div>
        </div>
        <div className="flex flex-col w-6/12 border-1 border-base-300">
            <label className="">Field name</label>
            <InputAdaptable className="bg-base-200 " type="text" placeholder="Field name" onChange={changeName} value={element.label}/>
        </div>
        <div className="w-4/12">
            <label className="">Field type</label>
            <InputAdaptable className="w-full bg-base-200 " type="select" options={formTypeOptions} option_value_field="id" option_text_field="text" 
            onChange={changeType} value={element.type.id}/>
        </div>
        <div className="w-2/12">
            <label  className="">Width</label>
            <InputAdaptable className="w-full bg-base-200 " type="number" onChange={changeWidth} value={element.width}/>
        </div>
        {elementTypesWithRegex.includes(element.type.type) && 
        <div className="w-full">
            <label  className="">Regex (optional)</label>
            <InputAdaptable className="w-full bg-base-200 " type="text" placeholder="/^[a-z]$/"/>
        </div>}
        {elementTypesWithOptions.includes(element.type.type) &&
        <div className="w-full">
            {options}
            <button className="w-full btn btn-success p-4 mt-2" onClick={addNewOption}>Add option</button>
        </div>
        }
    </div>
    )
}

export default FormEditorField;