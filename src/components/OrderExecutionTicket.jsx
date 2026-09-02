/**
 * React Component: OrderExecutionTicket
 * Professional TradingView Visual Signal Ticket Card with Select Dropdown for Lot Sizes (0.01 to 10.00 Lots).
 */

window.OrderExecutionTicket = function OrderExecutionTicket({ data, onCopySignal, onSimulateOrder }) {
  const [lotSize, setLotSize] = React.useState(0.10);

  if (!data) return null;

  const isBuy = data.signal ? data.signal.includes('BUY') : false;
  const tp1Pips = data.tp1Pips || Math.round(Math.abs((data.tp1 || 0) - (data.entry || 0)) * 10);
  const tp2Pips = data.tp2Pips || Math.round(Math.abs((data.tp2 || 0) - (data.entry || 0)) * 10);
  const tp3Pips = data.tp3Pips || Math.round(Math.abs((data.tp3 || 0) - (data.entry || 0)) * 10);
  const slPips = data.slPips || Math.round(Math.abs((data.entry || 0) - (data.sl || 0)) * 10);

  // Profit/Loss calculations based on chosen lot size (Gold: 1 Pip = $0.10 for 0.01 Lot, $1.00 for 0.10 Lot, $10.00 for 1.00 Lot)
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
        
        {/* TradingView Chart Header Tag */}
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

        {/* TradingView Supply & Demand Zone Blocks */}
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

        {/* Interactive Lot Size Select Dropdown */}
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

        {/* Order Execution Parameters Grid */}
        <div className="params-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          
          {/* Entry Zone */}
          <div className="param-item">
            <span className="param-label">Order Entry Price</span>
            <span className="param-value" style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
              {window.formatCurrency(data.entry)}
            </span>
            <span style={{ fontSize: '10px', color: '#8A8A8F' }}>TradingView Signal Entry</span>
          </div>

          {/* Stop Loss */}
          <div className="param-item">
            <span className="param-label">Stop Loss (SL)</span>
            <span className="param-value sl" style={{ fontSize: '16px', fontWeight: 800 }}>
              {window.formatCurrency(data.sl)}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--color-sell)', fontWeight: 700 }}>
              -${slDollar} (-{slPips} Pips)
            </span>
          </div>

          {/* Take Profit 1 */}
          <div className="param-item">
            <span className="param-label">Take Profit 1 (1:1)</span>
            <span className="param-value tp" style={{ fontSize: '15px', fontWeight: 800 }}>
              {window.formatCurrency(data.tp1)}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--color-strong-buy)', fontWeight: 700 }}>
              +${tp1Dollar} (+{tp1Pips} Pips)
            </span>
          </div>

          {/* Take Profit 2 */}
          <div className="param-item">
            <span className="param-label">Take Profit 2 (1:2)</span>
            <span className="param-value tp" style={{ fontSize: '15px', fontWeight: 800 }}>
              {window.formatCurrency(data.tp2)}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--color-strong-buy)', fontWeight: 700 }}>
              +${tp2Dollar} (+{tp2Pips} Pips)
            </span>
          </div>

          {/* Take Profit 3 */}
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

        {/* Analysis Reason & R:R Summary */}
        <div style={{ background: '#1E222D', padding: '10px 12px', borderRadius: '8px', marginBottom: '14px', border: '1px solid #2A2E39' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', color: '#8A8A8F' }}>
            <span>Risk / Reward Ratio: <strong style={{ color: '#FFFFFF' }}>{data.rr || '1:1.8'}</strong></span>
            <span>EMA 20 Trend: <strong style={{ color: '#22C55E' }}>{window.formatCurrency(data.ema20 || 4313.67)}</strong></span>
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF' }}>
            💬 Technical Analysis: {data.reasonsText || 'Bullish Trend Confluence'}
          </div>
        </div>

        {/* Order Quick Action Buttons */}
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
