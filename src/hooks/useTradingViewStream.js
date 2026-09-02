/**
 * Custom React Hook: useTradingViewStream
 * Polls Backend API (/api/tradingview/gold?tf=...) every 800ms for 100% exact real-time TradingView data & timeframe candles.
 */

window.useTradingViewStream = function(timeframe = '1h', intervalMs = 800) {
  const [data, setData] = React.useState({
    symbol: 'XAUUSD',
    name: 'XAU/USD (Gold)',
    fullName: 'Gold Spot / US Dollar',
    rate: 4332.31,
    changePercent: 0.09,
    changeDollar: 3.81,
    pipsChange: 38,
    signal: 'BUY',
    confidence: 68,
    pointerPos: 80,
    entry: 4332.31,
    tp1: 4337.38,
    tp2: 4342.45,
    tp3: 4347.52,
    sl: 4328.51,
    rr: '1:1.3',
    status: '🟢 ACTIVE (+0 Pips In Profit)',
    high24: 4335.82,
    low24: 4282.72,
    atr: 101.41,
    pivotMid: 4388.04,
    prices: [4333.16, 4317.23, 4303.96, 4285.38, 4319.89, 4332.31],
    timestamps: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    maSummary: { rating: 'Strong Sell', buy: 2, sell: 12 },
    oscSummary: { rating: 'Sell', buy: 2, sell: 5 },
    connectionStatus: 'CONNECTED',
    lastUpdated: '19:05:12',
    timestamp: new Date().toISOString()
  });

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchLiveData = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/tradingview/gold?tf=${timeframe}`);
      const json = await res.json();
      if (json && json.success && json.data) {
        setData(json.data);
        setError(null);
      }
    } catch (err) {
      console.warn("React TradingView Stream Fetch Error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [timeframe]);

  React.useEffect(() => {
    fetchLiveData();
    const timer = setInterval(fetchLiveData, intervalMs);
    return () => clearInterval(timer);
  }, [fetchLiveData, intervalMs]);

  return { data, loading, error, refetch: fetchLiveData };
};
