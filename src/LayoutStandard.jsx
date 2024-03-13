import { Outlet } from "react-router-dom";
import NavLink from "./NavLink";
import NavBar from "./NavBar";

function LayoutStandard(){
    let linksForEveryone = [
        {
            to : "/",
            text: "Home"
        },
        {
            to : "/form/new",
            text: "Create new form"
        },
    ]

    let authenticationLinks = [
        {
            to : "/login",
            text : "Login"
        },
        {
            to : "/register",
            text: "Register"
        }
    ]

    let linksToRender = linksForEveryone;

    let userLoggedIn = false;
    if(!userLoggedIn){
        linksToRender = linksToRender.concat(authenticationLinks);
    }

    let links = linksToRender.map((link, index) => <NavLink key={index} to={link.to} text={link.text}/>) 
    
    return (
    <>
    <NavBar links={links}/>
    <Outlet/>
    </>
    );
}

export default LayoutStandard;