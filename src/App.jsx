/**
 * Main React Root App Component with Bootstrap 5 Floating Top Alert Banner
 */

window.App = function App() {
  const [activeTimeframe, setActiveTimeframe] = React.useState('1h');
  const { data, loading, error, refetch } = window.useTradingViewStream(activeTimeframe, 800);
  const [activeScreen, setActiveScreen] = React.useState('signal-detail');
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState('');

  React.useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const showAlert = (msg) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(''), 3500);
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

  const handleCopySignal = (d) => {
    if (!d) return;
    const text = `🔥 LIVE GOLD SIGNAL: XAU/USD\nAction: ${d.orderAction || d.signal}\nEntry: $${d.entry}\nTP1: $${d.tp1}\nTP2: $${d.tp2}\nTP3: $${d.tp3}\nSL: $${d.sl}\nR:R: ${d.rr}\nStatus: ${d.status}`;
    navigator.clipboard.writeText(text);
    showAlert('📋 Live signal parameters copied to clipboard!');
  };

  const handleSimulateOrder = (d, lotSize) => {
    if (!d) return;
    showAlert(`🚀 Executed Simulated ${d.orderAction} of ${lotSize} Lot XAU/USD at $${d.entry}!`);
  };

  return (
    <div className="container-xl py-2 px-2 px-md-3 position-relative">
      
      {/* Floating Bootstrap Top Alert Banner */}
      {alertMsg && (
        <div
          className="alert alert-info alert-dismissible fade show shadow-lg rounded-4 position-fixed top-0 start-50 translate-middle-x mt-3 border border-info-subtle d-flex align-items-center justify-content-between"
          style={{
            maxWidth: '460px',
            width: '90%',
            zIndex: 1080,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            color: '#38BDF8',
            padding: '12px 16px'
          }}
          role="alert"
        >
          <div className="d-flex align-items-center gap-2.5">
            <div className="p-1 rounded-circle bg-info-subtle text-info d-flex align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
              <i data-lucide="bell" style={{ width: '15px', height: '15px' }}></i>
            </div>
            <span className="fw-semibold text-light" style={{ fontSize: '13px' }}>{alertMsg}</span>
          </div>

          <button
            type="button"
            className="btn-close btn-close-white ms-2"
            onClick={() => setAlertMsg('')}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Drawer Overlay Menu */}
      <window.DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeScreen={activeScreen}
        onSelectScreen={(screen) => setActiveScreen(screen)}
      />

      {/* Header Navigation Bar */}
      <window.Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        data={data}
      />

      {activeScreen === 'signal-detail' && (
        <div className="row g-3 mt-1">
          
          {/* Left Column: Live Rate Banner, Timeframe Selector, Live V-Curve Gradient Chart & Technical Gauge */}
          <div className="col-12 col-lg-7 col-xl-7">
            <window.GoldRateBanner data={data} />

            <window.TimeframeBar
              activeTimeframe={activeTimeframe}
              onSelectTimeframe={handleTimeframeChange}
            />

            <window.GradientChart data={data} />

            <window.TradingViewGauge data={data} />
          </div>

          {/* Right Column: TradingView Dark Visual Order Ticket & 7 Technical Indicators Breakdown */}
          <div className="col-12 col-lg-5 col-xl-5">
            <window.OrderExecutionTicket
              data={data}
              onCopySignal={handleCopySignal}
              onSimulateOrder={handleSimulateOrder}
            />

            <window.SignalExecutionGrid data={data} />

            <window.MarketAnalysisBreakdown data={data} />
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
};
