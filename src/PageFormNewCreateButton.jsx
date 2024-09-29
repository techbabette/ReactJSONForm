import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "./axios/axios";
function PageFormNewCreateButton(props){
    const createToastr = useRef(null);
    const navigate = useNavigate();
    async function submit(){
        //TODO: Check all fields valid before submitting
        if(createToastr.current){
            return;
        }

        if(!localStorage.getItem("newFormState")){
            toast.info("Make changes to the form before saving");
            return;
        }

        if(!localStorage.getItem("JWT")){
            navigate("/register");
            toast.info("Register or login to save your form");
            return;
        }

        createToastr.current = toast.loading("Attempting to create form", {autoClose : true});

        let result = await axios.postForm("/forms", props.form);

        if(result.success){
            localStorage.setItem("newFormState", "");
            let newFormId = result.data.body.id;
            navigate(`/form/${newFormId}`);
            toast.update(createToastr.current, {render : "Successfully created form", type : 'success', isLoading : false, autoClose : true, className : 'alert alert-success'});
        }else{
            toast.update(createToastr.current, {render : result.error, type: "error", isLoading : false, autoClose : true, className : 'alert alert-error'});
        }
    
        createToastr.current = null;
    }

    return (
        <button type="button" className="btn btn-primary my-2" onClick={submit}>Create form</button>
    )
}

export default PageFormNewCreateButton;