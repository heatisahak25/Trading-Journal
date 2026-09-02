/**
 * React Component: Header
 * Ultra-Clean Bootstrap 5 Glassmorphism Top Bar with Live Refresh Button (Hamburger & Star icons removed).
 */

window.Header = function Header({ onOpenDrawer, onRefresh, isRefreshing, data }) {
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
        
        {/* Left Brand & Live Status */}
        <div className="d-flex align-items-center gap-2.5">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-extrabold text-white fs-5 mb-0" style={{ letterSpacing: '-0.3px' }}>
                XAU/USD
              </span>
              <span
                className="badge bg-warning-subtle text-warning border border-warning-subtle px-2.5 py-1 rounded-pill fw-bold"
                style={{ fontSize: '10px', letterSpacing: '0.5px' }}
              >
                GOLD SPOT
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

        {/* Right Live Refresh Button */}
        <div className="d-flex align-items-center">
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
