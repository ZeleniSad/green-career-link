import { Grid } from "@mui/system";
import styles from "./admin.module.css";
import { AdminTabs } from "@/components/admin/admin-tabs";
import AdminRoute from "@/components/routes/admin-route";
import { ProfileHeader } from "@/components/profile/profile-header";

const AdminPage = () => {
  return (
    <AdminRoute>
      <Grid container className={styles.wrapper}>
        <Grid container sx={{ width: "100%", gap: 3 }}>
          <ProfileHeader />
          <AdminTabs />
        </Grid>
      </Grid>
    </AdminRoute>
  );
};

export default AdminPage;
