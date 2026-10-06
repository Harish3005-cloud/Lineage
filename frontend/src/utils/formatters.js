export function formatCurrency(amount, currency = '₹') {
  if (amount == null) return `${currency}0`;
  return `${currency}${amount.toLocaleString('en-IN')}`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export function formatTime(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit',
  });
}

export function truncateHash(hash, len = 8) {
  if (!hash) return '';
  return hash.substring(0, len) + '…';
}

export function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}
