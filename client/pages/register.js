import { useState,useEffect,useContext } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import { SyncOutlined } from "@ant-design/icons";
import Link from 'next/link';
import {Context} from "../context";
import { useRouter } from "next/router";

const Register=()=>
{
    const [name,setName]=useState('');
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
        if(user !==null) router.push('/');
    },[user])


    const handleSubmit = async (e)=>
    {
        e.preventDefault();
        try{
            setLoading(true);
             // console.table({name,email,password});
            const {data} = await axios.post(`/api/register`,{name,email,password});
            // console.log("register response=",data);
            // display success message using toast
            toast.success("Registration succesful,Please login");
            setLoading(false);
            router.push('/login');

        }catch(err){
            toast.error(err.response.data);
            setLoading(false);
        }
       
    }
    return (
        <>
        <h1 className="jumbotron bg-primary square text-center">Register</h1>
        <div className="container col-md-4 offset-md-4 pb-5">
            <form onSubmit={handleSubmit}>
                <input type="text"
                 className="form-control mb-4 p-4"
                 value={name} 
                 onChange={(e)=>setName(e.target.value)}
                 placeholder="Enter name"
                 required/>

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
                 disabled={!name || !email || !password || loading}>
                    {loading?<SyncOutlined spin />:"Register"}</button>
            </form>
            <p className="text-center p-3">Already registered?{" "}
            <Link href="/login">Login</Link></p>
        </div>
        </>
    )
}

export default Register;