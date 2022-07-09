import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

import { RiLoginBoxLine } from "react-icons/ri";

import './styles/App.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";             // To redirect to other pages
import {AiFillLock} from 'react-icons/ai';

function SignIn() {
  const [resData, setResData] = useState(null);

  let navigate = useNavigate();

  if(localStorage.getItem("psnUserId") != null){
    navigate('/newsfeed');
  }

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  async function postSignInInfo(event) {
    event.preventDefault();
    let user = {
        email: event.target.elements.formEmail.value,
        password: event.target.elements.formPassword.value
    }

    const response = await axios({
      method: "post",
      url: "/api/v1/users/signin",
      data: {
        email: user.email,
        password: user.password,
      },
    });
    
    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);
    }
    
    if (response.data !== null && response.data.status === "success") {
      setResData(response.data);
      
      localStorage.setItem("psnUserId", response.data.payload.user.id);
      localStorage.setItem("psnUserFirstName", response.data.payload.user.firstName);
      localStorage.setItem("psnUserLastName", response.data.payload.user.lastName);
      localStorage.setItem("psnUserEmail", response.data.payload.user.email);
  
      localStorage.setItem("psnToken", response.data.payload.token);
      navigate("/newsfeed");
    }

  }

  function showWarningToast(inputMessage) {
    toast.warn("Invalid email or password", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log("toast");
  }

  return (
    <div  >
      {/* <ToastContainer /> */}
      <Row className="m-0">
        <Col className="">
          <div className="mt-5 mx-5 py-5 banner">
            <div className="mt-5 ms-5 pt-5 d-flex flex-column justify-content-center align-items-center ">
                <h1 className="text-primary title"><strong>OlaConnect</strong></h1>
                <br></br>
                <h4 className="ms-3">Connect with the world!</h4>
            </div>
            
          </div>
        </Col>
        <Col>
        <div className="mt-4 flex-container">
          <div className="mt-4 py-4 px-5 card mid-container">
              <span className="mx-auto"><AiFillLock size={80} color={"grey"}></AiFillLock></span>
              <h4 className="text-center mb-4">Log In</h4>
              <form onSubmit={postSignInInfo}>
                  <div className="form-floating mb-3 required">
                      <input type="email" className="form-control" id="formEmail" required placeholder="Email"/>
                      <label for="formEmail">Email</label>
                  </div>
                  <div className="form-floating mb-3 required">
                      <input type="password" className="form-control" id="formPassword" required placeholder="Password"/>
                      <label for="formPassword">Password</label>
                  </div>
                  <div className="mb-3">
                      <button type="submit" className="btn btn-primary w-100">Log In</button>
                  </div>
              </form>
              <Link to='/signup' className="text-end"><small>Don't have an account? Sign Up</small></Link>
          </div>
      </div>
        </Col>
      </Row>
      
    </div>
  );
}

export default SignIn;
