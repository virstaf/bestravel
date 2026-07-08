import { dateLongUS, dateTimeShortUS, safeFormatDate } from "./formatters.js";

export const getFormattedDate = (dateString) => {
  return safeFormatDate(dateString, dateLongUS);
};

export const getFormattedDateTime = (dateString) => {
  return safeFormatDate(dateString, dateTimeShortUS);
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
