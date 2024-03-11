import React from "react";
import InputSelectMultiple from "./InputSelectMultiple";
function InputAdaptable(props){
    let id = props.id ?? Math.floor(Math.random() * 5000);

    let inputField = <input type="text" name={id} id={id} />;

    let className = props.className;
    if(props.type === "text"){
        className += " input input-bordered"
        inputField = <input type="text" name={id} id={id} />
    }

    if(props.type === "email"){
        className += " input input-bordered"
        inputField = <input type="email" name={id} id={id} />
    }

    if(props.type === "number"){
        className += " input input-bordered"
        inputField = <input type="number" name={id} id={id} />
    }

    if(props.type === "select"){
        className += " select select-bordered"
        let option_value_field = props.option_value_field ?? "__";
        let option_text_field = props.option_text_field ?? "__";

        let hintOption = <option value={0} disabled={true}>{props.hint ?? "Select one"}</option>

        let options = props.options.map((option, index) => {
            let option_value = option_value_field === "__" ? option : option[option_value_field];
            let option_text = option_text_field === "__" ? option : option[option_text_field];
            return <option key={index} value={option_value}>{option_text}</option>;
        })

        inputField = 
        <select name={id} id={id}>
            {hintOption}
            {options}
        </select>
    }

    if(props.type === "select_multiple"){
        inputField = <InputSelectMultiple name={id} id={id}/>
    }

    function bubbleValue(event){
        let value;
        if(props.type !== "select_multiple"){
            value = event.target.value;
            props.onChange(value);
            return;
        }

        value = event;
        props.onChange(value);
    }

    inputField = React.cloneElement(inputField, { ...props, onChange: bubbleValue, value : props.value, className : className });

    return (
    <>
        {inputField}
    </>
    );
}

export default InputAdaptable;