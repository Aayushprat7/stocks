import {
  Typography,
  Box,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Slider,
  Select,
  MenuItem
} from "@mui/material";
import { motion } from "framer-motion";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export default function Settings() {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4, display: "flex", alignItems: "center", gap: 1 }}
      >
        <SettingsIcon /> Settings
      </Typography>

      <Grid container spacing={3}>

        {/* General Settings */}
        <Grid item xs={12}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
                color: "#fff"
              }}
            >
              <Typography variant="h6" gutterBottom>
                <NotificationsIcon /> General
              </Typography>

              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email Notifications"
              />

              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Push Notifications"
              />

              <FormControlLabel
                control={<Switch />}
                label="Dark Mode"
              />
            </Paper>
          </motion.div>
        </Grid>

        {/* Trading AI Settings */}
        <Grid item xs={12}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #16222a, #3a6073)",
                color: "#fff"
              }}
            >
              <Typography variant="h6" gutterBottom>
                <ShowChartIcon /> Trading AI
              </Typography>

              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Auto-Trade Execution"
              />

              <FormControlLabel
                control={<Switch />}
                label="High Risk Mode"
              />

              <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

              <Typography gutterBottom>Risk Level</Typography>
              <Slider defaultValue={50} />

              <Typography gutterBottom sx={{ mt: 2 }}>
                Prediction Interval
              </Typography>
              <Select defaultValue="1h" size="small">
                <MenuItem value="1m">1 Minute</MenuItem>
                <MenuItem value="5m">5 Minutes</MenuItem>
                <MenuItem value="15m">15 Minutes</MenuItem>
                <MenuItem value="1h">1 Hour</MenuItem>
                <MenuItem value="1d">1 Day</MenuItem>
              </Select>
            </Paper>
          </motion.div>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #42275a, #734b6d)",
                color: "#fff"
              }}
            >
              <Typography variant="h6">Security</Typography>

              <FormControlLabel
                control={<Switch defaultChecked />}
                label="2FA Authentication"
              />

              <FormControlLabel
                control={<Switch />}
                label="Biometric Login"
              />

              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Login Alerts"
              />
            </Paper>
          </motion.div>
        </Grid>

      </Grid>
    </Box>
  );
}