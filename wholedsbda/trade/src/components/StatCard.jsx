import { Paper, Typography, Box } from "@mui/material";

export default function StatCard({ title, value, color }) {
  return (
    <Paper sx={{ p: 2, borderLeft: `4px solid ${color}` }}>
      <Typography variant="caption" color="gray">{title}</Typography>
      <Typography variant="h5" fontWeight="bold">{value}</Typography>
    </Paper>
  );
}