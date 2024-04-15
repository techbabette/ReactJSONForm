function InputSelectMultiple(props){
    let id = props.id ?? Math.floor(Math.random() * 5000);

    function handleChange(event){
        let clickedValue = event.target.value;
        let currentArray = [...props.value];
        if(!currentArray.includes(clickedValue)){
            currentArray.push(clickedValue);
        }
        else{
            let valueIndex = currentArray.indexOf(clickedValue);
            currentArray.splice(valueIndex, 1);
        }
        props.onChange(currentArray);
    }

    function getSelectedValues(){
        let selectedValues = [];
        props.options?.forEach((option)  => {
            let optionValue;
            if(option_text_field === "__" && option_value_field === "__"){
                optionValue = option;
            }else{
                optionValue = option[option_value_field];
            }

            if(props.value.includes(optionValue)){
                selectedValues.push(optionValue);
            }
        })

        return selectedValues;
    }

    let option_value_field = props.option_value_field ?? "__";
    let option_text_field = props.option_text_field ?? "__";

    let options = props.options?.map((option, index) => {
        let option_value = option_value_field === "__" ? option : option[option_value_field];
        let option_text = option_text_field === "__" ? option : option[option_text_field];

        return (
        <li key={index}>
            <label className="label cursor-pointer">
                <span className="label-text">{option_text}</span> 
                <input type="checkbox" value={option_value} checked={props.value?.includes(option_value)} className="checkbox" onChange={handleChange}/>
            </label>
        </li>
        )
    })

    let hint = props.hint ?? "Select multiple";

    let selectedValues = getSelectedValues();
    hint = selectedValues.length > 0 ? selectedValues.join(", ") : hint;


    return (
    <div className={"dropdown"}>
        <label tabIndex={id} htmlFor={id} role="button" className="w-full">{props.label}</label>
        <div tabIndex={id} role="button" className={"input input-bordered mt-1 w-full flex items-center " + props.className}>{hint}</div>
        <ul tabIndex={id} className="dropdown-content z-[1] menu shadow bg-base-100 w-full rounded-lg rounded-t-none">
            {options}
        </ul>
    </div>
    );
}

export default InputSelectMultiple;