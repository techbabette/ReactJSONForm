import React from "react";
function InputAdaptable(props){
    let id = props.id ?? Math.floor(Math.random() * 5000);

    let inputField = <input type="text" name={id} id={id} />;

    if(props.type === "text"){
        inputField = <input type="text" name={id} id={id} />
    }

    if(props.type === "number"){
        inputField = <input type="number" name={id} id={id} />
    }

    if(props.type === "select"){
        let option_value_field = props.option_value_field ?? "__";
        let option_text_field = props.option_text_field ?? "__";

        let options = props.options.map((option, index) => {
            let option_value = option_value_field === "__" ? option : option[option_value_field];
            let option_text = option_text_field === "__" ? option : option[option_text_field];
            return <option key={index} value={option_value}>{option_text}</option>;
        })

        inputField = 
        <select name={id} id={id}>
            {options}
        </select>
    }

    function bubbleValue(event){
        let value = event.target.value;
        props.onChange(value);
    }

    inputField = React.cloneElement(inputField, { onChange: bubbleValue, value : props.value, className : props.className });

    return (
    <>
        {inputField}
    </>
    );
}

export default InputAdaptable;