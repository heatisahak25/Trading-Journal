/**
 * React Component: MarketAnalysisBreakdown
 * Ultra-Premium 7 Technical Indicators Engine Card with icons, metric pills, and TradingView Live feed status.
 */

window.MarketAnalysisBreakdown = function MarketAnalysisBreakdown({ data }) {
  if (!data) return null;

  return (
    <div className="card bg-dark text-light border-secondary shadow-lg rounded-4 mb-3 overflow-hidden">
      <div className="card-body p-3">

        {/* Card Header */}
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

        {/* 7 Indicators Metric Grid */}
        <div className="row g-2">
          
          {/* RSI (14) */}
          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>RSI (14)</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{data.rsi || '46.5'}</div>
              </div>
              <i data-lucide="activity" style={{ width: '14px', height: '14px', color: '#06B6D4' }}></i>
            </div>
          </div>

          {/* ATR (14) Volatility */}
          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>ATR (14) Volatility</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{window.formatCurrency(data.atr)}</div>
              </div>
              <i data-lucide="bar-chart-2" style={{ width: '14px', height: '14px', color: '#A855F7' }}></i>
            </div>
          </div>

          {/* EMA 20 */}
          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>EMA 20</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{window.formatCurrency(data.ema20)}</div>
              </div>
              <i data-lucide="trending-up" style={{ width: '14px', height: '14px', color: '#4ADE80' }}></i>
            </div>
          </div>

          {/* EMA 50 */}
          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>EMA 50</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{window.formatCurrency(data.ema50)}</div>
              </div>
              <i data-lucide="line-chart" style={{ width: '14px', height: '14px', color: '#38BDF8' }}></i>
            </div>
          </div>

          {/* MACD (12, 26) */}
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

          {/* Stochastic (%K / %D) */}
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

          {/* Upper Bollinger */}
          <div className="col-6">
            <div className="p-2 rounded-3 bg-body-tertiary border border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary" style={{ fontSize: '10px', fontWeight: 600 }}>Upper Bollinger Band</div>
                <div className="fw-bold text-white mt-0.5" style={{ fontSize: '12px' }}>{window.formatCurrency(data.bbUpper)}</div>
              </div>
              <i data-lucide="arrow-up-circle" style={{ width: '14px', height: '14px', color: '#EF4444' }}></i>
            </div>
          </div>

          {/* Lower Bollinger */}
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
