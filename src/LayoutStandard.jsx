import { Outlet } from "react-router-dom";
import NavLink from "./NavLink";
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
    <nav className="navbar bg-base-100 border-b-2">
        <div className="flex-1">
            <NavLink to="/" text="Formify" className="text-primary text-2xl"/>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            {links}
            </ul>
        </div>
    </nav>

    <Outlet/>
    </>
    );
}

export default LayoutStandard;