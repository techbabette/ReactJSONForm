import { useState, useEffect } from 'react';
import FormComplete from './FormComplete'
import NavBar from './NavBar';
import NavLink from './NavLink';
import axios from './axios/axios';
import { useParams } from 'react-router-dom';
import getFormFromResponse from './lib/formFromResponse';

let formJSON = {
  formId : 1,
  formName : "New form",
  formDirection : "row",
  formElements : {
      2 : {
          type : {
            id: 1,
            text : "Text",
            type: "text"
          },
          label : "Last name",
          required : true,
          width : 6,
          weight : 99
      },
      3 : {
          type : {
            id: 2,
            text : "Email",
            type: "email"
          },
          label : "Email",
          required : true,
          width : 12,
          weight : 98
      },
      1 : {
          type : {
            id: 1,
            text : "Text",
            type: "text"
          },
          label : "First name",
          required : true,
          width : 6,
          weight : 100,
      },
      4 : {
          type : {
            id: 3,
            text : "Select",
            type: "select"
          },
          label : "Select city",
          required : true,
          width : 12,
          weight : 97,
          options : ["Belgrade", "Novi sad", "Nis"]
      },
      5 : {
          type : {
            id: 3,
            text : "Select multiple",
            type: "select_multiple"
          },
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
  let {id} = useParams();
  let [form, setForm] = useState({});

  function helloWorld(data){
    console.log("Hello world");
    console.log(data);
  }


  useEffect(() => {
    async function loadForm() {
      let result = await axios.get(`/form/${id}`);
      console.log(result);
      if(result.success){
        setForm(getFormFromResponse(result.data.body));
        return;
      }

      setForm(formJSON);
    }

    loadForm();
  }, [])

  let links = <NavLink to="form/new" text="Make your own form here" className="text-accent"/>

  return (
    <>
    <NavBar links={links}/>

    <div className='w-11/12 md:w-6/12 mx-auto solo-page flex justify-center items-center'>
      <FormComplete form={form} onSubmit={helloWorld}/>
    </div>
    </>
  )
}

export default PageForm
