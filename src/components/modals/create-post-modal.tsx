import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { DescriptionOutlined } from "@mui/icons-material";
import { FC, useEffect, useRef, useState } from "react";
import {
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonItalic,
  MenuButtonRemoveFormatting,
  MenuButtonStrikethrough,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  RichTextEditorRef,
} from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { makeStyles } from "@mui/styles";
import { UploadFile } from "@/components/upload-file/upload-file";
import { FeedItemDto } from "@/types/dto";
import { uploadFile } from "@/services/fileServices";
import { useAuth } from "@/context/authContext";
import { fetchUserByUid } from "@/services/userServices";
import { mapUserData } from "@/util/mappers";
import {
  CompanyInformation,
  FeedItemCategory,
  IndividualInformation,
} from "@/types/interfaces";
import { UserType } from "@/types/enums";

const labels = {
  createPostTitle: "Create a post",
  createPostDescription:
    "The form allows you to easily create and share posts about business opportunities, volunteer actions, or environmental projects with the community on the platform.",
  categoryLabel: "Choose category",
  postDescription: "Post Description",
  attachFiles: "Attach Files",
  supportedFormats:
    "If you want, you can add an image to make your post more visually appealing. Supported formats: PNG, JPG, JPEG",
  cancel: "Cancel",
  createPostButton: "Create post",
};

const useStyles = makeStyles({
  textEditor: {
    height: "100%",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    padding: 16,
  },
});

interface CreatePostModalProps {
  modalOpen: boolean;
  handleClose: () => void;
  addFeedItem: (newItem: Omit<FeedItemDto, "id">) => Promise<FeedItemDto>;
}

export const CreatePostModal: FC<CreatePostModalProps> = ({
  modalOpen,
  handleClose,
  addFeedItem,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const rteRef = useRef<RichTextEditorRef | null>(null);
  const [formState, setFormState] = useState({
    selectedCategory: "",
    postDescription: "",
  });
  const [errors, setErrors] = useState({
    selectedCategory: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<
    IndividualInformation | CompanyInformation
  >(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const fetchedUserData = await fetchUserByUid(user.uid);
        const mappedUserData = mapUserData(fetchedUserData);
        setUserData(mappedUserData);
      }
    };

    fetchUserData();
  }, [user]);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };
  const classes = useStyles();

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormState((prevState) => ({
      ...prevState,
      selectedCategory: event.target.value,
    }));
  };

  const handleFormSubmit = async () => {
    const newErrors = {
      selectedCategory: !formState.selectedCategory,
    };
    setErrors(newErrors);

    if (!newErrors.selectedCategory) {
      setLoading(true);
      try {
        const userId = user!.uid;
        let imageUrl = "";
        if (selectedFile) {
          imageUrl = await uploadFile(selectedFile, userId);
        }

        const newFeedItem = {
          category: formState.selectedCategory,
          body: formState.postDescription,
          userId,
          createdAt: new Date(),
          image: imageUrl,
          createdBy: user?.displayName,
          profileUrl: userData?.profileUrl,
          userType: userData?.userType,
          applyToEmail: userData?.email,
        };

        await addFeedItem(newFeedItem as FeedItemDto);
        handleClose();
      } catch (error) {
        console.error("Error creating feed item: ", error);
      } finally {
        setLoading(false);
        setFormState({
          selectedCategory: "",
          postDescription: "",
        });
      }
    }
  };

  return (
    <Modal open={modalOpen} onClose={handleClose}>
      <Paper
        className={classes.modalStyle}
        sx={{
          // TODO: Revert Styles
          // borderRadius: 6,
          borderRadius: 0,
        }}
      >
        <Grid container sx={{ gap: 2 }}>
          <Grid container sx={{ alignItems: "center", gap: 1 }}>
            <DescriptionOutlined color="primary" />
            <Typography variant="h5">{labels.createPostTitle}</Typography>
          </Grid>
          <Typography variant="body1">
            {labels.createPostDescription}
          </Typography>
          <FormControl fullWidth error={errors.selectedCategory}>
            <InputLabel id="demo-simple-select-label">
              {labels.categoryLabel}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="selectedCategory"
              value={formState.selectedCategory}
              label={labels.categoryLabel}
              onChange={handleSelectChange}
            >
              {Object.values(FeedItemCategory)
                .filter((category) => {
                  if (userData?.userType === UserType.Individual) {
                    return category !== FeedItemCategory.JobOffering;
                  }
                  if (userData?.userType === UserType.Company) {
                    return category !== FeedItemCategory.LookingForJob;
                  }
                  return true;
                })
                .map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              width: "100%",
              "& .ProseMirror": {
                minHeight: "150px",
              },
              "& .MuiTiptap-RichTextContent-root": {
                height: 150,
                overflow: "auto",
              },
            }}
          >
            <RichTextEditor
              onUpdate={({ editor }) => {
                setFormState({
                  ...formState,
                  postDescription: editor.getHTML(),
                });
              }}
              ref={rteRef}
              extensions={[StarterKit]}
              content={formState.postDescription}
              renderControls={() => (
                <MenuControlsContainer>
                  <MenuSelectHeading />
                  <MenuDivider />
                  <MenuButtonBold />
                  <MenuButtonItalic />
                  <MenuButtonBlockquote />
                  <MenuButtonBulletedList />
                  <MenuButtonRemoveFormatting />
                  <MenuButtonStrikethrough />
                  <MenuButtonUndo />
                </MenuControlsContainer>
              )}
              className={classes.textEditor}
            />
          </Box>
          <UploadFile
            disabled={false}
            onFileSelect={handleFileSelect}
            isEditing={true}
            isOwner={true}
            allowedFileTypes={{
              "image/png": [".png"],
              "image/jpeg": [".jpg", ".jpeg"],
            }}
          />
          <Typography variant="body2">{labels.supportedFormats}</Typography>
          <Grid
            container
            sx={{ width: "100%", justifyContent: "flex-end", gap: 1 }}
          >
            <Button variant="outlined" onClick={handleClose}>
              {labels.cancel}
            </Button>
            <Button
              variant="contained"
              onClick={handleFormSubmit}
              disabled={loading}
            >
              {labels.createPostButton}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};
