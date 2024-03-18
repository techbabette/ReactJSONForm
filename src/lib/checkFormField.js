function checkFormField(field, value){
    if(!field.required && !field.regex){
        return false;
    }

    if(field.regex){
        if(!field.regex.test(value)){
            return "Value does not match format"
        }
    }

    if(field.required){
        if(!value || value.length === 0){
            return "This field cannot be empty";
        }
    }

    return false;
}