import { Link, useMatch } from "react-router-dom";

function NavLink(props){
    function linkActive (){
        return useMatch(props.to);
    }
    
    function linkClass(){
        let returnClass = props.className;
        let active = linkActive();
        
        if(active){
            return returnClass + " px-2 text-primary"
        }
    
        return returnClass + " px-2"
    }

    return (
        <Link to={props.to} 
        className={linkClass()}>
        {props.text}
        </Link>
    );
}

export default NavLink;