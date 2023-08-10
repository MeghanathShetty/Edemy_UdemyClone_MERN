import { useState,useContext,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {Context} from "../../context";
import { useRouter } from "next/router";

const AddDetail = () => {

  // state
  const {state}=useContext(Context);
  const {user}=state;
  // router
  const router=useRouter();

  useEffect(()=>
  {
      if(user!==null) 
        router.push('/user/details');
      else
        router.push('/login');
  },[user]);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email,setMail] = useState("");
  const [search_email,setSearchEmail] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setSelectedOptions] = useState([]);
  const [fnameTo, setFnameTo] = useState(fname);
  const [lnameTo, setLnameTo] = useState(lname);
  const [enable_email, setEnableEmail] = useState('');
  const [disable_email, setDisableEmail] = useState('');
  const [update_email, setUpdateEmail] = useState('');


  const options = ['Frontend', 'Backend', 'Database','Testing','other'];

  const handleSelectChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...interests, value]);
    } else {
      const updatedOptions = interests.filter((option) => option !== value);
      setSelectedOptions(updatedOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  //const {email}=JSON.parse(window.localStorage.getItem("user"));

      const { data } = await axios.post(`/api/exe_addAllDetails`, {
        fname,
        lname,
        email,
        gender,
        interests,
      });
      //console.log("response", data);
      toast.success("Details have been successfully added.");
      document.getElementById('d1').style.display='none';
      document.getElementById('head').innerHTML = 'Update Name';
      document.getElementById('d2').style.display='inline-block';
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // const {email}=JSON.parse(window.localStorage.getItem("user"));
      const { data } = await axios.post(`/api/exe_updateName`, {
        update_email,
        fnameTo,
        lnameTo,
      });
      toast.success("Name updated successfully");
      document.getElementById('d2').style.display='none';
      document.getElementById('head').innerHTML = 'Find User';
      document.getElementById('d3').style.display='inline-block';
    }catch (err) {
        toast.error(err.response.data);
      }
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(search_email);
        try {
            const { data } = await axios.post(`/api/exe_findU`, {
                search_email
            });
      toast.success(data);
      document.getElementById('d3').style.display='none';
      document.getElementById('head').innerHTML = 'Disable User';
      document.getElementById('d4').style.display='inline-block';

        } catch (err) {
            toast.error(err.response.data);
        }
    }
    const  handleEmailDisable= async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/exe_disableUser`, {
                disable_email
            });
            toast.success(data); 
      document.getElementById('d4').style.display='none';
      document.getElementById('head').innerHTML = 'Enable User';
      document.getElementById('d5').style.display='inline-block';
        } catch (err) {
            toast.error(err.response.data);
        }
    }
    const  handleEmailEnable= async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/exe_enableUser`, {
                enable_email
            });
            toast.success(data); 
        } catch (err) {
            toast.error(err.response.data);
        }
    }
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square" id="head">Add Complete Details</h1>
      <div className="container col-md-4 offset-md-4 pb-5 d1" id="d1">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Enter first name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Enter last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-control mb-4 p-4"
            placeholder="Enter email to search"
            value={email}
            onChange={(e) => setMail(e.target.value)}
            required
          />
          <label>Gender :</label>
          <br />
          <input
            type="radio"
            id="radio-btn"
            name="radio-group"
            value="male"
            onChange={(e) => setGender(e.target.value)}
            checked={gender === "male"}
          />
          <label>Male &nbsp;&nbsp;&nbsp;</label>
          <input
            type="radio"
            id="radio-btn1"
            name="radio-group"
            value="female"
            onChange={(e) => setGender(e.target.value)}
            checked={gender === "female"}
          />
          <label>Female &nbsp;&nbsp;&nbsp;</label>
          <input
            type="radio"
            id="radio-btn2"
            name="radio-group"
            value="other"
            onChange={(e) => setGender(e.target.value)}
            checked={gender === "other"}
          />
          <label>Other</label>
          <br />
          <br />
          <div>
            <label>Area of Interest :</label>
            <br />
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  value={option}
                  onChange={handleSelectChange}
                  checked={interests.includes(option)}
                />
                <label htmlFor={`checkbox-${index}`}>{option}</label>
              </div>
            ))}
          </div>
          <br />
            
          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!fname || !lname || !gender}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5 d2" id="d2"
      style={{display:'none'}}>
        <form onSubmit={handleUpdate}>

          <input
              type="email"
              className="form-control mb-4 p-4"
              placeholder="Enter email to to change name"
              value={update_email}
              onChange={(e) => setUpdateEmail(e.target.value)}
              required
          />
          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Enter first name"
            value={fnameTo}
            onChange={(e) => setFnameTo(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Enter last name"
            value={lnameTo}
            onChange={(e) => setLnameTo(e.target.value)}
            required
          />
           
          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!fname || !lname}
          >
            Update
          </button>
        </form>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5 d3" id="d3"
      style={{display:'none'}}>
        <form onSubmit={handleSearch}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            placeholder="Enter email to search"
            value={search_email}
            onChange={(e) => setSearchEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email}
          >
            Search
          </button>
        </form>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5 d4" id="d4"
      style={{display:'none'}}>
        <form onSubmit={handleEmailDisable}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            placeholder="Enter email to disable"
            value={disable_email}
            onChange={(e) => setDisableEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email}
          >
            Disable
          </button>
        </form>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5 d5" id="d5"
      style={{display:'none'}}>
        <form onSubmit={handleEmailEnable}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            placeholder="Enter email to enable"
            value={enable_email}
            onChange={(e) => setEnableEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email}
          >
            Enable
          </button>
        </form>
      </div>
    </>
  );
}

export default AddDetail;