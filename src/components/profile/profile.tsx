"use client";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { ProfileBanner } from "@/components/profile/profile-banner";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileInformations } from "@/components/profile/profile-informations";
import { Box } from "@mui/material";
import styles from "./profile.module.css";
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { mapUserData } from "@/util/mappers";
import { Loading } from "@/components/loading/loading";

export const Profile = ({ uid: initialUid }: { uid?: string }) => {
  const [userData, setUserData] = useState<
    IndividualInformation | CompanyInformation
  >(null);
  const [uid, setUid] = useState<string>(initialUid ?? "");

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const db = getFirestore();

      let userId = uid;

      if (!userId) {
        const currentUser = auth.currentUser;
        if (currentUser) {
          userId = currentUser.uid;
          setUid(currentUser.uid);
        } else {
          // Handle case where no user is authenticated
          return;
        }
      }

      // Only fetch if we have a valid uid
      if (userId) {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = mapUserData(userDoc.data());
          setUserData(userData);
        } else {
          // Handle case where user data does not exist
        }
      }
    };

    fetchUserData();
  }, [uid]);

  if (!userData) {
    return <Loading isOpen={true} />;
  }

  return (
    <Box className={styles.wrapper}>
      <ProfileHeader />
      <ProfileBanner profile={userData} uid={uid} />
      <ProfileInformations profile={userData} uid={uid} />
    </Box>
  );
};
