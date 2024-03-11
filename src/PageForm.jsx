import FormComplete from './FormComplete'

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
    <div className='w-6/12 mx-auto'>
      <FormComplete form={formJSON} onSubmit={helloWorld}/>
    </div>
    </>
  )
}

export default PageForm
