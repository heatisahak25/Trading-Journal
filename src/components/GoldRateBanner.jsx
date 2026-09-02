/**
 * React Component: GoldRateBanner
 * Ultra-Premium Bootstrap 5 Glassmorphism Hero Card for Live Gold Rate ($4,333.01).
 */

window.GoldRateBanner = function GoldRateBanner({ data }) {
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
