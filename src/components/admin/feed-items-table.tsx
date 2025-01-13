import React, { FC, useEffect, useState } from "react";
import { FeedItemDto } from "@/types/dto";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { getAllFeedItems } from "@/services/feedItemsService";
import { EditFeedItemModal } from "@/components/modals/edit-feed-item-modal";

const FeedItemRow: FC<{
  feedItem: FeedItemDto;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ feedItem, onEdit, onDelete }) => {
  return (
    <TableRow
      sx={{
        "&:nth-of-type(odd)": {
          backgroundColor: "action.hover",
        },
        "&:hover": {
          backgroundColor: "action.selected",
        },
      }}
    >
      <TableCell sx={{ p: 1 }}>{feedItem.id}</TableCell>
      <TableCell sx={{ p: 1 }}>{feedItem.userId}</TableCell>
      <TableCell sx={{ p: 1 }}>{feedItem.category}</TableCell>
      <TableCell sx={{ p: 1 }}>{feedItem.createdAt.toDateString()}</TableCell>
      <TableCell sx={{ p: 2, textAlign: "right" }}>
        <IconButton color="primary" size="small" onClick={onEdit}>
          <Edit fontSize="medium" />
        </IconButton>
        <IconButton color="error" size="small" onClick={onDelete}>
          <Delete fontSize="medium" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const FeedItemsTable: FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItemDto[]>([]);
  const [selectedFeedItem, setSelectedFeedItem] = useState<FeedItemDto>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const feedItems = await getAllFeedItems();
        setFeedItems(feedItems);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    getAllUsers();
  }, []);

  const handleEdit = (feedItem: FeedItemDto) => {
    setSelectedFeedItem(feedItem);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "feedItems", id));
      setFeedItems(feedItems.filter((feedItem) => feedItem.id !== id));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const handleSave = async () => {
    const getAllFeedItemsAsync = async () => {
      try {
        const feedItems = await getAllFeedItems();
        setFeedItems(feedItems);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    getAllFeedItemsAsync();
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                User ID
              </TableCell>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                User ID
              </TableCell>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                Category
              </TableCell>

              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                Created at
              </TableCell>

              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedItems.map((feedItem) => (
              <FeedItemRow
                key={feedItem.id}
                feedItem={feedItem}
                onEdit={() => handleEdit(feedItem)}
                onDelete={() => handleDelete(feedItem.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditFeedItemModal
        modalOpen={isEditModalOpen}
        feedItem={selectedFeedItem}
        onSave={handleSave}
        handleClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};
