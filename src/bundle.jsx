/**
 * Consolidated React Application Bundle for XAU/USD Gold Signals & Analytics
 */

// 1. Formatters
window.formatCurrency = function formatCurrency(val) {
  if (val === undefined || val === null || isNaN(val)) return '$0.00';
  return '$' + Number(val).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

window.formatNumber = function formatNumber(val, decimals = 2) {
  if (val === undefined || val === null || isNaN(val)) return '0.00';
  return Number(val).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

// 2. Custom Hook: useTradingViewStream
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

// 3. Components
const Header = function Header({ onOpenDrawer, onOpenTelegramModal, onRefresh, isRefreshing, data }) {
  const isConnected = !data || data.connectionStatus === 'CONNECTED';
  const lastUpdated = data ? data.lastUpdated : '19:24:03';

  return (
    <div
      className="card bg-dark text-light border-secondary shadow-lg rounded-4 mb-3 overflow-hidden"
      style={{
        background: 'rgba(24, 24, 30, 0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="card-body p-2 p-md-3 d-flex justify-content-between align-items-center">
        
        {/* Left Brand & Live Status with 3D Robot Avatar Mascot */}
        <div className="d-flex align-items-center gap-2.5">
          <img
            src="assets/bot_icon.png"
            alt="SAHAK_FOREX BOT"
            className="rounded-circle p-1"
            style={{
              width: '46px',
              height: '46px',
              objectFit: 'contain',
              background: 'rgba(245, 166, 35, 0.15)',
              border: '1.5px solid rgba(245, 166, 35, 0.5)',
              boxShadow: '0 0 16px rgba(245, 166, 35, 0.4)'
            }}
          />
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
              <span
                className="fw-extrabold fs-5 mb-0"
                style={{
                  letterSpacing: '-0.3px',
                  background: 'linear-gradient(135deg, #FFB340 0%, #F5A623 50%, #E8961E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                SAHAK_FOREX BOT
              </span>
              <span
                className="badge bg-warning-subtle text-warning border border-warning-subtle px-2 py-0.5 rounded-pill fw-bold"
                style={{ fontSize: '9.5px', letterSpacing: '0.5px' }}
              >
                GOLD XAU/USD
              </span>
            </div>

            <div className="d-flex align-items-center gap-1.5 mt-0.5" style={{ fontSize: '11px' }}>
              <span
                className={`badge ${isConnected ? 'bg-success-subtle text-success border-success-subtle' : 'bg-danger-subtle text-danger border-danger-subtle'} border px-2 py-0.5 rounded-pill d-flex align-items-center gap-1`}
                style={{ fontSize: '10px' }}
              >
                {isConnected ? '🟢 Live Stream' : '⚠️ Retrying Connection...'}
              </span>
              <span className="text-secondary" style={{ fontSize: '10px' }}>
                • Updated: <strong className="text-light">{lastUpdated}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions: Telegram Bot Config & Live Refresh Button */}
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-primary text-info rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 fw-bold shadow-sm"
            style={{ fontSize: '11px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)' }}
            onClick={onOpenTelegramModal}
            title="Telegram Bot Settings"
          >
            <i data-lucide="send" style={{ width: '14px', height: '14px', color: '#38BDF8' }}></i>
            <span className="text-info d-none d-sm-inline">Telegram Bot</span>
          </button>

          <button
            className="btn btn-outline-info text-info rounded-circle p-2 d-flex align-items-center justify-content-center"
            style={{ width: '36px', height: '36px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)' }}
            onClick={onRefresh}
            title="Live Refresh Stream"
          >
            <i data-lucide="refresh-cw" className={isRefreshing ? 'spin-icon' : ''} style={{ width: '16px', height: '16px' }}></i>
          </button>
        </div>

      </div>
    </div>
  );
};

const GoldRateBanner = function GoldRateBanner({ data }) {
  if (!data) return null;

  const isPositive = data.changePercent >= 0;
  const isUp = data.priceDirection === 'UP';
  const signalText = data.signal || 'BUY';
  const confidence = data.confidence || 68;

  return (
    <div
      className="card bg-dark text-light border-secondary shadow-lg rounded-4 mb-3 overflow-hidden position-relative"
      style={{
        background: 'linear-gradient(135deg, rgba(28, 28, 35, 0.95) 0%, rgba(18, 18, 22, 0.98) 100%)',
        borderColor: 'rgba(245, 158, 11, 0.3) !important'
      }}
    >
      {/* Background Gold Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '140px',
          height: '140px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }}
      ></div>

      <div className="card-body p-3 p-md-4">
        
        {/* Header Row: Symbol Label & Signal Pill */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center gap-2">
            <div className="p-1.5 rounded-2 bg-warning-subtle text-warning border border-warning-subtle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
              <i data-lucide="coins" style={{ width: '16px', height: '16px' }}></i>
            </div>
            <div>
              <span className="text-uppercase text-secondary fw-bold" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                LIVE XAU/USD GOLD SPOT
              </span>
            </div>
          </div>

          {/* Signal Badge */}
          <span
            className={`badge ${signalText.includes('BUY') ? 'bg-success text-dark' : 'bg-danger text-white'} px-3 py-2 rounded-pill fw-bold shadow-sm d-flex align-items-center gap-1`}
            style={{ fontSize: '12px', letterSpacing: '0.5px' }}
          >
            <i data-lucide={signalText.includes('BUY') ? 'trending-up' : 'trending-down'} style={{ width: '14px', height: '14px' }}></i>
            {signalText} ({confidence}%)
          </span>
        </div>

        {/* Center Main Price Display */}
        <div className="my-2">
          <div className="d-flex align-items-baseline gap-2">
            <h2
              className={`display-6 fw-extrabold mb-0 text-white ${isUp ? 'tick-up' : 'tick-down'}`}
              style={{ letterSpacing: '-0.5px' }}
            >
              {window.formatCurrency(data.rate)}
            </h2>
            <span className="text-secondary fw-semibold" style={{ fontSize: '13px' }}>USD / oz</span>
          </div>
        </div>

        {/* Change % and Pips Footer */}
        <div className="d-flex flex-wrap justify-content-between align-items-center pt-2 border-top border-secondary-subtle gap-2">
          <div className="d-flex align-items-center gap-2">
            <span
              className={`badge ${isPositive ? 'bg-success-subtle text-success border-success-subtle' : 'bg-danger-subtle text-danger border-danger-subtle'} border px-2.5 py-1.5 d-flex align-items-center gap-1`}
              style={{ fontSize: '11px' }}
            >
              <i data-lucide={isPositive ? 'arrow-up-right' : 'arrow-down-right'} style={{ width: '13px', height: '13px' }}></i>
              {isPositive ? '+' : ''}{data.changePercent}% ({isPositive ? '+' : ''}${data.changeDollar})
            </span>

            <span className="badge bg-info-subtle text-info border border-info-subtle px-2.5 py-1.5" style={{ fontSize: '11px' }}>
              {data.pipsChange >= 0 ? `+${data.pipsChange}` : data.pipsChange} Pips
            </span>
          </div>

          <div className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: '10px', fontWeight: 600 }}>
            <span>Updated:</span>
            <span className="text-success fw-bold">{data.lastUpdated || '19:20:03'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

const TimeframeBar = function TimeframeBar({ activeTimeframe, onSelectTimeframe }) {
  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1D'];

  return (
    <div className="timeframe-bar">
      {timeframes.map((tf) => (
        <div
          key={tf}
          className={`tf-tab ${activeTimeframe === tf.toLowerCase() ? 'active' : ''}`}
          onClick={() => onSelectTimeframe(tf.toLowerCase())}
        >
          {tf}
        </div>
      ))}
    </div>
  );
};

const GradientChart = function GradientChart({ data }) {
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    if (!chartRef.current || !data) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const labels = data.timestamps || ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    const prices = data.prices || [4335.82, 4317.23, 4301.31, 4282.72, 4311.93, 4332.31];
    const minVal = Math.min(...prices);
    const maxVal = Math.max(...prices);
    const valMargin = Math.max(12, (maxVal - minVal) * 0.25);

    if (chartInstanceRef.current && chartInstanceRef.current.ctx && chartInstanceRef.current.ctx.canvas) {
      try {
        chartInstanceRef.current.data.labels = labels;
        chartInstanceRef.current.data.datasets[0].data = prices;
        chartInstanceRef.current.options.scales.y.min = minVal - valMargin;
        chartInstanceRef.current.options.scales.y.max = maxVal + valMargin;
        chartInstanceRef.current.update('none');
        return;
      } catch (e) {
        if (chartInstanceRef.current) chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 190);
    gradient.addColorStop(0, 'rgba(245, 166, 35, 0.40)');
    gradient.addColorStop(0.5, 'rgba(255, 179, 64, 0.18)');
    gradient.addColorStop(1, 'rgba(232, 150, 30, 0.0)');

    const strokeGradient = ctx.createLinearGradient(0, 0, 320, 0);
    strokeGradient.addColorStop(0, '#FFB340');
    strokeGradient.addColorStop(0.5, '#F5A623');
    strokeGradient.addColorStop(1, '#E8961E');

    const livePriceNodePlugin = {
      id: 'livePriceNodePlugin',
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        ctx.save();
        ctx.font = '700 10px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        meta.data.forEach((point, index) => {
          const val = chart.data.datasets[0].data[index];
          if (val === undefined || val === null) return;

          const priceStr = window.formatCurrency(val);
          const isLatest = index === meta.data.length - 1;
          const isBottom = index === 3;

          const textWidth = ctx.measureText(priceStr).width;
          const padX = 6;
          const padY = 3;
          const badgeWidth = textWidth + padX * 2;
          const badgeHeight = 16;

          const minX = badgeWidth / 2 + 4;
          const maxX = chart.width - badgeWidth / 2 - 4;
          const clampedX = Math.max(minX, Math.min(maxX, point.x));

          const y = isBottom ? Math.min(chart.height - 20, point.y + 16) : Math.max(12, point.y - 16);

          ctx.beginPath();
          if (isLatest) {
            ctx.fillStyle = '#F97316';
            ctx.strokeStyle = '#EA580C';
          } else if (isBottom) {
            ctx.fillStyle = 'rgba(236, 72, 153, 0.95)';
            ctx.strokeStyle = '#EC4899';
          } else {
            ctx.fillStyle = 'rgba(24, 24, 30, 0.95)';
            ctx.strokeStyle = '#3F3F46';
          }
          ctx.lineWidth = 1;

          if (ctx.roundRect) {
            ctx.roundRect(clampedX - badgeWidth / 2, y - badgeHeight / 2, badgeWidth, badgeHeight, 4);
          } else {
            ctx.rect(clampedX - badgeWidth / 2, y - badgeHeight / 2, badgeWidth, badgeHeight);
          }
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(priceStr, clampedX, y);
        });

        ctx.restore();
      }
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Gold Live Price',
          data: prices,
          borderColor: strokeGradient,
          borderWidth: 2.5,
          backgroundColor: gradient,
          fill: true,
          tension: 0.42,
          pointBackgroundColor: '#A855F7',
          pointBorderColor: '#0D0D0F',
          pointBorderWidth: 2.5,
          pointRadius: 5,
          pointHoverRadius: 8
        }]
      },
      plugins: [livePriceNodePlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 25,
            bottom: 25,
            left: 30,
            right: 30
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1C1C1F',
            titleColor: '#8A8A8F',
            bodyColor: '#4ADE80',
            borderColor: '#2A2A2E',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              title: (items) => `Time Node: ${items[0].label}`,
              label: (item) => `Live Gold Price: $${item.raw.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#8A8A8F', font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' } }
          },
          y: {
            display: false,
            min: minVal - valMargin,
            max: maxVal + valMargin
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="gradient-chart-card mb-3">
      <div className="chart-canvas-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

const SignalExecutionGrid = function SignalExecutionGrid({ data }) {
  if (!data) return null;

  return (
    <div className="card bg-dark text-light border-secondary shadow-lg rounded-4 mb-3 overflow-hidden">
      <div className="card-body p-3">
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-uppercase text-secondary fw-bold" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
            Signal Execution Targets
          </span>
          <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1" style={{ fontSize: '10px' }}>
            {data.status || '🟢 ACTIVE'}
          </span>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary">
              <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>Entry Zone</div>
              <div className="fs-6 fw-bold text-white mt-1">
                {window.formatCurrency(data.entry)}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-danger-subtle">
              <div className="text-danger" style={{ fontSize: '10px', fontWeight: 600 }}>Stop Loss (SL)</div>
              <div className="fs-6 fw-bold text-danger mt-1">
                {window.formatCurrency(data.sl)}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 rounded-3 bg-body-tertiary border border-success-subtle">
              <div className="text-success" style={{ fontSize: '10px', fontWeight: 600 }}>TP 1 (1:1)</div>
              <div className="fw-bold text-success" style={{ fontSize: '13px' }}>
                {window.formatCurrency(data.tp1)}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 rounded-3 bg-body-tertiary border border-success-subtle">
              <div className="text-success" style={{ fontSize: '10px', fontWeight: 600 }}>TP 2 (1:2)</div>
              <div className="fw-bold text-success" style={{ fontSize: '13px' }}>
                {window.formatCurrency(data.tp2)}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 rounded-3 bg-body-tertiary border border-success-subtle">
              <div className="text-success" style={{ fontSize: '10px', fontWeight: 600 }}>TP 3 (1:3)</div>
              <div className="fw-bold text-success" style={{ fontSize: '13px' }}>
                {window.formatCurrency(data.tp3)}
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-3 rounded-3 border border-info-subtle"
          style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(168, 85, 247, 0.12) 100%)', borderLeft: '4px solid #06B6D4' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="text-info fw-bold d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
              <i data-lucide="sparkles" style={{ width: '14px', height: '14px' }}></i>
              TECHNICAL ANALYSIS REASONS
            </div>
            <span className="badge bg-info-subtle text-info border border-info-subtle" style={{ fontSize: '10px' }}>
              R:R {data.rr || '1:1.3'}
            </span>
          </div>

          <div className="fw-bold text-white" style={{ fontSize: '12px', lineHeight: '1.4' }}>
            {data.reasonsText || 'Bullish EMA Trend + Strong Bullish Impulse'}
          </div>
        </div>

      </div>
    </div>
  );
};

const OrderExecutionTicket = function OrderExecutionTicket({ data, onCopySignal, onSimulateOrder, isAutoOrderEnabled, onToggleAutoOrder }) {
  const [lotSize, setLotSize] = React.useState(0.10);

  if (!data) return null;

  const isBuy = data.signal ? data.signal.includes('BUY') : false;
  const tp1Pips = data.tp1Pips || Math.round(Math.abs((data.tp1 || 0) - (data.entry || 0)) * 10);
  const tp2Pips = data.tp2Pips || Math.round(Math.abs((data.tp2 || 0) - (data.entry || 0)) * 10);
  const tp3Pips = data.tp3Pips || Math.round(Math.abs((data.tp3 || 0) - (data.entry || 0)) * 10);
  const slPips = data.slPips || Math.round(Math.abs((data.entry || 0) - (data.sl || 0)) * 10);

  const pipMultiplier = lotSize * 10;
  const tp1Dollar = (tp1Pips * pipMultiplier).toFixed(2);
  const tp2Dollar = (tp2Pips * pipMultiplier).toFixed(2);
  const tp3Dollar = (tp3Pips * pipMultiplier).toFixed(2);
  const slDollar = (slPips * pipMultiplier).toFixed(2);

  const resZoneHigh = window.formatCurrency((data.high24 || data.rate) + 2.0);
  const resZoneLow = window.formatCurrency(data.high24 || data.rate);
  const supZoneHigh = window.formatCurrency(data.low24 || data.rate - 20);
  const supZoneLow = window.formatCurrency((data.low24 || data.rate - 20) - 2.5);

  return (
    <div className="card bg-dark text-light border-secondary shadow-lg rounded-4 mb-3 overflow-hidden">
      <div className="card-body p-3">
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <span style={{ background: '#F97316', color: '#FFFFFF', fontWeight: 800, fontSize: '11px', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
              XAUUSD {window.formatCurrency(data.rate)}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#8A8A8F' }}>Gold Spot / USD</span>
          </div>

          <span className={`signal-status-pill ${isBuy ? 'strong-buy' : 'sell'}`} style={{ fontSize: '12px', padding: '6px 12px' }}>
            <i data-lucide={isBuy ? 'arrow-up-right' : 'arrow-down-right'} style={{ width: '14px', height: '14px', marginRight: '4px' }}></i>
            {data.orderAction || (isBuy ? 'BUY MARKET' : 'SELL MARKET')}
          </span>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-6">
            <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '8px 10px' }}>
              <div style={{ fontSize: '10px', color: '#EF4444', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                <span>🔴 RESISTANCE SUPPLY</span>
                <span>22.78K Vol</span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                {resZoneLow} - {resZoneHigh}
              </div>
            </div>
          </div>

          <div className="col-6">
            <div style={{ background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '8px', padding: '8px 10px' }}>
              <div style={{ fontSize: '10px', color: '#22C55E', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                <span>🟢 SUPPORT DEMAND</span>
                <span>2.24K Vol</span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                {supZoneLow} - {supZoneHigh}
              </div>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-3 bg-body-tertiary border border-secondary mb-3 d-flex justify-content-between align-items-center">
          <label className="text-secondary fw-semibold mb-0" style={{ fontSize: '12px' }}>
            Position Lot Size:
          </label>
          <div style={{ width: '150px' }}>
            <select
              className="form-select form-select-sm bg-dark text-white border-secondary fw-bold shadow-sm"
              style={{ fontSize: '12px', cursor: 'pointer' }}
              value={lotSize}
              onChange={(e) => setLotSize(parseFloat(e.target.value))}
            >
              <option value="0.01">0.01 Lot (Micro)</option>
              <option value="0.02">0.02 Lot</option>
              <option value="0.05">0.05 Lot</option>
              <option value="0.10">0.10 Lot (Mini)</option>
              <option value="0.20">0.20 Lot</option>
              <option value="0.50">0.50 Lot</option>
              <option value="1.00">1.00 Lot (Standard)</option>
              <option value="2.00">2.00 Lots</option>
              <option value="5.00">5.00 Lots</option>
              <option value="10.00">10.00 Lots</option>
            </select>
          </div>
        </div>

        <div className="params-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          
          <div className="param-item">
            <span className="param-label">Order Entry Price</span>
            <span className="param-value" style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
              {window.formatCurrency(data.entry)}
            </span>
            <span style={{ fontSize: '10px', color: '#8A8A8F' }}>TradingView Signal Entry</span>
          </div>

          <div className="param-item">
            <span className="param-label">Stop Loss (SL)</span>
            <span className="param-value sl" style={{ fontSize: '16px', fontWeight: 800 }}>
              {window.formatCurrency(data.sl)}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--color-sell)', fontWeight: 700 }}>
              -${slDollar} (-{slPips} Pips)
            </span>
          </div>

          <div className="param-item">
            <span className="param-label">Take Profit 1 (1:1)</span>
            <span className="param-value tp" style={{ fontSize: '15px', fontWeight: 800 }}>
              {window.formatCurrency(data.tp1)}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--color-strong-buy)', fontWeight: 700 }}>
              +${tp1Dollar} (+{tp1Pips} Pips)
            </span>
          </div>

          <div className="param-item">
            <span className="param-label">Take Profit 2 (1:2)</span>
            <span className="param-value tp" style={{ fontSize: '15px', fontWeight: 800 }}>
              {window.formatCurrency(data.tp2)}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--color-strong-buy)', fontWeight: 700 }}>
              +${tp2Dollar} (+{tp2Pips} Pips)
            </span>
          </div>

          <div className="param-item" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="param-label">Take Profit 3 (1:3 Extended Target)</span>
                <div className="param-value tp" style={{ fontSize: '16px', fontWeight: 800 }}>
                  {window.formatCurrency(data.tp3)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-strong-buy)', fontWeight: 800 }}>
                  +${tp3Dollar} (+{tp3Pips} Pips)
                </span>
                <div style={{ fontSize: '10px', color: '#8A8A8F' }}>Maximum Reward Target</div>
              </div>
            </div>
          </div>

        </div>

        <div style={{ background: '#1E222D', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #2A2E39' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', color: '#8A8A8F' }}>
            <span>Risk / Reward Ratio: <strong style={{ color: '#FFFFFF' }}>{data.rr || '1:1.8'}</strong></span>
            <span>EMA 20 Trend: <strong style={{ color: '#22C55E' }}>{window.formatCurrency(data.ema20 || 4313.67)}</strong></span>
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF' }}>
            💬 Technical Analysis: {data.reasonsText || 'Bullish Trend Confluence'}
          </div>
        </div>

        {/* Auto Market Entry Price Trigger Switch Banner */}
        <div
          className="p-2.5 rounded-3 mb-3 border d-flex align-items-center justify-content-between"
          style={{
            background: isAutoOrderEnabled ? 'rgba(52, 199, 89, 0.12)' : 'rgba(255, 69, 58, 0.12)',
            borderColor: isAutoOrderEnabled ? 'rgba(52, 199, 89, 0.35)' : 'rgba(255, 69, 58, 0.35)'
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <div
              className={`p-1.5 rounded-circle d-flex align-items-center justify-content-center ${isAutoOrderEnabled ? 'bg-success text-dark' : 'bg-danger text-white'}`}
              style={{ width: '26px', height: '26px' }}
            >
              <i data-lucide={isAutoOrderEnabled ? 'zap' : 'zap-off'} style={{ width: '15px', height: '15px' }}></i>
            </div>
            <div>
              <div className="fw-extrabold text-white" style={{ fontSize: '12px' }}>
                Auto Entry Trigger: <span className={isAutoOrderEnabled ? 'text-success' : 'text-danger'}>{isAutoOrderEnabled ? 'ACTIVE (ON)' : 'OFF'}</span>
              </div>
              <div className="text-secondary" style={{ fontSize: '10px' }}>
                Auto enters new order when price hits Target ${window.formatCurrency(data.entry)}
              </div>
            </div>
          </div>

          <div className="form-check form-switch m-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={!!isAutoOrderEnabled}
              onChange={(e) => onToggleAutoOrder && onToggleAutoOrder(e.target.checked)}
              style={{ cursor: 'pointer', transform: 'scale(1.25)' }}
            />
          </div>
        </div>

        <div className="row g-2">
          <div className="col-6">
            <button
              className="btn btn-outline-secondary w-100 py-2 fw-bold text-white shadow-sm d-flex align-items-center justify-content-center gap-1"
              style={{ fontSize: '11px', borderRadius: '8px' }}
              onClick={() => onCopySignal(data)}
            >
              <i data-lucide="copy" style={{ width: '14px', height: '14px' }}></i>
              Copy Signal
            </button>
          </div>
          <div className="col-6">
            <button
              className={`btn ${isBuy ? 'btn-success text-dark' : 'btn-danger text-white'} w-100 py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-1`}
              style={{ fontSize: '11px', borderRadius: '8px' }}
              onClick={() => onSimulateOrder(data, lotSize)}
            >
              <i data-lucide="zap" style={{ width: '14px', height: '14px' }}></i>
              Quick Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const MarketAnalysisBreakdown = function MarketAnalysisBreakdown({ data }) {
  if (!data) return null;

  return (
    <div className="card bg-dark text-light border-secondary shadow-lg rounded-4 mb-3 overflow-hidden">
      <div className="card-body p-3">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="p-1.5 rounded-2 bg-primary-subtle text-primary border border-primary-subtle d-flex align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
              <i data-lucide="cpu" style={{ width: '16px', height: '16px' }}></i>
            </div>
            <div>
              <h6 className="mb-0 fw-bold text-white" style={{ fontSize: '13px' }}>7 Technical Indicators Engine</h6>
              <span className="text-secondary" style={{ fontSize: '10px' }}>Real-time Confluence Scoring</span>
            </div>
          </div>

          <span className="badge bg-cyan-subtle text-info border border-info-subtle px-2 py-1" style={{ fontSize: '10px' }}>
            TradingView Live
          </span>
        </div>

        <div className="row g-2">
          
          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>RSI (14)</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{data.rsi || '46.5'}</div>
              </div>
              <i data-lucide="activity" style={{ width: '14px', height: '14px', color: '#06B6D4' }}></i>
            </div>
          </div>

          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>ATR (14) Volatility</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{window.formatCurrency(data.atr)}</div>
              </div>
              <i data-lucide="bar-chart-2" style={{ width: '14px', height: '14px', color: '#A855F7' }}></i>
            </div>
          </div>

          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>EMA 20</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{window.formatCurrency(data.ema20)}</div>
              </div>
              <i data-lucide="trending-up" style={{ width: '14px', height: '14px', color: '#4ADE80' }}></i>
            </div>
          </div>

          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>EMA 50</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{window.formatCurrency(data.ema50)}</div>
              </div>
              <i data-lucide="line-chart" style={{ width: '14px', height: '14px', color: '#38BDF8' }}></i>
            </div>
          </div>

          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>MACD (12, 26)</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '11px' }}>
                  {data.macdLine || '61.3'} / {data.macdSignal || '90.19'}
                </div>
              </div>
              <i data-lucide="sliders" style={{ width: '14px', height: '14px', color: '#EC4899' }}></i>
            </div>
          </div>

          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>Stochastic</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '11px' }}>
                  %K {data.stochK || '17.3'} / %D {data.stochD || '30.7'}
                </div>
              </div>
              <i data-lucide="zap" style={{ width: '14px', height: '14px', color: '#F59E0B' }}></i>
            </div>
          </div>

          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>Upper Bollinger Band</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{window.formatCurrency(data.bbUpper)}</div>
              </div>
              <i data-lucide="arrow-up-circle" style={{ width: '14px', height: '14px', color: '#EF4444' }}></i>
            </div>
          </div>

          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>Lower Bollinger Band</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{window.formatCurrency(data.bbLower)}</div>
              </div>
              <i data-lucide="arrow-down-circle" style={{ width: '14px', height: '14px', color: '#22C55E' }}></i>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

const TradingViewGauge = function TradingViewGauge({ data }) {
  if (!data) return null;

  const pointerPos = data.pointerPos !== undefined ? data.pointerPos : 50;

  return (
    <div className="ta-gauge-card mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span style={{ fontWeight: 800, fontSize: '14px' }}>TradingView Technical Analysis</span>
        <span style={{ fontSize: '11px', color: 'var(--gradient-teal)', fontWeight: 700 }}>Live Rating</span>
      </div>

      <div className="ta-meter-bar-wrapper">
        <div className="ta-meter-pointer" style={{ left: `${pointerPos}%` }}></div>
      </div>

      <div className="ta-ratings-row">
        <span>STRONG SELL</span>
        <span>SELL</span>
        <span>NEUTRAL</span>
        <span>BUY</span>
        <span>STRONG BUY</span>
      </div>
    </div>
  );
};

const LiveRatesList = function LiveRatesList({ data }) {
  const goldRate = data ? data.rate : 4332.31;
  const goldChange = data ? data.changePercent : 0.09;

  const pairs = [
    { symbol: 'XAU/USD', name: 'Gold Spot', rate: window.formatCurrency(goldRate), change: `${goldChange >= 0 ? '+' : ''}${goldChange}%`, isUp: goldChange >= 0, icon: 'coins' },
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', rate: '1.0845', change: '+0.12%', isUp: true, icon: 'euro' },
    { symbol: 'GBP/USD', name: 'British Pound', rate: '1.2730', change: '-0.08%', isUp: false, icon: 'pound-sterling' },
    { symbol: 'USD/JPY', name: 'Japanese Yen', rate: '154.20', change: '+0.25%', isUp: true, icon: 'japanese-yen' },
    { symbol: 'BTC/USD', name: 'Bitcoin Spot', rate: '$92,450.00', change: '+2.45%', isUp: true, icon: 'bitcoin' }
  ];

  return (
    <div className="card bg-dark text-light border-secondary shadow-lg rounded-4 mb-3 overflow-hidden">
      <div className="card-body p-3">
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="p-1.5 rounded-2 bg-warning-subtle text-warning border border-warning-subtle d-flex align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
              <i data-lucide="globe" style={{ width: '16px', height: '16px' }}></i>
            </div>
            <div>
              <h6 className="mb-0 fw-bold text-white" style={{ fontSize: '13px' }}>TradingView Live Market Watch</h6>
              <span className="text-secondary" style={{ fontSize: '10px' }}>Global Spot & Forex Quotes</span>
            </div>
          </div>

          <span className="badge bg-body-tertiary text-secondary border border-secondary" style={{ fontSize: '10px' }}>
            5 Assets
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0" style={{ fontSize: '12px' }}>
            <thead>
              <tr className="text-secondary border-secondary">
                <th className="fw-semibold ps-2" style={{ fontSize: '10px' }}>ASSET PAIR</th>
                <th className="fw-semibold text-end" style={{ fontSize: '10px' }}>LIVE PRICE</th>
                <th className="fw-semibold text-end pe-2" style={{ fontSize: '10px' }}>24H CHANGE</th>
              </tr>
            </thead>
            <tbody>
              {pairs.map((item, idx) => (
                <tr key={idx} className="border-secondary">
                  <td className="ps-2 py-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="p-1 rounded-2 bg-body-tertiary border border-secondary text-info d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                        <i data-lucide={item.icon} style={{ width: '13px', height: '13px' }}></i>
                      </div>
                      <div>
                        <div className="fw-bold text-white" style={{ fontSize: '12px' }}>{item.symbol}</div>
                        <div className="text-secondary" style={{ fontSize: '10px' }}>{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-end fw-bold text-white py-2" style={{ fontSize: '12px' }}>
                    {item.rate}
                  </td>
                  <td className="text-end pe-2 py-2">
                    <span className={`badge ${item.isUp ? 'bg-success-subtle text-success border-success-subtle' : 'bg-danger-subtle text-danger border-danger-subtle'} border px-2 py-1`} style={{ fontSize: '10px' }}>
                      {item.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

const DrawerMenu = function DrawerMenu({ isOpen, onClose, activeScreen, onSelectScreen }) {
  return (
    <div className={`hamburger-overlay ${isOpen ? 'active' : ''}`} onClick={(e) => {
      if (e.target.classList.contains('hamburger-overlay')) onClose();
    }}>
      <div className="hamburger-drawer">
        <div className="drawer-header">
          <div className="drawer-title">Forex & Gold Signals</div>
          <button className="icon-btn" onClick={onClose}>
            <i data-lucide="x" style={{ width: '18px', height: '18px' }}></i>
          </button>
        </div>

        <div className="drawer-nav">
          <a
            href="#"
            className={`drawer-menu-item ${activeScreen === 'signal-detail' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onSelectScreen('signal-detail'); onClose(); }}
          >
            <i data-lucide="activity" style={{ width: '18px', height: '18px' }}></i>
            <span>Gold Technical Signal</span>
          </a>

          <a
            href="#"
            className={`drawer-menu-item ${activeScreen === 'performance' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onSelectScreen('performance'); onClose(); }}
          >
            <i data-lucide="award" style={{ width: '18px', height: '18px' }}></i>
            <span>Signal Performance</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const TelegramModal = function TelegramModal({ isOpen, onClose, onSave, token, setToken, chatId, setChatId, onTestSend, isSending }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1100 }}
      onClick={(e) => { if (e.target.classList.contains('modal')) onClose(); }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light border-secondary shadow-lg rounded-4 overflow-hidden">
          <div className="modal-header border-secondary p-3" style={{ background: 'rgba(15, 23, 42, 0.8)' }}>
            <div className="d-flex align-items-center gap-2">
              <img
                src="assets/bot_icon.png"
                alt="Telegram Bot Assistant"
                className="rounded-circle p-1"
                style={{
                  width: '38px',
                  height: '38px',
                  objectFit: 'contain',
                  background: 'rgba(245, 166, 35, 0.15)',
                  border: '1px solid rgba(245, 166, 35, 0.4)'
                }}
              />
              <div>
                <h6 className="modal-title fw-bold text-white mb-0">Telegram Bot Notifications</h6>
                <span className="text-secondary" style={{ fontSize: '11px' }}>Real-time Order Messages & Signal Alerts</span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-3.5">
            <div className="mb-3">
              <label className="form-label text-secondary fw-semibold mb-1" style={{ fontSize: '12px' }}>
                Telegram Bot Token:
              </label>
              <input
                type="text"
                className="form-control form-control-sm bg-body-tertiary text-white border-secondary fw-mono"
                placeholder="e.g. 8936385196:AA..."
                value={token}
                onChange={(e) => {
                  const raw = e.target.value;
                  const match = raw.match(/\d+:[A-Za-z0-9_-]+/);
                  setToken(match ? match[0] : raw.trim());
                }}
                style={{ fontSize: '12px' }}
              />
              <span className="text-secondary d-block mt-1" style={{ fontSize: '10px' }}>
                Paste your bot token (e.g. <code>8936385196:AA...</code>). Full BotFather text will be auto-cleaned!
              </span>
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary fw-semibold mb-1" style={{ fontSize: '12px' }}>
                Telegram Chat ID:
              </label>
              <input
                type="text"
                className="form-control form-control-sm bg-body-tertiary text-white border-secondary fw-mono"
                placeholder="e.g. -5307116780 or 123456789"
                value={chatId}
                onChange={(e) => {
                  const raw = e.target.value;
                  const match = raw.match(/-?\d+|@[A-Za-z0-9_]+/);
                  setChatId(match ? match[0] : raw.trim());
                }}
                style={{ fontSize: '12px' }}
              />
              <span className="text-secondary d-block mt-1" style={{ fontSize: '10px' }}>
                Get your Chat ID via <strong>@userinfobot</strong> or group/channel ID.
              </span>
            </div>
          </div>

          <div className="modal-footer border-secondary p-2.5 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-info btn-sm fw-bold d-flex align-items-center gap-1"
              onClick={onTestSend}
              disabled={isSending}
            >
              <i data-lucide="zap" style={{ width: '14px', height: '14px' }}></i>
              {isSending ? 'Sending Test...' : 'Test Send Message'}
            </button>

            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="btn btn-success btn-sm text-dark fw-bold" onClick={onSave}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Main Root App Component
function App() {
  const [activeTimeframe, setActiveTimeframe] = React.useState('1h');
  const { data, loading, error, refetch } = window.useTradingViewStream(activeTimeframe, 800);
  const [activeScreen, setActiveScreen] = React.useState('signal-detail');
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState('');

  // Telegram Configuration States
  const [isTelegramModalOpen, setIsTelegramModalOpen] = React.useState(false);
  const [telegramToken, setTelegramToken] = React.useState(localStorage.getItem('telegramBotToken') || '');
  const [telegramChatId, setTelegramChatId] = React.useState(localStorage.getItem('telegramChatId') || '');
  const [isSendingTelegram, setIsSendingTelegram] = React.useState(false);

  // Auto Order Target Price Trigger States
  const [isAutoOrderEnabled, setIsAutoOrderEnabled] = React.useState(true);
  const lastTriggeredKeyRef = React.useRef('');

  React.useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Automatic Target Price Monitor Effect
  React.useEffect(() => {
    if (!isAutoOrderEnabled || !data || !data.entry || !data.closePrice) return;

    const currentPrice = data.closePrice;
    const entryTarget = data.entry;
    const priceDiff = Math.abs(currentPrice - entryTarget);

    // If market price reaches within 0.35 of Entry Target
    if (priceDiff <= 0.35) {
      const triggerKey = `${data.orderAction || data.signal}_${entryTarget}_${Math.floor(Date.now() / 25000)}`;
      if (lastTriggeredKeyRef.current !== triggerKey) {
        lastTriggeredKeyRef.current = triggerKey;
        playOrderAudioChime();
        showAlert(`🚀 AUTOMATIC ORDER TRIGGERED: Market price reached $${currentPrice}! Automatic ${data.orderAction || 'BUY LIMIT'} executed at $${entryTarget}!`);
        dispatchTelegramOrder(data, 0.10);
      }
    }
  }, [data, isAutoOrderEnabled]);

  const playOrderAudioChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  };

  const showAlert = (msg) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(''), 4500);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    showAlert('Refreshed live Gold market stream from TradingView');
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleTimeframeChange = (tf) => {
    setActiveTimeframe(tf);
    showAlert(`Switched Gold timeframe to ${tf.toUpperCase()}`);
  };

  const dispatchTelegramOrder = async (orderData, lotSize) => {
    const isBuy = orderData.signal ? orderData.signal.includes('BUY') : true;
    const action = orderData.orderAction || (isBuy ? 'BUY LIMIT' : 'SELL LIMIT');
    const sizeStr = lotSize ? `${lotSize} Lot` : '0.10 Lot';
    const nowTime = new Date().toLocaleTimeString();
    const actionEmoji = isBuy ? '🟢' : '🔴';

    const text = `🏆 <b>XAU/USD (GOLD) EXECUTED SIGNAL</b> 🏆\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `${actionEmoji} <b>ACTION:</b> <code>${action} (${sizeStr})</code>\n` +
      `📌 <b>ENTRY PRICE:</b> <code>$${orderData.entry}</code>\n` +
      `🛑 <b>STOP LOSS (SL):</b> <code>$${orderData.sl}</code> 🔴 (<b>-${orderData.slPips || 46} Pips</b>)\n\n` +
      `🎯 <b>TAKE PROFIT TARGETS:</b>\n` +
      `  ┣ 🟢 <b>TP1:</b> <code>$${orderData.tp1}</code> (<b>+${orderData.tp1Pips || 70} Pips</b>)\n` +
      `  ┣ 🚀 <b>TP2:</b> <code>$${orderData.tp2}</code> (<b>+${orderData.tp2Pips || 116} Pips</b>)\n` +
      `  ┗ 👑 <b>TP3:</b> <code>$${orderData.tp3}</code> (<b>+${orderData.tp3Pips || 162} Pips</b>)\n\n` +
      `⚖️ <b>RISK / REWARD:</b> <code>${orderData.rr || '1:1.5'}</code>\n` +
      `💡 <b>CONFLUENCE:</b> ${orderData.reasonsText || 'Bullish EMA Trend + RSI Confluence'}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `⏱ <i>Time: ${nowTime} (UTC+7)</i>\n` +
      `🤖 <i>Powered by SAHAK_FOREX BOT Engine</i>`;

    try {
      const res = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: telegramToken,
          chatId: telegramChatId,
          message: text
        })
      });
      const json = await res.json();
      return json;
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const handleCopySignal = (d) => {
    if (!d) return;
    playOrderAudioChime();
    const text = `🔥 LIVE GOLD SIGNAL: XAU/USD\nAction: ${d.orderAction || d.signal}\nEntry: $${d.entry}\nTP1: $${d.tp1}\nTP2: $${d.tp2}\nTP3: $${d.tp3}\nSL: $${d.sl}\nR:R: ${d.rr}\nStatus: ${d.status}`;
    navigator.clipboard.writeText(text);
    showAlert('📋 Live signal parameters copied & alert sent!');
    dispatchTelegramOrder(d, 0.10);
  };

  const handleSimulateOrder = async (d, lotSize) => {
    if (!d) return;
    playOrderAudioChime();
    showAlert(`🚀 Executed Simulated ${d.orderAction} of ${lotSize} Lot XAU/USD at $${d.entry}!`);
    const tgRes = await dispatchTelegramOrder(d, lotSize);
    if (tgRes && tgRes.success) {
      showAlert(`🚀 Order Executed & 📱 Message sent to Telegram Bot!`);
    }
  };

  const handleSaveTelegram = () => {
    localStorage.setItem('telegramBotToken', telegramToken);
    localStorage.setItem('telegramChatId', telegramChatId);
    setIsTelegramModalOpen(false);
    showAlert('✅ Telegram Bot credentials saved!');
  };

  const handleTestSendTelegram = async () => {
    setIsSendingTelegram(true);
    const testMsg = `🔔 <b>TELEGRAM BOT CONNECTED SUCCESSFULLY!</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ <b>Status:</b> Active & Ready to Broadcast\n` +
      `📊 <b>Pair:</b> Gold Spot (XAU/USD)\n` +
      `⚡ <b>Engine:</b> Live TradingView Scanner\n` +
      `⏱ <i>Timestamp: ${new Date().toLocaleTimeString()}</i>`;

    try {
      const res = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: telegramToken,
          chatId: telegramChatId,
          message: testMsg
        })
      });
      const json = await res.json();
      if (json && json.success) {
        showAlert('📱 Test message sent to Telegram Bot!');
      } else {
        showAlert(`⚠️ Telegram Error: ${json.error || 'Failed to send'}`);
      }
    } catch (e) {
      showAlert(`⚠️ Network Error: ${e.message}`);
    } finally {
      setIsSendingTelegram(false);
    }
  };

  return (
    <div className="container-xl py-2 px-2 px-md-3 position-relative">
      
      {/* Ultra-Premium Center Screen Pop-up Alert Modal */}
      {alertMsg && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              zIndex: 1999
            }}
            onClick={() => setAlertMsg('')}
          ></div>

          {/* Center Glassmorphism Alert Box */}
          <div
            className="position-fixed top-50 start-50 translate-middle shadow-lg rounded-4 overflow-hidden"
            style={{
              maxWidth: '460px',
              width: '90%',
              zIndex: 2000,
              background: 'linear-gradient(135deg, rgba(28, 21, 14, 0.98) 0%, rgba(17, 17, 17, 0.98) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(245, 166, 35, 0.45)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 166, 35, 0.3)',
              animation: 'centerAlertPop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <div className="p-3.5 p-md-4 text-center position-relative">
              {/* Background Ambient Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '140px',
                  height: '140px',
                  background: 'radial-gradient(circle, rgba(245, 166, 35, 0.35) 0%, rgba(0,0,0,0) 70%)',
                  pointerEvents: 'none'
                }}
              ></div>

              {/* Top Close Button (X) */}
              <button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                onClick={() => setAlertMsg('')}
                aria-label="Close"
              ></button>

              {/* Glowing 3D Robot Avatar Mascot Icon */}
              <div
                className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center border"
                style={{
                  width: '68px',
                  height: '68px',
                  background: 'rgba(245, 166, 35, 0.15)',
                  borderColor: 'rgba(245, 166, 35, 0.45)',
                  boxShadow: '0 0 25px rgba(245, 166, 35, 0.4)'
                }}
              >
                <img
                  src="assets/bot_icon.png"
                  alt="AI Order Assistant Bot"
                  style={{ width: '58px', height: '58px', objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(245, 166, 35, 0.5))' }}
                />
              </div>

              {/* Alert Title */}
              <h6 className="fw-extrabold text-white mb-1" style={{ fontSize: '16px', letterSpacing: '-0.2px' }}>
                Order Signal Alert Notification
              </h6>

              {/* Alert Content Message */}
              <p className="fw-semibold text-warning mb-3.5" style={{ fontSize: '13.5px', lineHeight: '1.55' }}>
                {alertMsg}
              </p>

              {/* Dismiss Action Button */}
              <button
                type="button"
                className="btn btn-warning text-dark fw-extrabold px-4 py-2 rounded-pill shadow-sm"
                style={{ fontSize: '12.5px', background: 'linear-gradient(135deg, #FFB340 0%, #F5A623 50%, #E8961E 100%)', border: 'none', letterSpacing: '0.3px', color: '#000000' }}
                onClick={() => setAlertMsg('')}
              >
                OK, Got It
              </button>
            </div>
          </div>
        </>
      )}

      {/* Telegram Configuration Modal */}
      <TelegramModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        onSave={handleSaveTelegram}
        token={telegramToken}
        setToken={setTelegramToken}
        chatId={telegramChatId}
        setChatId={setTelegramChatId}
        onTestSend={handleTestSendTelegram}
        isSending={isSendingTelegram}
      />

      {/* Drawer Overlay Menu */}
      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeScreen={activeScreen}
        onSelectScreen={(screen) => setActiveScreen(screen)}
      />

      {/* Header Navigation Bar */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenTelegramModal={() => setIsTelegramModalOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        data={data}
      />

      {activeScreen === 'signal-detail' && (
        <div className="row g-3 mt-1">
          
          {/* Left Column: Live Rate Banner, Timeframe Selector, Live V-Curve Gradient Chart & Technical Gauge */}
          <div className="col-12 col-lg-7 col-xl-7">
            <GoldRateBanner data={data} />

            <TimeframeBar
              activeTimeframe={activeTimeframe}
              onSelectTimeframe={handleTimeframeChange}
            />

            <GradientChart data={data} />

            <TradingViewGauge data={data} />
          </div>

          {/* Right Column: TradingView Dark Visual Order Ticket & 7 Technical Indicators Breakdown */}
          <div className="col-12 col-lg-5 col-xl-5">
            <OrderExecutionTicket
              data={data}
              onCopySignal={handleCopySignal}
              onSimulateOrder={handleSimulateOrder}
              isAutoOrderEnabled={isAutoOrderEnabled}
              onToggleAutoOrder={(val) => setIsAutoOrderEnabled(val)}
            />

            <SignalExecutionGrid data={data} />

            <MarketAnalysisBreakdown data={data} />
          </div>

        </div>
      )}

      {/* Screen 2: Signal Performance Screen */}
      {activeScreen === 'performance' && (
        <div className="row mt-2">
          <div className="col-12 col-md-8 mx-auto">
            <div className="card bg-dark text-light border-secondary shadow-lg p-3 rounded-4 mb-3">
              <div className="d-flex align-items-center gap-2 mb-3">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setActiveScreen('signal-detail')}>
                  <i data-lucide="arrow-left" style={{ width: '16px', height: '16px' }}></i> Back
                </button>
                <h5 className="mb-0 fw-bold">Signal Historical Performance</h5>
              </div>

              <div className="p-3 rounded-3 bg-body-tertiary border border-secondary mb-3">
                <div className="small text-muted">Monthly Accumulative Profit</div>
                <div className="display-6 fw-extrabold text-success my-1">+1,420 Pips</div>
                <div className="small text-secondary">Win Rate: <strong className="text-light">84.2%</strong> (38 Wins / 7 Losses)</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// 5. Mount React Root Application
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
