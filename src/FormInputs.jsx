import FormInputsItem from "./FormInputsItem"

function FormInputs(props){
    let formJSON = props.form;
    let errors = props.errors;

    let inputKeys = Object.keys(formJSON.formElements);
    let sortedInputKeys = inputKeys.sort((a,b) => formJSON.formElements[b].weight - formJSON.formElements[a].weight);

    function handleInputChange(newValue, key){
        let newFormValue = {...props.value};
        newFormValue[key] = newValue;
        props.onChange(newFormValue);
    }

    let inputs = sortedInputKeys.map((key) => {
        let currentInput = formJSON.formElements[key];
        let defaultValue = "";

        if(currentInput.type.type === "select"){
            defaultValue = 0;
        }

        if(currentInput.type.type === "select_multiple"){
            defaultValue = [];
        }

        let handler = function(value){
            handleInputChange(value, key);
        }
        
        return <FormInputsItem key={key} id={key} error={errors[key]} value={props.value[key] ?? defaultValue} onChange={handler} {...formJSON.formElements[key]}/>
    }
    )

    return (
        <div className="w-full flex flex-row flex-wrap">
            {inputs}
        </div>
    );

}

export default FormInputs