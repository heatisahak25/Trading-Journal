/**
 * React Component: GradientChart
 * Signature Teal -> Purple -> Pink curve rendering LIVE price node tags with zero clipping/cutoff!
 */

window.GradientChart = function GradientChart({ data }) {
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    if (!chartRef.current || !data) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 190);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
    gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.0)');

    const strokeGradient = ctx.createLinearGradient(0, 0, 320, 0);
    strokeGradient.addColorStop(0, '#06B6D4');
    strokeGradient.addColorStop(0.5, '#A855F7');
    strokeGradient.addColorStop(1, '#EC4899');

    const labels = data.timestamps || ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    const prices = data.prices || [4335.82, 4317.23, 4301.31, 4282.72, 4311.93, 4332.31];

    // Plugin drawing Live Price Badges with zero clipping at chart boundaries
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
          const isBottom = index === 3; // 12:00 bottom point

          const textWidth = ctx.measureText(priceStr).width;
          const padX = 6;
          const padY = 3;
          const badgeWidth = textWidth + padX * 2;
          const badgeHeight = 16;

          // Clamp X position so badge NEVER gets cut off at left or right edges!
          const minX = badgeWidth / 2 + 4;
          const maxX = chart.width - badgeWidth / 2 - 4;
          const clampedX = Math.max(minX, Math.min(maxX, point.x));

          // Position badge above or below point
          const y = isBottom ? Math.min(chart.height - 20, point.y + 16) : Math.max(12, point.y - 16);

          // Badge Background Pill
          ctx.beginPath();
          if (isLatest) {
            ctx.fillStyle = '#F97316'; // Orange TradingView price tag for live point
            ctx.strokeStyle = '#EA580C';
          } else if (isBottom) {
            ctx.fillStyle = 'rgba(236, 72, 153, 0.95)'; // Pink for reversal bottom
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

          // Badge Text
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
          y: { display: false }
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
