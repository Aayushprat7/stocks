import {
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Chip
} from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const chartData = [
  { time: "9AM", value: 100 },
  { time: "10AM", value: 120 },
  { time: "11AM", value: 90 },
  { time: "12PM", value: 140 },
  { time: "1PM", value: 170 },
  { time: "2PM", value: 150 },
];

const WatchItem = ({ symbol, name, price, trend }) => {
  const isUp = trend >= 0;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1.5
      }}
    >
      <Box>
        <Typography fontWeight="bold">{symbol}</Typography>
        <Typography variant="caption" color="gray">
          {name}
        </Typography>
      </Box>

      <Box textAlign="right">
        <Typography fontWeight="bold">${price}</Typography>
        <Chip
          size="small"
          icon={isUp ? <TrendingUpIcon /> : <TrendingDownIcon />}
          label={`${trend}%`}
          sx={{
            bgcolor: isUp ? "rgba(0,255,150,0.15)" : "rgba(255,0,0,0.15)",
            color: isUp ? "#00e676" : "#ff5252"
          }}
        />
      </Box>
    </Box>
  );
};

export default function Market() {
  return (
    <Box sx={{ maxWidth: 1100, mx: "auto" }}>

      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        Markets
      </Typography>

      <Grid container spacing={3}>

        {/* Chart Section */}
        <Grid item xs={12} md={8}>
          <motion.div whileHover={{ scale: 1.01 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                color: "#fff",
                background: "linear-gradient(135deg, #0f2027, #2c5364)"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Market Trend
              </Typography>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <XAxis dataKey="time" stroke="#ccc" />
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

        {/* Watchlist */}
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                background: "linear-gradient(135deg, #1d2671, #c33764)",
                color: "#fff"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Watchlist
              </Typography>

              <WatchItem symbol="BTC" name="Bitcoin" price="52300" trend={2.4} />
              <Divider sx={{ my: 1, bgcolor: "rgba(255,255,255,0.2)" }} />
              <WatchItem symbol="ETH" name="Ethereum" price="2940" trend={-1.2} />
              <Divider sx={{ my: 1, bgcolor: "rgba(255,255,255,0.2)" }} />
              <WatchItem symbol="AAPL" name="Apple Inc." price="180.20" trend={0.5} />
            </Paper>
          </motion.div>
        </Grid>

        {/* Heatmap / Insights */}
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
                Global Market Snapshot
              </Typography>

              <Grid container spacing={2}>
                {[
                  { name: "NASDAQ", change: "+1.2%" },
                  { name: "SENSEX", change: "-0.5%" },
                  { name: "NIFTY 50", change: "+0.8%" },
                  { name: "CRYPTO", change: "+3.1%" }
                ].map((item, i) => (
                  <Grid item xs={6} md={3} key={i}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        borderRadius: 3,
                        background:
                          item.change.includes("+")
                            ? "rgba(0,255,150,0.15)"
                            : "rgba(255,0,0,0.15)",
                        color:
                          item.change.includes("+")
                            ? "#00e676"
                            : "#ff5252"
                      }}
                    >
                      <Typography>{item.name}</Typography>
                      <Typography fontWeight="bold">
                        {item.change}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

      </Grid>
    </Box>
  );
}