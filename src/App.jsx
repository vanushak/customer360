import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Lazy load your CustomerGrid component
const CustomerGrid = lazy(() => import("./api/components/CustomerGrid"));

const App = () => {
  return (
    <Router>
      <div className="p-6">
        {/* Navigation */}
        <nav className="flex gap-4 mb-6 justify-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
          <Link to="/customers" className="text-blue-500 hover:underline">
            Customer Grid
          </Link>
        </nav>

        {/* Routes */}
        <Suspense fallback={<p className="text-center text-gray-500">Loading...</p>}>
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-2xl font-bold text-center mt-10">
                  Hello World
                </div>
              }
            />
            <Route path="/customers" element={<CustomerGrid />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
