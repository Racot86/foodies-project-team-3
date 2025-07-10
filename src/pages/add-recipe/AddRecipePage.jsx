import React from 'react';
import styles from './AddRecipePage.module.css';
import Page from '@components/page/Page';
import { BreadCrumbs } from '@components/ui';

function AddRecipePage() {
    return (
        <Page className={styles.recipePage}>
            <BreadCrumbs items={[{ label: 'Add Recipe' }]} />
            Recipe Page
        </Page>
    );
}

export default AddRecipePage;
