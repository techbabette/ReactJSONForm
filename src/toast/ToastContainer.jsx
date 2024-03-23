import { ToastContainer as BaseToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';
import { getMode } from "../redux/slices/theme";

function ToastContainer(){
    const mode = useSelector(getMode);

    return (
        <BaseToastContainer position="bottom-right" theme={mode} autoClose={5000} closeOnClick/>
    );
};

export default ToastContainer;