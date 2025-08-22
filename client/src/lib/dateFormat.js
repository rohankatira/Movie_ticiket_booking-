// dateFormat.js
export const dateFormat = (date) => {
  if (!date) return 'Date not available';
  const d = new Date(date);
  if (isNaN(d)) return 'Invalid Date';
  return d.toLocaleString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
