import {Menu} from "antd";
import Link from "next/link";
import {useState,useEffect,useContext} from 'react';
import {AppstoreAddOutlined,
    LoginOutlined,
    UserAddOutlined,
    CarryOutOutlined,
    TeamOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';
const {Item,SubMenu,ItemGroup} = Menu;
import {Context} from '../context';
import axios from 'axios';
import { useRouter } from "next/router";
import { toast } from "react-toastify";
// import SubMenu from "antd/es/menu/SubMenu";


const TopNav=()=>
{
    const [current,setCurrent]=useState("");

    const {state,dispatch}=useContext(Context);
    const {user} =state;

    const Router=useRouter();
    useEffect(()=>
    {
        process.browser && setCurrent(window.location.pathname);
    },[process.browser && window.location.pathname]);

    // console.log(user);

    const logout=async()=>
    {
        dispatch({type:"LOGOUT"});
        window.localStorage.removeItem("user");
        const {data}=await axios.get("/api/logout");
        Router.push('/login');
        toast(data);
    }
    return (
        <Menu theme="dark" mode="horizontal" selectedKeys={[current]}>
            <Item key="/" onClick={(e)=>setCurrent(e.key)} icon={<AppstoreAddOutlined/>}>
                <Link href="/">
                    Edemy
                </Link>
            </Item>
            {/* array.includes(searchElement[, fromIndex]) */}
            {user && user.role && user.role.includes('Instructor') ? (
                <>
                    <Item key="/instructor/course/create" 
                    onClick={(e)=>setCurrent(e.key)} 
                    icon={<CarryOutOutlined/>}>
                    <Link href="/instructor/course/create">
                        Create Course
                    </Link>
                    </Item>
                </>
            ):
            (
                <>
                    <Item key="/user/become-instructor" 
                    onClick={(e)=>setCurrent(e.key)} 
                    icon={<TeamOutlined/>}>
                    <Link href="/user/become-instructor">
                        Become Instructor
                    </Link>
                    </Item>
                </>
            )}


            {user && user.role && user.role.includes('Instructor') && (
                    <Item
                    key="/instructor"
                    onClick={(e) => setCurrent(e.key)}
                    icon={<TeamOutlined />}
                    style={{float:"right"}}

                    >
                    <Link href="/instructor">
                        Instructor
                    </Link>
                    </Item>


                )}
            
            <>
                    <Item key="/about" 
                    onClick={(e)=>setCurrent(e.key)} 
                    icon={<SolutionOutlined />}>
                    <Link href="/about">
                        About
                    </Link>
                    </Item>
                </>


            {user === null && (
                <>
                    <Item key="/login" onClick={(e)=>setCurrent(e.key)} icon={<LoginOutlined/>}>
                    <Link href="/login">
                        Login
                    </Link>
                    </Item>

                    <Item key="/register" onClick={(e)=>setCurrent(e.key)} icon={<UserAddOutlined/>}>
                        <Link href="/register">
                            Register
                        </Link>
                    </Item>
                </>
            )}

            {user !==null && (
                 <SubMenu icon={<UserOutlined />} title={user && user.name} style={{alignItems:"flex-end"}}>
                   <ItemGroup>
                    <Item key="/user">
                        <Link href="/user">
                            Dashboard
                        </Link>
                    </Item>
                   <Item onClick={logout} >
                        Logout
                    </Item>
                   </ItemGroup>
                 </SubMenu>

                
                 
            )  
            }
        </Menu>
    )
}

export default TopNav;