"use client";
import { Grid } from "@mui/system";
import { DashboardAppBarFilters } from "@/components/feed/feed-app-bar/dashboard-app-bar-filters";
import { CreatePostButton } from "@/components/feed/feed-app-bar/create-post-button";
import { Welcome } from "@/components/feed/feed-app-bar/welcome";
import { FeedAppBarUser } from "@/components/feed/feed-app-bar/feed-app-bar-user";
import { CreatePostModal } from "@/components/modals/create-post-modal";
import { useModal } from "@/hooks/useModal";
import { FeedItemDto } from "@/types/dto";

export const DashboardAppBar = ({
  feedItems,
  setFeedItems,
}: {
  feedItems: FeedItemDto[];
  setFeedItems: (
    value: ((prevState: FeedItemDto[]) => FeedItemDto[]) | FeedItemDto[],
  ) => void;
}) => {
  const { modalOpen, handleOpen, handleClose } = useModal();

  return (
    <>
      <Grid
        container
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid container sx={{ gap: 3 }}>
          <Welcome />
          <Grid container sx={{ alignItems: "center", gap: 1 }}>
            <DashboardAppBarFilters />
            <CreatePostButton onClick={handleOpen} />
          </Grid>
        </Grid>
        <FeedAppBarUser />
      </Grid>
      <CreatePostModal
        modalOpen={modalOpen}
        handleClose={handleClose}
        feedItems={feedItems}
        setFeedItems={setFeedItems}
      />
    </>
  );
};
