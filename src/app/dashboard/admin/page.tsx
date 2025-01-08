import { Grid } from "@mui/system";
import styles from "./admin.module.css";
import { Welcome } from "@/components/feed/feed-app-bar/welcome";
import { AdminTabs } from "@/components/admin/admin-tabs";

const AdminPage = () => {
  return (
    <Grid container className={styles.wrapper}>
      <Welcome />
      <AdminTabs />
    </Grid>
  );
};

export default AdminPage;
