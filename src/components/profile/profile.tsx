"use client";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { CreatePostModal } from "@/components/modals/create-post-modal";
import { useModal } from "@/hooks/useModal";
import { ProfileBanner } from "@/components/profile/profile-banner";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileInformations } from "@/components/profile/profile-informations";
import { Box } from "@mui/material";
import styles from "./profile.module.css";
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { mapUserData } from "@/util/mappers";

export const Profile = ({ uid: initialUid }: { uid?: string }) => {
  const { modalOpen, handleOpen, handleClose } = useModal();
  const [userData, setUserData] = useState<
    IndividualInformation | CompanyInformation
  >(null);
  const [uid, setUid] = useState<string>(initialUid ?? "");

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const db = getFirestore();

      if (!uid) {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUid(currentUser.uid);
        } else {
          // Handle case where no user is authenticated
          return;
        }
      }

      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = mapUserData(userDoc.data());
        setUserData(userData);
      } else {
        // Handle case where user data does not exist
      }
    };

    fetchUserData();
  }, [uid]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={styles.wrapper}>
      <ProfileHeader handleOpen={handleOpen} />
      <ProfileBanner profile={userData} uid={uid} />
      <ProfileInformations profile={userData} uid={uid} />
      <CreatePostModal modalOpen={modalOpen} handleClose={handleClose} />
    </Box>
  );
};
