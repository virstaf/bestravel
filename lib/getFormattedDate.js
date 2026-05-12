const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const getFormattedDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "" : dateFormatter.format(date);
};

export const getFormattedDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "" : dateTimeFormatter.format(date);
};


export const getBackLink = (currentPath) => {
  // Handle edge cases
  if (!currentPath || currentPath === '/') return '/';
  
  const segments = currentPath.split('/').filter(segment => segment);
  
  // If we're at a top-level path like "/admin", go to home
  if (segments.length === 1) return '/';
  
  // Remove the last segment and reconstruct path
  segments.pop();
  return `/${segments.join('/')}`;
};
