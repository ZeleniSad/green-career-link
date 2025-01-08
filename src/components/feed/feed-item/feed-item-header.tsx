"use client";
import { Grid } from "@mui/system";
import { Avatar, Button, Typography } from "@mui/material";
import { LocalOfferOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import { formatDistanceToNow, isToday } from "date-fns";
import { FeedItemHeaderProps } from "@/types/props";
import { UserType } from "@/types/enums";

export const FeedItemHeader: FC<FeedItemHeaderProps> = ({
  type,
  user,
  category,
  email,
  date,
}) => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Grid container gap={2}>
        <Grid>
          <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
            {user
              .split(" ")
              .map((name) => name[0])
              .join("")
              .substring(0, 2)}
          </Avatar>
        </Grid>
        <Grid>
          <Typography variant="body1">{user}</Typography>
          <Typography variant="body2">
            {isToday(new Date(date))
              ? "Today"
              : formatDistanceToNow(new Date(date), { addSuffix: true })}
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ alignItems: "center", gap: 2 }}>
        <Grid sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalOfferOutlined fontSize="small" />
          <Typography variant="body2">{category}</Typography>
        </Grid>
        {type === UserType.Company && (
          <Button variant="contained" size="small" href={"mailto:" + email}>
            Apply
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
