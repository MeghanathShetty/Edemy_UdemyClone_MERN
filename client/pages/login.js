import { useState,useContext, useEffect } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import { SyncOutlined } from "@ant-design/icons";
import Link from 'next/link';
import {Context} from "../context";
import { useRouter } from "next/router";


const Login=()=>
{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);

    // state
    const {state,dispatch}=useContext(Context);
    const {user}=state;
    // router
    const router=useRouter();

    useEffect(()=>
    {
        if(user!==null) router.push('/user/');
    },[user]);

    const handleSubmit = async (e)=>
    {
        e.preventDefault();
        try{
            setLoading(true);
            const {data} = await axios.post(`/api/login`,{email,password});
            // console.log("Login response = ",data);
            dispatch({type:"LOGIN",
                    payload:data});
            // save in local storage
            window.localStorage.setItem('user',JSON.stringify(data));
            // console.log("STATE",state);
            toast("Sign in Successfull");
            // redirect
            // router.push("/handlePayment");
            // setLoading(false);
        }catch(err){
            toast.error(err.response.data);
            setLoading(false);
        }
       
    }
    return (
        <>
        <h1 className="jumbotron bg-primary square text-center">Login</h1>
        <div className="container col-md-4 offset-md-4 pb-5">
            <form onSubmit={handleSubmit}>                              

                <input type="email"
                 className="form-control mb-4 p-4"
                 value={email} 
                 onChange={(e)=>setEmail(e.target.value)}
                 placeholder="Enter email" 
                 required/>

                <input type="password"
                 className="form-control mb-4 p-4"
                 value={password} 
                 onChange={(e)=>setPassword(e.target.value)}
                 placeholder="Enter password"
                 required/>
                 
                 <button type="submit" className="btn btn-block btn-primary"
                 disabled={!email || !password || loading}>
                    
                    {loading?<SyncOutlined spin />:"Login"}
                    
                    </button>
                    <p>frogot password ? <Link href = "/user/forgot">
            change password</Link></p>
            </form>
            <p className="text-center p-3">Not yet registered?{" "}
            <Link href="/register">Register</Link></p>
        </div>
        </>
    )
}

export default Login;