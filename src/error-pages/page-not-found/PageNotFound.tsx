import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page not found</h2>
      <p className="text-lg mb-8">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link to="/expenses">
        <button className="cursor-pointer underline text-blue-500">
          Back to Expenses
        </button>
      </Link>
    </div>
  );
}
