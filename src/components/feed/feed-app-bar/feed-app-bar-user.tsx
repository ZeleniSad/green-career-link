"use client";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import React, { FC } from "react";
import { UserType } from "@/types/enums";
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { useRouter } from "next/navigation";

interface FeedAppBarUserProps {
  profile: CompanyInformation | IndividualInformation;
}

export const FeedAppBarUser: FC<FeedAppBarUserProps> = ({ profile }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Grid container sx={{ alignItems: "center", gap: 1 }}>
        <Avatar
          sx={{
            backgroundColor: theme.palette.primary.main,
            cursor: "pointer",
          }}
          src={profile?.image}
          onClick={handleClick}>
          {profile?.userType === UserType.Company
            ? profile?.companyName?.charAt(0)
            : `${profile?.firstName?.charAt(0)}${profile?.lastName?.charAt(0)}`}
        </Avatar>
        <Typography variant='body1'>
          {profile?.userType === UserType.Company ? profile?.companyName : `${profile?.firstName} ${profile?.lastName}`}
        </Typography>
      </Grid>
      <Menu
        id='basic-menu'
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
        }}>
        <MenuItem
          onClick={() => {
            router.push("/dashboard/profile");
          }}>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/login");
          }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
