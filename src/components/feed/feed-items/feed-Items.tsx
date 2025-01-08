import { Grid } from "@mui/system";
import { Paper } from "@mui/material";
import { FeedItem } from "@/components/feed/feed-item/feed-item";
import { feedItemsMocked } from "@/components/feed/feed-items/feed-items-mocked";
import { FC } from "react";

export type SortOrder = "ascending" | "descending";
interface FeedItemsProps {
  sortOrder: SortOrder;
}

export const FeedItems: FC<FeedItemsProps> = ({ sortOrder }) => {
  const sortedFeedItems = [...feedItemsMocked].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "ascending"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  return (
    <Grid container>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          p: 3,
          borderRadius: 5,
        }}
      >
        {sortedFeedItems.map((feedItem, index) => (
          <FeedItem key={index} item={feedItem} />
        ))}
      </Paper>
    </Grid>
  );
};
