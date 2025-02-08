"use client";
import { Grid } from "@mui/system";
import { DashboardAppBarFilters } from "@/components/feed/feed-app-bar/dashboard-app-bar-filters";
import { Welcome } from "@/components/feed/feed-app-bar/welcome";
import { FeedAppBarUser } from "@/components/feed/feed-app-bar/feed-app-bar-user";
import { CreatePostModal } from "@/components/modals/create-post-modal";
import { useModal } from "@/hooks/useModal";
import { CreatePostButton } from "@/components/feed/feed-app-bar/create-post-button";
import { FeedItemDto } from "@/types/dto";
import { FilterState } from "@/hooks/use-feed-state";
import { Dispatch, SetStateAction } from "react";

interface DashboardAppBarProps {
  filters: FilterState;
  addFeedItem: (newItem: FeedItemDto) => Promise<FeedItemDto>;
  setFilters: Dispatch<SetStateAction<FilterState>>;
}

export const DashboardAppBar = ({
  filters,
  addFeedItem,
  setFilters,
}: DashboardAppBarProps) => {
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
            <DashboardAppBarFilters filters={filters} setFilters={setFilters} />
          </Grid>
        </Grid>
        <Grid container sx={{ alignItems: "center", gap: 3 }}>
          <CreatePostButton onClick={handleOpen} />
          <FeedAppBarUser handleOpen={handleOpen} />
        </Grid>
      </Grid>
      <CreatePostModal
        modalOpen={modalOpen}
        handleClose={handleClose}
        addFeedItem={addFeedItem}
      />
    </>
  );
};
