import { RouterProvider } from 'react-router-dom'
import router from './router/router'

import ToastContainer from './toast/ToastContainer'

import { useState } from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { getTheme } from './redux/slices/theme';
function load(){
    return new Promise((Resolve, Reject) => {
        setTimeout(() => Resolve("done"), 1000);
    });
};

function App(){
    let [isLoaded, setIsLoaded] = useState(false);
    const theme = useSelector(getTheme);
    useEffect(() => {
        async function initialLoad() {
            let response = await load();
            setIsLoaded(true);
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
        {isLoaded && 
        <>
            <RouterProvider router={router}/>
            <ToastContainer/>
        </>
        }
        {!isLoaded && loading
        }
        </>
    );
}

export default App;