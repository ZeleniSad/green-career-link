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
import { useEffect, useRef, useState } from "react";
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
import { doc, UpdateData, updateDoc } from "firebase/firestore";
import { uploadFile } from "@/services/fileServices";

const labels = {
  createPostTitle: "Create a post",
  categoryLabel: "Choose category",
  postDescription: "Post Description",
  attachFiles: "Attach Files",
  supportedFormats:
    "If you want, you can add an image to make your post more visually appealing. Supported formats: PNG, JPG, JPEG",
  cancel: "Cancel",
  createPostButton: "Edit post",
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
  },
});

export const EditFeedItemModal = ({
  feedItem,
  modalOpen,
  handleClose,
}: {
  feedItem: FeedItemDto;
  modalOpen: boolean;
  handleClose: () => void;
}) => {
  const [feedItemData, setFeedItemData] = useState<FeedItemDto>(feedItem);
  const [loading, setLoading] = useState(false);
  const rteRef = useRef<RichTextEditorRef | null>(null);
  const [errors, setErrors] = useState({
    selectedCategory: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setFeedItemData(feedItem);
  }, [feedItem]);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };
  const classes = useStyles();

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFeedItemData((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  const handleFormSubmit = async () => {
    const newErrors = {
      selectedCategory: !feedItemData?.category,
    };
    setErrors(newErrors);

    if (!newErrors.selectedCategory) {
      setLoading(true);
      let imageUrl = "";
      if (selectedFile) {
        imageUrl = await uploadFile(selectedFile, feedItemData?.userId ?? "");
        if (imageUrl) {
          feedItemData.image = imageUrl;
        }
      }

      const feedItemDoc = doc(db, "feedItems", feedItem.id);
      try {
        await updateDoc(feedItemDoc, feedItemData as UpdateData<FeedItemDto>);
      } catch (error) {
        console.error("Error creating feed item: ", error);
      }

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
      <Paper
        className={classes.modalStyle}
        sx={{
          borderRadius: 6,
        }}>
        <Grid container sx={{ gap: 3 }}>
          <Grid container sx={{ alignItems: "center", gap: 2 }}>
            <DescriptionOutlined color='primary' />
            <Typography variant='h5'>{labels.createPostTitle}</Typography>
          </Grid>
          <FormControl fullWidth error={errors.selectedCategory}>
            <InputLabel id='demo-simple-select-label'>{labels.categoryLabel}</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='selectedCategory'
              value={feedItemData?.category}
              label={labels.categoryLabel}
              onChange={handleSelectChange}>
              {categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.label}>
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
                setFeedItemData({
                  ...feedItemData,
                  body: editor.getHTML(),
                });
              }}
              ref={rteRef}
              extensions={[StarterKit]}
              content={feedItemData?.body}
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
            alreadyAddedFileUrl={feedItemData?.image}
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
