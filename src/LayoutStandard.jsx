import { Outlet } from "react-router-dom";
import NavLink from "./NavLink";
import NavBar from "./NavBar";

import { getLinksForPosition } from './redux/slices/user';
import { useSelector } from 'react-redux';
function LayoutStandard(){
    const linksForPosition = useSelector((state) => getLinksForPosition(state, "main_navbar"));

    let links = linksForPosition.map((link, index) => <NavLink key={index} to={link.to} text={link.text}/>) 
    
    return (
    <>
    <NavBar links={links}/>
    <Outlet/>
    </>
    );
}

export default LayoutStandard;