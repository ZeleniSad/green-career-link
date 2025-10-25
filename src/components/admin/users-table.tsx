import React, { FC, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { fetchUsersPaginated } from "@/services/userServices";
import { Delete, Edit } from "@mui/icons-material";
import { EditUserModal } from "@/components/modals/edit-user-modal";
import { CompanyUserDto, IndividualUserDto } from "@/types/dto";
import { useAuth } from "@/context/authContext";
import { UserType } from "@/types/enums";

const UserRow: FC<{
  user: IndividualUserDto | CompanyUserDto;
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
      }}>
      <TableCell sx={{ p: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar src={user.profileUrl} sx={{ backgroundColor: "primary.main" }} />
        </Box>
      </TableCell>
      <TableCell sx={{ p: 1 }}>
        {user.userType === UserType.Individual
          ? `${(user as IndividualUserDto).firstName} ${(user as IndividualUserDto).lastName}`
          : (user as CompanyUserDto).companyName}
      </TableCell>
      <TableCell sx={{ p: 1 }}>{user.email}</TableCell>
      <TableCell sx={{ p: 1 }}>{user.phone}</TableCell>
      <TableCell sx={{ p: 1 }}>{user.country}</TableCell>
      <TableCell sx={{ p: 1 }}>{user.city}</TableCell>
      <TableCell sx={{ p: 2, textAlign: "right" }}>
        <IconButton color='primary' size='small' onClick={onEdit}>
          <Edit fontSize='medium' />
        </IconButton>
        <IconButton color='error' size='small' onClick={onDelete}>
          <Delete fontSize='medium' />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const UsersTable: FC = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const { user, accessToken } = useAuth();
  const [users, setUsers] = useState<(IndividualUserDto | CompanyUserDto)[]>([]);
  const [selectedUser, setSelectedUser] = useState<IndividualUserDto | CompanyUserDto | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUsers = async () => {
    if (!user) return;

    try {
      setTableLoading(true);
      const result = await fetchUsersPaginated(page, rowsPerPage);
      const filteredUsers = result.users.filter((u) => u.id !== user.uid);
      setUsers(filteredUsers);
      setTotalCount(result.totalCount - 1); // Subtract 1 for the current user
    } catch (error) {
      console.error("Error fetching user data: ", error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, user]);

  const handleEdit = (user: IndividualUserDto | CompanyUserDto) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (uid: string) => {
    try {
      setTableLoading(true);
      const response = await fetch(`${window.location.origin}/api/users`, {
        method: "DELETE",
        headers: {
          userId: uid,
          Authorization: accessToken ?? "",
        },
      });
      if (response.ok) {
        // Refresh the current page
        await fetchUsers();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleSave = async () => {
    // Refresh the user list after saving
    await fetchUsers();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Box sx={{ height: 4 }}>{tableLoading && <LinearProgress />}</Box>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component='div'
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
