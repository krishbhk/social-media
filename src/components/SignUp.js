import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { BsFillPersonPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";             // To redirect to other pages
import {AiFillLock} from 'react-icons/ai';
import './styles/App.css';
import styles from "./styles/SignUp.module.css";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userRole, setUserRole] = useState("user");
  const [resData, setResData] = useState(null);
  
  let navigate = useNavigate();

  if(localStorage.getItem("psnUserId") != null){
    navigate('/newsfeed');
  }

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  });

  async function postSignUpInfo(event) {
    event.preventDefault();
        let user = {
            firstName: event.target.elements.formFirstName.value,
            lastName: event.target.elements.formLastName.value,
            email: event.target.elements.formEmail.value,
            password: event.target.elements.formPassword.value,
            image: event.target.elements.formImage.value
        }

        const response = await axios({
          method: "post",
          url: "/api/v1/users/save",
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            profilePic: user.image,
            role: "user",
          },
        });

    if (response.data !== null) {
      setResData(response.data);
    }
    
    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);      
    }

    if (response.data!== null && response.data.status === "success") {
      navigate("/signin");
    }

  }

  function showWarningToast(inputMessage) {
    toast.warn(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  return (
    <div>
      <ToastContainer />
      <div className="mt-2 mb-3 flex-container">
        <div className="mt-2 py-4 px-5 card mid-container">
            <span className="mx-auto"><AiFillLock size={80} color={"grey"}></AiFillLock></span>
            <h4 className="text-center mb-4">Sign Up</h4>
            <form onSubmit={postSignUpInfo}>
              <div className="row">
                <div className="col-6">
                  <div className="form-floating mb-3 required">
                      <input type="text" className="form-control" id="formFirstName" required placeholder="First Name"/>
                      <label for="formFirstName">First Name</label>
                  </div>
                </div>
                
                <div className="col-6">
                    <div className=" form-floating mb-3 required">
                        <input type="text" className="form-control" id="formLastName" required placeholder="Last Name"/>
                        <label for="formLastName">Last Name</label>
                    </div>
                </div>
                
              </div>
                
                <div className="form-floating mb-3 required">
                    <input type="email" className="form-control" id="formEmail" required placeholder="Email"/>
                    <label for="formEmail">Email</label>
                </div>
                <div className="form-floating mb-3 required">
                    <input type="password" className="form-control" id="formPassword" required placeholder="Password"/>
                    <label for="formPassword">Password</label>
                </div>
                <div className="form-floating mb-3 required">
                    <input type="text" className="form-control" id="formImage" required placeholder="Profile Picture" defaultValue="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"/>
                    <label for="formImage">Profile Picture</label>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </div>
            </form>
            <Link to='/login' className="text-end"><small>Already have an account? Log In</small></Link>
        </div>
    </div>
    </div>
  );
}

export default SignUp;
