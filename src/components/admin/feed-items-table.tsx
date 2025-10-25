import React, { FC, useEffect, useState } from "react";
import { FeedItemDto } from "@/types/dto";
import {
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { deleteFeedItem, getFeedItemsPaginated } from "@/services/feedItemsService";
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
      <TableCell sx={{ p: 1 }}>{feedItem.createdBy}</TableCell>
      <TableCell sx={{ p: 1 }}>{feedItem.userId}</TableCell>
      <TableCell sx={{ p: 1 }}>{feedItem.category}</TableCell>
      <TableCell sx={{ p: 1 }}>
        {feedItem.createdAt instanceof Date
          ? feedItem.createdAt.toLocaleDateString()
          : feedItem.createdAt}
      </TableCell>
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
  const [tableLoading, setTableLoading] = useState(false);
  const [feedItems, setFeedItems] = useState<FeedItemDto[]>([]);
  const [selectedFeedItem, setSelectedFeedItem] = useState<FeedItemDto | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchFeedItems = async () => {
    try {
      setTableLoading(true);
      const result = await getFeedItemsPaginated(page, rowsPerPage);
      setFeedItems(result.feedItems);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Error fetching feed items: ", error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleEdit = (feedItem: FeedItemDto) => {
    setSelectedFeedItem(feedItem);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    try {
      setTableLoading(true);
      await deleteFeedItem(id, fileUrl);
      // Refresh the current page
      await fetchFeedItems();
    } catch (error) {
      console.error("Error deleting feed item: ", error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleSave = async () => {
    // Refresh the feed items list after saving
    await fetchFeedItems();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Box sx={{ height: 4 }}>
          {tableLoading && <LinearProgress />}
        </Box>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                Post ID
              </TableCell>
              <TableCell
                sx={{ p: 1, color: "primary.contrastText", fontWeight: "bold" }}
              >
                Posted By
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
                onDelete={() => handleDelete(feedItem.id, feedItem.image)}
              />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
