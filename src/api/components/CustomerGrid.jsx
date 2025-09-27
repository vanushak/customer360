import React, { useState, useEffect } from "react";
import ErrorAlert from "./AlertComponent/ErrorAlert";

const CustomerGrid = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const { key, direction } = sortConfig;
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users?_sort=${key}&_order=${direction}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setComments(data.slice(0, 20)); // limit to 20 rows for demo
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [sortConfig]); // Run the effect when sortConfig changes

  if (loading) {
    return <p className="text-center text-blue-500">Loading comments...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Helper function to display sort direction arrow
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Customer Comments</h1>
      {error && <ErrorAlert
      message={error}
      onClose={()=>setError("")}
      />}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID {getSortIcon("id")}
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("username")}
              >
                Name {getSortIcon("username")}
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email {getSortIcon("email")}
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("address.city")}
              >
                City {getSortIcon("address.city")}
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("phone")}
              >
                Contact {getSortIcon("phone")}
              </th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{c.id}</td>
                <td className="border border-gray-300 px-4 py-2">{c.username}</td>
                <td className="border border-gray-300 px-4 py-2">{c.email}</td>
                <td className="border border-gray-300 px-4 py-2">{c.address.city}</td>
                <td className="border border-gray-300 px-4 py-2">{c.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerGrid;
