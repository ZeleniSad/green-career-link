import { Grid } from "@mui/system";
import { Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FeedItemHeader } from "@/components/feed/feed-item/feed-item-header";
import { FeedItemBody } from "@/components/feed/feed-item/feed-item-body";
import { FC } from "react";
import { FeedItemProps } from "@/types/props";

export const FeedItem: FC<FeedItemProps> = ({ item }) => {
  return (
    <Grid
      container
      sx={{
        border: `1px solid ${grey[300]}`,
        p: 2,
        borderRadius: 5,
      }}>
      <FeedItemHeader
        user={item.createdBy}
        date={item.createdAt}
        email={item.applyToEmail}
        category={item.category}
        type={item.userType}
      />
      <Divider sx={{ width: "100%", pt: 2 }} />
      <FeedItemBody body={item.body} image={item.image} />
    </Grid>
  );
};
