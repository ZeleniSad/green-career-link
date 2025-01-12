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
import { useRef, useState } from "react";
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
import { db } from "@/config/firebaseConfig";
import { FeedItemDto } from "@/types/dto";
import { addDoc, collection } from "firebase/firestore";
import { uploadFile } from "@/services/fileServices";
import { useAuth } from "../../context/authContext";

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

const categories = [
  { categoryId: 1, label: "Job offering" },
  { categoryId: 2, label: "Looking for job" },
  { categoryId: 3, label: "Other" },
];

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
    padding: 24,
    borderRadius: 48,
  },
});

export const CreatePostModal = ({ modalOpen, handleClose }: { modalOpen: boolean; handleClose: () => void }) => {
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
      const userId = user!.uid;
      let imageUrl = "";
      if (selectedFile) {
        imageUrl = await uploadFile(selectedFile, userId);
      }

      const category = categories.find((c) => Number(formState.selectedCategory) == c.categoryId)!.label;
      const body = formState.postDescription;

      const feedItem = {
        category,
        body,
        userId,
        createdAt: new Date(),
        image: imageUrl,
      } as FeedItemDto;

      const feedItemsCollection = collection(db, "feedItems");
      await addDoc(feedItemsCollection, feedItem);

      handleClose();
      setLoading(false);
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Paper className={classes.modalStyle}>
        <Grid container sx={{ gap: 3 }}>
          <Grid container sx={{ alignItems: "center", gap: 2 }}>
            <DescriptionOutlined color='primary' />
            <Typography variant='h5'>{labels.createPostTitle}</Typography>
          </Grid>
          <Typography variant='body1'>{labels.createPostDescription}</Typography>
          <FormControl fullWidth error={errors.selectedCategory}>
            <InputLabel id='demo-simple-select-label'>{labels.categoryLabel}</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='selectedCategory'
              value={formState.selectedCategory}
              label={labels.categoryLabel}
              onChange={handleSelectChange}>
              {categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              width: "100%",
              minHeight: 200,
              "& .ProseMirror": {
                minHeight: "150px",
              },
            }}>
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
            allowedFileTypes={{
              "image/png": [".png"],
              "image/jpeg": [".jpg", ".jpeg"],
            }}
          />
          <Typography variant='body2'>{labels.supportedFormats}</Typography>
          <Grid container sx={{ width: "100%", justifyContent: "flex-end", gap: 2 }}>
            <Button variant='outlined' onClick={handleClose}>
              {labels.cancel}
            </Button>
            <Button variant='contained' onClick={handleFormSubmit} disabled={loading}>
              {labels.createPostButton}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};
