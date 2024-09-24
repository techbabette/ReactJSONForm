import { useState, useEffect } from 'react';
import FormComplete from './FormComplete'
import NavBar from './NavBar';
import NavLink from './NavLink';
import axios from './axios/axios';
import { useParams } from 'react-router-dom';
import getFormFromResponse from './lib/formFromResponse';
import { getLinksForPosition } from './redux/slices/user';
import { useSelector } from 'react-redux';
function PageForm() {
  let {id} = useParams();
  let [form, setForm] = useState({});
  let [loaded, setLoaded] = useState(false);
  const linksForPosition = useSelector((state) => getLinksForPosition(state, "visiting_form_navbar"));

  useEffect(() => {
    async function loadForm() {
      let result = await axios.get(`/forms/${id}`);
      if(result.success){
        setForm(getFormFromResponse(result.data.body));
        setLoaded(true);
        return;
      }
    }

    loadForm();
  }, [])

  function helloWorld(data){
    console.log("Hello world");
    console.log(data);
  }

  let links = linksForPosition.map((link, index) => <NavLink key={index} to={link.to} text={link.text} className="text-accent"/>) 
  return (
    <>
    {loaded && 
    <>
    <NavBar links={links}/>
    <div className='w-11/12 md:w-6/12 mx-auto solo-page flex justify-center items-center'>
      <FormComplete form={form} onSubmit={helloWorld}/>
    </div>
    </>}
    {!loaded && 
    <div className='w-full h-screen mk-text-center'>
        <p className='my-2 text-8xl text-primary'>Loading form</p>
        <span className="loading loading-spinner mx-auto loading-lg"></span>
    </div>

    }
    </>
  )
}

export default PageForm
