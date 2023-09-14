import React from 'react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex-center flex-1 flex-col bg-primary pt-12">
      <div className="flex-center flex-1 flex-col">
        <h1 className="text-center text-h1 text-white">Page not found</h1>
        <p className="mt-2 text-center text-p4 text-white/80">
          Hmm, the page you were looking for doesn’t seem to exist.
        </p>
      </div>
    </div>
  );
};
