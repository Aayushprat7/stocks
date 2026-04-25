import {
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Mon", value: 10000 },
  { name: "Tue", value: 12000 },
  { name: "Wed", value: 11000 },
  { name: "Thu", value: 14000 },
  { name: "Fri", value: 17000 },
  { name: "Sat", value: 16000 },
];

export default function Portfolio() {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>

      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4, display: "flex", alignItems: "center", gap: 1 }}
      >
        <AccountBalanceWalletIcon /> Portfolio
      </Typography>

      <Grid container spacing={3}>

        {/* Total Balance Card */}
        <Grid item xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                color: "#fff",
                background: "linear-gradient(135deg, #0f2027, #2c5364)"
              }}
            >
              <Typography variant="subtitle2">Total Balance</Typography>
              <Typography variant="h4" fontWeight="bold">
                $42,850
              </Typography>
              <Typography sx={{ color: "#00e676", mt: 1 }}>
                +12.5% this week
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Assets Count */}
        <Grid item xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                color: "#fff",
                background: "linear-gradient(135deg, #1d2671, #c33764)"
              }}
            >
              <Typography variant="subtitle2">Assets</Typography>
              <Typography variant="h4" fontWeight="bold">
                24 Holdings
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Stocks + Crypto diversified
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Chart */}
        <Grid item xs={12}>
          <motion.div whileHover={{ scale: 1.01 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                <TrendingUpIcon /> Portfolio Growth
              </Typography>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="#ccc" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#00e676"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Grid>

        {/* Breakdown */}
        <Grid item xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                background: "linear-gradient(135deg, #134e5e, #71b280)",
                color: "#fff"
              }}
            >
              <Typography variant="h6">Stocks</Typography>
              <Typography variant="h5">$12,400</Typography>
              <Typography>Tech, Pharma, Banking</Typography>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                background: "linear-gradient(135deg, #42275a, #734b6d)",
                color: "#fff"
              }}
            >
              <Typography variant="h6">Crypto</Typography>
              <Typography variant="h5">$30,450</Typography>
              <Typography>BTC, ETH, Altcoins</Typography>
            </Paper>
          </motion.div>
        </Grid>

      </Grid>
    </Box>
  );
}