import checkFormField from "./checkFormField";

function checkFormFieldsAll(formFields, values){
    let errors = {};

    for(let field in formFields){
        let result = checkFormField(formFields[field], values[field]);
        if(result){
            errors[field] = result;
        }
    }

    return errors;
}

export default checkFormFieldsAll;