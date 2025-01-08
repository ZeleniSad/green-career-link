"use client";
import { Grid } from "@mui/system";
import Image from "next/image";
import { FC } from "react";
import { FeedItemBodyProps } from "@/types/props";
import DOMPurify from "isomorphic-dompurify";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const FeedItemBody: FC<FeedItemBodyProps> = ({ body, image }) => {
  const sanitizedBody = DOMPurify.sanitize(body);
  const theme = useTheme();
  return (
    <Grid container sx={{ justifyContent: "space-between", pt: 2 }}>
      <Grid size={image ? 6 : 12}>
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
        <Grid sx={{ display: "flex", justifyContent: "flex-end" }} size={6}>
          <Image
            src={image}
            alt="Post Image"
            width={500}
            height={0}
            layout="intrinsic"
            style={{ borderRadius: 10 }}
          />
        </Grid>
      )}
    </Grid>
  );
};
