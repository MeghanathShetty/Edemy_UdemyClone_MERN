import React, { Fragment, useEffect, useState,useContext } from 'react';
import {Context} from "../../context";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const ResetPasswordPage = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const [validUrl, setValidUrl] = useState(false);
  // const [btnOn,setbtnOn]=useState(true);


  // state
  const {state}=useContext(Context);
  const {user}=state;
  // router
  const router=useRouter();

  useEffect(()=>
  {
      if(user==null) 
        router.push('/user/reset');
      else
        router.push('/');
  },[user]);

  const handleNewPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(()=>
  {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const idVal = urlSearchParams.get('id');
    const tokenVal = urlSearchParams.get('token');
    setId(idVal);
    setToken(tokenVal);
  },[]);

  const url1=`/api/password-reset/verifyUrl/${id}/${token}/`;

  // check if the link is valid or not
  useEffect(()=>
  {
      const verifyUrl=async()=>
      {
        try{
          await axios.get(url1);
				  setValidUrl(true);
        }catch(err)
        {
          setValidUrl(false);
        }
      };
      verifyUrl();
  },[url1]);

  const url2=`/api/password-reset/resetPassword/${id}/${token}/`;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data}=await axios.post(url2,{password,confirmPassword});
      toast.success(data);
      router.push('../login');
    }catch(err) 
    {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  return (
    <><h1 className="jumbotron bg-primary square text-center reset">Reset Password</h1>
      {/* {validUrl ? ( */}
      <div className='container-fluid reset_main'>
      <br/><br/><br/><br/>
        <div align = 'center' className='reset_div'>
        <br></br><br></br><br></br>
          <form onSubmit={handleSubmit}>
              <label htmlFor="newPassword" className="newpass"><b>New Password</b></label>
              <br></br>
              <input
                type="password"
                id="newPassword"
                value={password}
                onChange={handleNewPasswordChange}
                required
              /><br></br><br></br>
              <label htmlFor="confirmPassword"><b>Confirm New Password</b></label>
              <br></br>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              /><br></br><br></br>
            <button className="btn btn-primary" type="submit">
              Change Password
            </button>
            </form>
        </div>
        </div>
      {/* ) : (
        <h1>404 Page Not Found</h1>
      )} */}
    </>
  );
};

export default ResetPasswordPage;