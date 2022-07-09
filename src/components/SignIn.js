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
      <ToastContainer />
      {/* <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, {setSubmitting}) => {
          postSignInInfo(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={styles.formContainer}
          >
            <Row className="mb-5 text-center">
              <h1 className="text-success">Sign In</h1>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                />

                <Form.Control.Feedback type="invalid">
                  Please enter your password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" variant="success">
              Sign In <RiLoginBoxLine />
            </Button>
          </Form>
        )}
      </Formik> */}
      <div className=" mt-5 flex-container">
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
    </div>
  );
}

export default SignIn;
