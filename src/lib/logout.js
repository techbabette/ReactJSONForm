import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import informServiceWorkerLogout from './informServiceWorkerLogout';

const dispatch = useDispatch();
const navigate = useNavigate();

function logout(){
    dispatch(setJWT(""));
    navigate("/");
    informServiceWorkerLogout();
}

export default logout;