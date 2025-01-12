import { Box, Grid, useTheme } from "@mui/material";
import Image from "next/image";
import DOMPurify from "dompurify";
import { FC } from "react";

interface FeedItemBodyProps {
  body: string;
  image?: string;
}

export const FeedItemBody: FC<FeedItemBodyProps> = ({ body, image }) => {
  const sanitizedBody = DOMPurify.sanitize(body);
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{ paddingTop: 2 }}>
      <Grid item xs={12} md={image ? 6 : 12}>
        {body && (
          <Box
            sx={{
              fontFamily: theme.typography.fontFamily,
            }}
            dangerouslySetInnerHTML={{ __html: sanitizedBody }}
          />
        )}
      </Grid>
      {image && (
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingBottom: "56.25%", // 16:9 aspect ratio
              borderRadius: 2,
              overflow: "hidden",
            }}>
            <Image src={image} alt='Post Image' layout='fill' objectFit='cover' />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
