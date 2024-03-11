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
    
    let inputClass = "";

    let label = false;
    if(props.label){
        label = <label htmlFor={id}>{props.label}</label>
    }

    if(props.type === "select_multiple"){
        label = false;
    }

    let error = <span>{props.error}</span>

    let handleInputChange = function(value){
        props.onChange(value);
    }

    return (
    <div className={width + " flex flex-col justify-center content-center px-4"}>
        {label && label}
        <InputAdaptable onChange={handleInputChange} 
        value={props.value} className={inputClass} id={id} {...props}/>
        {props.error && error}
    </div>
    );
}

export default FormInputsItem;