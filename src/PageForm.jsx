import FormComplete from './FormComplete'
import NavLink from './NavLink';

let formJSON = {
  formId : 1,
  formName : "New form",
  formDirection : "row",
  formElements : {
      2 : {
          type : "text",
          label : "Last name",
          required : true,
          width : 6,
          weight : 99
      },
      3 : {
          type : "email",
          label : "Email",
          required : true,
          width : 12,
          weight : 98
      },
      1 : {
          type : "text",
          label : "First name",
          required : true,
          width : 6,
          weight : 100,
      },
      4 : {
          type : "select",
          label : "Select city",
          required : true,
          width : 12,
          weight : 97,
          options : ["Belgrade", "Novi sad", "Nis"]
      },
      5 : {
          type : "select_multiple",
          label : "Select classes",
          required : true,
          hint : "Select multiple",
          width : 12,
          weight : 96,
          options : ["C#", "PHP", "React"]
      }
  }
}

function PageForm() {
  function helloWorld(data){
    console.log("Hello world");
    console.log(data);
  }

  return (
    <>
    <nav className="navbar bg-base-100 border-b-2">
        <div className="flex-1">
            <NavLink to="/" text="Formify" className="text-primary"/>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <NavLink to="form/new" text="Make your own form here" className="text-accent"/>
            </ul>
        </div>
    </nav>

    <div className='w-6/12 mx-auto'>
      <FormComplete form={formJSON} onSubmit={helloWorld}/>
    </div>
    </>
  )
}

export default PageForm
