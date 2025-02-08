"use client";
import { Grid } from "@mui/system";
import { Avatar, Button, IconButton, Link, Typography } from "@mui/material";
import { LocalOfferOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import { FeedItemHeaderProps } from "@/types/props";
import { useRouter } from "next/navigation";
import { formatDistanceToNow, isToday } from "date-fns";
import { FeedItemCategory } from "@/types/interfaces";
import { UserType } from "@/types/enums";

export const FeedItemHeader: FC<FeedItemHeaderProps> = ({
  type,
  createdBy,
  category,
  email,
  createdAt,
  profileUrl,
  userId,
}) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Grid
      container
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Grid container gap={2} sx={{ alignItems: "center" }}>
        <Grid>
          <IconButton
            onClick={() => router.push(`/dashboard/profile/${userId}`)}
          >
            <Avatar
              src={profileUrl}
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 64,
                height: 64,
              }}
            >
              {createdBy
                .split(" ")
                .map((name) => name[0])
                .join("")
                .substring(0, 2)}
            </Avatar>
          </IconButton>
        </Grid>
        <Grid>
          <Link
            underline="none"
            onClick={() => router.push(`/dashboard/profile/${userId}`)}
            sx={{
              cursor: "pointer",
            }}
          >
            <Typography variant="body1">{createdBy}</Typography>
          </Link>

          <Typography variant="body2">
            {isToday(new Date(createdAt))
              ? "Today"
              : formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ alignItems: "center", gap: 2 }}>
        <Grid sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalOfferOutlined fontSize="small" />
          <Typography variant="body2">{category}</Typography>
        </Grid>
        {type === UserType.Company &&
          category === FeedItemCategory.JobOffering && (
            <Button variant="contained" size="small" href={"mailto:" + email}>
              Apply
            </Button>
          )}
      </Grid>
    </Grid>
  );
};
