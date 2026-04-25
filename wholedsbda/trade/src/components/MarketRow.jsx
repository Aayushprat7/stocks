import { Box, Typography, Divider, Avatar } from "@mui/material";

export default function MarketRow({ symbol, name, price, trend, image }) {
  // Determine color based on trend
  const trendColor = trend > 0 ? "#10b981" : "#f87171";

  return (
    <Box 
      sx={{ 
        py: 2, 
        transition: "background 0.2s ease",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.02)"
        }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1 }}>
        
        {/* Left Side: Brand & Identity */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar 
            src={image} 
            alt={name} 
            variant="rounded" // Gives it a more modern "app" look than a circle
            sx={{ 
              width: 42, 
              height: 42, 
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#6366f1",
              // Ensures the image fills the space correctly
              "& img": {
                objectFit: "contain",
                p: 0.5
              }
            }} 
          >
            {/* Fallback Text: Shows if image URL is null or fails */}
            {symbol ? symbol.substring(0, 2).toUpperCase() : "?"}
          </Avatar>
          
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography 
              variant="body1" 
              fontWeight="700" 
              sx={{ color: "#fff", lineHeight: 1.2 }}
            >
              {symbol}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 500 }}
            >
              {name}
            </Typography>
          </Box>
        </Box>

        {/* Right Side: Financial Performance */}
        <Box sx={{ textAlign: "right" }}>
          <Typography 
            variant="body1" 
            fontWeight="800" 
            sx={{ color: "white", lineHeight: 1.2 }}
          >
            ${typeof price === 'number' ? price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 0.5 }}>
            <Typography 
              variant="caption" 
              sx={{ 
                color: trendColor, 
                fontWeight: 700,
                bgcolor: `${trendColor}15`,
                px: 0.8,
                py: 0.2,
                borderRadius: 1
              }}
            >
              {trend > 0 ? "+" : ""}{trend}%
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider 
        sx={{ 
          mt: 2, 
          borderColor: "rgba(255,255,255,0.06)", 
          borderBottomWidth: 1 
        }} 
      />
    </Box>
  );
}