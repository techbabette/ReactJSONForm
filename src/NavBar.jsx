import NavLink from "./NavLink";
import NavBarDropdown from "./NavBarDropdown";
function NavBar(props){
    return(
    <nav className="navbar bg-base-200 border-b-2 flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex-1">
            <NavLink to="/" text="Formify" className="text-primary text-2xl"/>
        </div>
        <NavBarDropdown links={props.links}/>
    </nav>
    );
};

export default NavBar;