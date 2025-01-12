import { Box, useTheme } from "@mui/material";
import DOMPurify from "dompurify";
import { FC } from "react";
import { Grid } from "@mui/system";
import Image from "next/image";

interface FeedItemBodyProps {
  body: string;
  image?: string;
}

export const FeedItemBody: FC<FeedItemBodyProps> = ({ body, image }) => {
  const sanitizedBody = DOMPurify.sanitize(body);
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{ pt: 2, height: "100%", width: "100%" }}>
      <Grid
        size={{
          xs: 6,
          md: image ? 6 : 12,
        }}
      >
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
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Image
            src={image}
            alt="Feed item image"
            layout="intrinsic"
            width={500}
            height={0}
            style={{
              borderRadius: 12,
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};
