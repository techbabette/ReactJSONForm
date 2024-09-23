import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import axios from "./axios/axios";
import { setJWT } from "./redux/slices/user";
function LogoutButton(){
    const logoutToastr = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout(){
        if(logoutToastr.current){
            return;
        }
    
        logoutToastr.current = toast.loading("Attempting logout", {autoclose : true});
    
        let result = await axios.get("auth/logout");
    
        console.log(result);
    
        if(result.success){
            dispatch(setJWT(""));
            navigate("/");
            toast.update(logoutToastr.current, {render : "Successfully logged out", type : 'success', isLoading : false, autoClose : true, className : 'alert alert-success'});
        }else{
            toast.update(logoutToastr.current, {render : result.error, type: "error", isLoading : false, autoClose : true, className : 'alert alert-error'});
        }
    
        logoutToastr.current = null;
    }

    return (
        <a key={"logoutbutton"} onClick={handleLogout} className="px-2 mk-text-center cursor-pointer">Log out</a>
    )
}

export default LogoutButton