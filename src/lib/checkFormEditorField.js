function checkFormEditorField(element){
    let errors = {};
    const elementTypesWithOptions = ['select', 'select_multiple', 'select_without_hint'];
    const elementTypesWithMinimumMaximum = ['number'];

    let fieldType = element.type.type;

    if(!element.label){
        errors["label"] = "Field name cannot be empty";
    }

    if(fieldType === "text" && element.regex){
        let validRegex = false;
        let matches = null;
        try {
            matches = element.regex.match(/^([/~@;%#'])(.*?)\1([gimsuy]*)$/);
            new RegExp(matches[2], matches[3])
            validRegex = true;
          } catch (e) {
            validRegex = false
        }

        let unescapedSlashPattern = /(?<!\\)\//;

        if(!validRegex){
            errors["regex"] = "Invalid regex";
        }

        if(matches?.[2] && unescapedSlashPattern.test(matches[2])){
            errors["regex"] = "Regex cannot contain unescaped / outside of delimiters"
        }
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