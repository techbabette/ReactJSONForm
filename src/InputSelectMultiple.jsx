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

    let option_value_field = props.option_value_field ?? "__";
    let option_text_field = props.option_text_field ?? "__";

    let options = props.options.map((option, index) => {
        let option_value = option_value_field === "__" ? option : option[option_value_field];
        let option_text = option_text_field === "__" ? option : option[option_text_field];

        return (
        <li key={index}>
            <label className="label cursor-pointer">
                <span className="label-text">{option_text}</span> 
                <input type="checkbox" value={option_value} className="checkbox" onChange={handleChange}/>
            </label>
        </li>
        )
    })

    let hint = props.hint;

    if(props.value.length > 0){
        let hints = [];
        props.value.forEach((value)  => {
            if(option_text_field === "__" && option_value_field === "__"){
                hints.push(value);
            }else{
                let option = props.options.filter((el) => el[option_value_field] === value);
                let optionText = option[option_text_field];
                hints.push(optionText);
            }
        })
        hint = hints.join(", ");
    }

    return (
    <div className={"dropdown " + props.className}>
        <label tabIndex={id} htmlFor={id} role="button" className="w-full">{props.label}</label>
        <div tabIndex={id} role="button" className="input input-bordered m-1 w-full flex items-center">{hint}</div>
        <ul tabIndex={id} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-full rounded-box">
            {options}
        </ul>
    </div>
    );
}

export default InputSelectMultiple;