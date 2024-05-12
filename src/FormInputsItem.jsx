import React, { useEffect } from "react"
import InputAdaptable from "./InputAdaptable";
function FormInputsItem(props){
    let id = props.id ?? Math.floor(Math.random() * 5000);

    useEffect(() => {
        props.remove_value();
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
    
    let inputClass = " w-full text-left";

    let label = false;
    if(props.label){
        label = <label htmlFor={id} className="py-1">{props.label}</label>
    }

    if(props.type.type === "select_multiple"){
        label = false;
    }

    let type = props.type.type;
    let no_hint = false;

    if(type === "select_without_hint"){
        type = "select"
        no_hint = true;
    }

    let error = <span className="alert alert-warning mb-2 rounded-t-none">{props.error}</span>

    if(props.error){
        inputClass += " rounded-b-none"
    }

    let handleInputChange = function(value){
        props.onChange(value);
    }

    return (
    <div className={width + " form-group"}>
        {label && label}
        <InputAdaptable onChange={handleInputChange} 
        value={props.value} className={inputClass} id={id} {...props} remove_value="0" 
        type={type} no_hint={no_hint}/>
        {props.error && error}
    </div>
    );
}

export default FormInputsItem;