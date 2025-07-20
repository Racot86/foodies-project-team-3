import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import Page from "@components/page/Page";
import { Tabs, Heading, Text, ButtonIcon, Button } from "@components/ui";
import LogOutModal from "@components/logOutModal/LogOutModal";
import { DEFAULT_AVATAR } from "../../services/api";

import { FiPlus } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, selectUser } from "../../redux/slices/authSlice";
import {
  selectUserDetails,
  userDetails,
  userAvatar,
  followUser,
  selectError,
} from "../../redux/slices/userSlice";
import {
  unfollowUser,
  checkFollowStatus
} from "../../redux/slices/followerSlice";

function ProfilePage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const loggedUser = useSelector(selectUser);
  const requestedUserDetails = useSelector(selectUserDetails);
  const error = useSelector(selectError);
  const { isFollowing, isFollowActionLoading } = useSelector((state) => state.followers);

  // get current user
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const { userId } = useParams();
  const isMe = !userId || userId === loggedUser?.id;
  const idOfUserToRender = isMe ? loggedUser?.id : userId;

  // Check if the current user is following the viewed user
  useEffect(() => {
    if (!isMe && userId) {
      dispatch(checkFollowStatus(userId));
    }
  }, [dispatch, userId, isMe]);

  // get specific user details
  useEffect(() => {
    if (idOfUserToRender) {
      dispatch(userDetails(idOfUserToRender));
    }
  }, [idOfUserToRender, dispatch]);

  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".jpg, .jpeg, .svg";

  input.onchange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(userAvatar(file));
    }
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const followUserHandler = async () => {
    if (!isMe) {
      if (isFollowing) {
        // If already following, unfollow the user
        await dispatch(unfollowUser(userId));
        // After unfollowing, check the follow status again
        dispatch(checkFollowStatus(userId));
      } else {
        // If not following, follow the user
        await dispatch(followUser(userId));
        // After following, check the follow status again
        dispatch(checkFollowStatus(userId));
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Page className={styles.profilePage}>
      <Heading
        level={1}
        size="xl"
        weight="bold2"
        className={styles.profileHeading}
      >
        PROFILE
      </Heading>
      <div>
        <Text
          color="primary"
          weight="semibold"
          className={styles.profileDescription}
        >
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Text>
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.controlPanelContainer}>
          <div className={styles.controlPanel}>
            <div className={styles.profileContent}>
              <div className={styles.profileInfo}>
                <div className={styles.profileImageContainer}>
                  <div className={styles.imagePlaceholder}>
                    <img
                      src={requestedUserDetails?.avatar || DEFAULT_AVATAR}
                      alt="User Avatar"
                    />
                  </div>
                  {isMe && (
                    <ButtonIcon
                      variant={ButtonIcon.variants.PRIMARY}
                      className={styles.uploadPhotoButton}
                      onClick={() => input.click()}
                    >
                      <FiPlus />
                    </ButtonIcon>
                  )}
                </div>
                <Heading
                  level={4}
                  size="sm"
                  weight="semibold"
                  className={styles.userName}
                >
                  {requestedUserDetails.name.toUpperCase()}
                </Heading>
                <div className={styles.userInfo}>
                  <ul>
                    <li>
                      <Text variant="body" size="sm" color="muted">
                        Email:
                      </Text>
                      <Text variant="body" size="md">
                        {requestedUserDetails.email}
                      </Text>
                    </li>
                    <li>
                      <Text variant="body" size="sm" color="muted">
                        Added recipes:
                      </Text>
                      <Text variant="body" size="md">
                        {requestedUserDetails.recipes}
                      </Text>
                    </li>
                    {isMe && (
                      <li>
                        <Text variant="body" size="sm" color="muted">
                          Favorites:
                        </Text>
                        <Text variant="body" size="md">
                          {requestedUserDetails.favorites}
                        </Text>
                      </li>
                    )}
                    <li>
                      <Text variant="body" size="sm" color="muted">
                        Followers:
                      </Text>
                      <Text variant="body" size="md">
                        {requestedUserDetails.followers}
                      </Text>
                    </li>
                    {isMe && (
                      <li>
                        <Text variant="body" size="sm" color="muted">
                          Following:
                        </Text>
                        <Text variant="body" size="md">
                          {requestedUserDetails.following}
                        </Text>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              {isMe && (
                <Button
                  variant={Button.variants.PRIMARY}
                  onClick={openLogoutModal}
                  type="button"
                  href={null}
                  to={null}
                  className={styles.actionButton}
                  isLoading={false}
                >
                  Log out
                </Button>
              )}
              {!isMe && (
                <Button
                  variant={Button.variants.PRIMARY}
                  onClick={followUserHandler}
                  type="button"
                  href={null}
                  to={null}
                  className={styles.actionButton}
                  isLoading={isFollowActionLoading}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.tabsSection}>
          <Tabs visibleTabs={isMe ? { recipes: false } : { myRecipes: false, favorites: false, following: false }} />
          <div className={styles.tabContent}>
            <Outlet />
          </div>
        </div>
      </div>

      {isLogoutModalOpen && <LogOutModal onClose={closeLogoutModal} />}

      <ToastContainer position="top-right" autoClose={3000} />
    </Page>
  );
}

export default ProfilePage;
