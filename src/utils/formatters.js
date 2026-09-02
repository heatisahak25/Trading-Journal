/**
 * Currency & Number Formatting Helpers
 */

window.formatCurrency = function formatCurrency(val) {
  if (val === undefined || val === null || isNaN(val)) return '$0.00';
  return '$' + Number(val).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

window.formatNumber = function formatNumber(val, decimals = 2) {
  if (val === undefined || val === null || isNaN(val)) return '0.00';
  return Number(val).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};
