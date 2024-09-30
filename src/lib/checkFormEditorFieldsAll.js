import checkFormEditorField from "./checkFormEditorField";

function checkFormEditorFieldsAll(form){
    let errors = {};
    if(!form.name){
        errors["name"] = "Form name cannot be empty";
    }

    for(let elementKey of Object.keys(form.elements)){
        let element = form.elements[elementKey];
        let fieldErrors = checkFormEditorField(element);


        if(Object.keys(fieldErrors).length === 0){
            continue;
        }

        errors[elementKey] = fieldErrors;
    }

    return errors;
}

export default checkFormEditorFieldsAll;