export const calculateTimeAgo = (dateString) => {
  const eventDate = new Date(dateString);
  const now = new Date();
  const difference = now - eventDate; // Difference in milliseconds

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  return `${seconds} seconds ago`;
};