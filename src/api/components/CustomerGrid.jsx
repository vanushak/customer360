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
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setCustomers(data.slice(0, 20)); // limit to 20 rows for demo
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "150px" }}>
        <CircularProgress />
        <Typography variant="body1" style={{ marginLeft: "8px" }}>
          Loading customers...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error" align="center">
        Error: {error}
      </Typography>
    );
  }

  return (
    <div style={{ marginTop: "16px" }}>
      <Typography variant="h6" gutterBottom align="center">
        Customer Details
      </Typography>
      {!customers.length ? "No Records Found" : 
        <TableContainer component={Paper} style={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="customer table">
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#fff", fontWeight: "bold" }}>ID</TableCell>
              <TableCell style={{ backgroundColor: "#fff", fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ backgroundColor: "#fff", fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ backgroundColor: "#fff", fontWeight: "bold" }}>City</TableCell>
              <TableCell style={{ backgroundColor: "#fff", fontWeight: "bold" }}>Contact</TableCell>
            </TableRow>
          </TableHead>
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
      }
    </div>
  );
};

export default CustomerGrid;


