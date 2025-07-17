import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFollowing,
  unfollowUser,
  setFollowingPage,
} from "@/redux/slices/followerSlice";
import UserList from "./userList/UserList";
import { Pagination } from "@/components/ui/Pagination";

const Following = () => {
  const dispatch = useDispatch();
  const {
    following,
    isFollowingLoading,
    fetchingError,
    followingPage,
    followingLimit,
    followingTotal,
  } = useSelector((state) => state.followers);

  // Get current user ID from auth state
  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?.id;

  useEffect(() => {
    if (currentUserId) {
      // Fetch following for current user
      dispatch(
        getFollowing({
          page: followingPage,
          limit: followingLimit,
        })
      );
    }
  }, [dispatch, currentUserId, followingPage, followingLimit]);

  const handleUnfollowUser = (userId) => {
    dispatch(unfollowUser(userId));
  };

  const handlePageChange = (page) => {
    dispatch(setFollowingPage(page));
  };

  // Calculate total pages
  const totalPages = Math.ceil(followingTotal / followingLimit);

  return (
    <div>
      <UserList
        users={following}
        onButtonClick={handleUnfollowUser}
        tabType="following"
        isLoading={isFollowingLoading}
        error={fetchingError}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={followingPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Following;
