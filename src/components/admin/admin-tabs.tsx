"use client";
import { Tab, Tabs } from "@mui/material";
import { Grid } from "@mui/system";
import { FC, ReactNode, SyntheticEvent, useState } from "react";
import { UsersTable } from "@/components/admin/users-table";
import { PostsTable } from "@/components/admin/posts-table";
import { EducationsTable } from "@/components/admin/educations-table";
import { QAsTable } from "./qas-table";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Grid container sx={{ p: 2 }}>
          {children}
        </Grid>
      )}
    </div>
  );
};

export const AdminTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid size={12}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label='Users' />
        <Tab label='Posts' />
        <Tab label='Education' />
      </Tabs>
      <TabPanel index={0} value={value}>
        <UsersTable />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <PostsTable />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <EducationsTable />
        <QAsTable />
      </TabPanel>
    </Grid>
  );
};
