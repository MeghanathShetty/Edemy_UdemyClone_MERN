import axios from 'axios';
import React, {useEffect,useState,useContext } from 'react';
import { useRouter } from "next/router";
import {Context} from "../../context";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SyncOutlined } from "@ant-design/icons";

const forgot = () => {
  const [email, setEmail] = useState('');
  const [msg,setmsg]=useState('');
  const [loading,setLoading]=useState(false);

  // state
  const {state}=useContext(Context);
  const {user}=state;
  // router
  const router=useRouter();

  useEffect(()=>
  {
      if(user==null) 
        router.push('/user/forgot');
      else
        router.push('/');
  },[user]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try
    {
      setLoading(true);
      const {data}=await axios.post("/api/password-reset/sendResetLink",{email});
      toast.success(data);
      setmsg("Please check your email to reset your password");
      setLoading(false);
    }catch(err)
    {
      console.log(err.response.data);
      toast.error(err.response.data);
      setLoading(false);
    }
  };


  return (
<>
<h1 className="jumbotron text-center" id="head">Forgot Password</h1>
<div className='container-fluid forget_main'>
    <div align = 'center' className='forget_div'>
      <br/><br/><br/><br/>
      <h4>Enter your e-mail id to reset the password</h4>
      <form onSubmit={handleSubmit}>
        <label className='lemail'>
          <b>Email</b>
          </label><br></br>
          <input type="email" value={email} onChange={handleEmailChange}/>
        <br></br> <br></br>
        <h6>{msg}</h6>
        <button className="btn btn-block btn-primary" type="submit" disabled={loading} >{loading?<SyncOutlined spin />:"Confirm"}</button>
      </form>      
    </div>
    </div>
  </>
  );
};

export default forgot;
