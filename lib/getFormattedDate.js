// Hoist expensive Intl formatters to module scope to avoid re-creation on every function call
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
  if (!dateString) return "N/A";
  return dateFormatter.format(new Date(dateString));
};

export const getFormattedDateTime = (dateString) => {
  if (!dateString) return "N/A";
  return dateTimeFormatter.format(new Date(dateString));
};

export const getBackLink = (currentPath) => {
  // Handle edge cases
  if (!currentPath || currentPath === "/") return "/";

  const segments = currentPath.split("/").filter((segment) => segment);

  // If we're at a top-level path like "/admin", go to home
  if (segments.length === 1) return "/";

  // Remove the last segment and reconstruct path
  segments.pop();
  return `/${segments.join("/")}`;
};
