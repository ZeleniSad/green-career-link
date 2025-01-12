"use client";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchUserByUid,
  getAuthenticatedUser,
  logout,
} from "@/services/authService";
import { mapUserDataToFeedAppBarUser } from "@/util/mappers";

export interface FeedAppBarUser {
  displayName: string;
  photoURL: string;
  uid: string;
}

export const FeedAppBarUser: FC = () => {
  const [profile, setProfile] = useState<FeedAppBarUser | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authenticatedUserData = await getAuthenticatedUser();
        const userData = await fetchUserByUid(authenticatedUserData.uid);
        const mappedUserData = mapUserDataToFeedAppBarUser(userData);
        setProfile(mappedUserData);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <Grid container sx={{ alignItems: "center", gap: 1 }}>
        <Avatar
          sx={{
            backgroundColor: theme.palette.primary.main,
            cursor: "pointer",
          }}
          src={profile?.photoURL}
          onClick={handleClick}
        >
          {profile?.displayName[0]}
        </Avatar>
        <Typography variant="h6">{profile?.displayName}</Typography>
      </Grid>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => {
            router.push("/dashboard/profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
