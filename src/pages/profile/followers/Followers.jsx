import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getFollowers,
  followUser,
  setFollowersPage,
} from "@/redux/slices/followerSlice";
import UserList from "../components/userList/UserList";
import { Pagination } from "@/components/ui/Pagination";
import styles from "./Followers.module.css";

const Followers = () => {
  const dispatch = useDispatch();
  const {
    followers,
    isFollowersLoading,
    fetchingError,
    followersPage,
    followersLimit,
    followersTotal,
  } = useSelector((state) => state.followers);

  // Get current user ID from auth state
  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?.id;

  // Get userId from URL params, or use current user's ID if not provided
  const { userId } = useParams();
  const targetUserId = userId || currentUserId;

  useEffect(() => {
    if (targetUserId) {
      // Fetch followers for the target user (either current user or specified user)
      dispatch(
        getFollowers({
          userId: targetUserId,
          page: followersPage,
          limit: followersLimit,
        })
      );
    }
  }, [dispatch, targetUserId, followersPage, followersLimit]);
  const handleFollowUser = async (userId) => {
    try {
      const result = await dispatch(followUser(userId));

      console.log("Follow result:", result); // Debug log

      const message = result.payload?.alreadyFollowing
        ? "Already following this user"
        : "Added to followers";

      toast.success(message, { position: "top-center", autoClose: 3000 });
    } catch {
      toast.error("Failed to follow user", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handlePageChange = (page) => {
    dispatch(setFollowersPage(page));
  };

  // Calculate total pages
  const totalPages = Math.ceil(followersTotal / followersLimit);

  return (
    <div>
      <UserList
        users={followers}
        onButtonClick={handleFollowUser}
        tabType="followers"
        isLoading={isFollowersLoading}
        error={fetchingError}
      />
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={followersPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Followers;
