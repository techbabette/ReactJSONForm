import { RouterProvider } from 'react-router-dom'
import router from './router/router'

import store from "./redux/store";
import { Provider } from 'react-redux'

import ToastContainer from './toast/ToastContainer'

import { useState } from 'react';
import { useEffect } from 'react';

function load(){
    return new Promise((Resolve, Reject) => {
        setTimeout(() => Resolve("done"), 1000);
    });
};

function App(){
    let [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function initialLoad() {
            let response = await load();
            setIsLoaded(true);
        }

        initialLoad();
    }, []);

    let loading = 
    <div className='w-full h-screen mk-text-center'>
        <p className='my-2 text-8xl text-primary'>Formify</p>
        <span className="loading loading-spinner mx-auto loading-lg"></span>
    </div>

    return (
    <Provider store={store}>
        {isLoaded && 
        <>
            <RouterProvider router={router}/>
            <ToastContainer/>
        </>
        }
        {!isLoaded && loading
        }
    </Provider>
    );
}

export default App;