/**
 * React Component: LiveRatesList
 * Ultra-Premium Bootstrap 5 Market Watchlist Table.
 */

window.LiveRatesList = function LiveRatesList({ data }) {
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
