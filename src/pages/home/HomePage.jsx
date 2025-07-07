import React from 'react';
import { ResponsiveExample } from '@components/responsive/ResponsiveExample.jsx';
import styles from './HomePage.module.css';
import Page from '../../components/page/Page';

function HomePage() {
  return (
    <Page className={styles.homePage}>
      <h1>Home Page</h1>
      <p>This is the home page of the application.</p>

      {/* Example of using the responsive components */}
      <ResponsiveExample />
    </Page>
  );
}

export default HomePage;
