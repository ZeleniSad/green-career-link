import {
  Box,
  FormControl,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Grid } from "@mui/system";

interface TagFilterProps {
  label: string;
  options: {
    categoryId: number;
    label: string;
    endIcon?: React.ReactNode;
  }[];
}

export const TagFilter = ({ label, options }: TagFilterProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <Grid>
      <FormControl sx={{ alignItems: "center" }}>
        <InputLabel id="tag-filter-label" size="small">
          {label}
        </InputLabel>
        <Select
          labelId="tag-filter-label"
          id="tag-filter"
          value={selectedValue}
          label={label}
          onChange={handleChange}
          sx={{
            minWidth: 150,
            backgroundColor: "white",
            borderRadius: 6,
          }}
          size="small"
          variant="outlined"
        >
          {options.map((option) => (
            <MenuItem key={option.categoryId} value={option.categoryId}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1">{option.label}</Typography>
                <ListItemIcon sx={{ minWidth: 0 }}>
                  {option.endIcon}
                </ListItemIcon>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
