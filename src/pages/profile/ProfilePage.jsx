import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import Page from "@components/page/Page";
import { Tabs, Heading, Text, ButtonIcon } from "@components/ui";

import { FiPlus } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, selectUser } from "../../redux/slices/authSlice";
import {
  selectUserDetails,
  userDetails,
  userAvatar,
} from "../../redux/slices/userSlice";

function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const requestedUserDetails = useSelector(selectUserDetails);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  useEffect(() => {
    if (user?.id) {
      dispatch(userDetails(user.id));
    }
  }, [user, dispatch]);

  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".jpg, .jpeg, .svg";

  input.onchange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(userAvatar(file));
    }
  };

  return (
    <Page className={styles.profilePage}>
      <Heading
        level={1}
        size="xl"
        weight="bold2"
        style={{
          marginBottom: "20px",
        }}
      >
        PROFILE
      </Heading>
      <Text
        color="primary"
        weight="semibold"
        сlassName={styles.profileDescription}
      >
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Text>
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profileInfo}>
            <div className={styles.profileImageContainer}>
              {/* Placeholder for profile image */}
              <div className={styles.imagePlaceholder}>
                {requestedUserDetails?.avatar && (
                  <img src={requestedUserDetails.avatar} alt="User Avatar" />
                )}
              </div>
              <ButtonIcon
                variant={ButtonIcon.variants.PRIMARY}
                className={styles.uploadPhotoButton}
                onClick={() => input.click()}
              >
                <FiPlus />
              </ButtonIcon>
            </div>
            <div className={styles.userInfo}>
              <Heading
                level={4}
                size="sm"
                weight="semibold"
                className={styles.userName}
              >
                {requestedUserDetails.name.toUpperCase()}
              </Heading>
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
                <li>
                  <Text variant="body" size="sm" color="muted">
                    Favorites:
                  </Text>
                  <Text variant="body" size="md">
                    {requestedUserDetails.favorites}
                  </Text>
                </li>
                <li>
                  <Text variant="body" size="sm" color="muted">
                    Followers:
                  </Text>
                  <Text variant="body" size="md">
                    {requestedUserDetails.followers}
                  </Text>
                </li>
                <li>
                  <Text variant="body" size="sm" color="muted">
                    Following:
                  </Text>
                  <Text variant="body" size="md">
                    {requestedUserDetails.following}
                  </Text>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.tabsSection}>
          <Tabs />
          <div className={styles.tabContent}>
            <Outlet />
          </div>
        </div>
      </div>
    </Page>
  );
}

export default ProfilePage;
