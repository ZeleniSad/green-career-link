"use client";
import { Avatar, Link, Menu, MenuItem } from "@mui/material";
import { Grid } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthenticatedUser, logout } from "@/services/authService";
import { mapUserDataToFeedAppBarUser } from "@/util/mappers";
import { fetchUserByUid } from "@/services/userServices";

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
      <Grid container sx={{ alignItems: "center", gap: 3 }}>
        <Avatar
          sx={{
            backgroundColor: theme.palette.primary.main,
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          src={profile?.photoURL}
          onClick={handleClick}
        >
          {profile?.displayName[0]}
        </Avatar>
        <Link
          underline="none"
          onClick={() => router.push("/dashboard/profile")}
          sx={{
            cursor: "pointer",
          }}
        ></Link>
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
