import FormInputsItem from "./FormInputsItem"

function FormInputs(props){
    let formJSON = props.form;
    let errors = props.errors;

    let inputKeys = Object.keys(formJSON.elements);
    let sortedInputKeys = inputKeys.sort((a,b) => formJSON.elements[b].weight - formJSON.elements[a].weight);
    
    function handleInputChange(newValue, key){
        let newFormValue = {...props.value};
        newFormValue[key] = newValue;
        props.onChange(newFormValue, key);
    }

    function removeValueOfElement(key){
        let newFormValue = {...props.value};
        delete newFormValue[key];
        props.onChange(newFormValue, key, false);
    }

    let inputs = sortedInputKeys.map((key) => {
        let currentInput = formJSON.elements[key];
        let defaultValue = "";

        if(currentInput.type.type === "select"){
            defaultValue = 0;
        }

        if(currentInput.type.type === "select_without_hint"){
            let defaultOption = currentInput.defaultOption;

            let defaultOptionValue = currentInput.options[defaultOption];

            defaultValue = defaultOptionValue ?? 0
        }

        if(currentInput.type.type === "select_multiple"){
            defaultValue = [];
        }

        let handler = function(value){
            handleInputChange(value, key);
        }
        
        return <FormInputsItem key={key} id={key} error={errors[key]} 
        value={props.value[key] ?? defaultValue} defValue={defaultValue} onChange={handler} remove_value={() => removeValueOfElement(key)} {...formJSON.elements[key]}/>
    }
    )

    return (
        <div className="w-full flex flex-row flex-wrap">
            {inputs}
        </div>
    );

}

export default FormInputs