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
import { FC, SetStateAction, useState } from "react";
import { FeedItemCategory } from "@/types/interfaces";
import { FilterState } from "@/components/feed/feed-items";

export const DashboardAppBarFilters: FC<{
  setFilters: (value: SetStateAction<FilterState>) => void;
}> = ({ setFilters }) => {
  const [category, setCategory] = useState<FeedItemCategory | null>(null);
  const [order, setOrder] = useState("desc");

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const newCategory =
      event.target.value === ""
        ? null
        : (event.target.value as FeedItemCategory);
    setCategory(newCategory);
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: newCategory,
    }));
  };

  const handleSortToggle = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortDirection: newOrder,
    }));
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        onClick={handleSortToggle}
        aria-label={`Sort in ${order === "asc" ? "descending" : "ascending"} order`}
        startIcon={
          order === "asc" ? <ArrowUpwardOutlined /> : <ArrowDownwardOutlined />
        }
        variant="outlined"
        size="medium"
        sx={{ minWidth: 160, minHeight: 50 }}
      >
        {order === "asc" ? "Ascending" : "Descending"}
      </Button>

      <FormControl
        variant="outlined"
        size="medium"
        sx={{ minWidth: 160, minHeight: 50, borderRadius: 0 }}
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category ?? ""}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
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
