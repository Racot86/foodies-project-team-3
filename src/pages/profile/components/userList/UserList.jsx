import React from "react";
import {Text} from "@/components/ui";
import UserCard from "../userCard/UserCard";
import UserCardSkeleton from "../userCard/UserCardSkeleton";
import styles from "./UserList.module.css";
import EmptyState from "../recipeCard/EmptyState";

const UserList = ({
                      users = [],
                      onButtonClick,
                      tabType = "followers",
                      isLoading = false,
                      error = null,
                  }) => {
    const getEmptyMessage = () => {
        return tabType === "followers"
            ? "There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile."
            : "Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.";
    };

    if (error) {
        return (
            <div className={styles.container}>
                <Text className={styles.error}>
                    Something went wrong, please, try again later.
                </Text>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.userList}>
                    <UserCardSkeleton/>
                </div>
            </div>
        );
    }

    if (users.length === 0) {
        return <EmptyState text={getEmptyMessage()}/>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.userList}>
                {users.map((user, index) => (
                    <React.Fragment key={user.id}>
                        <UserCard
                            user={user}
                            onButtonClick={onButtonClick}
                            tabType={tabType}
                        />
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
                                    <path d="M0 1H846" stroke="#BFBEBE" strokeWidth="1"/>
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
export {UserList};
