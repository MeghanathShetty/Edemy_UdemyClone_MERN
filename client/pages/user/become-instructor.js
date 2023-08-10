import {useContext,useState} from 'react';
import {Context} from '../../context';
import {Button} from 'antd'
import axios from 'axios';
import { SettingOutlined,UserSwitchOutlined,LoadingOutlined } from '@ant-design/icons';
import {toast} from 'react-toastify'
import UserRoute from '../../components/routes/UserRoute';
import { useRouter } from "next/router";


const BecomeInstructor=()=>{
    //state
    const [loading,setLoading]=useState(false)
    const {state:{user}}=useContext(Context);
    const {dispatch}=useContext(Context);
    const Router=useRouter();
    


    const logout=async()=>
    {
        dispatch({type:"LOGOUT"});
        window.localStorage.removeItem("user");
        const {data}=await axios.get("/api/logout");
        Router.push('/login');
        toast("Please re-login");
    }

const becomeInstructor=async()=>{
   //console.log("become instructor");
   setLoading(true)
   await axios.post('/api/make-instructor')
   .then((res) =>{
    // console.log(res.data);
    toast.success(res.data);
    // logout===========
    logout();
    setLoading(false);
    // window.location.href=res.data;
   })
   .catch(err=>{
    console.log(err.response.status)
    // toast('RazorPay onboarding failed.Try again.');
    toast('Becoming instructor failed');
    setLoading(false);
   })
}
    return(
        <>
        <h1 className='jumbotron text-center square'>Become Instructor</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 text-center'>
                        <div className='pt-4'>
                            <UserSwitchOutlined className='display-1 pb-3'/>
                            <br />
                            <h2>Setup payout to publish courses on Edemy</h2>
                            <p className='lead text-warning'>Edemy partners with razorpay to transfer earnings to your bank account.
                            </p>
                            <Button className='mb-3' type='primary' block shape="round" icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                            size="large" 
                            onClick={becomeInstructor}
                            disable={user && user.role && user.role.includes("Instructor") 
                        || loading}
                        >
                            {loading ? "Processing..." : "Payout Setup"}
                            </Button>
                            <p className='lead'>You will be redirected to razorpay to complete onboarding process.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default BecomeInstructor;