import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'

import store from "./redux/store";
import { Provider } from 'react-redux'

import ToastContainer from './toast/ToastContainer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </Provider>
  </React.StrictMode>,
)
