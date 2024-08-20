let response = {
    "id": 1,
    "user_id": 1,
    "name": "First form",
    "created_at": null,
    "updated_at": null,
    "form_inputs": [
      {
        "id": 3,
        "form_id": 1,
        "input_id": 1,
        "label": "Last name",
        "weight": 95,
        "width": 6,
        "required": 1,
        "regex": null,
        "created_at": null,
        "updated_at": null,
        "simple_options": [],
        "input": {
          "id": 1,
          "text": "Text",
          "type": "text",
          "created_at": null,
          "updated_at": null
        }
      },
      {
        "id": 5,
        "form_id": 1,
        "input_id": 3,
        "label": "Classes",
        "weight": 80,
        "width": 12,
        "required": 1,
        "regex": null,
        "created_at": null,
        "updated_at": null,
        "simple_options": [
          {
            "form_input_id": 5,
            "value": "C#"
          },
          {
            "form_input_id": 5,
            "value": "PHP"
          },
          {
            "form_input_id": 5,
            "value": "React"
          }
        ],
        "input": {
          "id": 3,
          "text": "Select multiple",
          "type": "select_multiple",
          "created_at": null,
          "updated_at": null
        }
      }
    ]
  }

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

console.log(getFormFromResponse(response));

export default getFormFromResponse;