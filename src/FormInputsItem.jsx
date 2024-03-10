import React from "react"
import InputAdaptable from "./InputAdaptable";
function FormInputsItem(props){
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

    let handleInputChange = function(value){
        props.onChange(value);
    }

    return (
    <div className={width + " flex flex-col justify-center content-center px-4"}>
        {props.label && label}
        <InputAdaptable onChange={handleInputChange} 
        value={props.value} className={inputClass} id={id} {...props}/>
        {props.error && error}
    </div>
    );
}

export default FormInputsItem;