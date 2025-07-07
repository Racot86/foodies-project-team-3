import React from 'react';
import { ResponsiveExample } from '@components/responsive/ResponsiveExample.jsx';
import styles from './HomePage.module.css';
import Page from '../../components/page/Page';
import { Hero } from '@components/hero/Hero.jsx';

function HomePage() {
  return (
    <Page className={styles.homePage}>
        <p>Home Page</p>
      <Hero />

      {/* Example of using the responsive components */}
      <ResponsiveExample />
    </Page>
  );
}

export default HomePage;
