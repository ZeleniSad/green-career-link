import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  doc,
  DocumentReference,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { Grid } from "@mui/system";
import styles from "@/components/profile/profile.module.css";
import { Button, Paper, Typography } from "@mui/material";
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { UserType } from "@/types/enums";
import { Form, Formik } from "formik";
import { CompanyInformationsForm } from "@/components/profile/company-informations-form";
import { IndividualInformationsForm } from "@/components/profile/individual-informations-form";
import { uploadFile } from "@/services/fileServices";

export const ProfileInformations = ({
  profile,
  uid,
}: {
  profile: CompanyInformation | IndividualInformation;
  uid: string;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [userDocRef, setUserDocRef] = useState<DocumentReference | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!uid) {
      setIsOwner(true);
    } else if (currentUser && currentUser.uid === uid) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }

    const fetchUserDocRef = async () => {
      if (uid) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", uid);
        setUserDocRef(userDocRef);
      }
    };

    fetchUserDocRef();
  }, [uid]);

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async (values) => {
    if (!userDocRef) {
      console.error("User document reference is undefined");
      return;
    }

    try {
      let cvUrl = "";
      if (selectedFile) {
        cvUrl = await uploadFile(selectedFile, userDocRef.id);
        if (cvUrl) {
          values.cvUrl = cvUrl;
        }
      }
      await updateDoc(userDocRef, values);
    } catch (error) {
      console.error(error);
    }
    setIsEditing(false);
  };

  return (
    <Grid container>
      <Formik initialValues={profile} onSubmit={handleSaveClick}>
        {({ values, handleChange }) => (
          <Form id="profileForm">
            <Grid container className={styles.profileDetailsHeader}>
              <Typography variant="h4" color="white">
                Basic
              </Typography>
              {isOwner &&
                (isEditing ? (
                  <Grid container sx={{ gap: 1 }}>
                    <Button
                      color="white"
                      variant="outlined"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </Button>
                    <Button color="white" type="submit">
                      Save Changes
                    </Button>
                  </Grid>
                ) : (
                  <Button color="white" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ))}
            </Grid>
            <Paper sx={{ p: 3 }}>
              <Grid container sx={{ pb: 3 }}>
                <Typography variant="h4">Basic informations</Typography>
              </Grid>
              {profile?.userType === UserType.Company ? (
                <CompanyInformationsForm
                  isEditing={isEditing}
                  profile={values}
                  handleChange={handleChange}
                />
              ) : (
                <IndividualInformationsForm
                  isEditing={isEditing}
                  formikValues={values}
                  handleChange={handleChange}
                  setSelectedFile={setSelectedFile}
                />
              )}
            </Paper>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};
