import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFollowing,
  unfollowUser,
  setFollowingPage,
} from "@/redux/slices/followerSlice";
import { userDetails } from "@/redux/slices/userSlice";
import UserList from "../components/userList/UserList";
import { Pagination } from "@/components/ui/Pagination";
import styles from "./Following.module.css";
import PageTransitionWrapper from "@components/pageTransitionWrapper/PageTransitionWrapper.jsx";

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

  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?.id;

  useEffect(() => {
    if (currentUserId) {
      dispatch(
        getFollowing({
          page: followingPage,
          limit: followingLimit,
        })
      );
    }
  }, [dispatch, currentUserId, followingPage, followingLimit]);

  const handleUnfollowUser = async (userId) => {
    await dispatch(unfollowUser(userId));

    // Update user details to refresh the following count in the side card
    if (currentUserId) {
      dispatch(userDetails(currentUserId));
    }
  };

  const handlePageChange = (page) => {
    dispatch(setFollowingPage(page));
  };

  const totalPages = Math.ceil(followingTotal / followingLimit);

  return (
      <PageTransitionWrapper>
    <div>
      <UserList
        users={following}
        onButtonClick={handleUnfollowUser}
        tabType="following"
        isLoading={isFollowingLoading}
        error={fetchingError}
      />
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={followingPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
      </PageTransitionWrapper>
  );
};

export default Following;
