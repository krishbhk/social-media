import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
// import logo from "./assets/psn-logo-large.png";


import styles from "./styles/NewsFeed.module.css";
import FollowingList from "./FollowingList";
import SidebarFollowing from "./SidebarFollowing";

function NewsFeed() {
  let navigate = useNavigate();

  {/* FIND ALL ACCOUNTS */}

  function handleClick(e) {
    navigate("/newsfeed/allaccounts");
  }

  function handleSignOut(e) {
    localStorage.removeItem("psnUserId");
    localStorage.removeItem("psnToken");
    localStorage.removeItem("psnUserFirstName");
    localStorage.removeItem("psnUserLastName");
    localStorage.removeItem("psnUserEmail");
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("psnToken") === null) {
      navigate("/unauthorized");
    }
  });

  return (
    <Container className="pt-3">
      {/* <Row className="mb-3">
        <Col md={4}>
          <Row className="justify-content-center align-items-center">
            <Col md="auto" className="text-sm-start text-center mb-sm-0 mb-3">
              <img src={logo} width="125" alt="logo" />
            </Col>
            <Col className="text-sm-start text-center text-success mb-sm-0 mb-3">
              <h1>Penguin Social Network</h1>
            </Col>
          </Row>
        </Col>
        <Col md={8}>
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Button variant="success" onClick={handleClick}>
              Find All User Accounts
            </Button>
          </div>
        </Col>
      </Row> */}
      <Row>
        <Col mt={5} md={4}>
          <div className="ms-5 card">
            <SidebarFollowing/>
          </div>
        </Col>
        <Col md={8}>
          <Outlet />{" "}
        </Col>
      </Row>
    </Container>
  );
}

export default NewsFeed;
