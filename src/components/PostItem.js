import React, { useState } from "react";

import { Hashicon } from "@emeraldpay/hashicon-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import axios from "axios";
import {
  RiHeartFill,
  RiHeartLine,
  RiMessage2Fill,
  RiShareForwardFill,
  RiSendPlaneFill,
  RiDeleteBin5Fill,
} from "react-icons/ri";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { Button, Col, Form, Row } from "react-bootstrap";

import styles from "./styles/PostItem.module.css";
import "./styles/Post.css";
import "./styles/App.css"
import { useDispatch } from "react-redux";
import {
  addLike,
  addDislike,
  addShare,
  addComment,
  getFollowingPosts,
} from "../feature/followingPost/followingPostSlice";

function PostItem(props) {
  const dispatch = useDispatch();
  let userId = localStorage.getItem('psnUserId');

  const [likeStatus, setLikeStatus] = useState(false);
  const [dislikeStatus, setDislikeStatus] = useState(false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [sendButtonDisable, setSendButtonDisable] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(
    localStorage.getItem("psnUserId")
  );
  const [postId, setPostId] = useState(props.postId);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  function handleLikeClick(e) {
    if (!props.likeList.includes(currentUserId)) {
      setLikeStatus(true);
      dispatch(addLike({ postId: postId, userId: currentUserId }));
    } else {
      setLikeStatus(false);
      dispatch(addLike({ postId: postId, userId: currentUserId }));
    }
  }

  function handleDislikeClick(e) {
    if (!props.dislikeList.includes(currentUserId)) {
      setDislikeStatus(true);
      dispatch(addDislike({ postId: postId, userId: currentUserId }));
    } else {
      setDislikeStatus(false);
      dispatch(addDislike({ postId: postId, userId: currentUserId }));
    }
  }

  async function handleDeleteClick(e){

    const response = await axios({
      method: "post",
      url: "/api/v1/deletepost",
      headers: {
        Authorization: localStorage.getItem("psnToken"),
      },
      data: {
        id1: props.postId,
        id2: userId
      },
    });

    window.location.reload();
  }

  function handleCommentButtonClick(e) {
    setCommentStatus(!commentStatus);
  }

  function handleCommentContentChange(e) {
    e.preventDefault();

    setCommentContent(e.target.value);

    if (commentContent.length - 1 > 0 && commentContent.length - 1 <= 100) {
      setSendButtonDisable(false);
    } else {
      setSendButtonDisable(true);
    }
  }

  function sendComment(e) {
    dispatch(
      addComment({
        postId: postId,
        newComment: {
          userId: localStorage.getItem("psnUserId"),
          userFullname:
            localStorage.getItem("psnUserFirstName") +
            " " +
            localStorage.getItem("psnUserLastName"),
          content: commentContent,
        },
      })
    );
    setCommentContent("");
  }

  return (
    <div className=" shadow card p-3 my-4 me-5" style={{"border-radius":"10px"}}>
      <Row>
        <div className="d-flex align-items-center mb-3">
          <div className="mx-3">
            <Hashicon value={props.userId} size={50} />
          </div>
          <div className="d-flex flex-column">
          <div className="fw-bold">{props.firstName + " " + props.lastName}</div>
          <small className="text-secondary">{timeAgo.format(new Date(props.postDate).getTime())}</small>
          </div>
        </div>
        <div className="ms-3 mt-2 mb-3">
          <div>
            <p>{props.content}</p>
          </div>
          {props.image !== null ? (
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img src={props.image} alt="" />
            </div>
          ) : (
            <span></span>
          )}
        </div>

        {/* Sub-functions of a post */}
        <hr className="divide mb-n5"></hr>
        <div className="row d-flex justify-content-center align-items-center mt-2">

            <div className="col-3 d-flex justify-content-center align-items-center">
                      {/* Sub-function like button */}
              <div className="mx-1">
                <span
                  className={`${styles.likeButton} mx-1 fs-4`}
                  onClick={handleLikeClick}
                >
                  {likeStatus ? (
                    <AiFillLike className="text-primary" />
                  ) : (
                    <AiFillLike className="text-secondary" />
                  )}
                </span>
                <span>
                  {props.likeList.length > 0 ? props.likeList.length : null}
                </span>
              </div>

              {/* Sub-function dislike button */}
              <div className="mx-1">
                <span
                  className={`${styles.likeButton} mx-1 fs-4`}
                  onClick={handleDislikeClick}
                >
                  {dislikeStatus ? (
                    <AiFillDislike className="text-danger" />
                  ) : (
                    <AiFillDislike className="text-secondary" />
                  )}
                </span>
                <span>
                  {props.dislikeList.length > 0 ? props.dislikeList.length : null}
                </span>
              </div>
              
            </div>
            <div className="col-5">

            </div>
            <div className="col-3 d-flex justify-content-end align-items-center">
                    {/* Sub-function comment button */}
                <div className="ms-5">
                  <span
                    className={`${styles.commentButton} mx-1 fs-4`}
                    onClick={handleCommentButtonClick}
                  >
                    <FaRegCommentDots className="text-secondary" />
                  </span>
                  <span>
                    {props.commentList.length > 0 ? props.commentList.length : null}
                  </span>
                </div>
            </div>
            {/* DELETE POST */}
            {props.userId==userId && 
              <div className="col-1">
              <div className="">
                <span
                  className={`${styles.likeButton} fs-4`}
                  onClick={handleDeleteClick}
                >
                    <RiDeleteBin5Fill className="text-secondary" />
                  
                </span>
              </div>
            </div>
            }
            
          
        </div>
        
        {/* List of comments and comment input box */}
        {commentStatus === true ? (
          <div className="px-0 mx-0">
            <hr></hr>
            <div className="mx-4">
            <div className="d-flex align-items-center">
              <Form className="w-100 mx-1">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Write a comment..."
                    value={commentContent}
                    onChange={handleCommentContentChange}
                    className="rounded-pill bg-light"
                  />
                </Form.Group>
              </Form>
              <span className="mx-1">{commentContent.length}/100</span>
              <div className="ms-auto">
                <Button
                  variant="primary"
                  className="mx-1 p-1 rounded-pill"
                  disabled={sendButtonDisable}
                  onClick={sendComment}
                >
                  <RiSendPlaneFill className="m-1 fs-4" />
                </Button>
              </div>
            </div>
            {props.commentList.map((commentItem) => (
              <div className="border rounded border-info my-3 px-2 pb-2">
                <div className="d-flex align-items-center my-2">
                  <div className="me-auto mx-1">
                    <Hashicon value={commentItem.userId} size={30} />{" "}
                  </div>
                  <div className="w-100 mx-1 fw-bold">
                    <span>{commentItem.userFullname}</span>
                  </div>
                </div>
                <div>{commentItem.content}</div>
              </div>
            ))}
            </div>
          </div>
        ) : (
          <span></span>
        )}
      </Row>
    </div>
  );
}

export default PostItem;
