import { useState, useEffect } from 'react';
import axios from './axios/axios';
import { useNavigate } from 'react-router-dom';
import PageMyFormsForm from './PageMyFormsForm';
import ButtonsPagination from './ButtonsPagination';
function PageMyForms() {
  let [loaded, setLoaded] = useState(false);
  let [error, setError] = useState(false);
  let [forms, setForms] = useState(null);
  let [page, setPage] = useState(1);
  let [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getForms();
  }, [])

  useEffect(() => {
    getForms(page);
  }, [page])

  async function getForms(page = 1){
    let result = await axios.get(`forms/me`, {params : {page}});
    console.log(page);
    if(result.success){
        setLastPage(result.data.body.last_page);
        setForms(result.data.body.data);
    }
    else{
        setError(true);
    }
  }

  let formsHTML = forms?.map((form) => {
    return (
        <PageMyFormsForm form={form} key={form.id}/>
    )
  })

  let pageControl = <ButtonsPagination page={page} setPage={setPage} lastPage={lastPage}/>

  return (
    <div className='w-full h-screen'>
        <p className='my-3 text-2xl mk-text-center text-primary'>These are your forms</p>
        {(!forms && !error) && <span className="loading loading-spinner mk-text-center my-auto mx-auto loading-lg"></span>}
        {error && "Your forms could not be retrieved"}
        {(forms && forms.length === 0) && "No forms found"}
        {(forms && forms.length > 0) && 
        <>
        <div className='border-1 border-base-100 bg-base-100'>
            {formsHTML}
        </div>
        <div className="w-11/12 md:w-6/12 mx-auto">
        {pageControl}
        </div>
        </>
        }
    </div>
  )
}

export default PageMyForms;
