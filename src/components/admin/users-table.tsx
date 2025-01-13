import React, { FC, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { fetchAllUsers } from "@/services/userServices";
import { Delete, Edit } from "@mui/icons-material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { EditUserModal } from "@/components/modals/edit-user-modal";

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  profileUrl: string;
}

const UserRow: FC<{ user: User; onEdit: () => void; onDelete: () => void }> = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow
      sx={{
        "&:nth-of-type(odd)": {
          backgroundColor: "action.hover",
        },
        "&:hover": {
          backgroundColor: "action.selected",
        },
      }}
    >
      <TableCell sx={{ p: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={user.profileUrl}
            sx={{ backgroundColor: "primary.main" }}
          />
        </Box>
      </TableCell>
      <TableCell sx={{ p: 1 }}>
        {user.firstName
          ? `${user.firstName} ${user.lastName}`
          : user.companyName}
      </TableCell>
      <TableCell sx={{ p: 1 }}>{user.email}</TableCell>
      <TableCell sx={{ p: 1 }}>{user.phone}</TableCell>
      <TableCell sx={{ p: 1 }}>{user.country}</TableCell>
      <TableCell sx={{ p: 1 }}>{user.city}</TableCell>
      <TableCell sx={{ p: 2, textAlign: "right" }}>
        <IconButton color="primary" size="small" onClick={onEdit}>
          <Edit fontSize="medium" />
        </IconButton>
        <IconButton color="error" size="small" onClick={onDelete}>
          <Delete fontSize="medium" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const UsersTable: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
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

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (uid: string) => {
    try {
      await deleteDoc(doc(db, "users", uid));
      setUsers(users.filter((user) => user.uid !== uid));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const handleSave = () => {
    // Refresh the user list after saving
    const getAllUsers = async () => {
      try {
        const users = await fetchAllUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    getAllUsers();
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              ></TableCell>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                Phone
              </TableCell>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                Country
              </TableCell>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                City
              </TableCell>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserRow
                key={user.uid}
                user={user}
                onEdit={() => handleEdit(user)}
                onDelete={() => handleDelete(user.uid)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditUserModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSave}
      />
    </>
  );
};
