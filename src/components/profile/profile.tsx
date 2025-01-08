"use client";
import { CreatePostModal } from "@/components/modals/create-post-modal";
import { useModal } from "@/hooks/useModal";
import { ProfileBanner } from "@/components/profile/profile-banner";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileInformations } from "@/components/profile/profile-informations";
import { Box } from "@mui/material";
import styles from "./profile.module.css";
import { mockedIndividualUser } from "@/components/mocked-data/mocked-data";

export const Profile = () => {
  const { modalOpen, handleOpen, handleClose } = useModal();

  return (
    <Box className={styles.wrapper}>
      <ProfileHeader handleOpen={handleOpen} profile={mockedIndividualUser} />
      <ProfileBanner profile={mockedIndividualUser} />
      <ProfileInformations profile={mockedIndividualUser} />
      <CreatePostModal modalOpen={modalOpen} handleClose={handleClose} />
    </Box>
  );
};
