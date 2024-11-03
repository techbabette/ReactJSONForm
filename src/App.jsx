import { RouterProvider } from 'react-router-dom'
import router from './router/router'

import ToastContainer from './toast/ToastContainer'

import { useEffect, useRef, useState } from 'react';

import { getTheme } from './redux/slices/theme';
import axios from "./axios/axios";
import { useDispatch, useSelector } from 'react-redux';
import { setLinks, getLinks } from './redux/slices/user';

function App(){
    const theme = useSelector(getTheme);
    const links = useSelector(getLinks);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const sent = useRef(false);
    useEffect(() => {
        async function initialLoad() {
            sent.current = true;
            let result = await axios.get('/links');
            if(result.success){
                dispatch(setLinks(result.data));
            }
            else{
                setError("Formify is currently offline");
            }
        }

        if(!sent.current){
            initialLoad();
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    let loading = 
    <div className='w-full h-screen mk-text-center'>
        <p className='my-2 text-8xl text-primary'>Formify</p>
        <span className="loading loading-spinner mx-auto loading-lg"></span>
    </div>

    return (
        <>
        {links && 
        <>
            <RouterProvider router={router}/>
            <ToastContainer/>
        </>
        }
        {(!links && !error) && loading
        }
        {error && 
            <>
            <div className='w-full h-screen mk-text-center'>
                <p className='my-2 text-8xl text-primary'>{error}</p>
            </div>
            </>
        }
        </>
    );
}

export default App;