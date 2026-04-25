import { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box, Button, CircularProgress, Paper, Autocomplete, TextField, Avatar, Divider } from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";
import { TrendingUp, Wallet, Award, RefreshCw, Zap, TrendingDown, ShieldCheck, Activity, Globe, Cpu } from "lucide-react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import TradeChart from "../components/TradeChart";

const yahooFinanceStocks = [
  { label: 'Reliance Industries', code: 'RELIANCE.NS' },
  { label: 'Tata Motors', code: 'TATAMOTORS.NS' },
  { label: 'HDFC Bank', code: 'HDFCBANK.NS' },
  { label: 'Apple Inc.', code: 'AAPL' },
  { label: 'Tesla Inc.', code: 'TSLA' },
  { label: 'Nvidia Corp', code: 'NVDA' },
  { label: 'Bitcoin USD', code: 'BTC-USD' },
  { label: 'S&P 500', code: '^GSPC' }
];

const StatCard = ({ title, value, icon: Icon, color, delay, isCurrency = false }) => {
  const displayValue = value !== null && value !== undefined ? value : 0;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <Paper sx={{ 
        p: 3, background: "rgba(15, 18, 26, 0.7)", backdropFilter: "blur(12px)", 
        border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 4,
        transition: "all 0.3s ease",
        "&:hover": { border: `1px solid ${color}`, boxShadow: `0 0 25px ${color}20`, transform: "translateY(-5px)" }
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: 'uppercase' }}>{title}</Typography>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 800, mt: 1 }}>
              {isCurrency ? `$${displayValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : `${displayValue}%`}
            </Typography>
          </Box>
          <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: `${color}15`, color: color }}><Icon size={22} /></Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default function Dashboard() {
  const scrollRef = useRef(null);
  const [selectedStock, setSelectedStock] = useState(yahooFinanceStocks[0]);
  const [loading, setLoading] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [metrics, setMetrics] = useState({
    prediction: null, chart: [], portfolio: 0, profit: 0, accuracy: 0, risk: "Stable", price: 0, trend: 0
  });

  useEffect(() => {
    const scrollInstance = new LocomotiveScroll({ 
      el: scrollRef.current, smooth: true, multiplier: 1.2, lerp: 0.08,
      smartphone: { smooth: true }, tablet: { smooth: true }
    });
    const timer = setTimeout(() => { 
        if (scrollInstance && typeof scrollInstance.update === 'function') scrollInstance.update(); 
    }, 1000);
    return () => {
        clearTimeout(timer);
        scrollInstance.destroy();
    };
  }, [metrics.chart]);

const fetchAI = async () => {
  setLoading(true);
  try {
    // This allows the app to use your Render URL in production 
    // and localhost while you are developing.
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
    
    const res = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: selectedStock.code }),
    });
    
    const result = await res.json();
    if (res.ok) {
      setMetrics({
        prediction: result.prediction,
        chart: (result.chart || []).map((val, i) => ({ day: i, price: parseFloat(val) })),
        portfolio: result.portfolio || 0, // Fallback to 0 if null
        profit: result.profit || 0,
        accuracy: result.accuracy || 0,
        risk: result.risk || "Stable", 
        price: result.price || 0, 
        trend: result.trend || 0
      });
    }
  } catch (e) { 
    console.error("Connection failed. Is the backend awake?"); 
  } finally { 
    setLoading(false); 
  }
};

  useEffect(() => { fetchAI(); }, [selectedStock]);

  return (
    <Box ref={scrollRef} data-scroll-container sx={{ background: "#0b0e14", color: "white", minHeight: '100vh', overflowX: 'hidden' }}>
      <motion.div style={{ scaleX, position: "fixed", top: 0, left: 0, right: 0, height: 4, background: "#6366f1", originX: 0, zIndex: 1000 }} />

      <Box sx={{ px: { xs: 2, md: 4, lg: 8 }, py: 6 }} data-scroll-section>
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 8, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h3" fontWeight="900" sx={{ letterSpacing: '-1.5px', fontSize: {xs: '2.2rem', md: '3.5rem'} }}>
                Trade<span style={{ color: '#6366f1' }}>Analysis</span>
              </Typography>
              <Typography variant="caption" color="gray" sx={{ display: 'flex', alignItems: 'center', gap: 1, textTransform: 'uppercase', letterSpacing: 2 }}>
                <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}
                  style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} /> ENGINE ACTIVE
              </Typography>
            </Box>

            <Paper sx={{ display: 'flex', p: 1, borderRadius: 3, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
              <Autocomplete
                disableClearable options={yahooFinanceStocks} value={selectedStock}
                onChange={(e, val) => setSelectedStock(val)}
                getOptionLabel={(opt) => `${opt.label} (${opt.code})`}
                sx={{ width: { xs: 240, md: 450 } }}
                renderInput={(params) => {
                  // FIX: Explicitly destructure to prevent InputProps from leaking to the DOM
                  const { InputProps, ...restParams } = params;
                  return (
                    <TextField 
                      {...restParams} 
                      variant="standard" 
                      sx={{ px: 2, "& .MuiInputBase-root": { color: "white", fontSize: '1.1rem' } }} 
                      InputProps={{ ...InputProps, disableUnderline: true }}
                    />
                  );
                }}
              />
              <Button variant="contained" onClick={fetchAI} sx={{ bgcolor: '#6366f1', borderRadius: 2, px: 4 }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : <RefreshCw size={24} />}
              </Button>
            </Paper>
          </Box>
        </motion.div>

        {/* FIX: Ensure Grid items use numeric/string values for props where possible to avoid 'item' warning */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}><StatCard title="Portfolio Value" value={metrics.portfolio} icon={Wallet} color="#6366f1" delay={0.1} isCurrency /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="Live P/L" value={metrics.profit} icon={metrics.profit >= 0 ? TrendingUp : TrendingDown} color={metrics.profit >= 0 ? "#10b981" : "#f87171"} delay={0.2} isCurrency /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="AI Accuracy" value={metrics.accuracy} icon={Award} color="#f59e0b" delay={0.3} /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="AI Signal" value={metrics.prediction === 1 ? "BUY" : "SELL"} icon={Zap} color={metrics.prediction === 1 ? "#10b981" : "#f87171"} delay={0.4} /></Grid>
        </Grid>

        <Box data-scroll data-scroll-speed="0.5" sx={{ mb: 6 }}>
          <Paper sx={{ 
            p: { xs: 2, md: 4 }, height: { xs: '500px', lg: '700px' }, 
            background: "rgba(15, 18, 26, 0.4)", border: "1px solid rgba(255, 255, 255, 0.05)", 
            borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
              <Box>
                <Typography variant="h4" fontWeight="800">{selectedStock.label}</Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.4)">Full-Spectrum Market Forecasting</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h3" fontWeight="900" sx={{ color: metrics.trend >= 0 ? '#10b981' : '#f87171' }}>${metrics.price.toLocaleString()}</Typography>
                <Typography variant="caption" sx={{ color: metrics.trend >= 0 ? '#10b981' : '#f87171', fontWeight: 700 }}>
                  {metrics.trend >= 0 ? '▲' : '▼'} {Math.abs(metrics.trend)}%
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
              <TradeChart data={metrics.chart} title="" />
            </Box>
          </Paper>
        </Box>

        <Grid container spacing={3} data-scroll data-scroll-speed="1">
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%', background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Activity size={24} color="#6366f1" />
                <Typography variant="h6" fontWeight="bold">Market Velocity</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                Real-time liquidity analysis for <b>{selectedStock.code}</b>. Neural nodes suggest a potential {metrics.trend >= 0 ? 'continuation' : 'reversal'}.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%', background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <ShieldCheck size={24} color="#10b981" />
                <Typography variant="h6" fontWeight="bold">Risk Protocol</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                The AI identifies a <b style={{ color: '#fff' }}>{metrics.risk}</b> risk state. Volatility clusters detected for {selectedStock.label}.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%', background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Cpu size={24} color="#f59e0b" />
                <Typography variant="h6" fontWeight="bold">AI Confidence</Typography>
              </Box>
              <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="gray">Pattern Matching</Typography>
                <Typography variant="caption" color="white">{metrics.accuracy}%</Typography>
              </Box>
              <Box sx={{ width: '100%', height: 6, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${metrics.accuracy}%` }} transition={{ duration: 1, delay: 0.5 }}
                  style={{ height: '100%', background: '#f59e0b' }} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 12, pb: 6, textAlign: 'center' }} data-scroll-section>
          <Globe size={32} color="rgba(255,255,255,0.2)" />
          <Typography variant="body2" color="rgba(255,255,255,0.2)" sx={{ mt: 2, letterSpacing: 4, textTransform: 'uppercase' }}>
            Decentralized Intelligence Network • 2026
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}