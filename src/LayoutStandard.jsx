import { Outlet, useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import NavBar from "./NavBar";
import { useRef } from "react";

import { getLinksForPosition, getUserGroup, setJWT } from './redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import axios from "./axios/axios";

function LayoutStandard(){
    const linksForPosition = useSelector((state) => getLinksForPosition(state, "main_navbar"));
    const userGroup = useSelector(getUserGroup);
    let links = linksForPosition.map((link, index) => <NavLink key={index} to={link.to} text={link.text}/>) 
    
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

    let logoutButton = <a key={"logoutbutton"} onClick={handleLogout} className="px-2 mk-text-center">Log me out</a>

    let buttons = userGroup != "Logged out" ? [logoutButton] : []

    return (
    <>
    <NavBar links={links} buttons={buttons}/>
    <Outlet/>
    </>
    );
}

export default LayoutStandard;