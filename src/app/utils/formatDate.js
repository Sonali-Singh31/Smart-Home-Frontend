// utils/formatDate.js

export const formatDate = (dateString) => {
  if (!dateString) return "—"; // handle null or undefined

  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
