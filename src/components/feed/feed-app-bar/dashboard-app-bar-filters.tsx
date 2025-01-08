"use client";
import { TagFilter } from "@/components/tag-filter/tag-filter";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from "@mui/icons-material";

export const DashboardAppBarFilters = () => {
  return (
    <>
      <TagFilter
        label="Date"
        options={[
          {
            categoryId: 0,
            label: "Ascending",
            endIcon: <ArrowUpwardOutlined fontSize="small" />,
          },
          {
            categoryId: 1,
            label: "Descending",
            endIcon: <ArrowDownwardOutlined fontSize="small" />,
          },
        ]}
      />
      <TagFilter
        label="Category"
        options={[
          { categoryId: 0, label: "All" },
          { categoryId: 1, label: "Job offering" },
          { categoryId: 2, label: "Looking for job" },
          { categoryId: 3, label: "Other" },
        ]}
      />
    </>
  );
};
