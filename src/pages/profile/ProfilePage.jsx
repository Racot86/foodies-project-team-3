import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import Page from '../../components/page/Page';
import { BreadCrumbs, Tabs } from '@components/ui';

function ProfilePage() {
    return (
        <Page className={styles.profilePage}>
            <BreadCrumbs items={[{ label: 'Profile' }]} />
            <h1>My Profile</h1>
            <div className={styles.profileContent}>
                <div className={styles.profileInfo}>
                    <div className={styles.profileImageContainer}>
                        {/* Placeholder for profile image */}
                        <div className={styles.imagePlaceholder}>U</div>
                    </div>
                    <div className={styles.userInfo}>
                        <h2>User Name</h2>
                        <p>Email: user@example.com</p>
                        <p>Member since: January 2023</p>
                    </div>
                </div>

                <div className={styles.profileStats}>
                    <h3>Your Activity</h3>
                    <ul>
                        <li>Recipes created: 5</li>
                        <li>Favorite recipes: 12</li>
                        <li>Comments: 8</li>
                    </ul>
                </div>
            </div>

            <div className={styles.tabsSection}>
                <Tabs />
                <div className={styles.tabContent}>
                    <Outlet />
                </div>
            </div>
        </Page>
    );
}

export default ProfilePage;
