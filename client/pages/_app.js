import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/styles.css";
import "../public/css/about.css";
import "../public/css/forgot.css";
import "../public/css/reset.css";



// import {Button,Form} from "antd";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "../context";
// import { Head } from 'next/head'; 

// components
import TopNav from "../components/TopNav";

function MyApp({Component,pageProps})
{
    return (
        <>
        <Provider>
        <ToastContainer position="top-center" />
        <TopNav />
        <Component {...pageProps} />
        </Provider>
        </>
    )
}

export default MyApp;