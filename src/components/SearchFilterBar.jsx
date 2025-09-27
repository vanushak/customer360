import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

const SearchFilter = ({ q, setQ, city, setCity, onClear }) => {
  const [input, setInput] = useState(q);
  const [cities, setCities] = useState([]);

  //  debounce on the input
  const debouncedInput = useDebounce(input, 400);

  useEffect(() => {
    setQ(debouncedInput); // updating parent only after debounce
  }, [debouncedInput, setQ]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setCities([...new Set(data.map((u) => u.address.city))]);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="Search by name, username, email, phone..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded w-full sm:w-1/2"
      />
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded"
      >
        <option value="">All Cities</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          setInput("");
          setQ("");
          setCity("");
        }}
        className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchFilter;
