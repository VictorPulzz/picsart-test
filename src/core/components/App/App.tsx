import React, { useLayoutEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

import { Router } from '~/core/router';
import { ErrorBoundaryPage } from '~/pages/ErrorBoundary';
import { Sidebar } from '~/shared/components';

import styles from './App.module.scss';

export const App: React.FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className={styles.container}>
      <Sidebar />
      <div className={styles.inner}>
        <ErrorBoundary FallbackComponent={ErrorBoundaryPage}>
          <Router />
        </ErrorBoundary>
      </div>
    </main>
  );
};
