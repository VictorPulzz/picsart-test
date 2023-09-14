import React, { FC } from 'react';

export const ErrorBoundaryPage: FC = () => {
  return (
    <div className="flex-center flex-1 flex-col bg-primary pt-12">
      <div className="flex-center flex-1 flex-col">
        <h1 className="text-center text-h1 text-white">Oops! Something went wrong</h1>
        <p className="mt-2 text-center text-p4 text-white/80">
          Refresh the page, log out or try again later.
        </p>

      </div>
    </div>
  );
};
