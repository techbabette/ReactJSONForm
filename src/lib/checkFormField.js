function checkFormField(field, value){
    if(!field.required && !field.regex){
        return null;
    }

    if(field.regex){
        let flagIndex = field.regex.lastIndexOf("/");
        let regex = field.regex.substring(1, flagIndex);
        let flags = field.regex.substring(flagIndex + 1);
        regex = new RegExp(regex, flags);
        if(!regex.test(value)){
            return "Value does not match format"
        }
    }

    if(field.required){
        if(!value || value.length === 0){
            return "This field cannot be empty";
        }
    }

    return null;
}

export default checkFormField;