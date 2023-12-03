import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import useStore from "../store";
import { getUsers } from "../api";
import { useEffect } from "react";

function createTableData(name, companyName, email, address, phone) {
  return { name, companyName, email, address, phone };
}

export default function Dashboard() {
  const { style, users, updateUsers } = useStore();

  const fetchUsers = async () => {
    const data = await getUsers();
    updateUsers(data);
  };

  useEffect(() => {
    // Fetch new data if posts are not already fetched
    if (!users) {
      fetchUsers();
    }
  }, []);

  const clients = users?.map((client) => {
    const {
      name,
      company: { name: companyName },
      address: { street, city },
      email,
      phone,
    } = client;
    return createTableData(name, companyName, email, street + "" + city, phone);
  });

  return (
    <>
      <div
        style={{
          fontWeight: 200,
          fontSize: 36,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Dashboard
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
