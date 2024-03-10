import React from "react"

function InputAdaptable(props){
    let id = props.id ?? Math.floor(Math.random() * 5000);

    let width = "";
    if(props.width !== 12){
        width = `w-${props.width}/12`;
    }else{
        width = `w-full`;
    }
    
    let inputClass = "border-black border-2";

    let label = <label htmlFor={id}>{props.label}</label>
    let error = <span>{props.error}</span>

    let inputField = <input type="text" name={id} id={id} />;

    if(props.type === "text"){
        inputField = <input type="text" name={id} id={id} />
    }

    if(props.type === "number"){
        inputField = <input type="number" name={id} id={id} />
    }

    function handleInputChange(key, e){
        let value = e.target.value;

        props.onChange(value, key);
    } 

    //Bind input field
    inputField = React.cloneElement(inputField, { onChange: (e) => handleInputChange(id, e), value : props.value, className : inputClass });

    return (
    <div className={width + " flex flex-col justify-center content-center px-4"}>
        {props.label && label}
        {inputField}
        {props.error && error}
    </div>
    );
}

export default InputAdaptable;