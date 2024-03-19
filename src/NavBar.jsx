import { useState } from "react";
import NavLink from "./NavLink";
import NavBarThemeToggle from "./NavBarThemeToggle";
function NavBar(props){
    let [showDropdown, setShowDropdown] = useState(false);
    let [theme, setTheme] = useState("night");

    function toggleDropdown(){
        setShowDropdown(!showDropdown);
    }

    function swapTheme(){
        console.log("clicked");
        if(theme === "night"){
            setTheme("light");
        }else{
            setTheme("night");
        }
    }

    return(
    <nav className="navbar bg-base-200 border-b-2 flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex-1">
            <NavLink to="/" text="Formify" className="text-primary text-2xl"/>
        </div>
        <button type="button" onClick={toggleDropdown} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 bg-white hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className={`${showDropdown ? "" : "hidden"} w-full md:block md:w-auto bg-base-200`}>
            <ul className="w-full font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <NavBarThemeToggle/>
                {props.links}
            </ul>
        </div>
    </nav>
    );
};

export default NavBar;