import { useState, useEffect, useRef } from 'react';
import FormComplete from './FormComplete'
import NavBar from './NavBar';
import NavLink from './NavLink';
import axios from './axios/axios';
import { useNavigate, useParams } from 'react-router-dom';
import getFormFromResponse from './lib/formFromResponse';
import { getLinksForPosition } from './redux/slices/user';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
function PageForm() {
  let {id} = useParams();
  let [form, setForm] = useState({});
  let [loaded, setLoaded] = useState(false);
  let [error, setError] = useState(null);
  const navigate = useNavigate();
  const submitToastr = useRef(null);
  const linksForPosition = useSelector((state) => getLinksForPosition(state, "visiting_form_navbar"));

  useEffect(() => {
    async function loadForm() {
      let result = await axios.get(`/forms/${id}`);
      if(result.success){
        setForm(getFormFromResponse(result.data.body));
        setLoaded(true);
        return;
      }
      console.log("here");
      setError(true);
    }

    loadForm();
  }, [])

  async function saveFormResponse(data){
    if(submitToastr.current){
      return;
    }

    submitToastr.current = toast.loading("Attempting to submit form", {autoClose : true});

    let result = await axios.postForm(`forms/${id}/responses`, data);

    if(result.success){
      navigate("/");
      toast.update(submitToastr.current, {render : "Successfully submitted response", type : 'success', isLoading : false, autoClose : true, className : 'alert alert-success'});
    }
    else{
      toast.update(submitToastr.current, {render : result.error, type: "error", isLoading : false, autoClose : true, className : 'alert alert-error'});
    }

    submitToastr.current = null;
  }

  let links = linksForPosition.map((link, index) => <NavLink key={index} to={link.to} text={link.text} className="text-accent"/>) 
  return (
    <>
    {loaded && 
    <>
    <NavBar links={links}/>
    <div className='w-11/12 md:w-6/12 mx-auto solo-page flex justify-center items-center'>
      <FormComplete form={form} onSubmit={saveFormResponse}/>
    </div>
    </>}
    {(!loaded && !error) && 
    <div className='w-full h-screen mk-text-center'>
        <p className='my-2 text-8xl text-primary'>Loading form</p>
        <span className="loading loading-spinner mx-auto loading-lg"></span>
    </div>
    }
    {error && 
    <>
      <NavBar links={links}/>
      <div className='w-11/12 md:w-6/12 mx-auto solo-page flex justify-center items-center'>
        <p className='my-2 text-8xl text-primary'>Form not found</p>
      </div>
    </>
    }
    </>
  )
}

export default PageForm
