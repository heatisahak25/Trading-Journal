/**
 * React Component: TradingViewGauge
 * Clean Speedometer Rating Gauge without MA & Oscillators text summary.
 */

window.TradingViewGauge = function TradingViewGauge({ data }) {
  if (!data) return null;

  const pointerPos = data.pointerPos !== undefined ? data.pointerPos : 50;

  return (
    <div className="ta-gauge-card mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span style={{ fontWeight: 800, fontSize: '14px' }}>TradingView Technical Analysis</span>
        <span style={{ fontSize: '11px', color: 'var(--gradient-teal)', fontWeight: 700 }}>Live Rating</span>
      </div>

      {/* Speedometer Meter Bar */}
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
