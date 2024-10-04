function getFormFromResponse(responseForm){
    let form = {};

    form.resetButtonAvailable = responseForm.resetButtonAvailable ? "true" : "false";
    form.name = responseForm.name;
    let elementsObject = {};

    for(let element of responseForm.form_inputs){
        let newElement = {...element};        
        let options = element.simple_options.map((x) => x.value);
        newElement.type = element.input;
        newElement.options = options;
        newElement.defaultOption = element.simple_options.findIndex(x => x.default_selected);
        elementsObject[element.id] = newElement;
    }

    form.elements = elementsObject;

    return form;
}

export default getFormFromResponse;