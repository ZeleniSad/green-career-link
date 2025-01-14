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
import { EditUserModal } from "@/components/modals/edit-user-modal";
import { UserDto } from "@/types/dto";
import { useAuth } from "@/context/authContext";
import { Loading } from "@/components/loading/loading";

const UserRow: FC<{
  user: UserDto;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ user, onEdit, onDelete }) => {
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
  const [loading, setLoading] = useState(false);
  const { user, accessToken } = useAuth();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDto>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const users = (await fetchAllUsers()).filter((u) => u.id !== user?.uid);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    getAllUsers();
  }, []);

  const handleEdit = (user: UserDto) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (uid: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${window.location.origin}/api/users`, {
        method: "DELETE",
        headers: {
          userId: uid,
          Authorization: accessToken ?? "",
        },
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== uid));
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    // Refresh the user list after saving
    const getAllUsers = async () => {
      try {
        const users = (await fetchAllUsers()).filter((u) => u.id !== user?.uid);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    getAllUsers();
    setLoading(false);
  };

  if (loading) {
    return <Loading isOpen={loading} />;
  }

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
                key={user.id}
                user={user}
                onEdit={() => handleEdit(user)}
                onDelete={() => handleDelete(user.id)}
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
