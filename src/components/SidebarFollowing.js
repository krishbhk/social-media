import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFollowingAccounts } from "../feature/followingAccounts/followingAccountSlice";
import SidebarFollowingAccountItem from "./SidebarFollowingAccountItem";

function SidebarFollowing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowingAccounts = useSelector(
    (state) => state.followingAccountReducer.followingAccounts
  );

  useEffect(() => {
    if (localStorage.getItem("psnToken") === null) {
      navigate("/unauthorized");
    }
    
    dispatch(getFollowingAccounts());
  }, []);

  return (
    <div className="p-4">
      <h4 className="text-center">Following</h4>
      <div className="px-4 py-0">
      {storeFollowingAccounts ? (
        storeFollowingAccounts.map((followingAccount) => {
          return (
            <SidebarFollowingAccountItem
              key={followingAccount.id}
              id={followingAccount.id}
              firstName={followingAccount.firstName}
              lastName={followingAccount.lastName}
            />
          );
        })
      ) : (
        <span></span>
      )}
      </div>
    </div>
  );
}

export default SidebarFollowing;
