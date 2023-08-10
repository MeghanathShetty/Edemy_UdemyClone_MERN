import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

const LearnMore = () => {
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square" id="head">Learn More</h1>
      <div className="container-fluid main">
      <div className="row">
      <div className="col-md-8 d-flex align-items-center">
        <div>
          <h1>Services</h1>
          <p>Content about image 1...</p>
        </div>
      </div>
      <div className="col-md-4 d-flex justify-content-center align-items-center">
        <img src="../img/pic2.jpg" style={{ width: '26rem' }} alt="Image 1" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-8 d-flex align-items-center">
        <div>
          <h1>How to use?</h1>
          <p>Content about image 2...</p>
        </div>
      </div>
      <div className="col-md-4 d-flex justify-content-center align-items-center">
        <img src="../img/learn3.svg" style={{ width: '26rem' }} alt="Image 2" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-8 d-flex align-items-center">
        <div>
          <h1>Founders</h1>
          <p>Content about image 2...</p>
        </div>
      </div>
      <div className="col-md-4 d-flex justify-content-center align-items-center">
        <img src="../img/learn4.svg" style={{ width: '26rem' }} alt="Image 2" />
      </div>
    </div>
  <div className="row r2">
          <h3>Contact Us</h3>
          <span><MailOutlined />&nbsp;<b>xyz@gmail.com</b></span><br />
          <span><PhoneOutlined />&nbsp;<b>+91 1234567890</b></span><br />
          <span><EnvironmentOutlined />&nbsp;<b>udupi</b></span>
        </div>
</div>
    
        {/* <div className="row r1">
          <h1>Additional Information</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
        </div> */}
    </>
  );
};

export default LearnMore;



