import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h1 className=" text-2xl font-semibold text-red-500">
            404 Page Not Found
          </h1>
          <Link
            className="font-medium text-slate-900 hover:text-slate-900"
            to="/"
          >
            Redirect to Home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
