/**
 * React Component: TimeframeBar
 */

window.TimeframeBar = function TimeframeBar({ activeTimeframe, onSelectTimeframe }) {
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
