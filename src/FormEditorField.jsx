import InputAdaptable from "./InputAdaptable";
function FormEditorField(props){
    let setForm = props.setForm;
    let form = props.form;
    let element = props.element;
    let formTypeOptions = props.formTypeOptions ?? [];
    let id = props.id;

    let changeName = function(newValue){
        let currentShape = {...element};
        currentShape.label = newValue;

        let currentForm = {...form};
        currentForm.formElements[id] = currentShape;

        setForm(currentForm);
    }

    let changeType = function(newTypeId){
        let currentShape = {...element};
        currentShape.type = props.formTypeOptions.filter((x) => x.id == newTypeId)[0];

        let currentForm = {...form};
        currentForm.formElements[id] = currentShape;

        setForm(currentForm);
    }

    let changeWidth = function(newWidth){
        let currentShape = {...element};
        currentShape.width = newWidth;

        let currentForm = {...form};
        currentForm.formElements[id] = currentShape;

        setForm(currentForm);
    }

    return (
    <div className="flex flex-row flex-wrap border bg-base-200 rounded-lg p-2 my-2">
        <div className="flex flex-col w-6/12 border-1 border-base-300">
            <label className="">Field name</label>
            <InputAdaptable className="bg-base-200 " type="text" placeholder="Field name" onChange={changeName} value={element.label}/>
        </div>
        <div className="w-4/12">
            <label  className="">Field type</label>
            <InputAdaptable className="w-full bg-base-200 " type="select" options={formTypeOptions} option_value_field="id" option_text_field="text" 
            onChange={changeType} value={element.type.id}/>
        </div>
        <div className="w-2/12">
            <label  className="">Width</label>
            <InputAdaptable className="w-full bg-base-200 " type="number" onChange={changeWidth} value={element.width}/>
        </div>
        <div className="w-full">
            <label  className="">Regex (optional)</label>
            <InputAdaptable className="w-full bg-base-200 " type="text" placeholder="/^[a-z]$/"/>
        </div>
    </div>
    )
}

export default FormEditorField;