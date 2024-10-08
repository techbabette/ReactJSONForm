import { useState } from "react";
import NavBarThemeToggle from "./NavBarThemeToggle";

function NavBarDropdown(props){
    let [showDropdown, setShowDropdown] = useState(false);

    function toggleDropdown(){
        setShowDropdown(!showDropdown);
    }

    return (
        <>
    <button type="button" onClick={toggleDropdown} className={"inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden bg-base border border-secondary" + (showDropdown ? " border-4" : "")} aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className={`${showDropdown ? "" : "hidden"} w-full md:block md:w-auto bg-base-200`}>
        <ul className="w-full font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
        <NavBarThemeToggle/>
            {props.links}
            {props.buttons}
        </ul>
    </div>
    </>
    );
}

export default NavBarDropdown;