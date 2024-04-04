import NavLink from "./NavLink";
function PageWelcome(){

    let callToAction = <NavLink className="btn btn-secondary w-1/2 m-2" to={"/form/new"} text={"Create new form"}/>

    return (
        <div className="w-9/12 sm:w-6/12 mx-auto solo-page flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center rounded-lg bg-base-200 p-10 border-4 border-secondary">
                <p className="text-4xl md:text-6xl bold text-center">Welcome to Formify</p>
                <p>Easy forms, for everyone!</p>
                {callToAction}
            </div>
        </div>
    );
}

export default PageWelcome;