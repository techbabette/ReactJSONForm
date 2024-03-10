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