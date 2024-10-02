import { useState, useEffect } from 'react';
import axios from './axios/axios';
import ButtonsPagination from './ButtonsPagination';
import { useParams } from 'react-router-dom';
function PageFormResponses() {
  let {id} = useParams();
  let [error, setError] = useState(false);
  let [responses, setResponses] = useState(null);
  let [page, setPage] = useState(1);
  let [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    console.log("here");
    getResponses();
  }, [])

  useEffect(() => {
    getResponses(page);
  }, [page])

  async function getResponses(page = 1){
    let result = await axios.get(`forms/${id}/responses`, {params : {page}});
    if(result.success){
        setLastPage(result.data.body.last_page);
        setResponses(result.data.body.data);
        setError(false);
    }
    else{
        setError(true);
    }
  }

  let responsesHTML = responses ? responses.map((response) => {
    console.log(response);
    let responseValuesHTML = [];
    for(let valueKey of Object.keys(response.values)){
        console.log(valueKey);
        let valueOfKey = response.values[valueKey] instanceof Array ? response.values[valueKey].join(", ") : response.values[valueKey];
        responseValuesHTML.push(<p>{valueKey}: {valueOfKey}</p>)
    }
    return (
        <div className='w-11/12 md:w-6/12 mx-auto flex flex-col flex-wrap border bg-base-200 hover:bg-primary-content rounded-lg p-2 my-4 text-left'>
            <p>Response created on {response.created_at}</p>
            <hr/>
            {responseValuesHTML}
        </div>
    )
  }) : null;

  let pageControl = <ButtonsPagination page={page} setPage={setPage} lastPage={lastPage}/>

  return (
    <div className='w-full h-screen'>
        <p className='my-3 text-2xl mk-text-center text-primary'>These are the responses for form with id of {id}</p>
        {(!responses && !error) && <span className="loading loading-spinner mk-text-center my-auto mx-auto loading-lg"></span>}
        {error && <span className="mk-text-center my-auto mx-auto">Your responses could not be retrieved</span>}
        {(responses && responses.length === 0) && <span className="mk-text-center my-auto mx-auto">No responses found</span>}
        {(responses && responses.length > 0) && 
        <>
        <div className='border-1 border-base-100 bg-base-100'>
            {responsesHTML}
        </div>
        <div className="w-11/12 md:w-6/12 mx-auto">
        {pageControl}
        </div>
        </>
        }
    </div>
  )
}

export default PageFormResponses;
