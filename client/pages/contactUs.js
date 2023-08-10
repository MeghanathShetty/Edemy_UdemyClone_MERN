
import { useState } from "react";
import { PhoneOutlined,
         MailOutlined,
         EnvironmentOutlined,
         } from '@ant-design/icons';


const contactUs=()=>{
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [message,setMessage]=useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          toast.success("message is successfully sent");
        } catch (err) {
          toast.error(err.response.data);
        }
      };

    return(
        <>
        <h1 className="jumbotron text-center bg-primary square" id="head">Customer Support</h1>
        <div className="container-fluid main">
            <div className="row r1">
                <div className="col-8 contact_div1">

                </div>
                <div className="col-4 contact_div2">
                    <form onSubmit={handleSubmit}>
                        <h2>Send us a message</h2>
                        <input
                            type="text"
                            className="form-control mb-4 p-4"
                            placeholder="Enter full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            className="form-control mb-4 p-4"
                            placeholder="Enter email-id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <h6>Enter your message here:</h6>
                        <input
                            type="textarea"
                            className="form-control mb-4 p-4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="btn btn-block btn-primary message"
                            disabled={!fullName || !email || !message}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                
            </div>
            <div className="row r2">
            <h3><u>Contact us:</u></h3>
            <span><MailOutlined />&nbsp;<b>xyz@gmail.com</b></span><br/>
            <span><PhoneOutlined />&nbsp;<b>+91 1234567890</b></span><br/>
            <span><EnvironmentOutlined />&nbsp;<b>udupi</b></span>


            </div>

        </div>
        </>
    )

}

export default contactUs;