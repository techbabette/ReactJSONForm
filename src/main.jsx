import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from "./redux/store";

function registerServiceWorker(){
  navigator.serviceWorker.register("/sw.js").then((registration) => {
    console.log("Service worker registered", registration);
  })
  .catch((reason) => {
    console.error("Service worker registration failed", reason);
  })
}

function serviceWorker() {
  if ('serviceWorker' in navigator){
      registerServiceWorker();
  }
  else {
      console.log("Service workers not available");
  }
}

serviceWorker();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)
