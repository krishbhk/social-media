import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";

import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NewsFeed from "./NewsFeed";
import NewsFeedContent from "./NewsFeedContent";
import FollowingList from "./FollowingList";
import FollowerList from "./FollowerList";
import Profile from "./Profile";
import MyProfile from "./MyProfile";
import AllAccounts from "./AllAccounts";
import UnauthorizedPage from "./UnauthorizedPage";
import Navbar from "./Navbar/Navbar";
import Test from "./Test";
import Search from "./Search";
import ProtectedRoute from "./ProtectedRoute";

function AppContainer() {
  return (
      <HashRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/myprofile" element={<ProtectedRoute><MyProfile/></ProtectedRoute>} />
        <Route path="/newsfeed" element={<NewsFeed/>}>
          <Route path="" element={<NewsFeedContent />} />
          <Route path="following" element={<FollowingList />} />
          <Route path="follower" element={<FollowerList />} />
          {/* <Route path="allaccounts" element={<AllAccounts />} /> */}
          {/* <Route path="test" element={<Test/>} /> */}
          <Route path="search" element={<Search/>} />
        </Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />        
      </Routes>
    </HashRouter>
    
  );
}

export default AppContainer;
