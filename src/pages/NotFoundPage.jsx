import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>

          <div className="mt-4">
            <Link
              to="/catalog"
              className="inline-block text-blue-600 hover:text-blue-800 underline"
            >
              Go to Car Catalog
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <div className="text-6xl mb-4">🚗</div>
          <p className="text-gray-500">
            Maybe you were looking for one of our cars?
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
