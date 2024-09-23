import { Outlet } from "react-router-dom";
import NavLink from "./NavLink";
import NavBar from "./NavBar";

import { getLinksForPosition, getUserGroup } from './redux/slices/user';
import { useSelector } from 'react-redux';

import LogoutButton from "./LogoutButton";

function LayoutStandard(){
    const linksForPosition = useSelector((state) => getLinksForPosition(state, "main_navbar"));
    const userGroup = useSelector(getUserGroup);
    let links = linksForPosition.map((link, index) => <NavLink key={index} to={link.to} text={link.text}/>) 
    
    let buttons = userGroup != "Logged out" ? <LogoutButton/> : []

    return (
    <>
    <NavBar links={links} buttons={buttons}/>
    <Outlet/>
    </>
    );
}

export default LayoutStandard;