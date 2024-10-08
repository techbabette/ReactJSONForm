import React from "react";
import InputSelectMultiple from "./InputSelectMultiple";
function InputAdaptable(props){
    let id = props.id ?? Math.floor(Math.random() * 5000);

    let inputField = <input type="text" name={id} id={id} placeholder={props.placeholder ?? ""}/>;

    let className = props.className;

    let value = props.value;

    if(props.type === "text"){
        className += " input input-bordered"
        inputField = <input type="text" name={id} id={id} placeholder={props.placeholder ?? ""}/>
    }

    if(props.type === "password"){
        className += " input input-bordered"
        inputField = <input type="password" name={id} id={id} placeholder={props.placeholder ?? ""}/>
    }

    if(props.type === "email"){
        className += " input input-bordered"
        inputField = <input type="email" name={id} id={id} placeholder={props.placeholder ?? ""}/>
    }

    if(props.type === "number"){
        className += " input input-bordered"
        inputField = <input type="number" name={id} id={id} placeholder={props.placeholder ?? ""} 
                      min={props.minimum} max={props.maximum}/>
    }

    if(props.type === "select"){
        className += " select select-bordered"
        let option_value_field = props.option_value_field ?? "__";
        let option_text_field = props.option_text_field ?? "__";

        let hintOption = <option value={0} disabled={true}>{props.hint ?? "Select one"}</option>

        let options = props.options?.map((option, index) => {
            let option_value = option_value_field === "__" ? option : option[option_value_field];
            let option_text = option_text_field === "__" ? option : option[option_text_field];
            let option_disabled = typeof option === 'object' ? option.disabled : false;
            if(!option_text){
                return;
            }
            return <option key={index} value={option_value} disabled={option_disabled}>{option_text}</option>;
        })

        inputField = 
        <select name={id} id={id}>
            {(!props.no_hint) && hintOption}
            {options}
        </select>
    }

    if(props.type === "select_multiple"){
        inputField = <InputSelectMultiple name={id} id={id}/>
    }

    function bubbleValue(event){
        let value;


        if(props.type === "number" && props.limitInput){
            if(props.minimum && event.target.value < props.minimum){
                props.onChange(props.minimum);
                return;
            }

            if(props.maximum && event.target.value > props.maximum){
                props.onChange(props.maximum);
                return;
            }
        }

        if(props.type !== "select_multiple"){
            value = event.target.value;
            props.onChange(value);
            return;
        }

        value = event;
        props.onChange(value);
    }

    inputField = React.cloneElement(inputField, { ...props, onChange: bubbleValue, value, className : className });

    return (
    <>
        {inputField}
    </>
    );
}

export default InputAdaptable;