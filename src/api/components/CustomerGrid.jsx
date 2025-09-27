import React, { useState, useEffect } from "react";

const CustomerGrid = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
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
  }, []);

  if (loading) {
    return <p className="text-center text-blue-500">Loading comments...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Customer Comments</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">City</th>
             <th className="border border-gray-300 px-4 py-2">Contact</th>

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
