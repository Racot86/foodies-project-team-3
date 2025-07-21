import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {followUser, getFollowers, setFollowersPage,} from "@/redux/slices/followerSlice";
import {userDetails} from "@/redux/slices/userSlice";
import UserList from "../components/userList/UserList";
import {Pagination} from "@/components/ui/Pagination";
import styles from "./Followers.module.css";
import PageTransitionWrapper from "@components/pageTransitionWrapper/PageTransitionWrapper.jsx";

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

    const {user} = useSelector((state) => state.auth);
    const currentUserId = user?.id;

    const {userId} = useParams();
    const targetUserId = userId || currentUserId;

    useEffect(() => {
        if (targetUserId) {
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

            const message = result.payload?.alreadyFollowing
                ? "Already following this user"
                : "Added to followers";

            toast.success(message);

            // Update user details to refresh the follower count in the side card
            if (targetUserId) {
                dispatch(userDetails(targetUserId));
            }
        } catch {
            toast.error("Failed to follow user");
        }
    };

    const handlePageChange = (page) => {
        dispatch(setFollowersPage(page));
    };

    const totalPages = Math.ceil(followersTotal / followersLimit);

    return (
        <PageTransitionWrapper>
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
        </PageTransitionWrapper>
    );
};

export default Followers;
