import { Outlet } from "react-router-dom";
import NavLink from "./NavLink";
import { useState } from "react";

function LayoutStandard(){
    let [showDropdown, setShowDropdown] = useState(false);

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

    function toggleDropdown(){
        setShowDropdown(!showDropdown);
    }

    function disableDropdown(){
        setShowDropdown(false);
    }

    let links = linksToRender.map((link, index) => <NavLink key={index} to={link.to} text={link.text}/>) 
    
    return (
    <>
    <nav className="navbar bg-base-100 border-b-2 flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex-1">
            <NavLink to="/" text="Formify" className="text-primary text-2xl"/>
        </div>
        <button type="button" onClick={toggleDropdown} onBlur={disableDropdown} class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className={`${showDropdown ? "" : "hidden"} w-full md:block md:w-auto`}>
            <ul className="w-full font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links}
            </ul>
        </div>
    </nav>

    <Outlet/>
    </>
    );
}

export default LayoutStandard;