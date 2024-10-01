import { useEffect, useRef } from "react";
import axios from "./axios/axios";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setJWT } from "./redux/slices/user";
import { useNavigate, useParams } from "react-router-dom";

function PageActivation(){
    const {token} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sent = useRef(false);
    useEffect(() => {
        async function attempActivation() {
          sent.current = true;
          let result = await axios.get(`/auth/verify/${token}`);
          if(result.success){
            dispatch(setJWT(result.data.body));
            toast.success("Successfully activated account");
            if(!localStorage.getItem("newFormState")){
              navigate("/");
              return;
            }
            navigate("/form/new");
            return;
          }
          toast.error("Invalid activation token");
          navigate("/");
        }
        if(!sent.current){
            attempActivation();
        }
      }, [])

    return (
    <div className='w-full h-screen mk-text-center'>
        <p className='my-3 text-8xl text-primary'>Activating account</p>
        <span className="loading loading-spinner mx-auto loading-lg"></span>
    </div>
    );
}

export default PageActivation;