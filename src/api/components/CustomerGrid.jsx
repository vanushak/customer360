import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const CustomerGrid = () => {
  // State to store customer data
  const [customers, setCustomers] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const maxRetries = 3; // Maximum number of retry attempts
      let attempt = 0;      // Current attempt counter
      let success = false;  // Flag to track successful fetch

      // Retry loop
      while (attempt < maxRetries && !success) {
        try {
          // Fetch customer data from API
          const res = await fetch("https://jsonplaceholder.typicode.com/users");

          // If response is not OK, throw an error to trigger retry
          if (!res.ok) throw new Error("Failed to fetch data");

          // Parse JSON response
          const data = await res.json();

          // Save first 20 records for demo purposes
          setCustomers(data.slice(0, 20));
          success = true; // Mark fetch as successful
        } catch (err) {
          attempt++; // Increment retry counter
          // If max attempts reached, set error message
          if (attempt >= maxRetries) {
            setError(err.message);
          }
        }
      }

      // Stop loading indicator after fetch/retries
      setLoading(false);
    };

    // Call fetch function when component mounts
    fetchCustomers();
  }, []);

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "150px",
        }}
      >
        <CircularProgress />
        <Typography variant="body1" style={{ marginLeft: "8px" }}>
          Loading customers...
        </Typography>
      </div>
    );
  }

  // Show error message if fetch fails after retries
  if (error) {
    return (
      <Typography variant="body1" color="error" align="center">
        Error: {error}
      </Typography>
    );
  }

  // Main table UI
  return (
    <div style={{ marginTop: "16px" }}>
      <Typography variant="h6" gutterBottom align="center">
        Customer Details
      </Typography>

      {/* Show message if no data */}
      {!customers.length ? (
        "No Records Found"
      ) : (
        <TableContainer component={Paper} style={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="customer table">
            {/* Table Header */}
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: "#fff", fontWeight: "bold" }}>ID</TableCell>
                <TableCell style={{ backgroundColor: "#fff", fontWeight: "bold" }}>Name</TableCell>
                <TableCell style={{ backgroundColor: "#fff", fontWeight: "bold" }}>Email</TableCell>
                <TableCell style={{ backgroundColor: "#fff", fontWeight: "bold" }}>City</TableCell>
                <TableCell style={{ backgroundColor: "#fff", fontWeight: "bold" }}>Contact</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {customers.map((c) => (
                <TableRow
                  key={c.id}
                  style={{ cursor: "pointer", transition: "0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.username}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.address.city}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default CustomerGrid;
