function checkFormEditorFieldsAll(form){
    let errors = {};
    const elementTypesWithOptions = ['select', 'select_multiple', 'select_without_hint'];
    const elementTypesWithMinimumMaximum = ['number'];
    if(!form.name){
        errors["name"] = "Form name cannot be empty";
    }

    for(let elementKey of Object.keys(form.elements)){
        let element = form.elements[elementKey];
        let fieldType = element.type.type;
        let fieldErrors = {};

        if(!element.label){
            fieldErrors["label"] = "Field name cannot be empty";
        }

        if(fieldType === "text" && element.regex){
            //TODO Check if regex is valid
        }

        if(elementTypesWithOptions.includes(fieldType)){
            for(let elementOption in element["options"]){
                if(!element["options"][elementOption]){
                    if(!("options" in fieldErrors)) {
                        fieldErrors["options"] = [];
                    }
                    fieldErrors["options"][elementOption] = "Option cannot be empty";
                }
            }
        }

        if(elementTypesWithMinimumMaximum.includes(fieldType)){
            if((element.minimum !== null && element.minimum !== "") && (element.maximum !== null && element.maximum !== "")){
                if(element.minimum > element.maximum){
                    fieldErrors["minimum"] = "Minimum cannot be greater than maximum";
                    fieldErrors["maximum"] = "Maximum cannot be lesser than mimimum";
                }
            }
        }

        if(Object.keys(fieldErrors).length === 0){
            continue;
        }

        errors[elementKey] = fieldErrors;
    }


    return errors;
}

export default checkFormEditorFieldsAll;