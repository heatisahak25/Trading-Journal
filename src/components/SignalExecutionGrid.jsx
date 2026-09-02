/**
 * React Component: SignalExecutionGrid
 * Ultra-Premium Bootstrap 5 Card rendering Entry Zone, TP1, TP2, TP3, SL, Risk/Reward Ratio, and Technical Analysis Reasons.
 */

window.SignalExecutionGrid = function SignalExecutionGrid({ data }) {
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

        {/* Targets Grid */}
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

        {/* Technical Analysis Reasons Glassmorphism Banner */}
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
