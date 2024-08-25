import { RouterProvider } from 'react-router-dom'
import router from './router/router'

import ToastContainer from './toast/ToastContainer'

import { useEffect } from 'react';

import { getTheme } from './redux/slices/theme';
import axios from "./axios/axios";
import { useDispatch, useSelector } from 'react-redux';
import { setLinks, getLinks } from './redux/slices/user';

function App(){
    const theme = useSelector(getTheme);
    const links = useSelector(getLinks);
    const dispatch = useDispatch();

    useEffect(() => {
        async function initialLoad() {
            let result = await axios.get('/links');
            dispatch(setLinks(result.data));
        }

        initialLoad();
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
        {!links && loading
        }
        </>
    );
}

export default App;