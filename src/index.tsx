import './resources/styles/global.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { z } from 'zod';

import { App } from '~/core/components';
import { ThemeProvider } from '~/core/libs/Theme';
import { startMockServer } from '~/mock-server/server';
import { formErrors } from '~/shared/configs';
import { store } from '~/store';

startMockServer();

const CONTAINER_SELECTOR = 'root';

const container = document.getElementById(CONTAINER_SELECTOR);

if (!container) {
  throw new Error(`Element with id "${CONTAINER_SELECTOR}" not found`);
}

const root = createRoot(container);

z.setErrorMap((issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.minimum === 1) {
      return { message: formErrors.REQUIRED };
    }
  }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === 'email') {
      return { message: formErrors.INVALID_EMAIL };
    }
  }
  return { message: ctx.defaultError };
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
