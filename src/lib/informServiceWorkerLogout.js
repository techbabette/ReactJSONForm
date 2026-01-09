function informServiceWorkerLogout(){
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: "LOGOUT"
        })
        return true;
    }
    return false;
}

export default informServiceWorkerLogout;