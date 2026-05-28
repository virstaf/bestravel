import { dateUSLong, dateUSShortDateTime } from "./formatters.js";

export const getFormattedDate = (dateString) => {
  if (!dateString) return "";
  return dateUSLong.format(new Date(dateString));
};

export const getFormattedDateTime = (dateString) => {
  if (!dateString) return "";
  return dateUSShortDateTime.format(new Date(dateString));
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
