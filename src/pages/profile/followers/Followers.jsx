import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  useEffect(() => {
    if (currentUserId) {
      // Fetch followers for current user
      dispatch(
        getFollowers({
          userId: currentUserId,
          page: followersPage,
          limit: followersLimit,
        })
      );
    }
  }, [dispatch, currentUserId, followersPage, followersLimit]);
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
