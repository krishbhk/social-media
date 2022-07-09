import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePosts } from "../feature/checkProfile/checkProfileSlice";
import { getProfileInfo } from "../feature/checkProfile/checkProfileSlice";
import ProfilePostItem from "./ProfilePostItem";
import { Link } from "react-router-dom";
// import SidebarProfile from "./SidebarProfile";
import axios from "axios";
import "./styles/Profile.css";

import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";

function Profile() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('psnUserId');
  const [postList,setPostList] = useState({flag:false, data:null});
  // const userInfo = useSelector(
  //   (state) => state.checkProfileReducer.profileInfo
  // );
  const [userInfo,setUserInfo] = useState({flag:false, data:null});

  useEffect(
    async function (){
  
      const response = await axios({
        method: "post",
        url: "/api/v1/users/profile",
        headers: {
          Authorization: localStorage.getItem("psnToken"),
        },
        data: {
          id: userId,
        },

      });
      
      setUserInfo({flag: true, data: response.data.payload});
      // console.log(userInfo);s
  
  }, []);

  // let upCount = 0;

  // useEffect(()=>{
  //   if(upCount===0){
  //     upCount = 1;
  //     return;
  //   }
  //   async function getPosts(){
  //     const response = await axios({
  //       method: "post",
  //       url: "/api/v1/myposts",
  //       headers: {
  //         Authorization: localStorage.getItem("psnToken"),
  //       },
  //       data: {
  //         id: userId,
  //       },

  //     });
      
  //     setPostList({flag: true, data: response.data.payload});
  //     console.log(userInfo);
  
  //   }
  //   getPosts();
  // }
  //   , [userInfo]);

  // const isInitialMount = useRef(true);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //       // Your useEffect code here to be run on update
        
  //   }
  // });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {

    if (!mounted) {
      setMounted(true);
      return;
    }

    // Run API Call
    async function getPosts(){
      const response = await axios({
        method: "post",
        url: "/api/v1/myposts",
        headers: {
          Authorization: localStorage.getItem("psnToken"),
        },
        data: {
          id: userId,
        },

      });
      
      setPostList({flag: true, data: response.data.payload});
      console.log(userInfo);
  
    }
    getPosts();
  }, [userInfo]);

  return (
    <Container className="pt-3">
    <Row>{ userInfo.flag && postList.flag && 
        <Col mt={5} md={4}>
          <div className="ms-5 card pt-3 my-sidebar">
                <div className="p-4">
            {/* <h4 className="text-center">Following</h4> */}
            <div className="px-4 py-0 d-flex flex-column justify-content-center align-items-center">
              <img src={userInfo.data.profilePic} height="80px" width="80px"></img>
              <strong className="text-center">{userInfo.data.firstName +" "+ userInfo.data.lastName}</strong>
              <small className="text-muted ms-3">{userInfo.data.email}</small>
              <br></br>
              <Row className="mt-3 mb-3">
                <Col className="text-center"><strong >{postList.data.length}</strong><br></br><small className="text-muted">Posts</small></Col>
                <Col  className="text-center"><Link to='/newsfeed/follower' className="plane-link"><strong>{userInfo.data.follower.length}</strong><br></br><small className="text-muted">Followers</small></Link></Col>
                <Col  className="text-center"><Link to='/newsfeed/following' className="plane-link"><strong>{userInfo.data.following.length}</strong><br></br><small className="text-muted">Following</small></Link></Col>
              </Row>
            </div>
          </div>
          </div>
        </Col>
        }
        <Col md={8}>
        <div>

      <h3 className="card p-3 me-5">My Posts</h3>
      {postList.flag && userInfo.flag &&
        postList.data.map((postItem) => {
          return (
            <ProfilePostItem
              key={postItem.id}
              postId={postItem.id}
              userId={postItem.userId}
              firstName={userInfo.data.firstName}
              lastName={userInfo.data.lastName}
              content={postItem.content}
              image={postItem.image}
              likeList={postItem.like}
              dislikeList={postItem.dislike}
              shareList={postItem.share}
              commentList={postItem.comment}
              postDate={postItem.createdAt}
            />
          );
        })
      }
    </div>
        </Col>
      </Row>
      </Container>
  );
}

export default Profile;
