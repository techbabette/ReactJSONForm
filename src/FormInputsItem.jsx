import React, { useEffect } from "react"
import InputAdaptable from "./InputAdaptable";
function FormInputsItem(props){
    let id = props.id ?? Math.floor(Math.random() * 5000);

    useEffect(() => {
        if(props.value == '0'){
            return;
        }

        if(Array.isArray(props.value) && !props.value.length){
            return;
        }

        if(props.type.type === 'select'){
            props.onChange("0");
        }

        if(props.type.type === 'select_multiple'){
            props.onChange([]);
        }
        
    }, [props.options])

    useEffect(() => {
        props.remove_value();
    }, [props.type.type])

    let width = "";
    if(props.width != 12){
        width = `w-${props.width}\/12`;
    }else{
        width = `w-full`;
    }
    
    let inputClass = "";

    let label = false;
    if(props.label){
        label = <label htmlFor={id} className="py-1">{props.label}</label>
    }

    if(props.type.type === "select_multiple"){
        label = false;
    }

    let error = <span className="alert alert-warning mb-2 rounded-t-none">{props.error}</span>

    if(props.error){
        inputClass += " rounded-b-none"
    }

    let handleInputChange = function(value){
        props.onChange(value);
    }

    let {remove_value, propsToSendDown} = props

    return (
    <div className={width + " flex flex-col justify-center content-center px-4"}>
        {label && label}
        <InputAdaptable onChange={handleInputChange} 
        value={props.value} className={inputClass} id={id} {...propsToSendDown} type={props.type.type}/>
        {props.error && error}
    </div>
    );
}

export default FormInputsItem;