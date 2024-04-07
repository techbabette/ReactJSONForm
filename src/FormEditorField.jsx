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

    return (
    <div className="flex flex-row flex-wrap border bg-base-200 rounded-lg p-2 my-2">
        <div className="flex flex-col w-8/12 border-1 border-base-300">
            <label className="">Field name</label>
            <InputAdaptable className="bg-base-200 " type="text" placeholder="Field name" onChange={changeName} value={element.label}/>
        </div>
        <div className="w-4/12">
            <label  className="">Field type</label>
            <InputAdaptable className="w-full bg-base-200 " type="select" options={formTypeOptions} value={element.type}/>
        </div>
        <div className="w-full">
            <label  className="">Regex (optional)</label>
            <InputAdaptable className="w-full bg-base-200 " type="text" placeholder="/^[a-z]$/"/>
        </div>
    </div>
    )
}

export default FormEditorField;