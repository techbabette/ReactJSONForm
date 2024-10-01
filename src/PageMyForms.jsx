import { useState, useEffect } from 'react';
import axios from './axios/axios';
import { useNavigate } from 'react-router-dom';
import PageMyFormsForm from './PageMyFormsForm';
function PageMyForms() {
  let [loaded, setLoaded] = useState(false);
  let [error, setError] = useState(false);
  let [forms, setForms] = useState(null);
  let [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getForms();
  }, [])

  async function getForms(page = 1){
    let result = await axios.get(`forms/me`, {page});

    if(result.success){
        setForms(result.data.body.data);
    }
    else{
        setError(true);
    }
  }

  let formsHTML = forms?.map((form) => {
    return (
        <PageMyFormsForm form={form}/>
    )
  })

  return (
    <div className='w-full h-screen'>
        <p className='my-3 text-2xl mk-text-center text-primary'>These are your forms</p>
        {(!forms && !error) && <span className="loading loading-spinner mk-text-center mx-auto loading-lg"></span>}
        {error && "Your forms could not be retrieved"}
        {(forms && forms.length === 0) && "No forms found"}
        {(forms && forms.length > 0) && 
            formsHTML
        }
    </div>
  )
}

export default PageMyForms;
