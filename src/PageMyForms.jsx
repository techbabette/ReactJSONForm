import { useState, useEffect } from 'react';
import axios from './axios/axios';
import { useNavigate } from 'react-router-dom';
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
        <div className='w-6/12 mx-auto flex flex-row border bg-base-200 hover:bg-primary-content rounded-lg p-2 my-4 text-center' key={form.id}>
            <div className='w-4/12 border-1 border-base-300'>
                <h1 className='h-full mk-text-center underline'>{form.name}</h1>
            </div>
            <div className='w-8/12 flex flex-col'>
                <button className=' btn border-0 my-1 rounded-sm btn-primary'>View responses ({form.number_of_responses})</button>
                <button className=' btn border-0 my-1 rounded-sm btn-secondary'>Copy link</button>
            </div>
        </div>
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
