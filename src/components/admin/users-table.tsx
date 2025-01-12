"use client";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { fetchAllUsers } from "@/services/userServices";
import { Delete, Edit } from "@mui/icons-material";

interface User {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
}

const UserRow: FC<{ user: User }> = ({ user }) => (
  <TableRow
    sx={{
      "&:nth-of-type(odd)": {
        backgroundColor: "action.hover",
      },
      "&:hover": {
        backgroundColor: "action.selected",
      },
    }}>
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
    <TableCell sx={{ p: 2, textAlign: "right" }}>
      <IconButton color='primary' size='small'>
        <Edit fontSize='medium' />
      </IconButton>
      <IconButton color='error' size='small'>
        <Delete fontSize='medium' />
      </IconButton>
    </TableCell>
  </TableRow>
);

export const UsersTable: FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the database
    const getAllUsers = async () => {
      try {
        const users = await fetchAllUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    getAllUsers();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "primary.main" }}>
            <TableCell sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}></TableCell>
            <TableCell sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}>Phone</TableCell>
            <TableCell sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}>Country</TableCell>
            <TableCell sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}>City</TableCell>
            <TableCell sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}></TableCell>
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
