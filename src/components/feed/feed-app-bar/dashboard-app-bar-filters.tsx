"use client";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";
import { FeedItemCategory } from "@/types/interfaces";
import { FilterState } from "@/hooks/use-feed-state";

interface DashboardAppBarFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const DashboardAppBarFilters: FC<DashboardAppBarFiltersProps> = ({
  filters,
  setFilters,
}) => {
  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const newCategory =
      event.target.value === ""
        ? null
        : (event.target.value as FeedItemCategory);
    setFilters((prev) => ({
      ...prev,
      category: newCategory,
    }));
  };

  const handleSortToggle = () => {
    setFilters((prev) => ({
      ...prev,
      sortDirection: prev.sortDirection === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        onClick={handleSortToggle}
        aria-label={`Sort in ${filters?.sortDirection === "asc" ? "descending" : "ascending"} order`}
        startIcon={
          filters?.sortDirection === "asc" ? (
            <ArrowUpwardOutlined />
          ) : (
            <ArrowDownwardOutlined />
          )
        }
        variant="contained"
        size="medium"
        sx={{ minWidth: 160, minHeight: 50 }}
      >
        {filters?.sortDirection === "asc" ? "Ascending" : "Descending"}
      </Button>

      <FormControl
        variant="outlined"
        size="medium"
        sx={{ minWidth: 160, minHeight: 50, borderRadius: 80 }}
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={filters?.category ?? ""}
          onChange={handleCategoryChange}
          label="Category"
          sx={{
            borderRadius: 80,
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: 80,
            },
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {Object.values(FeedItemCategory).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
