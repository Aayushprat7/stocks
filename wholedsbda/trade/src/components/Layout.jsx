import { Box, Drawer, AppBar, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Dashboard, ShowChart, AccountBalanceWallet, Settings as SettingsIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Layout({ children }) {
  const navigate = useNavigate();
  const menu = [
    { text: "Dashboard", icon: <Dashboard />, path: "/" },
    { text: "Market", icon: <ShowChart />, path: "/market" },
    { text: "Portfolio", icon: <AccountBalanceWallet />, path: "/portfolio" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1300, bgcolor: "#151921", borderBottom: "1px solid #2d3748" }} elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#6366f1" }}>
            NEXUS TRADE
          </Typography>
          {/* THE AVATAR (MAN) HAS BEEN REMOVED FROM HERE */}
        </Toolbar>
      </AppBar>
      
      <Drawer 
        variant="permanent" 
        sx={{ 
          width: drawerWidth, 
          "& .MuiDrawer-paper": { 
            width: drawerWidth, 
            bgcolor: "#0b0e14", 
            borderRight: "1px solid #2d3748" 
          } 
        }}
      >
        <Toolbar />
        <List sx={{ mt: 2 }}>
          {menu.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon sx={{ color: "#6366f1" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#0b0e14", minHeight: "100vh" }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}