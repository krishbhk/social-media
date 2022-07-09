import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  followingPosts: null,
};

export const getFollowingPosts = createAsyncThunk(
  "/api/v1/followingposts",
  async (thunkAPI) => {
    const response = await axios({
      method: "post",
      url: "/api/v1/followingposts",
      headers: {
        Authorization: localStorage.getItem("psnToken"),
      },
      data: {
        id: localStorage.getItem("psnUserId"),
      },
    });

    return response.data.payload;
  }
);

async function insertComment(postId, commentContent) {
  const response = await axios({
    method: "post",
    url: "/api/v1/insertcomment",
    headers: {
      Authorization: localStorage.getItem("psnToken"),
    },
    data: {
      commentEntity: {
        userId: localStorage.getItem("psnUserId"),
        userFullname: localStorage.getItem("psnUserFirstName") + " " + localStorage.getItem("psnUserLastName"),
        content: commentContent, 
      },
      postId: {
        id: postId,
      },
    },
  });
}

async function updateLike(postId, currentUserId) {
    const response = await axios({
        method: "post",
        url: "/api/v1/likepost",
        headers: {
         Authorization: localStorage.getItem("psnToken"),
        },
        data: {
            id1: postId,
            id2: currentUserId,
        }
    });
    
    return response.data;
}

async function updateDislike(postId, currentUserId) {
  const response = await axios({
      method: "post",
      url: "/api/v1/dislikepost",
      headers: {
       Authorization: localStorage.getItem("psnToken"),
      },
      data: {
          id1: postId,
          id2: currentUserId,
      }
  });
  
  return response.data;
}

async function updateShare(postId, currentUserId) {
    const response = await axios({
        method: "post",
        url: "/api/v1/sharepost",
        headers: {
         Authorization: localStorage.getItem("psnToken"),
        },
        data: {
            id1: postId,
            id2: currentUserId,
        }
    });
    
    return response.data;
}

export const followingPostSlice = createSlice({
  name: "followingPostSlice",
  initialState,
  reducers: {
      addLike: (state, action) => {
        console.log("Like button is triggered");
        if (state.followingPosts !== null) {
            for (let i = 0; i < state.followingPosts.length; i++) {
                if (state.followingPosts[i].post.id === action.payload.postId) {
                    if (!state.followingPosts[i].post.like.includes(action.payload.userId)) {
                        state.followingPosts[i].post.like.push(action.payload.userId);
                        updateLike(action.payload.postId, action.payload.userId);
                    } else {
                        state.followingPosts[i].post.like = state.followingPosts[i].post.like.filter(item => item !== action.payload.userId);
                        updateLike(action.payload.postId, action.payload.userId);
                    }
                }
            }
        }
      },

      addDislike: (state, action) => {
        if (state.followingPosts !== null) {
            for (let i = 0; i < state.followingPosts.length; i++) {
                if (state.followingPosts[i].post.id === action.payload.postId) {
                    if (!state.followingPosts[i].post.dislike.includes(action.payload.userId)) {
                        state.followingPosts[i].post.dislike.push(action.payload.userId);
                        updateDislike(action.payload.postId, action.payload.userId);
                    } else {
                        state.followingPosts[i].post.dislike = state.followingPosts[i].post.dislike.filter(item => item !== action.payload.userId);
                        updateDislike(action.payload.postId, action.payload.userId);
                    }
                }
            }
        }
      },

      addShare: (state, action) => {
          if (state.followingPosts !== null) {
              for (let i = 0; i < state.followingPosts.length; i++) {
                  if (state.followingPosts[i].post.id === action.payload.postId) {
                      state.followingPosts[i].post.share.push(action.payload.userId);
                      updateShare(action.payload.postId, action.payload.userId);
                  }
              }
          }
      },

      addComment: (state, action) => {
        if (state.followingPosts !== null) {
          for (let i = 0; i < state.followingPosts.length; i++) {
            if (state.followingPosts[i].post.id === action.payload.postId) {
              state.followingPosts[i].post.comment.push(action.payload.newComment);
              insertComment(action.payload.postId, action.payload.newComment.content);
            }
          }
        }
      }
  },
  extraReducers: (builder) => {
    builder.addCase(getFollowingPosts.fulfilled, (state, action) => {
      state.followingPosts = action.payload;
    });
  },
});

export const {addLike, addDislike, addShare, addComment} = followingPostSlice.actions;
export default followingPostSlice.reducer;
