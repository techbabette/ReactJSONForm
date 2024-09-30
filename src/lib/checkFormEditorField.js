function checkFormEditorField(element){
    let errors = {};
    const elementTypesWithOptions = ['select', 'select_multiple', 'select_without_hint'];
    const elementTypesWithMinimumMaximum = ['number'];

    let fieldType = element.type.type;

    if(!element.label){
        errors["label"] = "Field name cannot be empty";
    }

    if(fieldType === "text" && element.regex){
        //TODO Check if regex is valid
    }

    if(elementTypesWithOptions.includes(fieldType)){
        for(let elementOption in element["options"]){
            if(!element["options"][elementOption]){
                if(!("options" in errors)) {
                    errors["options"] = [];
                }
                errors["options"][elementOption] = "Option cannot be empty";
            }
        }
    }

    if(elementTypesWithMinimumMaximum.includes(fieldType)){
        if((element.minimum !== null && element.minimum !== "") && (element.maximum !== null && element.maximum !== "")){
            if(element.minimum > element.maximum){
                errors["minimum"] = "Minimum cannot be greater than maximum";
                errors["maximum"] = "Maximum cannot be lesser than mimimum";
            }
        }
    }

    return errors;
}

export default checkFormEditorField;