"use client";
import { Grid } from "@mui/system";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  AccountBoxOutlined,
  AdminPanelSettingsOutlined,
  ChevronLeft,
  ChevronRight,
  DynamicFeedOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const SidebarButton = ({
  isOpen,
  title,
  icon,
  label,
  url,
}: {
  isOpen: boolean;
  title: string;
  icon: React.ReactNode;
  label: string;
  url: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === `/dashboard/${url}`;
  const buttonActive: "contained" | "text" = isActive ? "contained" : "text";
  return (
    <Tooltip title={!isOpen && title} placement="right" arrow>
      <Button
        variant={buttonActive}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "flex-start" : "center",
          gap: 1,
          padding: 1,
        }}
        fullWidth
        aria-label={title}
        onClick={() => router.push(url)}
      >
        {icon}
        {isOpen && <Typography variant="body2">{label}</Typography>}
      </Button>
    </Tooltip>
  );
};

export const SIDEBAR_WIDTH = 321;

export const Sidebar = ({
  open,
  setOpen,
  sidebarRef,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  sidebarRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      hidden={isMobile && !open}
      onClose={() => setOpen(false)}
    >
      <Grid
        container
        sx={{
          pt: 3,
          pb: 3,
          pl: 3,
          pr: 3,
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
        ref={sidebarRef}
      >
        <Grid container sx={{ flexDirection: "column", gap: 3 }}>
          <Grid container>
            {open && (
              <Image
                src="/images/eu-logo.png"
                alt="Green"
                width={250}
                height={0}
                layout="intrinsic"
              />
            )}
          </Grid>
          <Grid
            container
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              gap: 1,
            }}
          >
            <SidebarButton
              isOpen={open}
              title="Feed"
              icon={<DynamicFeedOutlined />}
              label="Feed"
              url="/dashboard/feed"
            />
            <SidebarButton
              isOpen={open}
              title="Profile"
              icon={<AccountBoxOutlined />}
              label="Profile"
              url="/dashboard/profile"
            />
            <SidebarButton
              isOpen={open}
              title="Educations"
              icon={<SchoolOutlined />}
              label="Educations"
              url="/dashboard/educations"
            />
            <SidebarButton
              isOpen={open}
              title="Admin Dashboard"
              icon={<AdminPanelSettingsOutlined />}
              label="Admin Dashboard"
              url="/dashboard/admin"
            />
          </Grid>
        </Grid>
        <Grid container sx={{ flexDirection: "column", gap: 3 }}>
          {open && (
            <Grid container sx={{ flexDirection: "column", gap: 5 }}>
              <Link underline="none" sx={{ cursor: "pointer" }}>
                <Typography variant="body2">Support</Typography>
              </Link>
              <Box>
                <Typography variant="body2">Version 1.0 Beta</Typography>
                <Typography variant="body2">
                  All copyrights reserved.
                </Typography>
              </Box>
              <Typography variant="h6" color="primary" fontWeight={900}>
                YES DO IT
              </Typography>
            </Grid>
          )}
          {open && <Divider />}

          {open ? (
            <Button
              variant="text"
              onClick={() => setOpen(false)}
              fullWidth
              aria-label="Close"
            >
              <ChevronLeft />
              <Typography variant="body1">Close</Typography>
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() => setOpen(true)}
              fullWidth
              aria-label="Open"
              sx={{ mb: !open ? 11 : 0 }}
            >
              <ChevronRight />
            </Button>
          )}
          {open && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Image
                src="/images/evropski_omladinski_centar_vojvodine.png"
                alt="Green"
                width={69}
                height={0}
                layout="intrinsic"
              />
              <Image
                src="/images/ekolosko_udruzenje_zeleni_sad.png"
                alt="Green"
                width={69}
                height={0}
                layout="intrinsic"
              />
              <Image
                src="/images/centar_za_mlade_dali.png"
                alt="Green"
                width={69}
                height={0}
                layout="intrinsic"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Drawer>
  );
};
