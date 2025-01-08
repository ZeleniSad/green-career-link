"use client";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
}

const UserRow: FC<{ user: User }> = ({ user }) => (
  <TableRow>
    <TableCell sx={{ p: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar />
      </Box>
    </TableCell>
    <TableCell sx={{ p: 1 }}>{user.name}</TableCell>
    <TableCell sx={{ p: 1 }}>{user.email}</TableCell>
    <TableCell sx={{ p: 1 }}>{user.phone}</TableCell>
    <TableCell sx={{ p: 1 }}>{user.country}</TableCell>
    <TableCell sx={{ p: 1 }}>{user.city}</TableCell>
    <TableCell sx={{ p: 1 }}>
      <Button variant="contained" color="primary" fullWidth>
        Edit
      </Button>
    </TableCell>
    <TableCell sx={{ p: 1 }}>
      <Button variant="contained" color="error" fullWidth>
        Delete
      </Button>
    </TableCell>
  </TableRow>
);

export const UsersTable: FC = () => {
  const users: User[] = [
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "+38164000000",
      country: "Serbia",
      city: "Novi Sad",
    },
    // Add more users as needed
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ p: 1 }}></TableCell>
            <TableCell sx={{ p: 1 }}>Name</TableCell>
            <TableCell sx={{ p: 1 }}>Email</TableCell>
            <TableCell sx={{ p: 1 }}>Phone</TableCell>
            <TableCell sx={{ p: 1 }}>Country</TableCell>
            <TableCell sx={{ p: 1 }}>City</TableCell>
            <TableCell sx={{ p: 1 }}></TableCell>
            <TableCell sx={{ p: 1 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <UserRow key={index} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
