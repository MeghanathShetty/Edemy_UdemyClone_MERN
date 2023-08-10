import { ContactsOutlined,ReadOutlined } from "@ant-design/icons";
import axios from "axios";


 const About= () => {
  const gotoLearnMore=()=>{
    window.location.href="/learn"
  }
  const gotoContactUs=()=>{
    window.location.href="/contactUs"
  }
return(
    <>
  < h1 className="jumbotron" id="head">Edemy Website</h1>
  <div className="container-fluid row">
    <div className="text-container col-lg-4 col-sm-12">
        <h2 className="about fw-bold">About us</h2>
            <p className="para">Edemy is an online learning platform that offers a wide 
            range of courses covering various subjects such as technology, business, arts, 
            personal development, and more. It provides learners with the flexibility to study at 
            their own pace and offers video-based lectures, quizzes, assignments, and other learning 
            materials. Udemy is known for its vast course library, featuring both free and paid courses 
            created by instructors from around the world, making it a popular choice for individuals looking
             to acquire new skills or expand their knowledge.</p> 
            <button className="learnMoreButton" onClick={gotoLearnMore}><ReadOutlined /> Learn More</button> 
            <button className="contactusButton" onClick={gotoContactUs}><ContactsOutlined /> Contact Us</button> 
    </div>
    <div className="right-background col-lg-8">
    </div>

  </div>
   
   
    </>





    )

}
export default About;