import { Grid } from "@mui/system";
import styles from "./admin.module.css";
import { Welcome } from "@/components/feed/feed-app-bar/welcome";
import { AdminTabs } from "@/components/admin/admin-tabs";
import AdminRoute from "@/components/routes/admin-route";

const AdminPage = () => {
  return (
    <AdminRoute>
      <Grid container className={styles.wrapper}>
        <Grid container sx={{ width: "100%", gap: 3 }}>
          <Welcome />
          <AdminTabs />
        </Grid>
      </Grid>
    </AdminRoute>
  );
};

export default AdminPage;
