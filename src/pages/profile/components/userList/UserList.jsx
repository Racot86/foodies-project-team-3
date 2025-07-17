import React from "react";
import UserCard from "../userCard/UserCard";
import styles from "./UserList.module.css";

const UserList = ({
  users = [],
  onButtonClick,
  tabType = "followers", // "followers" or "following"
  isLoading = false,
  error = null,
}) => {
  // Determine button text based on tab type
  const getButtonText = () => {
    return tabType === "followers" ? "FOLLOW" : "Following";
  };

  // Determine empty message based on tab type
  const getEmptyMessage = () => {
    return tabType === "followers"
      ? "No followers yet"
      : "Not following anyone yet";
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading users...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  // Show empty state
  if (users.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>{getEmptyMessage()}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.userList}>
        {users.map((user, index) => (
          <React.Fragment key={user.id}>
            <UserCard
              user={user}
              onButtonClick={onButtonClick}
              buttonText={getButtonText()}
            />
            {/* Render divider line between cards (not after the last one) */}
            {index < users.length - 1 && (
              <div className={styles.divider}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="2"
                  viewBox="0 0 846 2"
                  fill="none"
                  className={styles.dividerSvg}
                >
                  <path d="M0 1H846" stroke="#BFBEBE" strokeWidth="1" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default UserList;
export { UserList };
